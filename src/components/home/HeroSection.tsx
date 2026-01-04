// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Search, ArrowRight } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// // import YearQuickLinks from "./YearQuickLinks";
// import TextType from "@/components/ui/text-type";
// import { motion, useMotionValue, useSpring, type SpringOptions } from 'motion/react';

// // ==========================================
// // 1. LAPTOP CARD COMPONENT (Internal)
// // ==========================================

// interface TiltedCardProps {
//   imageSrc: React.ComponentProps<'img'>['src'];
//   altText?: string;
//   captionText?: string;
//   rotateAmplitude?: number;
//   scaleOnHover?: number;
//   showMobileWarning?: boolean;
//   showTooltip?: boolean;
//   overlayContent?: React.ReactNode;
//   displayOverlayContent?: boolean;
// }

// const springValues: SpringOptions = {
//   damping: 30,
//   stiffness: 100,
//   mass: 2
// };

// function TiltedCard({
//   imageSrc,
//   altText = 'Laptop Screen',
//   captionText = '',
//   rotateAmplitude = 12,
//   scaleOnHover = 1.05,
//   showMobileWarning = true,
//   showTooltip = true,
//   overlayContent = null,
//   displayOverlayContent = false
// }: TiltedCardProps) {
//   const ref = useRef<HTMLElement>(null);
  
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
  
//   const rotateX = useSpring(useMotionValue(0), springValues); 
//   const rotateY = useSpring(useMotionValue(0), springValues);
//   const scale = useSpring(1, springValues);
//   const opacity = useSpring(0);
//   const rotateFigcaption = useSpring(0, {
//     stiffness: 350,
//     damping: 30,
//     mass: 1
//   });

//   const [lastY, setLastY] = useState(0);

//   function handleMouse(e: React.MouseEvent<HTMLElement>) {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left - rect.width / 2;
//     const offsetY = e.clientY - rect.top - rect.height / 2;

//     const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
//     const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

//     rotateX.set(rotationX);
//     rotateY.set(rotationY);

//     x.set(e.clientX - rect.left);
//     y.set(e.clientY - rect.top);

//     const velocityY = offsetY - lastY;
//     rotateFigcaption.set(-velocityY * 0.6);
//     setLastY(offsetY);
//   }

//   function handleMouseEnter() {
//     scale.set(scaleOnHover);
//     opacity.set(1);
//   }

//   function handleMouseLeave() {
//     opacity.set(0);
//     scale.set(1);
//     rotateX.set(0);
//     rotateY.set(0);
//     rotateFigcaption.set(0);
//   }

//   // --- SILVER & GLOW STYLES ---
//   const silverBorder = "border border-[#c0c0c2]/30 shadow-[0_0_15px_rgba(192,192,194,0.2)]";
  
//   // Added silverish/blueish button glow
//   const keyStyle = `
//     bg-[#1a1a1c] 
//     rounded-[3px] 
//     border-t border-white/20 border-b border-black/50
//     shadow-[0_1px_0_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]
//     transition-all duration-300
//     hover:bg-[#202022] 
//     hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.4),0_1px_0_rgba(0,0,0,0.8)]
//     hover:border-t-white/40
//   `;
  
//   const modifierKeyStyle = `${keyStyle} bg-[#151517]`; 

//   return (
//     <figure
//       ref={ref}
//       className="relative w-full max-w-[600px] [perspective:2000px] flex flex-col items-center justify-center py-10"
//       onMouseMove={handleMouse}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {showMobileWarning && (
//         <div className="absolute -top-6 text-center text-xs block sm:hidden text-muted-foreground">
//           View on desktop for 3D effect
//         </div>
//       )}

//       {/* 3D Wrapper */}
//       <motion.div
//         className="relative [transform-style:preserve-3d] w-full origin-center"
//         style={{
//           rotateX,
//           rotateY,
//           scale,
//         }}
//       >
//         {/* --- LAPTOP LID (SCREEN) --- */}
//         <div 
//           className={`relative bg-[#272729] rounded-t-xl rounded-b-[2px] p-2 sm:p-3 shadow-2xl ${silverBorder} [transform-style:preserve-3d]`}
//         >
//           {/* Webcam */}
//           <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black ring-1 ring-white/10 z-20" />

//           {/* Screen Display */}
//           <div className="relative bg-black rounded overflow-hidden aspect-[12/7] border border-white/5 shadow-inner">
//             <img
//               src={imageSrc}
//               alt={altText}
//               className="w-full h-full object-cover"
//             />
//             {displayOverlayContent && overlayContent && (
//                <div className="absolute inset-0 z-10">
//                  {overlayContent}
//                </div>
//             )}
//             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
//           </div>
//         </div>

