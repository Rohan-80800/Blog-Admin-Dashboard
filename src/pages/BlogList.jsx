import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext.jsx";
import { AnimatePresence , motion} from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  User,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import StatusBadge from "../components/common/StatusBadge.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const ITEMS_PER_PAGE_OPTIONS = [5, 10];
const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Development",
  "Business",
  "Lifestyle"
];
const STATUSES = ["All", "published", "draft"];

const BlogList = () => {
  const { blogs, softDeleteBlog } = useBlog();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const perPage = searchParams.get("perPage");
    return perPage ? parseInt(perPage, 10) : 5;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (itemsPerPage !== 5) params.set("perPage", itemsPerPage.toString());
    setSearchParams(params, { replace: true });
  }, [currentPage, itemsPerPage, setSearchParams]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || blog.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || blog.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchQuery, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter, itemsPerPage]);

  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      softDeleteBlog(blogToDelete.id);
      setBlogToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    searchQuery || categoryFilter !== "All" || statusFilter !== "All";

  const publishedCount = filteredBlogs.filter(
    (b) => b.status === "published"
  ).length;
  const draftCount = filteredBlogs.filter((b) => b.status === "draft").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            All Blogs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage and organize your blog posts
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/blogs/new"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Blog
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="font-semibold">{filteredBlogs.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10">
          <span className="text-sm text-muted-foreground">Published:</span>
          <span className="font-semibold text-success">{publishedCount}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10">
          <span className="text-sm text-muted-foreground">Drafts:</span>
          <span className="font-semibold text-warning">{draftCount}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative min-w-[280px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full min-w-[260px]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field pl-10 pr-10 appearance-none cursor-pointer min-w-[160px]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field appearance-none cursor-pointer min-w-[140px]"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "All"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-ghost flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}

          <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-background shadow"
                  : "hover:bg-background/50"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-background shadow"
                  : "hover:bg-background/50"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {paginatedBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No blogs found. Try adjusting your filters.
            </p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {paginatedBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                onDelete={() => handleDelete(blog)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {paginatedBlogs.map((blog, index) => (
              <BlogListItem
                key={blog.id}
                blog={blog}
                index={index}
                onDelete={() => handleDelete(blog)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-2xl p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              className="input-field py-1.5 px-3 text-sm w-20"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const diff = Math.abs(page - currentPage);
                  return (
                    diff === 0 ||
                    diff === 1 ||
                    page === 1 ||
                    page === totalPages
                  );
                })
                .map((page, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && page - prev > 1;
                  return (
                    <span key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "gradient-bg text-primary-foreground"
                            : "hover:bg-secondary"
                        }`}
                      >
                        {page}
                      </button>
                    </span>
                  );
                })}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Move to Trash?"
        description={`"${blogToDelete?.title}" will be moved to trash and automatically deleted after 30 days.`}
        confirmText="Move to Trash"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

const BlogCard = ({ blog, index, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden card-hover group"
    >
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">
              {blog.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge status={blog.status} />
        </div>
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-primary">
          {blog.category}
        </span>
        <h3 className="text-lg font-semibold mt-1 line-clamp-1 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {blog.description}
        </p>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(blog.publishDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Link
            to={`/blogs/edit/${blog.id}`}
            className="flex-1 btn-secondary text-center text-sm flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BlogListItem = ({ blog, index, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-xl p-4 flex flex-col md:flex-row gap-4 card-hover group"
    >
      <div className="w-full md:w-48 h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary/30">
              {blog.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-primary">
            {blog.category}
          </span>
          <StatusBadge status={blog.status} />
        </div>
        <h3 className="text-lg font-semibold mt-1 truncate group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {blog.description}
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(blog.publishDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-2 md:justify-center">
        <Link
          to={`/blogs/edit/${blog.id}`}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default BlogList;
