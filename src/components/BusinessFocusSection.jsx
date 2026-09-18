import {
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Send,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProcessSection from "./ProcessSection.jsx";

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const revealViewport = {
  once: true,
  amount: 0.18,
};

const TESTIMONIALS = [
  {
    name: "Sarah Smith",
    role: "UX Designer",
    quote:
      "Lume gave our design team a simple way to protect the hours that actually need quiet.",
    handle: "@invoicelog",
    date: "Mar 20, 2026",
  },
  {
    name: "Aaron Patel",
    role: "Founder",
    quote:
      "The physical card made focus feel concrete. Adoption was much easier than another software-only blocker.",
    handle: "@northpeak",
    date: "Apr 08, 2026",
  },
  {
    name: "Mia Chen",
    role: "People Ops",
    quote:
      "We use Lume during deep work blocks, onboarding, and team offsites. It has become part of our operating rhythm.",
    handle: "@veralabs",
    date: "May 14, 2026",
  },
  {
    name: "Jon Bell",
    role: "Engineering",
    quote:
      "The best part is how little explanation it needs. Tap in, lock distractions, and get back to the work.",
    handle: "@orbitco",
    date: "May 28, 2026",
  },
  {
    name: "Priya Rao",
    role: "Ops Lead",
    quote:
      "Our team wanted fewer meeting-free hours lost to context switching. Lume helped those hours stay protected.",
    handle: "@atlasstudio",
    date: "Jun 11, 2026",
  },
  {
    name: "David Kim",
    role: "Product",
    quote:
      "It is rare for a focus tool to feel this humane. Lume adds just enough friction without making people feel managed.",
    handle: "@forge",
    date: "Jun 24, 2026",
  },
];

const TRUSTED_TEAMS = [
  "NORTHPEAK",
  "VERA LABS",
  "ORBITCO",
  "ATLAS STUDIO",
  "FORGE",
];

export default function BusinessFocusSection() {
  return (
    <section id="business" className="w-full bg-white text-[#24242d]">
      <BusinessHero />
      <ProcessSection />
      <Testimonials />
      <BusinessContact />
      <TrustStrip />
    </section>
  );
}

function BusinessHero() {
  return (
    <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute left-[31%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#7c5cff]/12 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-16 md:grid-cols-[0.95fr_1.05fr] lg:gap-28">
        <motion.div
          initial={{
            opacity: 0,
            y: 34,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex justify-center md:justify-end"
        >
          <img
            src="/videos/video1.gif"
            alt="Lume app preview"
            className="h-auto w-[280px] select-none object-contain sm:w-[340px] lg:w-[410px]"
            draggable="false"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 36,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: "easeOut",
          }}
          className="mx-auto w-full max-w-[430px] text-center md:mx-0 md:text-left"
        >
          <span className="inline-flex rounded-full border border-[#7c5cff]/35 bg-[#7c5cff]/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b9a6ff]">
            Corporate &amp; bulk orders
          </span>

          <h1 className="mt-5 text-[38px] font-medium leading-[0.96] tracking-[-0.045em] text-white sm:text-[48px]">
            One tap to remove
            <br />
            every distraction.
          </h1>

          <p className="mt-5 text-[12px] leading-relaxed text-white/48 sm:text-[13px]">
            Lume is a small NFC card that locks distracting apps until you tap
            it. Equip your team, students, or clients with a focus tool they
            can actually keep on their desk.
          </p>

          <p className="mt-4 text-[12px] leading-relaxed text-white/45">
            Add your logo, ship it in branded packaging, and make it a gift
            people are glad to get.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <span className="text-[12px] tracking-[0.18em] text-[#b9a6ff]">
              ★★★★★
            </span>
            <span className="text-[11px] text-white/50">
              4.8/5 · 3,000+ reviews
            </span>
          </div>

          <a
            href="#business-enquiry"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[11px] font-semibold text-black transition duration-300 hover:bg-white/90"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="bg-[#f4f4f5] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <div>
            <span className="text-[10px] font-medium text-[#7c5cff]">
              Testimonials
            </span>
            <h2 className="mt-3 max-w-[420px] text-[34px] font-semibold leading-[1.03] tracking-[-0.035em] text-[#2c2c35] sm:text-[42px]">
              What are they saying about us?
            </h2>
          </div>

          <div className="md:justify-self-end">
            <p className="max-w-[310px] text-sm leading-relaxed text-[#71717b]">
              Focus programs work best when the tool is simple enough for the
              whole team to use daily.
            </p>
            <a
              href="#business-enquiry"
              className="mt-5 inline-flex items-center rounded-full bg-[#7c5cff] px-5 py-3 text-[11px] font-semibold text-white transition duration-300 hover:bg-[#6848dd]"
            >
              Get Lume
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <motion.article
              key={`${item.name}-${item.date}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.06,
                ease: "easeOut",
              }}
              className="rounded-[8px] bg-white p-5 text-[#34343d] shadow-[0_12px_35px_rgba(15,15,20,0.04)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#ececf1]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#30303a]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[10px] text-[#9696a0]">
                      {item.handle}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-[#f4f4f6] px-3 py-1 text-[9px] font-medium text-[#6e6e79]">
                  {item.role}
                </span>
              </div>

              <p className="mt-5 min-h-[72px] text-[12px] leading-relaxed text-[#777784]">
                {item.quote}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[#eeeeef] pt-4 text-[10px] text-[#a0a0aa]">
                <span className="inline-flex items-center gap-2">
                  <Send size={12} />
                  {item.handle}
                </span>
                <span>{item.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BusinessContact() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [logoName, setLogoName] = useState("");

  async function submitEnquiry(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        body: formData,
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || "Could not submit enquiry");
      form.reset();
      setLogoName("");
      setStatus({ type: "success", message: "Thanks. Our business team will get back to you soon." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <motion.div
        id="business-enquiry"
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
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9b9ba5]">
          Get in touch
        </span>
        <h2 className="mt-3 text-[38px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#30303a] sm:text-[54px]">
          Let&apos;s talk about Lume.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-[#777784]">
          Fill out the form for a quick quote, or email us directly at{" "}
          <a className="text-[#7137ff]" href="mailto:business@lume.app">
            business@lume.app
          </a>
          . Send a logo and we can mock up custom cards.
        </p>

        <form onSubmit={submitEnquiry} className="mx-auto mt-10 grid max-w-[560px] gap-4 text-left">
          <input type="hidden" name="type" value="business" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" placeholder="Enter your first name" required />
            <Field label="Last name" name="lastName" placeholder="Enter your last name" />
            <Field
              label="Your email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required
            />
            <Field label="Phone" name="phone" placeholder="Enter your number" />
            <Field label="Country" name="country" placeholder="India" />
            <Field label="Organization" name="organization" placeholder="Enter organization name" />
          </div>

          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9b9ba5]">
              Optional logo upload
            </span>
            <span className="relative flex h-11 cursor-pointer items-center gap-3 rounded-[7px] border border-[#e7e7eb] px-4 text-[12px] text-[#a0a0aa] transition hover:border-[#7c5cff]">
              <Upload size={14} />
              <span className="truncate">{logoName || "PNG, JPG, or WebP preferred"}</span>
              <input
                type="file"
                name="logo"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(event) => setLogoName(event.target.files?.[0]?.name || "")}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9b9ba5]">
              Message
            </span>
            <textarea
              name="message"
              rows="4"
              placeholder="Quantities, deadlines, or anything else we should know..."
              required
              className="w-full resize-none rounded-[7px] border border-[#e7e7eb] px-4 py-3 text-[12px] text-[#30303a] outline-none transition placeholder:text-[#b7b7c0] focus:border-[#7c5cff]"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-[11px] font-semibold text-white transition duration-300 hover:bg-[#191919]"
            >
              {submitting ? "Submitting..." : "Submit enquiry"}
              <ArrowRight size={14} strokeWidth={1.8} />
            </button>
            <p className="text-[10px] text-[#9b9ba5]">
              We add focus cards, dashboard onboarding, and admin guidance.
            </p>
          </div>

          {status.message ? (
            <p className={`rounded-[7px] border px-4 py-3 text-[12px] ${status.type === "success" ? "border-[#b7ebc6] bg-[#f0fff4] text-[#217a3a]" : "border-[#ffd0cc] bg-[#fff6f5] text-[#b42318]"}`}>
              {status.message}
            </p>
          ) : null}
        </form>

        <div className="mx-auto mt-10 grid max-w-[620px] gap-4 sm:grid-cols-3">
          <ContactCard
            icon={<Phone size={15} />}
            title="Reach out"
            text="(971) 535-4076"
          />
          <ContactCard
            icon={<Mail size={15} />}
            title="Email"
            text="support@lume.com"
          />
          <ContactCard
            icon={<MapPin size={15} />}
            title="Office"
            text="Kochi, India"
          />
        </div>
      </motion.div>
    </div>
  );
}

function TrustStrip() {
  const [logos, setLogos] = useState([]);
  const [sectionActive, setSectionActive] = useState(null);

  useEffect(() => {
    let alive = true;

    async function loadLogos() {
      try {
        const [sectionResponse, logosResponse] = await Promise.all([
          fetch(`${API_URL}/logos/section`),
          fetch(`${API_URL}/logos/active`),
        ]);
        const sectionBody = await sectionResponse.json().catch(() => ({ active: true }));
        const logosBody = await logosResponse.json().catch(() => []);
        if (!sectionResponse.ok) throw new Error(sectionBody.message || "Could not load logo section");
        if (!logosResponse.ok) throw new Error(logosBody.message || "Could not load logos");
        if (alive) {
          setSectionActive(Boolean(sectionBody.active));
          setLogos(Array.isArray(logosBody) ? logosBody : []);
        }
      } catch {
        if (alive) {
          setSectionActive(true);
          setLogos([]);
        }
      }
    }

    loadLogos();
    return () => {
      alive = false;
    };
  }, []);

  if (sectionActive === false) return null;

  return (
    <div className="border-t border-[#eeeeef] bg-white px-5 pb-20 pt-6 text-center sm:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <p className="text-sm font-medium text-[#45454f]">
          Trusted by teams who take focus seriously
        </p>
        <div className="mx-auto mt-8 flex max-w-[820px] flex-wrap items-center justify-center gap-4">
          {logos.length
            ? logos.map((logo) => (
              <span
                key={logo._id}
                className="flex h-16 min-w-[132px] items-center justify-center rounded-[8px] border border-[#eeeeef] bg-white px-5"
                title={logo.name}
              >
                <img
                  src={logo.image?.url}
                  alt={logo.name}
                  className="max-h-9 max-w-[118px] object-contain"
                />
              </span>
            ))
            : TRUSTED_TEAMS.map((team) => (
              <span
                key={team}
                className="text-[10px] font-semibold tracking-[0.12em] text-[#b0b0b9]"
              >
                {team}
              </span>
            ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-3">
          <Building2 size={18} className="text-[#7c5cff]" />
          <div>
            <p className="text-[36px] font-semibold leading-none tracking-[-0.035em] text-[#30303a]">
              2,418,905
            </p>
            <p className="mt-2 text-[11px] text-[#9696a0]">
              Hours of focus reclaimed by Lume teams, together
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9b9ba5]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-[7px] border border-[#e7e7eb] px-4 text-[12px] text-[#30303a] outline-none transition placeholder:text-[#b7b7c0] focus:border-[#7c5cff]"
      />
    </label>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded-[8px] border border-[#eeeeef] bg-white p-4 text-left">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3f2ff] text-[#7137ff]">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-semibold text-[#30303a]">
          {title}
        </span>
        <span className="mt-1 block text-[10px] text-[#8d8d97]">{text}</span>
      </span>
    </div>
  );
}
