// import React, { useState, useRef, useEffect } from 'react';
// import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const SkillsManager = () => {
//   const { skills, addSkill, updateSkill, deleteSkill, loading, error } = useAdmin();
//   const [editingSkill, setEditingSkill] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const [localError, setLocalError] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     logo: null,
//     logoFile: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file size (limit to 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setLocalError('File size should be less than 5MB');
//         return;
//       }
      
//       // Check file type
//       if (!file.type.startsWith('image/')) {
//         setLocalError('Please upload an image file');
//         return;
//       }

//       const previewUrl = URL.createObjectURL(file);
//       setLogoPreview(previewUrl);
//       setFormData(prev => ({ 
//         ...prev, 
//         logoFile: file,
//         logo: previewUrl
//       }));
//       setLocalError(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLocalError(null);
    
//     if (!formData.name.trim()) {
//       setLocalError('Skill name is required');
//       return;
//     }

//     if (!editingSkill && !formData.logoFile && !formData.logo) {
//       setLocalError('Please upload a logo');
//       return;
//     }
    
//     try {
//       const skillData = {
//         name: formData.name.trim(),
//         logo: logoPreview || formData.logo,
//         logoFile: formData.logoFile,
//       };

//       if (editingSkill) {
//         await updateSkill(editingSkill.index, skillData);
//         setEditingSkill(null);
//       } else {
//         await addSkill(skillData);
//         setIsAdding(false);
//       }
      
//       resetForm();
//     } catch (error) {
//       setLocalError(error.response?.data?.error || error.message || 'Failed to save skill');
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: '', logo: null, logoFile: null });
//     setLogoPreview(null);
//     setLocalError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleEdit = (index, skill) => {
//     setEditingSkill({ index, skill });
//     setFormData({
//       name: skill.name || '',
//       logo: skill.logo,
//       logoFile: null,
//     });
//     setLogoPreview(skill.logo);
//     setIsAdding(true);
//     setLocalError(null);
//   };

//   const handleDelete = async (index) => {
//     if (window.confirm('Are you sure you want to delete this skill?')) {
//       try {
//         await deleteSkill(index);
//       } catch (error) {
//         setLocalError(error.response?.data?.error || error.message || 'Failed to delete skill');
//       }
//     }
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//     setEditingSkill(null);
//     resetForm();
//   };

//   // Show loading state
//   if (loading.skills) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-[400px]">
//         <div className="text-gray-600">Loading skills...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Skills</h1>
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Skill
//           </button>
//         )}
//       </div>

//       {/* Error Display */}
//       {(error || localError) && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error || localError}
//         </div>
//       )}

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingSkill ? 'Edit Skill' : 'Add New Skill'}
//           </h2>
          
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Skill Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter skill name"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Skill Logo {!editingSkill && '*'}
//               </label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleLogoUpload}
//                     accept="image/*"
//                     className="hidden"
//                     id="skill-logo"
//                   />
//                   <label
//                     htmlFor="skill-logo"
//                     className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
//                   >
//                     <Upload size={20} className="mr-2 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {formData.logoFile ? formData.logoFile.name : 'Choose Logo'}
//                     </span>
//                   </label>
//                 </div>
//                 {logoPreview && (
//                   <div className="relative">
//                     <img 
//                       src={logoPreview} 
//                       alt="Preview" 
//                       className="w-12 h-12 object-contain border rounded"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setLogoPreview(null);
//                         setFormData(prev => ({ ...prev, logo: null, logoFile: null }));
//                         if (fileInputRef.current) fileInputRef.current.value = '';
//                       }}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                       aria-label="Remove logo"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Max file size: 5MB. Supported formats: JPEG, PNG, GIF, SVG
//               </p>
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading.skills}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//             >
//               {loading.skills ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={20} className="mr-2" />
//                   {editingSkill ? 'Update' : 'Save'}
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Skills Display */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           All Skills ({skills?.length || 0})
//         </h2>
        
