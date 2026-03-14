import AnimateIn from "@/components/AnimateIn";
import { Building, Paintbrush, Megaphone, BookOpen, Plane, ShoppingCart, CheckCircle } from "lucide-react";

const industries = [
  { icon: Building, label: "Real Estate Agencies" },
  { icon: Paintbrush, label: "Interior Designers" },
  { icon: Megaphone, label: "Digital Marketing Agencies" },
  { icon: BookOpen, label: "Training Institutes" },
  { icon: Plane, label: "Travel Companies" },
  { icon: ShoppingCart, label: "E-commerce & Retail" },
];

const qualifications = ["₹25L+ annual revenue", "5+ employees", "50+ monthly leads"];

const WhoSection = () => (
  <section className="section-alt">
    <div className="container section-padding">
      <AnimateIn className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">Who This Is <span className="text-primary">For</span></h2>
      </AnimateIn>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
          {industries.map((ind, i) => (
            <AnimateIn key={ind.label} delay={i * 0.07}>
              <div className="glass-card p-4 text-center">
                <ind.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-heading">{ind.label}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={0.3}>
          <div className="glass-card p-6 text-center">
            <p className="text-sm font-semibold text-heading mb-3 uppercase tracking-wider">Qualification Criteria</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
              {qualifications.map((q) => (
                <div key={q} className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-body font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  </section>
);

export default WhoSection;
