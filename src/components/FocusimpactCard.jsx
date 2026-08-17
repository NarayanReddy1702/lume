import React, { useEffect, useState } from "react";

const FocusImpactCard = () => {
  const [stats, setStats] = useState({
    impact: 0,
    people: 0,
    percentage: 0,
  });

  useEffect(() => {
    const duration = 1800;

    const targets = {
      impact: 2.4,
      people: 150,
      percentage: 18,
    };

    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        impact: targets.impact * easeOut,
        people: Math.floor(targets.people * easeOut),
        percentage: Math.floor(targets.percentage * easeOut),
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Make sure final values are exact
        setStats({
          impact: 2.4,
          people: 150,
          percentage: 18,
        });
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const graphPath = `
    M 0 180

    C 10 176, 16 171, 25 171
    C 33 171, 36 170, 41 160

    C 46 150, 50 149, 55 160
    C 59 170, 64 173, 72 168

    C 80 162, 86 164, 94 163
    C 103 163, 108 158, 116 154

    C 125 150, 134 148, 144 148
    C 155 148, 163 151, 172 156

    C 181 161, 190 162, 198 156

    C 207 150, 210 137, 216 133
    C 223 129, 229 138, 239 138

    C 250 138, 257 137, 262 127

    C 267 116, 271 112, 279 110
    C 287 108, 293 114, 301 111

    C 309 108, 312 98, 319 93
    C 326 88, 330 89, 334 78

    C 337 70, 339 67, 340 67
  `;

  return (
    <div
      className="
        relative
        h-[190px]
        w-[340px]
        overflow-hidden
        rounded-[14px]
        border
        border-white/[0.08]

        bg-[radial-gradient(ellipse_at_45%_-10%,#28163d_0%,#191121_35%,#0f0d14_65%,#0b0b0f_100%)]

        shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      "
    >
      {/* PURPLE BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-70px]
          top-[-90px]
          z-0

          h-[220px]
          w-[240px]

          rounded-full
          bg-[#6d2aa5]/[0.13]
          blur-[75px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[100px]
          top-[-100px]
          z-0

          h-[190px]
          w-[220px]

          rounded-full
          bg-[#522078]/[0.08]
          blur-[80px]
        "
      />

      {/* GRAPH */}
      <svg
        viewBox="0 0 340 190"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          h-full
          w-full
        "
      >
        <defs>
          {/* AREA UNDER GRAPH */}
          <linearGradient
            id="focusGraphArea"
            x1="170"
            y1="55"
            x2="170"
            y2="190"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor="#7c35a9"
              stopOpacity="0.16"
            />

            <stop
              offset="40%"
              stopColor="#592478"
              stopOpacity="0.10"
            />

            <stop
              offset="75%"
              stopColor="#39184e"
              stopOpacity="0.055"
            />

            <stop
              offset="100%"
              stopColor="#20102b"
              stopOpacity="0"
            />
          </linearGradient>

          {/* GRAPH LINE */}
          <linearGradient
            id="focusGraphLine"
            x1="0"
            y1="180"
            x2="340"
            y2="67"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#351347" />
            <stop offset="25%" stopColor="#401754" />
            <stop offset="50%" stopColor="#501d69" />
            <stop offset="70%" stopColor="#60247f" />
            <stop offset="85%" stopColor="#712b96" />
            <stop offset="100%" stopColor="#8a3db5" />
          </linearGradient>

          {/* END DOT GLOW */}
          <radialGradient id="focusDotGlow">
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity="0.4"
            />

            <stop
              offset="45%"
              stopColor="#9a55c9"
              stopOpacity="0.18"
            />

            <stop
              offset="100%"
              stopColor="#9a55c9"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* AREA FILL */}
        <path
          d={`
            ${graphPath}
            L 340 190
            L 0 190
            Z
          `}
          fill="url(#focusGraphArea)"
        />

        {/* MAIN GRAPH LINE */}
        <path
          d={graphPath}
          fill="none"
          stroke="url(#focusGraphLine)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* SMALL HIGHLIGHT LINE */}
        <path
          d={graphPath}
          fill="none"
          stroke="#9a50c5"
          strokeWidth="0.28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* DOT GLOW */}
        <circle
          cx="338"
          cy="67"
          r="7"
          fill="url(#focusDotGlow)"
        />

        {/* WHITE DOT */}
        <circle
          cx="338"
          cy="67"
          r="2.8"
          fill="#ffffff"
        />
      </svg>

      {/* CONTENT */}
      <div
        className="
          pointer-events-none
          relative
          z-10
          px-[17px]
          pt-[16px]
        "
      >
        {/* TITLE */}
        <p
          className="
            text-[11px]
            font-medium
            leading-none
            tracking-[-0.1px]
            text-white/40
          "
        >
          Focus Impact
        </p>

        {/* 2.4M ANIMATION */}
        <h2
          className="
            mt-[18px]
            text-[34px]
            font-normal
            leading-none
            tracking-[-1.4px]
            text-white
          "
        >
          {stats.impact.toFixed(1)}M

          <span className="ml-[5px]">
            +
          </span>
        </h2>

        {/* 150K ANIMATION */}
        <p
          className="
            mt-[7px]
            text-[9.5px]
            font-normal
            leading-none
            tracking-[-0.1px]
            text-white/35
          "
        >
          hours reclaimed by{" "}

          <span className="font-medium text-white">
            {stats.people}K+
          </span>{" "}

          people
        </p>

        {/* 18% ANIMATION */}
        <div
          className="
            mt-[8px]
            flex
            items-center
            gap-[6px]
          "
        >
          <span
            className="
              min-w-[28px]
              rounded-[3px]
              bg-[#06361e]

              px-[4px]
              py-[2px]

              text-center
              text-[8px]
              font-medium
              leading-none

              text-[#17c96b]
            "
          >
            +{stats.percentage}%
          </span>

          <span
            className="
              text-[9.5px]
              leading-none
              text-white/30
            "
          >
            vs. last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default FocusImpactCard;