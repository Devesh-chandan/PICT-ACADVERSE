



// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   Menu,
//   X,
//   LogOut,
//   Home,
//   BookOpen,
//   Bell
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";
// import { cn } from "@/lib/utils";

// // Import the Menubar components
// import {
//   Menubar,
//   MenubarMenu,
//   MenubarTrigger,
// } from "@/components/ui/menubar";

// // ------------------------------------
// // 1. Data & Types
// // ------------------------------------
// interface NavItem {
//   name: string;
//   href: string;
//   icon: any;
// }

// const navItems: NavItem[] = [
//   { name: "Home", href: "/home", icon: Home }, 
//   { name: "PYQs", href: "/pyqs", icon: BookOpen },
//   { name: "Updates", href: "/updates", icon: Bell },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// // ------------------------------------
// // 2. Main Navbar Component
// // ------------------------------------
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) return null;

//   // Handle Scroll Effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6">
//       <nav
//         className={cn(
//           "mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border border-transparent will-change-transform",
//           // Scroll State changes
//           isScrolled 
//             ? "bg-black/60 backdrop-blur-md border-white/10 max-w-5xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]" 
//             : "max-w-7xl bg-transparent"
//         )}
//       >
//         <div className={cn(
//             "relative flex items-center justify-between px-6",
//             isScrolled ? "h-16" : "h-20"
//         )}>
          
//           {/* LEFT: Logo Section */}
//           <div className="flex-shrink-0 z-20">
//             <Link to="/home" className="group block">
//               <GlareHover
//                 width="auto"
//                 height="auto"
//                 background="transparent"
//                 borderRadius="12px"
//                 borderColor="transparent"
//                 autoPlay={true}
//                 interval={4000} 
//                 disableHover={true}
//                 transitionDuration={1500} 
//                 className="px-2 py-1"
//               >
//                 <div className="flex items-center gap-2">
//                   <LogoLoader>
//                     <div className="loader">
//                       <p className="prefix hidden sm:block">ACADVERSE-</p>
//                       <p className="prefix sm:hidden">PA-</p> 
//                       <div className="words">
//                         <span className="word">PYQ'S</span>
//                         <span className="word">UPDATES</span>
//                         <span className="word">NOTES</span>
//                         <span className="word">PYQ'S</span>
//                         <span className="word">UPDATES</span>
//                         <span className="word">NOTES</span>
//                       </div>
//                     </div>
//                   </LogoLoader>
//                 </div>
//               </GlareHover>
//             </Link>
//           </div>

//           {/* CENTER: Navigation (ABSOLUTELY CENTERED) */}
//           <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"> 
//             <Menubar className="border-none bg-transparent shadow-none space-x-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 const IconComponent = item.icon;

//                 return (
//                   <MenubarMenu key={item.name}>
//                     <Link to={item.href}>
//                       <MenubarTrigger 
//                         className={cn(
//                           "cursor-pointer transition-all duration-300 px-5 py-2 rounded-full",
//                           // Active State styling: Subtle glow + text color
//                           isActive 
//                             ? "bg-primary/15 text-white font-medium shadow-[0_0_10px_rgba(175,64,255,0.2)]" 
//                             : "text-gray-400 hover:text-white hover:bg-white/5"
//                         )}
//                       >
//                         <IconComponent className={cn("w-4 h-4 mr-2 transition-transform duration-300", isActive && "scale-110")} />
//                         {item.name}
//                       </MenubarTrigger>
//                     </Link>
//                   </MenubarMenu>
//                 );
//               })}
//             </Menubar>
//           </div>

//           {/* RIGHT: Dashboard, Profile & Mobile Toggle */}
//           <div className="flex items-center gap-4 z-20">
//             {/* Desktop Dashboard & Profile */}
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/dashboard">
//                 <UniverseButtonWrapper>
//                   <button className="uiverse">
//                     <div className="wrapper">
//                       <span>Dashboard</span>
//                       <div className="circle circle-12" />
//                       <div className="circle circle-11" />
//                       <div className="circle circle-10" />
//                       <div className="circle circle-9" />
//                       <div className="circle circle-8" />
//                       <div className="circle circle-7" />
//                       <div className="circle circle-6" />
//                       <div className="circle circle-5" />
//                       <div className="circle circle-4" />
//                       <div className="circle circle-3" />
//                       <div className="circle circle-2" />
//                       <div className="circle circle-1" />
//                     </div>
//                   </button>
//                 </UniverseButtonWrapper>
//               </Link>
//               <ProfileDropdown />
//             </div>

//             {/* Mobile Toggle Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden text-white hover:bg-white/10 rounded-full"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* MOBILE MENU DROPDOWN */}
//         {isOpen && (
//           <div className="lg:hidden px-6 pb-6 pt-2 border-t border-white/10 animate-in slide-in-from-top-2 fade-in-20">
//              <div className="flex flex-col gap-3">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 const IconComponent = item.icon;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant="ghost"
//                       className={cn(
//                         "w-full justify-start pl-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl h-12",
//                         isActive && "bg-primary/10 text-primary hover:bg-primary/20"
//                       )}
//                     >
//                       <IconComponent className="w-5 h-5 mr-3" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
              
