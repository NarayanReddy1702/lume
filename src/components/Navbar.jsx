import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    name: "Business",
    path: "/business",
  },
  {
    name: "Pricing",
    target: "pricing",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar({
  animateOnMount = true,
  theme = "dark",
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLight = theme === "light";

  const isLinkActive = (link) => {
    if (link.path) {
      if (link.path === "/blog") {
        return location.pathname === "/blog" || location.pathname.startsWith("/blog/");
      }
      return location.pathname === link.path;
    }
    if (location.pathname === "/" && link.target) {
      if (!location.hash && link.target === "home") return true;
      return location.hash === `#${link.target}`;
    }
    return false;
  };

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

  const handleNavigation = (link) => {
    setMobileMenuOpen(false);

    if (link.path) {
      navigate(link.path);
      return;
    }

    const target = link.target;
    const hashOnlyTargets = new Set(["pricing"]);

    if (hashOnlyTargets.has(target)) {
      window.history.replaceState(null, "", `${window.location.pathname}#${target}`);
      return;
    }

    if (location.pathname !== "/") {
      navigate(target === "home" ? "/" : `/#${target}`);
      return;
    }

    if (target === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    const section = document.getElementById(target);

    if (!section) return;

    /*
      Update URL immediately
    */

    const newUrl = `${window.location.pathname}#${target}`;

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
      initial={
        animateOnMount
          ? {
              y: -40,
              opacity: 0,
            }
          : false
      }
      animate={
        animateOnMount
          ? {
              y: 0,
              opacity: 1,
            }
          : false
      }
      transition={
        animateOnMount
          ? {
              duration: 0.6,
              ease: "easeOut",
            }
          : undefined
      }
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || isLight
          ? isLight
            ? "border-b border-black/5 bg-white/90 backdrop-blur-xl"
            : "bg-void/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* LOGO */}

        <button
          onClick={() => handleNavigation({ target: "home" })}
          className="flex items-center"
        >
          <img
            className="w-20"
            src={isLight ? "/black-logo.png" : "/logo.png"}
            alt="Lume"
          />
        </button>

        {/* NAV LINKS */}

        <ul
          className={`hidden lg:flex items-center gap-6 xl:gap-8 text-sm ${
            isLight ? "text-[#27272f]/70" : "text-white/60"
          }`}
        >
          {LINKS.map((link) => {
            const active = isLinkActive(link);
            return (
              <li key={link.name}>
                <button
                  onClick={() => handleNavigation(link)}
                  className={`relative py-1 transition-colors ${
                    active
                      ? isLight
                        ? "text-[#7137ff] font-medium"
                        : "text-white font-medium"
                      : isLight
                      ? "hover:text-[#27272f]"
                      : "hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        isLight ? "bg-[#7137ff]" : "bg-[#9d5cff]"
                      }`}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* RIGHT CONTROLS (GET LUME + MOBILE TOGGLE) */}

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/forme");
              setMobileMenuOpen(false);
            }}
            className={`
              text-sm
              font-medium
              rounded-full
              px-4
              py-2
              sm:px-5
              transition-colors
              ${
                isLight
                  ? "bg-black text-white hover:bg-[#202024]"
                  : "bg-white text-void hover:bg-white/90"
              }
            `}
          >
            Get Lume
          </button>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((o) => !o);
            }}
            aria-label="Toggle Navigation Menu"
            className={`flex lg:hidden items-center justify-center p-2 rounded-full border transition-colors ${
              isLight
                ? "border-black/10 text-[#27272f] hover:bg-black/5"
                : "border-white/10 text-white hover:bg-white/10"
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </nav>

      {/* MOBILE MENU ACCORDION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`lg:hidden border-t px-6 py-5 overflow-hidden ${
              isLight
                ? "border-black/10 bg-white/98 text-[#27272f]"
                : "border-white/10 bg-[#0c0c12]/98 text-white backdrop-blur-2xl"
            }`}
          >
            <ul className="flex flex-col gap-3 text-sm">
              {LINKS.map((link) => {
                const active = isLinkActive(link);
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigation(link)}
                      className={`flex w-full items-center justify-between py-2 transition-colors ${
                        active
                          ? isLight
                            ? "text-[#7137ff] font-semibold"
                            : "text-[#9d5cff] font-semibold"
                          : isLight
                          ? "text-[#27272f]/80 hover:text-black"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-[#9d5cff]" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={`mt-5 border-t pt-4 ${isLight ? "border-black/10" : "border-white/10"}`}>
              <button
                type="button"
                onClick={() => {
                  navigate("/forme");
                  setMobileMenuOpen(false);
                }}
                className={`w-full rounded-full py-2.5 text-center text-sm font-medium transition-colors ${
                  isLight
                    ? "bg-black text-white hover:bg-[#202024]"
                    : "bg-white text-void hover:bg-white/90"
                }`}
              >
                Get Lume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
