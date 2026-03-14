import AnimateIn from "@/components/AnimateIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most automation systems are designed and deployed within a few weeks depending on complexity.",
  },
  {
    q: "Will this work for my type of business?",
    a: "Yes. The automation system is customized based on your workflow and customer communication channels.",
  },
  {
    q: "Do I need special software?",
    a: "No. The system connects your existing tools such as WhatsApp, website forms, or CRM systems.",
  },
  {
    q: "What tools power the automation system?",
    a: "Automation workflows connect messaging platforms, AI tools, and dashboards to streamline operations.",
  },
];

const FAQSection = () => (
  <section className="bg-background">
    <div className="container section-padding py-14 md:py-20">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Frequently Asked <span className="text-primary">Questions</span></h2>
      </AnimateIn>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <AccordionItem value={`faq-${i}`} className="glass-card px-5 border-none">
                <AccordionTrigger className="text-sm md:text-base font-semibold text-heading hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </AnimateIn>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
