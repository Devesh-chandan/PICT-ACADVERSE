

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// // import CustomNavButton from "@/components/CustomNavButton"; // <--- Removed, defined inline below
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components"; // <--- Import styled-components

// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
// }

// const navItems: NavItem[] = [
//   { name: "Home", href: "/home", icon: Home }, 
//   { name: "PYQs", href: "/pyqs", icon: FileText },
//   { name: "Updates", href: "/updates", icon: Bell },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={3000}
//               disableHover={true}
//               transitionDuration={1000}
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <GraduationCap className="w-6 h-6 text-primary-foreground" />
//                 </div>
//                 <span className="font-bold text-xl hidden sm:block">
//                   <span className="text-foreground"> PICT-ACADVERSE</span>
//                 </span>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation - Using Styled Components */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper>
//                     {/* Added 'active' class based on current route */}
//                     <button className={`button ${isActive ? 'active' : ''}`}>
//                       <item.icon className="w-4 h-4" />
//                       {item.name}
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // Styled Component Definition
// // Color used: rgb(139, 92, 246) -> Matches Tailwind Violet/Purple-500
// const StyledWrapper = styled.div`
//   .button {
//     cursor: pointer;
//     position: relative;
//     padding: 8px 20px; /* Adjusted padding for nav bar */
//     font-size: 16px;   /* Adjusted font size for nav bar */
//     color: rgb(139, 92, 246); /* Purple Text Default */
//     border: 2px solid rgb(139, 92, 246); /* Purple Border */
//     border-radius: 34px;
//     background-color: transparent;
//     font-weight: 600;
//     transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     gap: 8px; /* Gap between Icon and Text */
//   }

//   .button::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     margin: auto;
//     width: 50px;
//     height: 50px;
//     border-radius: inherit;
//     scale: 0;
//     z-index: -1;
//     background-color: rgb(139, 92, 246); /* Purple Fill */
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
//   }

//   /* Hover State */
//   .button:hover::before {
//     scale: 3;
//   }

//   .button:hover {
//     color: #ffffff; /* White text on hover for contrast against purple */
//     scale: 1.05;
//     box-shadow: 0 0px 20px rgba(139, 92, 246, 0.4);
//     border-color: rgb(139, 92, 246);
//   }

//   /* Active State (For Current Page) */
//   .button.active {
//     color: #ffffff;
//     background-color: rgb(139, 92, 246);
//     box-shadow: 0 0px 20px rgba(139, 92, 246, 0.4);
//   }

//   .button:active {
//     scale: 0.95;
//   }
// `;

// export default Navbar;



// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";

// // 1. Define Color Interfaces
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     main: string;
//     dark: string;
//     glow: string;
//   };
// }

// // 2. Configure Colors for each route
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       main: "#3b82f6", // Blue
//       dark: "#2563eb",
//       glow: "rgba(59, 130, 246, 0.6)" 
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       main: "#22c55e", // Green
//       dark: "#16a34a",
//       glow: "rgba(34, 197, 94, 0.6)"
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       main: "#ef4444", // Red
//       dark: "#dc2626",
//       glow: "rgba(239, 68, 68, 0.6)"
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={3000}
//               disableHover={true}
//               transitionDuration={1000}
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <GraduationCap className="w-6 h-6 text-primary-foreground" />
//                 </div>
//                 <span className="font-bold text-xl hidden sm:block">
//                   <span className="text-foreground"> PICT-ACADVERSE</span>
//                 </span>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation - New Button Style */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $mainColor={item.colors.main}
//                     $darkColor={item.colors.dark}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // Styled Component with Dynamic Props
// const StyledWrapper = styled.div<{ $mainColor: string; $darkColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 40px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     border: 1px solid ${props => props.$isActive ? props.$darkColor : props.$darkColor};
//     background-color: ${props => props.$mainColor};
//     border-radius: 8px; /* Optional: Slight rounding looks better in navbars */
//     overflow: hidden; /* Ensures the icon animation stays contained */
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.3s;
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff;
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
//     background-color: ${props => props.$darkColor}; /* Icon bg is slightly darker */
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   /* HOVER EFFECTS */
//   .button:hover {
//     background: ${props => props.$mainColor};
//     box-shadow: 0 0 15px ${props => props.$glowColor}; /* 4. Glow Effect */
//   }

//   .button:hover .button__text {
//     color: transparent;
//   }

//   .button:hover .button__icon {
//     width: 148px; /* Expands to fill button */
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$darkColor};
//   }

//   .button:active {
//     border: 1px solid ${props => props.$darkColor};
//   }
// `;

