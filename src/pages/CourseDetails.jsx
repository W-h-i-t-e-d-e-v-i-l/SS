import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Clock,
  IndianRupee,
  Monitor,
  ShieldCheck,
  X,
  Check,
} from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { useData } from "../context/DataContext";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses, settings } = useData();

  const course = courses.find((course) => course.id === id);

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <SiteLayout>
      <section className="relative pt-28 pb-12 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" />

        <div className="relative mx-auto max-w-7xl px-5">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to courses
          </Link>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                {course.category}
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight"
              >
                {course.title}
              </motion.h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {course.institution}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Monitor className="h-4 w-4" />
                  {course.mode}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-orange" />
                  Admin verified
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={course.image}
                alt={course.title}
                className="w-full aspect-[16/10] object-cover rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Course overview
              </h2>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {course.overview}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">
                What you'll get
              </h2>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {course.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 shadow-soft"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">
                Eligibility
              </h2>

              <p className="mt-3 text-muted-foreground">
                {course.eligibility}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-card-gradient border border-border shadow-elegant p-6">
              <div className="text-sm text-muted-foreground">
                Total fees
              </div>

              <div className="mt-1 font-display text-4xl font-bold text-foreground flex items-center">
                {course.fees !== "Free" && (
                  <IndianRupee className="h-7 w-7" />
                )}

                <span>
                  {course.fees === "Free"
                    ? "Free"
                    : course.fees.replace("₹", "")}
                </span>
              </div>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Institution
                  </span>

                  <span className="font-medium">
                    {course.institution}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Duration
                  </span>

                  <span className="font-medium">
                    {course.duration}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Mode
                  </span>

                  <span className="font-medium">
                    {course.mode}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Level
                  </span>

                  <span className="font-medium">
                    {course.level}
                  </span>
                </li>
              </ul>

              <button
                onClick={() => setShowDetailsModal(true)}
                className="mt-6 w-full rounded-xl bg-cta text-white font-semibold py-3.5 shadow-glow hover:scale-[1.02] transition-transform uppercase"
              >
                Get More Details
              </button>

              <Link
                to="/recommend"
                className="mt-3 w-full inline-flex justify-center rounded-xl bg-secondary text-foreground font-semibold py-3 hover:bg-primary/10 transition-colors"
              >
                Get similar recommendations
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#071224] p-6 text-white shadow-2xl">
            <button
              onClick={closeDetailsModal}
              className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-xl font-bold text-white">Get More Details</h3>
                <p className="mt-2 text-sm text-white/60">
                  Choose how you'd like to connect with our admissions and counselling team for <span className="font-semibold text-white">{course.title}</span>:
                </p>
              </div>

              <div className="space-y-4">
                {/* Book Counselling Option */}
                <Link
                  to="/counselling"
                  className="block group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-orange hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange/10 text-orange rounded-xl group-hover:scale-110 transition-transform">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-base">Book Free Counselling</p>
                      <p className="text-xs text-white/50 mt-0.5">Schedule a 1-on-1 private session with our counselors.</p>
                    </div>
                  </div>
                </Link>

                {/* WhatsApp Option */}
                <a
                  href={`https://wa.me/${(settings?.contact?.phone || "919876543210").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi, I would like to get more details about the course: ${course.title} (Institution: ${course.institution || "SS Pathways"}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500 hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-base">Connect on WhatsApp</p>
                      <p className="text-xs text-white/50 mt-0.5">Chat instantly with our admissions team on WhatsApp.</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}