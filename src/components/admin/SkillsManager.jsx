// src/components/admin/SkillsManager.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const SkillsManager = () => {
//   const { skills, addSkill, updateSkill, deleteSkill } = useAdmin();
//   const [loading, setLoading] = useState(true);
//   const [editingSkill, setEditingSkill] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     logo: null,
//     logoFile: null,
//   });

//   // Handle loading state
//   useEffect(() => {
//     if (skills !== undefined) {
//       setLoading(false);
//     }
//   }, [skills]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setLogoPreview(previewUrl);
//       setFormData(prev => ({ 
//         ...prev, 
//         logoFile: file,
//         logo: previewUrl
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const skillData = {
//       ...formData,
//       logo: logoPreview || formData.logo,
//     };

//     if (editingSkill) {
//       updateSkill(editingSkill.index, skillData);
//       setEditingSkill(null);
//     } else {
//       addSkill(skillData);
//       setIsAdding(false);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({ name: '', logo: null, logoFile: null });
//     setLogoPreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleEdit = (index, skill) => {
//     setEditingSkill({ index, skill });
//     setFormData(skill);
//     setLogoPreview(skill.logo);
//     setIsAdding(true);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//     setEditingSkill(null);
//     resetForm();
//   };

//   // Show loading state
//   if (loading) {
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

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingSkill ? 'Edit Skill' : 'Add New Skill'}
//           </h2>
          
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Skill Name
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
//                 Skill Logo
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
//                     <span className="text-sm text-gray-600">Choose Logo</span>
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
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Save size={20} className="mr-2" />
//               {editingSkill ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Skills Display */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           All Skills
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
//                 key={index}
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
//                     className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                     aria-label="Edit skill"
//                   >
//                     <Edit size={18} />
//                   </button>
//                   <button
//                     onClick={() => deleteSkill(index)}
//                     className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
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
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const SkillsManager = () => {
  const { skills, addSkill, updateSkill, deleteSkill, loading, error } = useAdmin();
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    logoFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        setEditingSkill(null);
      } else {
        await addSkill(skillData);
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

  // Show loading state
  if (loading.skills) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Skills</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Skill
          </button>
        )}
      </div>

      {/* Error Display */}
      {(error || localError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error || localError}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skill name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Logo {!editingSkill && '*'}
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
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
                    className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload size={20} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formData.logoFile ? formData.logoFile.name : 'Choose Logo'}
                    </span>
                  </label>
                </div>
                {logoPreview && (
                  <div className="relative">
                    <img 
                      src={logoPreview} 
                      alt="Preview" 
                      className="w-12 h-12 object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setFormData(prev => ({ ...prev, logo: null, logoFile: null }));
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
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
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading.skills}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading.skills ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  {editingSkill ? 'Update' : 'Save'}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Skills Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          All Skills ({skills?.length || 0})
        </h2>
        
        {!skills || skills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No skills added yet.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Your First Skill
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div
                key={skill._id || index}
                className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-3">
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
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-medium">
                      {skill?.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                  <span className="font-medium text-gray-800">
                    {skill?.name || 'Unnamed Skill'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(index, skill)}
                    disabled={loading.skills}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Edit skill"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    disabled={loading.skills}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Delete skill"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;