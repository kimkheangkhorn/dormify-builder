import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Wrench, CreditCard, User, Bell, Menu, X, ChefHat,
  Building2, DoorOpen, Users, UtensilsCrossed, BarChart3,
  Settings, CreditCard as SubIcon, LogOut
} from "lucide-react";

const landlordNav = [
  { icon: Home, label: "Dashboard", path: "/landlord" },
  { icon: Building2, label: "Dorms", path: "/landlord/dorms" },
  { icon: DoorOpen, label: "Rooms", path: "/landlord/rooms" },
  { icon: Users, label: "Tenants", path: "/landlord/tenants" },
  { icon: UtensilsCrossed, label: "Meals", path: "/landlord/meals" },
  { icon: CreditCard, label: "Payments", path: "/landlord/payments" },
  { icon: Wrench, label: "Maintenance", path: "/landlord/maintenance" },
  { icon: BarChart3, label: "Reports", path: "/landlord/reports" },
  { icon: Settings, label: "Settings", path: "/landlord/settings" },
];

const tenantNav = [
  { icon: Home, label: "Dashboard", path: "/tenant" },
  { icon: DoorOpen, label: "My Room", path: "/tenant/room" },
  { icon: UtensilsCrossed, label: "Meals", path: "/tenant/meals" },
  { icon: CreditCard, label: "Invoices", path: "/tenant/invoices" },
  { icon: Wrench, label: "Maintenance", path: "/tenant/maintenance" },
  { icon: User, label: "Profile", path: "/tenant/profile" },
];

const chefNav = [
  { icon: Home, label: "Dashboard", path: "/chef" },
  { icon: UtensilsCrossed, label: "Meal Plan", path: "/chef/meal-plan" },
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const navItems = user.role === "landlord" ? landlordNav : user.role === "chef" ? chefNav : tenantNav;

  const NavContent = () => (
    <>
      <div className="p-6">
        <span className="text-xl font-bold tracking-tight text-primary">Dormify</span>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
          </div>
          <button onClick={() => { logout(); navigate("/"); }} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card shadow-border z-20 fixed h-full">
        <NavContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-card shadow-elevated flex flex-col animate-fade-in">
            <div className="absolute right-3 top-5">
              <button onClick={() => setMobileOpen(false)} className="p-1 text-muted-foreground"><X size={18} /></button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 md:ml-64">
        <header className="h-14 bg-card/80 backdrop-blur-md shadow-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <button className="md:hidden p-1.5 text-muted-foreground" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="text-sm font-medium text-muted-foreground hidden md:block">
            {user.role === "tenant" && user.dormId ? "North Hall • Room " + (user.roomId ? "101" : "") : ""}
            {user.role === "landlord" ? "Admin Panel" : ""}
            {user.role === "chef" ? "Chef View" : ""}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs md:hidden">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
          </div>
        </header>

        <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
          {children}
        </section>
      </main>

      {/* Mobile Bottom Nav for critical actions */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card shadow-border border-t border-border z-30">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
