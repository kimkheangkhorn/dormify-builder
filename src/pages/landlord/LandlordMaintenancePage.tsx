import { useState } from "react";
import { MAINTENANCE_REQUESTS } from "@/lib/mock-data";
import { Wrench, AlertTriangle } from "lucide-react";

const LandlordMaintenancePage = () => {
  const [filter, setFilter] = useState<"all" | "open" | "in_progress" | "resolved">("all");
  const filtered = MAINTENANCE_REQUESTS.filter(r => filter === "all" || r.status === filter);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    alert(`Ticket ${id} updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage tenant maintenance requests</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-2xl shadow-card text-center">
          <div className="text-2xl font-bold tabular-nums text-warning">{MAINTENANCE_REQUESTS.filter(r => r.status === "open").length}</div>
          <div className="text-xs text-muted-foreground">Open</div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-card text-center">
          <div className="text-2xl font-bold tabular-nums text-primary">{MAINTENANCE_REQUESTS.filter(r => r.status === "in_progress").length}</div>
          <div className="text-xs text-muted-foreground">In Progress</div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-card text-center">
          <div className="text-2xl font-bold tabular-nums text-success">{MAINTENANCE_REQUESTS.filter(r => r.status === "resolved").length}</div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
      </div>

      <div className="flex gap-2">
        {(["all", "open", "in_progress", "resolved"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
            filter === s ? "bg-primary text-primary-foreground" : "bg-card shadow-border text-muted-foreground"
          }`}>{s.replace("_", " ")}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(req => (
          <div key={req.id} className="bg-card rounded-xl shadow-card p-4 md:p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{req.title}</h3>
                  <PriorityBadge priority={req.priority} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{req.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>Room {req.roomNumber}</span>
                  <span>•</span>
                  <span>{req.tenantName}</span>
                  <span>•</span>
                  <span className="tabular-nums">{req.date}</span>
                  <span>•</span>
                  <span className="capitalize px-1.5 py-0.5 bg-accent rounded text-[10px]">{req.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={req.status} />
                {req.status !== "resolved" && (
                  <select
                    onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                    className="text-xs bg-accent border-0 rounded px-2 py-1 focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Update</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "in_progress" ? "bg-primary/10 text-primary" : status === "open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${cls}`}>{status.replace("_", " ")}</span>;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const cls = priority === "high" ? "text-destructive" : priority === "medium" ? "text-warning" : "text-muted-foreground";
  return <span className={`text-[10px] font-bold uppercase ${cls}`}>{priority}</span>;
};

export default LandlordMaintenancePage;
