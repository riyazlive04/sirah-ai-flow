import AnimateIn from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { ScanSearch, GitBranch, Network, ArrowRight, Gift, BarChart3, UserCheck } from "lucide-react";

const cards = [
  {
    icon: ScanSearch,
    title: "Automation Opportunity Report",
    desc: "A breakdown of the areas in your business where automation can eliminate manual work and improve efficiency.",
  },
  {
    icon: GitBranch,
    title: "Workflow Improvement Plan",
    desc: "Clear recommendations for optimizing how leads, customer inquiries, and internal processes flow through your business.",
  },
  {
    icon: Network,
    title: "System Architecture Recommendation",
    desc: "A high-level design of the automation system that can connect your communication channels, CRM, and internal tools.",
  },
];

const OfferSection = () => (
  <section className="relative overflow-hidden bg-background">
    {/* Decorative glow orbs - subtle teal */}
    <div className="absolute top-1/4 left-[-120px] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />
    <div className="absolute bottom-1/4 right-[-120px] w-[220px] h-[220px] md:w-[350px] md:h-[350px] rounded-full blur-[120px] pointer-events-none" style={{ background: "hsl(210 40% 30% / 0.04)" }} />
    <div className="container section-padding">
      <AnimateIn className="text-center mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
          <Gift className="h-4 w-4" />
          Included Free
        </span>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-heading">
          Free AI Automation <span className="text-primary">Blueprint</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          After your consultation, you will receive a custom automation blueprint for your business.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1} className="text-center mb-10 md:mb-14">
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Even if you decide not to proceed with implementation, you will still receive a clear automation plan you can use to improve your operations.
        </p>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto mb-6">
        {cards.map((card, i) => (
          <AnimateIn key={i} delay={i * 0.12}>
            <div className="bg-white rounded-2xl p-6 md:p-7 h-full border border-border/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <card.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 text-heading">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* Drop-off analysis benefit */}
      <AnimateIn delay={0.35} className="max-w-5xl mx-auto mb-8">
        <div className="flex items-start gap-3 bg-section-alt rounded-xl px-5 py-4 border border-border/40">
          <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="font-semibold text-foreground">Drop-off analysis included:</span>{" "}
            We analyse where customers or patients drop off after consultations or inquiries and show how automation can recover them.
          </p>
        </div>
      </AnimateIn>

      {/* Example insight card */}
      <AnimateIn delay={0.4} className="max-w-3xl mx-auto mb-10">
        <div className="relative rounded-2xl p-6 md:p-8 border border-primary/15 overflow-hidden bg-section-alt">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-base text-heading">Example Insight From an Automation Audit</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            During automation audits we often discover revenue leaks caused by poor follow-ups.
          </p>
          <div className="bg-white/80 rounded-xl p-4 border border-border/40">
            <p className="text-sm text-foreground font-medium mb-2">Example:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Many clinics lose <span className="font-semibold text-foreground">30–50% of patients</span> after consultations because there is no structured follow-up system. Automation workflows can automatically send reminders, follow-ups, and appointment prompts that recover these lost patients.
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.45} className="text-center mb-8">
        <p className="text-muted-foreground text-sm italic">
          You keep this blueprint even if you decide not to move forward with implementation.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.5} className="text-center">
        <Button asChild size="lg" className="h-auto px-6 py-3 text-sm md:text-base font-semibold rounded-xl whitespace-normal text-center leading-tight w-full sm:w-auto">
          <a href="#book-audit">
            Get Your Free Automation Blueprint
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <p className="text-muted-foreground text-sm mt-3">Free consultation. No obligation.</p>
      </AnimateIn>
    </div>
  </section>
);

export default OfferSection;
