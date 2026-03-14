import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Award, BarChart3, Globe, Database } from "lucide-react";

const stats = [
  { icon: Award, number: "13+", label: "Years", desc: "Technology Experience", long: false },
  { icon: BarChart3, number: "200+", label: "Websites", desc: "Analytics Implementations", long: false },
  { icon: Globe, number: "Global", label: "Brands", desc: "Including Procter & Gamble", long: true },
  { icon: Database, number: "Enterprise", label: "Grade", desc: "GA4, GTM & BigQuery Expertise", long: true },
];

const AuthoritySection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Why Businesses Trust <span className="text-primary">Sirah Digital</span></h2>
      </AnimateIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-5 md:p-6 text-center cursor-default"
          >
            <div className="mx-auto w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <motion.p
              className={`font-extrabold text-primary mb-1 whitespace-nowrap ${s.long ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-4xl"}`}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
            >
              {s.number}
            </motion.p>
            <p className="text-sm font-bold text-heading mb-0.5">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AuthoritySection;