// export default Navbar;






// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";

// // 1. Updated Color Interface to support Glass/Solid differences
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     glass: string; // The see-through background
//     solid: string; // The icon background and border
//     glow: string;  // The glowing shadow
//   };
// }

// // 2. Configure Colors with RGBA for Glass Effect
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       glass: "rgba(59, 130, 246, 0.15)", // Blue Glass
//       solid: "#3b82f6",                  // Blue Solid
//       glow: "rgba(59, 130, 246, 0.8)"    // Strong Blue Glow
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       glass: "rgba(34, 197, 94, 0.15)",  // Green Glass
//       solid: "#22c55e",                  // Green Solid
//       glow: "rgba(34, 197, 94, 0.8)"     // Strong Green Glow
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       glass: "rgba(239, 68, 68, 0.15)",  // Red Glass
//       solid: "#ef4444",                  // Red Solid
//       glow: "rgba(239, 68, 68, 0.8)"     // Strong Red Glow
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={3000}
//               disableHover={true}
//               transitionDuration={1000}
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <GraduationCap className="w-6 h-6 text-primary-foreground" />
//                 </div>
//                 <span className="font-bold text-xl hidden sm:block">
//                   <span className="text-foreground"> PICT-ACADVERSE</span>
//                 </span>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation - Glass Buttons */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $glassColor={item.colors.glass}
//                     $solidColor={item.colors.solid}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // 3. Styled Component: Glass + Strong Glow
// const StyledWrapper = styled.div<{ $glassColor: string; $solidColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 40px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
    
//     /* GLASS EFFECT */
//     background: ${props => props.$glassColor}; 
//     backdrop-filter: blur(10px);               
//     -webkit-backdrop-filter: blur(10px);
    
//     /* Border uses the solid color but acts as a container frame */
//     border: 1px solid ${props => props.$solidColor}; 
    
//     border-radius: 8px;
//     overflow: hidden;
    
//     /* Default slight ambient glow if active, else none */
//     box-shadow: ${props => props.$isActive ? `0 0 15px ${props.$glassColor}` : 'none'};
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff; /* Keep text white for readability on glass */
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
    
//     /* The Icon background stays solid (or highly opaque) to mask the text when sliding */
//     background-color: ${props => props.$solidColor}; 
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   /* HOVER EFFECTS */
//   .button:hover {
//     background: ${props => props.$glassColor}; /* Keeps glass bg */
    
//     /* Stronger Glow on Hover */
//     box-shadow: 0 0 30px ${props => props.$glowColor}, inset 0 0 10px ${props => props.$glassColor}; 
    
//     border-color: ${props => props.$solidColor};
//   }

//   .button:hover .button__text {
//     color: transparent; /* Text vanishes */
//   }

//   .button:hover .button__icon {
//     width: 148px; /* Slides over */
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$solidColor};
//     filter: brightness(0.9);
//   }

//   .button:active {
//     border: 1px solid ${props => props.$solidColor};
//     transform: scale(0.98);
//   }
// `;

// export default Navbar;






// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";
// // Make sure this points to where you saved the file above
// import TextType from "@/components/logo-text-type"; 

// // 1. Updated Color Interface
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     glass: string; 
//     solid: string; 
//     glow: string;  
//   };
// }

// // 2. Configure Colors
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       glass: "rgba(59, 130, 246, 0.15)", // Blue Glass
//       solid: "#3b82f6",                  // Blue Solid
//       glow: "rgba(59, 130, 246, 0.8)"    // Strong Blue Glow
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       glass: "rgba(34, 197, 94, 0.15)",  // Green Glass
//       solid: "#22c55e",                  // Green Solid
//       glow: "rgba(34, 197, 94, 0.8)"     // Strong Green Glow
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       glass: "rgba(239, 68, 68, 0.15)",  // Red Glass
//       solid: "#ef4444",                  // Red Solid
//       glow: "rgba(239, 68, 68, 0.8)"     // Strong Red Glow
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo with Animation */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={3000}
//               disableHover={true}
//               transitionDuration={1000}
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <GraduationCap className="w-6 h-6 text-primary-foreground" />
//                 </div>
                
//                 {/* FIX APPLIED HERE:
//                    Added 'w-[220px]' to reserve width so nav buttons don't jump.
//                    Added 'whitespace-nowrap' to ensure text stays on one line.
//                 */}
//                 <span className="font-bold text-xl hidden sm:block text-foreground w-[220px] whitespace-nowrap">
//                    <TextType 
//                      text=" PICT-ACADVERSE"
//                      as="span"
//                      typingSpeed={100}
//                      cursorCharacter="|"
//                      loop={false} 
//                      initialDelay={200}
//                    />
//                 </span>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $glassColor={item.colors.glass}
//                     $solidColor={item.colors.solid}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // 3. Styled Component: Glass + Strong Glow
// const StyledWrapper = styled.div<{ $glassColor: string; $solidColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 40px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
    
