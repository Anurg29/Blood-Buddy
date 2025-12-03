import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
import json

# Initialize Firebase Admin SDK
def initialize_firebase():
    """
    Initialize Firebase Admin SDK
    Set FIREBASE_CREDENTIALS environment variable with path to service account JSON
    Or set FIREBASE_CREDENTIALS_JSON with the JSON content directly
    """
    try:
        # Check if already initialized
        firebase_admin.get_app()
        print("Firebase already initialized")
        return
    except ValueError:
        pass
    
    # Try to initialize from environment variable
    cred_path = os.getenv('FIREBASE_CREDENTIALS')
    cred_json = os.getenv('FIREBASE_CREDENTIALS_JSON')
    
    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized from credentials file")
    elif cred_json:
        cred_dict = json.loads(cred_json)
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized from credentials JSON")
    else:
        # For development: Initialize without credentials (limited functionality)
        print("WARNING: Firebase credentials not found. Running in limited mode.")
        print("Set FIREBASE_CREDENTIALS or FIREBASE_CREDENTIALS_JSON environment variable")
        # You can still run the app, but auth verification will be disabled
        return None

# HTTP Bearer token security
security = HTTPBearer()

async def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Verify Firebase ID token from request header
    Usage in route: user = Depends(verify_firebase_token)
    """
    try:
        # Check if Firebase is initialized
        try:
            firebase_admin.get_app()
        except ValueError:
            # Firebase not initialized - skip verification in development
            print("WARNING: Firebase not initialized, skipping auth verification")
            return {"uid": "dev-user", "email": "dev@example.com"}
        
        # Extract token from credentials
        token = credentials.credentials
        
        # Verify the token
        decoded_token = auth.verify_id_token(token)
        
        # Return user info
        return {
            "uid": decoded_token['uid'],
            "email": decoded_token.get('email'),
            "name": decoded_token.get('name'),
            "email_verified": decoded_token.get('email_verified', False)
        }
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}"
        )

async def optional_firebase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Optional Firebase token verification
    Returns user info if token is valid, None if not provided
    """
    if credentials is None:
        return None
    
    try:
        return await verify_firebase_token(credentials)
    except HTTPException:
        return None

