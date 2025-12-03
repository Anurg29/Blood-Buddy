# 🩸 Blood Buddy

A modern, full-stack blood donation platform connecting donors with those in need. Built with React, FastAPI, and Firebase Authentication.

![Blood Buddy](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)

## ✨ Features

### 🔐 Authentication
- **Email/Password Authentication** - Secure user registration and login
- **Google Sign-In** - Quick authentication with Google accounts
- **Protected Routes** - Secure access to donor features
- **User Profile Management** - Profile display and logout functionality

### 🩸 Blood Donation
- **Become a Donor** - Register as a blood donor
- **Find Donors** - Search for blood donors by location and blood type
- **Interactive Map** - Visual donor location display
- **Donor Filters** - Search by blood group, location, and availability

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Framer Motion animations
- **Premium Aesthetics** - Gradient designs and modern styling
- **Tailwind CSS** - Utility-first CSS framework

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation and routing
- **Firebase SDK** - Authentication client
- **Axios** - HTTP client with interceptors
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps

### Backend
- **FastAPI** - Modern Python web framework
- **Firebase Admin SDK** - Token verification
- **MongoDB** - Database (via PyMongo)
- **Uvicorn** - ASGI server

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Firebase account
- MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/amityadav-72/Blood-Buddy.git
cd Blood-Buddy
```

### 2. Set Up Firebase
Follow the detailed guide: [FIREBASE_SETUP_WALKTHROUGH.md](./FIREBASE_SETUP_WALKTHROUGH.md)

**Quick steps:**
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password and Google authentication
3. Copy your Firebase config
4. Update `/FrontEnd/src/firebase/config.js` with your credentials

### 3. Frontend Setup
```bash
cd FrontEnd
npm install
```

Update Firebase config in `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Start the development server:
```bash
npm start
```

Frontend will run on: http://localhost:3000

### 4. Backend Setup
Follow the detailed guide: [Backend/FIREBASE_BACKEND_SETUP.md](./Backend/FIREBASE_BACKEND_SETUP.md)

**Quick steps:**
```bash
cd Backend
pip install -r requirements.txt
```

Create `.env` file:
```env
FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json
MONGODB_URI=your_mongodb_connection_string
```

Download Firebase service account key and save to `Backend/secrets/firebase-credentials.json`

Start the server:
```bash
uvicorn main:app --reload
```

Backend API will run on: http://localhost:8000
API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
Blood-Buddy/
├── FrontEnd/
│   ├── src/
│   │   ├── firebase/
│   │   │   ├── config.js          # Firebase configuration
│   │   │   └── AuthContext.js     # Authentication context
│   │   ├── api/
│   │   │   └── client.js          # Axios instance with auth
│   │   ├── Login.jsx              # Login page
│   │   ├── Signup.jsx             # Signup page
│   │   ├── ProtectedRoute.jsx     # Route guard
│   │   ├── Navbar.jsx             # Navigation with auth
│   │   ├── HomePage.jsx
│   │   ├── BecomeDonor.jsx
│   │   ├── FindDonor.jsx
│   │   └── About.jsx
│   └── package.json
│
├── Backend/
│   ├── main.py                    # FastAPI application
│   ├── utils/
│   │   └── firebase_auth.py       # Auth verification
│   ├── routes/
│   │   └── donor_routes.py
│   ├── models/
│   ├── database/
│   ├── requirements.txt
│   └── .env                       # Environment variables
│
├── FIREBASE_SETUP_WALKTHROUGH.md              # Frontend Firebase guide
└── README.md                      # This file
```

## 🔑 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)
```env
FIREBASE_CREDENTIALS=./secrets/firebase-credentials.json
MONGODB_URI=mongodb://localhost:27017/bloodbuddy
```

## 🎯 Usage Examples

### Making Authenticated API Calls

```javascript
import api from './api/client';

// The token is automatically added by the interceptor
const registerDonor = async (donorData) => {
  try {
    const response = await api.post('/api/donors/register', donorData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Protecting Backend Routes

```python
from fastapi import Depends
from utils.firebase_auth import verify_firebase_token

@router.post("/donors/register")
async def register_donor(
    donor_data: dict,
    user = Depends(verify_firebase_token)
):
    # user contains: uid, email, name
    donor_data["user_id"] = user["uid"]
    # Save to database...
    return {"success": True}
```

## 🚢 Deployment

### Frontend (Firebase Hosting)
```bash
cd FrontEnd
npm run build
firebase login
firebase init hosting
firebase deploy
```

### Backend (Railway/Heroku)
1. Set environment variable `FIREBASE_CREDENTIALS_JSON` with your service account JSON (minified)
2. Push to Railway/Heroku
3. Update frontend API URL

## 🔒 Security Features

- ✅ Firebase Authentication with email verification
- ✅ JWT token-based API authentication
- ✅ HTTP-only secure cookies
- ✅ CORS configuration
- ✅ Protected routes on frontend
- ✅ Token verification on backend
- ✅ Automatic token refresh
- ✅ Secure credential storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👥 Authors

- **Anurag Rokade** - Initial work

## 🙏 Acknowledgments

- Firebase for authentication services
- FastAPI for the amazing backend framework
- React team for the powerful UI library
- All blood donors who save lives every day

## 📞 Support

For support, email bloodbuddy@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Real-time donor availability updates
- [ ] Push notifications for urgent blood requests
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] Donor history and statistics
- [ ] Blood bank integration
- [ ] Emergency blood request system
- [ ] Donor reward/gamification system

---

Made with ❤️ for saving lives