"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function BackgroundBeamsWithCollision({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const beamX = useTransform(mouseX, [0, 500], [-200, 200]);
  const beamY = useTransform(mouseY, [0, 500], [-200, 200]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-black"
    >
      {/* Beams */}
      <motion.div
        style={{ x: beamX, y: beamY }}
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 opacity-30 blur-3xl"
      />
      <motion.div
        style={{ x: beamX, y: beamY }}
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 blur-2xl"
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
