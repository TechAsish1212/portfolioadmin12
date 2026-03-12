// // src/components/admin/ProjectsManager.jsx
// import React, { useState, useRef } from 'react';
// // import { useAdmin } from '../../context/AdminContext';
// import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const ProjectsManager = () => {
//   const { portfolioProjects, addProject, updateProject, deleteProject } = useAdmin();
//   const [editingId, setEditingId] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: null,
//     imageFile: null,
//     tags: [],
//     github: '',
//     webapp: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim());
//     setFormData(prev => ({ ...prev, tags }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
      
//       // Store the file for upload
//       setFormData(prev => ({ 
//         ...prev, 
//         imageFile: file,
//         image: previewUrl // Temporary for preview
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // In a real app, you would upload the image to a server here
//     // For now, we'll use the preview URL as the image source
//     const projectData = {
//       ...formData,
//       image: imagePreview || formData.image,
//     };

//     if (editingId !== null) {
//       updateProject(editingId, { ...projectData, id: editingId });
//       setEditingId(null);
//     } else {
//       addProject(projectData);
//       setIsAdding(false);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       image: null,
//       imageFile: null,
//       tags: [],
//       github: '',
//       webapp: '',
//     });
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleEdit = (project) => {
//     setEditingId(project.id);
//     setFormData(project);
//     setImagePreview(project.image);
//     setIsAdding(true);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     resetForm();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Project
//           </button>
//         )}
//       </div>

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingId !== null ? 'Edit Project' : 'Add New Project'}
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Project Image
//               </label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     className="hidden"
//                     id="project-image"
//                   />
//                   <label
//                     htmlFor="project-image"
//                     className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
//                   >
//                     <Upload size={20} className="mr-2 text-gray-500" />
//                     <span className="text-sm text-gray-600">Choose Image</span>
//                   </label>
//                 </div>
//                 {imagePreview && (
//                   <div className="relative w-16 h-16">
//                     <img 
//                       src={imagePreview} 
//                       alt="Preview" 
//                       className="w-full h-full object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setImagePreview(null);
//                         setFormData(prev => ({ ...prev, image: null, imageFile: null }));
//                         if (fileInputRef.current) fileInputRef.current.value = '';
//                       }}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tags (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 name="tags"
//                 value={formData.tags.join(', ')}
//                 onChange={handleTagsChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 GitHub URL
//               </label>
//               <input
//                 type="url"
//                 name="github"
//                 value={formData.github}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Live Demo URL
//               </label>
//               <input
//                 type="url"
//                 name="webapp"
//                 value={formData.webapp}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Save size={20} className="mr-2" />
//               {editingId !== null ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Projects List */}
//       <div className="grid grid-cols-1 gap-6">
//         {portfolioProjects.map((project) => (
//           <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="flex flex-col md:flex-row">
//               <div className="w-full md:w-48 h-48 bg-gray-100">
//                 {project.image ? (
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">
//                     <ImageIcon size={48} />
//                   </div>
//                 )}
//               </div>
//               <div className="flex-1 p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                       {project.title}
//                     </h3>
//                     <p className="text-gray-600 mb-3">{project.description}</p>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {project.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="px-3 py-1 bg-gray-100 text-sm rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex space-x-4">
//                       {project.github && project.github !== '#' && (
//                         <a
//                           href={project.github}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-gray-600 hover:text-gray-900"
//                         >
//                           GitHub
//                         </a>
//                       )}
//                       {project.webapp && (
//                         <a
//                           href={project.webapp}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           Live Demo
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(project)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Edit size={20} />
//                     </button>
//                     <button
//                       onClick={() => deleteProject(project.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectsManager;

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
// import { useAdmin } from '../../context/AdminContext';

const ProjectsManager = () => {
  const { portfolioProjects, addProject, updateProject, deleteProject, loading, error: contextError } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imageFile: null,
    tags: [],
    github: '',
    webapp: '',
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

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setLocalError('File size should be less than 5MB');
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setLocalError('Please upload an image file (JPEG, PNG, GIF, WEBP)');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setFormData(prev => ({ 
        ...prev, 
        imageFile: file,
        image: previewUrl
      }));
      setLocalError(null);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (formData.tags.length === 0) return 'At least one tag is required';
    if (!editingId && !formData.imageFile && !formData.image) return 'Project image is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      if (editingId !== null) {
        await updateProject(editingId, formData);
        setSuccessMessage('Project updated successfully!');
        setEditingId(null);
      } else {
        await addProject(formData);
        setSuccessMessage('Project added successfully!');
        setIsAdding(false);
      }
      resetForm();
    } catch (error) {
      console.error('Submit error:', error);
      setLocalError(error.response?.data?.error || error.message || 'Failed to save project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imageFile: null,
      tags: [],
      github: '',
      webapp: '',
    });
    setImagePreview(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || null,
      imageFile: null,
      tags: project.tags || [],
      github: project.github || '',
      webapp: project.webapp || '',
    });
    setImagePreview(project.image);
    setIsAdding(true);
    setLocalError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(id);
      setSuccessMessage('Project deleted successfully!');
    } catch (error) {
      setLocalError(error.response?.data?.error || error.message || 'Failed to delete project');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  // Show loading state
  if (loading.projects && !portfolioProjects.length) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={loading.projects}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <Plus size={20} className="mr-2" />
            Add Project
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Error Display */}
      {(contextError || localError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {contextError || localError}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId !== null ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.projects}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image {!editingId && '*'}
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    id="project-image"
                    disabled={loading.projects}
                  />
                  <label
                    htmlFor="project-image"
                    className={`flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors ${
                      loading.projects ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload size={20} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formData.imageFile ? formData.imageFile.name : 'Choose Image'}
                    </span>
                  </label>
                </div>
                {imagePreview && (
                  <div className="relative w-16 h-16">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null, imageFile: null }));
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      disabled={loading.projects}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Max file size: 5MB. Supported formats: JPEG, PNG, GIF, WEBP
              </p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.projects}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags * (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="e.g., React, Node.js, MongoDB"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.projects}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading.projects}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                name="webapp"
                value={formData.webapp}
                onChange={handleInputChange}
                placeholder="https://your-app.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading.projects}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading.projects}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading.projects}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading.projects ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingId !== null ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  {editingId !== null ? 'Update' : 'Save'}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {portfolioProjects.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No projects added yet.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Your First Project
              </button>
            )}
          </div>
        ) : (
          portfolioProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 bg-gray-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/192?text=${project.title?.charAt(0) || 'P'}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags && project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {project.github && project.github !== '#' && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                        {project.webapp && (
                          <a
                            href={project.webapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        disabled={loading.projects}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit project"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={loading.projects}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete project"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Count */}
      {portfolioProjects.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-right">
          Total Projects: {portfolioProjects.length}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;