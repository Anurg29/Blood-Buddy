from pydantic import BaseModel, Field
from typing import Optional

class Donor(BaseModel):
    name: str
    blood_group: str
    city: str
    contact: str
    latitude: float = Field(..., description="Latitude of donor’s location")
    longitude: float = Field(..., description="Longitude of donor’s location")
    last_donated: Optional[str] = None
    fcm_token: Optional[str] = None  # Firebase Cloud Messaging token for push notifications
