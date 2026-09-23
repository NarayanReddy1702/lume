

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProblemSection from "./components/ProblemSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import Footer from "./components/Footer.jsx";
import SmoothScroll from "./lib/SmoothScroll.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import BenefitsSection from "./components/BenefitsSection.jsx";
import StatsSection from "./components/StatsSection.jsx";
import WhoItsFor from "./components/WhoItsFor.jsx";
import FAQSection from "./components/FAQSection.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import PurchasePage from "./pages/PurchasePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import RealFrictionSection from "./components/RealFrictionSection.jsx";
import BusinessFocusSection from "./components/BusinessFocusSection.jsx";
import BusinessCTASection from "./components/BusinessCTASection.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";



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
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [location]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void overflow-hidden">

        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.15),_transparent_60%)]" />

        <Navbar animateOnMount={false} />

        <main className="relative">
          <Hero />
          <ProblemSection />
          <ProcessSection />
          <FeaturesSection />
          <BenefitsSection />
          <StatsSection />
          <RealFrictionSection/>
          <WhoItsFor />

          <BusinessCTASection />

          <FAQSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function BusinessPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void overflow-hidden">
        <Navbar animateOnMount={false} />

        <main className="relative">
          <BusinessFocusSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function ContactRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white overflow-hidden">
        <Navbar animateOnMount={false} theme="light" />

        <main className="relative">
          <ContactPage />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function CalculatorRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="relative h-[100svh] w-full bg-[#07070a] overflow-hidden">
      <Navbar animateOnMount={false} />

      <CalculatorPage />
    </div>
  );
}

function PurchaseRoute({ audience }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div id="top" className="relative min-h-screen bg-white overflow-hidden">
        <Navbar animateOnMount={false} theme="light" />

        <main className="relative">
          <PurchasePage audience={audience} />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function CheckoutRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white overflow-hidden">
        <Navbar animateOnMount={false} theme="light" />

        <main className="relative">
          <CheckoutPage />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

function OrderSuccessRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white overflow-hidden">
        <Navbar animateOnMount={false} theme="light" />

        <main className="relative">
          <OrderSuccessPage />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}


function BlogRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#07070a] overflow-hidden">
        <Navbar animateOnMount={false} />

        <main className="relative">
          <BlogPage />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}


function PrivacyPolicyRoute() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void overflow-hidden">
        <Navbar animateOnMount={false} />

        <main className="relative">
          <PrivacyPolicyPage />
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

      {/* BUSINESS */}
      <Route
        path="/business"
        element={<BusinessPage />}
      />

      {/* CONTACT */}
      <Route
        path="/contact"
        element={<ContactRoute />}
      />

      {/* CALCULATOR */}
      <Route
        path="/calculator"
        element={<CalculatorRoute />}
      />

      {/* CHECKOUT */}
      <Route
        path="/checkout"
        element={<CheckoutRoute />}
      />

      {/* ORDER SUCCESS */}
      <Route
        path="/order-success"
        element={<OrderSuccessRoute />}
      />

      {/* INDIVIDUAL PURCHASE */}
      <Route
        path="/forme"
        element={<PurchaseRoute audience="me" />}
      />
      <Route
        path="/for-me"
        element={<PurchaseRoute audience="me" />}
      />

      {/* FAMILY PURCHASE */}
      <Route
        path="/for-family"
        element={<PurchaseRoute audience="family" />}
      />
      <Route
        path="/forfamily"
        element={<PurchaseRoute audience="family" />}
      />

      {/* BLOG LISTING */}
      <Route
        path="/blog"
        element={<BlogRoute />}
      />
      <Route
        path="/blogs"
        element={<BlogRoute />}
      />

      {/* BLOG DETAILS */}
      <Route
        path="/blog/:slug"
        element={<BlogDetails />}
      />

      {/* PRIVACY POLICY */}
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicyRoute />}
      />
      <Route
        path="/privacy"
        element={<PrivacyPolicyRoute />}
      />

    </Routes>
  );
}
