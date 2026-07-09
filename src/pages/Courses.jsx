import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  TrendingUp,
  Monitor,
  BarChart3,
  Scale,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Heart,
  GitCompare,
  ChevronRight,
  Command as CommandIcon,
  Menu,
  Bell,
  X,
} from "lucide-react";
import {
  categories,
  programTypes,
  trendingChips,
  featuredUniversities,
  searchGroups,
} from "../lib/exploredata";
import { fadeUp, container, scaleIn, slideUp } from "../lib/motion.js";

/* ────────────────────────────────────────────── */
/*  ICON MAP                                     */
/* ────────────────────────────────────────────── */
const iconMap = {
  briefcase: Briefcase,
  code: Code2,
  cpu: Cpu,
  "trending-up": TrendingUp,
  monitor: Monitor,
  "bar-chart-3": BarChart3,
  scale: Scale,
  "graduation-cap": GraduationCap,
};

/* ────────────────────────────────────────────── */
/*  PAGE                                         */
/* ────────────────────────────────────────────── */
function ExploreCoursesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <ProgramTabs />
      <FeaturedUniversities />
      <UniversityMarquee />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  NAVBAR                                       */
/* ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel shadow-soft" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a href="/" className="flex items-center gap-2 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-elegant">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
            <span className="absolute inset-0 rounded-xl bg-gradient-primary blur-lg opacity-40 group-hover:opacity-60 transition" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Sarv <span className="text-primary">Shiksha</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
          {["Explore", "Universities", "Compare", "Counselling", "Blog"].map((l) => (
            <a
              key={l}
              href="#"
              className="relative py-1 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/70 px-4 py-2 text-sm font-medium hover:bg-secondary transition">
            <Bell className="h-4 w-4" /> Sign in
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:brightness-110 transition">
            Get started <ArrowRight className="h-4 w-4" />
          </button>
          <button className="md:hidden grid place-items-center h-10 w-10 rounded-full border border-border">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

/* ────────────────────────────────────────────── */
/*  HERO                                         */
/* ────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-hero overflow-hidden">
      {/* animated blobs */}
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl animate-blob" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute top-40 -right-24 h-[380px] w-[380px] rounded-full bg-gold/25 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center min-h-[70vh]">
        {/* LEFT */}
        <motion.div variants={container(0.14)} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 backdrop-blur px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> India's Premium Course Discovery
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.02] tracking-tight text-balance"
          >
            Find the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-primary bg-clip-text text-transparent">
                perfect course
              </span>
              <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  d="M2 8 Q 150 -2 298 8"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br className="hidden sm:block" /> for a career you love.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed">
            Compare 500+ premium degree programs across 100+ top Indian universities.
            Get personalised recommendations, transparent fees, and expert counselling — all in one place.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <HeroSearch />
          </motion.div>

          <motion.div variants={container(0.05, 0.4)} initial="hidden" animate="show" className="mt-6 flex flex-wrap gap-2">
            {trendingChips.slice(0, 8).map((c) => (
              <motion.button
                key={c}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group relative overflow-hidden rounded-full border border-border bg-surface-elevated/70 backdrop-blur px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-foreground hover:border-primary/40 hover:shadow-soft transition-all"
              >
                <span className="relative z-10">{c}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — floating cards */}
        <div className="relative h-[460px] md:h-[520px] hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-full w-full">
      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 top-8 w-72 rounded-3xl glass-panel shadow-elegant p-5 animate-float-slow"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-elegant">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Manipal University</div>
            <div className="text-xs text-ink-muted">Online MBA · UGC-DEB</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-gold/20 text-gold-foreground px-2 py-0.5 font-semibold">NAAC A+</span>
          <span className="flex items-center gap-1 text-ink-muted"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> 4.8 · 18k</span>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.4, delay: 0.5 }} className="h-full bg-gradient-primary" />
        </div>
      </motion.div>

      {/* secondary card */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-4 top-32 w-64 rounded-3xl bg-surface-elevated shadow-elegant p-5 animate-float-medium [animation-delay:-2s]"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">TRENDING</span>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-3 font-display font-bold text-lg leading-tight">
          M.Sc Data Science & AI
        </div>
        <div className="mt-1 text-xs text-ink-muted">2 Years · 100% Online</div>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">₹1.4L</span>
          <span className="text-xs text-ink-muted">total fees</span>
        </div>
        <button className="mt-4 w-full rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold py-2 shadow-elegant">
          Apply now
        </button>
      </motion.div>

      {/* floating icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
        className="absolute right-24 -top-2 h-14 w-14 grid place-items-center rounded-2xl bg-gradient-gold shadow-elegant animate-float-slow [animation-delay:-3s]"
      >
        <GraduationCap className="h-7 w-7 text-gold-foreground" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 180 }}
        className="absolute left-4 bottom-16 h-12 w-12 grid place-items-center rounded-2xl bg-surface-elevated shadow-elegant animate-float-medium"
      >
        <Award className="h-6 w-6 text-primary" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 180 }}
        className="absolute right-6 bottom-4 h-12 w-12 grid place-items-center rounded-2xl bg-surface-elevated shadow-elegant animate-float-slow [animation-delay:-4s]"
      >
        <BookOpen className="h-6 w-6 text-primary" />
      </motion.div>

      {/* stat pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="absolute left-16 bottom-8 rounded-2xl glass-panel shadow-elegant px-5 py-3 flex items-center gap-3"
      >
        <div className="flex -space-x-2">
          {[268, 55, 145, 320].map((h, i) => (
            <div key={i} style={{ background: `oklch(0.6 0.2 ${h})` }} className="h-8 w-8 rounded-full ring-2 ring-background" />
          ))}
        </div>
        <div>
          <div className="text-sm font-bold">25,000+ Students</div>
          <div className="text-xs text-ink-muted">already placed this year</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  HERO SEARCH — expanding dropdown              */
/* ────────────────────────────────────────────── */
function HeroSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef(null);

  useEffect(() => {
  const on = (e) => {
    if (
      wrapRef.current &&
      !wrapRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", on);

  return () => {
    document.removeEventListener("mousedown", on);
  };
}, []);

useEffect(() => {
  const on = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen(true);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  document.addEventListener("keydown", on);

  return () => {
    document.removeEventListener("keydown", on);
  };
}, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [
      ...searchGroups.universities.map((v) => ({ group: "Universities", value: v })),
      ...searchGroups.degrees.map((v) => ({ group: "Degrees", value: v })),
      ...searchGroups.trending.map((v) => ({ group: "Courses", value: v })),
    ];
    if (!q) return all;
    return all.filter((s) => s.value.toLowerCase().includes(q));
  }, [query]);

  return (
    <div ref={wrapRef} className="relative w-full max-w-2xl">
      <motion.div
        animate={{ scale: open ? 1.01 : 1, boxShadow: open ? "var(--shadow-elegant)" : "var(--shadow-soft)" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 rounded-2xl border border-border bg-surface-elevated pl-4 pr-2 py-2"
      >
        <Search className="h-5 w-5 text-ink-muted shrink-0" />
        <input
          onFocus={() => setOpen(true)}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
          }}
          type="text"
          placeholder="Search universities, courses, specializations…"
          className="flex-1 bg-transparent outline-none py-2.5 text-base placeholder:text-ink-muted min-w-0"
        />
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-secondary/70 px-1.5 py-0.5 text-[10px] font-mono text-ink-muted">
          <CommandIcon className="h-3 w-3" />K
        </kbd>
        <button className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 shadow-elegant hover:brightness-110 transition">
          Search <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-40 mt-2 w-full rounded-2xl border border-border bg-popover shadow-elegant overflow-hidden"
          >
            <div className="max-h-[420px] overflow-y-auto p-2">
              {!query && (
                <>
                  <SearchGroup title="Recent Searches" items={searchGroups.recent} icon={Clock} />
                  <SearchGroup title="Trending Courses" items={searchGroups.trending} icon={TrendingUp} highlight />
                  <SearchGroup title="Popular Universities" items={searchGroups.universities} icon={Award} />
                  <SearchGroup title="Popular Degrees" items={searchGroups.degrees} icon={GraduationCap} />
                </>
              )}
              {query && (
                <div className="p-1">
                  {suggestions.length === 0 && (
                    <div className="text-sm text-ink-muted px-3 py-6 text-center">No matches. Try a different keyword.</div>
                  )}
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s.group + s.value}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                        activeIdx === i ? "bg-secondary" : "hover:bg-secondary/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-ink-muted" />
                        <span className="text-sm font-medium">{s.value}</span>
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">{s.group}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchGroup({
  title,
  items,
  icon: Icon,
  highlight = false,
}) {
  return (
    <div className="p-1">
      <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-[11px] uppercase tracking-wider font-semibold text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>

      {items.map((v) => (
        <button
          key={v}
          className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <span
              className={`h-2 w-2 rounded-full ${
                highlight ? "bg-gold" : "bg-primary/60"
              }`}
            />
            <span className="text-sm font-medium">{v}</span>
          </span>

          <ChevronRight className="h-4 w-4 translate-x-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 text-ink-muted" />
        </button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  COUNTER                                      */
/* ────────────────────────────────────────────── */
function Counter({ to, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────── */
/*  STATS                                        */
/* ────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { end: 100, suffix: "+", label: "Universities", icon: Award },
    { end: 500, suffix: "+", label: "Courses", icon: BookOpen },
    { end: 25000, suffix: "+", label: "Students Guided", icon: GraduationCap },
    { end: 95, suffix: "%", label: "Student Satisfaction", icon: Star },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative -mt-4 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container(0.1)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 rounded-3xl glass-panel shadow-card p-4 md:p-6"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl bg-gradient-card p-5 md:p-6 border border-border/60"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-ink-muted">
                  <Icon className="h-4 w-4 text-primary" /> {s.label}
                </div>
                
                <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-ink font-display">
                  <Counter to={s.end} suffix={s.suffix} />
                </div>

                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */
/*  CATEGORIES — horizontal scroll               */
/* ────────────────────────────────────────────── */
function Categories() {
  const scroller = useRef(null);
  const scrollBy = (dx) => {
  scroller.current?.scrollBy({
    left: dx,
    behavior: "smooth",
  });
};

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Degree categories"
          title="Explore by what you want to become"
          subtitle="From MBA to Data Science — discover programs curated by career outcomes and industry demand."
          right={
            <div className="hidden md:flex gap-2">
              <button onClick={() => scrollBy(-360)} className="h-10 w-10 grid place-items-center rounded-full border border-border bg-surface-elevated hover:bg-secondary transition">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => scrollBy(360)} className="h-10 w-10 grid place-items-center rounded-full border border-border bg-surface-elevated hover:bg-secondary transition">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          }
        />

        <div
          ref={scroller}
          className="mt-10 flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4"
        >
          {categories.map((c, i) => (
            <CategoryCard key={c.id} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ c, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const Icon = iconMap[c.icon] || BookOpen;
  return (
    <motion.a
      ref={ref}
      href="#"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative shrink-0 snap-start w-[280px] md:w-[300px] rounded-3xl bg-gradient-card border border-border p-6 shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(400px 200px at 0% 0%, oklch(0.6 0.2 ${c.accent} / 0.15), transparent 60%)` }}
      />
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px oklch(0.6 0.2 ${c.accent} / 0.4)` }}
      />
      <div
        className="h-12 w-12 rounded-2xl grid place-items-center shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `linear-gradient(135deg, oklch(0.5 0.2 ${c.accent}), oklch(0.7 0.2 ${c.accent}))` }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold">{c.name}</h3>
      <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider mt-0.5">{c.short}</div>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed">{c.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{c.universities} universities</span>
        <span className="grid place-items-center h-8 w-8 rounded-full bg-secondary group-hover:bg-primary transition-colors">
          <ArrowRight className="h-4 w-4 text-foreground group-hover:text-primary-foreground transition-colors" />
        </span>
      </div>
    </motion.a>
  );
}

/* ────────────────────────────────────────────── */
/*  PROGRAM TABS                                 */
/* ────────────────────────────────────────────── */
function ProgramTabs() {
  const [active, setActive] = useState(0);
  return (
    <section className="pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex gap-1 overflow-x-auto rounded-2xl glass-panel p-1.5 shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {programTypes.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-xl px-4 md:px-6 py-2.5 text-sm font-semibold transition-colors ${
                active === i ? "text-primary-foreground" : "text-ink-muted hover:text-foreground"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="program-tab"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-gradient-primary shadow-elegant"
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */
/*  FEATURED UNIVERSITIES                        */
/* ────────────────────────────────────────────── */
function FeaturedUniversities() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured universities"
          title="Top-ranked institutions, hand-picked"
          subtitle="UGC-entitled, NAAC accredited universities with proven placement records and academic excellence."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUniversities.map((u, i) => (
            <UniversityCard key={u.id} u={u} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UniversityCard({ u, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [wish, setWish] = useState(false);
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl bg-surface-elevated border border-border shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden flex flex-col"
    >
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, oklch(${u.bannerFrom}), oklch(${u.bannerTo}))` }}
        />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex gap-1.5">
          <Badge>NAAC {u.naac}</Badge>
          {u.ugc && <Badge>UGC-DEB</Badge>}
          {u.nirf && <Badge tone="gold">NIRF #{u.nirf}</Badge>}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); setWish((w) => !w); }}
          className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full glass-panel hover:scale-110 transition"
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 transition ${wish ? "fill-destructive text-destructive" : "text-white"}`} />
        </button>

        {/* Logo */}
        <div
          className="absolute -bottom-6 left-5 h-14 w-14 rounded-2xl grid place-items-center font-display font-extrabold text-white shadow-elegant ring-4 ring-surface-elevated"
          style={{ background: `linear-gradient(135deg, oklch(${u.logoColor}), oklch(0.75 0.15 ${u.logoColor.split(" ")[2]}))` }}
        >
          {u.short.slice(0, 3)}
        </div>
      </div>

      <div className="p-5 pt-9 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-lg leading-tight">{u.name}</h3>
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {u.location}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {u.rating} · {(u.reviews / 1000).toFixed(1)}k</span>
        </div>
        <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-2">{u.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <MetricPill label="Fees" value={`₹${(u.feeMin / 1000).toFixed(0)}k+`} />
          <MetricPill label="Duration" value={u.duration} />
          <MetricPill label="Mode" value={u.mode.split(" ")[0]} />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button className="flex-1 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold py-2.5 shadow-elegant hover:brightness-110 transition inline-flex items-center justify-center gap-1.5">
            Apply now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button className="rounded-xl border border-border bg-surface-elevated hover:bg-secondary text-sm font-semibold py-2.5 px-3 transition inline-flex items-center gap-1.5">
            <GitCompare className="h-4 w-4" /> Compare
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Badge({ children, tone = "default" }) {
  return (
    <span
      className={`rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 backdrop-blur ${
        tone === "gold" ? "bg-gold/90 text-gold-foreground" : "bg-white/90 text-primary"
      }`}
    >
      {children}
    </span>
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="rounded-xl bg-secondary/60 border border-border/60 py-2">
      <div className="text-[10px] uppercase tracking-wider font-semibold text-ink-muted">{label}</div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  MARQUEE                                      */
/* ────────────────────────────────────────────── */
function UniversityMarquee() {
  const items = [...featuredUniversities, ...featuredUniversities];
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="More partners"
          title="100+ universities you can trust"
          subtitle="Hover to pause. Drag to browse."
        />
      </div>
      <div className="mt-10 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] w-max">
          {items.map((u, i) => (
            <div
              key={`${u.id}-${i}`}
              className="shrink-0 w-72 rounded-2xl bg-surface-elevated border border-border shadow-card p-4 flex items-center gap-4 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center font-display font-extrabold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, oklch(${u.logoColor}), oklch(0.75 0.15 ${u.logoColor.split(" ")[2]}))` }}
              >
                {u.short.slice(0, 3)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{u.name}</div>
                <div className="text-xs text-ink-muted flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" /> {u.rating} · NAAC {u.naac}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */
/*  FINAL CTA                                    */
/* ────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative overflow-hidden rounded-4xl bg-gradient-primary p-10 md:p-16 shadow-elegant"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/40 blur-3xl animate-blob" />
          <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl animate-blob [animation-delay:-8s]" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight text-balance">
              Not sure where to start? Talk to a counsellor — free.
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              Get a personalised course roadmap in 15 minutes based on your goals, budget, and career interests.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-surface-elevated text-foreground text-sm font-semibold px-5 py-3 shadow-elegant hover:brightness-105 transition">
                Book free counselling <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 text-primary-foreground text-sm font-semibold px-5 py-3 hover:bg-primary-foreground/10 transition">
                Download prospectus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */
/*  FOOTER                                       */
/* ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-gradient-primary grid place-items-center">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-foreground">Sarv Shiksha</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────── */
/*  SECTION HEADER                               */
/* ────────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  right,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="flex items-end justify-between gap-6 flex-wrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">{eyebrow}</div>
        <h2 className="mt-2 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-balance leading-tight">
          {title}
        </h2>
        {subtitle && <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed">{subtitle}</p>}
      </motion.div>
      {right}
    </div>
  );
}
export default ExploreCoursesPage;
