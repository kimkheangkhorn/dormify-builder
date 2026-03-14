import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { MAINTENANCE_REQUESTS } from "@/lib/mock-data";
import { Plus, Camera } from "lucide-react";

const TenantMaintenancePage = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("plumbing");

  if (!user) return null;

  const myRequests = MAINTENANCE_REQUESTS.filter(r => r.tenantId === user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Maintenance request "${title}" submitted successfully!`);
    setShowForm(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">Submit and track maintenance requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Plus size={16} />
          New Request
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-5 space-y-4">
          <h3 className="text-sm font-semibold">Submit Maintenance Request</h3>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="furniture">Furniture</option>
              <option value="hvac">HVAC</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Brief description" required />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]" placeholder="Detailed description..." required />
          </div>
          <div>
            <label className="text-sm font-medium">Photo (optional)</label>
            <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/30 transition-colors">
              <Camera size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-accent rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {myRequests.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-card p-8 text-center">
            <p className="text-sm text-muted-foreground">No maintenance requests yet</p>
          </div>
        ) : (
          myRequests.map(req => (
            <div key={req.id} className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{req.title}</h3>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-accent rounded capitalize">{req.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{req.description}</p>
                  <div className="text-xs text-muted-foreground mt-2 tabular-nums">{req.date}</div>
                </div>
                <StatusBadge status={req.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "in_progress" ? "bg-primary/10 text-primary" : status === "open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${cls}`}>{status.replace("_", " ")}</span>;
};

export default TenantMaintenancePage;
