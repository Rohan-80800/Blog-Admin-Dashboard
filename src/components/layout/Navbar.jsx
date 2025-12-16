import { useTheme } from "../../context/ThemeContext";
import { useBlog } from "../../context/BlogContext";
import { motion } from "framer-motion";
import {
  Menu,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  Bell,
  Search
} from "lucide-react";

const Navbar = ({ sidebarOpen, onToggleSidebar, onMobileMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useBlog();

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuClick}
            className="p-2 rounded-lg hover:bg-secondary lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-secondary hidden lg:flex"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>

          {/* 🔍 SEARCH */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border focus-within:ring-2 focus-within:ring-primary/30">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              id="global-search"
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-56"
            />
            <kbd className="hidden lg:inline-flex px-2 py-0.5 rounded bg-muted text-xs">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-secondary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
