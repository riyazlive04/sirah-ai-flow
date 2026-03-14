import logo from "@/assets/logo.jpg";

const FooterSection = () => (
  <footer className="section-dark pb-20 md:pb-0 border-t border-border/20">
    <div className="container px-5 py-10 flex flex-col items-center text-center gap-4">
      <img src={logo} alt="Sirah Digital" className="w-10 h-10 rounded-lg object-cover ring-2 ring-white/10" />
      <p className="text-sm dark-text-muted">© {new Date().getFullYear()} Sirah Digital. All rights reserved.</p>
    </div>
  </footer>
);

export default FooterSection;
