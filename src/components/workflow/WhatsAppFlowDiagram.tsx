import { motion } from "framer-motion";
import FlowNode from "./FlowNode";
import FlowArrow from "./FlowArrow";
import {
  Webhook,
  PenLine,
  Timer,
  MessageSquare,
  Send,
  Mail,
  Clock,
} from "lucide-react";

const steps = [
  { time: "Instant", delay: "5 sec wait", icon: Timer },
  { time: "48 Hours Before", delay: null, icon: Clock },
  { time: "24 Hours Before", delay: null, icon: Clock },
  { time: "6 Hours Before", delay: null, icon: Clock },
  { time: "1 Hour Before", delay: null, icon: Clock },
  { time: "5 Mins Before", delay: null, icon: Clock },
  { time: "5 Mins After", delay: null, icon: Clock },
];

const WhatsAppFlowDiagram = () => {
  const d = 0.06;

  return (
    <div className="space-y-6">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary text-center tracking-wide uppercase"
      >
        WhatsApp Follow-up Sequence
      </motion.h3>

      {/* Trigger row */}
      <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2">
        <FlowNode icon={Webhook} label="Webhook" delay={d} variant="primary" />
        <FlowArrow delay={d * 2} />
        <FlowNode icon={PenLine} label="Edit Fields" delay={d * 3} />
        <FlowArrow delay={d * 4} />
        <FlowNode icon={Timer} label="Wait 5s" delay={d * 5} variant="muted" />
        <FlowArrow delay={d * 6} />
        <FlowNode icon={MessageSquare} label="Build Message" delay={d * 7} variant="accent" />
      </div>

      {/* Follow-up timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: d * 8 }}
          className="absolute left-[26px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 origin-top -translate-x-1/2 overflow-hidden"
          style={{ boxShadow: "0 0 6px hsl(180 70% 42% / 0.2)" }}
        >
          {/* Flowing pulse along timeline */}
          <motion.div
            className="absolute left-0 w-full h-8 rounded-full"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(180 70% 42% / 0.7), transparent)",
              boxShadow: "0 0 8px hsl(180 70% 42% / 0.5)",
            }}
            animate={{ top: ["-32px", "100%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
              delay: d * 10,
            }}
          />
        </motion.div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: d * (9 + i * 2) }}
              className={`flex items-center gap-3 ${
                i % 2 === 0
                  ? "md:flex-row md:justify-end md:pr-[calc(50%+24px)]"
                  : "md:flex-row-reverse md:justify-end md:pl-[calc(50%+24px)]"
              } pl-14 md:pl-0`}
            >
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm min-w-0 w-full md:min-w-[200px] md:w-auto">
                <step.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground">{step.time}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5 text-primary/70" />
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: d * (10 + i * 2) }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 glow-dot"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFlowDiagram;
