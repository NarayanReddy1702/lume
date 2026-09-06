import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

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
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLight = theme === "light";

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
    if (link.path) {
      navigate(link.path);
      setShowGetLumeMenu(false);
      return;
    }

    const target = link.target;

    if (location.pathname !== "/") {
      navigate(target === "home" ? "/" : `/#${target}`);
      setShowGetLumeMenu(false);
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

    setShowGetLumeMenu(false);
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
          {LINKS.map((link) => (
            <li key={link.name}>
              <button
                onClick={() =>
                  handleNavigation(link)
                }
                className={`transition-colors ${
                  isLight
                    ? "hover:text-[#27272f]"
                    : "hover:text-white"
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* GET LUME */}

        <div ref={menuRef} className="relative">
          <button
            onClick={() =>
              setShowGetLumeMenu((open) => !open)
            }
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
              className={`absolute -right-32 mt-3 flex w-[360px] gap-1.5 rounded-[8px] border p-1.5 shadow-[0_14px_34px_rgba(10,10,15,0.14)] ${
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
                  className={`flex min-h-10 flex-1 items-center justify-center rounded-[6px] px-3 text-center text-[12px] font-medium transition-colors ${
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

      </nav>
    </motion.header>
  );
}
