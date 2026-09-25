import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOGS } from "../data/blogData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";

export default function BlogDetails() {
  const { slug } = useParams();
  const [remoteBlog, setRemoteBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("blog_theme") || "dark";
    }
    return "dark";
  });

  const bottomCtaRef = useRef(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("blog_theme", next);
      return next;
    });
  };

  const fallbackBlog = BLOGS[slug];
  const blog = remoteBlog || fallbackBlog;

  // Scroll position listener for sticky button threshold
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // IntersectionObserver to hide sticky button when bottom CTA comes into view
  useEffect(() => {
    const el = bottomCtaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [blog]);

  const showStickyCta = hasScrolled && !isBottomVisible;

  useEffect(() => {
    let alive = true;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    async function loadBlog() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        if (!response.ok) throw new Error("Blog request failed");
        const data = await response.json();
        if (alive) setRemoteBlog(data);
      } catch {
        if (alive) setRemoteBlog(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadBlog();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!blog) {
    return (
      <main
        className={`min-h-screen px-6 py-32 transition-colors duration-300 ${isDark ? "bg-[#07070a] text-white" : "bg-white text-[#111827]"
          }`}
      >
        <Navbar animateOnMount={false} theme={isDark ? "dark" : "light"} />

        <div className="mx-auto max-w-[760px]">
          <h1 className="text-4xl font-medium">Article not found</h1>

          <div className="mt-4 flex items-center gap-3">
            <Link
              to="/blog"
              className={`text-[12px] font-medium transition-colors ${isDark ? "text-[#9d5cff] hover:text-[#c49aff]" : "text-[#7c3aed] hover:text-[#6d28d9]"
                }`}
            >
              ← Back to All Articles
            </Link>
            <span className={isDark ? "text-white/25" : "text-black/25"}>•</span>
            <Link
              to="/"
              className={`text-[12px] transition-colors ${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
                }`}
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#07070a] text-white" : "bg-[#fafafa] text-[#111827]"
        }`}
    >
      <Navbar animateOnMount={false} theme={isDark ? "dark" : "light"} />

      {/* ========================================================
          ARTICLE
      ======================================================== */}

      <article className="mx-auto w-full max-w-[760px] px-6 py-16 sm:px-8 sm:py-20">
        {/* ======================================================
            TOP BAR / BACK BUTTON & THEME TOGGLE
        ====================================================== */}

        <div
          className={`mb-10 mt-10 flex items-center justify-between border-b pb-6 ${isDark ? "border-white/10" : "border-black/10"
            }`}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className={`text-[11px] font-medium transition-colors ${isDark ? "text-[#9d5cff] hover:text-[#c49aff]" : "text-[#7c3aed] hover:text-[#6d28d9]"
                }`}
            >
              ← Back to All Articles
            </Link>
            <span className={isDark ? "text-white/25" : "text-black/25"}>•</span>
            <Link
              to="/"
              className={`text-[11px] transition-colors ${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
                }`}
            >
              Home
            </Link>
          </div>

          {/* Theme Toggle Button in Header */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to white mode" : "Switch to dark mode"}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${isDark
              ? "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              : "border border-black/15 bg-black/5 text-black/80 hover:bg-black/10 hover:text-black"
              }`}
          >
            {isDark ? (
              <>
                <Sun size={13} className="text-[#fbbf24]" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-[#7c3aed]" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        {/* ======================================================
            TAGS
        ====================================================== */}

        <div className="flex flex-wrap gap-2">
          {(blog.tags || []).map((tag) => (
            <span
              key={tag}
              className={`rounded-[4px] px-2.5 py-1 text-[10px] font-medium ${isDark
                ? "border border-[#9d5cff]/30 bg-[#28104a] text-[#c49aff]"
                : "border border-[#e9d5ff] bg-[#f3e8ff] text-[#7c3aed]"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ======================================================
            TITLE
        ====================================================== */}

        <h1
          className={`mt-5 text-[clamp(34px,5vw,54px)] font-medium leading-[1.02] tracking-[-0.035em] ${isDark ? "text-white" : "text-[#111827]"
            }`}
        >
          {blog.title}
        </h1>

        {/* ======================================================
            AUTHOR / DATE
        ====================================================== */}

        <div
          className={`mt-4 flex items-center gap-3 text-[11px] ${isDark ? "text-white/50" : "text-black/50"
            }`}
        >
          <span
            className={`h-6 w-6 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"
              }`}
          />

          <span>{blog.author}</span>

          <span>•</span>

          <span>{formatBlogDate(blog)}</span>
        </div>

        {/* ======================================================
            HERO IMAGE
        ====================================================== */}

        <div
          className={`mt-6 overflow-hidden rounded-[10px] border ${isDark ? "border-white/10" : "border-black/10"
            }`}
        >
          <img
            src={blog.heroImage || "/images/article1.jpg"}
            alt={blog.title}
            className="block h-[400px] w-full object-cover"
          />
        </div>

        {/* ======================================================
            INTRO
        ====================================================== */}

        <div
          className={`mt-6 space-y-5 text-[14px] leading-[1.75] ${isDark ? "text-white/70" : "text-[#374151]"
            }`}
        >
          {(blog.intro || []).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* ======================================================
            ARTICLE SECTIONS
        ====================================================== */}

        <div className="mt-8">
          {(blog.sections || []).map((section, index) => (
            <section key={section.title || index} className="mb-8">
              <h2
                className={`text-[23px] font-medium leading-tight tracking-[-0.025em] ${isDark ? "text-white" : "text-[#111827]"
                  }`}
              >
                {section.title}
              </h2>

              <div
                className={`mt-3.5 space-y-4 text-[14px] leading-[1.75] ${isDark ? "text-white/70" : "text-[#374151]"
                  }`}
              >
                {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ======================================================
            QUOTE
        ====================================================== */}

        {blog.quote && (
          <blockquote
            className={`my-8 rounded-[8px] border-l-4 px-6 py-5 text-[15px] italic leading-[1.6] ${isDark
              ? "border-[#9d5cff] bg-[#141420] text-white/90"
              : "border-[#7c3aed] bg-[#f8f7ff] text-[#1f2937]"
              }`}
          >
            “ {blog.quote} ”
          </blockquote>
        )}

        {/* ======================================================
            SECOND IMAGE
        ====================================================== */}

        {blog.secondImage && (
          <div
            className={`my-8 overflow-hidden rounded-[10px] border ${isDark ? "border-white/10" : "border-black/10"
              }`}
          >
            <img
              src={blog.secondImage}
              alt=""
              className="block h-[400px] w-full object-cover"
            />
          </div>
        )}

        {/* ======================================================
            ADDITIONAL ARTICLE IMAGES & CONTENT
        ====================================================== */}

        {Array.isArray(blog.contentImages) && blog.contentImages.length > 0 && (
          <div className="my-10 space-y-8">
            {blog.contentImages.map((item, idx) => (
              <figure
                key={idx}
                className={`overflow-hidden rounded-[10px] border p-4 sm:p-6 transition-all duration-300 ${isDark
                  ? "border-white/10 bg-[#12131e]/70 hover:border-white/20"
                  : "border-black/10 bg-[#f9fafb] hover:border-black/20 shadow-xs"
                  }`}
              >
                {item.url && (
                  <div className="overflow-hidden rounded-[8px]">
                    <img
                      src={item.url}
                      alt={item.caption || `Article image ${idx + 1}`}
                      className="block max-h-[500px] w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                    />
                  </div>
                )}
                {item.caption && (
                  <figcaption
                    className={`mt-4 text-[15px] font-medium tracking-tight ${isDark ? "text-white/95" : "text-[#111827]"
                      }`}
                  >
                    {item.caption}
                  </figcaption>
                )}
                {item.content && (
                  <p
                    className={`mt-2.5 whitespace-pre-line text-[13px] leading-[1.7] ${isDark ? "text-white/65" : "text-[#4b5563]"
                      }`}
                  >
                    {item.content}
                  </p>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* ======================================================
            ADVERTISEMENT
        ====================================================== */}

        <div
          className={`mx-auto my-8 flex h-[90px] max-w-[560px] items-center justify-center rounded-[8px] border text-center text-[10px] ${isDark
            ? "border-white/5 bg-[#171825] text-white/35"
            : "border-black/5 bg-[#f3f4f6] text-black/40"
            }`}
        >
          <div>
            <div>Advertisement</div>
            <div>You can place ads</div>
            <div>750x100</div>
          </div>
        </div>

        {/* ======================================================
            CLOSING
        ====================================================== */}

        <section className="mt-8">
          <h2
            className={`text-[22px] font-medium tracking-[-0.025em] ${isDark ? "text-white" : "text-[#111827]"
              }`}
          >
            Closing
          </h2>

          <p
            className={`mt-3 text-[14px] leading-[1.7] ${isDark ? "text-white/65" : "text-[#4b5563]"
              }`}
          >
            {(blog.closing || "").split("Get Lume.")[0]}

            {(blog.closing || "").includes("Get Lume.") && (
              <Link
                to="/"
                className={`transition-colors hover:underline ${isDark
                  ? "text-[#9d5cff] hover:text-[#b77aff]"
                  : "text-[#7c3aed] hover:text-[#6d28d9]"
                  }`}
              >
                Get Lume.
              </Link>
            )}
          </p>
        </section>

        {/* ======================================================
            BOTTOM BUY LUME CTA (Redirects to /forme)
        ====================================================== */}

        <div
          ref={bottomCtaRef}
          className={`mt-14 rounded-[16px] border p-8 sm:p-10 text-center transition-all duration-300 ${isDark
            ? "border-white/10 bg-gradient-to-b from-[#141422] to-[#0c0c16] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "border-black/10 bg-gradient-to-b from-[#f9f8ff] to-[#ffffff] shadow-[0_15px_40px_rgba(124,92,255,0.08)]"
            }`}
        >
          <span
            className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-medium tracking-wide ${isDark
              ? "border border-[#9d5cff]/30 bg-[#28104a] text-[#c49aff]"
              : "border border-[#e9d5ff] bg-[#f3e8ff] text-[#7c3aed]"
              }`}
          >
            Take Control of Your Attention
          </span>

          <h3
            className={`mt-4 text-[24px] sm:text-[30px] font-medium tracking-tight ${isDark ? "text-white" : "text-[#111827]"
              }`}
          >
            Make intentional focus effortless.
          </h3>

          <p
            className={`mx-auto mt-2.5 max-w-[500px] text-[13px] sm:text-[14px] leading-relaxed ${isDark ? "text-white/60" : "text-[#4b5563]"
              }`}
          >
            Experience how the physical Lume card and mindful phone controls work together to protect your deep work and silence distractions.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <Link
              to="/forme"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#9d5cff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#7c5cff]/25 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-[#7c5cff]/35 active:scale-95"
            >
              <span>Buy Lume</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>

      {/* Sticky Right-Side Buy Lume Button (Hidden when bottom button is in view) */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-40"
          >
            <Link
              to="/forme"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#9d5cff] px-5 py-2.5 text-[12px] sm:text-[13px] font-semibold text-white shadow-xl shadow-[#7c5cff]/35 transition-all duration-300 hover:brightness-110 hover:shadow-2xl hover:shadow-[#7c5cff]/45 hover:scale-105 active:scale-95"
            >
              <span>Buy Lume</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to white mode" : "Switch to dark mode"}
          title={isDark ? "Switch to white mode" : "Switch to dark mode"}
          className={`group flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${isDark
            ? "border border-white/20 bg-[#161622] text-white hover:bg-[#202030] shadow-black/60"
            : "border border-black/10 bg-white text-black hover:bg-gray-100 shadow-black/15"
            }`}
        >
          {isDark ? (
            <Sun
              size={18}
              className="text-[#fbbf24] transition-transform duration-300 group-hover:rotate-45"
            />
          ) : (
            <Moon
              size={18}
              className="text-[#7c3aed] transition-transform duration-300 group-hover:-rotate-12"
            />
          )}
        </button>
      </div>

      <Footer />
    </main>
  );
}

function formatBlogDate(blog) {
  const value = blog.publishedAt || blog.date || blog.createdAt;
  if (!value) return "";
  if (blog.date && !blog.publishedAt && !blog.createdAt) return blog.date;
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
