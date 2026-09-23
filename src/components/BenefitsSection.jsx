import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BENEFITS = [
  {
    id: "focus",
    label: "Intentional Living",
    icon: "✣",
    image: "/images/benefits/benefit1.png",
    title: "Be here. Not everywhere.",
    subtitle: "",
    description:
      "Put the phone down and give the people, places, and moments in front of you your full attention.",
    points: [
      "Better conversations",
      "Fewer “just one second” moments",
      "More memories worth keeping",
    ],
  },

  {
    id: "mindful",
    label: "Control",
    icon: "☯",
    image: "/images/benefits/benefit2.png",
    title: "Choose. Don’t react.",
    subtitle: "",
    description:
      "Your attention shouldn’t belong to whatever notification appears next. Lume gives you the friction to make the choice yourself.",
    points: [
      "Interrupt impulsive scrolling",
      "Make intentional choices",
      "Stay in control of your attention",
    ],
  },

  {
    id: "sleep",
    label: "Sleep",
    icon: "◔",
    image: "/images/benefits/benefit3.png",
    title: "Put the day down.",
    subtitle: "",
    description:
      "Your brain doesn’t need another scroll before bed. Lume helps you create a real boundary between your screen and your sleep.",
    points: [
      "Wind down without endless scrolling",
      "Keep your phone out of the bedroom routine",
      "Wake up feeling more rested",
    ],
  },

  {
    id: "presence",
    label: "Presence",
    icon: "◒",
    image: "/images/benefits/benefit4.png",
    title: "Make time for your life.",
    subtitle: "",
    description:
      "Reclaimed time only matters when you do something meaningful with it. Lume helps you turn empty scrolling hours into things you actually care about.",
    points: [
      "Read more",
      "Learn something new",
      "Make something real",
    ],
  },
];

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const activeBenefit = BENEFITS[activeTab];

  const handleTabChange = (index) => {
    if (index === activeTab) return;

    setActiveTab(index);
  };

  return (
    <section
      id="benefits"
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
              text-[clamp(36px,4vw,40px)]
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
            {/* STACKED PRELOADED IMAGES WITH SMOOTH CROSS-FADE */}
            {BENEFITS.map((benefit, index) => {
              const isActive = activeTab === index;
              return (
                <img
                  key={benefit.id}
                  src={benefit.image}
                  alt={benefit.title}
                  className={`
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-all
                    duration-500
                    ease-out
                    ${
                      isActive
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                    }
                  `}
                />
              );
            })}

            {/* DARK OVERLAY */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
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
                z-20
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

          <div className="min-h-[260px] max-w-[430px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBenefit.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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
                {activeBenefit.subtitle && (
                  <p
                    className="
                      mt-1
                      text-[12px]
                      text-white/75
                    "
                  >
                    {activeBenefit.subtitle}
                  </p>
                )}

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
                  {activeBenefit.points.map((point) => (
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
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
