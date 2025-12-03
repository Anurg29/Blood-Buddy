import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthContext";
import HomePage from "./HomePage";
import About from "./About";
import BecomeDonor from "./BecomeDonor";
import FindDonor from "./FindDonor";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/become-donor"
            element={
              <ProtectedRoute>
                <BecomeDonor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-donor"
            element={
              <ProtectedRoute>
                <FindDonor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

