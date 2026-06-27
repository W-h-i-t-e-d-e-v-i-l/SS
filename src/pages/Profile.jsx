import { motion } from "framer-motion";
import SiteLayout from "../components/SiteLayout";

import {
  Bell,
  Settings,
  Mail,
  Phone,
  MapPin,
  User,
  Target,
  Pencil,
  BookOpen,
  Calendar,
  Bookmark,
  ShieldCheck,
  Crown,
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap,
  MessageSquareHeart,
  LifeBuoy,
  X,
  Play,
  KeyRound,
  Smartphone,
  Lock,
  BellRing,
  LogOut,
} from "lucide-react";

const activityIcons = {
  calendar: Calendar,
  book: BookOpen,
  check: CheckCircle2,
  bookmark: Bookmark,
  compass: Compass,
};

const user = {
  name: "Abhijit Behura",
  role: "Student",
  email: "abhijit@example.com",
  phone: "+91 9876543210",
  memberSince: "2026",

  goals: "Become a Quantity Surveying Engineer",
  location: "Bhubaneswar, Odisha",

  stats: {
    courses: 24,
    sessions: 3,
    saved: 8,
  },
};

const recommended = [
  {
    title: "Quantity Surveying",
    provider: "SS Pathways",
    progress: 65,
  },
  {
    title: "Tendering & Billing",
    provider: "SS Pathways",
    progress: 35,
  },
];

const booked = [
  {
    title: "Career Counselling",
    date: "28 June 2026",
    mentor: "SS Expert",
  },
];

const activities = [
  {
    icon: "calendar",
    label: "Booked a counselling session",
    time: "Today",
  },
  {
    icon: "book",
    label: "Saved Quantity Surveying Course",
    time: "Yesterday",
  },
];

const savedCourses = [
  {
    title: "Quantity Surveying Masterclass",
    provider: "SS Pathways",
    hue: "from-[#2563EB] to-[#F97316]",
  },
];

