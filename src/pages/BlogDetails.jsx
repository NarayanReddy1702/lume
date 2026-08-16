import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BLOGS } from "../data/blogData";
import Footer from "../components/Footer";

export default function BlogDetails() {
  const { slug } = useParams();

  const blog = BLOGS[slug];
useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, []);
  if (!blog) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <div className="mx-auto max-w-[760px]">
          <h1 className="text-4xl font-medium">
            Article not found
          </h1>

          <Link
  to="/#who-its-for"
  className="
    text-[11px]
    text-white/50
    transition-colors
    hover:text-white
  "
>
  ← Back to Lume
</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

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

           <Link
  to="/#who-its-for"
  className="
    text-[11px]
    text-white/50
    transition-colors
    hover:text-white
  "
>
  ← Back to Lume
</Link>
        

        </div>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
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

          <span>{blog.date}</span>
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
            src={blog.heroImage}
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
          {blog.intro.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>


        {/* ======================================================
            ARTICLE SECTIONS
        ====================================================== */}

        <div className="mt-8">

          {blog.sections.map((section, index) => (
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
                {section.paragraphs.map(
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
            {blog.closing.split("Get Lume.")[0]}

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
          </p>

        </section>


       

      </article>
      <Footer/>
    </main>
  );
}