import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InlineCTAProps {
  headline?: string;
  subtext?: string;
}

const InlineCTA = ({
  headline = "Ready to automate?",
  subtext = "Book a free audit and get your custom automation blueprint.",
}: InlineCTAProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5 }}
    className="section-dark py-8 md:py-10 relative overflow-hidden"
  >
    <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative z-10">
      <div className="text-center md:text-left">
        <h3 className="text-lg md:text-xl font-bold dark-text mb-1">{headline}</h3>
        <p className="dark-text-secondary text-sm">{subtext}</p>
      </div>
      <Button asChild size="lg" className="h-auto py-3 px-6 md:px-8 text-sm md:text-base font-semibold rounded-xl glow-teal shrink-0 w-full md:w-auto whitespace-normal text-center leading-tight">
        <a href="#book-audit">
          Book Free AI Audit
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </Button>
    </div>
  </motion.div>
);

export default InlineCTA;
