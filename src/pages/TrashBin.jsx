import { useState } from "react";
import { useBlog } from "../context/BlogContext.jsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  Calendar,
  User,
  Clock
} from "lucide-react";
import StatusBadge from "../components/common/StatusBadge.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const TrashBin = () => {
  const { trash, restoreBlog, permanentDeleteBlog, emptyTrash, autoPurgeDays } =
    useBlog();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emptyDialogOpen, setEmptyDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const handlePermanentDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      permanentDeleteBlog(blogToDelete.id);
      setBlogToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const confirmEmptyTrash = () => {
    emptyTrash();
    setEmptyDialogOpen(false);
  };

  const getDaysUntilPurge = (deletedAt) => {
    const deleted = new Date(deletedAt);
    const now = new Date();
    const daysSince = Math.floor((now - deleted) / (1000 * 60 * 60 * 24));
    return Math.max(0, autoPurgeDays - daysSince);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Trash Bin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Items are automatically deleted after {autoPurgeDays} days
          </motion.p>
        </div>
        {trash.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setEmptyDialogOpen(true)}
            className="btn-destructive flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Empty Trash
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-4 flex items-start gap-3 border-l-4 border-warning"
      >
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Soft Delete & Auto Purge</p>
          <p className="text-sm text-muted-foreground mt-1">
            Deleted items are kept for {autoPurgeDays} days before being
            permanently removed. You can restore them anytime before the
            auto-purge.
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {trash.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
              <Trash2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Trash is empty</h3>
            <p className="text-muted-foreground mt-1">
              Deleted blogs will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {trash.map((blog, index) => {
              const daysLeft = getDaysUntilPurge(blog.deletedAt);
              const isUrgent = daysLeft <= 7;

              return (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-5 flex flex-col md:flex-row gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-xs font-medium text-primary">
                        {blog.category}
                      </span>
                      <StatusBadge status="deleted" />
                      <span
                        className={`text-xs flex items-center gap-1 ${
                          isUrgent
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {daysLeft} days until auto-purge
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold truncate">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Deleted on{" "}
                        {new Date(blog.deletedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center gap-2 md:justify-center">
                    <button
                      onClick={() => restoreBlog(blog.id)}
                      className="btn-secondary text-sm flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(blog)}
                      className="btn-ghost text-destructive hover:bg-destructive/10 text-sm flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Permanently Delete?"
        description={`"${blogToDelete?.title}" will be permanently deleted. This action cannot be undone.`}
        confirmText="Delete Forever"
        onConfirm={confirmDelete}
        variant="destructive"
      />

      <ConfirmDialog
        open={emptyDialogOpen}
        onOpenChange={setEmptyDialogOpen}
        title="Empty Trash?"
        description={`All ${trash.length} item(s) in trash will be permanently deleted. This action cannot be undone.`}
        confirmText="Empty Trash"
        onConfirm={confirmEmptyTrash}
        variant="destructive"
      />
    </div>
  );
};

export default TrashBin;
