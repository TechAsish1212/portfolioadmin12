import React, { createContext, useState, useContext, useEffect } from "react";
import { education, projects, SkillsInfo } from "../../assets/hello";
import { quoteApi } from "../../api/quoteApi";
import { skillApi } from "../../api/skillApi";
import { educationApi } from "../../api/educationApi";
import { projectApi } from "../../api/projectApi";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }

  return context;
};

export const AdminProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState({
    skills: false,
    projects: false,
    education: false,
    quotes: false,
    initial: true
  });
  const [error, setError] = useState(null);

  const [profile, setProfile] = useState({
    heroImage: null,
    cv: null,
    talkImg: null,
    name: "Asish",
    title: "Full Stack Developer",
    email: "your-email@example.com",
    socialLinks: {
      github: "https://github.com/TechAsish1212",
      linkedin: "https://linkedin.com/in/yourprofile",
      twitter: "https://twitter.com/yourprofile"
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount - THIS IS KEY FOR PERSISTENCE
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(prev => ({ ...prev, initial: false }));
    };

    checkAuth();
  }, []);

  // Load initial data only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSkills();
      fetchEducation();
      fetchQuotes();
      fetchProjects();
    }
  }, [isAuthenticated]);

  // =====================
  // Skills Management
  // =====================

  const fetchSkills = async () => {
    if (!isAuthenticated) return;
    
    setLoading(prev => ({ ...prev, skills: true }));
    setError(null);
    
    try {
      const response = await skillApi.getAll();
      if (response.success) {
        setSkills(response.data);
      } else {
        setSkills(SkillsInfo);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError(error.response?.data?.error || error.message);
      setSkills(SkillsInfo);
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const addSkill = async (skillData) => {
    setLoading(prev => ({ ...prev, skills: true }));
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('name', skillData.name);
      
      if (skillData.logoFile) {
        formData.append('logo', skillData.logoFile);
      }

      const response = await skillApi.create(formData);
      
      if (response.success) {
        await fetchSkills();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to add skill');
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const updateSkill = async (index, updatedSkill) => {
    setLoading(prev => ({ ...prev, skills: true }));
    setError(null);
    
    try {
      const skillToUpdate = skills[index];
      if (!skillToUpdate || !skillToUpdate._id) {
        throw new Error("Skill ID not found");
      }

      const formData = new FormData();
      formData.append('name', updatedSkill.name);
      
      if (updatedSkill.logoFile) {
        formData.append('logo', updatedSkill.logoFile);
      }

      const response = await skillApi.update(skillToUpdate._id, formData);
      
      if (response.success) {
        await fetchSkills();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update skill');
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const deleteSkill = async (index) => {
    setLoading(prev => ({ ...prev, skills: true }));
    setError(null);
    
    try {
      const skillToDelete = skills[index];
      if (!skillToDelete || !skillToDelete._id) {
        throw new Error("Skill ID not found");
      }

      const response = await skillApi.delete(skillToDelete._id);
      
      if (response.success) {
        await fetchSkills();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to delete skill');
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  // =====================
  // Education Management
  // =====================

  const fetchEducation = async () => {
    if (!isAuthenticated) return;
    
    setLoading(prev => ({ ...prev, education: true }));
    setError(null);
    
    try {
      const response = await educationApi.getAll();
      
      if (response.success) {
        setEducationList(response.data);
      } else {
        setEducationList(education);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
      setError(error.response?.data?.error || error.message);
      setEducationList(education);
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  };

  const addEducation = async (educationData) => {
    setLoading(prev => ({ ...prev, education: true }));
    setError(null);
    
    try {
      const response = await educationApi.create(educationData);
      
      if (response.success) {
        await fetchEducation();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to add education');
      }
    } catch (error) {
      console.error("Error adding education:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  };

  const updateEducation = async (id, updatedEducation) => {
    setLoading(prev => ({ ...prev, education: true }));
    setError(null);
    
    try {
      const response = await educationApi.update(id, updatedEducation);
      
      if (response.success) {
        await fetchEducation();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update education');
      }
    } catch (error) {
      console.error("Error updating education:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  };

  const deleteEducation = async (id) => {
    setLoading(prev => ({ ...prev, education: true }));
    setError(null);
    
    try {
      const response = await educationApi.delete(id);
      
      if (response.success) {
        await fetchEducation();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to delete education');
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  };

  // =====================
  // Quotes Management
  // =====================

  const fetchQuotes = async () => {
    if (!isAuthenticated) return;
    
    setLoading(prev => ({ ...prev, quotes: true }));
    setError(null);
    
    try {
      const response = await quoteApi.getAll();
      
      if (response.success) {
        setQuotes(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch quotes');
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setError(error.response?.data?.error || error.message);
      setQuotes([]);
    } finally {
      setLoading(prev => ({ ...prev, quotes: false }));
    }
  };

  const addQuote = async (quoteData) => {
    setLoading(prev => ({ ...prev, quotes: true }));
    setError(null);
    
    try {
      const response = await quoteApi.create(quoteData);
      
      if (response.success) {
        await fetchQuotes();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to add quote');
      }
    } catch (error) {
      console.error("Error adding quote:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, quotes: false }));
    }
  };

  const updateQuote = async (id, updatedQuote) => {
    setLoading(prev => ({ ...prev, quotes: true }));
    setError(null);
    
    try {
      const response = await quoteApi.update(id, updatedQuote);
      
      if (response.success) {
        await fetchQuotes();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update quote');
      }
    } catch (error) {
      console.error("Error updating quote:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, quotes: false }));
    }
  };

  const deleteQuote = async (id) => {
    setLoading(prev => ({ ...prev, quotes: true }));
    setError(null);
    
    try {
      const response = await quoteApi.delete(id);
      
      if (response.success) {
        await fetchQuotes();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to delete quote');
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, quotes: false }));
    }
  };

  // =====================
  // Projects Management
  // =====================

  const fetchProjects = async () => {
    if (!isAuthenticated) return;
    
    setLoading(prev => ({ ...prev, projects: true }));
    setError(null);
    
    try {
      const response = await projectApi.getAll();
      
      if (response.success) {
        setPortfolioProjects(response.data);
      } else {
        setPortfolioProjects(projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.response?.data?.error || error.message);
      setPortfolioProjects(projects);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const addProject = async (projectData) => {
    setLoading(prev => ({ ...prev, projects: true }));
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('tags', projectData.tags.join(', '));
      formData.append('github', projectData.github || '');
      formData.append('webapp', projectData.webapp || '');
      
      if (projectData.imageFile) {
        formData.append('image', projectData.imageFile);
      }

      const response = await projectApi.create(formData);
      
      if (response.success) {
        await fetchProjects();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to add project');
      }
    } catch (error) {
      console.error("Error adding project:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const updateProject = async (id, updatedProject) => {
    setLoading(prev => ({ ...prev, projects: true }));
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', updatedProject.title);
      formData.append('description', updatedProject.description);
      formData.append('tags', updatedProject.tags.join(', '));
      formData.append('github', updatedProject.github || '');
      formData.append('webapp', updatedProject.webapp || '');
      
      if (updatedProject.imageFile) {
        formData.append('image', updatedProject.imageFile);
      }

      const response = await projectApi.update(id, formData);
      
      if (response.success) {
        await fetchProjects();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update project');
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const deleteProject = async (id) => {
    setLoading(prev => ({ ...prev, projects: true }));
    setError(null);
    
    try {
      const response = await projectApi.delete(id);
      
      if (response.success) {
        await fetchProjects();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  // =====================
  // Authentication
  // =====================

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    // Reset all data on logout
    setSkills([]);
    setEducationList([]);
    setQuotes([]);
    setPortfolioProjects([]);
  };

  // Show loading while checking authentication
  if (loading.initial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const value = {
    // State
    skills,
    portfolioProjects,
    educationList,
    quotes,
    profile,
    isAuthenticated,
    loading,
    error,

    // Auth
    login,
    logout,
    setIsAuthenticated,

    // Skills
    addSkill,
    updateSkill,
    deleteSkill,
    fetchSkills,

    // Education
    addEducation,
    updateEducation,
    deleteEducation,
    fetchEducation,

    // Quotes
    addQuote,
    updateQuote,
    deleteQuote,
    fetchQuotes,

    // Projects
    addProject,
    updateProject,
    deleteProject,
    fetchProjects
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};