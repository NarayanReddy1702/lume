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
      Lock distractions before they
      <br />
      begin
    </>
  ),
    body: "Choose the apps that pull you away from what matters. Once locked, they stay locked.",
    img:"/iPhone2.png"
  },
  {
    n: "02",
    title: (<>
    Unlock with <br /> intention</>),
    body: "Instead of another tap, reach for your Lume Card. That small pause turns every unlock into a choice.",
    img:"/iPhone4.png"
  },
  {
    n: "03",
    title: (<>
  Watch better <br /> habits <br /> take shape
    </>),
    body: "Track your sessions, streaks, and progress over time. Small choices today, lasting change tomorrow.",
    img:"/iPhone3.png"
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const panelsRef = useRef([]);
  const dotsRef = useRef([]);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      const dots = dotsRef.current;

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

        // Pin the 100vh container
        pin: pinRef.current,

        start: "top top",

        // 200vh extra scrolling for 3 steps
        end: "+=200%",

        scrub: 1,

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

              gsap.to(panel, {
                opacity: fadeIn,
                y: 40 - fadeIn * 40,
                scale: 0.97 + fadeIn * 0.03,
                duration: 0.3,
                overwrite: true,
              });
            }

            // Previous panels
            else if (index < currentStep) {
              gsap.to(panel, {
                opacity: 0,
                y: -40,
                scale: 0.97,
                duration: 0.3,
                overwrite: true,
              });
            }

            // Future panels
            else {
              gsap.to(panel, {
                opacity: 0,
                y: 40,
                scale: 0.97,
                duration: 0.3,
                overwrite: true,
              });
            }
          });
        },
      });

      // Refresh after everything is rendered
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative w-full bg-black"
      style={{
        height: "300vh",
      }}
    >
      {/* ============================================
          THIS ELEMENT GETS PINNED
      ============================================ */}

      <div
        ref={pinRef}
        className="
          relative
          h-screen
          w-full
          overflow-hidden
          bg-black
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
              gap-12
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
                  px-4
                  py-2
                  text-[10px]
                  tracking-wide
                  text-white/70
                "
              >
                How it works
              </span>

              <h2
                className="
                  mt-6
                  max-w-[520px]
                  text-4xl
                  font-semibold
                  leading-[1.02]
                  tracking-[-0.03em]
                  text-white
                  md:text-5xl
                "
              >
                Designed to protect
                <br />

                <span className="text-white/45">
                  your attention.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-[430px]
                  text-sm
                  leading-relaxed
                  text-white/40
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
                h-[460px]
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
                          : `${
                              (index /
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
                  ml-8
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
                      justify-center
                      gap-8
                      overflow-hidden
                    "
                  >
                    {/* Text */}

                    <div className="w-[250px] shrink-0 ml-10 mt-10">
                      <span
                        className="
                          text-xl
                          font-medium
                          tracking-wide
                          text-white/30
                        "
                      >
                        {step.n}
                      </span>

                      <h3
                        className="
                          mt-3
                          text-2xl
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
                          mt-4
                          text-xs
                          leading-relaxed
                          text-white/40
                        "
                      >
                        {step.body}
                      </p>
                    </div>

                    {/* Phone */}

                    <div className="flex-1 relative ">
                      <img className="absolute bottom-0  w-[290px]" src={step.img} alt="" />
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