import AnimateIn from "@/components/AnimateIn";
import { Shield, FileText, Map, Settings } from "lucide-react";

const items = [
  { icon: FileText, text: "Automation opportunity report" },
  { icon: Map, text: "Workflow blueprint" },
  { icon: Settings, text: "System recommendations" },
];

const RiskReversalSection = () => (
  <section className="bg-background">
    <div className="container section-padding">
      <AnimateIn className="text-center max-w-2xl mx-auto">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3">You Keep the <span className="text-primary">Automation Blueprint</span></h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8">
          Even if you don't implement the system with us, you'll receive:
        </p>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="glass-card p-4 flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-body font-medium text-sm md:text-base">{item.text}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default RiskReversalSection;