//     /* GLASS EFFECT */
//     background: ${props => props.$glassColor}; 
//     backdrop-filter: blur(10px);               
//     -webkit-backdrop-filter: blur(10px);
    
//     /* Border uses the solid color but acts as a container frame */
//     border: 1px solid ${props => props.$solidColor}; 
    
//     border-radius: 8px;
//     overflow: hidden;
    
//     /* Default slight ambient glow if active, else none */
//     box-shadow: ${props => props.$isActive ? `0 0 15px ${props.$glassColor}` : 'none'};
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff; /* Keep text white for readability on glass */
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
    
//     /* The Icon background stays solid (or highly opaque) to mask the text when sliding */
//     background-color: ${props => props.$solidColor}; 
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   /* HOVER EFFECTS */
//   .button:hover {
//     background: ${props => props.$glassColor}; /* Keeps glass bg */
    
//     /* Stronger Glow on Hover */
//     box-shadow: 0 0 30px ${props => props.$glowColor}, inset 0 0 10px ${props => props.$glassColor}; 
    
//     border-color: ${props => props.$solidColor};
//   }

//   .button:hover .button__text {
//     color: transparent; /* Text vanishes */
//   }

//   .button:hover .button__icon {
//     width: 148px; /* Slides over */
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$solidColor};
//     filter: brightness(0.9);
//   }

//   .button:active {
//     border: 1px solid ${props => props.$solidColor};
//     transform: scale(0.98);
//   }
// `;

// export default Navbar;




// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";
// // Make sure this points to where you saved the file above
// import TextType from "@/components/logo-text-type"; 

// // 1. Updated Color Interface
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     glass: string; 
//     solid: string; 
//     glow: string;  
//   };
// }

// // 2. Configure Colors
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       glass: "rgba(59, 130, 246, 0.15)", // Blue Glass
//       solid: "#3b82f6",                  // Blue Solid
//       glow: "rgba(59, 130, 246, 0.8)"    // Strong Blue Glow
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       glass: "rgba(34, 197, 94, 0.15)",  // Green Glass
//       solid: "#22c55e",                  // Green Solid
//       glow: "rgba(34, 197, 94, 0.8)"     // Strong Green Glow
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       glass: "rgba(239, 68, 68, 0.15)",  // Red Glass
//       solid: "#ef4444",                  // Red Solid
//       glow: "rgba(239, 68, 68, 0.8)"     // Strong Red Glow
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo with Animation */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={4000} // SYNC POINT: Glare triggers every 4 seconds
//               disableHover={true}
//               transitionDuration={1500} // Slow sweep to match text visibility
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
                
            
//                 <span className="font-bold text-xl hidden sm:block text-foreground w-[220px] whitespace-nowrap">
//                    <TextType 
//                      text=" PICT-ACADVERSE"
//                      as="span"
//                      typingSpeed={100}        // Faster typing
//                      deletingSpeed={100}      // Fast deleting
//                      pauseDuration={1000}    // Calculated pause
//                      cursorCharacter=""
//                      loop={true} 
//                      hideCursorWhileTyping={false}
//                      initialDelay={200}
//                    />
//                 </span>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $glassColor={item.colors.glass}
//                     $solidColor={item.colors.solid}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // 3. Styled Component: Glass + Strong Glow
// const StyledWrapper = styled.div<{ $glassColor: string; $solidColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 40px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
    
//     /* GLASS EFFECT */
//     background: ${props => props.$glassColor}; 
//     backdrop-filter: blur(10px);               
//     -webkit-backdrop-filter: blur(10px);
    
//     /* Border uses the solid color but acts as a container frame */
//     border: 1px solid ${props => props.$solidColor}; 
    
//     border-radius: 8px;
//     overflow: hidden;
    
//     /* Default slight ambient glow if active, else none */
//     box-shadow: ${props => props.$isActive ? `0 0 15px ${props.$glassColor}` : 'none'};
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff; /* Keep text white for readability on glass */
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
    
//     /* The Icon background stays solid (or highly opaque) to mask the text when sliding */
//     background-color: ${props => props.$solidColor}; 
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   /* HOVER EFFECTS */
//   .button:hover {
//     background: ${props => props.$glassColor}; /* Keeps glass bg */
    
