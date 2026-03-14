import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { MEAL_PLANS, MEAL_TOGGLES, TENANT_MEAL_HISTORY, DORMS } from "@/lib/mock-data";
import { Info } from "lucide-react";

const TenantMealsPage = () => {
  const { user } = useAuth();
  const plan = MEAL_PLANS[0];
  const dorm = DORMS.find(d => d.id === user?.dormId);

  const [toggles, setToggles] = useState<Record<string, { breakfast: boolean; lunch: boolean; dinner: boolean }>>(() => {
    const map: Record<string, any> = {};
    if (user) {
      MEAL_TOGGLES.filter(t => t.tenantId === user.id).forEach(t => {
        map[t.date] = { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner };
      });
    }
    plan?.days.forEach(d => {
      if (!map[d.date]) map[d.date] = { breakfast: true, lunch: true, dinner: true };
    });
    return map;
  });

  if (!user) return null;

  const handleToggle = (date: string, meal: "breakfast" | "lunch" | "dinner") => {
    setToggles(prev => ({
      ...prev,
      [date]: { ...prev[date], [meal]: !prev[date]?.[meal] },
    }));
  };

  const totalMeals = Object.values(toggles).reduce((acc, t) => acc + (t.breakfast ? 1 : 0) + (t.lunch ? 1 : 0) + (t.dinner ? 1 : 0), 0);
  const estimatedCost = totalMeals * (dorm?.perMealRate || 2.5);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Meals</h1>
        <p className="text-sm text-muted-foreground mt-1">Toggle meals and view your meal plan</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-2xl shadow-card">
          <div className="text-xs text-muted-foreground font-medium">Total Meals</div>
          <div className="text-2xl font-bold tabular-nums mt-1">{totalMeals}</div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-card">
          <div className="text-xs text-muted-foreground font-medium">Estimated Cost</div>
          <div className="text-2xl font-bold tabular-nums mt-1">${estimatedCost.toFixed(2)}</div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-card hidden md:block">
          <div className="text-xs text-muted-foreground font-medium">Rate</div>
          <div className="text-2xl font-bold tabular-nums mt-1">${dorm?.perMealRate || 0}/meal</div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-start gap-2">
        <Info size={14} className="text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-primary">Toggle meals ON/OFF for future days. Changes must be made before the cutoff time (10 PM the day before).</p>
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold">Weekly Meal Plan & Toggles</h3>
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Day</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground">Breakfast</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground">Lunch</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {plan?.days.map(day => {
                const t = toggles[day.date] || { breakfast: true, lunch: true, dinner: true };
                return (
                  <tr key={day.date} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <div className="font-medium">{day.dayName}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{day.date}</div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <MealToggleBtn on={t.breakfast} menu={day.breakfast} onClick={() => handleToggle(day.date, "breakfast")} />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <MealToggleBtn on={t.lunch} menu={day.lunch} onClick={() => handleToggle(day.date, "lunch")} />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <MealToggleBtn on={t.dinner} menu={day.dinner} onClick={() => handleToggle(day.date, "dinner")} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y divide-border">
          {plan?.days.map(day => {
            const t = toggles[day.date] || { breakfast: true, lunch: true, dinner: true };
            return (
              <div key={day.date} className="p-4 space-y-3">
                <div className="font-medium text-sm">{day.dayName} <span className="text-muted-foreground tabular-nums text-xs">{day.date}</span></div>
                <div className="grid grid-cols-3 gap-2">
                  <MealToggleMobile label="Breakfast" menu={day.breakfast} on={t.breakfast} onClick={() => handleToggle(day.date, "breakfast")} />
                  <MealToggleMobile label="Lunch" menu={day.lunch} on={t.lunch} onClick={() => handleToggle(day.date, "lunch")} />
                  <MealToggleMobile label="Dinner" menu={day.dinner} on={t.dinner} onClick={() => handleToggle(day.date, "dinner")} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Meal History</h3>
        <div className="space-y-2">
          {TENANT_MEAL_HISTORY.map(h => (
            <div key={h.week} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm font-medium">{h.week}</span>
              <div className="text-right">
                <span className="text-sm font-bold tabular-nums">{h.meals} meals</span>
                <span className="text-xs text-muted-foreground ml-2 tabular-nums">${h.cost.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MealToggleBtn = ({ on, menu, onClick }: { on: boolean; menu: string; onClick: () => void }) => (
  <div className="space-y-1">
    <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${on ? "bg-success/10 text-success hover:bg-success/20" : "bg-warning/10 text-warning hover:bg-warning/20"}`}>
      {on ? "ON" : "OFF"}
    </button>
    <div className="text-[10px] text-muted-foreground">{menu}</div>
  </div>
);

const MealToggleMobile = ({ label, menu, on, onClick }: { label: string; menu: string; on: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`p-2.5 rounded-xl text-center transition-colors ${on ? "bg-success/10 border border-success/20" : "bg-warning/10 border border-warning/20"}`}>
    <div className="text-[10px] font-medium text-muted-foreground">{label}</div>
    <div className={`text-xs font-bold mt-1 ${on ? "text-success" : "text-warning"}`}>{on ? "ON" : "OFF"}</div>
    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{menu}</div>
  </button>
);

export default TenantMealsPage;
