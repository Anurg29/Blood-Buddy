import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./firebase/AuthContext";
import logo from "./photo/logo (2).png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="flex w-full items-center bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-blue-600 tracking-wide">
              BloodBuddy
            </span>
          </Link>


          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-blue-600 focus:outline-none"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <nav
            className={`${open ? "block" : "hidden"
              } absolute top-[64px] left-0 w-full bg-white border-t lg:border-none lg:static lg:block lg:w-auto transition-all duration-300`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 px-6 lg:px-0 py-4 lg:py-0">
              <ListItem NavLink="/">Home</ListItem>
              <ListItem NavLink="/find-donor">Find Donor</ListItem>
              <ListItem NavLink="/about">About Us</ListItem>
              <ListItem NavLink="/become-donor">Become Donor</ListItem>
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => (
  <li>
    <Link
      to={NavLink}
      className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);
