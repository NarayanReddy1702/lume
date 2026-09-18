import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BLOGS } from "../data/blogData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";

export default function BlogDetails() {
  const { slug } = useParams();
  const [remoteBlog, setRemoteBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackBlog = BLOGS[slug];
  const blog = remoteBlog || fallbackBlog;

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
      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <Navbar animateOnMount={false} />

        <div className="mx-auto max-w-[760px]">
          <h1 className="text-4xl font-medium">
            Article not found
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <Link
              to="/blog"
              className="text-[12px] font-medium text-[#9d5cff] transition-colors hover:text-[#c49aff]"
            >
              ← Back to All Articles
            </Link>
            <span className="text-white/25">•</span>
            <Link
              to="/"
              className="text-[12px] text-white/50 transition-colors hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar animateOnMount={false} />

      {/* ========================================================
          ARTICLE
      ======================================================== */}

 

      <article
        className="
          mx-auto
          w-full
          max-w-[760px]
          px-6
          py-16
          sm:px-8
          sm:py-20
        "
      >

        {/* ======================================================
            TAGS
        ====================================================== */}
{/* ======================================================
            BACK BUTTON
        ====================================================== */}

        <div className="mt-10 border-b border-white/10 pb-6 mb-10">
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="text-[11px] font-medium text-[#9d5cff] transition-colors hover:text-[#c49aff]"
            >
              ← Back to All Articles
            </Link>
            <span className="text-white/25">•</span>
            <Link
              to="/"
              className="text-[11px] text-white/50 transition-colors hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(blog.tags || []).map((tag) => (
            <span
              key={tag}
              className="
                rounded-[3px]
                bg-[#28104a]
                px-2
                py-1
                text-[9px]
                font-medium
                text-[#9d5cff]
              "
            >
              {tag}
            </span>
          ))}
        </div>


        {/* ======================================================
            TITLE
        ====================================================== */}

        <h1
          className="
            mt-5
            text-[clamp(36px,5vw,58px)]
            font-medium
            leading-[0.95]
            tracking-[-0.04em]
          "
        >
          {blog.title}
        </h1>


        {/* ======================================================
            AUTHOR / DATE
        ====================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            text-[11px]
            text-white/45
          "
        >
          <span
            className="
              h-6
              w-6
              rounded-full
              bg-white/10
            "
          />

          <span>{blog.author}</span>

          <span>•</span>

          <span>{formatBlogDate(blog)}</span>
        </div>


        {/* ======================================================
            HERO IMAGE
        ====================================================== */}

        <div
          className="
            mt-6
            overflow-hidden
            rounded-[7px]
          "
        >
          <img
            src={blog.heroImage || "/images/article1.jpg"}
            alt={blog.title}
            className="
              block
              w-full
              h-[400px]
              object-cover
            "
          />
        </div>


        {/* ======================================================
            INTRO
        ====================================================== */}

        <div
          className="
            mt-6
            space-y-5
            text-[12px]
            leading-[1.65]
            text-white/60
          "
        >
          {(blog.intro || []).map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>


        {/* ======================================================
            ARTICLE SECTIONS
        ====================================================== */}

        <div className="mt-8">

          {(blog.sections || []).map((section, index) => (
            <section
              key={section.title}
              className="mb-7"
            >

              <h2
                className="
                  text-[22px]
                  font-medium
                  leading-tight
                  tracking-[-0.025em]
                  text-white
                "
              >
                {section.title}
              </h2>

              <div
                className="
                  mt-3
                  space-y-4
                  text-[12px]
                  leading-[1.65]
                  text-white/60
                "
              >
                {(section.paragraphs || []).map(
                  (paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraph}
                    </p>
                  )
                )}
              </div>

            </section>
          ))}

        </div>


        {/* ======================================================
            QUOTE
        ====================================================== */}

        {blog.quote && (
          <blockquote
            className="
              my-6
              rounded-[6px]
              border-l-2
              border-[#9d5cff]
              bg-[#242536]
              px-5
              py-5
              text-[13px]
              italic
              leading-[1.5]
              text-white/80
            "
          >
            “ {blog.quote} ”
          </blockquote>
        )}


        {/* ======================================================
            SECOND IMAGE
        ====================================================== */}

        {blog.secondImage && (
          <div
            className="
              overflow-hidden
              rounded-[7px]
            "
          >
            <img
              src={blog.secondImage}
              alt=""
              className="
                block
                h-[400px]
                w-full
                object-cover
              "
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
                className="overflow-hidden rounded-[8px] border border-white/10 bg-[#12131e]/70 p-4 sm:p-6 transition-all duration-300 hover:border-white/20"
              >
                {item.url && (
                  <div className="overflow-hidden rounded-[6px]">
                    <img
                      src={item.url}
                      alt={item.caption || `Article image ${idx + 1}`}
                      className="block w-full max-h-[500px] object-cover transition-transform duration-500 hover:scale-[1.01]"
                    />
                  </div>
                )}
                {item.caption && (
                  <figcaption className="mt-4 text-[15px] font-medium tracking-tight text-white/95">
                    {item.caption}
                  </figcaption>
                )}
                {item.content && (
                  <p className="mt-2.5 text-[12px] leading-[1.7] text-white/65 whitespace-pre-line">
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
          className="
            mx-auto
            my-6
            flex
            h-[90px]
            max-w-[560px]
            items-center
            justify-center
            rounded-[6px]
            bg-[#242536]
            text-center
            text-[9px]
            text-white/30
          "
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
            className="
              text-[22px]
              font-medium
              tracking-[-0.025em]
            "
          >
            Closing
          </h2>

          <p
            className="
              mt-3
              text-[12px]
              leading-[1.65]
              text-white/60
            "
          >
            {(blog.closing || "").split("Get Lume.")[0]}

            {(blog.closing || "").includes("Get Lume.") && (
              <Link
                to="/"
                className="
                  text-[#9d5cff]
                  transition-colors
                  hover:text-[#b77aff]
                  hover:underline
                "
              >
                Get Lume.
              </Link>
            )}
          </p>

        </section>


       

      </article>
      <Footer/>
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
