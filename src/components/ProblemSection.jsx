import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function LumeChoiceSection() {
  const sectionRef = useRef(null);

  const textRef = useRef(null);

  const nfcCardRef = useRef(null);
  const nfcFloatRef = useRef(null);

  const topCardRef = useRef(null);
  const topFloatRef = useRef(null);

  const bottomCardRef = useRef(null);
  const bottomFloatRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =====================================================
      // ELEMENTS
      // =====================================================

      const chars = gsap.utils.toArray(
        ".choice-text .char"
      );

      const nfcCard = nfcCardRef.current;
      const nfcFloat = nfcFloatRef.current;

      const topCard = topCardRef.current;
      const topFloat = topFloatRef.current;

      const bottomCard = bottomCardRef.current;
      const bottomFloat = bottomFloatRef.current;

      // =====================================================
      // INITIAL STATES
      // =====================================================

      gsap.set(chars, {
        color: "#555555",
      });

      gsap.set(nfcCard, {
        opacity: 0,
        x: 70,
        scale: 0.92,
        rotateX: 5,
        rotateY: -8,
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

      // =====================================================
      // TEXT COLOR REVEAL
      // =====================================================

      gsap.to(chars, {
        color: "#ffffff",
        stagger: 0.025,
        duration: 0.5,
        ease: "power2.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 35%",
          end: "75% 50%",
          scrub: true,
        },
      });

      // =====================================================
      // NFC CARD ENTRANCE
      // =====================================================

      gsap.to(nfcCard, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,

        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // =====================================================
      // TOP CARD ENTRANCE
      // =====================================================

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

      // =====================================================
      // BOTTOM CARD ENTRANCE
      // =====================================================

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

      // =====================================================
      // NFC 3D SCROLL MOVEMENT
      // =====================================================

      gsap.to(nfcCard, {
        rotateY: 4,
        rotateX: 2,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // =====================================================
      // TOP CARD SCROLL MOVEMENT
      // =====================================================

      gsap.to(topCard, {
        rotate: -2,
        y: -8,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // =====================================================
      // BOTTOM CARD SCROLL MOVEMENT
      // =====================================================

      gsap.to(bottomCard, {
        rotate: 2,
        y: 10,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // =====================================================
      // CONTINUOUS FLOATING
      // =====================================================

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

      // =====================================================
      // REFRESH
      // =====================================================

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
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1920px]
          items-center
          px-[5vw]
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
            "
          >
            {/* LINE 1 */}

            <SplitText
              text="Your phone isn't the problem."
              charClassName="text-white"
            />

            <br />

            {/* LINE 2 */}

            <SplitText
              text="The next tap is."
              charClassName="text-white"
            />

            <span className="text-[#555555]">
              {" "}

              <SplitText
                text="Lume turns"
                charClassName="text-[#555555]"
              />
            </span>

            <br />

            {/* LINE 3 */}

            <SplitText
              text="every unlock into a deliberate"
              charClassName="text-[#555555]"
            />

            <br />

            {/* LINE 4 */}

            <SplitText
              text="choice with a simple NFC card."
              charClassName="text-[#555555]"
            />
          </h2>
        </div>

        {/* =====================================================
            RIGHT SIDE
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
          "
        >
          {/* ===================================================
              RIGHT ANIMATION STAGE
          =================================================== */}

          <div
            className="
              relative
              h-[450px]
              w-full
              max-w-[560px]
              [perspective:1200px]
            "
          >
            {/* =================================================
                NFC CARD
            ================================================= */}

            <div
              ref={nfcCardRef}
              className="
                nfc-card
                absolute
                left-[18%]
                top-[28%]
                z-10
                h-[175px]
                w-[295px]
                [transform-style:preserve-3d]
              "
            >
            <img src="Card.png" alt="" />
            </div>

            {/* =================================================
                TOP STAT CARD
            ================================================= */}

            <div
              ref={topCardRef}
              className="
                impact-card-top
                absolute
                left-[0%]
                top-[9%]
                z-30
                h-[155px]
                w-[200px]
              "
            >
              <div
                ref={topFloatRef}
                className="
                  top-float
                  h-full
                  w-full
                "
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
                  "
                >
                  {/* TITLE */}

                  <p
                    className="
                      text-[8px]
                      text-white/40
                    "
                  >
                    Focus Impact
                  </p>

                  {/* NUMBER */}

                  <p
                    className="
                      mt-5
                      text-[25px]
                      font-light
                      tracking-tight
                      text-white
                    "
                  >
                    87%
                  </p>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-1
                      text-[12px]
                      leading-tight
                      text-white/90
                    "
                  >
                    Users stay focused longer
                  </p>

                  {/* SMALL TEXT */}

                  <p
                    className="
                      mt-2
                      text-[8px]
                      leading-[1.4]
                      text-white/35
                    "
                  >
                    Small moments of friction lead
                    to better attention.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                BOTTOM STAT CARD
            ================================================= */}

            <div
              ref={bottomCardRef}
              className="
                impact-card-bottom
                absolute
                bottom-[5%]
                right-[5%]
                z-30
                h-[152px]
                w-[217px]
              "
            >
              <div
                ref={bottomFloatRef}
                className="
                  bottom-float
                  h-full
                  w-full
                "
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
                  "
                >
                  {/* TITLE */}

                  <p
                    className="
                      text-[7px]
                      text-white/40
                    "
                  >
                    Focus Impact
                  </p>

                  {/* NUMBER */}

                  <p
                    className="
                      mt-5
                      text-[23px]
                      font-light
                      tracking-tight
                      text-white
                    "
                  >
                    −47%
                  </p>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-tight
                      text-white/90
                    "
                  >
                    Avg. screen time
                  </p>

                  {/* SMALL TEXT */}

                  <p
                    className="
                      mt-2
                      text-[7px]
                      leading-[1.4]
                      text-white/35
                    "
                  >
                    Break the scroll before it
                    becomes a habit.
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