// // import { Link } from "react-router-dom";

// // const YearQuickLinks = () => {
// //   const years = ["First", "Second", "Third", "Final"];

// //   return (
// //     <div className="animate-slide-up w-full mt-12 px-4" style={{ animationDelay: "0.5s" }}>
// //       <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        
// //         <div className="text-center md:text-left">
// //           <h3 className="text-2xl font-bold tracking-tight text-white uppercase italic">Quick Access</h3>
          
// //         </div>

// //         <div className="flex flex-wrap justify-center gap-6">
// //           {years.map((year, index) => (
// //             <Link key={year} to={`/pyqs?year=${year}`} className="block">
// //               <button
// //                 /* 'cursor-target' triggers your GSAP TargetCursor.tsx logic */
// //                 className="cursor-target group relative px-8 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-300 rounded-lg overflow-hidden
// //                            /* Neon Border & Text */
// //                            border-2 border-[#1BFD9C] text-[#1BFD9C] 
// //                            /* Background Gradient & Glow */
// //                            bg-[linear-gradient(to_right,rgba(27,253,156,0.1)_1%,transparent_40%,transparent_60%,rgba(27,253,156,0.1)_100%)]
// //                            shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
// //                            /* Hover State */
// //                            hover:text-[#82ffc9] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]"
// //                 style={{ animationDelay: `${0.6 + index * 0.1}s` }}
// //               >
// //                 {/* Glare Sweep Effect (The :before element) */}
// //                 <span className="absolute inset-0 top-0 -left-[4em] w-[4em] h-full 
// //                                  bg-[linear-gradient(to_right,transparent_1%,rgba(27,253,156,0.1)_40%,rgba(27,253,156,0.1)_60%,transparent_100%)]
// //                                  transition-transform duration-500 ease-in-out group-hover:translate-x-[15em]" 
// //                 />

// //                 {/* The Button Content */}
// //                 <span className="relative z-10 flex items-center gap-2">
// //                    {year} <span className="text-[10px] opacity-70"></span>
// //                 </span>
// //               </button>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default YearQuickLinks;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const years = [
//   { id: 'fe', label: 'First Year (FE)', path: '/pyqs/fe' },
//   { id: 'se', label: 'Second Year (SE)', path: '/pyqs/se' },
//   { id: 'te', label: 'Third Year (TE)', path: '/pyqs/te' },
//   { id: 'be', label: 'Final Year (BE)', path: '/pyqs/be' },
// ];

// const YearQuickLinks = () => {
//   return (
//     <div className="w-full">
//       <div className="text-center mb-8">
//         <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
//           Select Your Year
//         </h3>
//       </div>
      
//       {/* Grid Layout for the buttons */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
//         {years.map((year) => (
//           <Link to={year.path} key={year.id} className="no-underline">
//             <SparkleButton text={year.label} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Reusable Sparkle Button Component
// const SparkleButton = ({ text }: { text: string }) => {
//   return (
//     <StyledWrapper>
//       <div className="sp">
//         <button className="sparkle-button">
//           <span className="spark" />
//           <span className="backdrop" />
//           {/* Icon removed as requested */}
//           <span className="text">{text}</span>
//         </button>
        
//         <div className="bodydrop" />
        
//         {/* Particles kept for the hover animation effect */}
//         <span aria-hidden="true" className="particle-pen">
//           {[...Array(12)].map((_, i) => (
//              <svg key={i} className="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//              <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
//            </svg>
//           ))}
//         </span>
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   /* Center the container */
//   display: flex;
//   justify-content: center;

//   .sparkle-button {
//     --active: 0;
//     --bg: radial-gradient(
//         40% 50% at center 100%,
//         hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
//         transparent
//       ),
//       radial-gradient(
//         80% 100% at center 120%,
//         hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
//         transparent
//       ),
//       hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
//     background: var(--bg);
//     font-size: 1rem; /* Slightly adjusted font size for better fit */
//     font-weight: 600;
//     border: 0;
//     cursor: pointer;
//     padding: 0.8em 1.5em; /* Adjusted padding */
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     white-space: nowrap;
//     border-radius: 100px;
//     position: relative;
//     width: 100%;
//     min-width: 180px;
//     box-shadow: 0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
//       0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
//       0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
//     transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
//     scale: calc(1 + (var(--active) * 0.1));
//     transition: .3s;
//   }

//   .sparkle-button:active {
//     scale: 1;
//     transition: .3s;
//   }

//   .sparkle-button:before {
//     content: "";
//     position: absolute;
//     inset: -0.2em;
//     z-index: -1;
//     border: 0.25em solid hsl(260 97% 50% / 0.5);
//     border-radius: 100px;
//     opacity: var(--active, 0);
//     transition: opacity var(--transition);
//   }

