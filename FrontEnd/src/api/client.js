import axios from 'axios';
import { auth } from './firebase/config';

// Create axios instance with base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Firebase token to all requests
api.interceptors.request.use(
    async (config) => {
        try {
            const user = auth.currentUser;
            if (user) {
                // Get fresh token
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized - redirecting to login');
                    // You can add redirect logic here
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden - insufficient permissions');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('API Error:', error.response.data);
            }
        } else if (error.request) {
            console.error('No response from server');
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