//               <div className="h-px bg-white/10 my-2" />
              
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 text-primary h-12 rounded-xl">
//                   Go to Dashboard
//                 </Button>
//               </Link>
              
//               <div className="md:hidden flex justify-between items-center mt-2 p-3 bg-white/5 rounded-xl">
//                   <span className="text-sm text-gray-400 font-medium">Account</span>
//                   <ProfileDropdown />
//               </div>

//               <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl h-12" onClick={handleMobileLogout}>
//                 <LogOut className="w-5 h-5 mr-3" />
//                 Log Out
//               </Button>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// // ------------------------------------
// // 3. Styled Components
// // ------------------------------------

// const LogoLoader = styled.div`
//   .loader {
//     color: hsl(var(--foreground)); 
//     font-family: inherit; 
//     font-weight: 700;
//     font-size: 1.25rem;
//     box-sizing: content-box;
//     height: 1.75rem;
//     padding: 0;
//     display: flex;
//     align-items: center;
//   }

//   .prefix {
//     margin: 0;
//     white-space: nowrap;
//     color: white; 
//   }

//   .words {
//     overflow: hidden;
//     height: 100%;
//     position: relative;
//     padding-left: 2px;
//     mask-image: linear-gradient(
//       transparent 0%,
//       black 20%,
//       black 80%,
//       transparent 100%
//     );
//   }

//   .word {
//     display: flex;
//     align-items: center;
//     height: 100%;
//     color: #956afa; 
//     animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2);
//     white-space: nowrap;
//     font-weight: 800; 
//   }

//   @keyframes spin_logo {
//     0% { transform: translateY(0); }
//     15% { transform: translateY(-100%); }
//     25% { transform: translateY(-100%); }
//     40% { transform: translateY(-200%); }
//     50% { transform: translateY(-200%); }
//     65% { transform: translateY(-300%); }
//     75% { transform: translateY(-300%); }
//     90% { transform: translateY(-400%); }
//     100% { transform: translateY(-400%); }
//   }
// `;

// const UniverseButtonWrapper = styled.div`
//   .uiverse {
//     --duration: 7s;
//     --easing: linear;
//     --c-color-1: rgba(91, 66, 243, 0.7);
//     --c-color-2: #af40ff;
//     --c-color-3: #00ddeb;
//     --c-color-4: rgba(46, 142, 255, 0.7);
    
//     --c-shadow: rgba(175, 64, 255, 0.4);
//     --c-shadow-inset-top: rgba(91, 66, 243, 0.9);
//     --c-shadow-inset-bottom: rgba(0, 221, 235, 0.8);
    
//     --c-radial-inner: #202025;
//     --c-radial-outer: #09090b;
//     --c-color: #fff;
    
//     -webkit-tap-highlight-color: transparent;
//     -webkit-appearance: none;
//     outline: none;
//     position: relative;
//     cursor: pointer;
//     border: none;
//     display: flex; /* Changed from table to flex */
//     align-items: center;
//     justify-content: center;
//     border-radius: 9999px; /* Pill shape */
//     padding: 0;
//     margin: 0;
//     text-align: center;
//     font-weight: 600;
//     font-size: 14px;
//     letter-spacing: 0.02em;
//     line-height: 1.5;
//     color: var(--c-color);
//     background: radial-gradient(
//       circle,
//       var(--c-radial-inner),
//       var(--c-radial-outer) 80%
//     );
//     box-shadow: 0 0 14px var(--c-shadow);
//     transition: all 0.3s ease;
//   }

//   .uiverse:before {
//     content: "";
//     pointer-events: none;
//     position: absolute;
//     z-index: 3;
//     left: 0;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     border-radius: 9999px;
//     box-shadow:
//       inset 0 3px 12px var(--c-shadow-inset-top),
//       inset 0 -3px 4px var(--c-shadow-inset-bottom);
//   }

//   .uiverse .wrapper {
//     -webkit-mask-image: -webkit-radial-gradient(white, black);
//     overflow: hidden;
//     border-radius: 9999px;
//     min-width: 120px;
//     padding: 10px 0; /* Increased padding slightly */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .uiverse .wrapper span {
//     display: inline-block;
//     position: relative;
//     z-index: 1;
//   }

//   .uiverse:hover {
//     --duration: 1400ms;
//     box-shadow: 0 0 20px var(--c-shadow); /* Enhanced hover glow */
//     transform: translateY(-1px);
//   }

//   .uiverse .wrapper .circle {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     filter: blur(var(--blur, 8px));
//     background: var(--background, transparent);
//     transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
//     animation: var(--animation, none) var(--duration) var(--easing) infinite;
//   }

//   .uiverse .wrapper .circle.circle-1,
//   .uiverse .wrapper .circle.circle-9,
//   .uiverse .wrapper .circle.circle-10 {
//     --background: var(--c-color-4);
//   }

//   .uiverse .wrapper .circle.circle-3,
//   .uiverse .wrapper .circle.circle-4 {
//     --background: var(--c-color-2);
//     --blur: 14px;
//   }

//   .uiverse .wrapper .circle.circle-5,
//   .uiverse .wrapper .circle.circle-6 {
//     --background: var(--c-color-3);
//     --blur: 16px;
//   }

