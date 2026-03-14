import AnimateIn from "@/components/AnimateIn";
import { Clock } from "lucide-react";

const ScarcitySection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center max-w-2xl mx-auto">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-glow">
          <Clock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">We Conduct Only <span className="text-primary">10 Automation Audits</span> Per Week</h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Each audit requires detailed workflow analysis, system mapping, and a custom automation blueprint.
          To maintain quality, we limit availability to 10 businesses per week.
        </p>
      </AnimateIn>
    </div>
  </section>
);

export default ScarcitySection;
