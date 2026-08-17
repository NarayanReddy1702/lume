import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessFocusSection() {
  const sectionRef = useRef(null);

  const backPhoneRef = useRef(null);
  const frontPhoneRef = useRef(null);
  const shadowRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ==========================================
         INITIAL STATES
      ========================================== */

      gsap.set(backPhoneRef.current, {
        y: 180,
        opacity: 0,
        scale: 0.9,
        rotate: -4,
      });

      gsap.set(frontPhoneRef.current, {
        y: 210,
        opacity: 0,
        scale: 0.88,
        rotate: 5,
      });

      gsap.set(shadowRef.current, {
        opacity: 0,
        scale: 0.7,
      });

      /* ==========================================
         SCROLL TIMELINE
      ========================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 80%",
          end: "top 25%",

          scrub: 1,

          invalidateOnRefresh: true,
        },
      });

      /* ==========================================
         SHADOW
      ========================================== */

      timeline.to(
        shadowRef.current,
        {
          opacity: 1,
          scale: 1,

          ease: "none",
        },
        0
      );

      /* ==========================================
         BACK PHONE
      ========================================== */

      timeline.to(
        backPhoneRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,

          ease: "power2.out",
        },
        0
      );

      /* ==========================================
         FRONT PHONE
      ========================================== */

      timeline.to(
        frontPhoneRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,

          ease: "power2.out",
        },
        0.18
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
        w-full
        bg-white
        px-5
        py-16

        sm:px-8

        lg:px-[3vw]
        lg:py-20
      "
    >
      <div
        className="
          relative

          mx-auto

          min-h-[330px]

          w-full
          max-w-[1450px]

          overflow-hidden

          rounded-[14px]

          bg-[#f5f5f7]

          md:min-h-[360px]

          lg:min-h-[300px]
        "
      >
        <div
          className="
            relative
            z-10

            flex

            min-h-[330px]

            w-full

            flex-col

            px-6
            py-8

            sm:px-8

            md:min-h-[360px]

            lg:min-h-[300px]
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-10
            lg:py-8

            xl:px-12
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-20

              w-full
              max-w-[640px]

              lg:w-[58%]
            "
          >
            {/* SMALL LABEL */}

            <p
              className="
                text-[9px]
                font-medium

                text-[#7c3aed]

                sm:text-[10px]
              "
            >
              Lume for business
            </p>

            {/* TITLE */}

            <h2
              className="
                mt-3

                max-w-[620px]

                text-[30px]
                font-medium

                leading-[1.05]

                tracking-[-0.035em]

                text-[#222229]

                sm:text-[36px]

                md:text-[42px]

                lg:text-[38px]

                xl:text-[44px]
              "
            >
              Make focus part of your workplace.
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4

                max-w-[590px]

                text-[12px]

                leading-[1.6]

                text-black/50

                sm:text-[13px]

                lg:max-w-[560px]
                lg:text-[12px]
              "
            >
              Give your team the physical and digital tools to reduce
              distractions, protect deep work, and build better focus habits —
              at any scale.
            </p>

            {/* CTA */}

            <button
              type="button"
              className="
                group

                mt-5

                inline-flex

                items-center

                gap-2

                rounded-full

                bg-black

                px-5
                py-[10px]

                text-[10px]
                font-medium

                text-white

                transition-all
                duration-300

                hover:scale-[1.02]
                hover:bg-[#191919]
              "
            >
              Talk to us about bulk orders

              <ArrowRight
                size={13}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </button>

            {/* =================================================
                STORE BUTTONS
            ================================================= */}

            <div
              className="
                mt-5

                flex
                flex-wrap

                items-center

                gap-3
              "
            >
              {/* APP STORE */}

              <a
                href="#"
                className="
                  flex

                  h-[42px]

                  min-w-[135px]

                  items-center

                  rounded-[7px]

                  border
                  border-black/10

                  bg-white

                  px-3

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:shadow-md
                "
              >
                <FaApple
                  className="
                    mr-2

                    shrink-0

                    text-[24px]

                    text-black
                  "
                />

                <span className="flex flex-col">
                  <span
                    className="
                      text-[7px]

                      leading-none

                      text-black/60
                    "
                  >
                    Download on the
                  </span>

                  <span
                    className="
                      mt-[3px]

                      whitespace-nowrap

                      text-[13px]
                      font-semibold

                      leading-none

                      text-black
                    "
                  >
                    App Store
                  </span>
                </span>
              </a>

              {/* GOOGLE PLAY */}

              <a
                href="#"
                className="
                  flex

                  h-[42px]

                  min-w-[135px]

                  items-center

                  rounded-[7px]

                  border
                  border-black/10

                  bg-white

                  px-3

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:shadow-md
                "
              >
                <FaGooglePlay
                  className="
                    mr-2

                    shrink-0

                    text-[21px]

                    text-[#34a853]
                  "
                />

                <span className="flex flex-col">
                  <span
                    className="
                      text-[7px]

                      leading-none

                      text-black/60
                    "
                  >
                    GET IT ON
                  </span>

                  <span
                    className="
                      mt-[3px]

                      whitespace-nowrap

                      text-[13px]
                      font-semibold

                      leading-none

                      text-black
                    "
                  >
                    Google Play
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <div
            className="
              relative

              mt-10

              flex

              h-[300px]

              w-full

              items-end
              justify-center

              lg:absolute
              lg:bottom-0
              lg:right-[4%]

              lg:mt-0

              lg:h-full

              lg:w-[38%]
            "
          >
            {/* =================================================
                SOFT SHADOW
            ================================================= */}

            <div
              ref={shadowRef}
              className="
                pointer-events-none

                absolute

                bottom-[-35px]
                left-1/2

                h-[120px]
                w-[340px]

                -translate-x-1/2

                rounded-full

                bg-black/15

                blur-[45px]

                will-change-transform
              "
            />

            {/* =================================================
                BACK PHONE
            ================================================= */}

            <div
              ref={backPhoneRef}
              className="
                absolute

                bottom-[-20px]

                left-[23%]

                z-10

                w-[150px]

                origin-bottom

                will-change-[transform,opacity]

                sm:w-[170px]

                md:w-[185px]

                lg:left-[39%]
                lg:w-[165px]

                xl:w-[180px]
              "
            >
              <img
                src="/iPhone1.png"
                alt="Lume application"
                className="
                  h-auto

                  w-full

                  object-contain

                  select-none
                "
                draggable="false"
              />
            </div>

            {/* =================================================
                FRONT PHONE
            ================================================= */}

            <div
              ref={frontPhoneRef}
              className="
                absolute

                bottom-[5px]

                right-[17%]

                z-20

                w-[135px]

                origin-bottom

                will-change-[transform,opacity]

                sm:w-[155px]

                md:w-[170px]

                lg:right-[8%]
                lg:w-[150px]

                xl:w-[165px]
              "
            >
              <img
                src="/iPhone3.png"
                alt="Lume focus settings"
                className="
                  h-auto

                  w-full

                  object-contain

                  select-none
                "
                draggable="false"
              />
            </div>

            {/* =================================================
                BOTTOM FADE
            ================================================= */}

            <div
              className="
                pointer-events-none

                absolute

                bottom-0
                left-0

                z-30

                h-[55px]

                w-full

                bg-gradient-to-t

                from-[#f5f5f7]

                via-[#f5f5f7]/75

                to-transparent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}