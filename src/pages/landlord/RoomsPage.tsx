import { useState } from "react";
import { ROOMS, DORMS, USERS } from "@/lib/mock-data";
import { DoorOpen, Users, Search } from "lucide-react";

const RoomsPage = () => {
  const [filter, setFilter] = useState<"all" | "available" | "occupied" | "maintenance">("all");
  const [selectedDorm, setSelectedDorm] = useState("all");

  const filtered = ROOMS.filter(r =>
    (filter === "all" || r.status === filter) &&
    (selectedDorm === "all" || r.dormId === selectedDorm)
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage room inventory and assignments</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedDorm}
          onChange={(e) => setSelectedDorm(e.target.value)}
          className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Dorms</option>
          {DORMS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <div className="flex bg-card rounded-lg shadow-border overflow-hidden">
          {(["all", "available", "occupied", "maintenance"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-medium capitalize transition-colors ${
                filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filtered.map((room) => {
          const dorm = DORMS.find(d => d.id === room.dormId);
          const statusColor = room.status === "occupied" ? "bg-primary/10 border-primary/20" :
            room.status === "available" ? "bg-success/10 border-success/20" : "bg-warning/10 border-warning/20";
          const dotColor = room.status === "occupied" ? "bg-primary" :
            room.status === "available" ? "bg-success" : "bg-warning";

          return (
            <div key={room.id} className={`bg-card rounded-xl shadow-card p-4 border ${statusColor} cursor-pointer hover:shadow-elevated transition-shadow`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold tabular-nums">{room.number}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users size={12} />
                  {room.occupied}/{room.capacity} beds
                </div>
                <div className="text-xs text-muted-foreground tabular-nums">${room.monthlyRent}/mo</div>
                <div className="text-[10px] text-muted-foreground">{dorm?.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsPage;
