import { useLayoutEffect, useRef, useState } from "react";
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
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const progressRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * ============================================================
   * MAIN SCROLL ANIMATION
   * ============================================================
   */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = FEATURES.length;

      /*
       * Initial progress bar
       */

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
       * Main pinned ScrollTrigger
       */

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top top",

        /*
         * 850px of scroll for every feature.
         *
         * Increase this to 1000/1200 if you want
         * slower transitions.
         */
        end: `+=${total * 850}`,

        pin: true,

        scrub: 1,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          /*
           * ----------------------------------------
           * Bottom progress bar
           * ----------------------------------------
           */

          gsap.set(progressRef.current, {
            scaleX: progress,
          });

          /*
           * ----------------------------------------
           * Determine active feature
           * ----------------------------------------
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
       * Refresh ScrollTrigger after setup
       */

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*
   * ============================================================
   * IMAGE CHANGE ANIMATION
   * ============================================================
   *
   * Left side is NOT animated here.
   *
   * Only the right image moves.
   */

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;

    /*
     * Kill any previous animation
     */

    gsap.killTweensOf(image);

    /*
     * New image starts below
     */

    gsap.set(image, {
      y: 100,
      opacity: 0,
      scale: 0.96,
    });

    /*
     * Smoothly comes upward
     */

    gsap.to(image, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        bg-white
        text-black
      "
    >
      {/* ========================================================
          PINNED SCREEN
      ========================================================= */}

      <div
        className="
          relative
          flex
          h-screen
          min-h-[650px]
          w-full
          items-center
          overflow-hidden
        "
      >
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
          {/* ====================================================
              LEFT SIDE
              STATIC
          ==================================================== */}

          <div
            className="
              flex
              flex-col
              justify-center
            "
          >
            {/* -----------------------------------------------
                LABEL
            ------------------------------------------------ */}

            <span
              className="
                mb-7
                inline-flex
                w-fit
                rounded-full
                border
                border-black/50
                px-5
                py-2
                text-[9px]
                font-medium
              "
            >
              Features
            </span>

            {/* -----------------------------------------------
                HEADING
            ------------------------------------------------ */}

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

            {/* -----------------------------------------------
                DESCRIPTION
            ------------------------------------------------ */}

            <p
              className="
                mt-5
                max-w-[390px]
                text-[11px]
                leading-[1.6]
                text-black/50
              "
            >
              Lume combines smart software with a
              physical NFC card to make distraction
              harder, focus easier, and better habits
              more intentional.
            </p>

            {/* =================================================
                FEATURE LIST

                IMPORTANT:
                Nothing here moves.
                No GSAP animation.
            ================================================= */}

            <div className="mt-10">
              {FEATURES.map((feature, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={feature.number}
                    className="
                      relative
                      flex
                      min-h-[72px]
                      items-start
                    "
                  >
                    {/* ==========================================
                        PURPLE ACTIVE BAR
                    =========================================== */}

                    <div
                      className="
                        relative
                        mr-6
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

                    {/* ==========================================
                        NUMBER
                    =========================================== */}

                    <span
                      className={`
                        mt-1
                        w-6
                        shrink-0
                        text-[9px]
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

                    {/* ==========================================
                        TEXT
                    =========================================== */}

                    <div>
                      <h3
                        className={`
                          text-[16px]
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
                          text-[9px]
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
              })}
            </div>
          </div>

          {/* ====================================================
              RIGHT SIDE
          ==================================================== */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
            "
          >
            {/* ==================================================
                PURPLE IMAGE BACKGROUND
            ================================================== */}

            <div
              className="
                absolute
                left-0
                top-1/2
                h-[76%]
                w-full
                -translate-y-1/2
                rounded-[18px]
                bg-gradient-to-br
                from-[#e0d8ff]
                via-[#d7cbff]
                to-[#cbbbff]
                overflow-hidden
               
              "
            />

            {/* ==================================================
                IMAGE AREA
            ================================================== */}

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
                key={FEATURES[activeIndex].image}
                ref={imageRef}
                src={FEATURES[activeIndex].image}
                alt={FEATURES[activeIndex].title}
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

        {/* ========================================================
            BOTTOM PROGRESS
        ========================================================= */}

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
    </section>
  );
}