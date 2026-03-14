import AnimateIn from "@/components/AnimateIn";
import { Building2, GraduationCap, Headphones } from "lucide-react";

const examples = [
  {
    icon: Building2,
    title: "Real Estate Automation",
    flow: "Customer inquiry → AI qualification → Agent assignment → Automated follow-up",
  },
  {
    icon: GraduationCap,
    title: "Training Institute Automation",
    flow: "WhatsApp inquiry → Course info → Lead capture → CRM tracking",
  },
  {
    icon: Headphones,
    title: "Customer Support Automation",
    flow: "AI answers common questions instantly - 24/7, zero wait time",
  },
];

const ExamplesSection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Automation <span className="text-primary">Examples</span></h2>
      </AnimateIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {examples.map((e, i) => (
          <AnimateIn key={i} delay={i * 0.1}>
            <div className="glass-card p-6 h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <e.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-base mb-3">{e.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{e.flow}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default ExamplesSection;
