import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Brain, Database, BarChart3, CreditCard, Globe, Workflow } from "lucide-react";

const nodes = [
  { icon: Brain, label: "WhatsApp AI" },
  { icon: Database, label: "CRM" },
  { icon: BarChart3, label: "Dashboards" },
  { icon: CreditCard, label: "Payments" },
  { icon: Globe, label: "Website Forms" },
  { icon: Workflow, label: "Automation" },
];

const MechanismSection = () => (
  <section className="section-dark relative overflow-hidden">
    <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="container section-padding relative z-10">
      <AnimateIn className="text-center mb-6 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 dark-text">Introducing the <span className="text-primary">AI Operations System</span></h2>
        <p className="dark-text-secondary text-sm md:text-lg max-w-2xl mx-auto">
          A custom automation engine designed specifically around your business workflow.
        </p>
      </AnimateIn>

      <div className="relative max-w-xl mx-auto mt-10">
        <AnimateIn className="flex justify-center mb-10">
          <motion.div
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-primary/40 flex items-center justify-center bg-primary/10"
            animate={{ boxShadow: ["0 0 0px hsl(180 70% 42% / 0.1)", "0 0 24px hsl(180 70% 42% / 0.2)", "0 0 0px hsl(180 70% 42% / 0.1)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-[-12px] rounded-full border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
            </motion.div>
            <span className="text-primary font-bold text-sm md:text-base">AI Engine</span>
          </motion.div>
        </AnimateIn>

        <div className="hidden md:block absolute top-[170px] left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-primary/30 to-transparent" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                y: -6,
                scale: 1.04,
                transition: { duration: 0.25 },
              }}
              className="glass-card-dark p-5 text-center cursor-default"
            >
              <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-primary/15">
                <node.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold dark-text">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MechanismSection;
