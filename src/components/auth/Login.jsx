import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "./AuthContext";

export default function Login() {
  const {
    login,
    openSignup,
    closeAuth,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const validateForm = () => {
    setError("");

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      setError("Enter a valid email address");
      return false;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  };

  const handleLogin = () => {
  if (!validateForm()) return;

  login({
    name: "Student",
    email: formData.email,
    role: "user",
  });
};
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#071224] shadow-2xl"
      >
              {/* HEADER */}
        <div className="relative p-6 pb-4">
          <button
            onClick={closeAuth}
            className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
          >
            <X size={18} />
          </button>

          <h2 className="text-2xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-sm text-white/70">
            Sign in to continue your learning journey.
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-white/60">
              <span>Login</span>

              <span>100%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-orange"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="min-h-[340px] px-6 pb-6">
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
          >
            <h3 className="text-xl font-semibold text-white">
                Sign In
            </h3>

            <p className="mb-6 mt-2 text-sm text-white/60">
                Access your personalized dashboard and continue learning.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            />

            <div className="relative mt-5">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 pr-14 text-white outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
                        <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-orange transition hover:text-orange/80"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange py-4 font-semibold text-white transition hover:scale-[1.02]"
            >
              Login
              <ArrowRight size={18} />
            </button>

            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-white/60">
                New to SS Pathways?
              </p>

              <button
                onClick={openSignup}
                className="mt-3 font-semibold text-orange transition hover:text-orange/80"
              >
                Create an Account
              </button>
            </div>
          </motion.div>
        </div>
              </motion.div>
    </div>
  );
}