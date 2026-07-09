import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useAuth } from "../components/auth/AuthContext";
import SiteLayout from "../components/SiteLayout";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: dataLogin } = useData();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const res = await dataLogin(email, password);
      if (res.success) {
        authLogin(res.user); // sets logged_in and user state in AuthContext
        
        // If it's an admin, go to admin panel. Otherwise, go to profile page.
        if (res.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setError(res.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-hero px-4 py-12">
        {/* Glowing Ambient Backgrounds */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl animate-pulse" />
          <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#F97316]/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#071224] p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-orange-400">
              <Sparkles className="h-3.5 w-3.5" /> SS Pathways
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Log in to access your dashboard and learning path.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/65 mb-2 pl-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-orange-500 focus:bg-white/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/65 mb-2 pl-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-orange-500 focus:bg-white/10"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-center text-sm font-medium text-red-400"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Logging in..." : "Log In"}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-white group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-white/60">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-orange-400 hover:text-orange-300 hover:underline transition">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
