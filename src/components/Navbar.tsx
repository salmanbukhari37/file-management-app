// src/components/Navbar.tsx
import React from "react";
import { FiLogOut } from "react-icons/fi"; // Import icon for logout

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-500 font-semibold rounded-full shadow hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
