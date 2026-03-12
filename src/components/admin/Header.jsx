// src/components/admin/Header.jsx
import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
// import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { profile, setIsAuthenticated } = useAdmin();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <header 
      className={`fixed top-0 right-0 bg-white shadow-sm z-20 transition-all duration-300 h-16
        ${sidebarOpen ? 'left-64' : 'left-20'}`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Menu Toggle and Search */}
        <div className="flex items-center flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Right Section - Time, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Digital Clock */}
          <div className="hidden lg:block text-gray-600">
            <span className="font-medium">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true 
              })}
            </span>
            <span className="text-sm text-gray-400 ml-2">
              {currentTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;