import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [services, setServices] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication & Global Modal States
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem("ss_user");
    return u ? JSON.parse(u) : null;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetching methods
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    try {
      const res = await fetch("/api/purchases");
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }, []);

  const fetchReferrals = useCallback(async () => {
    try {
      const res = await fetch("/api/referrals");
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
      }
    } catch (err) {
      console.error("Error fetching referrals:", err);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  }, []);

  const fetchDashboardStats = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard-stats");
      if (res.ok) {
        const data = await res.json();
        setDashboardStats(data);
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchCourses(),
      fetchLeads(),
      fetchBookings(),
      fetchAccounts(),
      fetchPurchases(),
      fetchServices(),
      fetchReferrals(),
      fetchTestimonials(),
      fetchSettings(),
      fetchDashboardStats(),
    ]);
    setLoading(false);
  }, [
    fetchCourses,
    fetchLeads,
    fetchBookings,
    fetchAccounts,
    fetchPurchases,
    fetchServices,
    fetchReferrals,
    fetchTestimonials,
    fetchSettings,
    fetchDashboardStats,
  ]);

  // Mutations
  const addCourse = async (courseData) => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (res.ok) {
        const newCourse = await res.json();
        setCourses((prev) => [...prev, newCourse]);
        fetchDashboardStats();
        return { success: true, course: newCourse };
      }
      return { success: false, error: "Failed to create course" };
    } catch (err) {
      console.error("Error adding course:", err);
      return { success: false, error: err.message };
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (res.ok) {
        const updatedCourse = await res.json();
        setCourses((prev) => prev.map((c) => (c.id === id ? updatedCourse : c)));
        fetchDashboardStats();
        return { success: true, course: updatedCourse };
      }
      return { success: false, error: "Failed to update course" };
    } catch (err) {
      console.error("Error updating course:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        fetchDashboardStats();
        return { success: true };
      }
      return { success: false, error: "Failed to delete course" };
    } catch (err) {
      console.error("Error deleting course:", err);
      return { success: false, error: err.message };
    }
  };

  const addLead = async (leadData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      if (res.ok) {
        const newLead = await res.json();
        setLeads((prev) => [newLead, ...prev]);
        fetchDashboardStats();
        return { success: true, lead: newLead };
      }
      return { success: false };
    } catch (err) {
      console.error("Error adding lead:", err);
      return { success: false };
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updatedLead = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
        setDashboardStats((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            recentLeads: prev.recentLeads.map((l) => (l.id === id ? updatedLead : l)),
          };
        });
        return { success: true, lead: updatedLead };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating lead status:", err);
      return { success: false };
    }
  };

  const updateLeadNotes = async (id, notes) => {
    try {
      const res = await fetch(`/api/leads/${id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        const updatedLead = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
        setDashboardStats((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            recentLeads: prev.recentLeads.map((l) => (l.id === id ? updatedLead : l)),
          };
        });
        return { success: true, lead: updatedLead };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating lead notes:", err);
      return { success: false };
    }
  };

  const sendSMSOTP = async (phone) => {
    try {
      const res = await fetch("/api/sms/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        return await res.json();
      }
      const errData = await res.json();
      return { success: false, error: errData.error || "Failed to send OTP" };
    } catch (err) {
      console.error("Error sending SMS OTP:", err);
      return { success: false, error: "Network error, please try again" };
    }
  };

  const verifySMSOTP = async (phone, code) => {
    try {
      const res = await fetch("/api/sms/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      if (res.ok) {
        return await res.json();
      }
      const errData = await res.json();
      return { success: false, error: errData.error || "Failed to verify OTP" };
    } catch (err) {
      console.error("Error verifying SMS OTP:", err);
      return { success: false, error: "Network error, please try again" };
    }
  };

  const addBooking = async (bookingData) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) {
        const newBooking = await res.json();
        setBookings((prev) => [newBooking, ...prev]);
        fetchLeads();
        fetchDashboardStats();
        return { success: true, booking: newBooking };
      }
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.error || "Failed to create booking" };
    } catch (err) {
      console.error("Error adding booking:", err);
      return { success: false, error: "Network error, please try again" };
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updatedBooking = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
        fetchDashboardStats();
        return { success: true, booking: updatedBooking };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating booking status:", err);
      return { success: false };
    }
  };

  const addAccount = async (accountData) => {
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });
      if (res.ok) {
        const newAccount = await res.json();
        setAccounts((prev) => [...prev, newAccount]);
        setCurrentUser(newAccount);
        localStorage.setItem("ss_user", JSON.stringify(newAccount));
        localStorage.setItem("ss_onboarding", "true");
        fetchLeads();
        fetchDashboardStats();
        return { success: true, account: newAccount };
      }
      return { success: false };
    } catch (err) {
      console.error("Error adding account:", err);
      return { success: false };
    }
  };

  const updateAccount = async (id, accountData) => {
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });
      if (res.ok) {
        const updated = await res.json();
        setAccounts((prev) => prev.map((a) => (a.id === id ? updated : a)));
        if (currentUser && currentUser.id === id) {
          setCurrentUser(updated);
          localStorage.setItem("ss_user", JSON.stringify(updated));
        }
        return { success: true, user: updated };
      }
      return { success: false, error: "Failed to update account" };
    } catch (err) {
      console.error("Error updating account:", err);
      return { success: false, error: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        localStorage.setItem("ss_user", JSON.stringify(user));
        localStorage.setItem("ss_onboarding", "true");
        return { success: true, user };
      } else {
        const data = await res.json();
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      console.error("Error logging in:", err);
      return { success: false, error: "Network error, please try again" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ss_user");
  };

  const addPurchase = async (purchaseData) => {
    try {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });
      if (res.ok) {
        const newPurchase = await res.json();
        setPurchases((prev) => [newPurchase, ...prev]);
        fetchLeads();
        fetchCourses();
        fetchDashboardStats();
        return { success: true, purchase: newPurchase };
      }
      return { success: false };
    } catch (err) {
      console.error("Error adding purchase:", err);
      return { success: false };
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      if (res.ok) {
        const updated = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
        return { success: true, service: updated };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating service:", err);
      return { success: false };
    }
  };

  const updateReferralStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/referrals/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReferrals((prev) => prev.map((r) => (r.id === id ? updated : r)));
        return { success: true, referral: updated };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating referral status:", err);
      return { success: false };
    }
  };

  const addTestimonial = async (testimonialData) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });
      if (res.ok) {
        const newTestimonial = await res.json();
        setTestimonials((prev) => [...prev, newTestimonial]);
        return { success: true, testimonial: newTestimonial };
      }
      return { success: false };
    } catch (err) {
      console.error("Error adding testimonial:", err);
      return { success: false };
    }
  };

  const updateTestimonial = async (id, testimonialData) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return { success: true, testimonial: updated };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating testimonial:", err);
      return { success: false };
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      return { success: false };
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        return { success: true, settings: updated };
      }
      return { success: false };
    } catch (err) {
      console.error("Error updating settings:", err);
      return { success: false };
    }
  };

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Real-time updates: Poll database every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      refreshAll();
    }, 8000);
    return () => clearInterval(timer);
  }, [refreshAll]);

  return (
    <DataContext.Provider
      value={{
        courses,
        leads,
        bookings,
        accounts,
        purchases,
        services,
        referrals,
        testimonials,
        settings,
        dashboardStats,
        loading,
        refreshAll,
        addCourse,
        updateCourse,
        deleteCourse,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        sendSMSOTP,
        verifySMSOTP,
        addBooking,
        updateBookingStatus,
        addAccount,
        updateAccount,
        addPurchase,
        updateService,
        updateReferralStatus,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        currentUser,
        showLoginModal,
        setShowLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
