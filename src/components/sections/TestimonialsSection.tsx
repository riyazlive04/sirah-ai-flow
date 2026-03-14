import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { Quote } from "lucide-react";

const testimonials = [
  {
    company: "Sheizen Wellness",
    text: "Sirah Digital helped us implement reliable analytics and tracking systems that improved our ability to understand customer behaviour and make better marketing decisions.",
    attribution: "Sheizen Wellness Team",
    videoUrl: "https://www.youtube.com/watch?v=ZoR5ByPDpf4",
  },
  {
    company: "A1 Sivakasi Crackers",
    text: "Working with Sirah Digital gave us clarity into our digital performance. Their technical expertise and structured approach made our systems more reliable and easier to manage.",
    attribution: "A1 Sivakasi Crackers Team",
    videoUrl: "https://www.youtube.com/shorts/M9ozyk7LLqM",
  },
];

function getYouTubeEmbedUrl(url: string) {
  if (url.includes("shorts/")) {
    const id = url.split("shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  const id = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${id}`;
}

const TestimonialsSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-5xl mx-auto">
      <AnimateIn className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading mb-4">
          Businesses That Trust Sirah Digital
        </h2>
        <p className="text-body text-base md:text-lg max-w-2xl mx-auto">
          Companies across different industries trust Sirah Digital for analytics systems, automation solutions and digital growth.
        </p>
      </AnimateIn>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            className="bg-card rounded-2xl shadow-md border border-border p-6 flex flex-col"
          >
            <Quote className="w-8 h-8 mb-4" style={{ color: "#21B6B6" }} />
            <p className="text-body text-base leading-relaxed mb-6 flex-1">
              "{t.text}"
            </p>
            <div className="mb-5">
              <p className="font-heading font-semibold text-heading">{t.company}</p>
              <p className="text-sm text-muted-foreground">{t.attribution}</p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(t.videoUrl)}
                title={`${t.company} testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
