import AnimateIn from "@/components/AnimateIn";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

const DiscoveryCTASection = () => (
  <section className="section-dark relative overflow-hidden">
    <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="container section-padding py-14 md:py-20 relative z-10">
      <AnimateIn className="text-center max-w-2xl mx-auto">
        <motion.div
          className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary/15"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Search className="h-7 w-7 text-primary" />
        </motion.div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 dark-text">
          Discover Where Your Business <span className="text-primary">Can Be Automated</span>
        </h2>
        <p className="dark-text-secondary text-sm md:text-base mb-8 max-w-lg mx-auto">
          In a short audit we identify automation opportunities in your current workflow - and hand you a blueprint you can keep.
        </p>
        <Button asChild size="lg" className="h-auto py-4 px-6 md:px-10 text-sm md:text-lg font-bold rounded-2xl glow-teal shadow-xl shadow-primary/20 w-full md:w-auto whitespace-normal text-center leading-tight">
          <a href="#book-audit">
            Book Free AI Automation Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <p className="dark-text-muted text-xs mt-3">Takes 30 minutes · 100% free</p>
      </AnimateIn>
    </div>
  </section>
);

export default DiscoveryCTASection;
