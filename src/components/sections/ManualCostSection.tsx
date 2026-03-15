import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Zap, UserX, Eye } from "lucide-react";

const metrics = [
  {
    icon: Zap,
    title: "Response Time",
    description: "Manual replies often take hours. AI automation responds instantly.",
  },
  {
    icon: UserX,
    title: "Missed Follow-Ups",
    description: "Important leads often slip through the cracks without structured follow-ups.",
  },
  {
    icon: Eye,
    title: "Lead Visibility",
    description: "Automation ensures every inquiry is captured and tracked in one system.",
  },
];

const ManualCostSection = () => (
  <section className="section-dark relative overflow-hidden">
    <div
      className="absolute top-[-80px] right-[-60px] w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full blur-[100px] pointer-events-none"
      style={{ background: "hsl(var(--primary) / 0.06)" }}
    />
    <div className="container section-padding py-14 md:py-20 relative z-10">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 dark-text">
          The Cost of <span className="text-primary">Manual Operations</span>
        </h2>
        <p className="dark-text-secondary text-sm md:text-base max-w-xl mx-auto">
          Delayed responses and inconsistent follow-ups are costing businesses valuable opportunities.
        </p>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {metrics.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card-dark p-6 text-center cursor-default"
          >
            <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/15">
              <m.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold dark-text mb-3">{m.title}</h3>
            <p className="text-sm dark-text-secondary leading-relaxed">{m.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ManualCostSection;
