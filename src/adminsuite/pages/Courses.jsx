import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Users,
  User,
  X,
  BookOpen,
  Image,
} from "lucide-react";

import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function CoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null = Add, object = Edit

  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    category: "Technology",
    mode: "Online",
    duration: "12 weeks",
    fees: "20000",
    instructor: "Sandeep Sharma",
    status: "Draft",
    image: "",
    overview: "Industry-grade curriculum with live projects and mentorship.",
    eligibility: "Open to all students.",
    highlights: "Live projects, Mentor support, Placement help",
  });

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      institution: "",
      category: "Technology",
      mode: "Online",
      duration: "12 weeks",
      fees: "20000",
      instructor: "Sandeep Sharma",
      status: "Draft",
      image: "",
      overview: "Industry-grade curriculum with live projects and mentorship.",
      eligibility: "Open to all students.",
      highlights: "Live projects, Mentor support, Placement help",
    });
    setShowModal(true);
  };

  const openEditModal = (c) => {
    setEditingCourse(c);
    setFormData({
      title: c.title,
      institution: c.institution || "",
      category: c.category,
      mode: c.mode,
      duration: c.duration,
      fees: c.fees,
      instructor: c.instructor,
      status: c.status,
      image: c.image || "",
      overview: c.overview || "",
      eligibility: c.eligibility || "",
      highlights: Array.isArray(c.highlights) ? c.highlights.join(", ") : c.highlights || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course from the catalog?")) {
      await deleteCourse(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    const payload = {
      ...formData,
      highlights: formData.highlights.split(",").map(h => h.trim()).filter(Boolean),
    };

    let res;
    if (editingCourse) {
      res = await updateCourse(editingCourse.id, payload);
    } else {
      res = await addCourse(payload);
    }

    if (res.success) {
      setShowModal(false);
    } else {
      alert(res.error || "Failed to save course.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Curate the catalog of EdTech programs offered on the platform."
        actions={
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Course
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-card group overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={c.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=60"}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

              <div className="absolute left-3 top-3">
                <span className="rounded-md border border-white/15 bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {c.category}
                </span>
              </div>

              <div className="absolute right-3 top-3">
                <StatusBadge status={c.status} />
              </div>
            </div>

            <div className="p-5 text-white">
              {c.institution && (
                <div className="text-[10px] uppercase tracking-wider text-orange font-semibold mb-1">
                  {c.institution}
                </div>
              )}
              <h3 className="text-base font-semibold leading-snug line-clamp-1">{c.title}</h3>

              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {c.overview}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
                <Meta Icon={Clock} value={c.duration} />
                <Meta Icon={Users} value={`${c.students || 0} enrolled`} />
                <Meta Icon={User} value={c.instructor ? c.instructor.split(" ")[0] : "Sandeep"} />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs border-t border-border pt-3">
                <div className="font-bold text-orange">
                  {c.fees === "Free" || c.fees === "0" ? "Free" : `₹${Number(c.fees).toLocaleString()}`}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">ID: {c.id}</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => openEditModal(c)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06] transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex items-center justify-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#071224] p-6 text-white shadow-2xl my-8"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <BookOpen className="text-orange h-5 w-5" />
                {editingCourse ? "Edit Course details" : "Add New Course"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">University / Institution Name</label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. SS Pathways Academy or Stanford University"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Course Title *</label>
                    <input
                      type="text" required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Full-Stack Web Development"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Computer Science, Design"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 6 months, 12 weeks"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Learning Mode</label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="h-10 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                    >
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-campus">On-campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Fees (INR) / 'Free' *</label>
                    <input
                      type="text" required
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      placeholder="e.g. 35000 or Free"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Instructor</label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      placeholder="e.g. Sandeep Sharma"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Publish Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="h-10 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Thumbnail / Image URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Overview / Description</label>
                    <textarea
                      rows={3}
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      placeholder="Provide a clear description of the course..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white outline-none focus:border-orange resize-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Eligibility Criteria</label>
                    <input
                      type="text"
                      value={formData.eligibility}
                      onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                      placeholder="e.g. 12th pass, anyone with programming familiarity"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Highlights (comma separated)</label>
                    <input
                      type="text"
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      placeholder="e.g. Live projects, Mentor support, Placement help"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 font-semibold text-white hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-orange py-3 font-semibold text-white hover:brightness-110 active:scale-95 transition shadow-lg shadow-orange/20"
                  >
                    {editingCourse ? "Save Changes" : "Create Course"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Meta({ Icon, value }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-1.5">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="truncate font-medium">{value}</span>
    </div>
  );
}

export default CoursesPage;