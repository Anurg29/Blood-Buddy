# Backend Firebase Authentication Setup

This guide explains how to set up Firebase Admin SDK in your Blood Buddy backend for token verification.

## 📋 Overview

The backend uses Firebase Admin SDK to verify authentication tokens sent from the frontend. This ensures that only authenticated users can access protected API endpoints.

## 🔑 Step 1: Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your Blood Buddy project
3. Click the gear icon ⚙️ → **Project settings**
4. Navigate to the **Service accounts** tab
5. Click **Generate new private key**
6. Click **Generate key** - a JSON file will be downloaded
7. **IMPORTANT**: Keep this file secure and never commit it to version control!

## 📁 Step 2: Set Up Service Account

### Option A: Using File Path (Recommended for Development)

1. Create a `secrets` folder in your Backend directory (already in .gitignore):
   ```bash
   mkdir -p /Users/anuragdineshrokade/Blood-Buddy/Backend/secrets
   ```

2. Move your downloaded service account JSON file to this folder:
   ```bash
   mv ~/Downloads/your-project-firebase-adminsdk-xxxxx.json \
      /Users/anuragdineshrokade/Blood-Buddy/Backend/secrets/firebase-credentials.json
   ```

3. Create a `.env` file in your Backend directory:
   ```bash
   cd /Users/anuragdineshrokade/Blood-Buddy/Backend
   touch .env
   ```

4. Add the following to your `.env` file:
   ```env
   FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json
   ```

### Option B: Using JSON String (Recommended for Production)

For production deployment (e.g., Railway, Heroku), use environment variables:

1. Copy the contents of your service account JSON file
2. Minify it to a single line (remove line breaks)
3. Set it as an environment variable in your deployment platform:
   ```env
   FIREBASE_CREDENTIALS_JSON='{"type":"service_account","project_id":"your-project",...}'
   ```

## 🔧 Step 3: Install Dependencies

```bash
cd /Users/anuragdineshrokade/Blood-Buddy/Backend
pip install -r requirements.txt
```

## 🚀 Step 4: Test Backend

1. Start the backend server:
   ```bash
   cd /Users/anuragdineshrokade/Blood-Buddy/Backend
   uvicorn main:app --reload
   ```

2. Check the console output - you should see:
   ```
   Firebase initialized from credentials file
   Application started successfully!
   ```

3. Visit: http://localhost:8000/docs to see the API documentation

## 🎯 Step 5: Using Authentication in Routes

### Protect a Route (Require Authentication)

```python
from fastapi import APIRouter, Depends
from utils.firebase_auth import verify_firebase_token

router = APIRouter()

@router.get("/protected-endpoint")
async def protected_route(user = Depends(verify_firebase_token)):
    # user will contain: uid, email, name, email_verified
    return {
        "message": "This is protected",
        "user_id": user["uid"],
        "email": user["email"]
    }
```

### Optional Authentication

```python
from utils.firebase_auth import optional_firebase_token

@router.get("/optional-auth")
async def optional_auth_route(user = Depends(optional_firebase_token)):
    if user:
        return {"message": f"Welcome {user['email']}"}
    else:
        return {"message": "Welcome, guest"}
```

## 📝 Example: Update Donor Routes with Auth

Here's how to update your donor routes to require authentication:

```python
from fastapi import APIRouter, Depends
from utils.firebase_auth import verify_firebase_token

router = APIRouter(prefix="/api/donors", tags=["donors"])

@router.post("/register")
async def register_donor(
    donor_data: dict,
    user = Depends(verify_firebase_token)
):
    # Add user ID to donor data
    donor_data["user_id"] = user["uid"]
    donor_data["email"] = user["email"]
    
    # Save to database
    # ... your existing code ...
    
    return {"message": "Donor registered successfully"}

@router.get("/my-profile")
async def get_my_profile(user = Depends(verify_firebase_token)):
    # Fetch donor profile using user["uid"]
    # ... your existing code ...
    
    return {"profile": "your donor profile"}
```

## 🔐 Frontend Integration

Update your frontend to send the Firebase token with API requests:

```javascript
import { auth } from './firebase/config';
import axios from 'axios';

// Get the current user's token
async function makeAuthenticatedRequest() {
  const user = auth.currentUser;
  
  if (user) {
    const token = await user.getIdToken();
    
    const response = await axios.post(
      'http://localhost:8000/api/donors/register',
      { /* your data */ },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  }
}
```

Or create an axios instance with interceptor:

```javascript
import axios from 'axios';
import { auth } from './firebase/config';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Add token to all requests automatically
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 🚫 Error Handling

The backend will return these errors:

- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Valid token but insufficient permissions

Handle these in your frontend:

```javascript
try {
  const response = await api.get('/protected-endpoint');
  // Success
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
    navigate('/login');
  }
}
```

## 🧪 Development Mode

If you don't set up Firebase credentials, the backend will run in "limited mode":
- Authentication verification is skipped
- A development user is returned automatically
- Useful for quick testing without setting up Firebase

**WARNING**: Never deploy to production without proper Firebase credentials!

## 📂 .gitignore

Make sure these are in your `.gitignore`:

```
# Firebase credentials
.env
secrets/
*.json
!package*.json
```

## 🔒 Security Best Practices

1. **Never commit service account keys** to version control
2. **Use environment variables** in production
3. **Rotate service accounts** periodically
4. **Limit service account permissions** to minimum required
5. **Use HTTPS** in production
6. **Set up CORS** properly for your domain

## 📚 Additional Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Token Verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

## 🐛 Troubleshooting

### "Firebase credentials not found"
- Check that `.env` file exists
- Verify the path in `FIREBASE_CREDENTIALS` is correct
- Ensure the JSON file exists and is valid

### "Permission denied"
- Verify your service account has the correct permissions
- Check Firebase IAM settings in Google Cloud Console

### "Token verification failed"
- Ensure token is sent in `Authorization: Bearer <token>` header
- Check that token hasn't expired (tokens expire after 1 hour)
- Verify frontend and backend are using the same Firebase project
