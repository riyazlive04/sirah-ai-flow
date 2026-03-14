import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import AnimateIn from "@/components/AnimateIn";

interface Conversation {
  industry: string;
  messages: { from: string; text: string }[];
  tags: string[];
}

const conversations: Conversation[] = [
  {
    industry: "🏠 Real Estate",
    messages: [
      { from: "customer", text: "Hi, I'm interested in the 3BHK apartment in Downtown." },
      { from: "ai", text: "Welcome! 🏠 The 3BHK unit starts at ₹85L. Would you like to schedule a site visit?" },
      { from: "customer", text: "Yes, this weekend please." },
      { from: "ai", text: "Great! I've notified our agent Rahul. He'll confirm your slot within 30 minutes. ✅" },
    ],
    tags: ["AI Reply", "Lead Qualified", "Staff Notified"],
  },
  {
    industry: "🎓 Training Institute",
    messages: [
      { from: "customer", text: "Do you offer digital marketing courses?" },
      { from: "ai", text: "Yes! 📚 We have a 3-month Digital Marketing Pro course starting next week. Fee: ₹25,000." },
      { from: "customer", text: "Can I get a brochure?" },
      { from: "ai", text: "Sent! 📄 I've also booked you a free counseling call with our advisor tomorrow at 11 AM. ✅" },
    ],
    tags: ["AI Reply", "Brochure Sent", "Call Booked"],
  },
  {
    industry: "✈️ Travel Company",
    messages: [
      { from: "customer", text: "I want to plan a family trip to Bali for 5 days." },
      { from: "ai", text: "Great choice! 🌴 Our Bali family package starts at ₹1.2L per person including flights and hotels." },
      { from: "customer", text: "Can you share the itinerary?" },
      { from: "ai", text: "Here's the itinerary! 📋 I've also assigned our travel expert Priya to customize it for you. ✅" },
    ],
    tags: ["AI Reply", "Itinerary Shared", "Agent Assigned"],
  },
  {
    industry: "🎨 Interior Design",
    messages: [
      { from: "customer", text: "I need help designing my new 2BHK flat." },
      { from: "ai", text: "Wonderful! 🎨 We offer full home design packages starting at ₹3.5L. What's your style preference?" },
      { from: "customer", text: "Modern minimalist." },
      { from: "ai", text: "Perfect! I've scheduled a free consultation with designer Ananya for this Saturday. ✅" },
    ],
    tags: ["AI Reply", "Lead Captured", "Consultation Set"],
  },
  {
    industry: "🛒 E-commerce",
    messages: [
      { from: "customer", text: "Is the wireless headphone still in stock?" },
      { from: "ai", text: "Yes! 🎧 The SoundMax Pro is available at ₹2,499. Want me to send you the order link?" },
      { from: "customer", text: "Yes, and do you have COD?" },
      { from: "ai", text: "COD is available! 📦 Here's your order link. You'll get a tracking ID within 2 hours. ✅" },
    ],
    tags: ["AI Reply", "Order Link Sent", "COD Confirmed"],
  },
];

const TYPING_DURATION = 1200;
const MESSAGE_PAUSE = 800;
const RESTART_DELAY = 2500;

const WhatsAppChat = () => {
  const [convoIndex, setConvoIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFrom, setTypingFrom] = useState<string>("ai");
  const [showTags, setShowTags] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const current = conversations[convoIndex];

  const nextConvo = useCallback(() => {
    setShowTags(false);
    setVisibleCount(0);
    setConvoIndex((c) => (c + 1) % conversations.length);
  }, []);

  useEffect(() => {
    const showNext = () => {
      if (visibleCount >= current.messages.length) {
        setShowTags(true);
        timeoutRef.current = setTimeout(nextConvo, RESTART_DELAY);
        return;
      }

      setTypingFrom(current.messages[visibleCount].from);
      setIsTyping(true);

      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((c) => c + 1);
        timeoutRef.current = setTimeout(showNext, MESSAGE_PAUSE);
      }, TYPING_DURATION);
    };

    timeoutRef.current = setTimeout(showNext, visibleCount === 0 ? 600 : 0);
    return () => clearTimeout(timeoutRef.current);
  }, [visibleCount, convoIndex]);

  return (
    <div className="rounded-3xl border-2 border-border bg-background shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-secondary px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary-foreground text-xs font-bold">
          AI
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-secondary-foreground text-sm font-semibold">Sirah AI Assistant</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.industry}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-secondary-foreground/60 text-xs"
            >
              {current.industry}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div
          className="ml-auto w-2 h-2 rounded-full bg-green-500 shrink-0"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[300px] bg-muted/30">
        <AnimatePresence mode="popLayout">
          {current.messages.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={`${convoIndex}-msg-${i}`}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "customer"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-background border border-border text-body rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`flex ${typingFrom === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 flex gap-1 ${
                  typingFrom === "customer"
                    ? "bg-primary/80 rounded-br-md"
                    : "bg-background border border-border rounded-bl-md"
                }`}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full ${
                      typingFrom === "customer" ? "bg-primary-foreground/70" : "bg-muted-foreground/50"
                    }`}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tags */}
      <div className="px-4 py-3 border-t border-border flex flex-wrap gap-2 min-h-[44px]">
        <AnimatePresence>
          {showTags &&
            current.tags.map((tag, i) => (
              <motion.span
                key={`${convoIndex}-${tag}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.12, duration: 0.3 }}
                className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Industry dots indicator */}
      <div className="flex justify-center gap-1.5 pb-3">
        {conversations.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === convoIndex ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const WhatsAppSection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          Turn WhatsApp Into Your <span className="text-primary">Business Operating System</span>
        </h2>
      </AnimateIn>

      <div className="max-w-sm mx-auto">
        <WhatsAppChat />
      </div>
    </div>
  </section>
);

export default WhatsAppSection;
