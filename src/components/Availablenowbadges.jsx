import React from "react";
import { Star } from "lucide-react";
import { FaApple } from "react-icons/fa";

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[25px] w-[25px] shrink-0"
  >
    <path
      d="
        M3.6 2.8
        c-.35.3-.55.75-.55 1.28
        v15.85
        c0 .53.2.98.55 1.28
        l.09.07
        8.88-8.88
        v-.2
        L3.69 2.72
        l-.09.08z
      "
      fill="#00d9ff"
    />

    <path
      d="
        M15.5 15.35
        12.48 12.33
        v-.2
        l3.02-3.02
        .07.04
        3.58 2.04
        c1.02.58 1.02 1.53 0 2.11
        l-3.58 2.04
        -.07.01z
      "
      fill="#ffd900"
    />

    <path
      d="
        M15.57 15.31
        12.48 12.23
        3.6 21.11
        c.33.35.87.39 1.48.05
        l10.49-5.85
      "
      fill="#ff3333"
    />

    <path
      d="
        M15.57 9.15
        5.08 3.3
        c-.61-.34-1.15-.3-1.48.05
        l8.88 8.88
        3.09-3.08z
      "
      fill="#00f076"
    />
  </svg>
);

const AvailableNowBadges = () => {
  return (
    <div
      className="
        relative
        w-[300px]
        rounded-[24px]
        border
        border-white/[0.10]
        bg-[#111013]
        px-[24px]
        py-[22px]
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      <p
        className="
          text-[14px]
          font-medium
          text-white/50
        "
      >
        Available now
      </p>

      {/* STORE BUTTONS */}
      <div className="mt-[17px] flex gap-[11px]">
        {/* APP STORE */}
        <a
          href="#"
          className="
            flex
            h-[53px]
            min-w-0
            flex-1
            items-center
            rounded-[11px]
            border
            border-white/[0.08]
            bg-black
            px-[10px]
            transition
            duration-300
            hover:border-white/20
          "
        >
          {/* REAL APPLE ICON */}
          <FaApple
            className="
              mr-[8px]
              shrink-0
              text-[25px]
              text-white
            "
          />

          <span className="flex min-w-0 flex-col">
            <span
              className="
                whitespace-nowrap
                text-[8px]
                font-normal
                leading-none
                text-white/70
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
                tracking-[-0.3px]
                text-white
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
            h-[53px]
            min-w-0
            flex-1
            items-center
            rounded-[11px]
            border
            border-white/[0.08]
            bg-black
            px-[10px]
            transition
            duration-300
            hover:border-white/20
          "
        >
          <PlayIcon />

          <span className="ml-[8px] flex min-w-0 flex-col">
            <span
              className="
                whitespace-nowrap
                text-[8px]
                font-normal
                uppercase
                leading-none
                tracking-[0.3px]
                text-white/70
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
                tracking-[-0.3px]
                text-white
              "
            >
              Google Play
            </span>
          </span>
        </a>
      </div>

      {/* RATING */}
      <div className="mt-[17px] flex items-center">
        <div className="flex items-center gap-[1px]">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="
                h-[17px]
                w-[17px]
                fill-amber-400
                text-amber-400
              "
            />
          ))}
        </div>

        <span
          className="
            ml-[8px]
            text-[13px]
            font-semibold
            text-white
          "
        >
          4.8
        </span>

        <span
          className="
            ml-[7px]
            whitespace-nowrap
            text-[13px]
            text-white/30
          "
        >
          150K+ ratings
        </span>
      </div>
    </div>
  );
};

export default AvailableNowBadges;