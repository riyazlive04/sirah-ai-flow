import AnimateIn from "@/components/AnimateIn";
import { TrendingDown, DollarSign, Users, AlertTriangle } from "lucide-react";

const items = [
  { icon: TrendingDown, title: "Missed Leads", desc: "Every slow response is a lost customer" },
  { icon: DollarSign, title: "Increasing SaaS Costs", desc: "Paying for tools that don't connect" },
  { icon: Users, title: "More Staff Required", desc: "Hiring to solve process problems" },
  { icon: AlertTriangle, title: "Operational Stress", desc: "Founders stuck in daily firefighting" },
];

const CostSection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">What Happens If Your Business <span className="text-primary">Stays Manual?</span></h2>
      </AnimateIn>
      <div className="relative max-w-xl mx-auto">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-destructive/20 via-destructive/40 to-destructive/60 hidden md:block" />
        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <AnimateIn key={i} delay={i * 0.12}>
              <div className="flex items-start gap-4 md:pl-14 relative">
                <div className="hidden md:flex absolute left-[1.3rem] top-1/2 -translate-y-1/2 glow-dot" />
                <div className="p-3 rounded-lg bg-destructive/10 shrink-0 md:hidden">
                  <item.icon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CostSection;