function ProfilePage() {
  return (
    <SiteLayout>
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-orange-50/30">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#F97316]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold text-[#2563EB] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> SS Pathways
            </div>
            <h1 className="truncate bg-gradient-to-r from-slate-900 via-[#2563EB] to-[#1d4ed8] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              My Profile
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
              Manage your account, personal details and learning journey.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <IconBtn><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-white" /></IconBtn>
            <IconBtn><Settings className="h-5 w-5" /></IconBtn>
          </div>
        </motion.header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-7 shadow-xl backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#2563EB] via-[#3b6df0] to-[#F97316] opacity-90" />
              <div className="relative flex flex-col items-center pt-8 text-center">
                <div className="relative">
                    <img
                        src="https://i.pravatar.cc/200"
                        alt="Profile"
                        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
                    />

                    <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg">
                        <Pencil className="h-4 w-4" />
                    </button>
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">{user.name}</h2>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#2563EB]/10 to-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                  <GraduationCap className="h-3.5 w-3.5" /> {user.role}
                </span>
                <div className="mt-5 w-full space-y-2.5 text-left">
                  <Detail icon={<Mail className="h-4 w-4" />} value={user.email} />
                  <Detail icon={<Phone className="h-4 w-4" />} value={user.phone} />
                  <Detail icon={<Calendar className="h-4 w-4" />} value={`Member since ${user.memberSince}`} />
                </div>

                <div className="mt-6 grid w-full grid-cols-3 gap-2">
                  <Stat icon={<BookOpen className="h-4 w-4" />} value={user.stats.courses} label="Explored" />
                  <Stat icon={<MessageSquareHeart className="h-4 w-4" />} value={user.stats.sessions} label="Sessions" />
                  <Stat icon={<Bookmark className="h-4 w-4" />} value={user.stats.saved} label="Saved" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3b6df0] to-[#F97316] px-5 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] transition hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)]"
                >
                  <Pencil className="h-4 w-4" /> Edit Profile
                </motion.button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
<main className="space-y-6">
  {/* Personal Info */}
  <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-[#2563EB]" />
        <h2 className="text-lg font-bold text-slate-900">
          Personal Information
        </h2>
      </div>

      <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]">
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
    </div>

    <div className="grid gap-3 sm:grid-cols-2">
      <Field
        icon={<User className="h-4 w-4" />}
        label="Full Name"
        value={user.name}
      />

      <Field
        icon={<Mail className="h-4 w-4" />}
        label="Email"
        value={user.email}
      />

      <Field
        icon={<Phone className="h-4 w-4" />}
        label="Phone Number"
        value={user.phone}
      />

      <Field
        icon={<GraduationCap className="h-4 w-4" />}
        label="Role"
        value={user.role}
      />

      <Field
        icon={<Target className="h-4 w-4" />}
        label="Career Goals"
        value={user.goals}
        full
      />

      <Field
        icon={<MapPin className="h-4 w-4" />}
        label="Location"
        value={user.location}
      />
    </div>

  </div>

            {/* Account Status */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Account Status
    </h2>
  </div>

  <div className="flex flex-wrap gap-2.5">
    <Badge
      icon={<Mail className="h-3.5 w-3.5" />}
      label="Email Verified"
      tone="emerald"
    />

    <Badge
      icon={<Phone className="h-3.5 w-3.5" />}
      label="Phone Verified"
      tone="emerald"
    />

    <Badge
      icon={<CheckCircle2 className="h-3.5 w-3.5" />}
      label="Active Member"
      tone="blue"
    />

    <Badge
      icon={<Crown className="h-3.5 w-3.5" />}
      label="Premium Guidance"
      tone="orange"
    />
  </div>

</div>

            {/* Learning Journey */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <Compass className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Learning Journey
    </h2>
  </div>

  <div className="grid gap-4 md:grid-cols-3">

    <JourneyCard
      title="Recommended"
      subtitle={`${recommended.length} curated picks`}
      hue="from-blue-500 to-indigo-600"
      icon={<Sparkles className="h-5 w-5" />}
    >
      {recommended.slice(0, 2).map((c) => (
        <ProgressRow
          key={c.title}
          title={c.title}
          provider={c.provider}
          progress={c.progress}
        />
      ))}
    </JourneyCard>

    <JourneyCard
      title="Counselling"
      subtitle={`${booked.length} upcoming`}
      hue="from-orange-500 to-rose-500"
      icon={<MessageSquareHeart className="h-5 w-5" />}
    >
      {booked.map((b) => (
        <div
          key={b.title}
          className="rounded-xl border border-slate-100 bg-white/60 p-2.5"
        >
          <p className="truncate text-xs font-semibold text-slate-800">
            {b.title}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-500">
            {b.date}
          </p>

          <p className="text-[11px] text-[#2563EB]">
            with {b.mentor}
          </p>
        </div>
      ))}
    </JourneyCard>

    <JourneyCard
      title="Progress"
      subtitle="Overall Completion"
      hue="from-emerald-500 to-teal-600"
      icon={<CheckCircle2 className="h-5 w-5" />}
    >
      <ProgressRow
        title="Quantity Surveying"
        provider="Track"
        progress={64}
      />

      <ProgressRow
        title="Career Roadmap"
        provider="Track"
        progress={42}
      />
    </JourneyCard>

  </div>

</div>

            {/* Learning Journey */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <Compass className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Learning Journey
    </h2>
  </div>

  <div className="grid gap-4 md:grid-cols-3">

    <JourneyCard
      title="Recommended"
      subtitle={`${recommended.length} curated picks`}
      hue="from-blue-500 to-indigo-600"
      icon={<Sparkles className="h-5 w-5" />}
    >
      {recommended.slice(0, 2).map((c) => (
        <ProgressRow
          key={c.title}
          title={c.title}
          provider={c.provider}
          progress={c.progress}
        />
      ))}
    </JourneyCard>

    <JourneyCard
      title="Counselling"
      subtitle={`${booked.length} upcoming`}
      hue="from-orange-500 to-rose-500"
      icon={<MessageSquareHeart className="h-5 w-5" />}
    >
      {booked.map((b) => (
        <div
          key={b.title}
          className="rounded-xl border border-slate-100 bg-white/60 p-2.5"
        >
          <p className="truncate text-xs font-semibold text-slate-800">
            {b.title}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-500">
            {b.date}
          </p>

          <p className="text-[11px] text-[#2563EB]">
            with {b.mentor}
          </p>
        </div>
      ))}
    </JourneyCard>

    <JourneyCard
      title="Progress"
      subtitle="Overall completion"
      hue="from-emerald-500 to-teal-600"
      icon={<CheckCircle2 className="h-5 w-5" />}
    >
      <ProgressRow
        title="Quantity Surveying"
        provider="Track"
        progress={64}
      />

      <ProgressRow
        title="Career Roadmap"
        provider="Track"
        progress={42}
      />
    </JourneyCard>

  </div>

</div>

            {/* Quick Actions */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <Sparkles className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Quick Actions
    </h2>
  </div>

  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

    <Action
      icon={<MessageSquareHeart className="h-5 w-5" />}
      title="Book Counselling"
      desc="1:1 expert guidance"
      hue="from-[#2563EB] to-indigo-600"
    />

    <Action
      icon={<BookOpen className="h-5 w-5" />}
      title="Explore Courses"
      desc="Browse 500+ programs"
      hue="from-[#F97316] to-rose-500"
    />

    <Action
      icon={<Sparkles className="h-5 w-5" />}
      title="Get Recommendations"
      desc="AI-curated for you"
      hue="from-emerald-500 to-teal-600"
    />

    <Action
      icon={<LifeBuoy className="h-5 w-5" />}
      title="Contact Support"
      desc="We're here 24/7"
      hue="from-violet-500 to-fuchsia-600"
    />

  </div>

</div>

            {/* Saved Courses */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <Bookmark className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Saved Courses
    </h2>
  </div>

  <div className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
    {savedCourses.map((c, i) => (
      <motion.div
        key={c.title}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.06 }}
        whileHover={{ y: -4 }}
        className="group w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm transition hover:shadow-xl"
      >
        <div className={`relative h-32 bg-gradient-to-br ${c.hue}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />

          <Play className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-white/30 p-1.5 text-white backdrop-blur" />
        </div>

        <div className="p-3.5">
          <p className="truncate text-sm font-bold text-slate-900">
            {c.title}
          </p>

          <p className="text-[11px] text-slate-500">
            {c.provider}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button className="flex-1 rounded-lg bg-[#2563EB] py-1.5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]">
              Continue
            </button>

            <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:text-rose-500">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>

</div>

            {/* Security */}
<div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

  <div className="mb-6 flex items-center gap-2">
    <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
    <h2 className="text-lg font-bold text-slate-900">
      Security & Privacy
    </h2>
  </div>

  <div className="grid gap-3 sm:grid-cols-2">

    <SecBtn
      icon={<KeyRound className="h-4 w-4" />}
      label="Change Password"
    />

    <SecBtn
      icon={<Smartphone className="h-4 w-4" />}
      label="Manage Login Devices"
    />

    <SecBtn
      icon={<Lock className="h-4 w-4" />}
      label="Privacy Settings"
    />

    <SecBtn
      icon={<BellRing className="h-4 w-4" />}
      label="Notification Preferences"
    />

  </div>

</div>

            {/* Logout */}
<div className="rounded-3xl border border-rose-100/80 bg-gradient-to-br from-white/80 to-rose-50/60 p-6 shadow-xl backdrop-blur-xl">
  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <h3 className="text-base font-bold text-slate-900">
        Sign out of SS Pathways
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        You can securely log out of your account at any time.
      </p>
    </div>

    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-[#F97316] hover:bg-[#F97316] hover:text-white hover:shadow-lg"
      onClick={() => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
      }}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </motion.button>
  </div>
</div>

</main>
</div>
</div>
</div>
</SiteLayout>
);
}

/* ---------- atoms ---------- */

function IconBtn({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/60 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition hover:text-[#2563EB] hover:shadow-md"
    >
      {children}
    </motion.button>
  );
}

function Detail({ icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2 text-xs text-slate-600">
      <span className="text-[#2563EB]">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-white to-blue-50/60 p-3 text-center shadow-sm">
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">{icon}</div>
      <p className="mt-1.5 text-lg font-extrabold text-slate-900">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}

function Field({
  icon, label, value, full,
}) {
  return (
    <div className={`group rounded-2xl border border-slate-100 bg-white/70 p-3.5 transition hover:border-[#2563EB]/40 hover:shadow-sm ${full ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="text-[#2563EB]">{icon}</span> {label}
      </div>
      <p className="mt-1.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function Badge({ icon, label, tone }) {
  const tones = {
    emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-700 ring-emerald-200",
    blue: "from-[#2563EB]/15 to-[#2563EB]/5 text-[#2563EB] ring-blue-200",
    orange: "from-[#F97316]/15 to-[#F97316]/5 text-[#c2410c] ring-orange-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-3.5 py-1.5 text-xs font-semibold ring-1 ${tones[tone]}`}>
      <CheckCircle2 className="h-3.5 w-3.5" /> {icon} {label}
    </span>
  );
}

function JourneyCard({
  title, subtitle, hue, icon, children,
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm transition hover:shadow-lg">
      <div className="mb-3 flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${hue} text-white shadow`}>{icon}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{title}</p>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2.5">{children}</div>
    </motion.div>
  );
}

function ProgressRow({ title, provider, progress }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="min-w-0 truncate font-semibold text-slate-800">{title}</span>
        <span className="shrink-0 text-[10px] text-slate-400">{progress}%</span>
      </div>
      <p className="text-[10px] text-slate-400">{provider}</p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#F97316]"
        />
      </div>
    </div>
  );
}

function Action({ icon, title, desc, hue }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-4 text-left shadow-sm transition hover:shadow-xl"
    >
      <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${hue} text-white shadow-md`}>{icon}</div>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{desc}</p>
      <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2563EB]" />
    </motion.button>
  );
}

function SecBtn({ icon, label }) {
  return (
    <motion.button
      whileHover={{ x: 3 }}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#2563EB]/40 hover:bg-white"
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-[#2563EB]" />
    </motion.button>
  );
}

export default ProfilePage;