import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    number: "01",
    title: "Daily Time Limit",
    description:
      'Set a hard cap on the apps that eat your day. Once you hit your limit, Lume steps in — no more "just five more minutes".',
    image: "/iPhone2.png",
  },

  {
    number: "02",
    title: "Scheduling",
    description:
      "Plan your focus windows in advance. Lume automatically locks distractions during the hours you tell it matter most.",
    image: "/iPhone4.png",
  },

  {
    number: "03",
    title: "Quick Session",
    description:
      "Need to lock in right now? Start a focus session in one tap — no setup, no scrolling through settings, just instant quiet.",
    image: "/iPhone3.png",
  },

  {
    number: "04",
    title: "Habit Tracker",
    description:
      'Set a hard cap on the apps that eat your day. Once you hit your limit, Lume steps in — no more "just five more minutes".',
    image: "/iPhone2.png",
  },

  {
    number: "05",
    title: "Challenges",
    description:
      "Build consistency with daily and weekly focus challenges that turn staying off your phone into something you actually want to do.",
    image: "/iPhone4.png",
  },
];

export default function FeaturesSection() {
  /*
   * IMPORTANT:
   *
   * sectionRef is ONLY used by GSAP.
   *
   * The "features" ID is on the OUTER wrapper.
   * This means there is only ONE #features element.
   */
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const progressRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* ============================================================
     MAIN SCROLL ANIMATION
  ============================================================ */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = FEATURES.length;

      /*
       * Initial progress bar.
       */
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
       * Main ScrollTrigger.
       */
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top top",

        /*
         * 850px scroll for every feature.
         */
        end: `+=${total * 850}`,

        pin: true,

        scrub: 1,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          /*
           * Update progress bar.
           */
          gsap.set(progressRef.current, {
            scaleX: progress,
          });

          /*
           * Determine active feature.
           */
          const index = Math.min(
            total - 1,
            Math.floor(progress * total)
          );

          setActiveIndex((current) => {
            if (current === index) {
              return current;
            }

            return index;
          });
        },
      });

      /*
       * Refresh ScrollTrigger.
       */
      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ============================================================
     IMAGE CHANGE ANIMATION
  ============================================================ */

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;

    gsap.killTweensOf(image);

    gsap.set(image, {
      y: 100,
      opacity: 0,
      scale: 0.96,
    });

    gsap.to(image, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [activeIndex]);

  return (
    /*
     * =========================================================
     * IMPORTANT
     *
     * ONLY THIS ELEMENT HAS id="features"
     * =========================================================
     */
    <section
      id="features"
      className="w-full bg-white text-black"
    >
      {/* ========================================================
          INTRO / HEADER
      ======================================================== */}

      <div
        className="
          relative
          flex
          min-h-[320px]
          w-full
          items-center
          justify-center
          px-6
          py-20
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1400px]
            items-center
            justify-between
            gap-x-20
            px-8
            lg:px-16
          "
        >

          {/* ====================================================
              FEATURES LABEL
          ==================================================== */}

          <div className="shrink-0">
            <span
              className="
                inline-flex
                w-fit
                rounded-full
                border
                border-black/50
                px-9
                py-2
                text-[9px]
                font-medium
              "
            >
              Features
            </span>
          </div>

          {/* ====================================================
              HEADING
          ==================================================== */}

          <h2
            className="
              max-w-[560px]
              text-[clamp(38px,4vw,60px)]
              font-medium
              leading-[0.95]
              tracking-[-0.045em]
            "
          >
            A smarter toolkit for
            <br />

            <span className="text-[#9da0b3]">
              staying focused.
            </span>
          </h2>

          {/* ====================================================
              DESCRIPTION
          ==================================================== */}

          <p
            className="
              max-w-[390px]
              text-[18px]
              leading-[1.6]
              text-black/50
            "
          >
            Lume combines smart software with a
            physical NFC card to make distraction
            harder, focus easier, and better habits
            more intentional.
          </p>
        </div>
      </div>

      {/* ========================================================
          GSAP SCROLL SECTION
      ======================================================== */}

      <div
        ref={sectionRef}
        className="
          relative
          w-full
          bg-white
          text-black
        "
      >
        {/* ======================================================
            PINNED SCREEN
        ====================================================== */}

        <div
          className="
            relative
            flex
            h-screen
            min-h-[650px]
            w-full
            items-center
            overflow-hidden
            bg-white
          "
        >
          {/* ====================================================
              MAIN FEATURES GRID
          ==================================================== */}

          <div
            className="
              mx-auto
              grid
              h-full
              w-full
              max-w-[1400px]
              grid-cols-1
              gap-8
              px-8
              py-10
              md:grid-cols-[0.9fr_1.1fr]
              md:px-12
              lg:px-16
            "
          >

            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div
              className="
                flex
                flex-col
                justify-center
              "
            >
              <div className="flex flex-col gap-y-5">

                {FEATURES.map(
                  (feature, index) => {
                    const isActive =
                      activeIndex === index;

                    return (
                      <div
                        key={feature.number}
                        className="
                          relative
                          flex
                          min-h-[72px]
                          items-center
                          gap-5
                        "
                      >
                        {/* ======================================
                            PURPLE ACTIVE BAR
                        ====================================== */}

                        <div
                          className="
                            relative
                            flex
                            h-[72px]
                            w-[5px]
                            shrink-0
                          "
                        >
                          {isActive && (
                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-[#9747ff]
                                to-[#7437ff]
                              "
                            />
                          )}
                        </div>

                        {/* ======================================
                            NUMBER
                        ====================================== */}

                        <span
                          className={`
                            mt-1
                            w-6
                            shrink-0
                            text-[14px]
                            transition-colors
                            duration-300

                            ${
                              isActive
                                ? "text-[#7c3aed]"
                                : "text-[#b9b9c4]"
                            }
                          `}
                        >
                          {feature.number}
                        </span>

                        {/* ======================================
                            TEXT
                        ====================================== */}

                        <div>
                          <h3
                            className={`
                              text-[25px]
                              font-semibold
                              leading-tight
                              transition-colors
                              duration-300

                              ${
                                isActive
                                  ? "text-black"
                                  : "text-[#b8b8b8]"
                              }
                            `}
                          >
                            {feature.title}
                          </h3>

                          <p
                            className={`
                              mt-1
                              max-w-[480px]
                              text-[16px]
                              leading-[1.5]
                              transition-colors
                              duration-300

                              ${
                                isActive
                                  ? "text-[#85859a]"
                                  : "text-[#d0d0d8]"
                              }
                            `}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}

              </div>
            </div>

            {/* ==================================================
                RIGHT SIDE
            ================================================== */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
              "
            >

              {/* =================================================
                  PURPLE IMAGE BACKGROUND
              ================================================= */}

              <div
                className="
                  absolute
                  left-0
                  top-1/2
                  h-[76%]
                  w-full
                  -translate-y-1/2
                  overflow-hidden
                  rounded-[18px]
                  bg-gradient-to-br
                  from-[#e0d8ff]
                  via-[#d7cbff]
                  to-[#cbbbff]
                "
              />

              {/* =================================================
                  IMAGE AREA
              ================================================= */}

              <div
                className="
                  relative
                  bottom-2
                  z-10
                  flex
                  h-[78%]
                  w-full
                  items-end
                  justify-center
                  rounded-[18px]
                "
              >
                <img
                  key={
                    FEATURES[activeIndex].image
                  }
                  ref={imageRef}
                  src={
                    FEATURES[activeIndex].image
                  }
                  alt={
                    FEATURES[activeIndex].title
                  }
                  className="
                    h-auto
                    max-h-[95%]
                    w-auto
                    max-w-[75%]
                    object-contain
                    will-change-transform
                    select-none
                  "
                  draggable="false"
                />
              </div>
            </div>
          </div>

          {/* ====================================================
              BOTTOM PROGRESS
          ==================================================== */}

          <div
            className="
              absolute
              bottom-8
              left-1/2
              hidden
              h-[2px]
              w-[180px]
              -translate-x-1/2
              overflow-hidden
              rounded-full
              bg-black/10
              md:block
            "
          >
            <div
              ref={progressRef}
              className="
                h-full
                w-full
                origin-left
                scale-x-0
                rounded-full
                bg-gradient-to-r
                from-[#9747ff]
                to-[#7437ff]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}