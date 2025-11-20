from geopy.distance import geodesic

def calculate_distance(user_lat, user_lon, donor_lat, donor_lon):
    """Calculate distance in km between user and donor"""
    user_loc = (user_lat, user_lon)
    donor_loc = (donor_lat, donor_lon)
    return geodesic(user_loc, donor_loc).km
