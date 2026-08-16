

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProblemSection from "./components/ProblemSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import Footer from "./components/Footer.jsx";
import SmoothScroll from "./lib/SmoothScroll.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import BenefitsSection from "./components/BenefitsSection.jsx";
import WhoItsFor from "./components/WhoItsFor.jsx";
import FAQSection from "./components/FAQSection.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";



/* ============================================================
   HOME PAGE
============================================================ */

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);

      // Wait until the home sections are rendered
      requestAnimationFrame(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }
      });
    }
  }, [location]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void overflow-hidden">

        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.15),_transparent_60%)]" />

        <Navbar />

        <main className="relative">
          <Hero />
          <ProblemSection />
          <ProcessSection />
          <FeaturesSection />
          <BenefitsSection />
          <WhoItsFor />
          <FAQSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}


/* ============================================================
   APP ROUTES
============================================================ */

export default function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* BLOG DETAILS */}
      <Route
        path="/blog/:slug"
        element={<BlogDetails />}
      />

    </Routes>
  );
}