//   .uiverse .wrapper .circle.circle-2,
//   .uiverse .wrapper .circle.circle-7,
//   .uiverse .wrapper .circle.circle-8,
//   .uiverse .wrapper .circle.circle-11,
//   .uiverse .wrapper .circle.circle-12 {
//     --background: var(--c-color-1);
//     --blur: 12px;
//   }

//   .uiverse .wrapper .circle.circle-1 {
//     --x: 0;
//     --y: -40px;
//     --animation: circle-1;
//   }

//   .uiverse .wrapper .circle.circle-2 {
//     --x: 92px;
//     --y: 8px;
//     --animation: circle-2;
//   }

//   .uiverse .wrapper .circle.circle-3 {
//     --x: -12px;
//     --y: -12px;
//     --animation: circle-3;
//   }

//   .uiverse .wrapper .circle.circle-4 {
//     --x: 80px;
//     --y: -12px;
//     --animation: circle-4;
//   }

//   .uiverse .wrapper .circle.circle-5 {
//     --x: 12px;
//     --y: -4px;
//     --animation: circle-5;
//   }

//   .uiverse .wrapper .circle.circle-6 {
//     --x: 56px;
//     --y: 16px;
//     --animation: circle-6;
//   }

//   .uiverse .wrapper .circle.circle-7 {
//     --x: 8px;
//     --y: 28px;
//     --animation: circle-7;
//   }

//   .uiverse .wrapper .circle.circle-8 {
//     --x: 28px;
//     --y: -4px;
//     --animation: circle-8;
//   }

//   .uiverse .wrapper .circle.circle-9 {
//     --x: 20px;
//     --y: -12px;
//     --animation: circle-9;
//   }

//   .uiverse .wrapper .circle.circle-10 {
//     --x: 64px;
//     --y: 16px;
//     --animation: circle-10;
//   }

//   .uiverse .wrapper .circle.circle-11 {
//     --x: 4px;
//     --y: 4px;
//     --animation: circle-11;
//   }

//   .uiverse .wrapper .circle.circle-12 {
//     --blur: 14px;
//     --x: 52px;
//     --y: 4px;
//     --animation: circle-12;
//   }

//   @keyframes circle-1 {
//     33% { transform: translate(0px, 16px) translateZ(0); }
//     66% { transform: translate(12px, 64px) translateZ(0); }
//   }

//   @keyframes circle-2 {
//     33% { transform: translate(80px, -10px) translateZ(0); }
//     66% { transform: translate(72px, -48px) translateZ(0); }
//   }

//   @keyframes circle-3 {
//     33% { transform: translate(20px, 12px) translateZ(0); }
//     66% { transform: translate(12px, 4px) translateZ(0); }
//   }

//   @keyframes circle-4 {
//     33% { transform: translate(76px, -12px) translateZ(0); }
//     66% { transform: translate(112px, -8px) translateZ(0); }
//   }

//   @keyframes circle-5 {
//     33% { transform: translate(84px, 28px) translateZ(0); }
//     66% { transform: translate(40px, -32px) translateZ(0); }
//   }

//   @keyframes circle-6 {
//     33% { transform: translate(28px, -16px) translateZ(0); }
//     66% { transform: translate(76px, -56px) translateZ(0); }
//   }

//   @keyframes circle-7 {
//     33% { transform: translate(8px, 28px) translateZ(0); }
//     66% { transform: translate(20px, -60px) translateZ(0); }
//   }

//   @keyframes circle-8 {
//     33% { transform: translate(32px, -4px) translateZ(0); }
//     66% { transform: translate(56px, -20px) translateZ(0); }
//   }

//   @keyframes circle-9 {
//     33% { transform: translate(20px, -12px) translateZ(0); }
//     66% { transform: translate(80px, -8px) translateZ(0); }
//   }

//   @keyframes circle-10 {
//     33% { transform: translate(68px, 20px) translateZ(0); }
//     66% { transform: translate(100px, 28px) translateZ(0); }
//   }

//   @keyframes circle-11 {
//     33% { transform: translate(4px, 4px) translateZ(0); }
//     66% { transform: translate(68px, 20px) translateZ(0); }
//   }

//   @keyframes circle-12 {
//     33% { transform: translate(56px, 0px) translateZ(0); }
//     66% { transform: translate(60px, -32px) translateZ(0); }
//   }
// `;

// export default Navbar;






// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   Menu,
//   X,
//   LogOut,
//   Home,
//   BookOpen,
//   Bell
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";
// import { cn } from "@/lib/utils";

// // Import the Menubar components
// import {
//   Menubar,
//   MenubarMenu,
//   MenubarTrigger,
// } from "@/components/ui/menubar";

// // ------------------------------------
// // 1. Data & Types
// // ------------------------------------
// interface NavItem {
//   name: string;
//   href: string;
//   icon: any;
// }

// const navItems: NavItem[] = [
//   { name: "Home", href: "/home", icon: Home }, 
//   { name: "PYQs", href: "/pyqs", icon: BookOpen },
//   { name: "Updates", href: "/updates", icon: Bell },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// // ------------------------------------
// // 2. Main Navbar Component
// // ------------------------------------
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) return null;

