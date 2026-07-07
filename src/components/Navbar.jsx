import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./auth/AuthContext";
import {
  Menu,
  X,
  GraduationCap,
  ArrowRight,
  CircleUserRound,
} from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/job-support", label: "Support" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Get In Touch" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

const {
  isLoggedIn,
  openLogin,
  openSignup,
} = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: 0,
          scale: scrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-5 inset-x-0 z-50 px-4"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-slate-900/55 backdrop-blur-3xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0"
            >
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>

              <div className="hidden sm:block">
                <div className="text-white font-bold text-lg">
                  SS Pathways
                </div>

                <div className="text-white/60 text-[11px] uppercase tracking-widest">
                  Education For All
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
  {links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className="group relative px-4 py-2 rounded-full text-sm font-medium text-white/85 transition-all duration-300 hover:text-orange-400"
    >
      {link.label}

      <span className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-8" />
    </Link>
  ))}
</nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
<<<<<<< HEAD
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/recommend");
                  } else {
                    navigate("/signup");
                  }
                }}
                className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:from-blue-600 hover:via-orange-500 hover:to-orange-600"
              >
                Explore

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              {!isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/20"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-orange-400 hover:bg-orange-500"
                >
                  <CircleUserRound className="h-6 w-6" />
                </Link>
              )}
            </div>
=======

  <button
    onClick={() => {
      if (isLoggedIn) {
        navigate("/recommend");
      } else {
        openLogin("/recommend");
      }
    }}
    className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:from-blue-600 hover:via-orange-500 hover:to-orange-600"
  >
    Explore

    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
      <ArrowRight className="h-4 w-4" />
    </span>
  </button>

  {!isLoggedIn ? (
    <>
      <button
        onClick={() => openLogin()}
        className="rounded-full border border-white/20 px-5 py-2.5 text-white transition hover:border-orange-400 hover:text-orange-400"
      >
        Login
      </button>

      <button
        onClick={() => openSignup()}
        className="rounded-full bg-orange px-5 py-2.5 font-semibold text-white transition hover:scale-105"
      >
        Sign Up
      </button>
    </>
  ) : (
    <Link
      to="/profile"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-orange-400 hover:bg-orange-500"
    >
      <CircleUserRound className="h-6 w-6" />
    </Link>
  )}
</div>
>>>>>>> f72ad46b94359cfcc17c13e567c87e8cbf783a1e

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-full text-white"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl text-white"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-700 to-orange-500 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <span className="font-bold text-xl">
                  SS Pathways
                </span>
              </Link>

              <button
                onClick={() => setOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 h-[80vh]">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    to={link.to}
                    className={`text-3xl font-semibold transition-colors ${
                      pathname === link.to
                        ? "text-orange-400"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-3 w-full px-6"
              >
                <Link
                  to="/recommend"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-3 font-semibold text-slate-900"
                >
                  Get Recommendations

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                
                {isLoggedIn ? (
                  <Link
                    to="/profile"
                    className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-white"
                  >
                    <CircleUserRound className="h-5 w-5" />
                    My Profile
                  </Link>
                ) : (
                  <div className="flex gap-3 w-full mt-2">
                    <Link
                      to="/login"
                      className="flex-1 text-center rounded-full border border-white/20 py-3 text-white font-semibold hover:bg-white/5 transition"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 text-center rounded-full bg-orange-500 py-3 text-white font-semibold hover:bg-orange-600 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
