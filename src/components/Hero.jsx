import { motion } from "framer-motion";
import FocusImpactCard from "./FocusimpactCard.jsx";
import AvailableNowBadges from "./Availablenowbadges.jsx";

export default function Hero() {
  return (
    <div id="home">
      {/* =====================================================
          MOBILE VERSION
      ====================================================== */}
      <section
        className="
          relative
          block
          min-h-[100svh]
          overflow-x-hidden
          overflow-y-visible
          bg-cover
          bg-center
          bg-no-repeat
          px-5
          pt-20
          pb-8
          sm:pt-24

          lg:hidden
        "
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[430px]">
          {/* TITLE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative z-30"
          >
            <h1
              className="
                font-display
                text-[48px]
                font-semibold
                leading-[0.97]
                tracking-[-1px]
                text-white

                max-[390px]:text-[42px]
                max-[350px]:text-[38px]
              "
            >
              Block
              <br />
              Distractions
            </h1>

            <p
              className="
                mt-4
                font-display
                text-[30px]
                italic
                leading-none
                text-lume-lilac/90

                max-[390px]:text-[27px]
                max-[350px]:text-[24px]
              "
            >
              Build focus
            </p>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              relative
              z-30
              mt-4
              sm:mt-6
              max-w-[370px]
              text-left
              text-[14px]
              sm:text-[15px]
              leading-[1.5]
              text-white/55

              max-[390px]:text-[13px]
            "
          >
            Outlast the noise of your feed. Deck lume gives your apps somewhere
            better to be.
          </motion.p>

          {/* =================================================
              GIF PHONE
          ================================================== */}
          <div
            className="
              relative
              z-10
              -mt-16
              sm:-mt-12
              flex
              justify-center
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: -10,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="relative z-10"
            >
              <img
                src="/videos/video1.gif"
                alt="Lume App Preview"
                className="
                  h-auto
                  w-[395px]
                  sm:w-[430px]
                  max-w-[104vw]
                  object-contain

                  max-[390px]:w-[370px]
                  max-[350px]:w-[335px]
                "
              />
            </motion.div>
          </div>

          {/* AVAILABLE NOW */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeOut",
            }}
            className="
              relative
              z-30
              -mt-2
              flex
              w-full
              justify-center
            "
          >
            <div
              className="
                origin-top
                scale-[0.93]

                max-[390px]:scale-[0.83]
                max-[350px]:scale-[0.74]
              "
            >
              <AvailableNowBadges />
            </div>
          </motion.div>

          {/* FOCUS IMPACT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="
              relative
              z-30
              mt-3
              flex
              w-full
              justify-center
              px-3
            "
          >
            <div
              className="
                origin-top
                w-fit
                scale-[0.93]

                max-[390px]:scale-[0.83]
                max-[350px]:scale-[0.74]
              "
            >
              <FocusImpactCard />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DESKTOP VERSION
      ====================================================== */}
      <section
        className="
          relative
          hidden
          h-[100svh]
          min-h-[680px]
          max-h-[980px]
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
          px-6
          py-0

          lg:block
        "
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <div className="absolute left-0 right-0 top-[22%] z-30 flex items-start justify-between gap-10">
            {/* LEFT TITLE */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="max-w-xs lg:max-w-sm"
            >
              <h1 className="font-display text-[52px] font-semibold leading-[1.03] lg:text-6xl">
                Block
                <br />
                Distractions
              </h1>

              <p className="mt-2 font-display text-[34px] italic text-lume-lilac/90 lg:text-4xl">
                Build focus
              </p>
            </motion.div>

            {/* RIGHT DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                mt-2
                max-w-[300px]
                text-right
                text-sm
                text-white/40
                lg:max-w-[340px]
              "
            >
              Outlast the noise of your feed. Deck lume gives your apps
              somewhere better to be.
            </motion.p>
          </div>

          {/* =================================================
              PHONE + FLOATING CARDS
          ================================================== */}
          <div className="absolute inset-x-0 bottom-0 top-[15%] flex justify-center">
            {/* GIF PHONE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 36,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: -12,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="relative z-10"
            >
              <img
                src="/videos/video1.gif"
                alt="Lume App Preview"
                className="
                  h-auto
                  max-h-[86svh]
                  w-[330px]
                  lg:w-[470px]
                  xl:w-[500px]
                  object-contain
                "
              />


            </motion.div>

            {/* AVAILABLE NOW */}
            <div className="absolute bottom-8 left-0 z-20 scale-90 lg:scale-100 xl:-left-6">
              <AvailableNowBadges />
            </div>

            {/* FOCUS IMPACT */}
            <div className="absolute bottom-14 right-6 z-20 scale-90 lg:right-8 lg:scale-100 xl:right-1">
              <FocusImpactCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
