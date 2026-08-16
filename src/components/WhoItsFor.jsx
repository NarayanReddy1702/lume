import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  return (
    <section  id="who-its-for" className="relative w-full overflow-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-8 lg:px-[3.3vw] lg:py-[100px]">

        {/* HEADER */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.28fr_1.35fr_0.9fr] lg:items-start">

          {/* LABEL */}

          <div>
            <span
              className="
                inline-flex
                rounded-full
                border
                border-white/50
                px-6
                py-2
                text-[9px]
                font-medium
                tracking-wide
                text-white
              "
            >
              Who It's For
            </span>
          </div>

          {/* HEADING */}

          <div>
            <h2
              className="
                max-w-[650px]
                text-[clamp(40px,4vw,68px)]
                font-medium
                leading-[0.92]
                tracking-[-0.045em]
              "
            >
              <span className="block text-white">
                For every mind that
              </span>

              <span className="block text-white/55">
                wants to focus deeper
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}

          <div>
            <p
              className="
                max-w-[320px]
                text-[11px]
                leading-[1.55]
                text-white/45
              "
            >
              From students to creators and professionals,
              Lume is built for people who want to stay
              focused on what matters.
            </p>
          </div>
        </div>

        {/* CARDS */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {PEOPLE.map((person, index) => (
            <PersonCard
              key={person.title}
              person={person}
              index={index}
            />
          ))}
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
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[13px]
        bg-[#171717]
        transition-transform
        duration-500
        ease-out
        hover:-translate-y-1
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          h-[230px]
          overflow-hidden
          sm:h-[250px]
          lg:h-[230px]
          xl:h-[250px]
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
            from-black/30
            via-transparent
            to-transparent
          "
        />
      </div>


      {/* CONTENT */}

      <div
        className="
          min-h-[150px]
          bg-[#171717]
          px-4
          py-4
        "
      >

        {/* TITLE */}

        <h3
          className="
            text-[14px]
            font-medium
            tracking-[-0.01em]
            text-white
          "
        >
          {person.title}
        </h3>


        {/* TAGS */}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {person.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-[2px]
                bg-[#28104a]
                px-2
                py-[3px]
                text-[7px]
                font-medium
                text-[#9d5cff]
              "
            >
              {tag}
            </span>
          ))}
        </div>


        {/* DESCRIPTION */}

        <p
          className="
            mt-3
            max-w-[220px]
            text-[8px]
            leading-[1.5]
            text-white/40
          "
        >
          {person.description}
        </p>


        {/* LEARN MORE */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-1
            text-[9px]
            text-white
            transition-all
            duration-300
            group-hover:gap-2
          "
        >
          Learn more

          <ArrowRight
            size={12}
            strokeWidth={1.5}
          />
        </div>

      </div>
    </article>
  );
}