//   .spark {
//     position: absolute;
//     inset: 0;
//     border-radius: 100px;
//     rotate: 0deg;
//     overflow: hidden;
//     mask: linear-gradient(white, transparent 50%);
//     animation: flip calc(var(--spark) * 2) infinite steps(2, end);
//   }

//   @keyframes flip {
//     to {
//       rotate: 360deg;
//     }
//   }

//   .spark:before {
//     content: "";
//     position: absolute;
//     width: 200%;
//     aspect-ratio: 1;
//     top: 0%;
//     left: 50%;
//     z-index: -1;
//     translate: -50% -15%;
//     rotate: 0;
//     transform: rotate(-90deg);
//     opacity: calc((var(--active)) + 0.4);
//     background: conic-gradient(
//       from 0deg,
//       transparent 0 340deg,
//       white 360deg
//     );
//     transition: opacity var(--transition);
//     animation: rotate var(--spark) linear infinite both;
//   }

//   .spark:after {
//     content: "";
//     position: absolute;
//     inset: var(--cut);
//     border-radius: 100px;
//   }

//   .backdrop {
//     position: absolute;
//     inset: var(--cut);
//     background: var(--bg);
//     border-radius: 100px;
//     transition: background var(--transition);
//   }

//   @keyframes rotate {
//     to {
//       transform: rotate(90deg);
//     }
//   }

//   @supports(selector(:has(:is(+ *)))) {
//     body:has(button:is(:hover, :focus-visible)) {
//       --active: 1;
//       --play-state: running;
//     }

//     .bodydrop {
//       display: none;
//     }
//   }

//   .sparkle-button:is(:hover, :focus-visible) ~ :is(.bodydrop, .particle-pen) {
//     --active: 1;
//     --play-state: running;
//   }

//   .sparkle-button:is(:hover, :focus-visible) {
//     --active: 1;
//     --play-state: running;
//   }

//   .sp {
//     position: relative;
//   }

//   .particle-pen {
//     position: absolute;
//     width: 200%;
//     aspect-ratio: 1;
//     top: 50%;
//     left: 50%;
//     translate: -50% -50%;
//     -webkit-mask: radial-gradient(white, transparent 65%);
//     z-index: -1;
//     opacity: var(--active, 0);
//     transition: opacity var(--transition);
//   }

//   .particle {
//     fill: white;
//     width: calc(var(--size, 0.25) * 1rem);
//     aspect-ratio: 1;
//     position: absolute;
//     top: calc(var(--y) * 1%);
//     left: calc(var(--x) * 1%);
//     opacity: var(--alpha, 1);
//     animation: float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
//     transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
//     z-index: -1;
//     animation-play-state: var(--play-state, paused);
//   }

//   .particle path {
//     fill: hsl(0 0% 90%);
//     stroke: none;
//   }

//   .particle:nth-of-type(even) {
//     animation-direction: reverse;
//   }

//   @keyframes float-out {
//     to {
//       rotate: 360deg;
//     }
//   }

//   .text {
//     /* Centered the text since icon is gone */
//     z-index: 10;
//     letter-spacing: 0.01ch;
//     background: linear-gradient(90deg, hsl(0 0% calc((var(--active) * 100%) + 65%)), hsl(0 0% calc((var(--active) * 100%) + 26%)));
//     -webkit-background-clip: text;
//     color: transparent;
//     transition: background var(--transition);
//   }

//   /* Particle positioning vars */
//   .particle:nth-of-type(1) { --x: 30; --y: 20; --duration: 1.5; --delay: 0.1; }
//   .particle:nth-of-type(2) { --x: 70; --y: 10; --duration: 1.8; --delay: 0.2; }
//   .particle:nth-of-type(3) { --x: 10; --y: 60; --duration: 2.1; --delay: 0.3; }
//   .particle:nth-of-type(4) { --x: 90; --y: 40; --duration: 1.7; --delay: 0.4; }
//   .particle:nth-of-type(5) { --x: 30; --y: 80; --duration: 2.3; --delay: 0.5; }
//   .particle:nth-of-type(6) { --x: 70; --y: 80; --duration: 1.9; --delay: 0.6; }
//   .particle:nth-of-type(7) { --x: 50; --y: 0; --duration: 1.6; --delay: 0.7; }
//   .particle:nth-of-type(8) { --x: 0; --y: 50; --duration: 2.0; --delay: 0.8; }
//   .particle:nth-of-type(9) { --x: 100; --y: 50; --duration: 1.8; --delay: 0.9; }
//   .particle:nth-of-type(10) { --x: 20; --y: 30; --duration: 1.5; --delay: 1.0; }
//   .particle:nth-of-type(11) { --x: 80; --y: 30; --duration: 2.2; --delay: 1.1; }
//   .particle:nth-of-type(12) { --x: 50; --y: 100; --duration: 1.9; --delay: 1.2; }
// `;

// export default YearQuickLinks;