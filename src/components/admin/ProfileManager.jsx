// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Save, 
//   Camera, 
//   Github, 
//   Linkedin, 
//   Mail, 
//   Phone, 
//   Download,
//   Upload,
//   Loader
// } from 'lucide-react';
// import { useAdmin } from '../context/AdminContext';

// const ProfileManager = () => {
//   const { profile, setProfile, updateProfile, loading } = useAdmin();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(profile);
//   const [activeTab, setActiveTab] = useState('personal');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  
//   // File refs
//   const profileFileRef = useRef(null);
//   const heroFileRef = useRef(null);
//   const talkFileRef = useRef(null);
//   const cvFileRef = useRef(null);

//   // Update formData when profile changes
//   useEffect(() => {
//     setFormData(profile);
//   }, [profile]);

//   // Clear messages after 3 seconds
//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage('');
//         setErrorMessage('');
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileSelect = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setErrorMessage('File size should be less than 5MB');
//       return;
//     }

//     // Validate file type for images
//     if (type !== 'cv') {
//       const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!validImageTypes.includes(file.type)) {
//         setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
//         return;
//       }
//     }

//     // Validate CV file type
//     if (type === 'cv') {
//       const validCvTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//       if (!validCvTypes.includes(file.type)) {
//         setErrorMessage('Please upload a PDF or DOC file');
//         return;
//       }
//     }