//     /* Stronger Glow on Hover */
//     box-shadow: 0 0 30px ${props => props.$glowColor}, inset 0 0 10px ${props => props.$glassColor}; 
    
//     border-color: ${props => props.$solidColor};
//   }

//   .button:hover .button__text {
//     color: transparent; /* Text vanishes */
//   }

//   .button:hover .button__icon {
//     width: 148px; /* Slides over */
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$solidColor};
//     filter: brightness(0.9);
//   }

//   .button:active {
//     border: 1px solid ${props => props.$solidColor};
//     transform: scale(0.98);
//   }
// `;

// export default Navbar;




// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";

// // 1. Updated Color Interface
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     glass: string; 
//     solid: string; 
//     glow: string;  
//   };
// }

// // 2. Configure Colors
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       glass: "rgba(59, 130, 246, 0.15)", // Blue Glass
//       solid: "#3b82f6",                  // Blue Solid
//       glow: "rgba(59, 130, 246, 0.8)"    // Strong Blue Glow
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       glass: "rgba(34, 197, 94, 0.15)",  // Green Glass
//       solid: "#22c55e",                  // Green Solid
//       glow: "rgba(34, 197, 94, 0.8)"     // Strong Green Glow
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       glass: "rgba(239, 68, 68, 0.15)",  // Red Glass
//       solid: "#ef4444",                  // Red Solid
//       glow: "rgba(239, 68, 68, 0.8)"     // Strong Red Glow
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo with Rolling Animation */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={4000} 
//               disableHover={true}
//               transitionDuration={1500} 
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
              
                
//                 {/* Rolling Text Component */}
//                 <LogoLoader>
//                   <div className="loader">
//                     <p className="prefix">PICT-ACADVERSE-</p>
//                     <div className="words">
                      
//                       <span className="word">PYQ'S</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>
//                       <span className="word">PYQ'S</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>
                      
//                     </div>
//                   </div>
//                 </LogoLoader>

//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $glassColor={item.colors.glass}
//                     $solidColor={item.colors.solid}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <Button variant="gradient" size="sm">
//                 Dashboard
//               </Button>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="gradient" className="w-full mt-2">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // ------------------------------------
// // 1. Logo Rolling Text Styled Component
// // ------------------------------------
// const LogoLoader = styled.div`
//   .loader {
//     /* Using standard text color but slightly muted for prefix */
//     color: hsl(var(--foreground)); 
//     font-family: inherit; 
//     font-weight: 700;
//     font-size: 1.25rem; /* Matches text-xl */
//     box-sizing: content-box;
//     height: 1.75rem; /* Fixed height for the text container */
//     padding: 0;
//     display: flex;
//     align-items: center;
//   }

//   .prefix {
//     margin: 0;
//     white-space: nowrap;
//   }

//   .words {
//     overflow: hidden;
//     height: 100%;
//     position: relative;
//     /* This creates the gradient fade effect on top/bottom of the rolling word */
//     mask-image: linear-gradient(
//       transparent 5%,
//       black 20%,
//       black 80%,
//       transparent 95%
//     );
//   }

//   .word {
//     display: flex;
//     align-items: center;
//     height: 100%;
//     padding-left: 2px;
//     color: #956afa; /* The purple accent color */
//     animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2);
//     white-space: nowrap;
//     font-weight: 800;
//   }

//   @keyframes spin_logo {
//     0% {
//         transform: translateY(0);
//     }
//     15% {
//         transform: translateY(-100%);
//     }
//     25% {
//         transform: translateY(-100%);
//     }
//     40% {
//         transform: translateY(-200%);
//     }
//     50% {
//         transform: translateY(-200%);
//     }
//     65% {
//         transform: translateY(-300%);
//     }
//     75% {
//         transform: translateY(-300%);
//     }
//     90% {
//         transform: translateY(-400%);
//     }
//     100% {
//         transform: translateY(-400%);
//     }
//   }
// `;

// // ------------------------------------
// // 2. Navigation Button Styled Component
// // ------------------------------------
// const StyledWrapper = styled.div<{ $glassColor: string; $solidColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 40px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
    
//     /* GLASS EFFECT */
//     background: ${props => props.$glassColor}; 
//     backdrop-filter: blur(10px);               
//     -webkit-backdrop-filter: blur(10px);
    
//     /* Border uses the solid color but acts as a container frame */
//     border: 1px solid ${props => props.$solidColor}; 
    
//     border-radius: 8px;
//     overflow: hidden;
    
