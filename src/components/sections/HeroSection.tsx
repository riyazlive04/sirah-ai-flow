import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";


const flowNodes = ["Customer", "WhatsApp", "AI", "CRM", "Dashboard"];

const benefits = [
  "Respond instantly to customer inquiries",
  "Automatically capture and qualify leads",
  "Reduce repetitive manual work for your team",
];

const HeroSection = () => (
  <section className="relative overflow-hidden section-dark">
    <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: "hsl(210 40% 30% / 0.06)" }} />

    <div className="container section-padding pb-8 md:pb-16 relative z-10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

        <motion.h1
          className="text-[28px] md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5 dark-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Turn Your Business Operations Into an{" "}
          <span className="text-primary">AI-Powered System</span>
        </motion.h1>

        <motion.p
          className="dark-text-secondary text-base md:text-lg leading-relaxed mb-5 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Instead of hiring more staff or buying more SaaS tools, we design a custom AI automation system built specifically for your business workflow.
        </motion.p>

        <motion.div
          className="flex flex-col gap-2 mb-6 text-left max-w-md mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
              <span className="dark-text-secondary text-sm md:text-base font-medium">{b}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="dark-text-muted text-xs md:text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          13+ years in technology, analytics & automation systems across 200+ websites.
        </motion.p>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button asChild size="lg" className="h-auto md:h-[72px] px-6 md:px-14 py-3 md:py-0 text-sm md:text-lg font-bold rounded-2xl glow-teal shadow-xl shadow-primary/20 whitespace-normal text-center leading-tight">
            <a href="#book-audit">
              Book Your Free AI Automation Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="dark-text-muted text-xs mt-3">Free automation audit · No obligation</p>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center justify-center flex-wrap gap-1 px-2">
            {flowNodes.map((node, i) => (
              <div key={node} className="flex items-center shrink-0">
                <motion.div
                  className="glass-card-dark px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium dark-text whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {node}
                </motion.div>
                {i < flowNodes.length - 1 && (
                  <motion.div
                    className="w-4 md:w-6 h-0.5 glow-line mx-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
