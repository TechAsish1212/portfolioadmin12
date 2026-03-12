// src/components/admin/Layout.jsx
import React, { useState, useEffect } from 'react';
// import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAdmin } from '../context/AdminContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main 
        className={`transition-all duration-300 pt-16 min-h-screen bg-gray-50
          ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;