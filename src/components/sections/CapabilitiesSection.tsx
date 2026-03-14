import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { Bot, UserCheck, BookOpen, MailCheck, MessageCircle, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Bot,
    title: "AI WhatsApp Chatbot",
    desc: "Instant, intelligent replies 24/7",
    detail: "Our AI chatbot handles customer inquiries on WhatsApp around the clock - answering FAQs, sharing product info, and collecting leads while your team sleeps.",
  },
  {
    icon: UserCheck,
    title: "AI Lead Qualification",
    desc: "Automatically score and route leads",
    detail: "Every incoming lead is automatically scored based on intent, budget, and fit - then routed to the right team member instantly.",
  },
  {
    icon: BookOpen,
    title: "AI Knowledge Base",
    desc: "Answer queries from your business data",
    detail: "Train the AI on your business documents, pricing, and policies so it gives accurate, context-aware answers to every customer question.",
  },
  {
    icon: MailCheck,
    title: "Automated Follow-ups",
    desc: "Never miss a follow-up again",
    detail: "Automated sequences follow up with leads at the right time via WhatsApp or email - no manual reminders needed.",
  },
  {
    icon: MessageCircle,
    title: "AI Response Suggestions",
    desc: "Help staff reply faster and smarter",
    detail: "When your team handles conversations manually, AI suggests the best response in real-time - reducing response time and improving quality.",
  },
  {
    icon: LayoutDashboard,
    title: "Internal Dashboards",
    desc: "Real-time visibility into operations",
    detail: "Live dashboards track leads, response times, conversions, and team performance - giving you full visibility without spreadsheets.",
  },
];

const FlipCard = ({ icon: Icon, title, desc, detail, delay }: {
  icon: typeof Bot;
  title: string;
  desc: string;
  detail: string;
  delay: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <AnimateIn delay={delay}>
      <div
        className="cursor-pointer [perspective:1000px] min-h-[200px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative w-full min-h-[200px] [transform-style:preserve-3d] transition-none"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] glass-card p-6 text-center flex flex-col items-center justify-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-base mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-card p-6 flex flex-col items-center justify-center bg-primary/5 border-primary/20">
            <p className="text-sm text-body leading-relaxed text-center">{detail}</p>
            <span className="text-xs text-muted-foreground mt-3">Tap to flip back</span>
          </div>
        </motion.div>
      </div>
    </AnimateIn>
  );
};

const CapabilitiesSection = () => (
  <section className="bg-background">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Automation <span className="text-primary">Capabilities</span></h2>
        <p className="text-muted-foreground text-sm">Tap any card to learn more</p>
      </AnimateIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {capabilities.map((c, i) => (
          <FlipCard key={c.title} {...c} delay={i * 0.07} />
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
