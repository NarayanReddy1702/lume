import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Clock, User, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const LIFE_EXPECTANCY = 80;
const STEP_ORDER = ["intro", "calculating", "result", "reclaim"];
const CALCULATION_DURATION = 2300;
const RESULT_SETTLE_DELAY = 280;
const stepVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -18,
    scale: 0.985,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -18 : 18,
    scale: 0.985,
    filter: "blur(4px)",
  }),
};
const stepTransition = { duration: 0.62, ease: [0.16, 1, 0.3, 1] };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function nice(value) {
  return Number(value.toFixed(1));
}

function formatNumber(value) {
  return value.toLocaleString("en-IN");
}

export default function CalculatorPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("intro");
  const [direction, setDirection] = useState(1);
  const [age, setAge] = useState(22);
  const [hours, setHours] = useState(6);
  const [saveHours, setSaveHours] = useState(1.5);
  const [animatedYears, setAnimatedYears] = useState(0);

  const result = useMemo(() => {
    const safeAge = clamp(Number(age) || 22, 13, 79);
    const safeHours = clamp(Number(hours) || 6, 0.5, 16);
    const remaining = LIFE_EXPECTANCY - safeAge;
    const yearsLost = nice((remaining * safeHours) / 24);
    const daysLost = Math.round((remaining * 365.25 * safeHours) / 24);
    const reclaimedHours = clamp(Math.round(Number(saveHours || 0) * 2) / 2, 0, safeHours);
    const yearsBack = nice((remaining * reclaimedHours) / 24);
    const savedDays = Math.round((remaining * 365.25 * reclaimedHours) / 24);

    return {
      safeAge,
      safeHours,
      remaining,
      yearsLost,
      daysLost,
      reclaimedHours,
      yearsBack,
      savedDays,
    };
  }, [age, hours, saveHours]);

  function calculate() {
    setAge(result.safeAge);
    setHours(result.safeHours);
    setSaveHours(Math.min(result.safeHours, Math.max(1, nice(result.safeHours * 0.25))));
    setAnimatedYears(0);
    goToStep("calculating");
  }

  function goToStep(nextStep) {
    setDirection(STEP_ORDER.indexOf(nextStep) > STEP_ORDER.indexOf(step) ? 1 : -1);
    setStep(nextStep);
  }

  function setQuickSave(value) {
    setSaveHours(clamp(value, 0, result.safeHours));
  }

  function adjustAge(delta) {
    setAge((prev) => clamp((Number(prev) || 22) + delta, 13, 79));
  }

  function adjustHours(delta) {
    setHours((prev) => nice(clamp((Number(prev) || 6) + delta, 0.5, 16)));
  }

  useEffect(() => {
    if (step !== "calculating") return undefined;

    let frameId;
    let finishTimeout;
    const startedAt = performance.now();
    const targetYears = result.yearsLost;

    const animateYears = (currentTime) => {
      const progress = clamp((currentTime - startedAt) / CALCULATION_DURATION, 0, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedYears(nice(targetYears * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateYears);
        return;
      }

      setAnimatedYears(targetYears);
      finishTimeout = window.setTimeout(() => {
        goToStep("result");
      }, RESULT_SETTLE_DELAY);
    };

    frameId = requestAnimationFrame(animateYears);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimeout);
    };
  }, [result.yearsLost, step]);

  return (
    <main className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#07070a] px-4 pt-14 pb-2 sm:px-6 sm:pt-16 sm:pb-3 text-[#f4f1eb]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 h-[min(70vw,550px)] w-[min(70vw,550px)] rounded-full bg-[#a875ff]/12 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-1/4 h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full bg-[#7c5cff]/8 blur-[90px]" />

      <div className="relative z-10 w-full max-w-[480px] my-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {step === "intro" ? (
            <motion.div
              key="intro"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="mx-auto text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#a875ff]/30 bg-[#a875ff]/10 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4b7ff] shadow-[0_0_12px_rgba(168,117,255,0.15)]">
                <Sparkles size={10} className="text-[#a875ff]" />
                <span>Screen Time Calculator</span>
              </div>

              {/* Title */}
              <h1 className="mt-1.5 sm:mt-2 text-[21px] sm:text-[25px] font-light leading-[1.15] tracking-[-0.03em]">
                How much of your{" "}
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#d4b7ff] to-[#a875ff]">
                  life
                </span>{" "}
                goes to your phone?
              </h1>
              <p className="mx-auto mt-0.5 text-[11px] sm:text-[12px] leading-relaxed text-white/45">
                Two simple numbers. One eye-opening truth.
              </p>

              {/* Input Cards */}
              <div className="mt-3 sm:mt-3.5 flex flex-col gap-2 text-left">
                {/* Age Card */}
                <div className="group relative rounded-xl border border-white/[0.08] bg-[#0d0d14]/90 p-2.5 sm:p-3 backdrop-blur-xl transition-all duration-300 hover:border-white/20 focus-within:border-[#a875ff]/60 focus-within:shadow-[0_0_25px_rgba(168,117,255,0.15)]">
                  {/* Header: Label & Presets */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-[#a875ff]/10 text-[#a875ff]">
                        <User size={11} />
                      </div>
                      <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-white/50">
                        Your Age
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[18, 25, 35, 50].map((presetAge) => (
                        <button
                          key={presetAge}
                          type="button"
                          onClick={() => setAge(presetAge)}
                          className={`rounded px-1.5 py-0.5 text-[9px] font-medium transition-all ${
                            Number(age) === presetAge
                              ? "bg-[#a875ff] text-white shadow-[0_0_8px_rgba(168,117,255,0.4)]"
                              : "bg-white/[0.04] text-white/45 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {presetAge}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Body: Number & Steppers */}
                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <input
                        type="number"
                        min="13"
                        max="79"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-20 bg-transparent text-[28px] sm:text-[32px] font-light leading-none tracking-[-0.04em] text-white outline-none"
                      />
                      <span className="text-[12px] font-normal text-white/40">years old</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => adjustAge(-1)}
                        disabled={Number(age) <= 13}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-[#a875ff]/50 hover:bg-[#a875ff]/15 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-25"
                        aria-label="Decrease age"
                      >
                        <Minus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustAge(1)}
                        disabled={Number(age) >= 79}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-[#a875ff]/50 hover:bg-[#a875ff]/15 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-25"
                        aria-label="Increase age"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="mt-1 pt-0.5">
                    <input
                      type="range"
                      min="13"
                      max="79"
                      value={clamp(Number(age) || 22, 13, 79)}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="lume-slider"
                    />
                    <div className="mt-0.5 flex justify-between text-[8px] font-mono uppercase tracking-wider text-white/30">
                      <span>13 yrs</span>
                      <span>80 yrs</span>
                    </div>
                  </div>
                </div>

                {/* Daily Screen Time Card */}
                <div className="group relative rounded-xl border border-white/[0.08] bg-[#0d0d14]/90 p-2.5 sm:p-3 backdrop-blur-xl transition-all duration-300 hover:border-white/20 focus-within:border-[#a875ff]/60 focus-within:shadow-[0_0_25px_rgba(168,117,255,0.15)]">
                  {/* Header: Label & Presets */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-[#a875ff]/10 text-[#a875ff]">
                        <Clock size={11} />
                      </div>
                      <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-white/50">
                        Daily Screen Time
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[3, 5, 7, 9].map((presetHour) => (
                        <button
                          key={presetHour}
                          type="button"
                          onClick={() => setHours(presetHour)}
                          className={`rounded px-1.5 py-0.5 text-[9px] font-medium transition-all ${
                            Number(hours) === presetHour
                              ? "bg-[#a875ff] text-white shadow-[0_0_8px_rgba(168,117,255,0.4)]"
                              : "bg-white/[0.04] text-white/45 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {presetHour}h
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Body: Number & Steppers */}
                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <input
                        type="number"
                        min="0.5"
                        max="16"
                        step="0.5"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-20 bg-transparent text-[28px] sm:text-[32px] font-light leading-none tracking-[-0.04em] text-white outline-none"
                      />
                      <span className="text-[12px] font-normal text-white/40">hours / day</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => adjustHours(-0.5)}
                        disabled={Number(hours) <= 0.5}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-[#a875ff]/50 hover:bg-[#a875ff]/15 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-25"
                        aria-label="Decrease screen time"
                      >
                        <Minus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustHours(0.5)}
                        disabled={Number(hours) >= 16}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-[#a875ff]/50 hover:bg-[#a875ff]/15 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-25"
                        aria-label="Increase screen time"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="mt-1 pt-0.5">
                    <input
                      type="range"
                      min="0.5"
                      max="16"
                      step="0.5"
                      value={clamp(Number(hours) || 6, 0.5, 16)}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="lume-slider"
                    />
                    <div className="mt-0.5 flex justify-between text-[8px] font-mono uppercase tracking-wider text-white/30">
                      <span>0.5 hrs</span>
                      <span>16 hrs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={calculate}
                className="group relative mt-3 sm:mt-3.5 flex h-11 sm:h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-white/95 to-[#f3edff] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#07070a] shadow-[0_4px_25px_rgba(168,117,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_40px_rgba(168,117,255,0.45)] active:translate-y-0 active:scale-[0.99]"
              >
                <span className="relative z-10 font-bold">See What It Costs</span>
                <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#a875ff]/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>

              {/* Trust Badge */}
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-white/35">
                <ShieldCheck size={12} className="text-[#a875ff]" />
                <span>100% Private • No sign-up • Instant calculation</span>
              </div>
            </motion.div>
          ) : null}

          {step === "calculating" ? (
            <motion.div
              key="calculating"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="mx-auto flex flex-col items-center justify-center text-center py-4"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                className="text-[9px] uppercase tracking-[0.3em] text-white/55"
              >
                Calculating your time
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-[56px] font-extralight leading-none tracking-[-0.07em] text-[#d4b7ff] sm:text-[76px]"
              >
                {animatedYears.toFixed(1)}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34, ease: "easeOut" }}
                className="mt-4 text-[12px] text-white/45"
              >
                Years calculated
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.86 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                className="mt-6 h-px w-full max-w-[240px] overflow-hidden bg-white/15"
              >
                <motion.div
                  className="h-full origin-left bg-[#a875ff]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CALCULATION_DURATION / 1000, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <motion.span
                  className="h-1 w-7 rounded-full bg-[#a875ff]"
                  initial={{ scaleX: 0.45, opacity: 0.65 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
                <span className="h-1 w-1 rounded-full bg-white/30" />
              </div>
            </motion.div>
          ) : null}

          {step === "result" ? (
            <motion.div
              key="result"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="mx-auto text-center"
            >
              <p className="text-[9px] uppercase tracking-[0.24em] text-white/45">Here is the truth</p>
              <h1 className="mx-auto mt-2 max-w-[480px] text-[18px] font-light leading-[1.2] tracking-[-0.03em] sm:text-[24px]">
                At your current pace, you are on track to spend
              </h1>
              <div className="mt-3 text-[clamp(48px,10vw,76px)] font-extralight leading-none tracking-[-0.075em] text-[#d4b7ff]">
                {result.yearsLost.toFixed(1)}
              </div>
              <p className="mt-1 text-[9px] uppercase tracking-[0.36em] text-[#d4b7ff] font-medium">Years</p>
              <p className="mt-2 text-[12px] sm:text-[13px] leading-relaxed text-white/50">
                of your {result.remaining} remaining years on your phone.
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/45">
                <strong className="font-normal text-white">{formatNumber(result.daysLost)}</strong> days of your life.
              </p>
              <p className="mt-0.5 text-[9.5px] text-white/35">
                Based on an 80-year lifespan and your daily screen time.
              </p>
              <button
                type="button"
                onClick={() => goToStep("reclaim")}
                className="group relative mt-4 sm:mt-5 flex h-11 sm:h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-white/95 to-[#f3edff] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#07070a] shadow-[0_4px_25px_rgba(168,117,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_40px_rgba(168,117,255,0.45)] active:translate-y-0 active:scale-[0.99]"
              >
                <span className="relative z-10 font-bold">See How Much Lume Gives Back</span>
                <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#a875ff]/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </motion.div>
          ) : null}

          {step === "reclaim" ? (
            <motion.div
              key="reclaim"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="mx-auto text-center"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#a875ff]/30 bg-[#a875ff]/10 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4b7ff]">
                <Sparkles size={10} className="text-[#a875ff]" />
                <span>Reclaim Your Life</span>
              </div>

              <h1 className="mx-auto mt-2 max-w-[480px] text-[18px] sm:text-[24px] font-light leading-[1.15] tracking-[-0.03em]">
                How much time would you like to reclaim?
              </h1>
              <div className="mt-2 text-[30px] sm:text-[38px] font-extralight leading-none tracking-[-0.05em] text-white">
                {result.reclaimedHours.toFixed(1)}
                <span className="ml-1.5 text-[12px] tracking-[0.08em] text-white/45">hrs / day</span>
              </div>
              <p className="mt-0.5 text-[10px] text-white/45">
                from your <strong className="font-normal text-white">{result.safeHours.toFixed(1).replace(".0", "")}</strong> hrs / day
              </p>

              <div className="mx-auto mt-3 w-full rounded-xl border border-white/[0.08] bg-[#0d0d14]/90 p-3 backdrop-blur-xl">
                <div className="mb-1 flex justify-between text-[9px] font-mono uppercase tracking-wider text-white/40">
                  <span>0 hrs</span>
                  <span>{result.safeHours.toFixed(1).replace(".0", "")} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={result.safeHours}
                  step="0.5"
                  value={result.reclaimedHours}
                  onChange={(event) => setSaveHours(event.target.value)}
                  className="lume-slider"
                />

                <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                  {[2, 2.5, 3].map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => setQuickSave(choice)}
                      className={`rounded py-1 text-[10px] font-medium transition-all ${
                        result.reclaimedHours === choice
                          ? "bg-[#a875ff] text-white shadow-[0_0_8px_rgba(168,117,255,0.4)]"
                          : "bg-white/[0.04] text-white/50 border border-white/5 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      {choice} hrs
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setQuickSave(result.safeHours / 2)}
                    className="rounded bg-white/[0.04] py-1 text-[10px] font-medium text-white/50 border border-white/5 transition-all hover:bg-white/[0.08] hover:text-white"
                  >
                    50%
                  </button>
                </div>
              </div>

              <div className="mt-3 text-[clamp(34px,7vw,52px)] font-extralight leading-none tracking-[-0.07em] text-[#d4b7ff]">
                {result.yearsBack.toFixed(1)}
              </div>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.36em] text-[#d4b7ff] font-medium">Years back</p>
              <p className="mx-auto mt-1.5 max-w-[440px] text-[11px] sm:text-[12px] leading-relaxed text-white/50">
                Reclaim <strong className="font-normal text-white">{result.reclaimedHours.toFixed(1)} hours</strong> every day,
                giving you <strong className="font-normal text-white">{formatNumber(result.savedDays)} days</strong> of your life back.
              </p>
              <button
                type="button"
                onClick={() => navigate("/forme")}
                className="group relative mt-3.5 sm:mt-4 flex h-11 sm:h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-white/95 to-[#f3edff] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#07070a] shadow-[0_4px_25px_rgba(168,117,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_40px_rgba(168,117,255,0.45)] active:translate-y-0 active:scale-[0.99]"
              >
                <span className="relative z-10 font-bold">Get These Years Back</span>
                <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#a875ff]/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {step !== "intro" && step !== "calculating" ? (
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => goToStep(step === "reclaim" ? "result" : "intro")}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-white/45 transition hover:text-white"
            >
              ← Back
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
