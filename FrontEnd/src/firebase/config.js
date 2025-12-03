import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration for Blood Buddy
const firebaseConfig = {
    apiKey: "AIzaSyBSgeZouF53QsBDF6I60XWLTJHXRfBYwKw",
    authDomain: "bloodbuddy-836bb.firebaseapp.com",
    databaseURL: "https://bloodbuddy-836bb-default-rtdb.firebaseio.com",
    projectId: "bloodbuddy-836bb",
    storageBucket: "bloodbuddy-836bb.firebasestorage.app",
    messagingSenderId: "63129815280",
    appId: "1:63129815280:web:a7dc079bf2bee753225a35",
    measurementId: "G-TY2WT5TSSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