//   // Handle Scroll Effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6">
//       <nav
//         className={cn(
//           "mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border border-transparent will-change-transform",
//           // Scroll State changes
//           isScrolled 
//             ? "bg-black/60 backdrop-blur-md border-white/10 max-w-5xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]" 
//             : "max-w-7xl bg-transparent"
//         )}
//       >
//         <div className={cn(
//             "relative flex items-center justify-between px-6",
//             isScrolled ? "h-16" : "h-20"
//         )}>
          
//           {/* LEFT: Logo Section */}
//           <div className="flex-shrink-0 z-20">
//             <Link to="/home" className="group block">
//               <GlareHover
//                 width="auto"
//                 height="auto"
//                 background="transparent"
//                 borderRadius="12px"
//                 borderColor="transparent"
//                 autoPlay={true}
//                 interval={4000} 
//                 disableHover={true}
//                 transitionDuration={1500} 
//                 className="px-2 py-1"
//               >
//                 <div className="flex items-center gap-2">
//                   <LogoLoader>
//                     <div className="loader">
//                       <p className="prefix hidden sm:block">ACADVERSE-</p>
//                       <p className="prefix sm:hidden">PA-</p> 
//                       <div className="words">
//                         <span className="word">PYQ'S</span>
//                         <span className="word">UPDATES</span>
//                         <span className="word">NOTES</span>
//                         <span className="word">PYQ'S</span>
//                         <span className="word">UPDATES</span>
//                         <span className="word">NOTES</span>
//                       </div>
//                     </div>
//                   </LogoLoader>
//                 </div>
//               </GlareHover>
//             </Link>
//           </div>

//           {/* CENTER: Navigation (ABSOLUTELY CENTERED) */}
//           <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"> 
//             <Menubar className="border-none bg-transparent shadow-none space-x-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 const IconComponent = item.icon;

//                 return (
//                   <MenubarMenu key={item.name}>
//                     <Link to={item.href}>
//                       <MenubarTrigger 
//                         className={cn(
//                           "cursor-pointer transition-all duration-300 px-6 py-2 rounded-full group relative overflow-hidden min-w-[100px] flex items-center justify-center",
//                           // Active State: Neutral white/transparent, no teal
//                           isActive 
//                             ? "bg-white/10 text-white font-medium border border-white/10" 
//                             : "text-gray-400 hover:text-white hover:bg-white/5"
//                         )}
//                       >
//                         {/* 1. Name: Visible by default, slides up on hover */}
//                         <span className="transition-transform duration-300 group-hover:-translate-y-[150%] block">
//                           {item.name}
//                         </span>

//                         {/* 2. Icon: Hidden below by default, slides up on hover */}
//                         <IconComponent className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[150%] transition-transform duration-300 group-hover:-translate-y-1/2 text-white" />
                        
//                       </MenubarTrigger>
//                     </Link>
//                   </MenubarMenu>
//                 );
//               })}
//             </Menubar>
//           </div>

//           {/* RIGHT: Dashboard, Profile & Mobile Toggle */}
//           <div className="flex items-center gap-4 z-20">
//             {/* Desktop Dashboard & Profile */}
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/dashboard">
//                 <UniverseButtonWrapper>
//                   <button className="uiverse">
//                     <div className="wrapper">
//                       <span>Dashboard</span>
//                       <div className="circle circle-12" />
//                       <div className="circle circle-11" />
//                       <div className="circle circle-10" />
//                       <div className="circle circle-9" />
//                       <div className="circle circle-8" />
//                       <div className="circle circle-7" />
//                       <div className="circle circle-6" />
//                       <div className="circle circle-5" />
//                       <div className="circle circle-4" />
//                       <div className="circle circle-3" />
//                       <div className="circle circle-2" />
//                       <div className="circle circle-1" />
//                     </div>
//                   </button>
//                 </UniverseButtonWrapper>
//               </Link>
//               <ProfileDropdown />
//             </div>

//             {/* Mobile Toggle Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden text-white hover:bg-white/10 rounded-full"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* MOBILE MENU DROPDOWN */}
//         {isOpen && (
//           <div className="lg:hidden px-6 pb-6 pt-2 border-t border-white/10 animate-in slide-in-from-top-2 fade-in-20">
//              <div className="flex flex-col gap-3">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 const IconComponent = item.icon;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant="ghost"
//                       className={cn(
//                         "w-full justify-start pl-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl h-12",
//                         isActive && "bg-white/10 text-white"
//                       )}
//                     >
//                       <IconComponent className="w-5 h-5 mr-3" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
              
//               <div className="h-px bg-white/10 my-2" />
              
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 text-primary h-12 rounded-xl">
//                   Go to Dashboard
//                 </Button>
//               </Link>
              
//               <div className="md:hidden flex justify-between items-center mt-2 p-3 bg-white/5 rounded-xl">
//                   <span className="text-sm text-gray-400 font-medium">Account</span>
//                   <ProfileDropdown />
//               </div>

//               <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl h-12" onClick={handleMobileLogout}>
//                 <LogOut className="w-5 h-5 mr-3" />
//                 Log Out
//               </Button>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// // ------------------------------------
// // 3. Styled Components
// // ------------------------------------

