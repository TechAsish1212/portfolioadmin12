// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { AdminProvider } from './context/AdminContext';
// import Layout from './components/admin/Layout';
// import Login from './components/admin/Login';
// import Dashboard from './components/admin/Dashboard';
// import ProjectsManager from './components/admin/ProjectsManager';
// import SkillsManager from './components/admin/SkillsManager';
// import EducationManager from './components/admin/EducationManager';
// import QuotesManager from './components/admin/QuotesManager';
// import ProfileManager from './components/admin/ProfileManager';
// import { AdminProvider } from './components/context/AdminContext';



// // Your main portfolio component
// const Portfolio = () => {
//   // Your existing portfolio code here
//   return (
//   <div>Your Portfolio Content</div>
// );
// };

// export function App() {
//   return (
//     <Router>
//       <AdminProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
          
//           {/* Admin Login Route - No Layout */}
//           <Route path="/admin/login" element={<Login />} />
          
//           {/* Protected Admin Routes - With Layout */}
//           <Route path="/admin" element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           } />
//           <Route path="/admin/dashboard" element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           } />
//           <Route path="/admin/projects" element={
//             <Layout>
//               <ProjectsManager />
//             </Layout>
//           } />
//           <Route path="/admin/skills" element={
//             <Layout>
//               <SkillsManager />
//             </Layout>
//           } />
//           <Route path="/admin/education" element={
//             <Layout>
//               <EducationManager />
//             </Layout>
//           } />
//           <Route path="/admin/quotes" element={
//             <Layout>
//               <QuotesManager />
//             </Layout>
//           } />
//           <Route path="/admin/profile" element={
//             <Layout>
//               <ProfileManager />
//             </Layout>
//           } />
          
//           {/* Redirect any unknown admin routes to dashboard */}
//           <Route path="/admin/*" element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           } />
//         </Routes>
//       </AdminProvider>
//     </Router>
//   );
// }



// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/admin/Layout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProjectsManager from './components/admin/ProjectsManager';
import SkillsManager from './components/admin/SkillsManager';
import EducationManager from './components/admin/EducationManager';
import QuotesManager from './components/admin/QuotesManager';
import ProfileManager from './components/admin/ProfileManager';
import { AdminProvider } from './components/context/AdminContext';
import { LogIn, Shield, ArrowRight, Lock } from 'lucide-react';

// Your main portfolio component with login button
const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Floating Login Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/admin/login"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Icon with animation */}
          <div className="relative flex items-center gap-2">
            <Lock size={18} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Admin Login</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </Link>
      </div>

      {/* Your Portfolio Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Portfolio
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to my creative space. Explore my work, skills, and journey.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Projects Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Projects</h3>
            <p className="text-gray-600">Explore my latest work and contributions to various projects.</p>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>
            <p className="text-gray-600">Technologies and tools I work with to bring ideas to life.</p>
          </div>

          {/* Education Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
            <p className="text-gray-600">My academic background and continuous learning journey.</p>
          </div>

          {/* Quotes Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Inspiration</h3>
            <p className="text-gray-600">Words of wisdom that inspire my work and creativity.</p>
          </div>

          {/* About Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-red-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-red-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600">Learn more about my journey, passion, and what drives me.</p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact</h3>
            <p className="text-gray-600">Get in touch for collaborations or just to say hello.</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 My Portfolio. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-300">
            <Shield size={12} />
            <span>Admin access available</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          {/* Public Routes - Portfolio is the main page */}
          <Route path="/" element={<Portfolio />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes - With Layout */}
          <Route path="/admin" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/admin/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/admin/projects" element={
            <Layout>
              <ProjectsManager />
            </Layout>
          } />
          <Route path="/admin/skills" element={
            <Layout>
              <SkillsManager />
            </Layout>
          } />
          <Route path="/admin/education" element={
            <Layout>
              <EducationManager />
            </Layout>
          } />
          <Route path="/admin/quotes" element={
            <Layout>
              <QuotesManager />
            </Layout>
          } />
          <Route path="/admin/profile" element={
            <Layout>
              <ProfileManager />
            </Layout>
          } />

          {/* Redirect any unknown admin routes to dashboard */}
          <Route path="/admin/*" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
        </Routes>
      </AdminProvider>
    </Router>
  );
}