//     /* Default slight ambient glow if active, else none */
//     box-shadow: ${props => props.$isActive ? `0 0 15px ${props.$glassColor}` : 'none'};
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff; /* Keep text white for readability on glass */
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
    
//     /* The Icon background stays solid (or highly opaque) to mask the text when sliding */
//     background-color: ${props => props.$solidColor}; 
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   /* HOVER EFFECTS */
//   .button:hover {
//     background: ${props => props.$glassColor}; /* Keeps glass bg */
    
//     /* Stronger Glow on Hover */
//     box-shadow: 0 0 30px ${props => props.$glowColor}, inset 0 0 10px ${props => props.$glassColor}; 
    
//     border-color: ${props => props.$solidColor};
//   }

//   .button:hover .button__text {
//     color: transparent; /* Text vanishes */
//   }

//   .button:hover .button__icon {
//     width: 148px; /* Slides over */
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$solidColor};
//     filter: brightness(0.9);
//   }

//   .button:active {
//     border: 1px solid ${props => props.$solidColor};
//     transform: scale(0.98);
//   }
// `;

// export default Navbar;




// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   FileText, 
//   Bell,
//   Menu,
//   X,
//   GraduationCap,
//   LogOut,
//   LucideIcon,
//   Home 
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";

// // 1. Updated Color Interface
// interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   colors: {
//     glass: string; 
//     solid: string; 
//     glow: string;  
//   };
// }

// // 2. Configure Colors
// const navItems: NavItem[] = [
//   { 
//     name: "Home", 
//     href: "/home", 
//     icon: Home,
//     colors: {
//       glass: "rgba(59, 130, 246, 0.15)", // Blue Glass
//       solid: "#3b82f6",                  // Blue Solid
//       glow: "rgba(59, 130, 246, 0.8)"    // Strong Blue Glow
//     }
//   }, 
//   { 
//     name: "PYQs", 
//     href: "/pyqs", 
//     icon: FileText,
//     colors: {
//       glass: "rgba(34, 197, 94, 0.15)",  // Green Glass
//       solid: "#22c55e",                  // Green Solid
//       glow: "rgba(34, 197, 94, 0.8)"     // Strong Green Glow
//     }
//   },
//   { 
//     name: "Updates", 
//     href: "/updates", 
//     icon: Bell,
//     colors: {
//       glass: "rgba(239, 68, 68, 0.15)",  // Red Glass
//       solid: "#ef4444",                  // Red Solid
//       glow: "rgba(239, 68, 68, 0.8)"     // Strong Red Glow
//     }
//   },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo with Rolling Animation */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={4000} 
//               disableHover={true}
//               transitionDuration={1500} 
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2">
                
                
//                 {/* Rolling Text Component */}
//                 <LogoLoader>
//                   <div className="loader">
//                     <p className="prefix">PICT-ACADVERSE-</p>
//                     <div className="words">
                      
//                       <span className="word">PYQ-HUB</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>
//                         <span className="word">PYQ-HUB</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>
//                     </div>
//                   </div>
//                 </LogoLoader>

//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <StyledWrapper 
//                     $glassColor={item.colors.glass}
//                     $solidColor={item.colors.solid}
//                     $glowColor={item.colors.glow}
//                     $isActive={isActive}
//                   >
//                     <button className="button" type="button">
//                       <span className="button__text">{item.name}</span>
//                       <span className="button__icon">
//                         <item.icon className="svg" />
//                       </span>
//                     </button>
//                   </StyledWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               {/* DASHBOARD BUTTON - Updated to 'Boton Elegante' Style */}
//               <DashboardBtnWrapper>
//                 <button className="btn">
//                   Dashboard
//                 </button>
//               </DashboardBtnWrapper>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full mt-2 border-primary/20 hover:bg-primary/10">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // ------------------------------------
// // 1. Logo Rolling Text Styled Component
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
//   }

//   .words {
//     overflow: hidden;
//     height: 100%;
//     position: relative;
//     mask-image: linear-gradient(
//       transparent 5%,
//       black 20%,
//       black 80%,
//       transparent 95%
//     );
//   }

//   .word {
//     display: flex;
//     align-items: center;
//     height: 100%;
//     padding-left: 2px;
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

// // ------------------------------------
// // 2. Navigation Button Styled Component
// // ------------------------------------
// const StyledWrapper = styled.div<{ $glassColor: string; $solidColor: string; $glowColor: string; $isActive: boolean }>`
//   .button {
//     position: relative;
//     width: 150px;
//     height: 35px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     background: ${props => props.$glassColor}; 
//     backdrop-filter: blur(10px);               
//     -webkit-backdrop-filter: blur(10px);
//     border: 1px solid ${props => props.$solidColor}; 
//     border-radius: 8px;
//     overflow: hidden;
//     box-shadow: ${props => props.$isActive ? `0 0 15px ${props.$glassColor}` : 'none'};
//   }

