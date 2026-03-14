import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { User, Mail, Phone, DoorOpen, Save } from "lucide-react";

const TenantProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [email] = useState(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Update your personal information</p>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-5 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-1.5"><User size={14} /> Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-1.5"><Mail size={14} /> Email</label>
            <input value={email} disabled className="mt-1 w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-1.5"><Phone size={14} /> Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={14} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantProfilePage;
