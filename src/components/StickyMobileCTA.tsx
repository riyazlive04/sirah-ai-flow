import { Button } from "@/components/ui/button";

const CTA_URL = "#book-audit";

const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 p-3 section-dark backdrop-blur-md border-t border-border/20 md:hidden">
    <Button asChild className="w-full h-auto py-3 text-sm font-semibold glow-teal whitespace-normal leading-tight" size="lg">
      <a href={CTA_URL}>Book Free AI Automation Audit</a>
    </Button>
  </div>
);

export default StickyMobileCTA;
