import { ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path
        d="M3.6 2.8c-.35.3-.55.75-.55 1.28v15.85c0 .53.2.98.55 1.28l.09.07 8.88-8.88v-.2L3.69 2.72l-.09.08z"
        fill="#00d9ff"
      />
      <path
        d="M15.5 15.35l-3.02-3.02v-.2l3.02-3.02.07.04 3.58 2.04c1.02.58 1.02 1.53 0 2.11l-3.58 2.04-.07.01z"
        fill="#ffd900"
      />
      <path
        d="M15.57 15.31l-3.09-3.08-8.88 8.88c.33.35.87.39 1.48.05l10.49-5.85z"
        fill="#ff3333"
      />
      <path
        d="M15.57 9.15L5.08 3.3c-.61-.34-1.15-.3-1.48.05l8.88 8.88 3.09-3.08z"
        fill="#00f076"
      />
    </svg>
  );
}

export default function BusinessCTASection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/[0.04] bg-[#f4f4f6]">
        <div className="grid grid-cols-1 items-center md:grid-cols-[1.18fr_0.82fr] lg:grid-cols-[1.22fr_0.78fr]">
          {/* Left Column: Text & CTAs */}
          <div className="p-6 sm:p-10 lg:p-14 lg:pr-6">
            <p className="text-[12px] font-semibold tracking-wide text-[#8a39ff] sm:text-[13px]">
              Lume for business
            </p>

            <h2 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#1a1a24] sm:text-[40px] lg:text-[46px]">
              Make focus part of your workplace.
            </h2>

            <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#686a7a] sm:text-[15px] lg:text-[16px]">
              Give your team the physical and digital tools to reduce distractions, protect deep work,
              and build better focus habits—at any scale.
            </p>

            <div className="mt-6 sm:mt-8">
              <Link
                to="/business"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[13px] font-semibold text-white transition hover:bg-[#202024] sm:px-7 sm:text-[14px]"
              >
                <span>Talk to us about bulk orders</span>
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <StoreBadge
                icon={<FaApple className="text-[22px] text-black" />}
                label="Download on the"
                name="App Store"
                href="https://apple.com"
              />
              <StoreBadge
                icon={<PlayIcon />}
                label="GET IT ON"
                name="Google Play"
                href="https://play.google.com"
              />
            </div>
          </div>

          {/* Right Column: Phone Mockups */}
          <div className="relative flex h-[280px] w-full items-end justify-center overflow-hidden sm:h-[340px] md:h-[390px] lg:h-[440px]">
            {/* Phone 1 (Back / Left): Glowing Orb Screen */}
            <img
              src="/iPhone1.png"
              alt="Lume App Screen"
              className="absolute bottom-[-16px] right-[110px] h-[270px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)] sm:bottom-[-20px] sm:right-[150px] sm:h-[330px] md:bottom-[-24px] md:right-[150px] md:h-[370px] lg:bottom-[-28px] lg:right-[180px] lg:h-[420px]"
              draggable="false"
            />

            {/* Phone 2 (Front / Right): Block Screen Persona */}
            <img
              src="/iPhone2.png"
              alt="Lume Block Screen Persona"
              className="absolute bottom-[-24px] right-[12px] z-20 h-[240px] w-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.28)] sm:bottom-[-28px] sm:right-[24px] sm:h-[300px] md:bottom-[-32px] md:right-[24px] md:h-[335px] lg:bottom-[-36px] lg:right-[32px] lg:h-[380px]"
              draggable="false"
            />

            {/* Bottom Gradient Fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-16 bg-gradient-to-t from-[#f4f4f6] via-[#f4f4f6]/85 to-transparent sm:h-20 lg:h-24" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreBadge({ icon, label, name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center gap-2.5 rounded-[8px] border border-black/10 bg-white px-3.5 py-1 text-black shadow-xs transition hover:border-black/25 hover:shadow-sm"
    >
      {icon}
      <div className="flex flex-col text-left">
        <span className="text-[8px] font-medium leading-none text-black/60">{label}</span>
        <span className="mt-0.5 text-[12px] font-semibold leading-tight text-black tracking-tight">
          {name}
        </span>
      </div>
    </a>
  );
}
