import { SUBSCRIPTION_PLANS } from "@/lib/mock-data";
import { Check, Zap } from "lucide-react";

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-sm text-muted-foreground mt-2">Choose the plan that fits your dormitory needs</p>
          <p className="text-xs text-muted-foreground mt-1">Tenants always use the system for free • Annual plans save 2 months</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div key={plan.id} className={`bg-card rounded-2xl shadow-card p-6 flex flex-col ${
              plan.popular ? "ring-2 ring-primary relative" : ""
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase flex items-center gap-1">
                  <Zap size={10} /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold tabular-nums">${plan.price}</span>
                  {plan.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{plan.maxRooms === -1 ? "Unlimited" : `Up to ${plan.maxRooms}`} rooms</p>
                <p className="text-xs text-primary font-medium mt-1">{plan.mealFeatures}</p>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
                plan.popular ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}>
                {plan.price === 0 ? "Get Started Free" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Payment via ABA PayWay, Wing, or credit card • Cancel anytime
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
