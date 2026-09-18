import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function LumeChoiceSection() {
  const sectionRef = useRef(null);

  const textRef = useRef(null);

  // Whole card position
  const nfcCardRef = useRef(null);

  // Actual flipping element
  const nfcFlipRef = useRef(null);

  // Floating wrapper
  const nfcFloatRef = useRef(null);

  const topCardRef = useRef(null);
  const topFloatRef = useRef(null);
  const topNumberRef = useRef(null);

  const bottomCardRef = useRef(null);
  const bottomFloatRef = useRef(null);
  const bottomNumberRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const chars = gsap.utils.toArray(".choice-text .char");

        const nfcCard = nfcCardRef.current;
        const nfcFlip = nfcFlipRef.current;
        const nfcFloat = nfcFloatRef.current;

        const topCard = topCardRef.current;
        const topFloat = topFloatRef.current;
        const topNumber = topNumberRef.current;

        const bottomCard = bottomCardRef.current;
        const bottomFloat = bottomFloatRef.current;
        const bottomNumber = bottomNumberRef.current;

        /* =====================================================
           INITIAL STATES
        ===================================================== */

        gsap.set(chars, {
          color: "#555555",
        });

        if (isDesktop) {
          gsap.set(nfcCard, {
            opacity: 0,
            x: 70,
            y: 0,
            scale: 0.92,
            transformPerspective: 1200,
            transformOrigin: "center center",
          });

          gsap.set(topCard, {
            opacity: 0,
            x: -40,
            y: -30,
            scale: 0.92,
            rotate: -4,
          });

          gsap.set(bottomCard, {
            opacity: 0,
            x: 40,
            y: 30,
            scale: 0.92,
            rotate: 4,
          });
        } else {
          gsap.set(nfcCard, {
            opacity: 0,
            x: 0,
            y: 20,
            scale: 0.96,
            transformPerspective: 1200,
            transformOrigin: "center center",
          });

          gsap.set(topCard, {
            opacity: 0,
            x: 0,
            y: 20,
            scale: 0.96,
            rotate: -2,
          });

          gsap.set(bottomCard, {
            opacity: 0,
            x: 0,
            y: 20,
            scale: 0.96,
            rotate: 2,
          });
        }

        gsap.set(nfcFlip, {
          rotateY: 0,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        });

        gsap.set(topNumber, {
          textContent: "0%",
        });

        gsap.set(bottomNumber, {
          textContent: "0%",
        });

        /* =====================================================
           TEXT REVEAL
        ===================================================== */

        gsap.to(chars, {
          color: "#ffffff",
          stagger: 0.025,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 55%" : "top 70%",
            end: isDesktop ? "75% 50%" : "60% 40%",
            scrub: true,
          },
        });

        /* =====================================================
           NFC ENTRANCE
        ===================================================== */

        gsap.to(nfcCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 75%" : "top 65%",
            once: true,
          },
        });

        /* =====================================================
           TOP CARD ENTRANCE
        ===================================================== */

        gsap.to(topCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: isDesktop ? 0 : -2,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 72%" : "top 65%",
            once: true,
          },
        });

        gsap.to(
          { value: 0 },
          {
            value: 87,
            duration: 1.1,
            delay: 0.25,
            ease: "power2.out",
            snap: {
              value: 1,
            },
            onUpdate() {
              topNumber.textContent = `${this.targets()[0].value}%`;
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isDesktop ? "top 72%" : "top 65%",
              once: true,
            },
          }
        );

        /* =====================================================
           BOTTOM CARD ENTRANCE
        ===================================================== */

        gsap.to(bottomCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: isDesktop ? 0 : 2,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 70%" : "top 60%",
            once: true,
          },
        });

        gsap.to(
          { value: 0 },
          {
            value: -47,
            duration: 1.1,
            delay: 0.4,
            ease: "power2.out",
            snap: {
              value: 1,
            },
            onUpdate() {
              bottomNumber.textContent = `${this.targets()[0].value}%`;
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isDesktop ? "top 70%" : "top 60%",
              once: true,
            },
          }
        );

        /* =====================================================
           CARD FLIP ON SCROLL
        ===================================================== */

        gsap.to(nfcFlip, {
          rotateY: 180,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 70%" : "top 55%",
            end: isDesktop ? "center center" : "bottom 90%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        /* =====================================================
           CARDS UPLIFT TOGETHER
        ===================================================== */

        const upliftTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? "top 58%" : "top 40%",
            end: isDesktop ? "bottom 20%" : "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        if (isDesktop) {
          upliftTimeline.to(
            nfcCard,
            {
              y: -115,
              x: -8,
              scale: 1.03,
              ease: "none",
            },
            0
          );

          upliftTimeline.to(
            topCard,
            {
              y: -120,
              x: -15,
              scale: 1.02,
              rotate: -3,
              ease: "none",
            },
            0
          );

          upliftTimeline.to(
            bottomCard,
            {
              y: -115,
              x: 8,
              scale: 1.02,
              rotate: 2,
              ease: "none",
            },
            0
          );
        } else {
          upliftTimeline.to(
            nfcCard,
            {
              y: -20,
              x: 0,
              scale: 1.01,
              ease: "none",
            },
            0
          );

          upliftTimeline.to(
            topCard,
            {
              y: -15,
              x: 0,
              scale: 1.01,
              rotate: -2,
              ease: "none",
            },
            0
          );

          upliftTimeline.to(
            bottomCard,
            {
              y: -15,
              x: 0,
              scale: 1.01,
              rotate: 2,
              ease: "none",
            },
            0
          );
        }

        /* =====================================================
           FLOATING
        ===================================================== */

        gsap.to(nfcFloat, {
          y: -6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(topFloat, {
          y: -7,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(bottomFloat, {
          y: -6,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        ScrollTrigger.refresh();
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black

        max-md:min-h-[1050px]
        max-md:py-16

        max-sm:min-h-[900px]
        max-sm:py-12
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1920px]
          items-center
          px-[5vw]

          max-md:min-h-0
          max-md:flex-col
          max-md:items-stretch
          max-md:px-6

          max-sm:px-5
        "
      >
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div
          className="
            relative
            z-20
            w-1/2
            pr-[4vw]

            max-md:mb-16
            max-md:w-full
            max-md:pr-0

            max-sm:mb-12
          "
        >
          <h2
            ref={textRef}
            className="
              choice-text
              max-w-[900px]

              text-[clamp(42px,3vw,72px)]
              font-medium
              leading-[0.98]
              tracking-[-0.035em]

              max-md:text-[48px]
              max-md:leading-[1.03]

              max-sm:text-[36px]
              max-sm:leading-[1.05]

              max-[390px]:text-[33px]
              max-[350px]:text-[30px]
            "
          >
            {/* DESKTOP */}

            <span className="max-md:hidden">
              <SplitText
                text="Your phone isn't the problem."
                charClassName="text-white"
              />

              <br />

              <SplitText
                text="The next tap is."
                charClassName="text-white"
              />

              <span>
                {" "}
                <SplitText
                  text="Lume turns"
                  charClassName="text-[#555555]"
                />
              </span>

              <br />

              <SplitText
                text="every unlock into a deliberate"
                charClassName="text-[#555555]"
              />

              <br />

              <SplitText
                text="choice with a simple NFC card."
                charClassName="text-[#555555]"
              />
            </span>

            {/* MOBILE */}

            <span className="hidden max-md:block">
              <SplitText
                text="Your phone isn't"
                charClassName="text-white"
              />

              <br />

              <SplitText
                text="the problem."
                charClassName="text-white"
              />

              <br />

              <SplitText
                text="The next tap is."
                charClassName="text-white"
              />

              {" "}

              <SplitText
                text="Lume turns"
                charClassName="text-[#555555]"
              />

              <br />

              <SplitText
                text="every unlock into a deliberate"
                charClassName="text-[#555555]"
              />

              <br />

              <SplitText
                text="choice with a simple NFC"
                charClassName="text-[#555555]"
              />

              <br />

              <SplitText
                text="card."
                charClassName="text-[#555555]"
              />
            </span>
          </h2>
        </div>

        {/* =====================================================
            RIGHT VISUAL
        ===================================================== */}

        <div
          className="
            relative
            z-10

            flex
            h-[520px]
            w-1/2

            items-center
            justify-center

            max-md:h-[600px]
            max-md:w-full

            max-sm:h-[520px]
          "
        >
          <div
            className="
              relative

              h-[450px]
              w-full
              max-w-[560px]

              [perspective:1200px]

              max-md:h-[580px]
              max-md:max-w-[420px]

              max-sm:h-[500px]
              max-sm:max-w-[340px]

              max-[380px]:h-[460px]
              max-[380px]:max-w-[300px]
            "
          >
            {/* =================================================
                FLIPPING NFC CARD
            ================================================= */}

            <div
              ref={nfcCardRef}
              className="
                absolute

                left-[18%]
                top-[28%]

                z-10

                h-[175px]
                w-[295px]

                max-md:left-1/2
                max-md:top-[38%]

                max-md:ml-[-150px]

                max-md:h-[180px]
                max-md:w-[300px]

                max-sm:top-[38%]

                max-sm:ml-[-135px]

                max-sm:h-[162px]
                max-sm:w-[270px]

                max-[380px]:ml-[-120px]
                max-[380px]:h-[144px]
                max-[380px]:w-[240px]
              "
            >
              <div
                ref={nfcFloatRef}
                className="
                  h-full
                  w-full
                  [perspective:1200px]
                "
              >
                {/* ACTUAL FLIPPER */}

                <div
                  ref={nfcFlipRef}
                  className="
                    relative

                    h-full
                    w-full

                    [transform-style:preserve-3d]
                  "
                >
                  {/* =============================
                      FRONT SIDE
                  ============================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      h-full
                      w-full

                      overflow-hidden

                      rounded-[18px]

                      [backface-visibility:hidden]
                      [-webkit-backface-visibility:hidden]
                    "
                  >
                    <img
                      src="/CardFront.png"
                      alt="Lume NFC Card Front"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </div>

                  {/* =============================
                      BACK SIDE
                  ============================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      h-full
                      w-full

                      overflow-hidden

                      rounded-[18px]

                      [transform:rotateY(180deg)]

                      [backface-visibility:hidden]
                      [-webkit-backface-visibility:hidden]
                    "
                  >
                    <img
                      src="/CardBack.png"
                      alt="Lume NFC Card Back"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                87% CARD
            ================================================= */}

            <div
              ref={topCardRef}
              className="
                absolute

                left-0
                top-[9%]

                z-30

                h-[155px]
                w-[200px]

                max-md:left-2
                max-md:top-[2%]

                max-md:h-[185px]
                max-md:w-[260px]

                max-sm:left-1
                max-sm:top-[2%]

                max-sm:h-[162px]
                max-sm:w-[225px]

                max-[380px]:h-[148px]
                max-[380px]:w-[200px]
              "
            >
              <div
                ref={topFloatRef}
                className="h-full w-full"
              >
                <div
                  className="
                    h-full
                    w-full

                    rounded-[11px]

                    border
                    border-purple-400/10

                    bg-gradient-to-br
                    from-[#1b0c30]
                    via-[#181322]
                    to-[#292929]

                    p-3

                    shadow-[0_20px_50px_rgba(0,0,0,0.45)]

                    max-md:rounded-[16px]
                    max-md:p-4

                    max-sm:rounded-[14px]
                    max-sm:p-3.5
                  "
                >
                  <p className="text-[8px] text-white/40">
                    Focus Impact
                  </p>

                  <p
                    ref={topNumberRef}
                    className="mt-4 text-[25px] font-light text-white max-sm:mt-2 max-sm:text-[22px]"
                  >
                    0%
                  </p>

                  <p className="mt-1 text-[12px] text-white/90 max-sm:text-[11px]">
                    Users stay focused longer
                  </p>

                  <p className="mt-1.5 text-[8px] leading-[1.4] text-white/35 max-sm:text-[7.5px]">
                    Small moments of friction lead to better attention.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                -47% CARD
            ================================================= */}

            <div
              ref={bottomCardRef}
              className="
                absolute

                bottom-[5%]
                right-[5%]

                z-30

                h-[152px]
                w-[217px]

                max-md:right-2
                max-md:bottom-[2%]

                max-md:h-[185px]
                max-md:w-[260px]

                max-sm:right-1
                max-sm:bottom-[2%]

                max-sm:h-[162px]
                max-sm:w-[225px]

                max-[380px]:h-[148px]
                max-[380px]:w-[200px]
              "
            >
              <div
                ref={bottomFloatRef}
                className="h-full w-full"
              >
                <div
                  className="
                    h-full
                    w-full

                    rounded-[11px]

                    border
                    border-purple-400/10

                    bg-gradient-to-br
                    from-[#1b0c30]
                    via-[#181322]
                    to-[#292929]

                    p-3

                    shadow-[0_20px_50px_rgba(0,0,0,0.45)]

                    max-md:rounded-[16px]
                    max-md:p-4

                    max-sm:rounded-[14px]
                    max-sm:p-3.5
                  "
                >
                  <p className="text-[7px] text-white/40">
                    Focus Impact
                  </p>

                  <p
                    ref={bottomNumberRef}
                    className="mt-4 text-[23px] font-light text-white max-sm:mt-2 max-sm:text-[22px]"
                  >
                    0%
                  </p>

                  <p className="mt-1 text-[11px] text-white/90 max-sm:text-[11px]">
                    Avg. screen time
                  </p>

                  <p className="mt-1.5 text-[7px] leading-[1.4] text-white/35 max-sm:text-[7.5px]">
                    Break the scroll before it becomes a habit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
