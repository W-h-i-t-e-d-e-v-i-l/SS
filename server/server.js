import express from "express";
import cors from "cors";
import { readDB, writeDB } from "./db.js";
import { sendSMSOTP, verifySMSOTP } from "./sms.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Courses CRUD
app.get("/api/courses", async (req, res) => {
    const db = await readDB();
    res.json(db.courses);
});

app.post("/api/courses", async (req, res) => {
    const db = await readDB();
    const {
        title,
        institution,
        category,
        mode,
        duration,
        fees,
        image,
        overview,
        eligibility,
        highlights,
        level,
        budget,
        instructor,
        status
    } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Course title is required" });
    }

    // Generate ID based on title
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "course-" + Math.random().toString(36).substring(2, 7);

    const newCourse = {
        id,
        title,
        institution: institution || "SS Pathways Academy",
        category: category || "General",
        mode: mode || "Online",
        duration: duration || "Self-paced",
        fees: fees || "Free",
        budget: budget || "Medium",
        level: level || "Beginner",
        image: image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=60",
        overview: overview || "Learn this program with live projects and mentorship.",
        eligibility: eligibility || "Open to all students.",
        highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(",").map(h => h.trim()) : ["Live Projects", "Certificate"]),
        students: 0,
        instructor: instructor || "Sandeep Sharma",
        status: status || "Draft"
    };

    db.courses.push(newCourse);
    await writeDB(db);
    res.status(201).json(newCourse);
});

app.put("/api/courses/:id", async (req, res) => {
    const db = await readDB();
    const index = db.courses.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Course not found" });
    }

    const existing = db.courses[index];
    const {
        title,
        institution,
        category,
        mode,
        duration,
        fees,
        image,
        overview,
        eligibility,
        highlights,
        level,
        budget,
        instructor,
        status,
        students
    } = req.body;

    db.courses[index] = {
        ...existing,
        title: title !== undefined ? title : existing.title,
        institution: institution !== undefined ? institution : existing.institution,
        category: category !== undefined ? category : existing.category,
        mode: mode !== undefined ? mode : existing.mode,
        duration: duration !== undefined ? duration : existing.duration,
        fees: fees !== undefined ? fees : existing.fees,
        budget: budget !== undefined ? budget : existing.budget,
        level: level !== undefined ? level : existing.level,
        image: image !== undefined ? image : existing.image,
        overview: overview !== undefined ? overview : existing.overview,
        eligibility: eligibility !== undefined ? eligibility : existing.eligibility,
        highlights: highlights !== undefined
            ? (Array.isArray(highlights) ? highlights : highlights.split(",").map(h => h.trim()))
            : existing.highlights,
        instructor: instructor !== undefined ? instructor : existing.instructor,
        status: status !== undefined ? status : existing.status,
        students: students !== undefined ? Number(students) : existing.students
    };

    await writeDB(db);
    res.json(db.courses[index]);
});

app.delete("/api/courses/:id", async (req, res) => {
    const db = await readDB();
    const initialLength = db.courses.length;
    db.courses = db.courses.filter(c => c.id !== req.params.id);

    if (db.courses.length === initialLength) {
        return res.status(404).json({ error: "Course not found" });
    }

    await writeDB(db);
    res.json({ success: true, message: "Course deleted successfully" });
});

// 2. Leads Management
app.get("/api/leads", async (req, res) => {
    const db = await readDB();
    res.json(db.leads);
});

app.post("/api/leads", async (req, res) => {
    const db = await readDB();
    const { name, email, phone, service, notes } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newLead = {
        id: "LD-" + (1000 + db.leads.length),
        name,
        phone: phone || "Not provided",
        email: email || "",
        service: service || "General Inquiry",
        date: new Date().toISOString().slice(0, 10),
        status: "New",
        notes: notes || "Submitted via website form."
    };

    db.leads.unshift(newLead);
    await writeDB(db);
    res.status(201).json(newLead);
});

// Update Lead Status (Requested feature: when one changes the label, it gets updated in that column only)
app.patch("/api/leads/:id/status", async (req, res) => {
    const db = await readDB();
    const lead = db.leads.find(l => l.id === req.params.id);

    if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
    }

    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    lead.status = status;
    await writeDB(db);
    res.json(lead);
});

// Update Lead Notes
app.patch("/api/leads/:id/notes", async (req, res) => {
    const db = await readDB();
    const lead = db.leads.find(l => l.id === req.params.id);

    if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
    }

    const { notes } = req.body;
    if (notes === undefined) {
        return res.status(400).json({ error: "Notes field is required" });
    }

    lead.notes = notes;
    await writeDB(db);
    res.json(lead);
});

// 3. Counselling Bookings
app.get("/api/bookings", async (req, res) => {
    const db = await readDB();
    res.json(db.bookings);
});

