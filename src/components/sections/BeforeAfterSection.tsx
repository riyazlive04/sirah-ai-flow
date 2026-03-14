import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CheckCircle, ArrowDown } from "lucide-react";

const beforeItems = [
  { title: "Manual WhatsApp replies", desc: "Staff repeatedly answering the same questions" },
  { title: "Leads getting missed or replied late", desc: "No centralized system to track inquiries" },
  { title: "Multiple SaaS tools and spreadsheets", desc: "Teams switching between tools constantly" },
  { title: "Manual follow-ups", desc: "Important prospects forgotten" },
  { title: "Limited visibility", desc: "No clear view of lead status or pipeline" },
];

const afterItems = [
  { title: "Instant AI WhatsApp responses", desc: "Customers get answers immediately" },
  { title: "Automatic lead capture & qualification", desc: "Serious leads identified instantly" },
  { title: "Centralized automation system", desc: "All workflows connected in one place" },
  { title: "Automated follow-ups", desc: "Prospects receive timely messages automatically" },
  { title: "Clear dashboards and tracking", desc: "Every lead and interaction is visible" },
];

const BeforeAfterSection = () => (
  <section className="bg-background">
    <div className="container section-padding py-14 md:py-20">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          Before vs After <span className="text-primary">Automation</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          See how an AI-powered workflow transforms daily business operations.
        </p>
      </AnimateIn>

      {/* Desktop: two columns */}
      <div className="max-w-5xl mx-auto">
        {/* Column headers */}
        <div className="hidden md:grid grid-cols-2 gap-8 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <h3 className="text-lg md:text-xl font-bold text-heading">Before Automation</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h3 className="text-lg md:text-xl font-bold text-heading">After AI Automation</h3>
          </motion.div>
        </div>

        {/* Mobile: stacked with headers */}
        <div className="md:hidden mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <h3 className="text-lg font-bold text-heading">Before Automation</h3>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {beforeItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-xl bg-muted/60 border border-border p-4 flex items-start gap-3"
              >
                <AlertTriangle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-heading mb-0.5">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 py-4">
            <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
            <p className="text-xs font-medium text-muted-foreground italic">
              Now imagine your business running like this instead
            </p>
            <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
          </div>
          <div className="flex items-center gap-2 mb-4 mt-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h3 className="text-lg font-bold text-heading">After AI Automation</h3>
          </div>
          <div className="flex flex-col gap-3">
            {afterItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                className="rounded-xl bg-background border-2 border-primary/20 p-4 flex items-start gap-3 shadow-sm"
              >
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-heading mb-0.5">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: paired rows for equal heights */}
        <div className="hidden md:flex flex-col gap-3">
          {beforeItems.map((beforeItem, i) => {
            const afterItem = afterItems[i];
            return (
              <div key={i} className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="rounded-xl bg-muted/60 border border-border p-4 flex items-start gap-3"
                >
                  <AlertTriangle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-heading mb-0.5">{beforeItem.title}</p>
                    <p className="text-xs text-muted-foreground">{beforeItem.desc}</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                  className="rounded-xl bg-background border-2 border-primary/20 p-4 flex items-start gap-3 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-heading mb-0.5">{afterItem.title}</p>
                    <p className="text-xs text-muted-foreground">{afterItem.desc}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <AnimateIn delay={0.4} className="text-center mt-10 md:mt-14">
          <p className="text-muted-foreground text-sm mb-4">Discover how your business can be automated</p>
          <Button asChild size="lg" className="h-auto py-3 px-6 md:px-8 text-sm md:text-base font-semibold rounded-xl glow-teal w-full md:w-auto whitespace-normal text-center leading-tight">
            <a href="#book-audit">
              Book Free AI Automation Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </AnimateIn>
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
