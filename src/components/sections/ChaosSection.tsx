import AnimateIn from "@/components/AnimateIn";
import { motion } from "framer-motion";
import { MessageSquare, Clock, HelpCircle, Layers, Bell } from "lucide-react";

const problems = [
  { icon: MessageSquare, text: "Leads message you on WhatsApp but get slow replies" },
  { icon: Clock, text: "Important leads get missed during busy hours" },
  { icon: HelpCircle, text: "Staff repeatedly answer the same questions all day" },
  { icon: Layers, text: "Your team jumps between multiple tools and spreadsheets" },
  { icon: Bell, text: "Follow-ups are forgotten and leads quietly slip away" },
];

const ChaosSection = () => (
  <section className="bg-background">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Most Businesses Are Running On <span className="text-primary">Operational Chaos</span></h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">Sound familiar? You're not alone.</p>
      </AnimateIn>
      <div className="flex flex-col gap-3 md:gap-4 max-w-2xl mx-auto">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="glass-card p-5 flex items-center gap-4 border-l-4 border-l-destructive/60 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ delay: 1 + i * 0.2, duration: 0.5, ease: "easeInOut" }}
            >
              <p.icon className="h-5 w-5 text-destructive/70 shrink-0" />
            </motion.div>
            <p className="text-body text-sm md:text-base font-medium">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ChaosSection;
