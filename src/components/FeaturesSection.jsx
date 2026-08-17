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

    const ctx = gsap.context(() => {
      const total = FEATURES.length;

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top top",

        end: `+=${total * 850}`,

        pin: true,

        scrub: 1,

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
          min-h-[430px]
          w-full
          items-center
          justify-center
          px-6
          py-20

          max-lg:min-h-[400px]

          max-md:min-h-[500px]
          max-md:py-16

          max-sm:min-h-[460px]
          max-sm:px-5
          max-sm:py-12
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

            max-lg:gap-x-10

            max-md:flex-col
            max-md:items-start
            max-md:gap-y-8
            max-md:px-4

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
            min-h-[650px]

            w-full

            items-center

            overflow-hidden

            bg-white
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
            {/* ==================================================
                LEFT FEATURE LIST
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
                        {/* ACTIVE BAR */}

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

                        {/* NUMBER */}

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

                        {/* TEXT */}

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
                RIGHT IMAGE
            ================================================== */}

            <div
              className="
                relative

                flex

                items-center

                justify-center

                [perspective:1200px]
              "
            >
              {/* PURPLE BACKGROUND */}

              <div
                ref={imageBgRef}
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

                  will-change-transform
                "
              />

              {/* PHONE AREA */}

              <div
                ref={imageWrapRef}
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

                    max-w-[75%]

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