// const LogoLoader = styled.div`
//   .loader {
//     color: hsl(var(--foreground)); 
//     font-family: inherit; 
//     font-weight: 700;
//     font-size: 1.25rem;
//     box-sizing: content-box;
//     height: 1.75rem;
//     padding: 0;
//     display: flex;
//     align-items: center;
//   }

//   .prefix {
//     margin: 0;
//     white-space: nowrap;
//     color: white; 
//   }

//   .words {
//     overflow: hidden;
//     height: 100%;
//     position: relative;
//     padding-left: 2px;
//     mask-image: linear-gradient(
//       transparent 0%,
//       black 20%,
//       black 80%,
//       transparent 100%
//     );
//   }

//   .word {
//     display: flex;
//     align-items: center;
//     height: 100%;
//     color: #956afa; 
//     animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2);
//     white-space: nowrap;
//     font-weight: 800; 
//   }

//   @keyframes spin_logo {
//     0% { transform: translateY(0); }
//     15% { transform: translateY(-100%); }
//     25% { transform: translateY(-100%); }
//     40% { transform: translateY(-200%); }
//     50% { transform: translateY(-200%); }
//     65% { transform: translateY(-300%); }
//     75% { transform: translateY(-300%); }
//     90% { transform: translateY(-400%); }
//     100% { transform: translateY(-400%); }
//   }
// `;

// const UniverseButtonWrapper = styled.div`
//   .uiverse {
//     --duration: 7s;
//     --easing: linear;
//     --c-color-1: rgba(91, 66, 243, 0.7);
//     --c-color-2: #af40ff;
//     --c-color-3: #00ddeb;
//     --c-color-4: rgba(46, 142, 255, 0.7);
    
//     --c-shadow: rgba(175, 64, 255, 0.4);
//     --c-shadow-inset-top: rgba(91, 66, 243, 0.9);
//     --c-shadow-inset-bottom: rgba(0, 221, 235, 0.8);
    
//     --c-radial-inner: #202025;
//     --c-radial-outer: #09090b;
//     --c-color: #fff;
    
//     -webkit-tap-highlight-color: transparent;
//     -webkit-appearance: none;
//     outline: none;
//     position: relative;
//     cursor: pointer;
//     border: none;
//     display: flex; /* Changed from table to flex */
//     align-items: center;
//     justify-content: center;
//     border-radius: 9999px; /* Pill shape */
//     padding: 0;
//     margin: 0;
//     text-align: center;
//     font-weight: 600;
//     font-size: 14px;
//     letter-spacing: 0.02em;
//     line-height: 1.5;
//     color: var(--c-color);
//     background: radial-gradient(
//       circle,
//       var(--c-radial-inner),
//       var(--c-radial-outer) 80%
//     );
//     box-shadow: 0 0 14px var(--c-shadow);
//     transition: all 0.3s ease;
//   }

//   .uiverse:before {
//     content: "";
//     pointer-events: none;
//     position: absolute;
//     z-index: 3;
//     left: 0;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     border-radius: 9999px;
//     box-shadow:
//       inset 0 3px 12px var(--c-shadow-inset-top),
//       inset 0 -3px 4px var(--c-shadow-inset-bottom);
//   }

//   .uiverse .wrapper {
//     -webkit-mask-image: -webkit-radial-gradient(white, black);
//     overflow: hidden;
//     border-radius: 9999px;
//     min-width: 120px;
//     padding: 10px 0; /* Increased padding slightly */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .uiverse .wrapper span {
//     display: inline-block;
//     position: relative;
//     z-index: 1;
//   }

//   .uiverse:hover {
//     --duration: 1400ms;
//     box-shadow: 0 0 20px var(--c-shadow); /* Enhanced hover glow */
//     transform: translateY(-1px);
//   }

//   .uiverse .wrapper .circle {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     filter: blur(var(--blur, 8px));
//     background: var(--background, transparent);
//     transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
//     animation: var(--animation, none) var(--duration) var(--easing) infinite;
//   }

//   .uiverse .wrapper .circle.circle-1,
//   .uiverse .wrapper .circle.circle-9,
//   .uiverse .wrapper .circle.circle-10 {
//     --background: var(--c-color-4);
//   }

//   .uiverse .wrapper .circle.circle-3,
//   .uiverse .wrapper .circle.circle-4 {
//     --background: var(--c-color-2);
//     --blur: 14px;
//   }

//   .uiverse .wrapper .circle.circle-5,
//   .uiverse .wrapper .circle.circle-6 {
//     --background: var(--c-color-3);
//     --blur: 16px;
//   }

//   .uiverse .wrapper .circle.circle-2,
//   .uiverse .wrapper .circle.circle-7,
//   .uiverse .wrapper .circle.circle-8,
//   .uiverse .wrapper .circle.circle-11,
//   .uiverse .wrapper .circle.circle-12 {
//     --background: var(--c-color-1);
//     --blur: 12px;
//   }

//   .uiverse .wrapper .circle.circle-1 {
//     --x: 0;
//     --y: -40px;
//     --animation: circle-1;
//   }

//   .uiverse .wrapper .circle.circle-2 {
//     --x: 92px;
//     --y: 8px;
//     --animation: circle-2;
//   }

//   .uiverse .wrapper .circle.circle-3 {
//     --x: -12px;
//     --y: -12px;
//     --animation: circle-3;
//   }

