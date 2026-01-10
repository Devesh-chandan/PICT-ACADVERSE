import { Link } from "react-router-dom";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuDescription } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Target } from "lucide-react";
import { toast } from "sonner";

const ProfileDropdown = () => {
    // 1. Initialize state directly from localStorage if possible, or default to null
    const [user, setUser] = useState<{ name: string; email: string; initials: string } | null>(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                // Derive initials if not present
                const initials = parsed.name
                    ? parsed.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2)
                    : "U";
                return { ...parsed, initials };
            } catch (e) {
                console.error("Failed to parse user data", e);
                return null;
            }
        }
        return null;
    });

    const handleLogout = () => {
        // Real logout logic
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.info("Logged out successfully");

        // Redirect immediately
        window.location.href = "/";
    };

    // If no user is logged in, you might want to show nothing or a Login button.
    // For now, we'll assume this component is only shown when logged in, 
    // or fallback to a default state if that behavior is preferred.
    if (!user) {
        // Optional: Render nothing or a placeholder if 'user' is missing but expected.
        // fallback for safety to avoid crash if state is empty
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden w-10 h-10 ml-2 hover:scale-105 transition-transform duration-300">
                    <Avatar className="w-10 h-10 border border-border">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {user.initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                </DropdownMenuLabel>
                <DropdownMenuDescription className="text-xs text-muted-foreground truncate px-2 mb-1">
                    {user.email}
                </DropdownMenuDescription>
                <DropdownMenuSeparator />

                {/* Progress Tracker Button */}
                <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer font-medium text-primary hover:!bg-primary/10">
                        <Target className="w-4 h-4 mr-2" />
                        Progress Tracker
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                {/* Logout Button */}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;