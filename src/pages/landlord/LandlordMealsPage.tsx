import { useState } from "react";
import { MEAL_PLANS, MEAL_COUNTS, MEAL_TOGGLES, USERS } from "@/lib/mock-data";
import { UtensilsCrossed, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const LandlordMealsPage = () => {
  const plan = MEAL_PLANS[0];
  const [selectedDay, setSelectedDay] = useState(0);

  const currentDay = plan?.days[selectedDay];
  const todayCounts = MEAL_COUNTS[selectedDay];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meal Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Weekly meal planner and real-time counters</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Create Plan
        </button>
      </div>

      {/* Real-time Meal Counts */}
      <div className="grid grid-cols-3 gap-4">
        <MealCountCard meal="Breakfast" count={todayCounts?.breakfast || 0} cutoff="8:00 PM" />
        <MealCountCard meal="Lunch" count={todayCounts?.lunch || 0} cutoff="10:00 AM" />
        <MealCountCard meal="Dinner" count={todayCounts?.dinner || 0} cutoff="2:00 PM" />
      </div>

      {/* Weekly Plan */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Weekly Meal Plan</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))} className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
            <span className="text-sm font-medium tabular-nums">{currentDay?.dayName} • {currentDay?.date}</span>
            <button onClick={() => setSelectedDay(Math.min(6, selectedDay + 1))} className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
          </div>
        </div>

        {/* Day selector tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {plan?.days.map((day, i) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 min-w-[80px] py-3 text-xs font-medium text-center transition-colors ${
                selectedDay === i ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {day.dayName.slice(0, 3)}
            </button>
          ))}
        </div>

        {currentDay && (
          <div className="p-5 space-y-4">
            <MealRow label="Breakfast" menu={currentDay.breakfast} count={todayCounts?.breakfast || 0} />
            <MealRow label="Lunch" menu={currentDay.lunch} count={todayCounts?.lunch || 0} />
            <MealRow label="Dinner" menu={currentDay.dinner} count={todayCounts?.dinner || 0} />
          </div>
        )}
      </div>

      {/* Tenant Toggles Overview */}
      <div className="bg-card rounded-2xl shadow-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tenant Meal Toggles (Today)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs font-semibold text-muted-foreground">Tenant</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Breakfast</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Lunch</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {MEAL_TOGGLES.filter(t => t.date === plan?.days[0]?.date).map((toggle) => {
                const tenant = USERS.find(u => u.id === toggle.tenantId);
                return (
                  <tr key={toggle.tenantId} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium">{tenant?.name || toggle.tenantId}</td>
                    <td className="py-2.5 text-center"><ToggleDot on={toggle.breakfast} /></td>
                    <td className="py-2.5 text-center"><ToggleDot on={toggle.lunch} /></td>
                    <td className="py-2.5 text-center"><ToggleDot on={toggle.dinner} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MealCountCard = ({ meal, count, cutoff }: { meal: string; count: number; cutoff: string }) => (
  <div className="bg-card rounded-2xl shadow-card p-4 md:p-5 text-center">
    <div className="text-xs font-medium text-muted-foreground">{meal}</div>
    <div className="text-3xl md:text-4xl font-bold tabular-nums my-2">{count}</div>
    <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
      <Clock size={10} /> Cutoff: {cutoff}
    </div>
  </div>
);

const MealRow = ({ label, menu, count }: { label: string; menu: string; count: number }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{menu}</div>
    </div>
    <div className="flex items-center gap-2">
      <UtensilsCrossed size={14} className="text-muted-foreground" />
      <span className="text-sm font-bold tabular-nums">{count} meals</span>
    </div>
  </div>
);

const ToggleDot = ({ on }: { on: boolean }) => (
  <span className={`inline-block w-3 h-3 rounded-full ${on ? "bg-success" : "bg-warning"}`} />
);

export default LandlordMealsPage;
