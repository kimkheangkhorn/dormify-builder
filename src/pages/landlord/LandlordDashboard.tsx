import {
  DORMS, ROOMS, INVOICES, MAINTENANCE_REQUESTS, MEAL_COUNTS,
  ANNOUNCEMENTS, FINANCIAL_DATA, OCCUPANCY_DATA, MEAL_CONSUMPTION_DATA, USERS
} from "@/lib/mock-data";
import { Building2, DoorOpen, CreditCard, Wrench, UtensilsCrossed, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const LandlordDashboard = () => {
  const pendingPayments = INVOICES.filter(i => i.status !== "paid").reduce((a, b) => a + b.total, 0);
  const todayMeals = MEAL_COUNTS[0];
  const openTickets = MAINTENANCE_REQUESTS.filter(m => m.status !== "resolved").length;
  const totalTenants = USERS.filter(u => u.role === "tenant").length;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of all your dormitory operations</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={DoorOpen} label="Total Rooms" value={DORMS.reduce((a, d) => a + d.totalRooms, 0).toString()} sub={`${DORMS.reduce((a, d) => a + d.occupiedRooms, 0)} occupied`} />
        <MetricCard icon={Users} label="Tenants" value={totalTenants.toString()} sub="Active residents" />
        <MetricCard icon={CreditCard} label="Pending" value={`$${pendingPayments.toFixed(0)}`} sub={`${INVOICES.filter(i => i.status === "overdue").length} overdue`} variant="warning" />
        <MetricCard icon={UtensilsCrossed} label="Today's Meals" value={(todayMeals.breakfast + todayMeals.lunch + todayMeals.dinner).toString()} sub={`B:${todayMeals.breakfast} L:${todayMeals.lunch} D:${todayMeals.dinner}`} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <QuickAction label="Add Tenant" />
        <QuickAction label="Record Payment" />
        <QuickAction label="Create Meal Plan" />
        <QuickAction label="Add Room" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-8 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={FINANCIAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip />
              <Bar dataKey="income" fill="hsl(226, 70%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(28, 90%, 56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy */}
        <div className="lg:col-span-4 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Occupancy</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={OCCUPANCY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {OCCUPANCY_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {OCCUPANCY_DATA.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>

        {/* Meal Consumption */}
        <div className="lg:col-span-7 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Meal Consumption</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MEAL_CONSUMPTION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="breakfast" stroke="hsl(28, 90%, 56%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="lunch" stroke="hsl(226, 70%, 55%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="dinner" stroke="hsl(142, 53%, 45%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Maintenance */}
        <div className="lg:col-span-5 bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Maintenance ({openTickets} open)</h3>
          <div className="space-y-0">
            {MAINTENANCE_REQUESTS.filter(m => m.status !== "resolved").map((req) => (
              <div key={req.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium">{req.title}</div>
                  <div className="text-xs text-muted-foreground">Room {req.roomNumber} • {req.date}</div>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="lg:col-span-12">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Announcements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className={`p-4 bg-card rounded-xl shadow-card border-l-4 ${
                ann.type === "urgent" ? "border-l-destructive" : ann.type === "update" ? "border-l-primary" : "border-l-success"
              }`}>
                <div className="text-sm font-semibold mb-1">{ann.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ann.content}</p>
                <div className="text-[10px] text-muted-foreground mt-2 tabular-nums">{ann.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, sub, variant }: { icon: any; label: string; value: string; sub: string; variant?: string }) => (
  <div className="bg-card p-4 md:p-5 rounded-2xl shadow-card">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className={variant === "warning" ? "text-warning" : "text-primary"} />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
    <div className="text-2xl font-bold tracking-tight tabular-nums">{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{sub}</div>
  </div>
);

const QuickAction = ({ label }: { label: string }) => (
  <button className="px-4 py-2 bg-primary/5 text-primary text-xs font-semibold rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap">
    + {label}
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "in_progress" ? "bg-primary/10 text-primary" : status === "open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tight ${cls}`}>{status.replace("_", " ")}</span>;
};

export default LandlordDashboard;
