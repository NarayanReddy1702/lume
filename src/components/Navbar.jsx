import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  {
    name: "Home",
    target: "home",
  },
  {
    name: "Features",
    target: "features",
  },
  {
    name: "Benefits",
    target: "benefits",
  },
  {
    name: "Pricing",
    target: "pricing",
  },
  {
    name: "Contact",
    target: "contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  /* ============================================================
     NAVBAR BACKGROUND
  ============================================================ */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ============================================================
     UPDATE URL WHILE SCROLLING
  ============================================================ */

useEffect(() => {
  const sectionIds = [
    "home",
    "features",
    "benefits",
    "who-its-for",
    "pricing",
    "contact",
  ];

  let ticking = false;

  const updateActiveSection = () => {
    const viewportCenter = window.innerHeight / 2;

    let currentSection = "home";
    let closestDistance = Infinity;

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (!section) return;

      const rect = section.getBoundingClientRect();

      // Center of this section
      const sectionCenter = rect.top + rect.height / 2;

      // Distance between viewport center and section center
      const distance = Math.abs(
        sectionCenter - viewportCenter
      );

      /*
       * Only consider sections that are currently
       * visible in the viewport.
       */
      const isVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

      if (isVisible && distance < closestDistance) {
        closestDistance = distance;
        currentSection = id;
      }
    });

    /*
     * At the very top, always show Home.
     */
    if (window.scrollY < 100) {
      currentSection = "home";
    }

    const newUrl =
      currentSection === "home"
        ? window.location.pathname
        : `${window.location.pathname}#${currentSection}`;

    const currentUrl =
      window.location.pathname +
      window.location.hash;

    if (currentUrl !== newUrl) {
      window.history.replaceState(
        null,
        "",
        newUrl
      );
    }

    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(
        updateActiveSection
      );

      ticking = true;
    }
  };

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  updateActiveSection();

  return () => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );
  };
}, []);

  /* ============================================================
     NAVIGATION CLICK
  ============================================================ */

  const handleNavigation = (target) => {
    const section = document.getElementById(target);

    if (!section) return;

    /*
      Update URL immediately
    */

    const newUrl =
      target === "home"
        ? window.location.pathname
        : `${window.location.pathname}#${target}`;

    window.history.replaceState(
      null,
      "",
      newUrl
    );

    /*
      Scroll to section
    */

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.header
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}

        <button
          onClick={() => handleNavigation("home")}
          className="flex items-center"
        >
          <img
            className="w-20"
            src="/logo.png"
            alt="Lume"
          />
        </button>

        {/* NAV LINKS */}

        <ul className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {LINKS.map((link) => (
            <li key={link.name}>
              <button
                onClick={() =>
                  handleNavigation(link.target)
                }
                className="hover:text-white transition-colors"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* GET LUME */}

        <button
          onClick={() =>
            handleNavigation("pricing")
          }
          className="
            text-sm
            font-medium
            bg-white
            text-void
            rounded-full
            px-5
            py-2
            hover:bg-white/90
            transition-colors
          "
        >
          Get Lume
        </button>

      </nav>
    </motion.header>
  );
}