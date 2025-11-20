import React from "react";
import logo from "./photo/logo (2).png";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright Section */}
          <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
            <img
              src={logo}
              alt="BloodBuddy Logo"
              className="h-8 w-auto mr-3" // Adjust height as needed
            />
            <p className="text-gray-600 text-sm md:text-base">
              © {new Date().getFullYear()} BloodBuddy — All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="/about" className="hover:text-gray-700 transition-colors duration-200">
              About
            </a>
            <a href="/find-donor" className="hover:text-gray-700 transition-colors duration-200">
              Find Donor
            </a>
            <a href="/become-donor" className="hover:text-gray-700 transition-colors duration-200">
              Become Donor
            </a>
            
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-xs text-gray-400">
            A life-saving initiative connecting blood donors with recipients in emergency situations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;