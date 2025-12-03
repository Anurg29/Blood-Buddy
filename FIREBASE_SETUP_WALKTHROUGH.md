# 🔥 Firebase Project Setup - Step by Step Guide

Follow these exact steps to set up your Firebase project for Blood Buddy.

## ✅ Step 1: Create Firebase Project

You're currently at: https://console.firebase.google.com/

1. **Click "Add project"** (or "Create a project")
2. **Enter project name**: `Blood-Buddy` (or any name you prefer)
3. **Click Continue**
4. **Google Analytics**: 
   - Toggle OFF for simpler setup (or keep ON if you want analytics)
   - Click **Continue**
5. **Click "Create project"**
6. **Wait** for project creation (takes ~30 seconds)
7. **Click "Continue"** when done

---

## ✅ Step 2: Add Web App to Your Project

After creating the project:

1. On the project overview page, click the **Web icon** `</>`
   - It's labeled "Add an app to get started"
   - Or find it in the middle of the page

2. **Register your app**:
   - App nickname: `Blood Buddy Web`
   - ✅ Check "Also set up Firebase Hosting" (optional but recommended)
   - Click **Register app**

3. **Add Firebase SDK**:
   - You'll see a code snippet with `firebaseConfig`
   - **IMPORTANT: Copy this entire config object!**
   
   It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "blood-buddy-xxxxx.firebaseapp.com",
     projectId: "blood-buddy-xxxxx",
     storageBucket: "blood-buddy-xxxxx.firebasestorage.app",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef0123456789"
   };
   ```
   
   📝 **COPY THIS NOW** - You'll need it in Step 5!

4. Click **Continue to console**

---

## ✅ Step 3: Enable Email/Password Authentication

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Click the **Sign-in method** tab
4. Click **Email/Password** (the first option)
5. **Toggle the switch** to enable it
6. Click **Save**

---

## ✅ Step 4: Enable Google Sign-In

1. Still in **Sign-in method** tab
2. Click **Google** (scroll down if needed)
3. **Toggle the switch** to enable it
4. **Project support email**: Select your email from dropdown
5. Click **Save**

---

## ✅ Step 5: Update Frontend Configuration

Now, update your app with the config from Step 2:

### Option A: Using Code Editor

1. Open: `/Users/anuragdineshrokade/Blood-Buddy/FrontEnd/src/firebase/config.js`

2. Replace the placeholder config with YOUR config from Step 2:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",              // ← Replace with your values
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

3. **Save the file**

### Option B: I Can Update It For You

**Tell me:** "Update firebase config with my credentials" and paste your config object, and I'll update the file for you.

---

## ✅ Step 6: Download Service Account Key (For Backend)

1. In Firebase Console, click the **⚙️ gear icon** → **Project settings**
2. Click the **Service accounts** tab
3. Click **Generate new private key**
4. Click **Generate key** in the confirmation dialog
5. **A JSON file will download** - keep it safe!

### Save the Service Account Key:

**Using Terminal:**
```bash
cd /Users/anuragdineshrokade/Blood-Buddy/Backend
mkdir -p secrets
# Move your downloaded file to secrets folder
mv ~/Downloads/blood-buddy-*-firebase-adminsdk-*.json secrets/firebase-credentials.json
```

**Or Manually:**
1. Find the downloaded JSON file in your Downloads folder
2. Move it to: `/Users/anuragdineshrokade/Blood-Buddy/Backend/secrets/`
3. Rename it to: `firebase-credentials.json`

---

## ✅ Step 7: Create Backend .env File

Create a file at `/Users/anuragdineshrokade/Blood-Buddy/Backend/.env` with:

```env
FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json
MONGODB_URI=mongodb://localhost:27017/bloodbuddy
```

**I can create this for you!** Just say "create backend .env file"

---

## ✅ Step 8: Test Authentication!

Once Steps 5-7 are complete:

1. **The servers should already be running:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

2. **Go to**: http://localhost:3000/signup

3. **Create an account**:
   - Enter your name
   - Enter your email
   - Create a password (min 6 characters)
   - Confirm password
   - Click "Create Account"

4. **OR try Google Sign-In**: Click "Sign up with Google"

5. **Check if it worked**:
   - You should be redirected to the homepage
   - Your name should appear in the navbar
   - You can now access `/become-donor` and `/find-donor`

6. **Verify in Firebase Console**:
   - Go to Authentication → Users
   - You should see your newly created user!

---

## 🎉 Success Checklist

After completing all steps, you should have:

- ✅ Firebase project created
- ✅ Web app registered
- ✅ Email/Password authentication enabled
- ✅ Google sign-in enabled
- ✅ Frontend config updated
- ✅ Service account key downloaded
- ✅ Backend .env file created
- ✅ Can create new accounts
- ✅ Can login with email/password
- ✅ Can login with Google
- ✅ Protected routes work correctly

---

## 🆘 Need Help?

**Tell me where you are and I can help:**

- "I completed step 2, need help with step 3"
- "I have my Firebase config, update the frontend"
- "Create the backend .env file for me"
- "I moved the service account key, check if it's correct"
- "Test the authentication for me"

---

## 📋 Quick Reference

### File Locations:
- Frontend config: `FrontEnd/src/firebase/config.js`
- Backend env: `Backend/.env`
- Service account: `Backend/secrets/firebase-credentials.json`

### Important URLs:
- Firebase Console: https://console.firebase.google.com/
- Your App: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

**Ready to start? Tell me when you've completed Step 2 and have copied your Firebase config!**