//   .button, .button__icon, .button__text {
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   }

//   .button .button__text {
//     transform: translateX(30px);
//     color: #fff; 
//     font-weight: 600;
//   }

//   .button .button__icon {
//     position: absolute;
//     transform: translateX(109px);
//     height: 100%;
//     width: 39px;
//     background-color: ${props => props.$solidColor}; 
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button .svg {
//     width: 20px;
//     height: 20px;
//     stroke: #fff;
//     color: #fff;
//   }

//   .button:hover {
//     background: ${props => props.$glassColor}; 
//     box-shadow: 0 0 30px ${props => props.$glowColor}, inset 0 0 10px ${props => props.$glassColor}; 
//     border-color: ${props => props.$solidColor};
//   }

//   .button:hover .button__text {
//     color: transparent; 
//   }

//   .button:hover .button__icon {
//     width: 148px; 
//     transform: translateX(0);
//   }

//   .button:active .button__icon {
//     background-color: ${props => props.$solidColor};
//     filter: brightness(0.9);
//   }

//   .button:active {
//     border: 1px solid ${props => props.$solidColor};
//     transform: scale(0.98);
//   }
// `;

// // ------------------------------------
// // 3. Dashboard Button Style (Replaced with "Boton Elegante" style)
// // ------------------------------------
// const DashboardBtnWrapper = styled.div`
//   .btn {
//     /* Dimensions adjusted to match navbar height */
//     height: 35px;
//     padding: 0 25px;
    
//     /* Original Style Props */
//     border: 2px solid #FDE295;
//     background-color: #1a1a1a;
//     color: #ffffff;
//     font-size: 1rem;
//     cursor: pointer;
//     border-radius: 30px;
//     transition: all 0.4s ease;
//     outline: none;
//     position: relative;
//     overflow: hidden;
//     font-weight: bold;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .btn::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: radial-gradient(
//       circle,
//       rgba(255, 255, 255, 0.25) 0%,
//       rgba(255, 255, 255, 0) 70%
//     );
//     transform: scale(0);
//     transition: transform 0.5s ease;
//   }

//   .btn:hover::after {
//     transform: scale(4);
//   }

//   .btn:hover {
//     border-color: #666666;
//     background: #292929;
//   }
// `;

// export default Navbar;

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button"; 
// import { 
//   Menu,
//   X,
//   LogOut
// } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown"; 
// import GlareHover from "./GlareHover"; 
// import styled from "styled-components";

// // 1. Navigation Interface
// interface NavItem {
//   name: string;
//   href: string;
// }

// // 2. Data Array
// const navItems: NavItem[] = [
//   { name: "Home", href: "/home" }, 
//   { name: "PYQs", href: "/pyqs" },
//   { name: "Updates", href: "/updates" },
// ];

// const handleMobileLogout = (): void => {
//   alert("Logging out... (Placeholder)");
//   window.location.href = "/";
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const isLoginPage = location.pathname === '/';
//   if (isLoginPage) {
//     return null;
//   }
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo with Rolling Animation */}
//           <Link to="/home" className="group">
//             <GlareHover
//               width="auto"
//               height="auto"
//               background="transparent"
//               borderRadius="12px"
//               borderColor="transparent"
//               autoPlay={true}
//               interval={4000} 
//               disableHover={true}
//               transitionDuration={1500} 
//               className="px-2 py-1"
//             >
//               <div className="flex items-center gap-2 ">
//                 <LogoLoader>
//                   <div className="loader">
//                     <p className="prefix">PICT-ACADVERSE-</p>
//                     <div className="words">
//                       <span className="word">PYQ'S</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>
//                       <span className="word">PYQ'S</span>
//                       <span className="word">UPDATES</span>
//                       <span className="word">NOTES</span>

