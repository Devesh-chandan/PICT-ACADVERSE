import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import YearQuickLinks from "./YearQuickLinks";
import TextType from "@/components/ui/text-type";
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";

// ==========================================
// TiltedCard Component (Laptop)
// ==========================================

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

function TiltedCard({
  imageSrc,
  altText = "Laptop Screen preview",
  captionText = "",
  scaleOnHover = 1.05,
  rotateAmplitude = 18,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    scale.set(1);
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full max-w-[600px] [perspective:1500px] flex flex-col items-center justify-center py-10 -mt-16"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-0 text-xs sm:hidden text-muted-foreground">
          Check on desktop for 3D effect
        </div>
      )}

      <motion.div
        className="relative w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {/* Laptop Screen */}
        <div className="relative bg-[#1a1a1a] rounded-t-2xl p-3 shadow-2xl border border-white/10">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-[16/10]">
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-cover"
            />

            {displayOverlayContent && overlayContent && (
              <div className="absolute inset-0 z-10">
                {overlayContent}
              </div>
            )}
          </div>
        </div>

        {/* Laptop Base */}
        <div className="h-4 bg-[#202023] rounded-b-2xl shadow-xl border-t border-black/40 mx-2" />
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded bg-white px-2 py-1 text-[10px] text-black opacity-0 hidden sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

// ==========================================
// Hero Section
// ==========================================

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const screenImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % screenImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="lg:w-7/12 space-y-8 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold">
              Master Your Exams with{" "}
              <span className="gradient-text">
                <TextType
                  text={["Smart Preparation", "AI Predictions", "Exam Success"]}
                  loop
                />
              </span>
            </h1>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Link to="/pyqs">
                <Button size="lg">
                  Browse Papers <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right */}
          {/* <div className="lg:w-5/12 flex justify-center">
            <TiltedCard
              imageSrc={screenImages[currentImageIndex]}
              captionText="Smart Dashboard"
              displayOverlayContent
              overlayContent={
                <div className="absolute bottom-0 w-full p-4 bg-black/70 text-white text-sm">
                  Interactive Dashboard
                </div>
              }
            />
          </div> */}
        </div>

        <div className="mt-20 border-t pt-10">
          <YearQuickLinks />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
