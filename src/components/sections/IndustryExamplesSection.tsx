import AnimateIn from "@/components/AnimateIn";
import { Building2, GraduationCap, Briefcase } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    flow: "Lead inquiry → AI qualification → agent notification → automated follow-up.",
  },
  {
    icon: GraduationCap,
    title: "Training Institutes",
    flow: "Course inquiry → information automation → lead capture → follow-up reminders.",
  },
  {
    icon: Briefcase,
    title: "Service Businesses",
    flow: "Customer inquiry → AI response → lead tracking → automated follow-ups.",
  },
];

const IndustryExamplesSection = () => (
  <section className="bg-background">
    <div className="container section-padding py-14 md:py-20">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          Automation Examples For <span className="text-primary">Different Businesses</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          See how automation applies to your industry.
        </p>
      </AnimateIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {industries.map((ind, i) => (
          <AnimateIn key={i} delay={i * 0.1}>
            <div className="glass-card p-6 h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <ind.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-base mb-3">{ind.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{ind.flow}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default IndustryExamplesSection;