//                     </div>
//                   </div>
//                 </LogoLoader>
//               </div>
//             </GlareHover>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-12">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <NavPillWrapper $isActive={isActive}>
//                     <button>
//                       {item.name}
//                     </button>
//                   </NavPillWrapper>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Dashboard & Profile */}
//           <div className="hidden md:flex items-center gap-5">
//             <Link to="/dashboard">
//               <DashboardGradientWrapper>
//                 <button>
//                   <span className="text">Dashboard</span>
//                 </button>
//               </DashboardGradientWrapper>
//             </Link>
//             <ProfileDropdown />
//           </div>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
//                     <Button
//                       variant={isActive ? "secondary" : "ghost"}
//                       className={`w-full justify-start pl-4 ${isActive ? "bg-primary/10 text-primary" : ""}`}
//                     >
//                       {item.name}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full mt-2 border-primary/20 hover:bg-primary/10">
//                   Go to Dashboard
//                 </Button>
//               </Link>
//               <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
//                     <LogOut className="w-5 h-5 mr-3 text-destructive" />
//                     Log Out
//                 </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // ------------------------------------
// // 1. Logo Rolling Text Styled Component
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
//   }

//   .words {
//     overflow: hidden;
//     height: 100%;
//     position: relative;
//     mask-image: linear-gradient(
//       transparent 5%,
//       black 20%,
//       black 80%,
//       transparent 95%
//     );
//   }

//   .word {
//     display: flex;
//     align-items: center;
//     height: 100%;
//     padding-left: 2px;
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

// // ------------------------------------
// // 2. New Nav Pill Button Style (Glassy + Gradient Hover)
// // ------------------------------------
// const NavPillWrapper = styled.div<{ $isActive: boolean }>`
//   button {
//     padding: 10px 25px; 
//     border-radius: 50px;
//     cursor: pointer;
    
//     /* DEFAULT STATE: Glassy Transparent */
//     background: ${props => props.$isActive 
//       ? 'linear-gradient(135deg, #6D5DF6 0%, #4C7DFF 40%, #2EE6D6 100%)' 
//       : 'rgba(255, 255, 255, 0.05)'};
      
//     backdrop-filter: blur(10px);
//     -webkit-backdrop-filter: blur(10px);
    
//     /* Border: Subtle white border for glass effect */
//     border: 1px solid rgba(255, 255, 255, 0.1);
    
//     /* Text Color: Always white */
//     color: white;
    
//     /* Shadow: Glow if active */
//     box-shadow: ${props => props.$isActive 
//       ? '0 0 15px rgba(76, 125, 255, 0.5)' 
//       : '0 4px 6px rgba(0, 0, 0, 0.1)'};
      
//     letter-spacing: ${props => props.$isActive ? '3px' : '1.5px'};
//     text-transform: uppercase;
//     font-size: 13px; 
//     font-weight: 700;
//     transition: all 0.5s ease;
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   /* HOVER STATE: Gradient + Glow */
//   button:hover {
//     letter-spacing: 3px;
//     background: linear-gradient(135deg, #6D5DF6 0%, #4C7DFF 40%, #2EE6D6 100%);
//     color: white;
//     box-shadow: 0 0 20px rgba(76, 125, 255, 0.6);
//     border-color: transparent;
//   }

//   /* ACTIVE CLICK STATE */
//   button:active {
//     letter-spacing: 3px;
//     transform: translateY(2px);
//     transition: 100ms;
//     box-shadow: 0 0 10px rgba(76, 125, 255, 0.4);
//   }
// `;

// // ------------------------------------
// // 3. Dashboard Button Style
// // ------------------------------------
// const DashboardGradientWrapper = styled.div`
//   button {
//     align-items: center;
//     background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
//     border: 0;
//     border-radius: 8px;
//     box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
//     box-sizing: border-box;
//     color: #ffffff;
//     display: flex;
//     font-size: 16px; 
//     font-weight: 600;
//     justify-content: center;
//     line-height: 1em;
//     max-width: 100%;
//     min-width: 120px; 
//     padding: 3px;
//     text-decoration: none;
//     user-select: none;
//     -webkit-user-select: none;
//     touch-action: manipulation;
//     white-space: nowrap;
//     cursor: pointer;
//     transition: all 0.3s;
//   }

//   button:active,
//   button:hover {
//     outline: 0;
//   }

//   button span {
//     background-color: rgb(5, 6, 45);
//     padding: 8px 20px; 
//     border-radius: 6px;
//     width: 100%;
//     height: 100%;
//     transition: 300ms;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   button:hover span {
//     background: none;
//   }

//   button:active {
//     transform: scale(0.9);
//   }
// `;

// export default Navbar;




