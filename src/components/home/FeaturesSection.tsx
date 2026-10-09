import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FlaskConical, NotebookPen, type LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  link: string;
  cta: string;
  accent: string; // hex, used for glow + icon
  icon: LucideIcon;
}

// Screenshots live in /public/screens and are captured from the app itself.
const features: Feature[] = [
  {
    id: "notes",
    eyebrow: "Notes Vault",
    title: "Study Notes",
    description:
      "Subject-wise notes from your seniors and the ACADVERSE team. Preview them in the browser or download in one tap.",
    tags: ["Subject filters", "Instant preview", "One-tap download"],
    image: "/screens/notes.jpg",
    imageAlt: "The Notes page showing note cards with subject filters and download counts",
    link: "/notes",
    cta: "Browse notes",
    accent: "#af40ff",
    icon: NotebookPen,
  },
  {
    id: "lab",
    eyebrow: "Lab & Viva Bank",
    title: "Lab Experiments",
    description:
      "Complete lab programs with code, expected output and viva questions, so practicals never catch you off guard.",
    tags: ["Code + output", "Viva Q&A", "DSA, DBMS, OS, CN"],
    image: "/screens/lab.jpg",
    imageAlt: "The Lab page showing an experiment with its source code",
    link: "/lab",
    cta: "Open the lab",
    accent: "#00ddeb",
    icon: FlaskConical,
  },
];

const BrowserFrame = ({ src, alt, accent }: { src: string; alt: string; accent: string }) => (
  <div
    className="relative rounded-xl border border-white/10 bg-[#0b0b0d] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
    style={{ boxShadow: `0 30px 80px -30px ${accent}40, 0 0 0 1px rgba(255,255,255,0.04)` }}
  >
    <div className="flex items-center gap-1.5 h-8 px-3 border-b border-white/5 bg-[#141416]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
    <div className="relative aspect-[16/10] bg-[#0f0f10] overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b0b0d] to-transparent" />
    </div>
  </div>
);

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const reduceMotion = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 transition-colors duration-300 hover:border-white/20"
    >
      {/* soft accent glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, ${feature.accent}22, transparent 70%)` }}
      />

      <BrowserFrame src={feature.image} alt={feature.imageAlt} accent={feature.accent} />

      <div className="relative flex flex-1 flex-col px-1 pt-6 pb-1 sm:px-2">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/40"
            style={{ color: feature.accent }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">{feature.eyebrow}</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{feature.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-white/60">{feature.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${feature.title} highlights`}>
          {feature.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/60">
              {tag}
            </li>
          ))}
        </ul>

        <Link
          to={feature.link}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/50 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {feature.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: feature.accent }} />
        </Link>
      </div>
    </motion.article>
  );
};

const FeaturesSection = () => {
  return (
    <section aria-labelledby="more-features-heading" className="relative w-full overflow-hidden py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#5b42f3]/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#00ddeb]/10 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">And there&apos;s more</p>
          <h2 id="more-features-heading" className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Beyond past papers,{" "}
            <span className="bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff] bg-clip-text text-transparent">
              everything you need
            </span>
          </h2>
          <p className="mt-4 text-base text-white/55 md:text-lg">
            Revise from curated notes and rehearse your practicals, all in the same place as your PYQs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
