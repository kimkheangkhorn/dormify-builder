import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Building2, ChefHat, GraduationCap } from "lucide-react";

const LoginPage = () => {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    login(email, password);
    navigate("/tenant");
  };

  const handleQuickLogin = (role: "landlord" | "tenant" | "chef") => {
    loginAs(role);
    navigate(role === "landlord" ? "/landlord" : role === "chef" ? "/chef" : "/tenant");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dormify</h1>
          <p className="mt-2 text-sm text-muted-foreground">Dormitory & Meal Management System</p>
        </div>

        <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold">{isRegister ? "Create Account" : "Sign In"}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isRegister ? "Register to get started" : "Enter your credentials to continue"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your full name"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or sign in with Google</span></div>
          </div>

          <button className="w-full py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-medium hover:underline">
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </div>

        {/* Quick Demo Access */}
        <div className="bg-card rounded-2xl shadow-card p-6 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Quick Demo Access</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleQuickLogin("landlord")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors text-primary">
              <Building2 size={22} />
              <span className="text-xs font-semibold">Landlord</span>
            </button>
            <button onClick={() => handleQuickLogin("tenant")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-success/10 hover:bg-success/20 transition-colors text-success">
              <GraduationCap size={22} />
              <span className="text-xs font-semibold">Tenant</span>
            </button>
            <button onClick={() => handleQuickLogin("chef")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-warning/10 hover:bg-warning/20 transition-colors text-warning">
              <ChefHat size={22} />
              <span className="text-xs font-semibold">Chef</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
