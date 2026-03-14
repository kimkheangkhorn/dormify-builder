import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout/AppShell";
import LoginPage from "./pages/LoginPage";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import DormsPage from "./pages/landlord/DormsPage";
import RoomsPage from "./pages/landlord/RoomsPage";
import TenantsPage from "./pages/landlord/TenantsPage";
import LandlordMealsPage from "./pages/landlord/LandlordMealsPage";
import LandlordPaymentsPage from "./pages/landlord/LandlordPaymentsPage";
import LandlordMaintenancePage from "./pages/landlord/LandlordMaintenancePage";
import ReportsPage from "./pages/landlord/ReportsPage";
import SettingsPage from "./pages/landlord/SettingsPage";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import MyRoomPage from "./pages/tenant/MyRoomPage";
import TenantMealsPage from "./pages/tenant/TenantMealsPage";
import TenantInvoicesPage from "./pages/tenant/TenantInvoicesPage";
import TenantMaintenancePage from "./pages/tenant/TenantMaintenancePage";
import TenantProfilePage from "./pages/tenant/TenantProfilePage";
import ChefDashboard from "./pages/chef/ChefDashboard";
import ChefMealPlanPage from "./pages/chef/ChefMealPlanPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <AppShell>{children}</AppShell>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={user?.role === "landlord" ? "/landlord" : user?.role === "chef" ? "/chef" : "/tenant"} replace /> : <LoginPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />

      {/* Landlord */}
      <Route path="/landlord" element={<ProtectedRoute><LandlordDashboard /></ProtectedRoute>} />
      <Route path="/landlord/dorms" element={<ProtectedRoute><DormsPage /></ProtectedRoute>} />
      <Route path="/landlord/rooms" element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
      <Route path="/landlord/tenants" element={<ProtectedRoute><TenantsPage /></ProtectedRoute>} />
      <Route path="/landlord/meals" element={<ProtectedRoute><LandlordMealsPage /></ProtectedRoute>} />
      <Route path="/landlord/payments" element={<ProtectedRoute><LandlordPaymentsPage /></ProtectedRoute>} />
      <Route path="/landlord/maintenance" element={<ProtectedRoute><LandlordMaintenancePage /></ProtectedRoute>} />
      <Route path="/landlord/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/landlord/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Tenant */}
      <Route path="/tenant" element={<ProtectedRoute><TenantDashboard /></ProtectedRoute>} />
      <Route path="/tenant/room" element={<ProtectedRoute><MyRoomPage /></ProtectedRoute>} />
      <Route path="/tenant/meals" element={<ProtectedRoute><TenantMealsPage /></ProtectedRoute>} />
      <Route path="/tenant/invoices" element={<ProtectedRoute><TenantInvoicesPage /></ProtectedRoute>} />
      <Route path="/tenant/maintenance" element={<ProtectedRoute><TenantMaintenancePage /></ProtectedRoute>} />
      <Route path="/tenant/profile" element={<ProtectedRoute><TenantProfilePage /></ProtectedRoute>} />

      {/* Chef */}
      <Route path="/chef" element={<ProtectedRoute><ChefDashboard /></ProtectedRoute>} />
      <Route path="/chef/meal-plan" element={<ProtectedRoute><ChefMealPlanPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