//         {/* --- LAPTOP KEYBOARD DECK --- */}
//         <div 
//            className={`absolute top-[99%] left-0 w-full h-[290px] bg-[#1e1e20] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(192,192,194,0.1)] border-x border-b border-[#c0c0c2]/20 origin-top`}
//            style={{
//              transform: 'rotateX(76deg)',
//            }}
//         >
//           {/* Keyboard Surface Details */}
//           <div className="w-full h-full relative p-3 sm:p-4 [transform-style:preserve-3d] flex flex-col justify-start gap-3 sm:gap-4">
            
//             {/* KEYBOARD WELL */}
//             <div className="w-[96%] mx-auto h-[58%] bg-gradient-to-b from-[#101012] to-[#151517] rounded shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)] p-1.5 border border-white/5 relative z-10"
//                  style={{ transformStyle: 'preserve-3d' }}>
                
//                 <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(6,1fr)] gap-[3px] h-full [transform:translateZ(1px)]">
//                     {/* Row 1 */}
//                     {Array.from({length: 15}).map((_,i) => <div key={`r1-${i}`} className={keyStyle}/>)}
//                     {/* Row 2 */}
//                     {Array.from({length: 13}).map((_,i) => <div key={`r2-${i}`} className={keyStyle}/>)}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     {/* Row 3 */}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     {Array.from({length: 13}).map((_,i) => <div key={`r3-${i}`} className={keyStyle}/>)}
//                     {/* Row 4 */}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     {Array.from({length: 11}).map((_,i) => <div key={`r4-${i}`} className={keyStyle}/>)}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                      {/* Row 5 */}
//                     <div className={`${modifierKeyStyle} col-span-3`}/> 
//                     {Array.from({length: 10}).map((_,i) => <div key={`r5-${i}`} className={keyStyle}/>)}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     {/* Row 6 */}
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     <div className={keyStyle}/> 
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     <div className={`${keyStyle} col-span-5`}/> 
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                     <div className={keyStyle}/> 
//                     <div className={`${modifierKeyStyle} col-span-2`}/> 
//                 </div>
//             </div>

//             {/* BIGGER TRACKPAD - Width 50%, Height 35% */}
//             <div className="w-[50%] mx-auto h-[35%] bg-[#252527] rounded-lg border border-[#c0c0c2]/20 shadow-inner relative z-10 [transform:translateZ(1px)] hover:bg-[#2a2a2c] transition-colors" />
            
//             {/* Laptop Base Thickness (Front Edge) */}
//             <div className="absolute bottom-0 left-0 w-full h-[16px] bg-[#1a1a1c] rounded-b-xl origin-bottom brightness-90 border-t border-white/20 shadow-[0_-2px_10px_rgba(255,255,255,0.05)]" 
//                  style={{ transform: 'rotateX(-90deg) translateZ(8px)' }} 
//             />
//           </div>
//         </div>

//       </motion.div>

//       {/* Floating Tooltip */}
//       {showTooltip && (
//         <motion.figcaption
//           className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[50] hidden sm:block shadow-lg border border-gray-200"
//           style={{
//             x,
//             y,
//             opacity,
//             rotate: rotateFigcaption
//           }}
//         >
//           {captionText}
//         </motion.figcaption>
//       )}
//     </figure>
//   );
// }
// // ==========================================
// // 2. HERO SECTION
// // ==========================================

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const screenImages = [
//     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % screenImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [screenImages.length]);

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24 pb-12 lg:pt-32 lg:pb-0">
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
//       <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full -z-10" />
//       <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full -z-10" />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

//           <div className="w-full lg:w-7/12 text-center lg:text-left space-y-8 animate-slide-up">
//             <div className="space-y-4">
//               <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
//                 Master Your Exams with <br className="hidden lg:block" />
//                 <span className="gradient-text inline-block min-w-[300px]">
//                   <TextType
//                     text={["Smart Preparation", "AI Predictions", "Exam Success"]}
//                     typingSpeed={100}
//                     deletingSpeed={50}
//                     pauseDuration={2000}
//                     loop={true}
//                     showCursor={true}
//                     cursorClassName="text-primary ml-1"
//                   />
//                 </span>
//               </h1>
//               <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
//                 Access thousands of Previous Year Questions, AI-generated predictions, and curated study notes tailored for your success.
//               </p>
//             </div>

//             <div className="relative max-w-lg mx-auto lg:mx-0 group">
//               <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
//               <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
//                 <Search className="ml-4 w-5 h-5 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search for subjects, topics..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full h-14 px-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
//                 />
//                 <Button className="mr-2 rounded-xl" size="sm">Search</Button>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
//               <Link to="/pyqs" className="w-full sm:w-auto">
//                 <Button size="lg" className="w-full h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
//                   Browse Papers <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//               </Link>
//               <Link to="/dashboard" className="w-full sm:w-auto">
//                 <Button variant="outline" size="lg" className="w-full h-12 text-base border-2 hover:bg-accent/5">
//                   Student Dashboard
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* UPDATED: Increased negative margin and added transform to pull laptop up */}
//           <div className="w-full lg:w-5/12 flex justify-center items-center py-10 lg:py-0 relative z-10 -mt-20 lg:-mt-14 transform lg:-translate-y-8">
//             <div className="w-full max-w-[600px]">
//               <TiltedCard
//                 imageSrc={screenImages[currentImageIndex]}
//                 altText="Student Dashboard Preview"
                
