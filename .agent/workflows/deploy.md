---
description: Deploy Blood Buddy to Render and Firebase
---

# Deploy Blood Buddy to Render and Firebase

Follow these steps to deploy your Blood Buddy application to production.

## Prerequisites

Before starting, ensure you have:
- [ ] GitHub repository set up with your code
- [ ] Render account created (https://render.com)
- [ ] Firebase account and project created
- [ ] MongoDB Atlas account with a cluster set up
- [ ] Firebase service account credentials downloaded

## Step 1: Prepare MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Create a cluster (free tier is fine)
3. Create a database user with password
4. Whitelist all IPs (0.0.0.0/0) under Network Access
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/bloodbuddy`)

## Step 2: Prepare Firebase Credentials

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key" to download the JSON file
3. Minify the JSON (remove all whitespace):
   ```bash
   cat path/to/firebase-credentials.json | jq -c
   ```
4. Copy the minified JSON string - you'll paste this into Render

## Step 3: Push Code to GitHub

// turbo
```bash
cd /Users/anuragdineshrokade/Blood-Buddy
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 4: Deploy Backend to Render

### Option A: Using Blueprint (Recommended)
1. Go to https://dashboard.render.com/
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select the Blood-Buddy repository
5. Render will detect the `render.yaml` file
6. Click "Apply Blueprint"

### Option B: Manual Setup
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - Name: `blood-buddy-api`
   - Root Directory: `Backend`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Plan: Free

## Step 5: Set Environment Variables on Render

In Render Dashboard → Environment, add these variables:

| Variable | Value | Source |
|----------|-------|--------|
| `PYTHON_VERSION` | `3.11.0` | Manual |
| `ENVIRONMENT` | `production` | Manual |
| `FIREBASE_CREDENTIALS_JSON` | `{...}` | Paste minified Firebase JSON |
| `MONGODB_URI` | `mongodb+srv://...` | From MongoDB Atlas |
| `TWILIO_ACCOUNT_SID` | `your_sid` | Optional - from Twilio |
| `TWILIO_AUTH_TOKEN` | `your_token` | Optional - from Twilio |
| `TWILIO_PHONE_NUMBER` | `+1234567890` | Optional - from Twilio |

**Important**: Click "Save Changes" after adding all variables

## Step 6: Wait for Deployment

1. Monitor the "Logs" tab in Render Dashboard
2. Deployment usually takes 2-5 minutes
3. Once complete, you'll get a URL like: `https://blood-buddy-api.onrender.com`

## Step 7: Test Backend

1. Visit your backend URL - should show: `{"message": "Welcome to Blood Buddy API"}`
2. Check API docs: `https://blood-buddy-api.onrender.com/docs`
3. Verify no errors in Render logs

## Step 8: Update Frontend Configuration

// turbo
```bash
cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
```

Create `.env.production` file with:
```env
REACT_APP_API_URL=https://blood-buddy-api.onrender.com
```

Replace `blood-buddy-api.onrender.com` with your actual Render URL.

## Step 9: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 10: Login to Firebase

```bash
firebase login
```

## Step 11: Initialize Firebase Hosting

```bash
cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
firebase init hosting
```

Configuration:
- Select existing project (your Blood Buddy project)
- Public directory: `build`
- Single-page app: `Yes`
- GitHub deploys: `No`

## Step 12: Build Frontend

// turbo
```bash
cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
npm run build
```

## Step 13: Deploy to Firebase

```bash
cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
firebase deploy --only hosting
```

## Step 14: Get Your Live URLs

After deployment completes, Firebase will show:
- Hosting URL: `https://your-project-id.web.app`
- Alternative: `https://your-project-id.firebaseapp.com`

## Step 15: Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Under "Authorized domains", add:
   - `your-project-id.web.app`
   - `your-project-id.firebaseapp.com`

## Step 16: Update CORS (If Needed)

If you get CORS errors, update `Backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-project-id.web.app",
        "https://your-project-id.firebaseapp.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then redeploy to Render (push changes to GitHub, Render will auto-deploy if enabled).

## Step 17: Final Testing

Test these features on your live site:
- [ ] Visit frontend URL
- [ ] Create new account
- [ ] Login with email/password
- [ ] Login with Google
- [ ] Register as donor
- [ ] Search for donors
- [ ] Logout
- [ ] Test on mobile device

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify all environment variables are set
- Ensure Firebase JSON is valid and minified

### CORS errors
- Update CORS origins in backend
- Redeploy backend after changes

### Firebase auth errors
- Check Authorized Domains in Firebase Console
- Ensure frontend is using HTTPS

### MongoDB connection issues
- Verify connection string format
- Check IP whitelist (should be 0.0.0.0/0)
- Ensure password is URL-encoded

## Success! 🎉

Your Blood Buddy app is now live:
- Frontend: `https://your-project-id.web.app`
- Backend: `https://blood-buddy-api.onrender.com`

Share it with users and start saving lives! 🩸

---

For detailed troubleshooting and advanced configuration, see `RENDER_DEPLOYMENT.md`
