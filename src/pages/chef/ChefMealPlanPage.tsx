import { MEAL_PLANS, MEAL_COUNTS } from "@/lib/mock-data";
import { useState } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";

const ChefMealPlanPage = () => {
  const plan = MEAL_PLANS[0];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meal Plan</h1>
        <p className="text-sm text-muted-foreground mt-1">Weekly menu and preparation counts</p>
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {/* Desktop Full Week */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Day</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Breakfast</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Lunch</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {plan?.days.map((day, i) => {
                const c = MEAL_COUNTS[i];
                return (
                  <tr key={day.date} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{day.dayName}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{day.date}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">{day.breakfast}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{c?.breakfast || 0} servings</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">{day.lunch}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{c?.lunch || 0} servings</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">{day.dinner}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{c?.dinner || 0} servings</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-border">
          {plan?.days.map((day, i) => {
            const c = MEAL_COUNTS[i];
            return (
              <div key={day.date} className="p-4 space-y-3">
                <div className="font-semibold">{day.dayName} <span className="text-muted-foreground tabular-nums text-xs">{day.date}</span></div>
                <div className="grid grid-cols-3 gap-2">
                  <MealCell label="Breakfast" menu={day.breakfast} count={c?.breakfast || 0} />
                  <MealCell label="Lunch" menu={day.lunch} count={c?.lunch || 0} />
                  <MealCell label="Dinner" menu={day.dinner} count={c?.dinner || 0} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MealCell = ({ label, menu, count }: { label: string; menu: string; count: number }) => (
  <div className="bg-accent/50 rounded-lg p-2.5 text-center">
    <div className="text-[10px] font-medium text-muted-foreground">{label}</div>
    <div className="text-xs font-semibold mt-1 truncate">{menu}</div>
    <div className="text-xs text-primary font-bold mt-1 tabular-nums">{count}</div>
  </div>
);

export default ChefMealPlanPage;
