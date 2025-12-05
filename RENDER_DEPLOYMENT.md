# 🚀 Deploying Blood Buddy to Render

This guide will walk you through deploying the Blood Buddy backend to Render and the frontend to Firebase Hosting.

## 📋 Prerequisites

Before you begin, make sure you have:
- [ ] A GitHub account with your Blood Buddy repository
- [ ] A Render account (sign up at [render.com](https://render.com))
- [ ] A Firebase account
- [ ] A MongoDB Atlas account (for production database)
- [ ] Firebase service account JSON credentials
- [ ] (Optional) Twilio account for SMS notifications

---

## 🖥️ Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   cd /Users/anuragdineshrokade/Blood-Buddy
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

### Step 2: Set Up MongoDB Atlas (Production Database)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (Free tier is fine)
3. Create a database user:
   - Click "Database Access" → "Add New Database User"
   - Choose a username and password (save these!)
4. Whitelist all IP addresses:
   - Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/bloodbuddy`)
   - Replace `<password>` with your actual password

### Step 3: Prepare Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your Blood Buddy project
3. Click the gear icon ⚙️ → "Project settings"
4. Go to "Service accounts" tab
5. Click "Generate new private key"
6. **Minify the JSON file** (remove all whitespace and newlines):
   
   You can use this command:
   ```bash
   cat firebase-credentials.json | jq -c
   ```
   
   Or use an online JSON minifier: https://jsonformatter.org/json-minify
   
7. **Copy the entire minified JSON string** - you'll need this for Render

### Step 4: Deploy to Render

#### Option A: Using Blueprint (Recommended - Easiest)

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. Click **"New +"** → **"Blueprint"**
3. **Connect your GitHub repository** (authorize Render if needed)
4. Select the **Blood-Buddy** repository
5. Render will automatically detect the `render.yaml` file
6. Click **"Apply Blueprint"**

#### Option B: Manual Web Service Creation

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your **GitHub repository**
4. Configure the service:
   - **Name**: `blood-buddy-api` (or any name you prefer)
   - **Region**: Choose the closest to your users
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

### Step 5: Configure Environment Variables on Render

1. In your Render service dashboard, go to **"Environment"** tab
2. Add the following environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `PYTHON_VERSION` | `3.11.0` | Python version |
| `ENVIRONMENT` | `production` | Set to production |
| `FIREBASE_CREDENTIALS_JSON` | `{your minified JSON}` | Paste the entire minified Firebase JSON |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `TWILIO_ACCOUNT_SID` | `your_sid` | (Optional) From Twilio console |
| `TWILIO_AUTH_TOKEN` | `your_token` | (Optional) From Twilio console |
| `TWILIO_PHONE_NUMBER` | `+1234567890` | (Optional) Your Twilio number |

**Important Notes:**
- For `FIREBASE_CREDENTIALS_JSON`, paste the ENTIRE minified JSON as one line
- For `MONGODB_URI`, ensure the password is properly URL-encoded
- Make sure there are no extra spaces or quotes

3. Click **"Save Changes"**

### Step 6: Deploy!

1. Render will automatically start deploying your service
2. Monitor the **"Logs"** tab for any errors
3. Wait for deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll see a **URL** like: `https://blood-buddy-api.onrender.com`

### Step 7: Test Your Backend

1. Visit your Render URL: `https://blood-buddy-api.onrender.com`
   - You should see: `{"message": "Welcome to Blood Buddy API"}`

2. Check the API documentation:
   - Visit: `https://blood-buddy-api.onrender.com/docs`
   - You should see the Swagger UI with all endpoints

3. Test a health check:
   ```bash
   curl https://blood-buddy-api.onrender.com/
   ```

---

## 🌐 Part 2: Frontend Deployment (Firebase Hosting)

### Step 1: Update Frontend Configuration

1. **Update API URL** in your frontend:
   
   Create/update `.env.production` in the `FrontEnd` directory:
   ```bash
   cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
   ```

   Create the file:
   ```env
   REACT_APP_API_URL=https://blood-buddy-api.onrender.com
   ```

2. **Update CORS in Backend** (if needed):
   
   Go back to Render dashboard and add an environment variable:
   - Key: `CORS_ORIGINS`
   - Value: `https://your-project-id.web.app,https://your-project-id.firebaseapp.com`

   Then update `Backend/main.py` to use this (we can do this later if needed).

### Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase

```bash
firebase login
```

### Step 4: Initialize Firebase Hosting

```bash
cd /Users/anuragdineshrokade/Blood-Buddy/FrontEnd
firebase init hosting
```

Configuration:
- **Use existing project**: Select your Blood Buddy Firebase project
- **Public directory**: `build` (not `public`)
- **Single-page app**: `Yes`
- **GitHub deploys**: `No` (for now)

### Step 5: Build Your Frontend

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Step 6: Deploy to Firebase

```bash
firebase deploy --only hosting
```

### Step 7: Get Your Live URLs

After deployment, you'll see:
- **Hosting URL**: `https://your-project-id.web.app`
- **Alternative URL**: `https://your-project-id.firebaseapp.com`

### Step 8: Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Make sure these are added:
   - `your-project-id.web.app`
   - `your-project-id.firebaseapp.com`
   - (If you have a custom domain, add it here too)

---

## ✅ Post-Deployment Checklist

### Backend Verification
- [ ] Backend URL is accessible: `https://blood-buddy-api.onrender.com`
- [ ] API docs work: `https://blood-buddy-api.onrender.com/docs`
- [ ] Health check returns success
- [ ] Logs show no errors in Render dashboard
- [ ] Firebase authentication is working (check logs)
- [ ] MongoDB connection is successful (check logs)

### Frontend Verification
- [ ] Frontend is accessible: `https://your-project-id.web.app`
- [ ] Login page loads correctly
- [ ] Sign up with email works
- [ ] Google Sign-In works
- [ ] Protected routes redirect correctly
- [ ] API calls to backend work
- [ ] No console errors in browser DevTools

### Test Core Functionality
- [ ] Create new account
- [ ] Login with credentials
- [ ] Access donor registration
- [ ] Search for donors
- [ ] Logout works
- [ ] Mobile responsive design works

---

## 🐛 Troubleshooting Common Issues

### 1. Backend Build Fails on Render

**Error**: `pip install` fails
- **Fix**: Make sure `requirements.txt` has all dependencies
- Check Python version matches (3.11.0)

### 2. Firebase Credentials Not Working

**Error**: "Firebase admin initialization failed"
- **Fix**: 
  - Ensure JSON is minified (no line breaks)
  - Verify the JSON is valid
  - Make sure you're using `FIREBASE_CREDENTIALS_JSON` (not `FIREBASE_CREDENTIALS`)

### 3. MongoDB Connection Error

**Error**: "Connection refused" or "Authentication failed"
- **Fix**:
  - Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
  - Verify connection string is correct
  - Ensure password is URL-encoded (special chars like `@`, `#`, `!` need encoding)

### 4. CORS Errors on Frontend

**Error**: "CORS policy: No 'Access-Control-Allow-Origin' header"
- **Fix**: Update CORS origins in `Backend/main.py`:
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

### 5. Firebase Auth "Unauthorized Domain"

**Error**: "This domain is not authorized to run this operation"
- **Fix**: Add your domain to Firebase Console → Authentication → Authorized domains

### 6. Render Service Sleeps (Free Tier)

**Issue**: Backend is slow on first request
- **Explanation**: Render's free tier sleeps after 15 minutes of inactivity
- **Solutions**:
  - Upgrade to paid plan ($7/month)
  - Use a service like UptimeRobot to ping your API every 10 minutes
  - Accept the cold start delay (30-60 seconds)

### 7. Build Takes Too Long

**Fix**: 
- Clear Render's build cache: Dashboard → Manual Deploy → "Clear build cache"
- Reduce dependencies in `requirements.txt`

---

## 🔧 Advanced Configuration

### Custom Domain Setup

#### For Frontend (Firebase Hosting)
1. Firebase Console → Hosting → "Add custom domain"
2. Follow DNS configuration instructions
3. Wait for SSL certificate (automatic)

#### For Backend (Render)
1. Render Dashboard → Settings → "Custom Domains"
2. Add your domain
3. Point your DNS to Render's servers
4. SSL is automatic

### Environment-Based Configuration

Create different environment files:
- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production

### Continuous Deployment

Enable auto-deploy on Render:
1. Render Dashboard → Settings → "Auto-Deploy"
2. Enable "Auto-Deploy: Yes"
3. Every push to `main` branch will auto-deploy

Enable CI/CD for Firebase:
1. GitHub Actions or Firebase GitHub integration
2. Auto-deploy on push to main branch

---

## 📊 Monitoring Your Deployment

### Render Monitoring
- **Metrics**: CPU, Memory, Request count
- **Logs**: Real-time application logs
- **Events**: Deployment history

### Firebase Monitoring
- **Analytics**: User activity
- **Performance**: Page load times
- **Authentication**: Login events

### Set Up Alerts
1. Render: Email notifications for deploy failures
2. Firebase: Performance monitoring alerts
3. MongoDB Atlas: Database usage alerts

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Testing)
- **Render**: Free tier (750 hours/month, sleeps after 15min)
- **Firebase Hosting**: 10GB storage, 360MB/day transfer
- **MongoDB Atlas**: 512MB storage (shared cluster)
- **Total**: $0/month

### Production Tier
- **Render**: $7/month (Starter plan - always on)
- **Firebase Hosting**: Free tier is usually sufficient
- **MongoDB Atlas**: $9/month (Dedicated 2GB cluster)
- **Total**: ~$16/month

---

## 🚀 You're Live!

Once everything is deployed and tested:

1. **Get your live URLs**:
   - Frontend: `https://your-project-id.web.app`
   - Backend: `https://blood-buddy-api.onrender.com`

2. **Share with users!** 🎉

3. **Monitor your application**: Check logs regularly for errors

4. **Plan next steps**: Features, improvements, scaling

---

## 🆘 Need Help?

If you run into issues:
1. Check Render logs: Dashboard → Logs tab
2. Check browser console: F12 → Console
3. Verify all environment variables are set correctly
4. Try the troubleshooting section above
5. Check [Render Documentation](https://render.com/docs)
6. Check [Firebase Documentation](https://firebase.google.com/docs)

---

## 📚 Additional Resources

- [Render Python Deployment Guide](https://render.com/docs/deploy-fastapi)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [FastAPI Deployment Best Practices](https://fastapi.tiangolo.com/deployment/)

---

**Good luck with your deployment! 🩸💪**

*Remember: Deployment is an iterative process. Don't worry if things don't work perfectly the first time!*
