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
  const [showGetLumeMenu, setShowGetLumeMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowGetLumeMenu(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
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

  const handleNavigation = (link) => {
    setShowGetLumeMenu(false);
    setMobileMenuOpen(false);

    if (link.path) {
      navigate(link.path);
      return;
    }

    const target = link.target;

    if (location.pathname !== "/") {
      navigate(target === "home" ? "/" : `/#${target}`);
      return;
    }

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
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

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
          className={`hidden md:flex items-center gap-8 text-sm ${
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
          <div ref={menuRef} className="relative">
            <button
              onClick={() => {
                setShowGetLumeMenu((open) => !open);
                setMobileMenuOpen(false);
              }}
              className={`
                text-sm
                font-medium
                rounded-full
                px-5
                py-2
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

            {showGetLumeMenu && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
                className={`fixed right-4 sm:right-6 top-[68px] md:absolute md:top-full md:mt-3 md:right-0 w-[min(340px,calc(100vw-32px))] flex gap-1 sm:gap-1.5 rounded-[8px] border p-1 sm:p-1.5 shadow-[0_14px_34px_rgba(10,10,15,0.14)] z-50 ${
                  isLight
                    ? "border-black/10 bg-white text-[#27272f]"
                    : "border-white/10 bg-[#101015]/95 text-white backdrop-blur-xl"
                }`}
              >
                {[
                  {
                    label: "For me",
                    path: "/for-me",
                  },
                  {
                    label: "For Family",
                    path: "/for-family",
                  },
                  {
                    label: "Business",
                    path: "/business",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      handleNavigation({
                        path: item.path,
                      })
                    }
                    className={`flex min-h-10 flex-1 items-center justify-center rounded-[6px] px-2 sm:px-3 text-center text-[11px] sm:text-[12px] font-medium whitespace-nowrap transition-colors ${
                      isLight
                        ? "hover:bg-[#f3f0ff] hover:text-[#7137ff]"
                        : "bg-white/5 hover:bg-white hover:text-[#101015]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((o) => !o);
              setShowGetLumeMenu(false);
            }}
            aria-label="Toggle Navigation Menu"
            className={`flex md:hidden items-center justify-center p-2 rounded-full border transition-colors ${
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
            className={`md:hidden border-t px-6 py-5 overflow-hidden ${
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
              <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isLight ? "text-black/50" : "text-white/40"}`}>
                Get Lume
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "For me", path: "/for-me" },
                  { label: "For Family", path: "/for-family" },
                  { label: "Business", path: "/business" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigation({ path: item.path })}
                    className={`rounded-lg py-2 text-center text-[11px] font-medium transition-colors ${
                      isLight
                        ? "bg-black/5 hover:bg-[#7137ff] hover:text-white"
                        : "bg-white/5 hover:bg-white hover:text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
