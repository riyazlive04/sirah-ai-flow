import { Flame } from "lucide-react";

const BannerContent = () => (
  <span className="inline-flex items-center gap-2 text-primary-foreground font-semibold text-sm md:text-base whitespace-nowrap">
    <Flame className="h-4 w-4 shrink-0" />
    Only 5 Free AI Automation Audit Spots Left This Month!
    <Flame className="h-4 w-4 shrink-0" />
    <span className="mx-2 sm:mx-8">•</span>
    <Flame className="h-4 w-4 shrink-0" />
    Only 5 Free AI Automation Audit Spots Left This Month!
    <Flame className="h-4 w-4 shrink-0" />
    <span className="mx-2 sm:mx-8">•</span>
  </span>
);

const TopBanner = () => (
  <a href="#book-audit" className="block w-full bg-primary py-2.5 overflow-hidden hover:opacity-90 transition-opacity">
    <div className="animate-marquee inline-flex">
      <BannerContent />
      <BannerContent />
      <BannerContent />
      <BannerContent />
    </div>
  </a>
);

export default TopBanner;
