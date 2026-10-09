import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PYQs from "./pages/PYQs";
import Notes from "./pages/Notes";

import Lab from "./pages/Lab";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import AuthLanding from "./pages/AuthLanding";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

// The admin portal is only needed by admins, so keep it out of the main bundle
const AdminOverview = lazy(() => import("./pages/admin/Overview"));
const AdminPapers = lazy(() => import("./pages/admin/Papers"));
const AdminNotes = lazy(() => import("./pages/admin/Notes"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));

// One retry is enough: a dead API should show its error state quickly, not after ~7s of backoff
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLanding />} /> {/* Login/Register Page */}
          <Route path="/home" element={<Index />} /> {/* New Home Page (Post-Login Landing) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/notes" element={<Notes />} />
         
          <Route path="/lab" element={<Lab />} />
          <Route path="/forum" element={<Forum />} />
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Suspense fallback={null}><AdminOverview /></Suspense>} />
              <Route path="/admin/papers" element={<Suspense fallback={null}><AdminPapers /></Suspense>} />
              <Route path="/admin/notes" element={<Suspense fallback={null}><AdminNotes /></Suspense>} />
              <Route path="/admin/users" element={<Suspense fallback={null}><AdminUsers /></Suspense>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;