app.post("/api/bookings", async (req, res) => {
    const db = await readDB();
    const { name, email, phone, date, time, notes } = req.body;

    if (!name || !phone || !date || !time) {
        return res.status(400).json({ error: "Name, phone, date, and time are required" });
    }

    const formattedDate = typeof date === "string" ? date.slice(0, 10) : new Date(date).toISOString().slice(0, 10);

    // Duplication Check: Prevent booking if there's an existing booking with the same phone, date, and time
    const isDuplicate = db.bookings.some(
        b => b.phone === phone && b.date === formattedDate && b.time === time
    );
    if (isDuplicate) {
        return res.status(400).json({ error: "A booking already exists for this number, date, and time slot." });
    }

    const newBooking = {
        id: "BK-" + (2000 + db.bookings.length),
        student: name,
        phone,
        date: formattedDate,
        time,
        counsellor: "Dr. Anil Verma", // Default counsellor
        status: "Pending",
        notes: notes || ""
    };

    db.bookings.unshift(newBooking);

    // Synchronize as a website lead
    const newLead = {
        id: "LD-" + (1000 + db.leads.length),
        name,
        phone,
        email: email || "",
        service: "Counselling",
        date: new Date().toISOString().slice(0, 10),
        status: "New",
        notes: `Booked session for ${formattedDate} at ${time}. ${notes || ""}`
    };
    db.leads.unshift(newLead);

    await writeDB(db);
    res.status(201).json(newBooking);
});

// 4. Onboarding Accounts
app.get("/api/accounts", async (req, res) => {
    const db = await readDB();
    res.json(db.users);
});

app.post("/api/accounts", async (req, res) => {
    const db = await readDB();
    const { role, email, password, phone, goals, name, location, avatar } = req.body;

    if (!email || !phone || !role) {
        return res.status(400).json({ error: "Email, phone, and role are required" });
    }

    // Check if account already exists
    const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(200).json(existingUser); // return existing
    }

    // Derive name from email if not provided
    const nameParts = email.split("@")[0].split(/[._+-]+/);
    const derivedName = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

    const newAccount = {
        id: "US-" + (3000 + db.users.length),
        role,
        email,
        phone,
        password: password || "123456",
        goals: goals || "Not specified",
        name: name || derivedName,
        location: location || "Bhubaneswar, India",
        avatar: avatar || "https://i.pravatar.cc/200",
        created_at: new Date().toISOString().slice(0, 10)
    };

    db.users.push(newAccount);

    // Also record this signup as a lead
    const newLead = {
        id: "LD-" + (1000 + db.leads.length),
        name: name || derivedName,
        phone,
        email,
        service: `Onboarding (${role})`,
        date: new Date().toISOString().slice(0, 10),
        status: "New",
        notes: `User signed up. Goals: ${goals || "None stated"}`
    };
    db.leads.unshift(newLead);

    await writeDB(db);
    res.status(201).json(newAccount);
});

