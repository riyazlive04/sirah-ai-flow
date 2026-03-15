import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Zap, TrendingDown, Target, RefreshCw } from "lucide-react";

const stats = [
  {
    icon: Zap,
    title: "Response Time",
    from: "From hours",
    to: "Instant AI reply",
  },
  {
    icon: TrendingDown,
    title: "Manual Work",
    from: "Repetitive tasks",
    to: "Up to 80% reduction",
  },
  {
    icon: Target,
    title: "Lead Tracking",
    from: "Leads slipping through",
    to: "Every lead captured & tracked",
  },
  {
    icon: RefreshCw,
    title: "Follow-ups",
    from: "Forgotten follow-ups",
    to: "Automated for every inquiry",
  },
];

const AutomationImpactSection = () => (
  <section className="section-dark relative overflow-hidden">
    <div className="absolute bottom-[-100px] left-[-50px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="container section-padding py-14 md:py-20 relative z-10">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 dark-text">
          Automation <span className="text-primary">Impact</span>
        </h2>
        <p className="dark-text-secondary text-sm md:text-base max-w-xl mx-auto">
          See how automation transforms everyday operations.
        </p>
      </AnimateIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card-dark p-6 text-center cursor-default"
          >
            <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/15">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold dark-text mb-3">{s.title}</h3>
            <p className="text-xs dark-text-muted line-through mb-1">{s.from}</p>
            <p className="text-sm font-semibold text-primary">{s.to}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AutomationImpactSection;
