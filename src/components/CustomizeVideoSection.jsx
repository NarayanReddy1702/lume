import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const revealViewport = {
  once: true,
  amount: 0.2,
};

export default function CustomizeVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(28);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <section className="relative w-full bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28 text-[#1c1c24]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header & Subtitle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mx-auto max-w-[760px] text-center"
        >
          <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c5cff]">
            Custom Branding
          </span>

          <h2 className="mt-4 font-display text-[34px] font-medium leading-[1.08] tracking-[-0.035em] text-[#1c1c24] sm:text-[46px] lg:text-[52px]">
            How Can I Customize Lume?
          </h2>

          <p className="font-body mx-auto mt-4 max-w-[620px] text-[13px] leading-relaxed text-[#686a76] sm:text-[15px]">
            Send us your logo, and we can engrave it on your Lume cards. If you want to add
            extra branding and messages, we can print custom sleeves that wrap around the
            high-quality packaging.
          </p>
        </motion.div>

        {/* Video Placeholder / Player */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mt-12 sm:mt-14"
        >
          <div
            onClick={togglePlay}
            className="group relative mx-auto aspect-video max-w-[920px] cursor-pointer overflow-hidden rounded-[16px] sm:rounded-[20px] bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.08] transition-all duration-300 hover:shadow-[0_28px_70px_-15px_rgba(0,0,0,0.28)]"
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src="/videos/video.mp4"
              poster="/images/custom-sleeve-video-cover.jpg"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full object-cover select-none"
            />

            {/* Poster overlay when not playing to guarantee crisp visual */}
            {!isPlaying && (
              <img
                src="/images/custom-sleeve-video-cover.jpg"
                alt="Custom packaging and sleeve for Lume card"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            )}

            {/* Dark vignette overlay for depth */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            />

            {/* Centered Play / Pause Button */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isPlaying ? "opacity-0 pointer-events-none group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute h-20 w-20 rounded-full bg-[#7c5cff]/30 blur-md transition group-hover:scale-110" />

                {/* Play Button - rounded rectangle aesthetic matching reference screenshot */}
                <button
                  type="button"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="relative flex h-14 w-20 sm:h-16 sm:w-24 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-black/85 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                >
                  {isPlaying ? (
                    <Pause size={24} className="fill-white text-white" />
                  ) : (
                    <Play size={26} className="ml-1 fill-white text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 sm:p-5 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-90"
              }`}
            >
              {/* Progress bar */}
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-white transition-[width] duration-150"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>

              {/* Bottom indicators and controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 transition"
                  >
                    {isPlaying ? (
                      <Pause size={14} className="fill-white" />
                    ) : (
                      <Play size={14} className="ml-0.5 fill-white" />
                    )}
                  </button>

                  <span className="font-mono text-[11px] tracking-wider text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 transition text-white/90"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Fullscreen"
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 transition text-white/90"
                  >
                    <Maximize size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
