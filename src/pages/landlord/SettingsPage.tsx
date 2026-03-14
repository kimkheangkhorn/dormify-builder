import { useState } from "react";
import { DORMS } from "@/lib/mock-data";
import { Settings, Building2 } from "lucide-react";

const SettingsPage = () => {
  const dorm = DORMS[0];
  const [mealMethod, setMealMethod] = useState(dorm.mealCostMethod);
  const [billingCycle, setBillingCycle] = useState(dorm.billingCycle);
  const [breakfastCutoff, setBreakfastCutoff] = useState("20:00");
  const [lunchCutoff, setLunchCutoff] = useState("10:00");
  const [dinnerCutoff, setDinnerCutoff] = useState("14:00");
  const [publicDirectory, setPublicDirectory] = useState(false);

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure dormitory preferences</p>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-5 space-y-5">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Building2 size={16} /> Dorm Settings — {dorm.name}</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Meal Cost Calculation</label>
            <select value={mealMethod} onChange={e => setMealMethod(e.target.value as any)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="per_meal">Per Meal Rate</option>
              <option value="proportional">Proportional (Shared Cost)</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              {mealMethod === "per_meal" ? "Each meal charged at fixed rate" : "Total food cost divided by total meals taken"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Billing Cycle</label>
            <select value={billingCycle} onChange={e => setBillingCycle(e.target.value as any)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div className="pt-2 border-t border-border">
            <label className="text-sm font-semibold">Meal Toggle Cutoff Times</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div>
                <label className="text-xs text-muted-foreground">Breakfast</label>
                <input type="time" value={breakfastCutoff} onChange={e => setBreakfastCutoff(e.target.value)} className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Lunch</label>
                <input type="time" value={lunchCutoff} onChange={e => setLunchCutoff(e.target.value)} className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Dinner</label>
                <input type="time" value={dinnerCutoff} onChange={e => setDinnerCutoff(e.target.value)} className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <label className="text-sm font-medium">Public Room Directory</label>
              <p className="text-xs text-muted-foreground">Allow prospective tenants to view available rooms</p>
            </div>
            <button
              onClick={() => setPublicDirectory(!publicDirectory)}
              className={`relative w-11 h-6 rounded-full transition-colors ${publicDirectory ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-border transition-transform ${publicDirectory ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>

        <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
