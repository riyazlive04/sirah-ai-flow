import AnimateIn from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Eliminate repetitive manual work",
  "Capture and track every lead",
  "Respond instantly to customers",
  "Scale operations without hiring more staff",
];

const FinalCTASection = () => (
  <section className="section-dark relative overflow-hidden">
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="container section-padding py-16 md:py-24 relative z-10">
      <AnimateIn className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 dark-text">
          Ready to Turn Your Business Operations Into an <span className="text-primary">AI System?</span>
        </h2>
        <p className="dark-text-secondary text-sm md:text-base mb-8 max-w-lg mx-auto">
          Join businesses that have already saved 20+ hours per week with custom AI automation.
        </p>
        <div className="flex flex-col gap-3 mb-10 text-left max-w-md mx-auto">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <span className="dark-text-secondary text-sm md:text-base font-medium">{b}</span>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl mb-6 border border-primary/20" style={{ background: "hsl(180 70% 42% / 0.08)" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <p className="text-primary text-sm font-medium">
            We only conduct 10 automation system audits per week to ensure every business receives a detailed analysis and clear implementation plan.
          </p>
        </div>
        <Button asChild size="lg" className="h-auto md:h-[72px] px-6 md:px-14 py-3 md:py-0 text-sm md:text-lg font-bold rounded-2xl glow-teal shadow-xl shadow-primary/20 w-full md:w-auto whitespace-normal text-center leading-tight">
          <a href="#book-audit">
            Book Your Free AI Automation Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <p className="dark-text-muted text-xs mt-4">Free automation audit. No obligation.</p>
      </AnimateIn>
    </div>
  </section>
);

export default FinalCTASection;
