import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext.jsx";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  X,
  AlertTriangle
} from "lucide-react";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const CATEGORIES = [
  "Technology",
  "Design",
  "Development",
  "Business",
  "Lifestyle"
];
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const initialFormState = {
  title: "",
  description: "",
  category: "Technology",
  author: "",
  image: "",
  publishDate: new Date().toISOString().split("T")[0],
  status: "draft"
};

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, addBlog, updateBlog } = useBlog();

  const isEditing = Boolean(id);
  const existingBlog = isEditing ? getBlogById(id) : null;

  const [formData, setFormData] = useState(initialFormState);
  const [originalData, setOriginalData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  useEffect(() => {
    if (existingBlog) {
      const blogData = {
        title: existingBlog.title,
        description: existingBlog.description,
        category: existingBlog.category,
        author: existingBlog.author,
        image: existingBlog.image,
        publishDate: existingBlog.publishDate,
        status: existingBlog.status
      };
      setFormData(blogData);
      setOriginalData(blogData);
      setImagePreview(existingBlog.image);
    }
  }, [existingBlog]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  }, [formData, originalData]);

  useEffect(() => {
    setIsDirty(hasChanges);
  }, [hasChanges]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageError("");

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Only JPG and PNG images are allowed");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
    setImageError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.publishDate) {
      newErrors.publishDate = "Publish date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    if (isEditing) {
      updateBlog(id, formData);
    } else {
      addBlog(formData);
    }

    setIsDirty(false);
    navigate("/blogs");
  };

  const handleBack = useCallback(() => {
    if (isDirty) {
      setPendingNavigation("/blogs");
      setShowUnsavedDialog(true);
    } else {
      navigate("/blogs");
    }
  }, [isDirty, navigate]);

  const confirmNavigation = () => {
    setIsDirty(false);
    setShowUnsavedDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  if (isEditing && !existingBlog) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            {isEditing ? "Edit Blog" : "Create New Blog"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            {isEditing
              ? "Update your blog post"
              : "Fill in the details to create a new blog post"}
          </motion.p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className={`input-field ${
              errors.title ? "border-destructive focus:ring-destructive/50" : ""
            }`}
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.title}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows={4}
            className={`input-field resize-none ${
              errors.description
                ? "border-destructive focus:ring-destructive/50"
                : ""
            }`}
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Author <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={`input-field ${
                errors.author
                  ? "border-destructive focus:ring-destructive/50"
                  : ""
              }`}
            />
            {errors.author && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.author}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Publish Date <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className={`input-field ${
                errors.publishDate
                  ? "border-destructive focus:ring-destructive/50"
                  : ""
              }`}
            />
            {errors.publishDate && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.publishDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop an image or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG or PNG, max 1MB
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ position: "relative", marginTop: "1rem" }}
            />
          </div>
          {imageError && (
            <p className="text-sm text-destructive mt-2 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {imageError}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {isDirty ? (
              <span className="flex items-center gap-1 text-warning">
                <AlertTriangle className="w-4 h-4" />
                Unsaved changes
              </span>
            ) : (
              "No unsaved changes"
            )}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleBack} className="btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasChanges}
              className={`btn-primary flex items-center gap-2 ${
                !hasChanges ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Create Blog"}
            </button>
          </div>
        </div>
      </motion.form>

      <ConfirmDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave? Your changes will be lost."
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={confirmNavigation}
        variant="warning"
      />
    </div>
  );
};

export default BlogForm;
