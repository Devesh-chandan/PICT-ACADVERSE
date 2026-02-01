import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // Track state without re-rendering
  const mouse = useRef({ x: 0, y: 0 });
  const isLocked = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. Follow Mouse Logic
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isLocked.current) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    // 2. Snapping Logic
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.cursor-target');
      if (target) {
        isLocked.current = true;
        cursor.classList.add('cursor-locked');
        const rect = target.getBoundingClientRect();

        // Snap cursor to center of button
        gsap.to(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        // Expand corners to button edges
        cornersRef.current.forEach((corner, i) => {
          const xPos = i === 1 || i === 2 ? rect.width / 2 : -rect.width / 2;
          const yPos = i === 2 || i === 3 ? rect.height / 2 : -rect.height / 2;
          
          gsap.to(corner, {
            x: xPos,
            y: yPos,
            duration: 0.4,
            ease: "power3.out"
          });
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('.cursor-target');
        if (target) {
            isLocked.current = false;
            cursor.classList.remove('cursor-locked');
            
            // Reset corners to tight formation
            cornersRef.current.forEach((corner, i) => {
                const resetX = i === 1 || i === 2 ? "50%" : "-150%";
                const resetY = i === 2 || i === 3 ? "50%" : "-150%";
                gsap.to(corner, { xPercent: 0, yPercent: 0, x: resetX, y: resetY, duration: 0.3 });
            });
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="target-cursor-container">
      <div ref={dotRef} className="target-cursor-dot" />
      {[ 'tl', 'tr', 'br', 'bl' ].map((pos, i) => (
        <div 
          key={pos} 
          ref={el => { if(el) cornersRef.current[i] = el }} 
          className={`target-cursor-corner corner-${pos}`} 
        />
      ))}
    </div>
  );
};

export default TargetCursor;