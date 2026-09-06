import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="bg-white px-5 py-20 text-[#373741] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
          <div>
            <span className="inline-flex rounded-full border border-black px-6 py-3 text-[14px] font-medium text-black">
              Lume in numbers
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="max-w-[760px] text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[52px]">
              Small changes.{" "}
              <span className="text-[#a4a4b5]">Measurable focus.</span>
            </h2>
            <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-[#696c7c]">
              Lume turns everyday moments of distraction into intentional choices, helping you protect time, build consistency, and stay present.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-16 overflow-hidden rounded-[18px] border border-[#ebeef5] bg-white px-6 py-20 shadow-[0_14px_44px_rgba(34,34,48,0.05)] sm:px-10"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-full max-w-[780px] bg-[linear-gradient(to_right,rgba(226,231,240,0.72)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,231,240,0.6)_1px,transparent_1px)] bg-[size:84px_84px] opacity-55" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />

          <div className="relative mx-auto max-w-[620px] text-center">
            <h3 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1d1759] sm:text-[42px]">
              The average person spends over a decade of their life looking at a screen.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6f7280]">
              See what your own number looks like - and what you could get back.
            </p>
            <Link
              to="/calculator"
              className="mt-8 inline-flex rounded-full bg-[#efe2ff] px-8 py-3 text-[14px] font-medium text-[#8a39ff] transition hover:bg-[#e7d2ff]"
            >
              Calculate your focus numbers
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
