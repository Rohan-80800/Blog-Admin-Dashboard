import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence,motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Trash2,
  X,
  Sparkles
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/blogs", icon: FileText, label: "All Blogs" },
  { path: "/blogs/new", icon: PlusCircle, label: "Create Blog" },
  { path: "/trash", icon: Trash2, label: "Trash Bin" }
];

const Sidebar = ({ isOpen, mobileOpen, onMobileClose }) => {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold gradient-text">BlogAdmin</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/blogs" &&
              location.pathname.startsWith("/blogs/edit"));

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={onMobileClose}
                className={`sidebar-link group ${
                  isActive ? "sidebar-link-active" : ""
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-primary" : "group-hover:text-primary"
                  }`}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl p-4"
            >
              <p className="text-xs text-muted-foreground mb-2">Storage used</p>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                4.5 GB of 10 GB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-30 hidden lg:block overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 lg:hidden"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
