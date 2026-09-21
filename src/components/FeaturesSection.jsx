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

  const imageRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageBgRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);



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

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: isDesktop ? "top 72px" : "top top",
          end: isDesktop ? `+=${total * 850}` : `+=${total * 440}`,
          pin: true,
          scrub: isDesktop ? 1 : 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

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
            h-[100svh]
            min-h-[600px]
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-white
            py-6
            sm:py-8
            md:h-[100svh]
            md:min-h-[560px]
            md:pb-3
            md:pt-14
            lg:pb-4
            lg:pt-12
          "
        >
          <div
            className="
              mx-auto
              flex
              flex-col
              justify-start
              items-center
              h-full
              w-full
              max-w-[1400px]
              gap-3
              sm:gap-4
              px-4
              sm:px-8
              md:grid
              md:h-full
              md:grid-cols-[0.9fr_1.1fr]
              md:grid-rows-[auto_auto]
              md:items-stretch
              md:content-start
              md:gap-x-8
              md:gap-y-4
              md:px-12
              lg:gap-x-12
              lg:gap-y-5
              lg:px-16
            "
          >
            {/* ==================================================
                DESKTOP PINNED INTRO (>=md)
            ================================================== */}
            <div
              className="
                hidden
                md:grid
                md:col-span-2
                md:grid-cols-[0.22fr_1.05fr_0.85fr]
                md:items-start
                md:gap-8
                lg:gap-12
              "
            >
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
                  "
                >
                  Features
                </span>
              </div>

              <h2
                className="
                  max-w-[560px]
                  text-[clamp(28px,2.7vw,42px)]
                  font-medium
                  leading-[1.02]
                  tracking-[-0.035em]
                  text-black
                  lg:max-w-[600px]
                "
              >
                A smarter toolkit for
                <br />
                <span className="features-focus-text block">
                  <SplitText
                    text="staying focused."
                    charClassName="text-black"
                  />
                </span>
              </h2>

              <p
                className="
                  max-w-[390px]
                  text-[14px]
                  leading-[1.4]
                  text-black/50
                  lg:text-[15px]
                "
              >
                Lume combines smart software with a physical NFC card to make
                distraction harder, focus easier, and better habits more
                intentional.
              </p>
            </div>

            {/* ==================================================
                MOBILE PINNED INTRO (<md)
            ================================================== */}
            <div className="order-1 flex w-full flex-col items-start md:hidden">
              <span
                className="
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/50
                  px-8
                  py-2
                  text-[9px]
                  font-medium
                "
              >
                Features
              </span>

              <h2
                className="
                  mt-3
                  max-w-[340px]
                  text-[34px]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.045em]
                  text-black
                  max-[380px]:text-[31px]
                "
              >
                A smarter toolkit for
                <br />
                <span className="features-focus-text">
                  <SplitText
                    text="staying focused."
                    charClassName="text-black"
                  />
                </span>
              </h2>

              <p
                className="
                  mt-3
                  max-w-[330px]
                  text-[14px]
                  leading-[1.55]
                  text-black/50
                  max-[380px]:text-[13px]
                "
              >
                Lume combines smart software with a physical NFC card to make
                distraction harder, focus easier, and better habits more
                intentional.
              </p>
            </div>

            {/* ==================================================
                MOBILE ACTIVE FEATURE CONTROLLER (<md)
            ================================================== */}
            <div className="order-2 flex w-full flex-col items-center text-center md:hidden">
              {/* STEP PILLS */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 mb-3">
                {FEATURES.map((feat, idx) => {
                  const isCur = activeIndex === idx;
                  return (
                    <button
                      key={feat.number}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`
                        min-h-8 px-3 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center gap-1.5
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
                justify-start
                h-full
                min-h-0
                max-h-full
                md:pl-4
                lg:pl-6
              "
            >
              <div className="flex flex-col gap-y-3 lg:gap-y-3.5 xl:gap-y-6">
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
                          min-h-[38px]
                          lg:min-h-[42px]
                          xl:min-h-[46px]
                          items-center
                          gap-8
                          lg:gap-9
                        "
                      >
                        {/* ACTIVE BAR */}

                        <div
                          className="
                            relative
                            flex
                            h-[38px]
                            lg:h-[42px]
                            xl:h-[46px]
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
                            text-[11px]
                            lg:text-[12px]
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
                              text-[15px]
                              lg:text-[17px]
                              xl:text-[18px]
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
                              max-w-[440px]
                              text-[11px]
                              lg:text-[12px]
                              xl:text-[12px]
                              leading-[1.4]
                              lg:leading-[1.45]
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
                order-3
                md:order-2

                relative

                flex
                flex-1

                items-center
                justify-center

                [perspective:1200px]

                  h-auto
                  min-h-[300px]
                  sm:min-h-[360px]
                  md:h-[min(60vh,520px)]
                  lg:h-[min(60vh,540px)]
                max-h-full

                w-full

                max-w-[330px]
                sm:max-w-[390px]
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
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[28px]
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
                  h-full
                  w-full
                  items-center
                  justify-center
                  p-4
                  sm:p-6
                  md:p-8
                  rounded-[28px]
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
                    max-h-[98%]
                    w-auto
                    max-w-[96%]
                    sm:max-w-[92%]
                    md:max-w-[86%]
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
        </div>
    </section>
  );
}
