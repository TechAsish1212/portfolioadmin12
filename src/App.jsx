// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AdminProvider } from './context/AdminContext';
import Layout from './components/admin/Layout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProjectsManager from './components/admin/ProjectsManager';
import SkillsManager from './components/admin/SkillsManager';
import EducationManager from './components/admin/EducationManager';
import QuotesManager from './components/admin/QuotesManager';
import ProfileManager from './components/admin/ProfileManager';
import { AdminProvider } from './components/context/AdminContext';



// Your main portfolio component
const Portfolio = () => {
  // Your existing portfolio code here
  return <div>Your Portfolio Content</div>;
};

export function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin Login Route - No Layout */}
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
