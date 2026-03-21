// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  GraduationCap,
  Quote,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
// import { useAdmin } from '../../context/AdminContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { setIsAuthenticated } = useAdmin();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/admin/skills', icon: Code2, label: 'Skills' },
    { path: '/admin/education', icon: GraduationCap, label: 'Education' },
    { path: '/admin/quotes', icon: Quote, label: 'Quotes' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30
        ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-gray-800">
            <span className='text-sky-400'>&lt;</span>
            <span className='text-sky-400'>Asish</span>
            <span className='text-sky-400'>/</span>
            <span className='bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent'>Kumar</span>
            <span className='text-[#8245ec]'>&gt;</span>
            </h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 ml-auto"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={20} />
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
        
        <button
          onClick={handleLogout}
          className="flex items-center p-3 mb-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;