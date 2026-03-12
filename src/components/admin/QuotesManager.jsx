// // src/components/admin/QuotesManager.jsx
// import React, { useState } from 'react';
// // import { useAdmin } from '../../context/AdminContext';
// import { Plus, Edit, Trash2, Save } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const QuotesManager = () => {
//   const { quotes, addQuote, updateQuote, deleteQuote } = useAdmin();
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [formData, setFormData] = useState({
//     text: '',
//     author: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingIndex !== null) {
//       updateQuote(editingIndex, formData);
//       setEditingIndex(null);
//     } else {
//       addQuote(formData);
//       setIsAdding(false);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({ text: '', author: '' });
//   };

//   const handleEdit = (index, quote) => {
//     setEditingIndex(index);
//     setFormData(quote);
//     setIsAdding(true);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Inspiring Quotes</h1>
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Quote
//           </button>
//         )}
//       </div>

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingIndex !== null ? 'Edit Quote' : 'Add New Quote'}
//           </h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quote Text
//               </label>
//               <textarea
//                 name="text"
//                 value={formData.text}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Author
//               </label>
//               <input
//                 type="text"
//                 name="author"
//                 value={formData.author}
//                 onChange={handleInputChange}
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
//                 setEditingIndex(null);
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
//               {editingIndex !== null ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Quotes List */}
//       <div className="grid grid-cols-1 gap-4">
//         {quotes.map((quote, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-800 italic text-lg">"{quote.text}"</p>
//                 <p className="text-gray-600 mt-2">- {quote.author}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(index, quote)}
//                   className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                 >
//                   <Edit size={20} />
//                 </button>
//                 <button
//                   onClick={() => deleteQuote(index)}
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

// export default QuotesManager;


// src/components/admin/QuotesManager.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
// import { useAdmin } from "../../context/AdminContext";

const QuotesManager = () => {
  const { 
    quotes, 
    addQuote, 
    updateQuote, 
    deleteQuote, 
    loading, 
    error: contextError 
  } = useAdmin();
  
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    text: "",
    author: ""
  });

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLocalError(null);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      text: "",
      author: ""
    });
    setEditingId(null);
    setLocalError(null);
  };

  // Validate Form
  const validateForm = () => {
    if (!formData.text.trim()) return "Quote text is required";
    if (!formData.author.trim()) return "Author name is required";
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
        await updateQuote(editingId, formData);
        setSuccessMessage('Quote updated successfully!');
      } else {
        await addQuote(formData);
        setSuccessMessage('Quote added successfully!');
      }
      
      resetForm();
      setIsAdding(false);
    } catch (error) {
      console.error('Submit error:', error);
      setLocalError(error.response?.data?.error || error.message || 'Failed to save quote');
    }
  };

  // Handle Edit
  const handleEdit = (quote) => {
    setEditingId(quote._id);
    setFormData({
      text: quote.text || "",
      author: quote.author || ""
    });
    setIsAdding(true);
    setLocalError(null);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) {
      return;
    }

    try {
      await deleteQuote(id);
      setSuccessMessage('Quote deleted successfully!');
    } catch (error) {
      setLocalError(error.response?.data?.error || error.message || 'Failed to delete quote');
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setIsAdding(false);
    resetForm();
  };

  // Show loading state
  if (loading.quotes && !quotes.length) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading quotes...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Quotes</h1>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={loading.quotes}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <Plus size={20} className="mr-2" />
            Add Quote
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
            {editingId ? 'Edit Quote' : 'Add New Quote'}
          </h2>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote Text *
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter the quote text..."
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.quotes}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g., Albert Einstein"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading.quotes}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading.quotes}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading.quotes}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading.quotes ? (
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

      {/* Quotes List */}
      <div className="grid gap-4">
        {quotes.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No quotes added yet.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Your First Quote
              </button>
            )}
          </div>
        ) : (
          quotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-lg text-gray-800 italic leading-relaxed">
                    "{quote.text}"
                  </p>
                  <p className="text-gray-600 mt-3 font-medium">
                    — {quote.author}
                  </p>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(quote)}
                    disabled={loading.quotes}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Edit quote"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(quote._id)}
                    disabled={loading.quotes}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete quote"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quote Count */}
      {quotes.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-right">
          Total Quotes: {quotes.length}
        </div>
      )}
    </div>
  );
};

export default QuotesManager;