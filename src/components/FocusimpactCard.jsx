import React, { useEffect, useState } from "react";

const FocusImpactCard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const target = 2.4;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(target * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div
      className="
        relative
        w-[400px]
        max-w-[340px]
        h-[200px]
        overflow-hidden
        rounded-[24px]
        border
        border-purple-500/20
        bg-gradient-to-br
        from-[#171426]
        via-[#111116]
        to-[#0c0c0d]
        shadow-[0_0_30px_rgba(91,35,180,0.08)]
      "
    >
      {/* Background glow */}
      <div
        className="
          absolute
          -right-14
          top-10
          h-52
          w-52
          rounded-full
          bg-purple-600/10
          blur-[80px]
        "
      />

      {/* Chart (sits behind content, sized exactly to the card so nothing
          overflows or gets clipped by the rounded corners) */}
      <div className="absolute inset-0 h-full w-full">
        <svg
          viewBox="0 0 340 200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area */}
          <path
            d="
              M0 165
              C25 150, 40 170, 60 155
              C75 145, 80 110, 95 135
              C110 155, 125 130, 140 135
              C160 140, 175 115, 195 120
              C215 125, 220 95, 240 100
              C255 103, 260 75, 280 65
              C295 58, 290 40, 310 35
              C320 32, 325 20, 340 15
              L340 200
              L0 200
              Z
            "
            fill="url(#chartGradient)"
          />

          {/* Chart line */}
          <path
            d="
              M0 165
              C25 150, 40 170, 60 155
              C75 145, 80 110, 95 135
              C110 155, 125 130, 140 135
              C160 140, 175 115, 195 120
              C215 125, 220 95, 240 100
              C255 103, 260 75, 280 65
              C295 58, 290 40, 310 35
              C320 32, 325 20, 340 15
            "
            fill="none"
            stroke="#6d28d9"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {/* End point (inset from the corner so it never gets clipped) */}
          <circle cx="305" cy="30" r="4" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center p-6">
        {/* Heading */}
        <p className="text-sm font-medium tracking-tight text-gray-400">
          Focus Impact
        </p>

        {/* Animated number */}
        <div className="mt-2">
          <h2 className="text-[42px] font-light leading-none tracking-[-1.5px] text-white">
            {count.toFixed(1)}M
            <span className="ml-1">+</span>
          </h2>

          <p className="mt-2 text-xs font-medium text-gray-500">
            hours reclaimed by{" "}
            <span className="text-white">150K+</span> people
          </p>

          {/* Percentage */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className="
                rounded-md
                bg-green-500/15
                px-1.5
                py-0.5
                text-[11px]
                font-medium
                text-green-500
              "
            >
              +18%
            </span>

            <span className="text-xs text-gray-500">vs. last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusImpactCard;