import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant = "fadeIn" | "blurIn" | "blurInUp" | "blurInDown" | "slideUp" | "slideDown";

interface TextAnimateProps {
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  animation?: AnimationVariant;
  by?: AnimationType;
  once?: boolean;
}

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: (delay: number = 0.05) => ({
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    }),
  },
  blurInUp: {
    hidden: { y: 10, opacity: 0, filter: "blur(10px)" },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.4 } 
    },
    exit: { y: -10, opacity: 0, filter: "blur(10px)" },
  },
  // Fallback defaults for other potential variants
  fadeIn: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

export function TextAnimate({
  children,
  className,
  segmentClassName,
  delay = 0.04,
  duration = 0.4,
  animation = "blurInUp",
  by = "word",
  once = true,
}: TextAnimateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const segments = by === "character" 
    ? children.split("") 
    : by === "word" 
    ? children.split(" ") 
    : [children];

  // Select the variant based on the animation prop
  const selectedVariant = variants[animation as keyof typeof variants] || variants.fadeIn;

  return (
    <AnimatePresence>
      <motion.p
        ref={ref}
        className={cn("whitespace-pre-wrap", className)}
        variants={variants.container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        exit="exit"
        custom={delay}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={selectedVariant}
            className={cn(
              "inline-block",
              by === "word" && "mr-[0.25em]", // Add spacing for words
              segmentClassName
            )}
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
        ))}
      </motion.p>
    </AnimatePresence>
  );
}