//                 rotateAmplitude={12}
//                 scaleOnHover={1.05}
//                 showMobileWarning={true}
//                 showTooltip={true}
//                 displayOverlayContent={true}
//                 overlayContent={
//                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
//                     {/* <div className="inline-block px-2 py-0.5 rounded bg-primary text-[10px] font-bold text-white mb-2 shadow-md">
//                       LIVE DEMO
//                     </div> */}
//                     {/* <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
//                       Interactive Dashboard
//                     </h3> */}
//                     <p className="text-white/80 text-xs mt-1">
//                       {/* Track progress and get AI insights. */}
//                     </p>
//                   </div>
//                 }
//               />
//             </div>
            
//             {/* UPDATED: Glow position adjusted to top-[40%] to follow the laptop upward */}
//             <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/5 blur-[130px] -z-10 rounded-full pointer-events-none" />
//           </div>

//         </div>

//         <div className="mt-20 border-t border-border/40 pt-10">
//           {/* <YearQuickLinks /> */}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default HeroSection;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
// import YearQuickLinks from "./YearQuickLinks";
import TextType from "@/components/ui/text-type";
import { motion, useMotionValue, useSpring, type SpringOptions } from 'motion/react';

// ==========================================
// 1. LAPTOP CARD COMPONENT (Internal)
// ==========================================

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
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
  altText = 'Laptop Screen',
  captionText = '',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
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

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

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
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  // --- SILVER & GLOW STYLES ---
  const silverBorder = "border border-[#c0c0c2]/30 shadow-[0_0_15px_rgba(192,192,194,0.2)]";
  
  const keyStyle = `
    bg-[#1a1a1c] 
    rounded-[3px] 
    border-t border-white/20 border-b border-black/50
    shadow-[0_1px_0_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]
    transition-all duration-300
    hover:bg-[#202022] 
    hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.4),0_1px_0_rgba(0,0,0,0.8)]
    hover:border-t-white/40
  `;
  
  const modifierKeyStyle = `${keyStyle} bg-[#151517]`; 

  return (
    <figure
      ref={ref}
      className="relative w-full max-w-[600px] [perspective:2000px] flex flex-col items-center justify-center py-10"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute -top-6 text-center text-xs block sm:hidden text-muted-foreground">
          View on desktop for 3D effect
        </div>
      )}

      {/* 3D Wrapper */}
      <motion.div
        className="relative [transform-style:preserve-3d] w-full origin-center"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* --- LAPTOP LID (SCREEN) --- */}
        <div 
          className={`relative bg-[#272729] rounded-t-xl rounded-b-[2px] p-2 sm:p-3 shadow-2xl ${silverBorder} [transform-style:preserve-3d]`}
        >
          {/* Webcam */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black ring-1 ring-white/10 z-20" />

          {/* Screen Display */}
          <div className="relative bg-black rounded overflow-hidden aspect-[12/7] border border-white/5 shadow-inner">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
          </div>
        </div>

        {/* --- LAPTOP KEYBOARD DECK --- */}
        <div 
           className={`absolute top-[99%] left-0 w-full h-[290px] bg-[#1e1e20] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(192,192,194,0.1)] border-x border-b border-[#c0c0c2]/20 origin-top`}
           style={{
             transform: 'rotateX(76deg)',
           }}
        >
          {/* Keyboard Surface Details */}
          <div className="w-full h-full relative p-3 sm:p-4 [transform-style:preserve-3d] flex flex-col justify-start gap-3 sm:gap-4">
            
            {/* KEYBOARD WELL */}
            <div className="w-[96%] mx-auto h-[58%] bg-gradient-to-b from-[#101012] to-[#151517] rounded shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)] p-1.5 border border-white/5 relative z-10"
                 style={{ transformStyle: 'preserve-3d' }}>
                
                <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(6,1fr)] gap-[3px] h-full [transform:translateZ(1px)]">
                    {/* Row 1 */}
                    {Array.from({length: 15}).map((_,i) => <div key={`r1-${i}`} className={keyStyle}/>)}
                    {/* Row 2 */}
                    {Array.from({length: 13}).map((_,i) => <div key={`r2-${i}`} className={keyStyle}/>)}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    {/* Row 3 */}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    {Array.from({length: 13}).map((_,i) => <div key={`r3-${i}`} className={keyStyle}/>)}
                    {/* Row 4 */}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    {Array.from({length: 11}).map((_,i) => <div key={`r4-${i}`} className={keyStyle}/>)}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                     {/* Row 5 */}
                    <div className={`${modifierKeyStyle} col-span-3`}/> 
                    {Array.from({length: 10}).map((_,i) => <div key={`r5-${i}`} className={keyStyle}/>)}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    {/* Row 6 */}
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    <div className={keyStyle}/> 
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    <div className={`${keyStyle} col-span-5`}/> 
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                    <div className={keyStyle}/> 
                    <div className={`${modifierKeyStyle} col-span-2`}/> 
                </div>
            </div>

            {/* BIGGER TRACKPAD */}
            <div className="w-[50%] mx-auto h-[35%] bg-[#252527] rounded-lg border border-[#c0c0c2]/20 shadow-inner relative z-10 [transform:translateZ(1px)] hover:bg-[#2a2a2c] transition-colors" />
            
            {/* Laptop Base Thickness */}
            <div className="absolute bottom-0 left-0 w-full h-[16px] bg-[#1a1a1c] rounded-b-xl origin-bottom brightness-90 border-t border-white/20 shadow-[0_-2px_10px_rgba(255,255,255,0.05)]" 
                 style={{ transform: 'rotateX(-90deg) translateZ(8px)' }} 
            />
          </div>
        </div>

      </motion.div>

      {/* Floating Tooltip */}
      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[50] hidden sm:block shadow-lg border border-gray-200"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

