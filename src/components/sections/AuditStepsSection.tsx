import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Search, Repeat, Workflow, FileText } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "Step 1",
    text: "Understand your current process and communication channels.",
  },
  {
    icon: Repeat,
    step: "Step 2",
    text: "Identify repetitive tasks and operational bottlenecks.",
  },
  {
    icon: Workflow,
    step: "Step 3",
    text: "Show potential automation workflows for your business.",
  },
  {
    icon: FileText,
    step: "Step 4",
    text: "Provide your Free AI Automation Blueprint.",
  },
];

const AuditStepsSection = () => (
  <section className="bg-background">
    <div className="container section-padding py-14 md:py-20">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          What Happens During Your <span className="text-primary">Automation Audit</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          In this consultation we analyse your current workflow and identify automation opportunities.
        </p>
      </AnimateIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card p-6 text-center relative"
          >
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{s.step}</span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AuditStepsSection;
