import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FlowNodeProps {
  icon: LucideIcon;
  label: string;
  delay?: number;
  variant?: "default" | "primary" | "accent" | "muted";
  size?: "sm" | "md";
}

const variantStyles = {
  default: "bg-card border-border text-foreground",
  primary: "bg-primary/10 border-primary/30 text-primary",
  accent: "bg-secondary/10 border-secondary/30 text-secondary",
  muted: "bg-muted border-border text-muted-foreground",
};

const FlowNode = ({ icon: Icon, label, delay = 0, variant = "default", size = "md" }: FlowNodeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay }}
    className={cn(
      "flex flex-col items-center gap-1.5 rounded-xl border shadow-sm",
      size === "sm" ? "px-2 py-2 min-w-[52px] md:min-w-[64px]" : "px-2.5 py-2 min-w-[60px] md:px-3 md:py-2.5 md:min-w-[80px]",
      variantStyles[variant]
    )}
  >
    <Icon className={cn("shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
    <span className={cn("font-medium text-center leading-tight", size === "sm" ? "text-[10px]" : "text-xs")}>
      {label}
    </span>
  </motion.div>
);

export default FlowNode;
