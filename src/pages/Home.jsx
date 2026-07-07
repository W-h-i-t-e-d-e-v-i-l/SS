import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  Layers,
  Compass,
  ListChecks,
  Rocket,
  Star,
  Quote,
  GraduationCap,
  BookOpen,
  Award,
  Users,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import SiteLayout from "../components/SiteLayout";
import CourseCard from "../components/CourseCard";
import { COURSES, INSTITUTIONS } from "../data/courses";
import { useAuth } from "../components/auth/AuthContext";

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const dur = 1600;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);

      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));

      if (p < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    openLogin,
    showLogin,
  } = useAuth();

  useEffect(() => {
  if (isLoggedIn) return;

  const timer = setTimeout(() => {
    openLogin();
  }, 6000);

  return () => clearTimeout(timer);
}, [isLoggedIn, openLogin]);

  return (
    <SiteLayout>
      <div
      className={`transition-all duration-500 ${
        showLogin
          ? "blur-md scale-[0.99] pointer-events-none"
          : ""
      }`}
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-white pt-32 pb-28">
        <FloatingShapes />

        <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Find the Right Course.
              <br />
              <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">
                Shape the Right Future.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-white/75 max-w-xl"
            >
              Discover admin-curated learning opportunities tailored to
              your ambitions, interests, and aspirations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/counselling");
                  } else {
                    openLogin("/counselling");
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-orange text-white px-6 py-3.5 font-semibold shadow-glow hover:scale-[1.03] transition-transform"
              >
                Get Free Counselling
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3.5 font-semibold hover:bg-white/15 transition-colors"
              >
                Explore Courses
              </Link>
            </motion.div>

            <div className="mt-12 flex items-center gap-7 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-orange" />
                4.9 student rating
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-orange" />
                100% verified
              </div>
            </div>
          </div>
                    <div className="lg:col-span-5 relative h-[460px] hidden lg:block">
            <FloatingCard
              className="top-2 left-2"
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              title="AI & ML Foundations"
              meta="IIT Madras · 4 months"
              delay={0}
            />

            <FloatingCard
              className="top-28 right-0"
              icon={<Award className="h-5 w-5 text-orange" />}
              title="Full-Stack Web Dev"
              meta="KIIT · Hybrid"
              delay={0.4}
            />

            <FloatingCard
              className="bottom-6 left-8"
              icon={<Users className="h-5 w-5 text-primary" />}
              title="Product Management"
              meta="edX · Online"
              delay={0.8}
            />
          </div>
        </div>
      </section>

      {/* INSTITUTIONS MARQUEE */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Explore Opportunities From Leading Institutions
          </h2>

          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Discover learning opportunities inspired by renowned educational
            institutions and providers.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 marquee group-hover:[animation-play-state:paused] w-max">
            {[...INSTITUTIONS, ...INSTITUTIONS].map((name, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card rounded-2xl shadow-soft border border-border px-7 py-5 min-w-[230px] hover:-translate-y-1 transition-transform"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <div className="font-semibold text-foreground">
                    {name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Verified Provider
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* STATS */}
      <section className="bg-background pt-8 pb-20">
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { n: 500, s: "+", label: "Verified Courses" },
            { n: 50, s: "+", label: "Learning Categories" },
            { n: 1000, s: "+", label: "Students Guided" },
            { n: 100, s: "%", label: "Curated Recommendations" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl bg-card-gradient border border-border shadow-soft p-6 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">
                <Counter to={stat.n} suffix={stat.s} />
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <span className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-primary">
              Why Choose SS ?
            </span>

            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
              A smarter way to choose what to learn next.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Target,
                t: "Personalized Recommendations",
                d: "Matches built around your goals, interests, and budget.",
              },
              {
                Icon: ShieldCheck,
                t: "Verified Courses",
                d: "Every course is admin-reviewed and quality-checked.",
              },
              {
                Icon: Rocket,
                t: "Career-Focused Learning",
                d: "Programs aligned with real-world career outcomes.",
              },
              {
                Icon: Layers,
                t: "Diverse Opportunities",
                d: "From design to AI — explore the full learning landscape.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-card p-7 shadow-soft border border-border"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary">
                  <feature.Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {feature.t}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-orange">
              How it works
            </span>

            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
              Three steps to your next chapter.
            </h2>
          </div>

          <div className="mt-16 relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary via-orange to-primary opacity-40" />

            {[
              {
                Icon: Compass,
                t: "Share Your Preferences",
                d: "Tell us your interests, budget and learning mode.",
              },
              {
                Icon: ListChecks,
                t: "Receive Tailored Recommendations",
                d: "We match you with curated, verified courses.",
              },
              {
                Icon: Rocket,
                t: "Begin Your Learning Journey",
                d: "Enroll, learn, and grow — confidently.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto h-24 w-24 rounded-full bg-cta grid place-items-center shadow-glow">
                  <step.Icon className="h-10 w-10 text-white" />

                  <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white text-primary font-bold grid place-items-center shadow-soft">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {step.t}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {step.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Featured</span>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold text-foreground">
                Handpicked courses for you.
              </h2>
            </div>
            <Link to="/courses" className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2 transition-all">
              View all courses <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
          <div className="mt-10">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
  >
              {COURSES.slice(0, 6).map((c, i) => (
                <SwiperSlide key={c.id}>
                  <CourseCard course={c} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy text-white py-24">
        <div className="absolute inset-0 bg-hero opacity-90" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Your Future Starts with the <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">Right Choice.</span>
          </h2>
          <p className="mt-5 text-white/75 max-w-xl mx-auto">
            Discover opportunities tailored to your ambitions.
          </p>
         <button
          onClick={() => {
            if (isLoggedIn) {
              navigate("/recommend");
            } else {
              openLogin("/recommend");
            }
          }}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 font-semibold text-white shadow-glow hover:scale-[1.03] transition-transform"
          >
            Start Your Journey <ArrowRight className="h-4 w-4"/>
          </button>
        </div>
      </section>
          </div>

    </SiteLayout>
  );
}

function FloatingShapes() {
  return (
    <>
      <motion.div
        className="absolute top-20 -left-16 h-64 w-64 rounded-full bg-orange/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-primary/40 blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  meta,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + delay }}
      className={`absolute glass rounded-2xl p-4 w-64 shadow-elegant float-slow text-foreground ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center">{icon}</div>
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">{meta}</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "78%" }}
          transition={{ duration: 1.4, delay: 0.6 + delay }}
          className="h-full bg-cta"
        />
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const data = [
    { q: "SS helped me pick the perfect data science path. I landed my first analyst role in 4 months.", a: "Ananya R.", role: "Data Analyst, Bengaluru" },
    { q: "The recommendation flow felt like a conversation. I finally chose a course with full clarity.", a: "Rohit K.", role: "Engineering Student, KIIT" },
    { q: "Every recommendation was verified and relevant. Saved me weeks of research.", a: "Meera S.", role: "UX Designer" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % data.length), 5000);
    return () => clearInterval(t);
  }, [data.length]);
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-orange">Loved by learners</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
          Stories from our students.
        </h2>
        <div className="mt-12 relative h-56">
          {data.map((t, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 12 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ pointerEvents: i === idx ? "auto" : "none" }}
            >
              <Quote className="h-8 w-8 text-orange/70" />
              <p className="mt-5 text-xl md:text-2xl text-foreground font-display leading-snug max-w-2xl">
                "{t.q}"
              </p>
              <div className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.a}</span> · {t.role}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
