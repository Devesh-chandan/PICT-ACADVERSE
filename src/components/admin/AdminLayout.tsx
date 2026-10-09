import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, LogOut, Menu, NotebookPen, Users, ArrowLeft, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NAV: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/papers", label: "Question Papers", icon: FileText },
  { to: "/admin/notes", label: "Notes", icon: NotebookPen },
  { to: "/admin/users", label: "Users", icon: Users },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5 border-b border-border">
        <Link to="/admin" onClick={onNavigate} className="block">
          <div className="text-lg font-bold tracking-tight">ACADVERSE</div>
          <div className="text-xs text-muted-foreground">Admin Portal</div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1" aria-label="Admin sections">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              )
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground">
          <Link to="/home" onClick={onNavigate}>
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{user?.name}</div>
            <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Log out"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen border-r border-border bg-card">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/95 backdrop-blur px-4 h-14">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[260px]">
            <SheetTitle className="sr-only">Admin navigation</SheetTitle>
            <SheetDescription className="sr-only">Switch between admin sections</SheetDescription>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <span className="font-semibold">Admin Portal</span>
      </header>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
