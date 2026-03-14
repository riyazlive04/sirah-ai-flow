import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { MessageSquare, Database, Sheet, CreditCard, Mail, Globe, Plug, Workflow, type LucideIcon } from "lucide-react";

const integrations: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: MessageSquare, label: "WhatsApp Business API", desc: "Automated messaging & chatbots" },
  { icon: Database, label: "CRM Systems", desc: "Sync leads & contacts instantly" },
  { icon: Sheet, label: "Google Sheets", desc: "Live data logging & reporting" },
  { icon: CreditCard, label: "Payment Gateways", desc: "Automated invoicing & tracking" },
  { icon: Mail, label: "Email Systems", desc: "Triggered emails & sequences" },
  { icon: Globe, label: "Website Forms", desc: "Capture & route form submissions" },
  { icon: Plug, label: "Third-Party APIs", desc: "Connect any external service" },
  { icon: Workflow, label: "n8n & Automation", desc: "Complex workflow orchestration" },
];

const IntegrationsSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section-alt">
      <div className="container section-padding">
        <AnimateIn className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">System <span className="text-primary">Integrations</span></h2>
          <p className="text-muted-foreground text-sm md:text-base">Everything connects through one unified system</p>
        </AnimateIn>

        <div className="max-w-3xl mx-auto">
          {/* Horizontal scrolling marquee */}
          <div className="relative overflow-hidden mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-6 py-2"
              animate={{ x: [0, -800] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...integrations, ...integrations].map((item, i) => (
                <div key={`marquee-${i}`} className="flex items-center gap-2 shrink-0 text-muted-foreground/50">
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Interactive grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {integrations.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setActive(active === i ? null : i)}
                className={`relative glass-card p-4 md:p-5 text-center cursor-pointer transition-all duration-300 ${
                  active === i
                    ? "ring-2 ring-primary shadow-lg shadow-primary/10"
                    : "hover:shadow-md"
                }`}
              >
                {/* Connection line dot */}
                <motion.div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background"
                  animate={{
                    backgroundColor: active === i
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className={`mx-auto w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ${
                  active === i ? "bg-primary/20" : "bg-primary/10"
                }`}>
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-heading mb-1">{item.label}</h4>

                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs text-muted-foreground overflow-hidden"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom status bar */}
          <AnimateIn delay={0.5}>
            <div className="mt-8 glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-medium text-muted-foreground">All systems connected</span>
              </div>
              <div className="flex gap-1">
                {integrations.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-1 rounded-full"
                    animate={{
                      backgroundColor: active === i
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