//   .uiverse .wrapper .circle.circle-4 {
//     --x: 80px;
//     --y: -12px;
//     --animation: circle-4;
//   }

//   .uiverse .wrapper .circle.circle-5 {
//     --x: 12px;
//     --y: -4px;
//     --animation: circle-5;
//   }

//   .uiverse .wrapper .circle.circle-6 {
//     --x: 56px;
//     --y: 16px;
//     --animation: circle-6;
//   }

//   .uiverse .wrapper .circle.circle-7 {
//     --x: 8px;
//     --y: 28px;
//     --animation: circle-7;
//   }

//   .uiverse .wrapper .circle.circle-8 {
//     --x: 28px;
//     --y: -4px;
//     --animation: circle-8;
//   }

//   .uiverse .wrapper .circle.circle-9 {
//     --x: 20px;
//     --y: -12px;
//     --animation: circle-9;
//   }

//   .uiverse .wrapper .circle.circle-10 {
//     --x: 64px;
//     --y: 16px;
//     --animation: circle-10;
//   }

//   .uiverse .wrapper .circle.circle-11 {
//     --x: 4px;
//     --y: 4px;
//     --animation: circle-11;
//   }

//   .uiverse .wrapper .circle.circle-12 {
//     --blur: 14px;
//     --x: 52px;
//     --y: 4px;
//     --animation: circle-12;
//   }

//   @keyframes circle-1 {
//     33% { transform: translate(0px, 16px) translateZ(0); }
//     66% { transform: translate(12px, 64px) translateZ(0); }
//   }

//   @keyframes circle-2 {
//     33% { transform: translate(80px, -10px) translateZ(0); }
//     66% { transform: translate(72px, -48px) translateZ(0); }
//   }

//   @keyframes circle-3 {
//     33% { transform: translate(20px, 12px) translateZ(0); }
//     66% { transform: translate(12px, 4px) translateZ(0); }
//   }

//   @keyframes circle-4 {
//     33% { transform: translate(76px, -12px) translateZ(0); }
//     66% { transform: translate(112px, -8px) translateZ(0); }
//   }

//   @keyframes circle-5 {
//     33% { transform: translate(84px, 28px) translateZ(0); }
//     66% { transform: translate(40px, -32px) translateZ(0); }
//   }

//   @keyframes circle-6 {
//     33% { transform: translate(28px, -16px) translateZ(0); }
//     66% { transform: translate(76px, -56px) translateZ(0); }
//   }

//   @keyframes circle-7 {
//     33% { transform: translate(8px, 28px) translateZ(0); }
//     66% { transform: translate(20px, -60px) translateZ(0); }
//   }

//   @keyframes circle-8 {
//     33% { transform: translate(32px, -4px) translateZ(0); }
//     66% { transform: translate(56px, -20px) translateZ(0); }
//   }

//   @keyframes circle-9 {
//     33% { transform: translate(20px, -12px) translateZ(0); }
//     66% { transform: translate(80px, -8px) translateZ(0); }
//   }

//   @keyframes circle-10 {
//     33% { transform: translate(68px, 20px) translateZ(0); }
//     66% { transform: translate(100px, 28px) translateZ(0); }
//   }

//   @keyframes circle-11 {
//     33% { transform: translate(4px, 4px) translateZ(0); }
//     66% { transform: translate(68px, 20px) translateZ(0); }
//   }

//   @keyframes circle-12 {
//     33% { transform: translate(56px, 0px) translateZ(0); }
//     66% { transform: translate(60px, -32px) translateZ(0); }
//   }
// `;

// export default Navbar;






import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { RippleButton } from "@/components/ui/ripple-button"; 
import { 
  Menu,
  X,
  LogOut,
  Home,
  BookOpen,
  Bell
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown"; 
// REMOVED: import GlareHover from "./GlareHover"; 
import styled from "styled-components";
import { cn } from "@/lib/utils";

// ------------------------------------
// 1. Data & Types
// ------------------------------------
interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/home", icon: Home }, 
  { name: "PYQs", href: "/pyqs", icon: BookOpen },
  { name: "Updates", href: "/updates", icon: Bell },
];

const handleMobileLogout = (): void => {
  alert("Logging out... (Placeholder)");
  window.location.href = "/";
};

