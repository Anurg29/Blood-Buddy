# 🚀 Quick Start Guide - Blood Buddy with Firebase Authentication

Congratulations! Firebase Authentication has been successfully integrated into your Blood Buddy application. This guide will help you get everything running.

## 📋 What's Been Added

### ✅ Frontend Features
- **Login Page** (`/login`) - Email/password and Google sign-in
- **Signup Page** (`/signup`) - User registration with validation
- **Protected Routes** - Secure access to donor features
- **Auth Context** - Global authentication state management
- **Updated Navbar** - User profile display and logout
- **API Client** - Axios instance with automatic token injection

### ✅ Backend Features
- **Firebase Admin SDK** integration for token verification
- **Authentication middleware** for protecting routes
- **Startup event** to initialize Firebase
- **Security** - Credentials properly gitignored

### 📁 New Files Created

**Frontend:**
```
FrontEnd/src/
├── firebase/
│   ├── config.js           # Firebase config (NEEDS YOUR CREDENTIALS)
│   └── AuthContext.js      # Auth state management
├── api/
│   └── client.js          # Axios with auto-auth
├── Login.jsx              # Login component
├── Signup.jsx             # Signup component  
└── ProtectedRoute.jsx     # Route protection
```

**Backend:**
```
Backend/
├── utils/
│   └── firebase_auth.py   # Token verification
└── FIREBASE_BACKEND_SETUP.md
```

**Documentation:**
```
├── FIREBASE_SETUP_WALKTHROUGH.md      # Frontend setup guide
├── setup.sh              # Automated setup script
└── README.md             # Updated with auth info
```

## 🎯 Next Steps (In Order)

### Step 1: Set Up Firebase Project (15 minutes)

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
   - Click "Add project" or select existing
   - Name it "Blood Buddy"

2. **Add Web App**
   - Click Web icon (`</>`)
   - Register app
   - **COPY the config object** - you'll need this!

3. **Enable Authentication**
   - Go to Authentication → Get Started
   - Enable "Email/Password"
   - Enable "Google"

4. **Download Service Account** (for backend)
   - Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

📖 **Detailed guide:** [FIREBASE_SETUP_WALKTHROUGH.md](./FIREBASE_SETUP_WALKTHROUGH.md)

### Step 2: Configure Frontend (5 minutes)

1. **Update Firebase Config**
   
   Open: `/Users/anuragdineshrokade/Blood-Buddy/FrontEnd/src/firebase/config.js`
   
   Replace with YOUR credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",                    // From Firebase Console
     authDomain: "your-app.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-app.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc..."
   };
   ```

2. **Test Frontend**
   ```bash
   cd FrontEnd
   npm start
   ```
   
   Visit: http://localhost:3000/signup

### Step 3: Configure Backend (5 minutes)

1. **Save Service Account JSON**
   ```bash
   cd Backend
   mkdir -p secrets
   # Move your downloaded JSON file here:
   mv ~/Downloads/blood-buddy-*-firebase-adminsdk-*.json secrets/firebase-credentials.json
   ```

2. **Create .env file**
   ```bash
   cd Backend
   cat > .env << 'EOF'
   FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json
   MONGODB_URI=mongodb://localhost:27017/bloodbuddy
   EOF
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Test Backend**
   ```bash
   uvicorn main:app --reload
   ```
   
   Visit: http://localhost:8000/docs

📖 **Detailed guide:** [Backend/FIREBASE_BACKEND_SETUP.md](./Backend/FIREBASE_BACKEND_SETUP.md)

### Step 4: Test the Integration (5 minutes)

1. **Start Both Servers**
   
   Terminal 1 (Frontend):
   ```bash
   cd FrontEnd
   npm start
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd Backend
   source venv/bin/activate  # if using venv
   uvicorn main:app --reload
   ```

2. **Try Authentication**
   - Go to http://localhost:3000/signup
   - Create an account with email/password
   - Try signing in with Google
   - Check that protected routes work
   - Verify your profile appears in navbar

3. **Verify in Firebase Console**
   - Go to Authentication → Users
   - You should see your registered users!

## 🎨 How It Works

### Frontend Flow
```
User clicks Login → 
Firebase SDK authenticates → 
Receives ID token → 
Token stored in memory → 
API client adds token to requests automatically
```

### Backend Flow
```
Request received → 
Extract Bearer token → 
Firebase Admin verifies token → 
Returns user info (uid, email) → 
Route handler uses user data
```

### Protected Routes
```javascript
// Frontend - User must be logged in to access
<Route path="/become-donor" element={
  <ProtectedRoute>
    <BecomeDonor />
  </ProtectedRoute>
} />
```

```python
# Backend - Verify Firebase token
@router.post("/donors/register")
async def register(user = Depends(verify_firebase_token)):
    # user contains: uid, email, name
    donor_id = user["uid"]
    ...
```

## 🔍 Testing Checklist

- [ ] Can create account with email/password
- [ ] Can login with email/password
- [ ] Can login with Google
- [ ] Can't access `/become-donor` when logged out (redirects to login)
- [ ] Can access `/become-donor` when logged in
- [ ] Profile shows in navbar when logged in
- [ ] Can logout successfully
- [ ] Backend receives user info from token

## 🐛 Common Issues & Solutions

### "Firebase: Error (auth/configuration-not-found)"
**Solution:** Update `FrontEnd/src/firebase/config.js` with your credentials

### "Cannot find module 'firebase'"
**Solution:** Run `npm install` in FrontEnd directory

### "Firebase credentials not found" (Backend)
**Solution:** 
- Check `.env` file exists in Backend/
- Verify path to service account JSON
- Ensure JSON file is valid

### "401 Unauthorized" on API calls
**Solution:**
- Check user is logged in
- Verify token is being sent (check Network tab)
- Ensure backend Firebase is initialized correctly

### Google Sign-In not working
**Solution:**
- Enable Google provider in Firebase Console
- Add support email in Firebase settings

## 📚 Additional Resources

- **Frontend Setup:** [FIREBASE_SETUP_WALKTHROUGH.md](./FIREBASE_SETUP_WALKTHROUGH.md)
- **Backend Setup:** [Backend/FIREBASE_BACKEND_SETUP.md](./Backend/FIREBASE_BACKEND_SETUP.md)
- **Full Documentation:** [README.md](./README.md)
- **Firebase Docs:** https://firebase.google.com/docs/auth
- **FastAPI Security:** https://fastapi.tiangolo.com/tutorial/security/

## 🎉 You're Ready!

Your Blood Buddy application now has:
- ✅ Secure user authentication
- ✅ Protected routes
- ✅ User profile management
- ✅ Backend token verification
- ✅ Beautiful login/signup pages

Start building your donor features with confidence that only authenticated users can access them!

## 💡 Pro Tips

1. **Use the API client** (`src/api/client.js`) for all API calls - it handles auth automatically
2. **Access current user** anywhere with `const { currentUser } = useAuth()`
3. **Protect sensitive routes** in backend with `Depends(verify_firebase_token)`
4. **Check console** for helpful error messages during development
5. **Test logout** frequently to ensure auth state is managed correctly

---

Need help? Check the documentation files or open an issue!

Happy coding! 🩸💻
