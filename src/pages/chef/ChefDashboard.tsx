import { MEAL_PLANS, MEAL_COUNTS } from "@/lib/mock-data";
import { useState } from "react";
import { UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";

const ChefDashboard = () => {
  const todayCounts = MEAL_COUNTS[0];
  const plan = MEAL_PLANS[0];
  const [selectedDay, setSelectedDay] = useState(0);
  const currentDay = plan?.days[selectedDay];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chef Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Today's meal counts and weekly plan</p>
      </div>

      {/* Today's Big Numbers */}
      <div className="grid grid-cols-3 gap-4">
        <BigMealCount label="Breakfast" count={todayCounts?.breakfast || 0} color="warning" />
        <BigMealCount label="Lunch" count={todayCounts?.lunch || 0} color="primary" />
        <BigMealCount label="Dinner" count={todayCounts?.dinner || 0} color="success" />
      </div>

      <div className="bg-card rounded-2xl shadow-card p-5">
        <div className="text-center mb-2">
          <div className="text-4xl md:text-6xl font-bold tabular-nums text-primary">
            {(todayCounts?.breakfast || 0) + (todayCounts?.lunch || 0) + (todayCounts?.dinner || 0)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Total Meals Today</div>
        </div>
      </div>

      {/* Weekly Meal Plan */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Weekly Meal Plan</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))} className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
            <span className="text-sm font-medium tabular-nums min-w-[140px] text-center">{currentDay?.dayName} • {currentDay?.date}</span>
            <button onClick={() => setSelectedDay(Math.min(6, selectedDay + 1))} className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="flex border-b border-border overflow-x-auto">
          {plan?.days.map((day, i) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 min-w-[80px] py-3 text-xs font-medium text-center transition-colors ${
                selectedDay === i ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              {day.dayName.slice(0, 3)}
            </button>
          ))}
        </div>

        {currentDay && (
          <div className="p-5 space-y-4">
            <MealDetail label="Breakfast" menu={currentDay.breakfast} count={MEAL_COUNTS[selectedDay]?.breakfast || 0} />
            <MealDetail label="Lunch" menu={currentDay.lunch} count={MEAL_COUNTS[selectedDay]?.lunch || 0} />
            <MealDetail label="Dinner" menu={currentDay.dinner} count={MEAL_COUNTS[selectedDay]?.dinner || 0} />
          </div>
        )}
      </div>

      {/* All Week Summary */}
      <div className="bg-card rounded-2xl shadow-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Weekly Counts Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs font-semibold text-muted-foreground">Day</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Breakfast</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Lunch</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Dinner</th>
                <th className="text-center py-2 text-xs font-semibold text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {plan?.days.map((day, i) => {
                const c = MEAL_COUNTS[i];
                return (
                  <tr key={day.date} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium">{day.dayName.slice(0, 3)}</td>
                    <td className="py-2.5 text-center tabular-nums">{c?.breakfast || 0}</td>
                    <td className="py-2.5 text-center tabular-nums">{c?.lunch || 0}</td>
                    <td className="py-2.5 text-center tabular-nums">{c?.dinner || 0}</td>
                    <td className="py-2.5 text-center tabular-nums font-bold">{(c?.breakfast || 0) + (c?.lunch || 0) + (c?.dinner || 0)}</td>
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

const BigMealCount = ({ label, count, color }: { label: string; count: number; color: string }) => (
  <div className="bg-card rounded-2xl shadow-card p-5 text-center">
    <div className="text-xs font-medium text-muted-foreground mb-2">{label}</div>
    <div className={`text-4xl md:text-5xl font-bold tabular-nums text-${color}`}>{count}</div>
  </div>
);

const MealDetail = ({ label, menu, count }: { label: string; menu: string; count: number }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{menu}</div>
    </div>
    <div className="flex items-center gap-2">
      <UtensilsCrossed size={14} className="text-muted-foreground" />
      <span className="text-lg font-bold tabular-nums">{count}</span>
    </div>
  </div>
);

export default ChefDashboard;
