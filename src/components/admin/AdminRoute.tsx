import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Guards the admin portal. This is a UX gate only - every /api/admin request is
 * authorised again on the server against the database role.
 */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <div className="max-w-sm text-center space-y-4">
          <ShieldAlert className="w-10 h-10 mx-auto text-destructive" />
          <h1 className="text-xl font-semibold">Admins only</h1>
          <p className="text-sm text-muted-foreground">
            Your account does not have access to the admin portal. Ask an existing admin to promote you.
          </p>
          <Button asChild variant="outline">
            <a href="/home">Back to home</a>
          </Button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
