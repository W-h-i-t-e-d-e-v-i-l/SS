import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { useAuth } from "../components/auth/AuthContext";
import SiteLayout from "../components/SiteLayout";
import {
  GraduationCap,
  Briefcase,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
    phone: "",
    goals: "",
  });

  const { addAccount } = useData();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const prevStep = () => {
    if (step > 0) {
      setError("");
      setStep((prev) => prev - 1);
    }
  };

  const validateCurrentStep = () => {
    setError("");

    switch (step) {
      case 1:
        if (!formData.email.trim()) {
          setError("Email is required");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Enter a valid email address");
          return false;
        }
        return true;

      case 2:
        if (!formData.password.trim()) {
          setError("Password is required");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return false;
        }
        return true;

      case 3:
        if (!formData.phone.trim()) {
          setError("Phone number is required");
          return false;
        }
        if (!/^[0-9]{10}$/.test(formData.phone)) {
          setError("Enter a valid 10 digit phone number");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.goals.trim()) {
      setError("Please tell us what you're looking for");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await addAccount(formData);
      if (res.success) {
        authLogin(res.account); // sets logged_in and user state in AuthContext
        navigate("/profile");
      } else {
        setError(res.error || "Failed to complete registration");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardClass =
    "w-full cursor-pointer text-left rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-orange-500 hover:bg-white/10";

  return (
    <SiteLayout>
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-hero px-4 py-12">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl animate-pulse" />
          <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#F97316]/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#071224] shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <div className="p-8 pb-4">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-orange-400">
              <Sparkles className="h-3.5 w-3.5" /> SS Pathways
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Complete the quick steps to build your custom learning profile.
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-white/60">
                <span>
                  Step {step + 1} of {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[350px] px-8 pb-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: Who are you? */}
              {step === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-bold text-white">Who are you?</h3>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cardClass}
                      onClick={() => {
                        setFormData({ ...formData, role: "Student" });
                        setStep(1);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">Student</p>
                          <p className="text-xs text-white/50">Currently studying or completing high-school/college</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cardClass}
                      onClick={() => {
                        setFormData({ ...formData, role: "Working Professional" });
                        setStep(1);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                          <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">Working Professional</p>
                          <p className="text-xs text-white/50">Looking to shift careers or gain certified skills</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cardClass}
                      onClick={() => {
                        setFormData({ ...formData, role: "Job Seeker" });
                        setStep(1);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                          <Search className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">Job Seeker</p>
                          <p className="text-xs text-white/50">Actively preparing for mock interviews and job referrals</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Email */}
              {step === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-bold text-white">What's your email?</h3>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition"
                  />
                  {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={prevStep}
                      className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 transition"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600 transition shadow-lg"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Password */}
              {step === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-bold text-white">Create a password</h3>
                  <input
                    type="password"
                    placeholder="Create a strong password (min 6 chars)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition"
                  />
                  {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={prevStep}
                      className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 transition"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600 transition shadow-lg"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Phone */}
              {step === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-bold text-white">Phone number</h3>
                  <input
                    type="tel"
                    placeholder="Enter your 10 digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition"
                  />
                  {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={prevStep}
                      className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 transition"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600 transition shadow-lg"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Goals */}
              {step === 4 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-2 text-xl font-bold text-white">What are you looking for?</h3>
                  <p className="mb-6 text-sm text-white/50">Help our team understand your career goals.</p>

                  <textarea
                    rows={4}
                    placeholder="Example: Tendering, Billing, Quantity Surveying, placement assistance, weekend classes..."
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition"
                  />
                  {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={prevStep}
                      className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 transition"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 py-4 font-bold text-white hover:shadow-xl hover:shadow-orange-500/10 transition disabled:opacity-50"
                    >
                      {loading ? "Registering..." : "Complete Registration 🚀"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dedicated Login Link */}
          <div className="border-t border-white/5 p-6 text-center text-sm text-white/60 bg-[#040c18]/50">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-orange-400 hover:text-orange-300 hover:underline transition">
              Log In
            </Link>
          </div>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
