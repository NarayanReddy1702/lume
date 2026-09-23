import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";

const PEOPLE = [
  {
    image: "/images/article1.jpg",
    title: "Knowledge Workers",
    slug: "knowledge-workers",
    tags: ["Developers", "Designers", "Writers", "Analysts"],
    description:
      "For people whose output depends on sustained, uninterrupted concentration.",
  },

  {
    image: "/images/article2.png",
    title: "Students & Aspirants",
    slug: "students-aspirants",
    tags: ["UPSC", "CAT", "NEET", "CA"],
    description:
      "For people turning disciplined study into a real advantage.",
  },

  {
    image: "/images/article3.png",
    title: "Founders & Leaders",
    slug: "founders-leaders",
    tags: ["Operators", "Builders", "Decision-makers"],
    description:
      "For people who protect clear thinking when everyone needs an answer.",
  },

  {
    image: "/images/article4.png",
    title: "Creators",
    slug: "creators",
    tags: ["Writers", "Artists", "Filmmakers", "Musicians"],
    description:
      "For people who need enough quiet to follow an idea all the way through.",
  },
];

export default function WhoItsFor() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    let alive = true;

    async function loadBlogs() {
      setLoadingBlogs(true);
      setApiFailed(false);
      try {
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) throw new Error("Blog request failed");
        const data = await response.json();
        if (alive) setBlogs(Array.isArray(data) ? data : []);
      } catch {
        if (alive) {
          setBlogs([]);
          setApiFailed(true);
        }
      } finally {
        if (alive) setLoadingBlogs(false);
      }
    }

    loadBlogs();
    return () => {
      alive = false;
    };
  }, []);

  const people = useMemo(() => {
    if (apiFailed) return PEOPLE;

    return blogs.map((blog) => ({
      image: blog.heroImage || "/images/article1.jpg",
      title: blog.title,
      slug: blog.slug,
      tags: blog.tags || [],
      description: blog.excerpt || blog.intro?.[0] || "Read the latest from Lume.",
      author: blog.author || "Lume",
      date: formatBlogDate(blog),
    }));
  }, [apiFailed, blogs]);

  /* ============================================================
     HEADING TEXT COLOR SCROLL ANIMATION
  ============================================================ */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(
        ".who-focus-text .char"
      );

      /* Initial gray color */
      gsap.set(chars, {
        color: "#737373",
      });

      /* Gray -> white letter by letter */
      gsap.to(chars, {
        color: "#ffffff",

        stagger: 0.05,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          /*
           * Start when section enters screen.
           */
          start: "top 70%",

          /*
           * Finish while section moves upward.
           */
          end: "top 20%",

          scrub: 1,

          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]

          px-6
          py-20

          sm:px-8

          lg:px-[3.3vw]
          lg:py-[100px]
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-8

            lg:grid-cols-[auto_1.35fr_1fr]
            lg:items-start
          "
        >
          {/* ==================================================
              LABEL
          ================================================== */}

          <div>
            <span
              className="
                inline-flex

                rounded-full

                border
                border-white/50

                px-6
                py-2.5

                text-[13px]
                sm:text-[14px]
                font-medium
                tracking-wide

                text-white
              "
            >
              Who It's For
            </span>
          </div>

          {/* ==================================================
              HEADING
          ================================================== */}

          <div>
            <h2
              ref={headingRef}
              className="
                max-w-[750px]

                text-[clamp(40px,4vw,68px)]

                font-medium

                leading-[0.92]

                tracking-[-0.045em]
              "
            >
              {/* STATIC WHITE PART */}

              <span className="block text-white">
                For every mind that
              </span>

              {/* ==============================================
                  ANIMATED GRAY -> WHITE PART
              ============================================== */}

              <span
                className="
                  who-focus-text
                  block
                "
              >
                <SplitText
                  text="wants to focus deeper"
                  charClassName="text-[#737373]"
                />
              </span>
            </h2>
          </div>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div>
            <p
              className="
                max-w-[380px]

                text-[15px]
                sm:text-[16px]

                leading-[1.65]

                text-white/65
              "
            >
              From students to creators and professionals,
              Lume is built for people who want to stay
              focused on what matters.
            </p>
          </div>
        </div>

        {/* ======================================================
            CARDS
        ====================================================== */}

        <div
          className="
            mt-12

            grid
            grid-cols-1

            gap-5

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {loadingBlogs ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`blog-loading-${index}`}
                className="
                  h-[410px]
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#121217]
                "
              />
            ))
          ) : null}

          {!loadingBlogs && people.map((person, index) => (
            <PersonCard
              key={person.slug || person.title}
              person={person}
              index={index}
            />
          ))}

          {!loadingBlogs && !people.length ? (
            <div
              className="
                col-span-full
                rounded-[13px]
                border
                border-white/10
                bg-[#171717]
                px-6
                py-10
                text-center
                text-[12px]
                text-white/45
              "
            >
              No published blogs yet.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PERSON CARD
============================================================ */

function PersonCard({ person }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${person.slug}`);
  };

  return (
    <article
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          handleClick();
        }
      }}
      className="
        group

        relative

        flex
        flex-col

        cursor-pointer

        overflow-hidden

        rounded-2xl

        border
        border-white/10

        bg-[#121217]

        transition-all

        duration-300

        hover:-translate-y-1
        hover:border-[#7137ff]/40
        hover:shadow-[0_12px_32px_rgba(113,55,255,0.12)]
      "
    >
      {/* ======================================================
          IMAGE
      ====================================================== */}

      <div
        className="
          relative

          h-[230px]

          overflow-hidden

          bg-[#17171d]

          sm:h-[240px]

          lg:h-[210px]

          xl:h-[230px]
        "
      >
        <img
          src={person.image}
          alt={person.title}
          className="
            h-full
            w-full

            object-cover

            transition-transform

            duration-700

            ease-out

            group-hover:scale-[1.06]
          "
        />

        <div
          className="
            pointer-events-none

            absolute

            inset-0

            bg-gradient-to-t

            from-[#121217]

            via-transparent

            to-transparent
          "
        />

        <div
          className="
            absolute
            left-3.5
            top-3.5
            flex
            flex-wrap
            gap-1.5
          "
        >
          {(person.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                border
                border-[#9d5cff]/30
                bg-[#28104a]/90
                px-2.5
                py-0.5
                text-[9px]
                font-semibold
                text-[#b588ff]
                backdrop-blur-md
              "
            >
              {tag}
            </span>
          ))}
          {(person.tags || []).length > 2 ? (
            <span
              className="
                rounded-full
                bg-black/60
                px-2
                py-0.5
                text-[9px]
                text-white/60
                backdrop-blur-md
              "
            >
              +{person.tags.length - 2}
            </span>
          ) : null}
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          flex
          min-h-[190px]
          flex-1
          flex-col
          justify-between

          bg-[#121217]

          p-5
        "
      >
        <div>
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              text-[10px]
              text-white/40
            "
          >
            <span className="flex items-center gap-1">
              <User size={12} className="text-[#9d5cff]" />
              {person.author || "Lume"}
            </span>
            {person.date ? (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {person.date}
                </span>
              </>
            ) : null}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              3 min read
            </span>
          </div>

          <h3
            className="
              mt-3
              text-[18px]
              font-medium
              leading-[1.25]
              tracking-[-0.015em]
              text-white
              transition-colors
              group-hover:text-[#c49aff]
            "
          >
            {person.title}
          </h3>

          <p
            className="
              mt-2
              line-clamp-3
              text-[12px]
              leading-[1.6]
              text-white/55
            "
          >
            {person.description}
          </p>
        </div>

        <div
          className="
            mt-5

            flex

            items-center
            justify-between

            border-t
            border-white/5

            pt-3.5

            text-[11px]

            text-white

            transition-all

            duration-300

            group-hover:gap-2
          "
        >
          <span className="text-white/45 underline decoration-white/20 underline-offset-4 transition group-hover:text-white group-hover:decoration-white/60">
            Quick Preview
          </span>

          <span className="inline-flex items-center gap-1.5 font-medium transition-all group-hover:gap-2.5 group-hover:text-[#b588ff]">
            Read Story

            <ArrowRight
              size={13}
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </article>
  );
}

function formatBlogDate(blog) {
  const value = blog.publishedAt || blog.createdAt;
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