// Login API
app.post("/api/login", async (req, res) => {
    const db = await readDB();
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const user = db.users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // Log login activity
    if (!db.logins) db.logins = [];
    const nameParts = email.split("@")[0].split(/[._+-]+/);
    const userName = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

    const loginEvent = {
        id: "LG-" + (1000 + db.logins.length),
        email,
        name: user.role === "Admin" ? "Admin" : userName,
        date: new Date().toISOString().slice(0, 10),
        timestamp: Date.now()
    };
    db.logins.unshift(loginEvent);
    await writeDB(db);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

app.put("/api/accounts/:id", async (req, res) => {
    const db = await readDB();
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const existing = db.users[index];
    const { name, email, phone, role, goals, location, avatar, password } = req.body;

    db.users[index] = {
        ...existing,
        name: name !== undefined ? name : existing.name,
        email: email !== undefined ? email : existing.email,
        phone: phone !== undefined ? phone : existing.phone,
        role: role !== undefined ? role : existing.role,
        goals: goals !== undefined ? goals : existing.goals,
        location: location !== undefined ? location : existing.location,
        avatar: avatar !== undefined ? avatar : existing.avatar,
        password: password !== undefined ? password : existing.password
    };

    await writeDB(db);
    res.json(db.users[index]);
});

// 5. Purchase Intentions / Transactions
app.get("/api/purchases", async (req, res) => {
    const db = await readDB();
    res.json(db.purchases);
});

app.post("/api/purchases", async (req, res) => {
    const db = await readDB();
    const { student_name, student_email, course_id, course_title, amount, upi_txn_id } = req.body;

    if (!student_name || !student_email || !course_id || !course_title) {
        return res.status(400).json({ error: "Student name, email, course title, and ID are required" });
    }

    const cleanAmount = typeof amount === "string" ? Number(amount.replace(/[^0-9]/g, "")) : Number(amount);

    const newPurchase = {
        id: "TX-" + (4000 + db.purchases.length),
        student_name,
        student_email,
        course_id,
        course_title,
        amount: isNaN(cleanAmount) ? 0 : cleanAmount,
        status: "Completed",
        upi_txn_id: upi_txn_id || "UPI" + Math.random().toString().slice(2, 14),
        created_at: new Date().toISOString().slice(0, 10)
    };

    db.purchases.unshift(newPurchase);

    // Also convert lead if one exists with this email, or add a converted lead
    const existingLead = db.leads.find(l => l.email.toLowerCase() === student_email.toLowerCase());
    if (existingLead) {
        existingLead.status = "Converted";
        existingLead.notes += ` | Bought Course: ${course_title}`;
    } else {
        // Add new converted lead
        const newLead = {
            id: "LD-" + (1000 + db.leads.length),
            name: student_name,
            phone: "+91 9999999999",
            email: student_email,
            service: course_title,
            date: new Date().toISOString().slice(0, 10),
            status: "Converted",
            notes: `Purchased course via UPI QR Code`
        };
        db.leads.unshift(newLead);
    }

    // Increment student count on course
    const course = db.courses.find(c => c.id === course_id);
    if (course) {
        course.students = (course.students || 0) + 1;
    }

    await writeDB(db);
    res.status(201).json(newPurchase);
});

// 6. Aggregated Dashboard Stats & Analytics
app.get("/api/dashboard-stats", async (req, res) => {
    const db = await readDB();

    // Metrics
    const totalLeads = db.leads.length;
    const totalStudents = db.users.length;
    const activeCourses = db.courses.filter(c => c.status === "Published").length;
    const totalTransactionsCount = db.purchases.length;

    const stats = [
        { key: "leads", label: "Total Leads", value: totalLeads, change: 12.4, icon: "Users" },
        { key: "students", label: "Total Students", value: totalStudents, change: 8.1, icon: "GraduationCap" },
        { key: "courses", label: "Active Courses", value: activeCourses, change: 4.2, icon: "BookOpen" },
        { key: "referrals", label: "Transactions", value: totalTransactionsCount, change: 18.9, icon: "Gift" }
    ];

    // Lead Analytics (monthly buckets: Jan to Dec)
    // Let's build from database leads
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const leadAnalytics = months.map((m) => {
        // We can simulate baseline analytics plus actual DB entries for realism
        const monthNum = months.indexOf(m);
        // Baseline mocks
        let baselineLeads = 100 + monthNum * 20;
        let baselineConv = 30 + monthNum * 10;

        // Filter actual DB items matching this month of current year
        const currentYear = new Date().getFullYear();
        const matches = db.leads.filter(l => {
            const d = new Date(l.date);
            return d.getMonth() === monthNum && d.getFullYear() === currentYear;
        });

        const leadsCount = matches.length;
        const convCount = matches.filter(l => l.status === "Converted").length;

        return {
            month: m,
            leads: baselineLeads + leadsCount,
            converted: baselineConv + convCount
        };
    });

    // Monthly Registrations (monthly buckets)
    const monthlyRegistrations = months.map((m, monthNum) => {
        let baselineStudents = 30 + monthNum * 8;
        const matches = db.users.filter(u => {
            const d = new Date(u.created_at);
            return d.getMonth() === monthNum;
        });
        return {
            month: m,
            students: baselineStudents + matches.length
        };
    });

    // Recent activity feed (dynamic generation from DB logs)
    const activityFeed = [];

    // Add actual DB events as activity items
    db.purchases.slice(0, 3).forEach(p => {
        activityFeed.push({
            id: "ACT-P-" + p.id,
            type: "referral", // matching gift icon
            message: `${p.student_name} purchased course: ${p.course_title}`,
            time: "Recent Purchase",
            timestamp: new Date(p.created_at).getTime()
        });
    });

    db.bookings.slice(0, 3).forEach(b => {
        activityFeed.push({
            id: "ACT-B-" + b.id,
            type: "booking",
            message: `${b.student} booked a counselling session`,
            time: `${b.date} at ${b.time}`,
            timestamp: new Date(b.date).getTime()
        });
    });

    db.leads.slice(0, 3).forEach(l => {
        activityFeed.push({
            id: "ACT-L-" + l.id,
            type: "lead",
            message: `New Lead: ${l.name} enquired about ${l.service}`,
            time: l.date,
            timestamp: new Date(l.date).getTime()
        });
    });

    if (db.logins) {
        db.logins.slice(0, 3).forEach(lg => {
            activityFeed.push({
                id: "ACT-LG-" + lg.id,
                type: "login",
                message: `${lg.name} (${lg.email}) logged in`,
                time: lg.date,
                timestamp: lg.timestamp
            });
        });
    }

    // Sort activity feed by date (most recent first)
    activityFeed.sort((a, b) => b.timestamp - a.timestamp);

    // Return formatted payload
    res.json({
        stats,
        leadAnalytics,
        monthlyRegistrations,
        recentLeads: db.leads.slice(0, 6),
        bookings: db.bookings,
        activityFeed: activityFeed.slice(0, 6)
    });
});

// 7. Booking Status PATCH
app.patch("/api/bookings/:id/status", async (req, res) => {
    const db = await readDB();
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
    }
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }
    booking.status = status;
    await writeDB(db);
    res.json(booking);
});

