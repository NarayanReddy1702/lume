import { motion } from "framer-motion";
import FocusImpactCard from "./FocusimpactCard.jsx";
import AvailableNowBadges from "./Availablenowbadges.jsx";

export default function Hero() {
  return (
    <>
      {/* =====================================================
          MOBILE VERSION
      ====================================================== */}
      <section
        id="home"
        className="
          relative
          block
          min-h-screen
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
          px-5
          pt-10
          pb-12

          md:hidden
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
              mt-8
              max-w-[370px]
              text-left
              text-[15px]
              leading-[1.55]
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
              mt-6
              flex
              justify-center
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
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
                src="/video.gif"
                alt="Lume App Preview"
                className="
                  h-auto
                  w-[280px]
                  object-contain

                  max-[390px]:w-[245px]
                  max-[350px]:w-[220px]
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
              -mt-4
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
              <FocusImpactCard />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DESKTOP VERSION
      ====================================================== */}
      <section
        id="home-desktop"
        className="
          relative
          hidden
          h-screen
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
          px-6
          pt-40
          pb-32

          md:block
        "
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
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
              className="max-w-xs"
            >
              <h1 className="font-display text-6xl font-semibold leading-[1.05]">
                Block
                <br />
                Distractions
              </h1>

              <p className="mt-2 font-display text-4xl italic text-lume-lilac/90">
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
                max-w-[320px]
                text-right
                text-sm
                text-white/40
              "
            >
              Outlast the noise of your feed. Deck lume gives your apps
              somewhere better to be.
            </motion.p>
          </div>

          {/* =================================================
              PHONE + FLOATING CARDS
          ================================================== */}
          <div className="relative mt-4 flex justify-center">
            {/* GIF PHONE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: -230,
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
                src="/videos/video.gif"
                alt="Lume App Preview"
                className="
                  h-auto
                  w-[450px]
                  object-contain
                "
              />
            </motion.div>

            {/* AVAILABLE NOW */}
            <div className="absolute bottom-60 left-0">
              <AvailableNowBadges />
            </div>

            {/* FOCUS IMPACT */}
            <div className="absolute right-0 top-36 md:-right-14">
              <FocusImpactCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}