// // src/components/admin/EducationManager.jsx
// import React, { useState } from 'react';
// // import { useAdmin } from '../../context/AdminContext';
// import { Plus, Edit, Trash2, Save } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const EducationManager = () => {
//   const { educationList, addEducation, updateEducation, deleteEducation } = useAdmin();
//   const [editingId, setEditingId] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [formData, setFormData] = useState({
//     school: '',
//     degree: '',
//     date: '',
//     desc: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId !== null) {
//       updateEducation(editingId, { ...formData, id: editingId });
//       setEditingId(null);
//     } else {
//       addEducation(formData);
//       setIsAdding(false);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       school: '',
//       degree: '',
//       date: '',
//       desc: '',
//     });
//   };

//   const handleEdit = (edu) => {
//     setEditingId(edu.id);
//     setFormData(edu);
//     setIsAdding(true);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Education</h1>
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Education
//           </button>
//         )}
//       </div>

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingId !== null ? 'Edit Education' : 'Add New Education'}
//           </h2>
          
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 School/Institution
//               </label>
//               <input
//                 type="text"
//                 name="school"
//                 value={formData.school}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Degree
//               </label>
//               <input
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date/Year
//               </label>
//               <input
//                 type="text"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="desc"
//                 value={formData.desc}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsAdding(false);
//                 setEditingId(null);
//                 resetForm();
//               }}
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

//       {/* Education List */}
//       <div className="space-y-4">
//         {educationList.map((edu) => (
//           <div key={edu.id} className="bg-white rounded-lg shadow p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
//                 <p className="text-blue-600 font-medium mt-1">{edu.degree}</p>
//                 <p className="text-sm text-gray-500 mt-1">{edu.date}</p>
//                 <p className="text-gray-600 mt-2">{edu.desc}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(edu)}
//                   className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                 >
//                   <Edit size={20} />
//                 </button>
//                 <button
//                   onClick={() => deleteEducation(edu.id)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EducationManager;


// src/components/admin/EducationManager.jsx

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
// import { useAdmin } from "../../context/AdminContext";

const EducationManager = () => {
  const { 
    educationList, 
    addEducation, 
    updateEducation, 
    deleteEducation, 
    loading, 
    error: contextError 
  } = useAdmin();
  
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    date: "",
    description: ""
  });

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      school: "",
      degree: "",
      date: "",
      description: ""
    });
    setEditingId(null);
    setLocalError(null);
  };

  // Validate Form
  const validateForm = () => {
    if (!formData.school.trim()) return "School name is required";
    if (!formData.degree.trim()) return "Degree is required";
    if (!formData.date.trim()) return "Year/Duration is required";
    if (!formData.description.trim()) return "Description is required";
    return null;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      if (editingId) {
        await updateEducation(editingId, formData);
        setSuccessMessage('Education updated successfully!');
      } else {
        await addEducation(formData);
        setSuccessMessage('Education added successfully!');
      }
      
      resetForm();
      setIsAdding(false);
    } catch (error) {
      console.error('Submit error:', error);
      setLocalError(error.response?.data?.error || error.message || 'Failed to save education');
    }
  };

  // Handle Edit
  const handleEdit = (edu) => {
    setEditingId(edu._id);
    setFormData({
      school: edu.school || "",
      degree: edu.degree || "",
      date: edu.date || "",
      description: edu.description || ""
    });
    setIsAdding(true);
    setLocalError(null);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) {
      return;
    }

    try {
      await deleteEducation(id);
      setSuccessMessage('Education deleted successfully!');
    } catch (error) {
      setLocalError(error.response?.data?.error || error.message || 'Failed to delete education');
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setIsAdding(false);
    resetForm();
  };

  // Show loading state
  if (loading.education && !educationList.length) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading education...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Education</h1>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={loading.education}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <Plus size={20} className="mr-2" />
            Add Education
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

      {/* Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h2>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School / Institution *
              </label>
              <input
                type="text"
                name="school"
                placeholder="e.g., University of Technology"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.education}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                name="degree"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.education}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year / Duration *
              </label>
              <input
                type="text"
                name="date"
                placeholder="e.g., 2020 - 2024"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.education}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe your studies, achievements, etc."
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.education}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading.education}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading.education}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading.education ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingId ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {editingId ? 'Update' : 'Save'}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {educationList.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No education records added yet.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Your First Education
              </button>
            )}
          </div>
        ) : (
          educationList.map((edu) => (
            <div key={edu._id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{edu.school}</h3>
                      <p className="text-lg text-blue-600 mt-1">{edu.degree}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {edu.date}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600 whitespace-pre-line">{edu.description}</p>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(edu)}
                    disabled={loading.education}
                    className="p-2 text-blue-600  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Edit"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(edu._id)}
                    disabled={loading.education}
                    className="p-2 text-red-600  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EducationManager;