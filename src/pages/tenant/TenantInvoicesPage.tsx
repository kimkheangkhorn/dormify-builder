import { useAuth } from "@/lib/auth-context";
import { INVOICES } from "@/lib/mock-data";
import { Download, CreditCard } from "lucide-react";

const TenantInvoicesPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const myInvoices = INVOICES.filter(i => i.tenantId === user.id);

  const handlePay = (id: string) => {
    alert(`Payment initiated for invoice ${id}`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Invoices</h1>
        <p className="text-sm text-muted-foreground mt-1">View and pay your rent & meal bills</p>
      </div>

      <div className="space-y-4">
        {myInvoices.map(inv => (
          <div key={inv.id} className="bg-card rounded-2xl shadow-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold tabular-nums">{inv.month}</h3>
                <div className="text-xs text-muted-foreground">Due: {inv.dueDate}</div>
              </div>
              <StatusBadge status={inv.status} />
            </div>

            <div className="space-y-2 mb-4">
              <LineItem label="Rent" amount={inv.rent} />
              <LineItem label="Meal Cost" amount={inv.mealCost} />
              {inv.adjustments !== 0 && <LineItem label="Adjustments" amount={inv.adjustments} />}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-bold">Total</span>
                <span className="text-lg font-bold tabular-nums">${inv.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {inv.status !== "paid" && (
                <button onClick={() => handlePay(inv.id)} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <CreditCard size={14} />
                  Pay Now
                </button>
              )}
              <button className="px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-muted transition-colors">
                <Download size={14} />
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineItem = ({ label, amount }: { label: string; amount: number }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="tabular-nums">${amount.toFixed(2)}</span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "paid" ? "bg-success/10 text-success" : status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning";
  return <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${cls}`}>{status}</span>;
};

export default TenantInvoicesPage;
