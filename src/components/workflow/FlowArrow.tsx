import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlowArrowProps {
  delay?: number;
  direction?: "right" | "down";
  className?: string;
}

const FlowArrow = ({ delay = 0, direction = "right", className }: FlowArrowProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.3, delay }}
    className={cn(
      "flex items-center justify-center shrink-0 relative",
      direction === "down" ? "flex-col py-1" : "flex-row px-1",
      className
    )}
  >
    {direction === "right" ? (
      <>
        <div className="relative h-[2px] w-6 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
            className="absolute inset-0 bg-primary/30 origin-left"
          />
          <motion.div
            className="absolute top-0 h-full w-3 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(180 70% 42% / 0.8), transparent)",
              boxShadow: "0 0 6px hsl(180 70% 42% / 0.6)",
            }}
            animate={{ x: ["-12px", "24px"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
              delay: delay + 0.6,
            }}
          />
        </div>
        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary/60" />
      </>
    ) : (
      <>
        <div className="relative w-[2px] h-6 overflow-hidden">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
            className="absolute inset-0 bg-primary/30 origin-top"
          />
          <motion.div
            className="absolute left-0 w-full h-3 rounded-full"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(180 70% 42% / 0.8), transparent)",
              boxShadow: "0 0 6px hsl(180 70% 42% / 0.6)",
            }}
            animate={{ y: ["-12px", "24px"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
              delay: delay + 0.6,
            }}
          />
        </div>
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary/60" />
      </>
    )}
  </motion.div>
);

export default FlowArrow;
