import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function RealFrictionSection() {
  const sectionRef = useRef(null);

  const leftPhoneRef = useRef(null);
  const rightPhoneRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const titleChars = gsap.utils.toArray(
        ".friction-title .char"
      );

      const secondLineChars = gsap.utils.toArray(
        ".friction-second-line .char"
      );

      const descriptionChars = gsap.utils.toArray(
        ".friction-description .char"
      );

      /* =====================================================
         INITIAL TEXT COLORS
      ===================================================== */

      gsap.set(titleChars, {
        color: "#555555",
      });

      gsap.set(secondLineChars, {
        color: "#4c4c4c",
      });

      gsap.set(descriptionChars, {
        color: "#3f3f3f",
      });

      /* =====================================================
         INITIAL LEFT IMAGE
      ===================================================== */

      gsap.set(leftPhoneRef.current, {
        opacity: 0,
        x: -100,
        y: 80,
        rotate: -7,
        scale: 0.92,
        transformOrigin: "center bottom",
      });

      /* =====================================================
         INITIAL RIGHT GIF
      ===================================================== */

      gsap.set(rightPhoneRef.current, {
        opacity: 0,
        x: 100,
        y: 80,
        rotate: 7,
        scale: 0.92,
        transformOrigin: "center bottom",
      });

      /* =====================================================
         MAIN PINNED TIMELINE
      ===================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: "+=1800",

          pin: true,

          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         FIRST HEADING
      ===================================================== */

      timeline.to(
        titleChars,
        {
          color: "#ffffff",

          stagger: {
            each: 0.025,
            from: "start",
          },

          ease: "none",
        },
        0
      );

      /* =====================================================
         SECOND HEADING
      ===================================================== */

      timeline.to(
        secondLineChars,
        {
          color: "#ffffff",

          stagger: {
            each: 0.025,
            from: "start",
          },

          ease: "none",
        },
        0.35
      );

      /* =====================================================
         DESCRIPTION
      ===================================================== */

      timeline.to(
        descriptionChars,
        {
          color: "#777777",

          stagger: {
            each: 0.008,
            from: "start",
          },

          ease: "none",
        },
        0.7
      );

      /* =====================================================
         LEFT IMAGE ENTER
      ===================================================== */

      timeline.to(
        leftPhoneRef.current,
        {
          opacity: 1,

          x: 0,
          y: 0,

          rotate: 0,

          scale: 1,

          ease: "power2.out",
        },
        0.4
      );

      /* =====================================================
         RIGHT GIF ENTER
      ===================================================== */

      timeline.to(
        rightPhoneRef.current,
        {
          opacity: 1,

          x: 0,
          y: 0,

          rotate: 0,

          scale: 1,

          ease: "power2.out",
        },
        0.5
      );

      /* =====================================================
         SMALL END MOVEMENT
      ===================================================== */

      timeline.to(
        leftPhoneRef.current,
        {
          y: -15,
          ease: "none",
        },
        1.15
      );

      timeline.to(
        rightPhoneRef.current,
        {
          y: -20,
          ease: "none",
        },
        1.15
      );

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
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1500px]
          flex-col
          items-center
          justify-center
          px-6
          py-14

          sm:px-8

          lg:px-16
          lg:py-16
        "
      >
        {/* =====================================================
            TOP LABEL
        ===================================================== */}

        <div>
          <span
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              px-5
              py-[7px]
              text-[8px]
              font-medium
              text-white
            "
          >
            Real friction
          </span>
        </div>

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mt-5 text-center">
          <h2
            className="
              text-[clamp(40px,4.8vw,74px)]
              font-medium
              leading-[0.92]
              tracking-[-0.05em]
            "
          >
            <span className="friction-title block">
              <SplitText
                text="Distraction never quits."
                charClassName="text-[#555555]"
              />
            </span>

            <span className="friction-second-line block">
              <SplitText
                text="So we built something that does."
                charClassName="text-[#4c4c4c]"
              />
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              friction-description
              mx-auto
              mt-5
              max-w-[610px]
              text-[11px]
              leading-[1.6]
            "
          >
            <SplitText
              text="Most apps are engineered to keep your thumb moving. Lume is engineered to give you a real reason to put it down."
              charClassName="text-[#3f3f3f]"
            />
          </p>
        </div>

        {/* =====================================================
            COMPARISON
        ===================================================== */}

        <div
          className="
            relative
            mt-14

            grid
            w-full
            max-w-[920px]

            grid-cols-[1fr_auto_1fr]

            items-center

            gap-12

            max-lg:gap-8

            max-md:gap-4

            max-sm:mt-10
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {/* LABEL */}

            <div className="mb-4 text-center">
              <p
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                "
              >
                Most Apps
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  text-white
                "
              >
                Easy to bypass
              </p>
            </div>

            {/* LEFT VISUAL */}

            <div
              ref={leftPhoneRef}
              className="
                relative

                flex

                h-[390px]
                w-[260px]

                items-center
                justify-center

                max-lg:h-[380px]
                max-lg:w-[230px]

                max-md:h-[300px]
                max-md:w-[180px]

                max-sm:h-[240px]
                max-sm:w-[145px]
              "
            >
              <img
                src="/iPhone-feature.png"
                alt="Standard app blocking"
                className="
                  h-full
                  w-full

                  object-contain

                  select-none
                "
                draggable="false"
              />
            </div>

            {/* CAPTION */}

            <p
              className="
                mt-4
                text-[7px]
                text-white/35
              "
            >
              A tap makes it disappear
            </p>
          </div>

          {/* =================================================
              VS
          ================================================= */}

          <div
            className="
              flex
              h-full
              min-w-[70px]
              items-center
              justify-center

              max-md:min-w-[40px]
            "
          >
            <span
              className="
                font-serif
                text-[34px]
                italic
                text-white/90

                max-md:text-[25px]
              "
            >
              Vs
            </span>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {/* LABEL */}

            <div className="mb-4 text-center">
              <p
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                "
              >
                Lume
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  text-white
                "
              >
                Hard to ignore
              </p>
            </div>

            {/* RIGHT VISUAL */}

            <div
              ref={rightPhoneRef}
              className="
                relative

                flex

                h-[420px]
                w-[380px]

                items-center
                justify-center

                max-lg:h-[380px]
                max-lg:w-[230px]

                max-md:h-[300px]
                max-md:w-[180px]

                max-sm:h-[240px]
                max-sm:w-[145px]
              "
            >
              <img
                src="/videos/video.gif"
                alt="Lume App"
                className="
                  h-full
                  w-full

                  object-contain

                  select-none
                "
                draggable="false"
              />
            </div>

            {/* CAPTION */}

            <p
              className="
                mt-4
                text-[7px]
                text-white/35
              "
            >
              Only the card brings it back
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}