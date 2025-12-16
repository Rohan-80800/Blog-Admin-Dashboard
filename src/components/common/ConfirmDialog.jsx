import { AnimatePresence,motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive"
}) => {
  if (!open) return null;

  const variantStyles = {
    destructive: {
      icon: "bg-destructive/20 text-destructive",
      button:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium px-4 py-2 rounded-lg transition-all"
    },
    warning: {
      icon: "bg-warning/20 text-warning",
      button:
        "bg-warning text-warning-foreground hover:bg-warning/90 font-medium px-4 py-2 rounded-lg transition-all"
    }
  };

  const styles = variantStyles[variant] || variantStyles.destructive;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => onOpenChange(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-2xl p-6 max-w-md w-full shadow-2xl"
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div
            className={`w-12 h-12 rounded-full ${styles.icon} flex items-center justify-center mb-4`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6">{description}</p>

          <div className="flex items-center gap-3 justify-end">
            <button onClick={() => onOpenChange(false)} className="btn-ghost">
              {cancelText}
            </button>
            <button onClick={onConfirm} className={styles.button}>
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