//     // Create preview URL for images
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       switch(type) {
//         case 'profile':
//           setFormData(prev => ({ 
//             ...prev, 
//             profileImg: reader.result,
//             profileImageFile: file 
//           }));
//           break;
//         case 'hero':
//           setFormData(prev => ({ 
//             ...prev, 
//             heroImage: reader.result,
//             heroImageFile: file 
//           }));
//           break;
//         case 'talk':
//           setFormData(prev => ({ 
//             ...prev, 
//             talkImg: reader.result,
//             talkImgFile: file 
//           }));
//           break;
//         case 'cv':
//           setFormData(prev => ({ 
//             ...prev, 
//             cv: URL.createObjectURL(file),
//             cvName: file.name,
//             cvFile: file 
//           }));
//           break;
//         default:
//           break;
//       }
//     };

//     if (type !== 'cv') {
//       reader.readAsDataURL(file);
//     } else {
//       // For CV, just store the file info
//       setFormData(prev => ({ 
//         ...prev, 
//         cv: URL.createObjectURL(file),
//         cvName: file.name,
//         cvFile: file 
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     try {
//       await updateProfile(formData);
//       setSuccessMessage('Profile updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       setErrorMessage(error.message || 'Failed to update profile');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setFormData(profile);
//     setErrorMessage('');
//   };

//   const tabs = [
//     { id: 'personal', label: 'Personal Info' },
//     { id: 'social', label: 'Social Links' },
//     { id: 'images', label: 'Images & CV' },
//   ];

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <div className="space-x-3">
//             <button
//               onClick={handleCancel}
//               disabled={isSubmitting}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 flex items-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader size={18} className="animate-spin mr-2" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} className="mr-2" />
//                   Save Changes
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Messages */}
//       {successMessage && (
//         <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//           {successMessage}
//         </div>
//       )}
//       {errorMessage && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {errorMessage}
//         </div>
//       )}

//       {/* Profile Header Card */}
//       <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
//         <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//         <div className="px-6 pb-6">
//           <div className="flex flex-col md:flex-row md:items-end -mt-12">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
//                 {formData?.profileImg ? (
//                   <img 
//                     src={formData.profileImg} 
//                     alt="Profile" 
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                     <span className="text-white text-2xl font-bold">
//                       {formData?.name?.charAt(0)?.toUpperCase() || 'A'}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               {isEditing && (
//                 <>
//                   <button
//                     onClick={() => profileFileRef.current.click()}
//                     className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                     type="button"
//                   >
//                     <Camera size={16} />
//                   </button>
//                   <input
//                     type="file"
//                     ref={profileFileRef}
//                     onChange={(e) => handleFileSelect(e, 'profile')}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                 </>
//               )}
//             </div>
//             <div className="md:ml-6 mt-4 md:mt-0 flex-1">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {formData?.name || 'Your Name'}
//               </h2>
//               <p className="text-gray-600">{formData?.title || 'Your Title'}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="border-b px-6">
//           <nav className="flex space-x-6 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
//                   ${activeTab === tab.id
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-6">
//           {/* Personal Info Tab */}
//           {activeTab === 'personal' && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData?.name || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Professional Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData?.title || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//                     placeholder="e.g., Full Stack Developer"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Social Links Tab */}
//           {activeTab === 'social' && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   GitHub Profile
//                 </label>
//                 <div className="flex items-center">
//                   <Github size={18} className="text-gray-400 mr-2 flex-shrink-0" />
//                   <input
//                     type="url"
//                     name="socialLinks.github"
//                     value={formData?.socialLinks?.github || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//                     placeholder="https://github.com/username"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   LinkedIn Profile
//                 </label>
//                 <div className="flex items-center">
//                   <Linkedin size={18} className="text-gray-400 mr-2 flex-shrink-0" />
//                   <input
//                     type="url"
//                     name="socialLinks.linkedin"
//                     value={formData?.socialLinks?.linkedin || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//                     placeholder="https://linkedin.com/in/username"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Images & CV Tab */}
//           {activeTab === 'images' && (
//             <div className="space-y-8">
//               {/* Hero Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Hero Image
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">
//                     {formData?.heroImage ? (
//                       <img 
//                         src={formData.heroImage} 
//                         alt="Hero" 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400">
//                         No image
//                       </div>
//                     )}
//                   </div>
//                   {isEditing && (
//                     <>
//                       <button
//                         onClick={() => heroFileRef.current.click()}
//                         className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//                         type="button"
//                       >
//                         <Upload size={18} className="mr-2" />
//                         Upload Hero Image
//                       </button>
//                       <input
//                         type="file"
//                         ref={heroFileRef}
//                         onChange={(e) => handleFileSelect(e, 'hero')}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Talk Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Talk Image
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">
//                     {formData?.talkImg ? (
//                       <img 
//                         src={formData.talkImg} 
//                         alt="Talk" 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400">
//                         No image
//                       </div>
//                     )}
//                   </div>
//                   {isEditing && (
//                     <>
//                       <button
//                         onClick={() => talkFileRef.current.click()}
//                         className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//                         type="button"
//                       >
//                         <Upload size={18} className="mr-2" />
//                         Upload Talk Image
//                       </button>
//                       <input
//                         type="file"
//                         ref={talkFileRef}
//                         onChange={(e) => handleFileSelect(e, 'talk')}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* CV */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Resume/CV
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   {formData?.cv && (
//                     <a
//                       href={formData.cv}
//                       download={formData.cvName || 'resume.pdf'}
//                       className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Download size={18} className="mr-2" />
//                       Download CV
//                     </a>
//                   )}
//                   {isEditing && (
//                     <>
//                       <button
//                         onClick={() => cvFileRef.current.click()}
//                         className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//                         type="button"
//                       >
//                         <Upload size={18} className="mr-2" />
//                         Upload New CV
//                       </button>
//                       <input
//                         type="file"
//                         ref={cvFileRef}
//                         onChange={(e) => handleFileSelect(e, 'cv')}
//                         accept=".pdf,.doc,.docx"
//                         className="hidden"
//                       />
//                     </>
//                   )}
//                 </div>
//                 {formData?.cvName && (
//                   <p className="text-sm text-gray-500 mt-2">
//                     Current file: {formData.cvName}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileManager;


import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  Camera, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download,
  Upload,
  Loader,
  User,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const ProfileManager = () => {
  const { profile, setProfile, updateProfile, loading } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // File refs
  const profileFileRef = useRef(null);
  const heroFileRef = useRef(null);
  const talkFileRef = useRef(null);
  const cvFileRef = useRef(null);

  // Update formData when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

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

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size should be less than 5MB');
      return;
    }

    // Validate file type for images
    if (type !== 'cv') {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
        return;
      }
    }

    // Validate CV file type
    if (type === 'cv') {
      const validCvTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validCvTypes.includes(file.type)) {
        setErrorMessage('Please upload a PDF or DOC file');
        return;
      }
    }

    // Create preview URL for images
    const reader = new FileReader();
    reader.onloadend = () => {
      switch(type) {
        case 'profile':
          setFormData(prev => ({ 
            ...prev, 
            profileImg: reader.result,
            profileImageFile: file 
          }));
          break;
        case 'hero':
          setFormData(prev => ({ 
            ...prev, 
            heroImage: reader.result,
            heroImageFile: file 
          }));
          break;
        case 'talk':
          setFormData(prev => ({ 
            ...prev, 
            talkImg: reader.result,
            talkImgFile: file 
          }));
          break;
        case 'cv':
          setFormData(prev => ({ 
            ...prev, 
            cv: URL.createObjectURL(file),
            cvName: file.name,
            cvFile: file 
          }));
          break;
        default:
          break;
      }
    };

    if (type !== 'cv') {
      reader.readAsDataURL(file);
    } else {
      // For CV, just store the file info
      setFormData(prev => ({ 
        ...prev, 
        cv: URL.createObjectURL(file),
        cvName: file.name,
        cvFile: file 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await updateProfile(formData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
    setErrorMessage('');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'social', label: 'Social Links', icon: LinkIcon },
    { id: 'images', label: 'Images & CV', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage your personal information and public profile</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Edit Profile
            </button>
          ) : (
            <div className="mt-4 md:mt-0 space-x-3">
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center animate-slideDown">
            <CheckCircle size={20} className="mr-2 flex-shrink-0" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center animate-slideDown">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden backdrop-blur-lg backdrop-filter">
          <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white opacity-10 rounded-full"></div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end -mt-16">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden shadow-xl">
                  {formData?.profileImg ? (
                    <img 
                      src={formData.profileImg} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {formData?.name?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <>
                    <button
                      onClick={() => profileFileRef.current.click()}
                      className="absolute bottom-2 right-2 p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
                      type="button"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      type="file"
                      ref={profileFileRef}
                      onChange={(e) => handleFileSelect(e, 'profile')}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="md:ml-8 mt-4 md:mt-0 flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {formData?.name || 'Your Name'}
                </h2>
                <p className="text-gray-600 flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {formData?.title || 'Your Professional Title'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50/50 px-6">
            <nav className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                    <p className="text-xs text-gray-500">This will appear on your public profile</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData?.title || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    GitHub Profile
                  </label>
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-l-xl border-2 border-r-0 border-gray-200">
                      <Github size={20} className="text-gray-600" />
                    </div>
                    <input
                      type="url"
                      name="socialLinks.github"
                      value={formData?.socialLinks?.github || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    LinkedIn Profile
                  </label>
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-l-xl border-2 border-r-0 border-gray-200">
                      <Linkedin size={20} className="text-gray-600" />
                    </div>
                    <input
                      type="url"
                      name="socialLinks.linkedin"
                      value={formData?.socialLinks?.linkedin || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Images & CV Tab */}
            {activeTab === 'images' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Hero Image */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <ImageIcon size={20} className="mr-2 text-indigo-600" />
                    Hero Image
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-40 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner flex-shrink-0">
                      {formData?.heroImage ? (
                        <img 
                          src={formData.heroImage} 
                          alt="Hero" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon size={32} />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <>
                        <button
                          onClick={() => heroFileRef.current.click()}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-white transition-all duration-200 flex items-center font-medium"
                          type="button"
                        >
                          <Upload size={18} className="mr-2" />
                          Upload Hero Image
                        </button>
                        <input
                          type="file"
                          ref={heroFileRef}
                          onChange={(e) => handleFileSelect(e, 'hero')}
                          accept="image/*"
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Recommended size: 1920x1080px</p>
                </div>

                {/* Talk Image */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <ImageIcon size={20} className="mr-2 text-indigo-600" />
                    Talk Image
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-40 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner flex-shrink-0">
                      {formData?.talkImg ? (
                        <img 
                          src={formData.talkImg} 
                          alt="Talk" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon size={32} />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <>
                        <button
                          onClick={() => talkFileRef.current.click()}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-white transition-all duration-200 flex items-center font-medium"
                          type="button"
                        >
                          <Upload size={18} className="mr-2" />
                          Upload Talk Image
                        </button>
                        <input
                          type="file"
                          ref={talkFileRef}
                          onChange={(e) => handleFileSelect(e, 'talk')}
                          accept="image/*"
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Recommended size: 1200x630px</p>
                </div>

                {/* CV */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText size={20} className="mr-2 text-indigo-600" />
                    Resume/CV
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {formData?.cv && (
                      <a
                        href={formData.cv}
                        download={formData.cvName || 'resume.pdf'}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center shadow-md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={18} className="mr-2" />
                        Download Current CV
                      </a>
                    )}
                    {isEditing && (
                      <>
                        <button
                          onClick={() => cvFileRef.current.click()}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-white transition-all duration-200 flex items-center font-medium"
                          type="button"
                        >
                          <Upload size={18} className="mr-2" />
                          Upload New CV
                        </button>
                        <input
                          type="file"
                          ref={cvFileRef}
                          onChange={(e) => handleFileSelect(e, 'cv')}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  {formData?.cvName && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 flex items-center">
                        <FileText size={16} className="mr-2 text-indigo-600" />
                        Current file: <span className="font-medium ml-1">{formData.cvName}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileManager;