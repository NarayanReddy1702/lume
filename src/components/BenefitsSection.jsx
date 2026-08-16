import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const BENEFITS = [
  {
    id: "focus",
    label: "Focus",
    icon: "✣",
    image: "/focus.jpg",
    title: "Deep Focus",
    subtitle: "Stay with what matters.",
    description:
      "Cut through the noise and give your best work your full attention. Lume helps create the space to study, build, create, or simply finish what you started.",
    points: [
      "Deeper concentration",
      "Better work quality",
      "Finish what you start",
    ],
  },

  {
    id: "mindful",
    label: "Mindful Use",
    icon: "☯",
    image: "/mindful.avif",
    title: "Mindful Use",
    subtitle: "Use technology with intention.",
    description:
      "Create healthier boundaries with your phone and make every interaction more intentional instead of falling into endless scrolling.",
    points: [
      "Less mindless scrolling",
      "More intentional usage",
      "Better digital habits",
    ],
  },

  {
    id: "sleep",
    label: "Sleep",
    icon: "◔",
    image: "/sleep.avif",
    title: "Better Sleep",
    subtitle: "Give your mind time to switch off.",
    description:
      "Create distraction-free evenings and protect your nighttime routine so your mind can slow down and prepare for better rest.",
    points: [
      "Less nighttime scrolling",
      "Calmer evenings",
      "Better sleep routine",
    ],
  },

  {
    id: "presence",
    label: "Presence",
    icon: "◒",
    image: "/presence.avif",
    title: "Be More Present",
    subtitle: "Put your attention where you are.",
    description:
      "Spend less time checking your phone and more time being present with the people, experiences, and moments that actually matter.",
    points: [
      "More meaningful moments",
      "Better conversations",
      "Less phone checking",
    ],
  },

  {
    id: "living",
    label: "Intentional Living",
    icon: "♨",
    image: "/living.avif",
    title: "Intentional Living",
    subtitle: "Make space for what matters.",
    description:
      "Turn small daily choices into better habits and create more room for the work, relationships, and experiences you genuinely care about.",
    points: [
      "Stronger daily habits",
      "More time for yourself",
      "Live with intention",
    ],
  },
];

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);

  const activeBenefit = BENEFITS[activeTab];

  // =====================================================
  // CHANGE CONTENT ANIMATION
  // =====================================================

  useLayoutEffect(() => {
    if (!imageRef.current || !contentRef.current) return;

    // Kill previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const image = imageRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline();

    animationRef.current = tl;

    // -----------------------------------------------------
    // EXIT
    // -----------------------------------------------------

    tl.to(
      [image, content],
      {
        opacity: 0,
        y: 20,
        duration: 0.22,
        ease: "power2.in",
      }
    );

    // -----------------------------------------------------
    // ENTER
    // -----------------------------------------------------

    tl.set([image, content], {
      opacity: 0,
      y: 30,
    });

    tl.to(
      [image, content],
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.05,
      }
    );

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  // =====================================================
  // TAB CLICK
  // =====================================================

  const handleTabChange = (index) => {
    if (index === activeTab) return;

    setActiveTab(index);
  };

  return (
    <section
      className="
        relative
        min-h-screen
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
          max-w-[1200px]
          px-6
          py-16
          md:px-10
          md:py-20
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col items-center text-center">
          {/* LABEL */}

          <span
            className="
              rounded-full
              border
              border-white/50
              px-5
              py-1.5
              text-[9px]
              tracking-wide
              text-white
            "
          >
            Benefits
          </span>

          {/* TITLE */}

          <h2
            className="
              mt-5
              max-w-[650px]
              text-[clamp(36px,4vw,60px)]
              font-medium
              leading-[0.95]
              tracking-[-0.04em]
            "
          >
            One card. More time for
            <br />
            what matters.
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              max-w-[570px]
              text-[11px]
              leading-[1.6]
              text-white/45
            "
          >
            Lume helps you spend less time fighting
            distraction and more time being present,
            productive, and in control.
          </p>
        </div>

        {/* =================================================
            TABS
        ================================================= */}

        <div
          className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            md:gap-7
          "
        >
          {BENEFITS.map((benefit, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={benefit.id}
                type="button"
                onClick={() =>
                  handleTabChange(index)
                }
                className={`
                  group
                  flex
                  items-center
                  gap-2
                  rounded-[11px]
                  px-4
                  py-3
                  text-[13px]
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
                      : "bg-transparent text-white hover:bg-white/5"
                  }
                `}
              >
                <span
                  className={`
                    text-[17px]
                    transition-transform
                    duration-300
                    ${
                      isActive
                        ? "scale-110"
                        : "opacity-80"
                    }
                  `}
                >
                  {benefit.icon}
                </span>

                <span>{benefit.label}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            mt-8
            grid
            items-center
            gap-12
            md:grid-cols-[1fr_0.9fr]
            md:gap-14
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              h-[300px]
              overflow-hidden
              rounded-[12px]
              bg-[#171717]
              md:h-[350px]
            "
          >
            {/* IMAGE */}

            <img
              ref={imageRef}
              key={activeBenefit.image}
              src={activeBenefit.image}
              alt={activeBenefit.title}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* DARK OVERLAY */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-r
                from-black/10
                via-transparent
                to-black/20
              "
            />

            {/* PURPLE GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -bottom-20
                -left-20
                h-[180px]
                w-[180px]
                rounded-full
                bg-purple-600/10
                blur-[80px]
              "
            />
          </div>

          {/* =================================================
              TEXT CONTENT
          ================================================= */}

          <div
            ref={contentRef}
            className="
              max-w-[430px]
            "
          >
            {/* TITLE */}

            <h3
              className="
                text-[26px]
                font-medium
                tracking-[-0.025em]
                md:text-[30px]
              "
            >
              {activeBenefit.title}
            </h3>

            {/* SUBTITLE */}

            <p
              className="
                mt-1
                text-[12px]
                text-white/75
              "
            >
              {activeBenefit.subtitle}
            </p>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                text-[12px]
                leading-[1.6]
                text-white/40
              "
            >
              {activeBenefit.description}
            </p>

            {/* POINTS */}

            <div className="mt-6 flex flex-col gap-2.5">
              {activeBenefit.points.map(
                (point) => (
                  <div
                    key={point}
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {/* PURPLE CHECK */}

                    <span
                      className="
                        flex
                        h-[13px]
                        w-[13px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#7137ff]
                        text-[8px]
                        text-white
                      "
                    >
                      ✓
                    </span>

                    <span
                      className="
                        text-[10px]
                        text-white/85
                      "
                    >
                      {point}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}