// 8. Services CRUD
app.get("/api/services", async (req, res) => {
    const db = await readDB();
    res.json(db.services || []);
});

app.put("/api/services/:id", async (req, res) => {
    const db = await readDB();
    const index = db.services.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Service not found" });
    }
    const existing = db.services[index];
    const { name, description, status, icon } = req.body;
    db.services[index] = {
        ...existing,
        name: name !== undefined ? name : existing.name,
        description: description !== undefined ? description : existing.description,
        status: status !== undefined ? status : existing.status,
        icon: icon !== undefined ? icon : existing.icon
    };
    await writeDB(db);
    res.json(db.services[index]);
});

// 9. Referrals CRUD
app.get("/api/referrals", async (req, res) => {
    const db = await readDB();
    res.json(db.referrals || []);
});

app.patch("/api/referrals/:id/status", async (req, res) => {
    const db = await readDB();
    const referral = db.referrals.find(r => r.id === req.params.id);
    if (!referral) {
        return res.status(404).json({ error: "Referral not found" });
    }
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }
    referral.status = status;
    await writeDB(db);
    res.json(referral);
});

// 10. Testimonials CRUD
app.get("/api/testimonials", async (req, res) => {
    const db = await readDB();
    res.json(db.testimonials || []);
});

app.post("/api/testimonials", async (req, res) => {
    const db = await readDB();
    const { name, course, review, rating, photo } = req.body;
    if (!name || !review) {
        return res.status(400).json({ error: "Name and review are required" });
    }
    const newTestimonial = {
        id: "T" + (100 + (db.testimonials || []).length),
        name,
        course: course || "General Student",
        review,
        rating: rating !== undefined ? Number(rating) : 5,
        photo: photo || "https://i.pravatar.cc/120?img=" + Math.floor(Math.random() * 70)
    };
    if (!db.testimonials) db.testimonials = [];
    db.testimonials.push(newTestimonial);
    await writeDB(db);
    res.status(201).json(newTestimonial);
});

app.put("/api/testimonials/:id", async (req, res) => {
    const db = await readDB();
    const index = db.testimonials.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Testimonial not found" });
    }
    const existing = db.testimonials[index];
    const { name, course, review, rating, photo } = req.body;
    db.testimonials[index] = {
        ...existing,
        name: name !== undefined ? name : existing.name,
        course: course !== undefined ? course : existing.course,
        review: review !== undefined ? review : existing.review,
        rating: rating !== undefined ? Number(rating) : existing.rating,
        photo: photo !== undefined ? photo : existing.photo
    };
    await writeDB(db);
    res.json(db.testimonials[index]);
});

app.delete("/api/testimonials/:id", async (req, res) => {
    const db = await readDB();
    const initialLength = (db.testimonials || []).length;
    db.testimonials = (db.testimonials || []).filter(t => t.id !== req.params.id);
    if (db.testimonials.length === initialLength) {
        return res.status(404).json({ error: "Testimonial not found" });
    }
    await writeDB(db);
    res.json({ success: true, message: "Testimonial deleted successfully" });
});

// 10.5. SMS Verification API
app.post("/api/sms/send-otp", async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }
    try {
        const result = await sendSMSOTP(phone);
        res.json(result);
    } catch (err) {
        console.error("Error sending SMS:", err);
        res.status(500).json({ error: "Failed to send SMS OTP" });
    }
});

app.post("/api/sms/verify-otp", async (req, res) => {
    const { phone, code } = req.body;
    if (!phone || !code) {
        return res.status(400).json({ error: "Phone number and code are required" });
    }
    try {
        const result = await verifySMSOTP(phone, code);
        if (result.success) {
            res.json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ error: result.error || "Invalid OTP code" });
        }
    } catch (err) {
        console.error("Error verifying SMS:", err);
        res.status(500).json({ error: "Failed to verify SMS OTP" });
    }
});

// 11. Settings API
app.get("/api/settings", async (req, res) => {
    const db = await readDB();
    res.json(db.settings || {});
});

app.put("/api/settings", async (req, res) => {
    const db = await readDB();
    const { company, contact, social } = req.body;
    db.settings = {
        company: company || db.settings.company || {},
        contact: contact || db.settings.contact || {},
        social: social || db.settings.social || {}
    };
    await writeDB(db);
    res.json(db.settings);
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
}

export default app;
