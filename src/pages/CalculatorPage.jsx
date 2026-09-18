import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-5 py-32 text-[#f4f1eb]">
      <div className="pointer-events-none absolute h-[min(72vw,820px)] w-[min(72vw,820px)] rounded-full bg-[#a875ff]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-[720px]">
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
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
              A different way to look at screen time
            </p>
            <h1 className="mt-7 text-[clamp(32px,8vw,70px)] font-light leading-[1.04] tracking-[-0.045em]">
              How much of your
              <br />
              <span className="font-serif italic text-[#d4b7ff]">life</span> goes to your phone?
            </h1>
            <p className="mx-auto mt-6 max-w-[440px] text-[15px] leading-relaxed text-white/45">
              Two numbers. One uncomfortable truth.
            </p>

            <div className="mx-auto mt-12 w-full max-w-[520px] border-t border-white/15 text-left">
              <CalculatorField label="Your age" unit="years">
                <input
                  type="number"
                  min="13"
                  max="79"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="w-full bg-transparent text-[31px] font-light tracking-[-0.03em] text-white outline-none"
                />
              </CalculatorField>

              <CalculatorField label="Average daily screen time" unit="hours / day">
                <input
                  type="number"
                  min="0.5"
                  max="16"
                  step="0.5"
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                  className="w-full bg-transparent text-[31px] font-light tracking-[-0.03em] text-white outline-none"
                />
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-[10px] text-white/40">0</span>
                  <input
                    type="range"
                    min="0.5"
                    max="16"
                    step="0.5"
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                    className="h-1 w-full accent-[#a875ff]"
                  />
                  <span className="text-[10px] text-white/40">16</span>
                </div>
              </CalculatorField>
            </div>

            <button
              type="button"
              onClick={calculate}
              className="mt-8 h-14 w-full max-w-[520px] rounded-[4px] border border-[#a875ff] bg-[#f4f1eb] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07070a] transition hover:-translate-y-0.5"
            >
              See what it costs
            </button>
            <p className="mt-4 text-[11px] text-white/40">No sign-up. No data stored.</p>
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
              className="mx-auto flex min-h-[520px] flex-col items-center justify-center text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                className="text-[10px] uppercase tracking-[0.38em] text-white/55"
              >
                Calculating your time
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 text-[78px] font-extralight leading-none tracking-[-0.075em] text-[#d4b7ff] sm:text-[112px]"
              >
                {animatedYears.toFixed(1)}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34, ease: "easeOut" }}
                className="mt-10 text-[14px] text-white/45"
              >
                Years calculated
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.86 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                className="mt-12 h-px w-full max-w-[290px] overflow-hidden bg-white/15"
              >
                <motion.div
                  className="h-full origin-left bg-[#a875ff]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CALCULATION_DURATION / 1000, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
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
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Here is the truth</p>
            <h1 className="mx-auto mt-7 max-w-[570px] text-[28px] font-light leading-[1.2] tracking-[-0.035em] sm:text-[39px]">
              At your current pace, you are on track to spend
            </h1>
            <div className="mt-8 text-[clamp(72px,18vw,122px)] font-extralight leading-none tracking-[-0.075em]">
              {result.yearsLost.toFixed(1)}
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#d4b7ff]">Years</p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/45">
              of your {result.remaining} remaining years on your phone.
            </p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.12em] text-white/45">
              <strong className="font-normal text-white">{formatNumber(result.daysLost)}</strong> days of your life.
            </p>
            <p className="mt-4 text-[10px] text-white/35">
              Based on an 80-year lifespan and your current daily screen time.
            </p>
            <button
              type="button"
              onClick={() => goToStep("reclaim")}
              className="mt-8 h-14 w-full max-w-[520px] rounded-[4px] border border-[#a875ff] bg-[#f4f1eb] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07070a] transition hover:-translate-y-0.5"
            >
              See how much Lume could give back
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
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Now take some of it back</p>
            <h1 className="mx-auto mt-7 max-w-[620px] text-[clamp(26px,6.5vw,49px)] font-light leading-[1.1] tracking-[-0.04em]">
              How much time would you like to reclaim?
            </h1>
            <div className="mt-8 text-[64px] font-extralight leading-none tracking-[-0.06em]">
              {result.reclaimedHours.toFixed(1)}
              <span className="ml-2 text-[12px] tracking-[0.08em] text-white/45">hrs / day</span>
            </div>
            <p className="mt-2 text-[12px] text-white/45">
              from your <strong className="font-normal text-white">{result.safeHours.toFixed(1).replace(".0", "")}</strong> hrs / day
            </p>

            <div className="mx-auto mt-8 w-full max-w-[500px]">
              <div className="mb-3 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/40">
                <span>0</span>
                <span>{result.safeHours.toFixed(1).replace(".0", "")} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max={result.safeHours}
                step="0.5"
                value={result.reclaimedHours}
                onChange={(event) => setSaveHours(event.target.value)}
                className="w-full accent-[#a875ff]"
              />
            </div>

            <div className="mx-auto mt-5 grid max-w-[500px] grid-cols-4 overflow-hidden rounded-[4px] border border-white/15">
              {[2, 2.5, 3].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setQuickSave(choice)}
                  className={`border-r border-white/15 px-1.5 sm:px-3 py-3 text-[9px] sm:text-[10px] whitespace-nowrap transition ${result.reclaimedHours === choice ? "bg-[#a875ff]/15 text-white" : "text-white/45 hover:bg-white/5 hover:text-white"}`}
                >
                  {choice} hrs
                </button>
              ))}
              <button
                type="button"
                onClick={() => setQuickSave(result.safeHours / 2)}
                className="px-1.5 sm:px-3 py-3 text-[9px] sm:text-[10px] whitespace-nowrap text-white/45 transition hover:bg-white/5 hover:text-white"
              >
                50%
              </button>
            </div>

            <div className="mt-7 text-[clamp(64px,16vw,96px)] font-extralight leading-none tracking-[-0.075em]">
              {result.yearsBack.toFixed(1)}
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.42em] text-[#d4b7ff]">Years back</p>
            <p className="mx-auto mt-5 max-w-[500px] text-[13px] leading-relaxed text-white/45">
              Reclaim <strong className="font-normal text-white">{result.reclaimedHours.toFixed(1)} hours</strong> every day,
              and that is <strong className="font-normal text-white">{formatNumber(result.savedDays)} days</strong> of your life.
            </p>
            <button
              type="button"
              onClick={() => navigate("/for-me")}
              className="mt-7 h-14 w-full max-w-[440px] rounded-[4px] border border-[#a875ff] bg-[#f4f1eb] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07070a] transition hover:-translate-y-0.5"
            >
              Get these years back
            </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {step !== "intro" && step !== "calculating" ? (
          <button
            type="button"
            onClick={() => goToStep(step === "reclaim" ? "result" : "intro")}
            className="mt-8 text-[11px] uppercase tracking-[0.12em] text-white/45 transition hover:text-white"
          >
            Back
          </button>
        ) : null}
      </div>
    </main>
  );
}

function CalculatorField({ label, unit, children }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-end gap-5 border-b border-white/15 py-6">
      <div>
        <span className="mb-3 block text-[10px] uppercase tracking-[0.24em] text-white/45">
          {label}
        </span>
        {children}
      </div>
      <span className="pb-2 text-[13px] text-white/45">{unit}</span>
    </div>
  );
}
