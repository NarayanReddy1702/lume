import React from "react";
import { Star } from "lucide-react";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M16.365 1.43c0 1.14-.42 2.06-1.26 2.79-.85.74-1.87 1.15-2.99 1.06-.13-1.11.33-2.13 1.15-2.86.86-.77 1.98-1.13 3.1-.99zM20.5 17.24c-.44 1.02-.97 1.98-1.63 2.86-.9 1.22-1.63 2.06-2.19 2.53-.87.75-1.8 1.13-2.79 1.16-.71.02-1.57-.2-2.57-.65-1-.45-1.92-.67-2.76-.67-.87 0-1.81.22-2.82.67-1.01.45-1.83.69-2.46.71-.95.04-1.9-.35-2.85-1.18C1.5 21.79.6 20.87.03 19.62c-.6-1.34-.9-2.65-.9-3.92 0-1.46.32-2.72.96-3.78.5-.85 1.17-1.53 2.01-2.02.84-.5 1.75-.76 2.73-.78.75 0 1.72.24 2.9.71 1.18.47 1.94.71 2.27.71.25 0 1.09-.28 2.52-.83 1.35-.51 2.49-.72 3.42-.64 2.53.2 4.43 1.2 5.69 3-2.26 1.37-3.38 3.29-3.36 5.75.02 1.92.71 3.51 2.08 4.78.62.59 1.32 1.05 2.09 1.37-.17.49-.35.96-.55 1.42h-.02z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M3.6 2.8c-.35.3-.55.75-.55 1.28v15.85c0 .53.2.98.55 1.28l.09.07 8.88-8.88v-.2L3.69 2.72l-.09.08z" fill="#00d9ff" />
    <path d="M15.5 15.35 12.48 12.33v-.2l3.02-3.02.07.04 3.58 2.04c1.02.58 1.02 1.53 0 2.11l-3.58 2.04-.07.01z" fill="#ffd900" />
    <path d="M15.57 15.31 12.48 12.23l-8.88 8.88c.33.35.87.39 1.48.05l10.49-5.85" fill="#ff3333" />
    <path d="M15.57 9.15 5.08 3.3c-.61-.34-1.15-.3-1.48.05l8.88 8.88 3.09-3.08z" fill="#00f076" />
  </svg>
);

const AvailableNowBadges = () => {
  return (
    <div
      className="
        relative
        w-full
        max-w-[300px]
        rounded-[24px]
        border
        border-white/10
        bg-[#111013]
        p-6
      "
    >
      <p className="text-sm font-medium text-gray-400">Available now</p>

      {/* Store buttons */}
      <div className="mt-4 flex gap-3">
        <a
          href="#"
          className="
            flex
            flex-1
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-black
            px-3
            py-2
            transition
            hover:border-white/20
          "
        >
          <AppleIcon />
          <span className="flex flex-col leading-none">
            <span className="text-[9px] text-gray-400">Download on the</span>
            <span className="text-[13px] font-semibold text-white">
              App Store
            </span>
          </span>
        </a>

        <a
          href="#"
          className="
            flex
            flex-1
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-black
            px-3
            py-2
            transition
            hover:border-white/20
          "
        >
          <PlayIcon />
          <span className="flex flex-col leading-none">
            <span className="text-[9px] text-gray-400">GET IT ON</span>
            <span className="text-[13px] font-semibold text-white">
              Google Play
            </span>
          </span>
        </a>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <span className="text-sm font-medium text-white">4.8</span>
        <span className="text-sm text-gray-500">150K+ ratings</span>
      </div>
    </div>
  );
};

export default AvailableNowBadges;