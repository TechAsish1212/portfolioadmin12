// // src/components/admin/QuotesManager.jsx
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Save, X } from "lucide-react";
// import { useAdmin } from "../context/AdminContext";
// // import { useAdmin } from "../../context/AdminContext";

// const QuotesManager = () => {
//   const { 
//     quotes, 
//     addQuote, 
//     updateQuote, 
//     deleteQuote, 
//     loading, 
//     error: contextError 
//   } = useAdmin();
  
//   const [editingId, setEditingId] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [localError, setLocalError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const [formData, setFormData] = useState({
//     text: "",
//     author: ""
//   });

//   // Clear messages after 3 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setLocalError(null);
//   };

//   // Reset Form
//   const resetForm = () => {
//     setFormData({
//       text: "",
//       author: ""
//     });
//     setEditingId(null);
//     setLocalError(null);
//   };

//   // Validate Form
//   const validateForm = () => {
//     if (!formData.text.trim()) return "Quote text is required";
//     if (!formData.author.trim()) return "Author name is required";
//     return null;
//   };

//   // Handle Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const validationError = validateForm();
//     if (validationError) {
//       setLocalError(validationError);
//       return;
//     }

//     try {
//       if (editingId) {
//         await updateQuote(editingId, formData);
//         setSuccessMessage('Quote updated successfully!');
//       } else {
//         await addQuote(formData);
//         setSuccessMessage('Quote added successfully!');
//       }
      
//       resetForm();
//       setIsAdding(false);
//     } catch (error) {
//       console.error('Submit error:', error);
//       setLocalError(error.response?.data?.error || error.message || 'Failed to save quote');
//     }
//   };

//   // Handle Edit
//   const handleEdit = (quote) => {
//     setEditingId(quote._id);
//     setFormData({
//       text: quote.text || "",
//       author: quote.author || ""
//     });
//     setIsAdding(true);
//     setLocalError(null);
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this quote?')) {
//       return;
//     }

//     try {
//       await deleteQuote(id);
//       setSuccessMessage('Quote deleted successfully!');
//     } catch (error) {
//       setLocalError(error.response?.data?.error || error.message || 'Failed to delete quote');
//     }
//   };

//   // Handle Cancel
//   const handleCancel = () => {
//     setIsAdding(false);
//     resetForm();
//   };

//   // Show loading state
//   if (loading.quotes && !quotes.length) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-[400px]">
//         <div className="text-gray-600">Loading quotes...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Quotes</h1>

//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             disabled={loading.quotes}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Quote
//           </button>
//         )}
//       </div>

//       {/* Success Message */}
//       {successMessage && (
//         <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//           {successMessage}
//         </div>
//       )}

//       {/* Error Display */}
//       {(contextError || localError) && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {contextError || localError}
//         </div>
//       )}

//       {/* Form */}
//       {isAdding && (
//         <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingId ? 'Edit Quote' : 'Add New Quote'}
//           </h2>

//           <div className="grid gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Quote Text *
//               </label>
//               <textarea
//                 name="text"
//                 value={formData.text}
//                 onChange={handleChange}
//                 placeholder="Enter the quote text..."
//                 rows="4"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 disabled={loading.quotes}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Author *
//               </label>
//               <input
//                 type="text"
//                 name="author"
//                 value={formData.author}
//                 onChange={handleChange}
//                 placeholder="e.g., Albert Einstein"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 disabled={loading.quotes}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end mt-6 space-x-3">
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={loading.quotes}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading.quotes}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//             >
//               {loading.quotes ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   {editingId ? 'Updating...' : 'Saving...'}
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} className="mr-2" />
//                   {editingId ? 'Update' : 'Save'}
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Quotes List */}
//       <div className="grid gap-4">
//         {quotes.length === 0 ? (
//           <div className="bg-white shadow rounded-lg p-12 text-center">
//             <p className="text-gray-500 mb-4">No quotes added yet.</p>
//             {!isAdding && (
//               <button
//                 onClick={() => setIsAdding(true)}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Plus size={20} className="mr-2" />
//                 Add Your First Quote
//               </button>
//             )}
//           </div>
//         ) : (
//           quotes.map((quote) => (
//             <div
//               key={quote._id}
//               className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <p className="text-lg text-gray-800 italic leading-relaxed">
//                     "{quote.text}"
//                   </p>
//                   <p className="text-gray-600 mt-3 font-medium">
//                     — {quote.author}
//                   </p>
//                 </div>

