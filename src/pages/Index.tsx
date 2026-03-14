import TopBanner from "@/components/TopBanner";
import HeroSection from "@/components/sections/HeroSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ChaosSection from "@/components/sections/ChaosSection";
import ManualCostSection from "@/components/sections/ManualCostSection";
import CostSection from "@/components/sections/CostSection";
import MechanismSection from "@/components/sections/MechanismSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import WhatsAppSection from "@/components/sections/WhatsAppSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import DiscoveryCTASection from "@/components/sections/DiscoveryCTASection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ExamplesSection from "@/components/sections/ExamplesSection";
import IndustryExamplesSection from "@/components/sections/IndustryExamplesSection";
import AutomationImpactSection from "@/components/sections/AutomationImpactSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import OfferSection from "@/components/sections/OfferSection";
import WhoSection from "@/components/sections/WhoSection";
import RiskReversalSection from "@/components/sections/RiskReversalSection";
import ScarcitySection from "@/components/sections/ScarcitySection";
import FAQSection from "@/components/sections/FAQSection";
import ConsultantSection from "@/components/sections/ConsultantSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import AuditStepsSection from "@/components/sections/AuditStepsSection";
import BookingCalendarSection from "@/components/sections/BookingCalendarSection";
import FooterSection from "@/components/sections/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InlineCTA from "@/components/InlineCTA";

const Index = () => (
  <main className="overflow-x-hidden">
    <TopBanner />
    <HeroSection />
    <AuthoritySection />
    <TestimonialsSection />
    <ChaosSection />
    <ManualCostSection />
    <CostSection />

    <BeforeAfterSection />

    <InlineCTA
      headline="Stop losing leads to slow responses"
      subtext="See exactly where automation can save you 20+ hours per week."
    />

    <MechanismSection />
    <WhatsAppSection />
    <CapabilitiesSection />

    <DiscoveryCTASection />

    <IntegrationsSection />
    <ProcessSection />
    <ExamplesSection />
    <IndustryExamplesSection />
    <AutomationImpactSection />
    <WorkflowSection />

    <InlineCTA
      headline="These results are within your reach"
      subtext="Find out which automations will have the biggest impact on your business."
    />

    <OfferSection />
    <WhoSection />
    <RiskReversalSection />
    <ScarcitySection />
    <FAQSection />
    <ConsultantSection />
    <FinalCTASection />
    <AuditStepsSection />
    <BookingCalendarSection />
    <FooterSection />
    <StickyMobileCTA />
  </main>
);

export default Index;
