import { USERS, ROOMS, DORMS, INVOICES } from "@/lib/mock-data";
import { Search, Mail, Phone, DoorOpen } from "lucide-react";
import { useState } from "react";

const TenantsPage = () => {
  const tenants = USERS.filter(u => u.role === "tenant");
  const [search, setSearch] = useState("");

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tenants</h1>
          <p className="text-sm text-muted-foreground mt-1">{tenants.length} registered tenants</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Invite Tenant
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Search tenants..."
        />
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Room</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dorm</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tenant) => {
                const room = ROOMS.find(r => r.id === tenant.roomId);
                const dorm = DORMS.find(d => d.id === tenant.dormId);
                const pending = INVOICES.filter(i => i.tenantId === tenant.id && i.status !== "paid").reduce((a, b) => a + b.total, 0);
                return (
                  <tr key={tenant.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                          {tenant.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{tenant.name}</div>
                          <div className="text-xs text-muted-foreground">{tenant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 tabular-nums">{room?.number || "—"}</td>
                    <td className="px-5 py-3">{dorm?.name || "—"}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{tenant.phone}</td>
                    <td className="px-5 py-3">
                      {pending > 0 ? (
                        <span className="text-xs font-bold text-warning tabular-nums">${pending.toFixed(0)}</span>
                      ) : (
                        <span className="text-xs font-bold text-success">Paid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border">
          {filtered.map((tenant) => {
            const room = ROOMS.find(r => r.id === tenant.roomId);
            const dorm = DORMS.find(d => d.id === tenant.dormId);
            const pending = INVOICES.filter(i => i.tenantId === tenant.id && i.status !== "paid").reduce((a, b) => a + b.total, 0);
            return (
              <div key={tenant.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                      {tenant.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{tenant.name}</div>
                      <div className="text-xs text-muted-foreground">{dorm?.name} • Room {room?.number}</div>
                    </div>
                  </div>
                  {pending > 0 ? (
                    <span className="text-xs font-bold text-warning tabular-nums">${pending.toFixed(0)}</span>
                  ) : (
                    <span className="text-xs font-bold text-success">Paid</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TenantsPage;
