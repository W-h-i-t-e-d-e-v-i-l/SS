import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./components/auth/AuthContext";
import AuthModal from "./components/auth/AuthModal";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Recommend from "./pages/Recommend";
import Results from "./pages/Results";
import CareerPage from "./pages/CareerPage";
import JobSupportPage from "./pages/JobSupport";
import BookingPage from "./pages/Counselling";
import ReferAndEarn from "./pages/ReferAndEarn";
import AcademicSupport from "./pages/AcademicSupport";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

import Dashboard from "./adminsuite/pages/Dashboard";
import Leads from "./adminsuite/pages/Leads";
import AdminCourses from "./adminsuite/pages/Courses";
import Services from "./adminsuite/pages/Services";
import Bookings from "./adminsuite/pages/Bookings";
import Referrals from "./adminsuite/pages/Referrals";
import Testimonials from "./adminsuite/pages/Testimonials";
import MediaLibrary from "./adminsuite/pages/MediaLibrary";
import Settings from "./adminsuite/pages/Settings";
import Purchases from "./adminsuite/pages/Purchases";
import Accounts from "./adminsuite/pages/Accounts";

import AdminLayout from "./adminsuite/components/AdminLayout";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
    <AuthProvider>
      <ScrollToTop />
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/results" element={<Results />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/job-support" element={<JobSupportPage />} />
        <Route path="/counselling" element={<BookingPage />} />
        <Route path="/refer-earn" element={<ReferAndEarn />} />
        <Route path="/academic-support" element={<AcademicSupport />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
  path="/admin/dashboard"
  element={
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  }
/>

<Route
  path="/admin/purchases"
  element={
    <AdminLayout>
      <Purchases />
    </AdminLayout>
  }
/>

<Route
  path="/admin/accounts"
  element={
    <AdminLayout>
      <Accounts />
    </AdminLayout>
  }
/>

<Route
  path="/admin/leads"
  element={
    <AdminLayout>
      <Leads />
    </AdminLayout>
  }
/>

<Route
  path="/admin/courses"
  element={
    <AdminLayout>
      <AdminCourses />
    </AdminLayout>
  }
/>

<Route
  path="/admin/services"
  element={
    <AdminLayout>
      <Services />
    </AdminLayout>
  }
/>

<Route
  path="/admin/bookings"
  element={
    <AdminLayout>
      <Bookings />
    </AdminLayout>
  }
/>

<Route
  path="/admin/referrals"
  element={
    <AdminLayout>
      <Referrals />
    </AdminLayout>
  }
/>

<Route
  path="/admin/testimonials"
  element={
    <AdminLayout>
      <Testimonials />
    </AdminLayout>
  }
/>

<Route
  path="/admin/media"
  element={
    <AdminLayout>
      <MediaLibrary />
    </AdminLayout>
  }
/>

<Route
  path="/admin/settings"
  element={
    <AdminLayout>
      <Settings />
    </AdminLayout>
  }
/>
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
