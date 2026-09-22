import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneMockup from "./PhoneMockup.jsx";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: (
      <>
       Open Your App .. Setup Your 
        <br />
        <span className="whitespace-nowrap">profile (Onboardining)</span>
      </>
    ),
    body: "Choose the apps that pull you away from what matters. Once locked, they stay locked.",
    // img:"/iPhone2.png"
    img: "./images/works/3.gif"
  },
  {
    n: "02",
    title: (
      <>
        Shedule your time (Setup 
        <br />
        <span className="whitespace-nowrap"> Your Session and block Section)</span>
      </>
    ),
    body: "Instead of another tap, reach for your Lume Card. That small pause turns every unlock into a choice.",
    // img:"/iPhone4.png"
    img: "./images/works/4.gif"
  },
  {
    n: "03",
    title: (
      <>
        Unblock your 
        <br />
        <span className="whitespace-nowrap">with card</span>
      </>
    ),
    body: "Track your sessions, streaks, and progress over time. Small choices today, lasting change tomorrow.",
    // img:"/iPhone3.png"
    img: "./images/works/5.gif"
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const panelsRef = useRef([]);
  const dotsRef = useRef([]);
  const progressRef = useRef(null);
  const activeStepRef = useRef(-1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      const dots = dotsRef.current;
      activeStepRef.current = -1;

      // ------------------------------------------
      // INITIAL STATE
      // ------------------------------------------

      gsap.set(panels, {
        opacity: 0,
        y: 40,
        scale: 0.97,
      });

      gsap.set(panels[0], {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // ------------------------------------------
      // MAIN SCROLL TRIGGER
      // ------------------------------------------

      ScrollTrigger.create({
        trigger: sectionRef.current,

        pin: pinRef.current,

        start: "top top",

        end: () => `+=${(STEPS.length - 1) * window.innerHeight}`,

        scrub: 0.8,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          // ----------------------------------------
          // PROGRESS LINE
          // ----------------------------------------

          gsap.set(progressRef.current, {
            height: `${progress * 100}%`,
          });

          // ----------------------------------------
          // CURRENT STEP
          // ----------------------------------------

          const total = STEPS.length;

          const currentStep = Math.min(
            total - 1,
            Math.floor(progress * total)
          );

          // ----------------------------------------
          // DOTS
          // ----------------------------------------

          if (currentStep !== activeStepRef.current) {
            activeStepRef.current = currentStep;

            dots.forEach((dot, index) => {
              const active = index === currentStep;
              const completed = index < currentStep;

              gsap.to(dot, {
                scale: active ? 1.5 : 1,

                backgroundColor:
                  active || completed
                    ? "#b9a6ff"
                    : "rgba(255,255,255,0.18)",

                duration: 0.25,

                overwrite: true,
              });
            });
          }

          // ----------------------------------------
          // PANELS
          // ----------------------------------------

          panels.forEach((panel, index) => {
            if (!panel) return;

            const stepStart = index / total;
            const stepEnd = (index + 1) / total;

            const localProgress =
              (progress - stepStart) /
              (stepEnd - stepStart);

            // Active panel
            if (
              progress >= stepStart &&
              progress < stepEnd
            ) {
              const fadeIn = gsap.utils.clamp(
                0,
                1,
                localProgress * 4
              );

              gsap.set(panel, {
                opacity: fadeIn,
                y: 40 - fadeIn * 40,
                scale: 0.97 + fadeIn * 0.03,
              });
            }

            // Previous panels
            else if (index < currentStep) {
              gsap.set(panel, {
                opacity: 0,
                y: -40,
                scale: 0.97,
              });
            }

            // Future panels
            else {
              gsap.set(panel, {
                opacity: 0,
                y: 40,
                scale: 0.97,
              });
            }
          });
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full bg-black"
    >
      {/* ============================================
          THIS ELEMENT GETS PINNED
      ============================================ */}

      <div
        ref={pinRef}
        className="
          relative
          h-[100svh]
          min-h-[620px]
          w-full
          overflow-hidden
          bg-black
          max-sm:min-h-[680px]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full
            w-full
            max-w-[1400px]
            items-center
            px-6
            lg:px-10
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-1
              items-center
              gap-6
              sm:gap-8
              lg:grid-cols-[0.8fr_1.2fr]
              lg:gap-20
            "
          >
            {/* ========================================
                LEFT SIDE
                DOES NOT CHANGE
            ======================================== */}

            <div className="relative z-10">
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-white/20
                  px-3
                  py-1.5
                  text-[10px]
                  tracking-wide
                  text-white/70
                  sm:px-4
                  sm:py-2
                "
              >
                How it works
              </span>

              <h2
                className="
                  mt-4
                  max-w-[520px]
                  text-2xl
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.03em]
                  text-white
                  sm:mt-6
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Designed to protect
                <br />

                <span className="text-[#9D5CFF]">
                  your attention.
                </span>
              </h2>

              <p
                className="
                  mt-3
                  max-w-[430px]
                  text-xs
                  leading-relaxed
                  text-white/40
                  sm:mt-5
                  sm:text-sm
                "
              >
                Lume combines smart software with a
                physical NFC card to make distraction
                harder, focus easier, and better habits
                more intentional.
              </p>
            </div>

            {/* ========================================
                RIGHT SIDE
            ======================================== */}

            <div
              className="
              relative
              flex
              h-[470px]
              sm:h-[500px]
              md:h-[540px]
              lg:h-[600px]
              xl:h-[540px]
                w-full
                items-center
              "
            >
              {/* Progress rail */}

              <div
                className="
                  relative
                  h-full
                  w-px
                  shrink-0
                  bg-white/10
                "
              >
                {/* Progress */}

                <div
                  ref={progressRef}
                  className="
                    absolute
                    left-0
                    top-0
                    w-px
                    bg-gradient-to-b
                    from-[#b9a6ff]
                    to-[#6941c6]
                  "
                />

                {/* Dots */}

                {STEPS.map((step, index) => (
                  <span
                    key={step.n}
                    ref={(el) => {
                      dotsRef.current[index] = el;
                    }}
                    className="
                      absolute
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rounded-full
                      bg-white/20
                    "
                    style={{
                      top:
                        index === 0
                          ? "0%"
                          : index === STEPS.length - 1
                            ? "100%"
                            : `${(index /
                              (STEPS.length - 1)) *
                            100
                            }%`,
                    }}
                  />
                ))}
              </div>

              {/* ======================================
                  ANIMATED PANELS
              ====================================== */}

              <div
                className="
                  relative
                  ml-4
                  sm:ml-8
                  h-full
                  flex-1
                  border border-zinc-800 
                  rounded-md
                "
              >
                {STEPS.map((step, index) => (
                  <div
                    key={step.n}
                    ref={(el) => {
                      panelsRef.current[index] = el;
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      md:flex-row
                      justify-between
                      items-center
                      overflow-hidden
                      p-4
                      min-[380px]:p-5
                      sm:p-8
                      md:p-8
                      lg:p-10
                    "
                  >
                    {/* Text */}

                    <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 text-left z-10">
                      <span
                        className="
                          text-lg
                          sm:text-xl
                          font-medium
                          tracking-wide
                          text-white/30
                        "
                      >
                        {step.n}
                      </span>

                      <h3
                        className="
                          mt-1
                          sm:mt-3
                          text-lg
                          sm:text-2xl
                          font-semibold
                          leading-[1.05]
                          tracking-tight
                          text-white
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          sm:mt-4
                          text-[11px]
                          sm:text-xs
                          leading-relaxed
                          text-white/40
                        "
                      >
                        {step.body}
                      </p>
                    </div>

                    {/* Phone */}

                    <div className="flex-1 relative w-full h-[250px] sm:h-[280px] md:h-full flex justify-center md:justify-end items-end">
                      <img
                        className="bottom-0 max-h-[240px] sm:max-h-[270px] md:max-h-[96%] lg:max-h-[98%] h-auto md:h-[94%] lg:h-[96%] w-auto max-w-full object-contain select-none"
                        src={step.img}
                        alt="Lume app preview"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
