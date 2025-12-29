import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  FlaskConical, 
  MessageSquare, 
  Bell,
  Menu,
  X,
  GraduationCap,
  LogOut
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown"; 
// Import the GlareHover component - adjust path if necessary
import GlareHover from "./GlareHover"; 

const navItems = [
  { name: "PYQs", href: "/pyqs", icon: FileText },
  // { name: "Notes", href: "/notes", icon: BookOpen },
  // { name: "AI Predict", href: "/predict", icon: Sparkles },
  // { name: "Lab & Viva", href: "/lab", icon: FlaskConical },
  // { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Updates", href: "/updates", icon: Bell },
];

// Define a quick placeholder function for the mobile log out button 
const handleMobileLogout = () => {
  // This should ideally be a global function or passed down via context
  alert("Logging out... (Placeholder)");
  window.location.href = "/";
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // FIX: Conditional rendering logic to hide Navbar on the login page (root route '/')
  const isLoginPage = location.pathname === '/';
  if (isLoginPage) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with Glare Effect */}
          <Link to="/home" className="group">
            <GlareHover
              width="auto"
              height="auto"
              background="transparent" // Important: Keeps it looking like a logo, not a card
              borderRadius="12px"
              borderColor="transparent"
              autoPlay={true}          // Enables the automatic animation
              interval={3000}          // Runs every 5 seconds
              disableHover={true}      // Prevents mouse interaction
              transitionDuration={1000} // Slower transition for a smoother 'shine'
              className="px-2 py-1"    // Adds breathing room for the glare
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl hidden sm:block">
                  <span className="text-foreground"> PICT-ACADVERSE</span>
                </span>
              </div>
            </GlareHover>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isActive ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Dashboard CTA & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/dashboard">
              <Button variant="gradient" size="sm">
                Dashboard
              </Button>
            </Link>
            {/* Profile Dropdown is placed here */}
            <ProfileDropdown />
          </div>

          {/* Mobile Menu Button */}
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
          <div className="lg:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="gradient" className="w-full mt-2">
                  Go to Dashboard
                </Button>
              </Link>
              {/* Added Logout to Mobile Menu */}
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

export default Navbar;