//                 <div className="flex space-x-2 ml-4">
//                   <button
//                     onClick={() => handleEdit(quote)}
//                     disabled={loading.quotes}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     title="Edit quote"
//                   >
//                     <Edit size={20} />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(quote._id)}
//                     disabled={loading.quotes}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     title="Delete quote"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Quote Count */}
//       {quotes.length > 0 && (
//         <div className="mt-4 text-sm text-gray-500 text-right">
//           Total Quotes: {quotes.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuotesManager;


import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Quote,
  User,
  Loader,
  AlertCircle,
  CheckCircle,
  MessageCircle
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLocalError(null);
  };

  const resetForm = () => {
    setFormData({
      text: "",
      author: ""
    });
    setEditingId(null);
    setLocalError(null);
  };

  const validateForm = () => {
    if (!formData.text.trim()) return "Quote text is required";
    if (!formData.author.trim()) return "Author name is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

  const handleEdit = (quote) => {
    setEditingId(quote._id);
    setFormData({
      text: quote.text || "",
      author: quote.author || ""
    });
    setIsAdding(true);
    setLocalError(null);
  };

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

  const handleCancel = () => {
    setIsAdding(false);
    resetForm();
  };

  if (loading.quotes && !quotes.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-3">
          <Loader className="animate-spin text-indigo-600" size={24} />
          <span className="text-gray-600">Loading quotes...</span>
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
              Inspirational Quotes
            </h1>
            <p className="text-gray-600 mt-1">Manage your collection of meaningful quotes</p>
          </div>

          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              disabled={loading.quotes}
              className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add New Quote
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
        {(contextError || localError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center animate-slideDown">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            {contextError || localError}
          </div>
        )}

        {/* Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-3"></div>
              {editingId ? 'Edit Quote' : 'Add New Quote'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Quote Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Quote Text <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-l-xl border-2 border-r-0 border-gray-200 h-full">
                      <Quote size={20} className="text-gray-600" />
                    </div>
                    <textarea
                      name="text"
                      value={formData.text}
                      onChange={handleChange}
                      placeholder="Enter the quote text..."
                      rows="4"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                      disabled={loading.quotes}
                    />
                  </div>
                  <p className="text-xs text-gray-500">The quote should be meaningful and inspirational</p>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-l-xl border-2 border-r-0 border-gray-200">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g., Albert Einstein"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                      disabled={loading.quotes}
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading.quotes}
                  className="px-6 py-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading.quotes}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  {loading.quotes ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      {editingId ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      {editingId ? 'Update Quote' : 'Save Quote'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quotes List */}
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No quotes yet</h3>
              <p className="text-gray-600 mb-6">Start building your collection of inspirational quotes</p>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus size={20} className="mr-2" />
                  Add Your First Quote
                </button>
              )}
            </div>
          ) : (
            quotes.map((quote, index) => (
              <div
                key={quote._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      {/* Quote Icon and Text */}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                            <Quote size={20} className="text-indigo-600 transform rotate-180" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-gray-700 italic leading-relaxed group-hover:text-gray-900 transition-colors">
                            "{quote.text}"
                          </p>
                          <div className="flex items-center mt-4">
                            <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 mr-3"></div>
                            <p className="text-gray-600 font-medium">
                              — {quote.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(quote)}
                        disabled={loading.quotes}
                        className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                        title="Edit quote"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(quote._id)}
                        disabled={loading.quotes}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                        title="Delete quote"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="relative h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))
          )}
        </div>
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

export default QuotesManager;