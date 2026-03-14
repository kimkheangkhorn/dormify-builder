import { useAuth } from "@/lib/auth-context";
import { ROOMS, DORMS, USERS } from "@/lib/mock-data";
import { DoorOpen, Users, MapPin } from "lucide-react";

const MyRoomPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const room = ROOMS.find(r => r.id === user.roomId);
  const dorm = DORMS.find(d => d.id === user.dormId);
  const roommates = room?.tenants.filter(id => id !== user.id).map(id => USERS.find(u => u.id === id)).filter(Boolean) || [];

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Room</h1>
        <p className="text-sm text-muted-foreground mt-1">Your room details and roommate info</p>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl"><DoorOpen size={24} className="text-primary" /></div>
          <div>
            <h2 className="text-xl font-bold tabular-nums">Room {room?.number}</h2>
            <p className="text-sm text-muted-foreground">{dorm?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Monthly Rent" value={`$${room?.monthlyRent || 0}`} />
          <InfoItem label="Capacity" value={`${room?.occupied || 0}/${room?.capacity || 0} beds`} />
          <InfoItem label="Status" value={room?.status || "—"} />
          <InfoItem label="Dorm Contact" value={dorm?.contact || "—"} />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <MapPin size={12} />
          {dorm?.address}
        </div>
      </div>

      {roommates.length > 0 && (
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Roommates</h3>
          <div className="space-y-3">
            {roommates.map(rm => rm && (
              <div key={rm.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                  {rm.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{rm.name}</div>
                  <div className="text-xs text-muted-foreground">{rm.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-xs text-muted-foreground font-medium">{label}</div>
    <div className="text-sm font-semibold mt-0.5 capitalize tabular-nums">{value}</div>
  </div>
);

export default MyRoomPage;