// ------------------------------------
// 2. Main Navbar Component
// ------------------------------------
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  if (isLoginPage) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6">
      <nav
        className={cn(
          "mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border border-transparent will-change-transform",
          isScrolled 
            ? "bg-black/60 backdrop-blur-md border-white/10 max-w-5xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]" 
            : "max-w-7xl bg-transparent"
        )}
      >
        <div className={cn(
            "relative flex items-center justify-between px-6",
            isScrolled ? "h-16" : "h-20"
        )}>
          
          {/* LEFT: Logo Section (UPDATED: Removed GlareHover wrapper) */}
          <div className="flex-shrink-0 z-20">
            <Link to="/home" className="group block">
              <div className="px-2 py-1">
                <div className="flex items-center gap-2">
                  <LogoLoader>
                    <div className="loader">
                      <p className="prefix hidden sm:block">ACADVERSE-</p>
                      <p className="prefix sm:hidden">PA-</p> 
                      <div className="words">
                        <span className="word">PYQ'S</span>
                        <span className="word">UPDATES</span>
                        <span className="word">NOTES</span>
                        <span className="word">PYQ'S</span>
                        <span className="word">UPDATES</span>
                        <span className="word">NOTES</span>
                      </div>
                    </div>
                  </LogoLoader>
                </div>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation (Ripple Buttons) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-3"> 
            {navItems.map((item) => {
              const IconComponent = item.icon;

              return (
                <Link key={item.name} to={item.href}>
                  <RippleButton
                    rippleColor="#ADD8E6"
                    className={cn(
                      "group relative flex items-center justify-center min-w-[90px] h-10 rounded-full border border-transparent bg-transparent overflow-hidden",
                      "text-gray-400 font-medium text-sm tracking-wide transition-all duration-300",
                      "hover:bg-white/5",
                      "hover:text-white",
                      "hover:shadow-[0_0_20px_rgba(173,216,230,0.4)]"
                    )}
                  >
                     <span className="relative z-10 block transition-all duration-300 ease-in-out group-hover:-translate-y-8 group-hover:opacity-0">
                       {item.name}
                     </span>
                     <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                       <IconComponent className="w-4 h-4 text-blue-200 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
                     </div>
                  </RippleButton>
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Dashboard, Profile & Mobile Toggle */}
          <div className="flex items-center gap-4 z-20">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/dashboard">
                <UniverseButtonWrapper>
                  <button className="uiverse">
                    <div className="wrapper">
                      <span>Dashboard</span>
                      <div className="circle circle-12" />
                      <div className="circle circle-11" />
                      <div className="circle circle-10" />
                      <div className="circle circle-9" />
                      <div className="circle circle-8" />
                      <div className="circle circle-7" />
                      <div className="circle circle-6" />
                      <div className="circle circle-5" />
                      <div className="circle circle-4" />
                      <div className="circle circle-3" />
                      <div className="circle circle-2" />
                      <div className="circle circle-1" />
                    </div>
                  </button>
                </UniverseButtonWrapper>
              </Link>
              <ProfileDropdown />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="lg:hidden px-6 pb-6 pt-2 border-t border-white/10 animate-in slide-in-from-top-2 fade-in-20">
             <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start pl-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl h-12",
                        isActive && "bg-blue-500/15 text-blue-300"
                      )}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              
              <div className="h-px bg-white/10 my-2" />
              
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10 text-blue-300 h-12 rounded-xl">
                  Go to Dashboard
                </Button>
              </Link>
              
              <div className="md:hidden flex justify-between items-center mt-2 p-3 bg-white/5 rounded-xl">
                  <span className="text-sm text-gray-400 font-medium">Account</span>
                  <ProfileDropdown />
              </div>

              <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl h-12" onClick={handleMobileLogout}>
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// ------------------------------------
// 3. Styled Components (UPDATED FOR TEXT SHIMMER)
// ------------------------------------

const LogoLoader = styled.div`
  .loader {
    color: hsl(var(--foreground)); 
    font-family: inherit; 
    font-weight: 700;
    font-size: 1.25rem;
    box-sizing: content-box;
    height: 1.75rem;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .prefix {
    margin: 0;
    white-space: nowrap;
    
    /* SHIMMER EFFECT FOR WHITE TEXT */
    background: linear-gradient(110deg, #a1a1aa 45%, #ffffff 50%, #a1a1aa 55%);
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3.5s linear infinite;
  }

  .words {
    overflow: hidden;
    height: 100%;
    position: relative;
    padding-left: 2px;
    mask-image: linear-gradient(
      transparent 0%,
      black 20%,
      black 80%,
      transparent 100%
    );
  }

  .word {
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    font-weight: 800; 

    /* SHIMMER EFFECT FOR COLORED TEXT */
    /* Base purple (#956afa) with a white glare passing through */
    background: linear-gradient(110deg, #956afa 45%, #ffffff 50%, #956afa 55%);
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* COMBINED ANIMATIONS: Spinning + Shimmering */
    animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2), shimmer 3.5s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes spin_logo {
    0% { transform: translateY(0); }
    15% { transform: translateY(-100%); }
    25% { transform: translateY(-100%); }
    40% { transform: translateY(-200%); }
    50% { transform: translateY(-200%); }
    65% { transform: translateY(-300%); }
    75% { transform: translateY(-300%); }
    90% { transform: translateY(-400%); }
    100% { transform: translateY(-400%); }
  }
`;

const UniverseButtonWrapper = styled.div`
  /* ... (Keeping existing Universe Button styles unchanged) ... */
  .uiverse {
    --duration: 7s;
    --easing: linear;
    --c-color-1: rgba(91, 66, 243, 0.7);
    --c-color-2: #af40ff;
    --c-color-3: #00ddeb;
    --c-color-4: rgba(46, 142, 255, 0.7);
    
    --c-shadow: rgba(175, 64, 255, 0.4);
    --c-shadow-inset-top: rgba(91, 66, 243, 0.9);
    --c-shadow-inset-bottom: rgba(0, 221, 235, 0.8);
    
    --c-radial-inner: #202025;
    --c-radial-outer: #09090b;
    --c-color: #fff;
    
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    outline: none;
    position: relative;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.02em;
    line-height: 1.5;
    color: var(--c-color);
    background: radial-gradient(
      circle,
      var(--c-radial-inner),
      var(--c-radial-outer) 80%
    );
    box-shadow: 0 0 14px var(--c-shadow);
    transition: all 0.3s ease;
  }

  .uiverse:before {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 9999px;
    box-shadow:
      inset 0 3px 12px var(--c-shadow-inset-top),
      inset 0 -3px 4px var(--c-shadow-inset-bottom);
  }

  .uiverse .wrapper {
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    overflow: hidden;
    border-radius: 9999px;
    min-width: 120px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uiverse .wrapper span {
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .uiverse:hover {
    --duration: 1400ms;
    box-shadow: 0 0 20px var(--c-shadow);
    transform: translateY(-1px);
  }

  .uiverse .wrapper .circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    filter: blur(var(--blur, 8px));
    background: var(--background, transparent);
    transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
    animation: var(--animation, none) var(--duration) var(--easing) infinite;
  }

  .uiverse .wrapper .circle.circle-1,
  .uiverse .wrapper .circle.circle-9,
  .uiverse .wrapper .circle.circle-10 { --background: var(--c-color-4); }
  .uiverse .wrapper .circle.circle-3,
  .uiverse .wrapper .circle.circle-4 { --background: var(--c-color-2); --blur: 14px; }
  .uiverse .wrapper .circle.circle-5,
  .uiverse .wrapper .circle.circle-6 { --background: var(--c-color-3); --blur: 16px; }
  .uiverse .wrapper .circle.circle-2,
  .uiverse .wrapper .circle.circle-7,
  .uiverse .wrapper .circle.circle-8,
  .uiverse .wrapper .circle.circle-11,
  .uiverse .wrapper .circle.circle-12 { --background: var(--c-color-1); --blur: 12px; }
  
  .uiverse .wrapper .circle.circle-1 { --x: 0; --y: -40px; --animation: circle-1; }
  .uiverse .wrapper .circle.circle-2 { --x: 92px; --y: 8px; --animation: circle-2; }
  .uiverse .wrapper .circle.circle-3 { --x: -12px; --y: -12px; --animation: circle-3; }
  .uiverse .wrapper .circle.circle-4 { --x: 80px; --y: -12px; --animation: circle-4; }
  .uiverse .wrapper .circle.circle-5 { --x: 12px; --y: -4px; --animation: circle-5; }
  .uiverse .wrapper .circle.circle-6 { --x: 56px; --y: 16px; --animation: circle-6; }
  .uiverse .wrapper .circle.circle-7 { --x: 8px; --y: 28px; --animation: circle-7; }
  .uiverse .wrapper .circle.circle-8 { --x: 28px; --y: -4px; --animation: circle-8; }
  .uiverse .wrapper .circle.circle-9 { --x: 20px; --y: -12px; --animation: circle-9; }
  .uiverse .wrapper .circle.circle-10 { --x: 64px; --y: 16px; --animation: circle-10; }
  .uiverse .wrapper .circle.circle-11 { --x: 4px; --y: 4px; --animation: circle-11; }
  .uiverse .wrapper .circle.circle-12 { --blur: 14px; --x: 52px; --y: 4px; --animation: circle-12; }

  @keyframes circle-1 { 33% { transform: translate(0px, 16px) translateZ(0); } 66% { transform: translate(12px, 64px) translateZ(0); } }
  @keyframes circle-2 { 33% { transform: translate(80px, -10px) translateZ(0); } 66% { transform: translate(72px, -48px) translateZ(0); } }
  @keyframes circle-3 { 33% { transform: translate(20px, 12px) translateZ(0); } 66% { transform: translate(12px, 4px) translateZ(0); } }
  @keyframes circle-4 { 33% { transform: translate(76px, -12px) translateZ(0); } 66% { transform: translate(112px, -8px) translateZ(0); } }
  @keyframes circle-5 { 33% { transform: translate(84px, 28px) translateZ(0); } 66% { transform: translate(40px, -32px) translateZ(0); } }
  @keyframes circle-6 { 33% { transform: translate(28px, -16px) translateZ(0); } 66% { transform: translate(76px, -56px) translateZ(0); } }
  @keyframes circle-7 { 33% { transform: translate(8px, 28px) translateZ(0); } 66% { transform: translate(20px, -60px) translateZ(0); } }
  @keyframes circle-8 { 33% { transform: translate(32px, -4px) translateZ(0); } 66% { transform: translate(56px, -20px) translateZ(0); } }
  @keyframes circle-9 { 33% { transform: translate(20px, -12px) translateZ(0); } 66% { transform: translate(80px, -8px) translateZ(0); } }
  @keyframes circle-10 { 33% { transform: translate(68px, 20px) translateZ(0); } 66% { transform: translate(100px, 28px) translateZ(0); } }
  @keyframes circle-11 { 33% { transform: translate(4px, 4px) translateZ(0); } 66% { transform: translate(68px, 20px) translateZ(0); } }
  @keyframes circle-12 { 33% { transform: translate(56px, 0px) translateZ(0); } 66% { transform: translate(60px, -32px) translateZ(0); } }
`;

export default Navbar;