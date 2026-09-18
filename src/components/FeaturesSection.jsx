import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    number: "01",
    title: "Daily Time Limit",
    description:
      'Set a hard cap on the apps that eat your day. Once you hit your limit, Lume steps in — no more "just five more minutes".',
    image: "./images/feature/first.png",
  },

  {
    number: "02",
    title: "Scheduling",
    description:
      "Plan your focus windows in advance. Lume automatically locks distractions during the hours you tell it matter most.",
    image: "./images/feature/second.png",
  },

  {
    number: "03",
    title: "Quick Session",
    description:
      "Need to lock in right now? Start a focus session in one tap — no setup, no scrolling through settings, just instant quiet.",
    image: "./images/feature/third.png",
  },

  {
    number: "04",
    title: "Habit Tracker",
    description:
      'Set a hard cap on the apps that eat your day. Once you hit your limit, Lume steps in — no more "just five more minutes".',
    image: "./images/feature/4th.png",
  },

  {
    number: "05",
    title: "Challenges",
    description:
      "Build consistency with daily and weekly focus challenges that turn staying off your phone into something you actually want to do.",
    image: "./images/feature/five.png",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);

  const imageRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageBgRef = useRef(null);

  const progressRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* ============================================================
     INTRO TEXT SCROLL ANIMATION
  ============================================================ */

  useLayoutEffect(() => {
    if (!introRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(
        ".features-focus-text .char"
      );

      gsap.set(chars, {
        color: "#9da0b3",
      });

      gsap.to(chars, {
        color: "#000000",
        stagger: 0.05,
        ease: "none",

        scrollTrigger: {
          trigger: introRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, introRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ============================================================
     MAIN PINNED FEATURE SCROLL
  ============================================================ */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const total = FEATURES.length;

        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: isDesktop ? `+=${total * 850}` : `+=${total * 480}`,
          pin: true,
          scrub: isDesktop ? 1 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            /* PROGRESS BAR */
            gsap.set(progressRef.current, {
              scaleX: progress,
            });

            /* ACTIVE ITEM */
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

        ScrollTrigger.refresh();
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  /* ============================================================
     IMAGE CHANGE ANIMATION
  ============================================================ */

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;
    const wrapper = imageWrapRef.current;
    const background = imageBgRef.current;

    gsap.killTweensOf(image);
    gsap.killTweensOf(wrapper);
    gsap.killTweensOf(background);

    /*
      Each feature enters differently.
    */

    const animations = [
      {
        x: -120,
        y: 100,
        rotate: -7,
        scale: 0.9,

        bgX: 20,
        bgY: -8,
      },

      {
        x: 130,
        y: 40,
        rotate: 7,
        scale: 0.92,

        bgX: -20,
        bgY: 8,
      },

      {
        x: 0,
        y: 130,
        rotate: -4,
        scale: 0.88,

        bgX: 0,
        bgY: -15,
      },

      {
        x: -130,
        y: 30,
        rotate: 6,
        scale: 0.92,

        bgX: 20,
        bgY: 10,
      },

      {
        x: 120,
        y: 100,
        rotate: -6,
        scale: 0.9,

        bgX: -20,
        bgY: -10,
      },
    ];

    const config =
      animations[activeIndex] ||
      animations[0];

    /* ================================
       PHONE INITIAL POSITION
    ================================= */

    gsap.set(image, {
      x: config.x,
      y: config.y,

      rotate: config.rotate,

      scale: config.scale,

      opacity: 0,

      transformOrigin: "center bottom",
    });

    /* ================================
       WRAPPER SMALL 3D TILT
    ================================= */

    gsap.set(wrapper, {
      rotateY:
        activeIndex % 2 === 0
          ? -5
          : 5,

      rotateX: 3,

      transformPerspective: 1200,
    });

    /* ================================
       BACKGROUND INITIAL POSITION
    ================================= */

    gsap.set(background, {
      x: config.bgX,
      y: config.bgY,

      scale: 0.98,
    });

    /* ================================
       IMAGE ENTER
    ================================= */

    gsap.to(image, {
      x: 0,
      y: 0,

      rotate: 0,

      scale: 1,

      opacity: 1,

      duration: 1,

      ease: "power3.out",

      overwrite: true,
    });

    /* ================================
       WRAPPER RETURN
    ================================= */

    gsap.to(wrapper, {
      rotateX: 0,
      rotateY: 0,

      duration: 1.1,

      ease: "power3.out",

      overwrite: true,
    });

    /* ================================
       PURPLE BACKGROUND PARALLAX
    ================================= */

    gsap.to(background, {
      x: 0,
      y: 0,

      scale: 1,

      duration: 1.15,

      ease: "power3.out",

      overwrite: true,
    });
  }, [activeIndex]);

  return (
    <section
      id="features"
      className="
        w-full
        bg-white
        text-black
      "
    >
      {/* ========================================================
          INTRO
      ======================================================== */}

      <div
        ref={introRef}
        className="
          relative
          flex
          w-full
          items-center
          justify-center
          px-5
          py-10
          sm:px-6
          sm:py-14
          md:py-20
          lg:min-h-[360px]
          max-md:py-6
          max-md:pb-1
          max-sm:py-4
          max-sm:pb-0
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
            px-4
            sm:px-8
            lg:px-16

            max-lg:gap-x-10

            max-md:flex-col
            max-md:items-start
            max-md:gap-y-3.5
            max-sm:gap-y-2.5
            max-md:px-2
            max-sm:px-0
          "
        >
          {/* LABEL */}

          <div className="shrink-0">
            <span
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                rounded-full
                border
                border-black/50
                px-9
                py-2
                text-[9px]
                font-medium

                max-sm:px-7
              "
            >
              Features
            </span>
          </div>

          {/* HEADING */}

          <h2
            className="
              max-w-[620px]

              text-[clamp(38px,4vw,60px)]

              font-medium

              leading-[0.95]

              tracking-[-0.045em]

              max-lg:max-w-[520px]

              max-md:max-w-full

              max-sm:text-[38px]
              max-sm:leading-[0.98]

              max-[380px]:text-[34px]
            "
          >
            <span className="text-black">
              A smarter toolkit for
            </span>

            <br />

            <span className="features-focus-text">
              <SplitText
                text="staying focused."
                charClassName="text-[#9da0b3]"
              />
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              max-w-[390px]

              text-[18px]

              leading-[1.6]

              text-black/50

              max-lg:max-w-[330px]
              max-lg:text-[16px]

              max-md:max-w-[520px]

              max-sm:text-[15px]
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
          PINNED FEATURES
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
        <div
          className="
            relative
            flex
            h-screen
            min-h-[560px]
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-white
            pt-20
            pb-4
            sm:pt-20
            md:pt-20
            md:pb-8
          "
        >
          <div
            className="
              mx-auto
              flex
              flex-col
              justify-center
              items-center
              h-full
              w-full
              max-w-[1400px]
              gap-2.5
              sm:gap-4
              px-4
              sm:px-8
              md:grid
              md:grid-cols-[0.9fr_1.1fr]
              md:gap-8
              md:px-12
              lg:px-16
            "
          >
            {/* ==================================================
                MOBILE ACTIVE FEATURE CONTROLLER (<md)
            ================================================== */}
            <div className="order-2 flex w-full flex-col items-center text-center md:hidden mt-1 sm:mt-2">
              {/* STEP PILLS */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3">
                {FEATURES.map((feat, idx) => {
                  const isCur = activeIndex === idx;
                  return (
                    <button
                      key={feat.number}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`
                        h-8 px-3 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center gap-1.5
                        ${
                          isCur
                            ? "bg-gradient-to-r from-[#9747ff] to-[#7437ff] text-white shadow-md shadow-purple-500/30 scale-105"
                            : "bg-black/5 text-[#85859a] hover:bg-black/10"
                        }
                      `}
                    >
                      <span>{feat.number}</span>
                      {isCur && (
                        <span className="max-[360px]:hidden text-[11px]">
                          {feat.title}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE TITLE & DESCRIPTION */}
              <div className="max-w-md px-4">
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {FEATURES[activeIndex].title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#85859a] leading-relaxed line-clamp-3">
                  {FEATURES[activeIndex].description}
                </p>
              </div>
            </div>

            {/* ==================================================
                DESKTOP FEATURE LIST (>=md)
            ================================================== */}

            <div
              className="
                hidden
                md:flex
                order-1
                flex-col
                justify-center
                h-full
                max-h-[82vh]
              "
            >
              <div className="flex flex-col gap-y-2.5 lg:gap-y-4 xl:gap-y-5">
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
                          min-h-[44px]
                          lg:min-h-[58px]
                          xl:min-h-[70px]
                          items-center
                          gap-3.5
                          lg:gap-5
                        "
                      >
                        {/* ACTIVE BAR */}

                        <div
                          className="
                            relative
                            flex
                            h-[44px]
                            lg:h-[58px]
                            xl:h-[70px]
                            w-[4px]
                            lg:w-[5px]
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

                        {/* NUMBER */}

                        <span
                          className={`
                            mt-0.5
                            w-5
                            lg:w-6
                            shrink-0
                            text-[12px]
                            lg:text-[14px]
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

                        {/* TEXT */}

                        <div>
                          <h3
                            className={`
                              text-[17px]
                              lg:text-[22px]
                              xl:text-[25px]
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
                              mt-0.5
                              lg:mt-1
                              max-w-[480px]
                              text-[12px]
                              lg:text-[14px]
                              xl:text-[16px]
                              leading-[1.4]
                              lg:leading-[1.5]
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
                PHONE IMAGE & PURPLE BACKGROUND
            ================================================== */}

            <div
              className="
                order-1
                md:order-2

                relative

                flex

                items-center
                justify-center

                [perspective:1200px]

                h-[310px]
                sm:h-[370px]
                md:h-full
                max-h-[82vh]

                w-full

                max-w-[320px]
                sm:max-w-[400px]
                md:max-w-none
              "
            >
              {/* PURPLE BACKGROUND */}

              <div
                ref={imageBgRef}
                className="
                  absolute

                  inset-0
                  m-auto

                  h-[88%]
                  sm:h-[90%]
                  md:h-[80%]

                  w-full

                  overflow-hidden

                  rounded-[24px]

                  bg-gradient-to-br

                  from-[#e0d8ff]

                  via-[#d7cbff]

                  to-[#cbbbff]

                  shadow-lg
                  shadow-purple-500/10

                  will-change-transform
                "
              />

              {/* PHONE AREA */}

              <div
                ref={imageWrapRef}
                className="
                  relative

                  z-10

                  flex

                  h-[94%]
                  md:h-[84%]

                  w-full

                  items-center

                  justify-center

                  rounded-[24px]

                  [transform-style:preserve-3d]

                  will-change-transform
                "
              >
                <img
                  key={`${activeIndex}-${FEATURES[activeIndex].image}`}
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

                    max-w-[85%]
                    sm:max-w-[80%]
                    md:max-w-[75%]

                    origin-bottom

                    object-contain

                    will-change-[transform,opacity]

                    select-none
                  "
                  draggable="false"
                />
              </div>
            </div>
          </div>

          {/* ====================================================
              PROGRESS BAR
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