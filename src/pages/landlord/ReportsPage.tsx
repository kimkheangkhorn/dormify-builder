import { FINANCIAL_DATA, OCCUPANCY_DATA, MEAL_CONSUMPTION_DATA, INVOICES, USERS } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const ReportsPage = () => {
  const overduetenants = INVOICES.filter(i => i.status === "overdue");

  const mealPreferenceData = [
    { day: "Mon", on: 18, off: 3 },
    { day: "Tue", on: 16, off: 5 },
    { day: "Wed", on: 19, off: 2 },
    { day: "Thu", on: 15, off: 6 },
    { day: "Fri", on: 17, off: 4 },
    { day: "Sat", on: 10, off: 11 },
    { day: "Sun", on: 12, off: 9 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Financial trends, occupancy, and meal insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial */}
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Income vs Expenses (6 months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={FINANCIAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="hsl(226, 70%, 55%)" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(28, 90%, 56%)" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy */}
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Occupancy Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={OCCUPANCY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {OCCUPANCY_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {OCCUPANCY_DATA.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Meal Consumption */}
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Meal Consumption Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={MEAL_CONSUMPTION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="breakfast" stroke="hsl(28, 90%, 56%)" strokeWidth={2} />
              <Line type="monotone" dataKey="lunch" stroke="hsl(226, 70%, 55%)" strokeWidth={2} />
              <Line type="monotone" dataKey="dinner" stroke="hsl(142, 53%, 45%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Meal Preferences */}
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tenant Meal Preferences</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mealPreferenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="on" fill="hsl(142, 53%, 45%)" name="Meals ON" radius={[4, 4, 0, 0]} />
              <Bar dataKey="off" fill="hsl(28, 90%, 56%)" name="Meals OFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overdue Payments List */}
      <div className="bg-card rounded-2xl shadow-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Overdue Payments</h3>
        {overduetenants.length === 0 ? (
          <p className="text-sm text-muted-foreground">No overdue payments</p>
        ) : (
          <div className="space-y-3">
            {overduetenants.map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium">{inv.tenantName}</div>
                  <div className="text-xs text-muted-foreground">Due: {inv.dueDate}</div>
                </div>
                <span className="text-sm font-bold text-destructive tabular-nums">${inv.total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
