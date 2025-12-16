import { useBlog } from "../context/BlogContext.jsx";
import { Link } from "react-router-dom";
import {
  FileText,
  Eye,
  TrendingUp,
  Users,
  Plus,
  ArrowUpRight,
  Trash2
} from "lucide-react";
import StatCard from "../components/dashboard/StateCard.jsx";
import RecentBlogs from "../components/dashboard/RecentBlogs.jsx";
import CategoryChart from "../components/dashboard/CategoryChart";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { blogs, trash } = useBlog();

  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;

  const stats = [
    {
      title: "Total Blogs",
      value: blogs.length,
      icon: FileText,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Published",
      value: publishedCount,
      icon: Eye,
      change: "+8%",
      trend: "up"
    },
    {
      title: "Drafts",
      value: draftCount,
      icon: TrendingUp,
      change: "-3%",
      trend: "down"
    },
    {
      title: "In Trash",
      value: trash.length,
      icon: Trash2,
      change: "Auto-purge",
      trend: "neutral"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Welcome back! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Here's what's happening with your blogs today.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBlogs blogs={blogs.slice(0, 5)} />
        </div>

        <div>
          <CategoryChart blogs={blogs} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/blogs/new"
            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all card-hover"
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Create Blog</p>
              <p className="text-sm text-muted-foreground">
                Write something new
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>

          <Link
            to="/blogs"
            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">View All</p>
              <p className="text-sm text-muted-foreground">Browse your blogs</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>

          <Link
            to="/trash"
            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Trash Bin</p>
              <p className="text-sm text-muted-foreground">
                {trash.length} items
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