import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { 
  Menu,
  X,
  LogOut,
  Home,
  BookOpen,
  Bell
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown"; 
import GlareHover from "./GlareHover"; 
import styled from "styled-components";

// 1. Navigation Interface
interface NavItem {
  name: string;
  href: string;
  icon: any;
}

// 2. Data Array
const navItems: NavItem[] = [
  { name: "Home", href: "/home", icon: Home }, 
  { name: "PYQs", href: "/pyqs", icon: BookOpen },
  { name: "Updates", href: "/updates", icon: Bell },
];

const handleMobileLogout = (): void => {
  alert("Logging out... (Placeholder)");
  window.location.href = "/";
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  if (isLoginPage) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16"> {/* Reverted to standard h-16 */}
          
          {/* Logo with Rolling Animation */}
          <Link to="/home" className="group">
            <GlareHover
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="12px"
              borderColor="transparent"
              autoPlay={true}
              interval={4000} 
              disableHover={true}
              transitionDuration={1500} 
              className="px-2 py-1"
            >
              <div className="flex items-center gap-2 ">
                <LogoLoader>
                  <div className="loader">
                    <p className="prefix">PICT-ACADVERSE-</p>
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
            </GlareHover>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10"> {/* Reduced gap */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link key={item.name} to={item.href}>
                  <StyledNavButton $isActive={isActive}>
                    <div className="nav-btn-outer">
                      <div className="nav-btn-inner">
                        <IconComponent className="icon-svg" />
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </StyledNavButton>
                </Link>
              );
            })}
          </div>

          {/* Dashboard & Profile */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/dashboard">
              <DashboardGradientWrapper>
                <button>
                  <span className="text">Dashboard</span>
                </button>
              </DashboardGradientWrapper>
            </Link>
            <ProfileDropdown />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up bg-background">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start pl-4 ${isActive ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full mt-2 border-primary/20 hover:bg-primary/10">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleMobileLogout}>
                  <LogOut className="w-5 h-5 mr-3 text-destructive" />
                  Log Out
                </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// ------------------------------------
// 1. Logo Rolling Text (Standard Size)
// ------------------------------------
const LogoLoader = styled.div`
  .loader {
    color: hsl(var(--foreground)); 
    font-family: inherit; 
    font-weight: 700;
    font-size: 1.25rem;  /* Reverted to 1.25rem */
    box-sizing: content-box;
    height: 1.75rem;    /* Reverted to 1.75rem */
    padding: 0;
    display: flex;
    align-items: center;
  }

  .prefix {
    margin: 0;
    white-space: nowrap;
  }

  .words {
    overflow: hidden;
    height: 100%;
    position: relative;
    padding-left: 2px;
    mask-image: linear-gradient(
      transparent 5%,
      black 20%,
      black 80%,
      transparent 95%
    );
  }

  .word {
    display: flex;
    align-items: center;
    height: 100%;
    color: #956afa; 
    animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2);
    white-space: nowrap;
    font-weight: 800; 
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

// ------------------------------------
// 2. New Nav Button (Compact Size)
// ------------------------------------
const StyledNavButton = styled.div<{ $isActive: boolean }>`
  .nav-btn-outer {
    width: 115px; /* Decreased from 135px */
    height: 40px; /* Decreased from 51px */
    border-radius: 12px;
    cursor: pointer;
    transition: 0.3s ease;
    
    background: ${props => props.$isActive 
      ? 'rgba(46, 142, 255, 0.7)' 
      : 'linear-gradient(to bottom right, #2e8eff 0%, rgba(46, 142, 255, 0) 30%)'};
      
    background-color: ${props => props.$isActive 
      ? 'rgba(46, 142, 255, 0.7)' 
      : 'rgba(46, 142, 255, 0.2)'};

    box-shadow: ${props => props.$isActive 
      ? '0 0 10px rgba(46, 142, 255, 0.5)' 
      : 'none'};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-btn-outer:hover,
  .nav-btn-outer:focus {
    background-color: rgba(46, 142, 255, 0.7);
    box-shadow: 0 0 10px rgba(46, 142, 255, 0.5);
    outline: none;
    transform: translateY(-2px); 
  }

  .nav-btn-inner {
    width: 111px; /* outer width - 4px */
    height: 36px; /* outer height - 4px */
    border-radius: 10px;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #fff;
    font-weight: 600;
    font-size: 13px; /* Smaller font */
  }

  .icon-svg {
    width: 16px; /* Smaller icon */
    height: 16px;
    color: #fff; 
  }
`;

// ------------------------------------
// 3. Dashboard Button Style (Unchanged)
// ------------------------------------
const DashboardGradientWrapper = styled.div`
  button {
    align-items: center;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    font-size: 15px; 
    font-weight: 600;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 110px; 
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:active,
  button:hover {
    outline: 0;
  }

  button span {
    background-color: rgb(5, 6, 45);
    padding: 8px 18px; 
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover span {
    background: none;
  }

  button:active {
    transform: scale(0.9);
  }
`;

export default Navbar;