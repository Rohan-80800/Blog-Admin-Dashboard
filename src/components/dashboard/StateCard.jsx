import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const trendIcon = {
    up: <TrendingUp className="w-3 h-3" />,
    down: <TrendingDown className="w-3 h-3" />,
    neutral: <Minus className="w-3 h-3" />
  };
  const trendColor = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 card-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
            className="text-3xl font-bold mt-2"
          >
            {stat.value}
          </motion.p>
          <div
            className={`flex items-center gap-1 mt-2 text-xs ${
              trendColor[stat.trend]
            }`}
          >
            {trendIcon[stat.trend]}
            <span>{stat.change}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
