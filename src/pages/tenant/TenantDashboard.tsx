import { useAuth } from "@/lib/auth-context";
import { ROOMS, DORMS, INVOICES, MAINTENANCE_REQUESTS, MEAL_TOGGLES, TENANT_MEAL_HISTORY, ANNOUNCEMENTS } from "@/lib/mock-data";
import { DoorOpen, CreditCard, Wrench, UtensilsCrossed } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TenantDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const room = ROOMS.find(r => r.id === user.roomId);
  const dorm = DORMS.find(d => d.id === user.dormId);
  const myInvoices = INVOICES.filter(i => i.tenantId === user.id);
  const pendingInv = myInvoices.find(i => i.status !== "paid");
  const myTickets = MAINTENANCE_REQUESTS.filter(m => m.tenantId === user.id);
  const todayToggles = MEAL_TOGGLES.find(t => t.tenantId === user.id);
  const totalMeals = TENANT_MEAL_HISTORY.reduce((a, b) => a + b.meals, 0);
  const totalCost = TENANT_MEAL_HISTORY.reduce((a, b) => a + b.cost, 0);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-sm text-muted-foreground mt-1">{dorm?.name} • Room {room?.number}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={DoorOpen} label="Rent" value={`$${room?.monthlyRent || 0}`} sub="Per month" />
        <MetricCard icon={CreditCard} label="Balance Due" value={`$${pendingInv?.total || 0}`} sub={pendingInv ? `Due ${pendingInv.dueDate}` : "All paid"} variant={pendingInv?.status === "overdue" ? "danger" : undefined} />
        <MetricCard icon={UtensilsCrossed} label="Meals This Month" value={totalMeals.toString()} sub={`$${totalCost.toFixed(0)} estimated`} />
        <MetricCard icon={Wrench} label="Open Tickets" value={myTickets.filter(t => t.status !== "resolved").length.toString()} sub={`${myTickets.length} total`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Meals */}
        <div className="lg:col-span-5 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Today's Meals</h3>
          {todayToggles ? (
            <div className="space-y-3">
              <MealStatus label="Breakfast" on={todayToggles.breakfast} />
              <MealStatus label="Lunch" on={todayToggles.lunch} />
              <MealStatus label="Dinner" on={todayToggles.dinner} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No toggle data for today</p>
          )}
        </div>

        {/* Meal History Chart */}
        <div className="lg:col-span-7 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Meal Consumption</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={TENANT_MEAL_HISTORY}>
              <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="meals" fill="hsl(226, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Invoices */}
        <div className="lg:col-span-6 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Invoices</h3>
          <div className="space-y-0">
            {myInvoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium">{inv.month}</div>
                  <div className="text-xs text-muted-foreground">Rent: ${inv.rent} + Meals: ${inv.mealCost}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold tabular-nums">${inv.total}</div>
                  <StatusBadge status={inv.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="lg:col-span-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Announcements</h3>
          <div className="space-y-3">
            {ANNOUNCEMENTS.slice(0, 3).map(ann => (
              <div key={ann.id} className={`p-4 bg-card rounded-xl shadow-card border-l-4 ${
                ann.type === "urgent" ? "border-l-destructive" : "border-l-primary"
              }`}>
                <div className="text-sm font-semibold">{ann.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, sub, variant }: { icon: any; label: string; value: string; sub: string; variant?: string }) => (
  <div className="bg-card p-4 rounded-2xl shadow-card">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className={variant === "danger" ? "text-destructive" : "text-primary"} />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
    <div className={`text-2xl font-bold tracking-tight tabular-nums ${variant === "danger" ? "text-destructive" : ""}`}>{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{sub}</div>
  </div>
);

const MealStatus = ({ label, on }: { label: string; on: boolean }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm font-medium">{label}</span>
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${on ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
      {on ? "ON" : "OFF"}
    </span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "paid" ? "bg-success/10 text-success" : status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning";
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${cls}`}>{status}</span>;
};

export default TenantDashboard;
