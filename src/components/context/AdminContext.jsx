import React, { createContext, useState, useContext, useEffect } from "react";
import { education, projects, SkillsInfo } from "../../assets/hello";
import { quoteApi } from "../../api/quoteApi";
import { skillApi } from "../../api/skillApi";
import { educationApi } from "../../api/educationApi";
import { projectApi } from "../../api/projectApi";
import { profileApi } from "../../api/profileApi";
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
  // =====================
  // State Declarations
  // =====================
  const [skills, setSkills] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [quotes, setQuotes] = useState([]);
  
  const [loading, setLoading] = useState({
    skills: false,
    projects: false,
    education: false,
    quotes: false,
    profile: false,
    initial: true
  });
  
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  // Profile state matching backend schema
  const [profile, setProfile] = useState({
    // Personal Info
    name: "Asish",
    title: "Full Stack Developer",
    
    // Images (matching backend field names)
    heroImage: null,
    heroImage_public_id: null,
    cv: null,
    cv_public_id: null,
    talkImg: null,
    talkImg_public_id: null,
    profileImg: null,
    profileImg_public_id: null,
    
    // Social Links (matching backend structure)
    socialLinks: {
      github: "https://github.com/TechAsish1212",
      linkedin: "https://linkedin.com/in/yourprofile",
    }
  });

  // =====================
  // Initialization & Auth
  // =====================

  // Load stored data on mount
  useEffect(() => {
    const loadStoredData = () => {
      // Load profile
      const storedProfile = localStorage.getItem('adminProfile');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        if (parsedProfile.name) {
          setAdminName(parsedProfile.name);
        }
      }

      // Load admin name
      const storedName = localStorage.getItem('adminName');
      if (storedName) {
        setAdminName(storedName);
      }
    };
    loadStoredData();
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const storedName = localStorage.getItem('adminName');
      
      if (token) {
        setIsAuthenticated(true);
        if (storedName) {
          setAdminName(storedName);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(prev => ({ ...prev, initial: false }));
    };

    checkAuth();
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('adminProfile', JSON.stringify(profile));
      if (profile.name && profile.name !== adminName) {
        setAdminName(profile.name);
        localStorage.setItem('adminName', profile.name);
      }
    }
  }, [profile, isAuthenticated]);

  // Load initial data only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSkills();
      fetchEducation();
      fetchQuotes();
      fetchProjects();
      fetchProfile();
    }
  }, [isAuthenticated]);

  // =====================
  // Profile Management (Matching Backend)
  // =====================

  const fetchProfile = async () => {
    if (!isAuthenticated) return;
    
    setLoading(prev => ({ ...prev, profile: true }));
    setError(null);
    
    try {
      const response = await profileApi.get();
      if (response.success && response.data) {
        setProfile(response.data);
        if (response.data.name) {
          setAdminName(response.data.name);
          localStorage.setItem('adminName', response.data.name);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Append text fields (matching backend field names)
      if (profileData.name) formData.append('name', profileData.name);
      if (profileData.title) formData.append('title', profileData.title);
      
      // Append social links (matching backend field names)
      if (profileData.socialLinks?.github) formData.append('github', profileData.socialLinks.github);
      if (profileData.socialLinks?.linkedin) formData.append('linkedin', profileData.socialLinks.linkedin);
      
      // Append files if they exist (matching backend field names)
      if (profileData.heroImageFile) {
        formData.append('heroImage', profileData.heroImageFile);
      }
      
      if (profileData.talkImgFile) {
        formData.append('talkImg', profileData.talkImgFile);
      }
      
      if (profileData.cvFile) {
        formData.append('resume', profileData.cvFile); // Note: backend uses 'resume' not 'cv'
      }

      const response = await profileApi.update(formData);
      
      if (response.success) {
        setProfile(response.data);
        if (response.data.name) {
          setAdminName(response.data.name);
          localStorage.setItem('adminName', response.data.name);
        }
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.error || error.message);
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

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

  const login = (token, name) => {
    localStorage.setItem('adminToken', token);
    const displayName = name || profile.name || "Admin";
    localStorage.setItem('adminName', displayName);
    setAdminName(displayName);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminProfile');
    setIsAuthenticated(false);
    setAdminName("Admin");
    
    // Reset all data on logout
    setSkills([]);
    setEducationList([]);
    setQuotes([]);
    setPortfolioProjects([]);
    
    // Reset profile to default
    setProfile({
      name: "Asish",
      title: "Full Stack Developer",
      heroImage: null,
      heroImage_public_id: null,
      cv: null,
      cv_public_id: null,
      talkImg: null,
      talkImg_public_id: null,
      socialLinks: {
        github: "https://github.com/TechAsish1212",
        linkedin: "https://linkedin.com/in/yourprofile",
      }
    });
  };

  // Show loading while checking authentication
  if (loading.initial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // =====================
  // Context Value
  // =====================

  const value = {
    // State
    skills,
    portfolioProjects,
    educationList,
    quotes,
    profile,
    setProfile,
    isAuthenticated,
    loading,
    error,
    adminName,

    // Auth
    login,
    logout,
    setIsAuthenticated,

    // Profile
    fetchProfile,
    updateProfile,

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