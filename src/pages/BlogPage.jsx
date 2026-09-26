import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Sparkles,
  X,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { BLOGS as FALLBACK_BLOGS } from "../data/blogData";

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";

export default function BlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreviewBlog, setSelectedPreviewBlog] = useState(null);
  const [isLiveFromBackend, setIsLiveFromBackend] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchBlogs() {
      setLoading(true);
      try {
        // Try live backend API first
        const res = await fetch(`${API_URL}/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs from API");
        const data = await res.json();

        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setBlogs(data.map(normalizeBlog));
            setIsLiveFromBackend(true);
          } else {
            // If backend returned empty list, fall back to default rich blog data
            setBlogs(getFallbackBlogs());
            setIsLiveFromBackend(false);
          }
        }
      } catch (err) {
        console.warn("Backend blog request failed, using local catalog:", err.message);
        if (isMounted) {
          setBlogs(getFallbackBlogs());
          setIsLiveFromBackend(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available tags from blogs
  const allTags = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      (b.tags || []).forEach((t) => {
        if (t && typeof t === "string") set.add(t.trim());
      });
    });
    return ["All", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs based on search query & active category tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesTag =
        activeTag === "All" ||
        (blog.tags || []).some((t) => t.toLowerCase() === activeTag.toLowerCase());

      if (!matchesTag) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = blog.title?.toLowerCase().includes(q);
      const inExcerpt = blog.excerpt?.toLowerCase().includes(q);
      const inAuthor = blog.author?.toLowerCase().includes(q);
      const inTags = (blog.tags || []).some((t) => t.toLowerCase().includes(q));
      const inSections = (blog.sections || []).some(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          (s.paragraphs || []).some((p) => p.toLowerCase().includes(q))
      );
      const inContentImages = (blog.contentImages || []).some(
        (img) =>
          img.caption?.toLowerCase().includes(q) ||
          img.content?.toLowerCase().includes(q)
      );

      return inTitle || inExcerpt || inAuthor || inTags || inSections || inContentImages;
    });
  }, [blogs, activeTag, searchQuery]);

  // Sorted blogs (featured articles first, then by date)
  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  }, [filteredBlogs]);

  return (
    <div className="relative min-h-screen bg-[#07070a] text-white selection:bg-[#7137ff]/30 selection:text-white">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.12),_transparent_55%)]" />
      <div className="pointer-events-none fixed top-1/3 -left-32 h-96 w-96 rounded-full bg-[#7137ff]/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#9d5cff]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1340px] px-4 pt-28 pb-24 sm:px-8 lg:px-12">
        {/* ============================================================
            HERO HEADER
        ============================================================ */}
        <header className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7137ff]/30 bg-[#7137ff]/10 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-[#b588ff] backdrop-blur-md">
            <Sparkles size={13} className="text-[#9d5cff]" />
            <span>LUME JOURNAL</span>
            <span className="h-1 w-1 rounded-full bg-[#9d5cff]" />
            <span className="text-white/60">
              {isLiveFromBackend ? "Live From Backend" : "Official Articles"}
            </span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-[760px]">
              <h1 className="text-[clamp(36px,4.5vw,62px)] font-medium leading-[1.05] tracking-[-0.035em] text-white">
                Insights on deep focus, quiet craft & intentional work.
              </h1>
              <p className="mt-4 max-w-[620px] text-[14px] leading-[1.65] text-white/55">
                Explore in-depth essays, mental models, and real-world routines built for
                knowledge workers, students, founders, and creators seeking quiet in a noisy world.
              </p>
            </div>

            {/* Total Articles Counter Card */}
            <div className="hidden shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right backdrop-blur-md sm:block">
              <div className="text-[28px] font-semibold tracking-tight text-white">
                {blogs.length}
              </div>
              <div className="text-[11px] font-medium tracking-wider uppercase text-white/40">
                Published Articles
              </div>
            </div>
          </div>

          {/* ============================================================
              SEARCH & FILTER CONTROLS
          ============================================================ */}
          <div className="mt-10 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-10 text-[13px] text-white placeholder-white/40 outline-none transition-all focus:border-[#9d5cff]/60 focus:bg-white/[0.07]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Active Tag count / info */}
            <div className="flex items-center gap-2 text-[12px] text-white/40">
              <SlidersHorizontal size={14} />
              <span>
                Showing <strong className="text-white">{filteredBlogs.length}</strong> of{" "}
                {blogs.length} articles
              </span>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {allTags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition-all ${isActive
                    ? "border border-[#9d5cff] bg-[#7137ff] text-white shadow-[0_0_16px_rgba(113,55,255,0.4)]"
                    : "border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                    }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </header>

        {/* ============================================================
            LOADING SKELETON STATE
        ============================================================ */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[380px] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* ============================================================
            EMPTY STATE
        ============================================================ */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="my-16 rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-md">
            <BookOpen size={36} className="mx-auto text-white/30" />
            <h3 className="mt-4 text-[18px] font-medium text-white">No articles matched your filter</h3>
            <p className="mt-2 text-[13px] text-white/50">
              Try adjusting your search terms or selecting a different category tag above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTag("All");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[12px] font-medium text-white transition hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ============================================================
            MAIN BLOG GRID (All Articles Details)
        ============================================================ */}
        {!loading && sortedBlogs.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-[18px] font-medium tracking-tight text-white">
                {searchQuery || activeTag !== "All"
                  ? "Filtered Results"
                  : "All Publications & Deep Dives"}
              </h2>
              <span className="text-[12px] text-white/40">
                Sorted by most recent
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedBlogs.map((blog, index) => (
                <BlogCard
                  key={blog._id || blog.slug || index}
                  blog={blog}
                  onPreview={() => setSelectedPreviewBlog(blog)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ============================================================
          INTERACTIVE QUICK PREVIEW MODAL / DRAWER
      ============================================================ */}
      <AnimatePresence>
        {selectedPreviewBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPreviewBlog(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-h-[88vh] w-full max-w-[780px] overflow-y-auto rounded-2xl border border-white/15 bg-[#101015] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.8)] sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPreviewBlog(null)}
                className="absolute top-5 right-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                <X size={18} />
              </button>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pr-12">
                {(selectedPreviewBlog.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#28104a] px-3 py-1 text-[10px] font-medium text-[#b588ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="mt-4 text-[26px] font-medium leading-tight tracking-[-0.02em] text-white">
                {selectedPreviewBlog.title}
              </h2>

              {/* Meta info */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/50 sm:gap-3">
                <span>By {selectedPreviewBlog.author}</span>
                <span>•</span>
                <span>{selectedPreviewBlog.formattedDate}</span>
                <span>•</span>
                <span>{selectedPreviewBlog.readTime}</span>
              </div>

              {/* Image */}
              {selectedPreviewBlog.heroImage && (
                <div className="mt-5 overflow-hidden rounded-xl">
                  <img
                    src={selectedPreviewBlog.heroImage}
                    alt={selectedPreviewBlog.title}
                    className="h-64 w-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt / Intro */}
              <div className="mt-6 space-y-3 text-[13px] leading-[1.65] text-white/70">
                {selectedPreviewBlog.intro && selectedPreviewBlog.intro.length > 0 ? (
                  selectedPreviewBlog.intro.map((para, pIdx) => <p key={pIdx}>{para}</p>)
                ) : (
                  <p>{selectedPreviewBlog.excerpt}</p>
                )}
              </div>

              {/* Section Outlines */}
              {selectedPreviewBlog.sections && selectedPreviewBlog.sections.length > 0 && (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#9d5cff]">
                    Sections in this publication:
                  </h4>
                  <div className="mt-4 space-y-4">
                    {selectedPreviewBlog.sections.map((section, sIdx) => (
                      <div key={sIdx} className="border-l-2 border-[#7137ff]/40 pl-3">
                        <h5 className="text-[13px] font-medium text-white">{section.title}</h5>
                        {section.paragraphs?.[0] && (
                          <p className="mt-1 line-clamp-2 text-[12px] text-white/50">
                            {section.paragraphs[0]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pull quote if available */}
              {selectedPreviewBlog.quote && (
                <blockquote className="my-6 rounded-xl border-l-4 border-[#9d5cff] bg-[#1a1728] p-4 text-[13px] italic text-white/80">
                  “{selectedPreviewBlog.quote}”
                </blockquote>
              )}

              {/* Modal Footer CTA */}
              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedPreviewBlog(null)}
                  className="text-[12px] text-white/50 hover:text-white"
                >
                  Close Preview
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate(`/blog/${selectedPreviewBlog.slug}`);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[12px] font-semibold text-black transition hover:bg-[#9d5cff] hover:text-white"
                >
                  <span>Open Full Reader</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   BLOG CARD COMPONENT
============================================================ */

function BlogCard({ blog, onPreview }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121217] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#7137ff]/40 hover:shadow-[0_12px_32px_rgba(113,55,255,0.12)] after:absolute after:inset-x-0 after:-bottom-2 after:h-2 after:content-['']"
    >
      {/* Cover Image */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[#121217]">
        <img
          src={blog.heroImage}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/40 to-transparent" />

        {/* Tags */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          {(blog.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#9d5cff]/30 bg-[#28104a]/90 px-2.5 py-0.5 text-[9px] font-semibold text-[#b588ff] backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
          {(blog.tags || []).length > 2 && (
            <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] text-white/60 backdrop-blur-md">
              +{(blog.tags || []).length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Card Content - with -mt-1 and z-10 to completely eliminate subpixel seam */}
      <div className="relative z-10 -mt-1 flex min-h-[190px] flex-1 flex-col justify-between bg-[#121217] p-5">
        <div>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-white/40">
            <span className="flex items-center gap-1">
              <User size={12} className="text-[#9d5cff]" />
              {blog.author || "Lume"}
            </span>
            {blog.formattedDate ? (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {blog.formattedDate}
                </span>
              </>
            ) : null}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {blog.readTime || "3 min read"}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-[18px] font-medium leading-[1.25] tracking-[-0.015em] text-white transition-colors duration-200 group-hover:text-[#c49aff]">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-3 text-[12px] leading-[1.6] text-white/55">
            {blog.excerpt}
          </p>
        </div>

        {/* Card Footer: Quick Preview & Read Story */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3.5 text-[11px] text-white">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="text-white/45 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            Quick Preview
          </button>

          <span className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 group-hover:text-[#b588ff]">
            <span>Read Story</span>
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   DATA UTILITIES & NORMALIZERS
============================================================ */

function normalizeBlog(raw) {
  const intro = Array.isArray(raw.intro) ? raw.intro : [];
  const sections = Array.isArray(raw.sections) ? raw.sections : [];

  // Approximate reading time
  const totalWords = [
    raw.title || "",
    raw.excerpt || "",
    intro.join(" "),
    sections.map((s) => `${s.title || ""} ${(s.paragraphs || []).join(" ")}`).join(" "),
  ]
    .join(" ")
    .split(/\s+/).length;

  const minutes = Math.max(2, Math.ceil(totalWords / 180));

  return {
    _id: raw._id || raw.slug,
    title: raw.title || "Untitled Article",
    slug: raw.slug || slugify(raw.title || "article"),
    excerpt: raw.excerpt || intro[0] || "Read insights from the Lume team.",
    author: raw.author || "Lume",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    intro,
    sections,
    quote: raw.quote || "",
    closing: raw.closing || "",
    heroImage: raw.heroImage || raw.heroImageUrl || "/images/article1.jpg",
    secondImage: raw.secondImage || raw.secondImageUrl || "",
    contentImages: Array.isArray(raw.contentImages) ? raw.contentImages : [],
    featured: Boolean(raw.featured),
    publishedAt: raw.publishedAt || raw.createdAt || new Date().toISOString(),
    formattedDate: formatBlogDate(raw.publishedAt || raw.createdAt),
    readTime: `${minutes} min read`,
  };
}

function getFallbackBlogs() {
  return Object.entries(FALLBACK_BLOGS).map(([slug, data]) => {
    return normalizeBlog({
      ...data,
      slug,
      publishedAt: data.date || "August 20, 2026",
    });
  });
}

function formatBlogDate(dateVal) {
  if (!dateVal) return "Recently";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
