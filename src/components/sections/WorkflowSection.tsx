import AnimateIn from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import InstagramFlowDiagram from "@/components/workflow/InstagramFlowDiagram";
import WhatsAppFlowDiagram from "@/components/workflow/WhatsAppFlowDiagram";

const WorkflowSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-5xl mx-auto">
      <AnimateIn className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading mb-4">
          Example AI Automation Workflow
        </h2>
        <p className="text-body text-base md:text-lg max-w-2xl mx-auto">
          This visual shows how a customer inquiry flows through an automated system that captures leads, qualifies them, and triggers follow-ups.
        </p>
      </AnimateIn>

      <div className="flex flex-col gap-8">
        <div className="bg-card rounded-2xl shadow-md border border-border p-4 md:p-8 overflow-x-auto">
          <InstagramFlowDiagram />
        </div>
        <div className="bg-card rounded-2xl shadow-md border border-border p-4 md:p-8 overflow-x-auto">
          <WhatsAppFlowDiagram />
        </div>
      </div>

      <AnimateIn className="text-center mt-8">
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-8">
          This automation workflow connects your communication channels, CRM, and internal systems so every customer inquiry is captured, tracked, and followed up automatically.
        </p>
        <h3 className="text-lg md:text-2xl font-heading font-bold text-heading mb-4">
          Discover How Automation Can Work In Your Business
        </h3>
        <Button asChild size="lg" className="h-auto py-3 px-6 md:px-8 text-sm md:text-base font-semibold rounded-xl glow-teal w-full md:w-auto whitespace-normal text-center leading-tight">
          <a href="#book-audit">
            Book Free AI Automation Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </AnimateIn>
    </div>
  </section>
);

export default WorkflowSection;
