from fastapi import APIRouter, HTTPException, Query, Depends
from models.donor_model import Donor
from database.connection import donor_collection
from utils.geo_utils import calculate_distance
from utils.notification_service import send_welcome_notification, send_donor_match_notification
from utils.firebase_auth import verify_firebase_token

router = APIRouter()

# 🩸 Add new donor
@router.post("/donors/add")
def add_donor(donor: Donor):
    donor_dict = donor.dict()
    result = donor_collection.insert_one(donor_dict)
    
    # Send welcome notification via FCM
    # Note: In a real app, we would get the FCM token from the frontend
    # For now, we assume it might be passed or we skip if not present
    if "fcm_token" in donor_dict and donor_dict["fcm_token"]:
        send_welcome_notification(
            token=donor_dict["fcm_token"],
            donor_name=donor_dict["name"],
            blood_type=donor_dict["blood_group"]
        )
        
    return {"message": "Donor added successfully", "id": str(result.inserted_id)}

# 🩸 Request Blood (New Endpoint)
@router.post("/donors/request")
def request_blood(
    blood_group: str,
    location: str,
    latitude: float,
    longitude: float,
    user: dict = Depends(verify_firebase_token)
):
    """
    Request blood and notify nearby donors
    """
    # Find nearby donors with matching blood group
    donors = list(donor_collection.find({"blood_group": blood_group}, {"_id": 0}))
    
    nearby_donors = []
    donor_tokens = []
    
    for donor in donors:
        dist = calculate_distance(latitude, longitude, donor["latitude"], donor["longitude"])
        if dist <= 50:  # Notify donors within 50km
            nearby_donors.append(donor)
            if "fcm_token" in donor and donor["fcm_token"]:
                donor_tokens.append(donor["fcm_token"])
    
    # Send push notifications to matching donors
    if donor_tokens:
        send_donor_match_notification(
            donor_tokens=donor_tokens,
            blood_type=blood_group,
            requester_name=user.get("name", "Someone"),
            location=location
        )
        
    return {
        "message": "Blood request sent",
        "donors_found": len(nearby_donors),
        "notifications_sent": len(donor_tokens)
    }

# 📍 Get nearest donors (with optional filters)
@router.get("/donors/nearby")
def get_nearby_donors(
    lat: float = Query(...),
    lon: float = Query(...),
    blood_group: str = Query(None),
    limit: int = Query(10)
):
    donors = list(donor_collection.find({}, {"_id": 0}))
    if not donors:
        raise HTTPException(status_code=404, detail="No donors found")

    # Filter by blood group if provided
    if blood_group:
        donors = [d for d in donors if d.get("blood_group") == blood_group]

    for donor in donors:
        donor["distance_km"] = round(
            calculate_distance(lat, lon, donor["latitude"], donor["longitude"]), 2
        )

    sorted_donors = sorted(donors, key=lambda d: d["distance_km"])[:limit]
    return {"count": len(sorted_donors), "donors": sorted_donors}
