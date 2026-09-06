import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LIFE_EXPECTANCY = 80;

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
  const [age, setAge] = useState(22);
  const [hours, setHours] = useState(6);
  const [saveHours, setSaveHours] = useState(1.5);

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
    setStep("result");
  }

  function setQuickSave(value) {
    setSaveHours(clamp(value, 0, result.safeHours));
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-5 py-32 text-[#f4f1eb]">
      <div className="pointer-events-none absolute h-[min(72vw,820px)] w-[min(72vw,820px)] rounded-full bg-[#a875ff]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-[720px]">
        {step === "intro" ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
              A different way to look at screen time
            </p>
            <h1 className="mt-7 text-[42px] font-light leading-[1.02] tracking-[-0.045em] sm:text-[70px]">
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

        {step === "result" ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Here is the truth</p>
            <h1 className="mx-auto mt-7 max-w-[570px] text-[28px] font-light leading-[1.2] tracking-[-0.035em] sm:text-[39px]">
              At your current pace, you are on track to spend
            </h1>
            <div className="mt-8 text-[86px] font-extralight leading-none tracking-[-0.075em] sm:text-[122px]">
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
              onClick={() => setStep("reclaim")}
              className="mt-8 h-14 w-full max-w-[520px] rounded-[4px] border border-[#a875ff] bg-[#f4f1eb] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07070a] transition hover:-translate-y-0.5"
            >
              See how much Lume could give back
            </button>
          </motion.div>
        ) : null}

        {step === "reclaim" ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Now take some of it back</p>
            <h1 className="mx-auto mt-7 max-w-[620px] text-[34px] font-light leading-[1.08] tracking-[-0.045em] sm:text-[49px]">
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
                  className={`border-r border-white/15 px-3 py-3 text-[10px] transition ${result.reclaimedHours === choice ? "bg-[#a875ff]/15 text-white" : "text-white/45 hover:bg-white/5 hover:text-white"}`}
                >
                  {choice} hrs
                </button>
              ))}
              <button
                type="button"
                onClick={() => setQuickSave(result.safeHours / 2)}
                className="px-3 py-3 text-[10px] text-white/45 transition hover:bg-white/5 hover:text-white"
              >
                50%
              </button>
            </div>

            <div className="mt-7 text-[78px] font-extralight leading-none tracking-[-0.075em] sm:text-[96px]">
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

        {step !== "intro" ? (
          <button
            type="button"
            onClick={() => setStep(step === "reclaim" ? "result" : "intro")}
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