//         {!skills || skills.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 mb-4">No skills added yet.</p>
//             {!isAdding && (
//               <button
//                 onClick={() => setIsAdding(true)}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Plus size={20} className="mr-2" />
//                 Add Your First Skill
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {skills.map((skill, index) => (
//               <div
//                 key={skill._id || index}
//                 className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow"
//               >
//                 <div className="flex items-center space-x-3">
//                   {skill?.logo ? (
//                     <img 
//                       src={skill.logo} 
//                       alt={skill?.name || 'Skill'} 
//                       className="w-8 h-8 object-contain"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = `https://via.placeholder.com/32?text=${skill?.name?.charAt(0) || '?'}`;
//                       }}
//                     />
//                   ) : (
//                     <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-medium">
//                       {skill?.name?.charAt(0)?.toUpperCase() || '?'}
//                     </div>
//                   )}
//                   <span className="font-medium text-gray-800">
//                     {skill?.name || 'Unnamed Skill'}
//                   </span>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(index, skill)}
//                     disabled={loading.skills}
//                     className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     aria-label="Edit skill"
//                   >
//                     <Edit size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     disabled={loading.skills}
//                     className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     aria-label="Delete skill"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkillsManager;



import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Code,
  Loader,
  AlertCircle,
  CheckCircle,
  Layers
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const SkillsManager = () => {
  const { skills, addSkill, updateSkill, deleteSkill, loading, error } = useAdmin();
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    logoFile: null,
  });

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setLocalError('File size should be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setLocalError('Please upload an image file');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setFormData(prev => ({ 
        ...prev, 
        logoFile: file,
        logo: previewUrl
      }));
      setLocalError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!formData.name.trim()) {
      setLocalError('Skill name is required');
      return;
    }

    if (!editingSkill && !formData.logoFile && !formData.logo) {
      setLocalError('Please upload a logo');
      return;
    }
    
    try {
      const skillData = {
        name: formData.name.trim(),
        logo: logoPreview || formData.logo,
        logoFile: formData.logoFile,
      };

      if (editingSkill) {
        await updateSkill(editingSkill.index, skillData);
        setSuccessMessage('Skill updated successfully!');
        setEditingSkill(null);
      } else {
        await addSkill(skillData);
        setSuccessMessage('Skill added successfully!');
        setIsAdding(false);
      }
      
      resetForm();
    } catch (error) {
      setLocalError(error.response?.data?.error || error.message || 'Failed to save skill');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', logo: null, logoFile: null });
    setLogoPreview(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (index, skill) => {
    setEditingSkill({ index, skill });
    setFormData({
      name: skill.name || '',
      logo: skill.logo,
      logoFile: null,
    });
    setLogoPreview(skill.logo);
    setIsAdding(true);
    setLocalError(null);
  };

  const handleDelete = async (index) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(index);
        setSuccessMessage('Skill deleted successfully!');
      } catch (error) {
        setLocalError(error.response?.data?.error || error.message || 'Failed to delete skill');
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingSkill(null);
    resetForm();
  };

  if (loading.skills) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-3">
          <Loader className="animate-spin text-indigo-600" size={24} />
          <span className="text-gray-600">Loading skills...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </h1>
            <p className="text-gray-600 mt-1">Manage your professional skills and expertise</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add New Skill
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center animate-slideDown">
            <CheckCircle size={20} className="mr-2 flex-shrink-0" />
            {successMessage}
          </div>
        )}

        {/* Error Display */}
        {(error || localError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center animate-slideDown">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            {error || localError}
          </div>
        )}

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-3"></div>
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Skill Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Skill Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-l-xl border-2 border-r-0 border-gray-200">
                      <Code size={20} className="text-gray-600" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., React, JavaScript, Python"
                      required
                    />
                  </div>
                </div>

                {/* Right Column - Logo Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Skill Logo {!editingSkill && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1 w-full">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                        id="skill-logo"
                      />
                      <label
                        htmlFor="skill-logo"
                        className="flex items-center justify-center w-full px-4 py-3 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
                      >
                        <Upload size={20} className="mr-2 text-gray-500 group-hover:text-indigo-500" />
                        <span className="text-sm text-gray-600 group-hover:text-indigo-600">
                          {formData.logoFile ? formData.logoFile.name : 'Choose Logo'}
                        </span>
                      </label>
                    </div>
                    {logoPreview && (
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                          <img 
                            src={logoPreview} 
                            alt="Preview" 
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            setFormData(prev => ({ ...prev, logo: null, logoFile: null }));
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                          aria-label="Remove logo"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 5MB. Supported formats: JPEG, PNG, GIF, SVG
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading.skills}
                  className="px-6 py-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading.skills}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  {loading.skills ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      {editingSkill ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      {editingSkill ? 'Update Skill' : 'Save Skill'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <Layers size={20} className="mr-2 text-indigo-600" />
              Your Skills Collection
            </h2>
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {skills?.length || 0} {skills?.length === 1 ? 'Skill' : 'Skills'}
            </span>
          </div>
          
          {!skills || skills.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No skills added yet</h3>
              <p className="text-gray-600 mb-6">Start building your skill set by adding your first skill</p>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus size={20} className="mr-2" />
                  Add Your First Skill
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill._id || index}
                  className="group flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-300 transition-colors">
                        {skill?.logo ? (
                          <img 
                            src={skill.logo} 
                            alt={skill?.name || 'Skill'} 
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/32?text=${skill?.name?.charAt(0) || '?'}`;
                            }}
                          />
                        ) : (
                          <span className="text-lg font-bold text-indigo-600">
                            {skill?.name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {skill?.name || 'Unnamed Skill'}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">Technical Skill</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(index, skill)}
                      disabled={loading.skills}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                      aria-label="Edit skill"
                      title="Edit skill"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      disabled={loading.skills}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                      aria-label="Delete skill"
                      title="Delete skill"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Stats */}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SkillsManager; 