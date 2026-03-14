import AnimateIn from "@/components/AnimateIn";
import { Search, FileText, Cog } from "lucide-react";

const steps = [
  { icon: Search, step: "Step 1", title: "AI Automation Audit", time: "1–2 days", desc: "Deep-dive into your business workflow and automation potential." },
  { icon: FileText, step: "Step 2", title: "Automation Blueprint", time: "3–5 days", desc: "Custom system design mapping every automation opportunity." },
  { icon: Cog, step: "Step 3", title: "System Development", time: "2–4 weeks", desc: "Build, test, and deploy your AI operations system." },
];

const ProcessSection = () => (
  <section className="bg-background">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Implementation <span className="text-primary">Process</span></h2>
      </AnimateIn>
      <div className="flex flex-col gap-6 max-w-xl mx-auto relative">
        <div className="absolute left-[1.65rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block" />
        {steps.map((s, i) => (
          <AnimateIn key={i} delay={i * 0.15}>
            <div className="flex items-start gap-5 md:pl-16 relative">
              <div className="hidden md:flex absolute left-[1.3rem] top-4 glow-dot animate-pulse-glow" />
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{s.step} · {s.time}</span>
                <h3 className="font-bold text-lg mt-1 mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
