import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "hsl(173, 80%, 40%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 76%, 36%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 87%, 65%)"
];

const CategoryChart = ({ blogs }) => {
  const categoryData = useMemo(() => {
    const categories = {};
    blogs.forEach((blog) => {
      categories[blog.category] = (categories[blog.category] || 0) + 1;
    });

    const total = blogs.length || 1;
    return Object.entries(categories).map(([name, count], index) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
      color: COLORS[index % COLORS.length]
    }));
  }, [blogs]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
      {categoryData.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No categories yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {category.count} ({category.percentage}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
        {categoryData.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryChart;
