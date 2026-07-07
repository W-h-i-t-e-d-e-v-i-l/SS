import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <main
        className={
          location.pathname === "/"
            ? ""
            : "pt-32"
        }
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
