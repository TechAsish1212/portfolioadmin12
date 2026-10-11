import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Tag,
  AlertCircle,
  CheckCircle,
  Loader,
  Building2,
  Link as LinkIcon,
  User,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const initialForm = {
  companyName: "",
  companyLink: "",
  position: "",
  employmentType: "Full-time",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  technologies: [],
  companyLogo: null,
  companyLogoFile: null,
  Image: null,
  ImageFile: null,
};

const formatDate = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.toISOString().slice(0, 7);
};

const ExperienceManager = () => {
  const {
    experiences = [],
    addExperience,
    updateExperience,
    deleteExperience,
    loading,
    error: contextError,
  } = useAdmin();

  const isLoading = loading?.experiences ?? false;

  // Separate refs for each file input
  const logoInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "currentlyWorking" && checked) {
        updated.endDate = "";
      }

      return updated;
    });

    setLocalError("");
  };

  // Generic upload validator
  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      setLocalError("Please select a valid image.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError("Image must be smaller than 5MB.");
      return false;
    }
    return true;
  };

  // Logo upload handler
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateImage(file)) return;

    setLogoPreview(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      companyLogoFile: file,
    }));
    setLocalError("");
  };

  // Profile image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateImage(file)) return;

    setImagePreview(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      ImageFile: file,
    }));
    setLocalError("");
  };

  const resetForm = () => {
    setFormData(initialForm);
    setLogoPreview(null);
    setImagePreview(null);
    setEditingId(null);
    setIsAdding(false);
    setLocalError("");

    if (logoInputRef.current) logoInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleEdit = (experience) => {
    setEditingId(experience._id);

    setFormData({
      companyName: experience.companyName || "",
      companyLink: experience.companyLink || "",
      position: experience.position || "",
      employmentType: experience.employmentType || "Full-time",
      location: experience.location || "",
      startDate: formatDate(experience.startDate),
      endDate: formatDate(experience.endDate),
      currentlyWorking: Boolean(experience.currentlyWorking),
      description: experience.description || "",
      technologies: Array.isArray(experience.technologies)
        ? experience.technologies
        : [],
      companyLogo: experience.companyLogo || null,
      Image: experience.Image || null,
      companyLogoFile: null,
      ImageFile: null,
    });

    setLogoPreview(experience.companyLogo || null);
    setImagePreview(experience.Image || null);
    setIsAdding(true);
    setLocalError("");

    if (logoInputRef.current) logoInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Required field validation
    if (
      !formData.companyName.trim() ||
      !formData.position.trim() ||
      !formData.startDate ||
      !formData.description.trim() ||
      !formData.companyLink.trim()
    ) {
      setLocalError("Please complete all required fields.");
      return;
    }

    // URL validation for companyLink
    try {
      new URL(formData.companyLink);
    } catch {
      setLocalError("Please enter a valid company link (e.g. https://example.com).");
      return;
    }

    if (
      !formData.currentlyWorking &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      setLocalError("End date cannot be earlier than start date.");
      return;
    }

    if (!editingId && !formData.companyLogoFile) {
      setLocalError("Please upload a company logo.");
      return;
    }

    if (!editingId && !formData.ImageFile) {
      setLocalError("Please upload a profile image.");
      return;
    }

    const payload = {
      ...formData,
      endDate: formData.currentlyWorking ? "" : formData.endDate,
      technologies: formData.technologies,
    };

    try {
      if (editingId) {
        await updateExperience(editingId, payload);
        setSuccessMessage("Experience updated successfully!");
      } else {
        await addExperience(payload);
        setSuccessMessage("Experience added successfully!");
      }

      resetForm();
    } catch (error) {
      setLocalError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to save experience."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    setLocalError("");

    try {
      await deleteExperience(id);
      setSuccessMessage("Experience deleted successfully!");
    } catch (error) {
      setLocalError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete experience."
      );
    }
  };

  const handleTechnologiesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      technologies: e.target.value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const formatDisplayDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading && experiences.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="animate-spin text-indigo-600" size={32} />
        <span className="ml-3 text-gray-600">Loading experience...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Experience Manager
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your professional journey and work history.
            </p>
          </div>

          {!isAdding && (
            <button
              type="button"
              onClick={() => {
                setIsAdding(true);
                setEditingId(null);
                setFormData(initialForm);
                setLogoPreview(null);
                setImagePreview(null);
              }}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 cursor-pointer"
            >
              <Plus size={20} className="mr-2" />
              Add Experience
            </button>
          )}
        </div>

        {/* Success */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 flex items-center gap-2">
            <CheckCircle size={20} />
            {successMessage}
          </div>
        )}

        {/* Errors */}
        {(localError || contextError) && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{localError || contextError}</span>
          </div>
        )}

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </h2>

              <button
                type="button"
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer"
                aria-label="Close form"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. SkyBrance"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer Intern"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Company Link */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Link <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="p-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl">
                      <LinkIcon size={20} className="text-gray-500" />
                    </span>
                    <input
                      name="companyLink"
                      type="url"
                      value={formData.companyLink}
                      onChange={handleChange}
                      placeholder="e.g. https://example.com"
                      required
                      disabled={isLoading}
                      className="w-full min-w-0 px-4 py-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                    <option>Self-employed</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="flex">
                    <span className="p-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl">
                      <MapPin size={20} className="text-gray-500" />
                    </span>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Siliguri, West Bengal, India"
                      disabled={isLoading}
                      className="w-full min-w-0 px-4 py-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={isLoading || formData.currentlyWorking}
                    required={!formData.currentlyWorking}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Currently working */}
              <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 accent-indigo-600"
                />
                I currently work here
              </label>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your responsibilities, achievements, and contributions..."
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-y focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technologies / Skills
                </label>
                <div className="flex">
                  <span className="p-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl">
                    <Tag size={20} className="text-gray-500" />
                  </span>
                  <input
                    value={formData.technologies.join(", ")}
                    onChange={handleTechnologiesChange}
                    placeholder="React, Node.js, MongoDB"
                    disabled={isLoading}
                    className="w-full min-w-0 px-4 py-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Separate technologies with commas.
                </p>
              </div>

              {/* Company Logo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Logo {!editingId && <span className="text-red-500">*</span>}
                </label>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1 w-full">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isLoading}
                      className="hidden"
                      id="company-logo"
                    />

                    <label
                      htmlFor="company-logo"
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
                    >
                      <Upload size={30} className="text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {formData.companyLogoFile
                          ? formData.companyLogoFile.name
                          : "Click to upload company logo"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WEBP — up to 5MB
                      </span>
                    </label>
                  </div>

                  {logoPreview && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="w-full h-full object-contain p-2 border rounded-xl bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoPreview(null);
                          setFormData((prev) => ({
                            ...prev,
                            companyLogo: null,
                            companyLogoFile: null,
                          }));
                          if (logoInputRef.current) {
                            logoInputRef.current.value = "";
                          }
                        }}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full cursor-pointer"
                        aria-label="Remove logo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Image {!editingId && <span className="text-red-500">*</span>}
                </label>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1 w-full">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                      className="hidden"
                      id="profile-image"
                    />

                    <label
                      htmlFor="profile-image"
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
                    >
                      <Upload size={30} className="text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {formData.ImageFile
                          ? formData.ImageFile.name
                          : "Click to upload profile image"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WEBP — up to 5MB
                      </span>
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-contain p-2 border rounded-xl bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({
                            ...prev,
                            Image: null,
                            ImageFile: null,
                          }));
                          if (imageInputRef.current) {
                            imageInputRef.current.value = "";
                          }
                        }}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full cursor-pointer"
                        aria-label="Remove profile image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader size={18} className="animate-spin mr-2" />
                  ) : (
                    <Save size={18} className="mr-2" />
                  )}
                  {isLoading
                    ? "Saving..."
                    : editingId
                      ? "Update Experience"
                      : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        <div className="space-y-5">
          {experiences.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <BriefcaseBusiness size={34} className="text-indigo-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No experience added yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first job, internship, or professional experience.
              </p>

              {!isAdding && (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  <Plus size={20} className="mr-2" />
                  Add Your First Experience
                </button>
              )}
            </div>
          ) : (
            experiences.map((experience) => (
              <article
                key={experience._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-5 md:p-7"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-20 h-20 rounded-full border-2 border-indigo-100 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {experience.Image ? (
                      <img
                        src={experience.Image}
                        alt={experience.position}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={30} className="text-gray-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-gray-800">
                          {experience.position}
                        </h3>

                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {/* Company Logo (small) */}
                          {experience.companyLogo && (
                            <img
                              src={experience.companyLogo}
                              alt={`${experience.companyName} logo`}
                              className="w-5 h-5 rounded object-contain bg-white border border-gray-200"
                            />
                          )}
                          <p className="text-indigo-600 font-semibold">
                            {experience.companyName}
                          </p>
                        </div>

                        {/* Company Link */}
                        {experience.companyLink && (
                          <a
                            href={experience.companyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-1 truncate max-w-full"
                          >
                            <LinkIcon size={12} />
                            {experience.companyLink.replace(/^https?:\/\//, "")}
                          </a>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                          {experience.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={15} />
                              {experience.location}
                            </span>
                          )}

                          <span className="flex items-center gap-1">
                            <CalendarDays size={15} />
                            {formatDisplayDate(experience.startDate)} –{" "}
                            {experience.currentlyWorking
                              ? "Present"
                              : formatDisplayDate(experience.endDate)}
                          </span>
                        </div>

                        <div className="mt-3">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                            {experience.employmentType || "Employment"}
                          </span>

                          {experience.currentlyWorking && (
                            <span className="inline-flex ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 self-start">
                        <button
                          type="button"
                          onClick={() => handleEdit(experience)}
                          disabled={isLoading}
                          title="Edit experience"
                          className="p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 cursor-pointer"
                        >
                          <Edit size={19} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(experience._id)}
                          disabled={isLoading}
                          title="Delete experience"
                          className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-5 whitespace-pre-line leading-relaxed">
                      {experience.description}
                    </p>

                    {experience.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {experience.technologies.map((technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceManager;