import React, { MouseEvent, useEffect, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: number;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, children, onClick, rippleColor = "#ADD8E6", duration = 600, ...props }, ref) => {
    const [buttonRipples, setButtonRipples] = useState<Array<{ x: number; y: number; size: number; key: number }>>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prev) => [...prev, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prev) => prev.filter((ripple) => ripple.key !== lastRipple.key));
        }, duration);
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent px-4 py-2 text-center",
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0 z-0">
          {buttonRipples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute animate-ripple rounded-full opacity-30"
              style={{
                width: ripple.size,
                height: ripple.size,
                top: ripple.y,
                left: ripple.x,
                backgroundColor: rippleColor,
                transform: "scale(0)",
                animation: `ripple ${duration}ms linear`,
              }}
            />
          ))}
        </span>
        <style>{`
          @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
          }
        `}</style>
      </button>
    );
  }
);
RippleButton.displayName = "RippleButton";