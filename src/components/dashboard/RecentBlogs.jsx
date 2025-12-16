import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import StatusBadge from "../common/StatusBadge.jsx";
import { motion } from "framer-motion";

const RecentBlogs = ({ blogs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Blogs</h3>
        <Link
          to="/blogs"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No blogs yet. Create your first one!</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <Link
                to={`/blogs/edit/${blog.id}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>
                    <StatusBadge status={blog.status} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
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
                <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                  {blog.category}
                </span>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default RecentBlogs;