// ==========================================
// 2. HERO SECTION
// ==========================================

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const screenImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % screenImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screenImages.length]);

  return (
    // CHANGE 1: Removed 'min-h-screen' and adjusted padding to remove large vertical gaps
    <section className="relative flex items-center overflow-hidden bg-background pt-24 pb-6 lg:pt-32 lg:pb-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="w-full lg:w-7/12 text-center lg:text-left space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Master Your Exams with <br className="hidden lg:block" />
                <span className="gradient-text inline-block min-w-[300px]">
                  <TextType
                    text={["Smart Preparation", "AI Predictions", "Exam Success"]}
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={true}
                    cursorClassName="text-primary ml-1"
                  />
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Access thousands of Previous Year Questions, AI-generated predictions, and curated study notes tailored for your success.
              </p>
            </div>

            <div className="relative max-w-lg mx-auto lg:mx-0 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <Search className="ml-4 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for subjects, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 px-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button className="mr-2 rounded-xl" size="sm">Search</Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/pyqs" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Browse Papers <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-12 text-base border-2 hover:bg-accent/5">
                  Student Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-5/12 flex justify-center items-center py-10 lg:py-0 relative z-10 -mt-20 lg:-mt-14 transform lg:-translate-y-8">
            <div className="w-full max-w-[600px]">
              <TiltedCard
                imageSrc={screenImages[currentImageIndex]}
                altText="Student Dashboard Preview"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={true}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-white/80 text-xs mt-1">
                      {/* Content here */}
                    </p>
                  </div>
                }
              />
            </div>
            
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/5 blur-[130px] -z-10 rounded-full pointer-events-none" />
          </div>

        </div>

        {/* CHANGE 2: Reduced 'mt-20' to 'mt-8' to decrease gap above next section */}
        <div className="mt-8 border-t border-border/40 pt-10">
          {/* <YearQuickLinks /> */}
        </div>
      </div>
    </section>
  );
};
export default HeroSection;