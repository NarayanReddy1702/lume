import { useEffect, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "normal" }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || "Could not submit enquiry");
      setValues(emptyForm);
      setStatus({ type: "success", message: "Thanks. We will get back to you soon." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!status.message) return undefined;
    const timeout = window.setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 4200);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <section id="contact" className="min-h-screen bg-white px-5 pb-24 pt-32 text-[#30303a] sm:px-8 lg:px-10">
      <ContactToast status={status} onClose={() => setStatus({ type: "", message: "" })} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-[760px] text-center"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#4a4a55]">
          Get in touch
        </p>
        <h1 className="mt-4 text-[42px] font-semibold leading-none tracking-[-0.04em] text-[#373741] sm:text-[64px]">
          Let&apos;s talk about Lume.
        </h1>
        <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-relaxed text-[#666878]">
          Have a question, need help, or interested in bringing Lume to your team? Tell us what you need and we&apos;ll get back to you.
        </p>

        <form onSubmit={submitEnquiry} className="mx-auto mt-16 grid max-w-[704px] gap-7 text-left">
          <div className="grid gap-6 sm:grid-cols-2">
            <ContactField label="First name" value={values.firstName} onChange={(value) => updateValue("firstName", value)} placeholder="Enter your first name" required />
            <ContactField label="Last name" value={values.lastName} onChange={(value) => updateValue("lastName", value)} placeholder="Enter your last name" />
          </div>
          <ContactField label="Your email" value={values.email} onChange={(value) => updateValue("email", value)} placeholder="Enter your email" type="email" required />
          <ContactField label="Subject" value={values.subject} onChange={(value) => updateValue("subject", value)} placeholder="Enter your subject" />
          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#676a7a]">
              Message
            </span>
            <textarea
              value={values.message}
              onChange={(event) => updateValue("message", event.target.value)}
              rows="8"
              placeholder="Enter your message"
              required
              className="w-full resize-none rounded-[7px] border border-[#d7dbe5] px-4 py-4 text-[14px] text-[#30303a] outline-none transition placeholder:text-[#989dad] focus:border-[#30303a]"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-black px-7 py-4 text-[14px] font-medium text-white transition hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Get Lume"}
            </button>
            <span className="inline-flex items-center gap-3 text-[12px] text-[#5e606b]">
              <Send size={14} strokeWidth={1.8} />
              Add footnote / additional information in here.
            </span>
          </div>

          {status.message ? (
            <p className={`rounded-[7px] border px-4 py-3 text-[13px] ${status.type === "success" ? "border-[#b7ebc6] bg-[#f0fff4] text-[#217a3a]" : "border-[#ffd0cc] bg-[#fff6f5] text-[#b42318]"}`}>
              {status.message}
            </p>
          ) : null}
        </form>

        <div className="mx-auto mt-14 grid max-w-[764px] gap-6 sm:grid-cols-3">
          <ContactCard icon={<Phone size={18} />} title="Reach out" text="(917) 339-6416" />
          <ContactCard active icon={<Mail size={18} />} title="Email" text="support@lume.com" />
          <ContactCard icon={<MapPin size={18} />} title="Office" text="Kochi, India" />
        </div>
      </motion.div>
    </section>
  );
}

function ContactToast({ status, onClose }) {
  if (!status.message) return null;
  const isSuccess = status.type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      className="fixed right-5 top-24 z-[80] w-[min(380px,calc(100vw-40px))] rounded-[8px] border border-[#d7dbe5] bg-white p-4 text-left shadow-[0_18px_45px_rgba(15,15,20,0.14)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isSuccess ? "bg-[#eafaf0] text-[#248a44]" : "bg-[#fff0ef] text-[#c0342b]"}`}>
          {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-[#30303a]">
            {isSuccess ? "Enquiry submitted" : "Submission failed"}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#686b78]">
            {status.message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[#9da1ad] transition hover:text-[#30303a]"
          aria-label="Close message"
        >
          <XCircle size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function ContactField({ label, value, onChange, placeholder, type = "text", required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#676a7a]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-14 w-full rounded-[7px] border border-[#d7dbe5] px-4 text-[14px] text-[#30303a] outline-none transition placeholder:text-[#989dad] focus:border-[#30303a]"
      />
    </label>
  );
}

function ContactCard({ icon, title, text, active = false }) {
  return (
    <div className={`flex items-center gap-4 rounded-[8px] border px-6 py-6 text-left ${active ? "border-transparent bg-[#f3f3f5]" : "border-[#d7dbe5] bg-white"}`}>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${active ? "bg-[#383943] text-white" : "bg-[#f2f3f6] text-[#383943]"}`}>
        {icon}
      </span>
      <span>
        <span className="block text-[14px] font-medium text-[#383943]">{title}</span>
        <span className="mt-2 block text-[13px] text-[#737684]">{text}</span>
      </span>
    </div>
  );
}
