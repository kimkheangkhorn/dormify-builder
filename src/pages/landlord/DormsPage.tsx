import { DORMS, ROOMS, USERS } from "@/lib/mock-data";
import { Building2, MapPin, Phone, Users, DoorOpen } from "lucide-react";

const DormsPage = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dormitories</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your dormitory properties</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Add Dorm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DORMS.map((dorm) => {
          const dormRooms = ROOMS.filter(r => r.dormId === dorm.id);
          const dormTenants = USERS.filter(u => u.role === "tenant" && u.dormId === dorm.id);
          return (
            <div key={dorm.id} className="bg-card rounded-2xl shadow-card p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{dorm.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <MapPin size={12} />
                    {dorm.address}
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg"><Building2 size={18} className="text-primary" /></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <StatItem icon={DoorOpen} label="Rooms" value={dorm.totalRooms} />
                <StatItem icon={Users} label="Tenants" value={dormTenants.length} />
                <StatItem icon={DoorOpen} label="Occupied" value={dorm.occupiedRooms} />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone size={12} />
                  {dorm.contact}
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium px-2 py-1 bg-accent rounded-full">{dorm.mealCostMethod === "per_meal" ? "Per Meal" : "Proportional"}</span>
                  <span className="text-[10px] font-medium px-2 py-1 bg-accent rounded-full capitalize">{dorm.billingCycle}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">Manage</button>
                <button className="flex-1 py-2 text-xs font-semibold text-muted-foreground bg-accent rounded-lg hover:bg-muted transition-colors">Settings</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
  <div className="text-center">
    <div className="text-lg font-bold tabular-nums">{value}</div>
    <div className="text-[10px] text-muted-foreground font-medium">{label}</div>
  </div>
);

export default DormsPage;
