import { useState } from "react";
import { INVOICES, USERS, DORMS } from "@/lib/mock-data";
import { Search, Download } from "lucide-react";

const LandlordPaymentsPage = () => {
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const filtered = INVOICES.filter(i => filter === "all" || i.status === filter);
  const totalPending = INVOICES.filter(i => i.status !== "paid").reduce((a, b) => a + b.total, 0);
  const totalCollected = INVOICES.filter(i => i.status === "paid").reduce((a, b) => a + b.total, 0);

  const handleMarkPaid = (id: string) => {
    // Mock: would update state
    alert(`Invoice ${id} marked as paid`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">Track rent and meal payments</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Record Payment
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card p-5 rounded-2xl shadow-card">
          <div className="text-xs text-muted-foreground font-medium">Total Collected</div>
          <div className="text-2xl font-bold text-success tabular-nums mt-1">${totalCollected.toFixed(0)}</div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-card">
          <div className="text-xs text-muted-foreground font-medium">Pending</div>
          <div className="text-2xl font-bold text-warning tabular-nums mt-1">${totalPending.toFixed(0)}</div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-card hidden md:block">
          <div className="text-xs text-muted-foreground font-medium">Overdue</div>
          <div className="text-2xl font-bold text-destructive tabular-nums mt-1">${INVOICES.filter(i => i.status === "overdue").reduce((a, b) => a + b.total, 0).toFixed(0)}</div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {(["all", "pending", "overdue", "paid"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
            filter === s ? "bg-primary text-primary-foreground" : "bg-card shadow-border text-muted-foreground hover:text-foreground"
          }`}>{s}</button>
        ))}
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Month</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Rent</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Meals</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-accent/50">
                  <td className="px-5 py-3 font-medium">{inv.tenantName}</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{inv.month}</td>
                  <td className="px-5 py-3 text-right tabular-nums">${inv.rent}</td>
                  <td className="px-5 py-3 text-right tabular-nums">${inv.mealCost}</td>
                  <td className="px-5 py-3 text-right font-bold tabular-nums">${inv.total}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={inv.status} /></td>
                  <td className="px-5 py-3 text-right">
                    {inv.status !== "paid" && (
                      <button onClick={() => handleMarkPaid(inv.id)} className="text-xs font-semibold text-primary hover:underline">Mark Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-border">
          {filtered.map(inv => (
            <div key={inv.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{inv.tenantName}</span>
                <StatusBadge status={inv.status} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{inv.month} • Due {inv.dueDate}</span>
                <span className="font-bold text-foreground tabular-nums">${inv.total}</span>
              </div>
              <div className="text-xs text-muted-foreground">Rent: ${inv.rent} + Meals: ${inv.mealCost}</div>
              {inv.status !== "paid" && (
                <button onClick={() => handleMarkPaid(inv.id)} className="text-xs font-semibold text-primary">Mark as Paid</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "paid" ? "bg-success/10 text-success" : status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning";
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tight ${cls}`}>{status}</span>;
};

export default LandlordPaymentsPage;
