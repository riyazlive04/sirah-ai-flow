import AnimateIn from "@/components/AnimateIn";
import { CheckCircle } from "lucide-react";
import founderImg from "@/assets/founder.jpeg";

const highlights = [
  "10+ years technology and analytics experience",
  "Analytics implementations across 200+ websites",
  "Experience supporting global brands",
  "Expertise in system integrations and automation workflows",
];

const ConsultantSection = () => (
  <section className="section-alt">
    <div className="container section-padding py-14 md:py-20">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          Meet Your <span className="text-primary">Automation Consultant</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Sirah Digital helps businesses improve operations using automation and AI-powered workflows.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.15}>
        <div className="glass-card max-w-2xl mx-auto p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={founderImg}
            alt="Automation Consultant"
            className="w-28 h-28 rounded-2xl object-cover shrink-0 border-2 border-primary/20"
          />
          <div className="space-y-3">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default ConsultantSection;
