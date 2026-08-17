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

  const bottomCardRef = useRef(null);
  const bottomFloatRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".choice-text .char");

      const nfcCard = nfcCardRef.current;
      const nfcFlip = nfcFlipRef.current;
      const nfcFloat = nfcFloatRef.current;

      const topCard = topCardRef.current;
      const topFloat = topFloatRef.current;

      const bottomCard = bottomCardRef.current;
      const bottomFloat = bottomFloatRef.current;

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(chars, {
        color: "#555555",
      });

      gsap.set(nfcCard, {
        opacity: 0,
        x: 70,
        y: 0,
        scale: 0.92,

        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      // IMPORTANT:
      // Actual card starts from front side
      gsap.set(nfcFlip, {
        rotateY: 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
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
          start: "top 55%",
          end: "75% 50%",
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
          start: "top 75%",
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
        rotate: 0,

        duration: 1,
        delay: 0.15,

        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      /* =====================================================
         BOTTOM CARD ENTRANCE
      ===================================================== */

      gsap.to(bottomCard, {
        opacity: 1,
        x: 0,
        y: 0,

        scale: 1,
        rotate: 0,

        duration: 1,
        delay: 0.3,

        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      /* =====================================================
         CARD FLIP ON SCROLL
      ===================================================== */

      gsap.to(nfcFlip, {
        rotateY: 180,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          // Front card visible here
          start: "top 45%",

          // Back card fully visible here
          end: "65% 40%",

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

          start: "top 58%",
          end: "bottom 20%",

          scrub: 1.2,

          invalidateOnRefresh: true,
        },
      });

      /* NFC CARD */

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

      /* TOP CARD */

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

      /* BOTTOM CARD */

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
    }, sectionRef);

    return () => {
      ctx.revert();
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

            max-md:mb-12
            max-md:w-full
            max-md:pr-0

            max-sm:mb-8
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

            max-md:h-[650px]
            max-md:w-full

            max-sm:h-[580px]
          "
        >
          <div
            className="
              relative

              h-[450px]
              w-full
              max-w-[560px]

              [perspective:1200px]

              max-md:h-[630px]
              max-md:max-w-[440px]

              max-sm:h-[560px]
              max-sm:max-w-[360px]

              max-[380px]:h-[520px]
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
                max-md:top-[37%]

                max-md:ml-[-165px]

                max-md:h-[196px]
                max-md:w-[330px]

                max-sm:top-[38%]

                max-sm:ml-[-145px]

                max-sm:h-[172px]
                max-sm:w-[290px]

                max-[380px]:ml-[-130px]
                max-[380px]:h-[154px]
                max-[380px]:w-[260px]
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

                max-md:left-0
                max-md:top-[8%]

                max-md:h-[205px]
                max-md:w-[285px]

                max-sm:left-[-8px]
                max-sm:top-[7%]

                max-sm:h-[175px]
                max-sm:w-[245px]

                max-[380px]:h-[160px]
                max-[380px]:w-[220px]
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

                    max-md:rounded-[18px]
                    max-md:p-5

                    max-sm:rounded-[15px]
                    max-sm:p-4
                  "
                >
                  <p className="text-[8px] text-white/40">
                    Focus Impact
                  </p>

                  <p className="mt-5 text-[25px] font-light text-white">
                    87%
                  </p>

                  <p className="mt-1 text-[12px] text-white/90">
                    Users stay focused longer
                  </p>

                  <p className="mt-2 text-[8px] leading-[1.4] text-white/35">
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

                max-md:right-0
                max-md:bottom-0

                max-md:h-[205px]
                max-md:w-[285px]

                max-sm:right-[-8px]
                max-sm:bottom-[1%]

                max-sm:h-[175px]
                max-sm:w-[245px]

                max-[380px]:h-[160px]
                max-[380px]:w-[220px]
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

                    max-md:rounded-[18px]
                    max-md:p-5

                    max-sm:rounded-[15px]
                    max-sm:p-4
                  "
                >
                  <p className="text-[7px] text-white/40">
                    Focus Impact
                  </p>

                  <p className="mt-5 text-[23px] font-light text-white">
                    −47%
                  </p>

                  <p className="mt-1 text-[11px] text-white/90">
                    Avg. screen time
                  </p>

                  <p className="mt-2 text-[7px] leading-[1.4] text-white/35">
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