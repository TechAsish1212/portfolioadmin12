// src/components/admin/ProfileManager.jsx
import React, { useState, useRef } from 'react';
// import { useAdmin } from '../../context/AdminContext';
import { 
  Save, 
  Camera, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Download,
  Upload
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const ProfileManager = () => {
  const { profile, setProfile } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [activeTab, setActiveTab] = useState('personal');
  const fileInputRef = useRef(null);
  const cvInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setFormData(prev => ({ ...prev, profileImage: reader.result }));
        } else if (type === 'hero') {
          setFormData(prev => ({ ...prev, heroImage: reader.result }));
        } else if (type === 'talk') {
          setFormData(prev => ({ ...prev, talkImg: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      const cvUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, cv: cvUrl, cvName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'social', label: 'Social Links' },
    { id: 'images', label: 'Images & CV' },
    // { id: 'preferences', label: 'Preferences' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData(profile);
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end -mt-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {formData?.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {formData?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <Camera size={16} />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleImageUpload(e, 'profile')}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                {formData?.name || 'Your Name'}
              </h2>
              <p className="text-gray-600">{formData?.title || 'Your Title'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData?.title || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail size={18} className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={formData?.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
               
                
              </div>
              
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <div className="flex items-center">
                  <Github size={18} className="text-gray-400 mr-2" />
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData?.socialLinks?.github || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <div className="flex items-center">
                  <Linkedin size={18} className="text-gray-400 mr-2" />
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData?.socialLinks?.linkedin || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              
              
            </div>
          )}

          {/* Images & CV Tab */}
          {activeTab === 'images' && (
            <div className="space-y-6 lg:flex lg:flex-row gap-6 md:flex-col">
              {/* Hero Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                    {formData?.heroImage ? (
                      <img 
                        src={formData.heroImage} 
                        alt="Hero" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Upload size={18} className="inline mr-2" />
                      Upload Image
                    </button>
                  )}
                </div>
              </div>

              {/* Talk Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Talk Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                    {formData?.talkImg ? (
                      <img 
                        src={formData.talkImg} 
                        alt="Talk" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Upload size={18} className="inline mr-2" />
                      Upload Image
                    </button>
                  )}
                </div>
              </div>

              {/* CV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV
                </label>
                <div className="flex items-center space-x-4">
                  {formData?.cv && (
                    <a
                      href={formData.cv}
                      download
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Download size={18} className="mr-2" />
                      Download CV
                    </a>
                  )}
                  {isEditing && (
                    <>
                      <button
                        onClick={() => cvInputRef.current.click()}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        <Upload size={18} className="inline mr-2" />
                        Upload New CV
                      </button>
                      <input
                        type="file"
                        ref={cvInputRef}
                        onChange={handleCVUpload}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
                {formData?.cvName && (
                  <p className="text-sm text-gray-500 mt-2">
                    Current file: {formData.cvName}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email about your portfolio activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData?.emailNotifications}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      emailNotifications: e.target.checked 
                    }))}
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Toggle dark mode for admin panel</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData?.darkMode}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      darkMode: e.target.checked 
                    }))}
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Public Profile</h3>
                  <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData?.publicProfile}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      publicProfile: e.target.checked 
                    }))}
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;