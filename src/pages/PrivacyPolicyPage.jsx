import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Smartphone,
  Activity,
  Layers,
  Bell,
  Database,
  Users,
  RefreshCw,
  Mail,
  Building,
  Check,
  Copy,
  ChevronRight,
  ArrowLeft,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("support@lumeapp.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sections = [
    { id: "overview", number: "1", title: "Overview" },
    { id: "data-collection", number: "2", title: "Data Collection and Usage" },
    { id: "sensitive-permissions", number: "3", title: "Sensitive Permissions & Local Handling" },
    { id: "data-sharing", number: "4", title: "Data Sharing & Third-Party Services" },
    { id: "data-security", number: "5", title: "Data Security" },
    { id: "childrens-privacy", number: "6", title: "Children's Privacy" },
    { id: "policy-updates", number: "7", title: "Updates to This Privacy Policy" },
    { id: "contact-us", number: "8", title: "Contact Us" },
  ];

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-[#7c5cff] selection:text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow effect */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.18),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(79,214,208,0.08),_transparent_55%)]" />

      <div className="mx-auto max-w-[1100px]">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[13px] text-white/50">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-white/30" />
          <span className="text-white/80">Legal</span>
          <ChevronRight size={13} className="text-white/30" />
          <span className="font-medium text-[#b9a6ff]">Privacy Policy</span>
        </div>

        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/15 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#b9a6ff] uppercase">
              <ShieldCheck size={13} />
              Privacy & Trust First
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
              Package: com.novafutura.focuslume
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy for LUME
          </h1>

          <p className="mt-3 text-lg font-medium text-white/80">
            LUME : Focus on what matters
          </p>

          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/60">
            SARWANA NOVAFUTURA TECHWORK LLP is dedicated to empowering your focus and screen-time balance
            while preserving absolute confidentiality of your personal habits. Learn how your data and device permissions are handled.
          </p>

          {/* Key Metadata Row */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <span className="block text-[11px] uppercase tracking-wider text-white/40">
                Effective Date
              </span>
              <span className="mt-1 block text-[14px] font-semibold text-white">
                September 18, 2026
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <span className="block text-[11px] uppercase tracking-wider text-white/40">
                Operating Entity
              </span>
              <span className="mt-1 block text-[14px] font-semibold text-white truncate" title="SARWANA NOVAFUTURA TECHWORK LLP">
                SARWANA NOVAFUTURA TECHWORK LLP
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <span className="block text-[11px] uppercase tracking-wider text-white/40">
                Architecture
              </span>
              <span className="mt-1 block text-[14px] font-semibold text-[#4fd6d0]">
                Local-First & On-Device
              </span>
            </div>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c5cff]/20 text-[#b9a6ff]">
              <Lock size={18} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-white">Local-First Processing</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              Usage metrics and block schedules execute right on your phone without cloud storage.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4fd6d0]/20 text-[#4fd6d0]">
              <EyeOff size={18} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-white">Zero Surveillance</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              We never record keystrokes, intercept screen contents, or inspect sensitive chats.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6b57]/20 text-[#ff6b57]">
              <ShieldCheck size={18} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-white">No Data Selling</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              We do not sell, rent, monetise, or trade your personal information with data brokers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
              <Database size={18} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-white">Anonymized Telemetry</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              Firebase Analytics collects only non-identifying crash telemetry for stability.
            </p>
          </div>
        </motion.div>

        {/* Main Content Layout with Sidebar Table of Contents */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sticky Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Table of Contents
              </p>
              <nav className="mt-3 flex flex-col space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-white/60 transition-colors hover:bg-white/5 hover:text-[#b9a6ff]"
                  >
                    <span className="font-mono text-[11px] text-[#7c5cff]">
                      {section.number}.
                    </span>
                    <span className="truncate">{section.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[12px] text-white/50">Need clarification?</p>
                <a
                  href="#contact-us"
                  className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#b9a6ff] hover:underline"
                >
                  Contact our privacy team <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </aside>

          {/* Document Body */}
          <div className="space-y-8">
            {/* 1. Overview */}
            <section
              id="overview"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  1
                </span>
                <h2 className="text-xl font-semibold text-white">Overview</h2>
              </div>

              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/70">
                <p>
                  <strong className="text-white">SARWANA NOVAFUTURA TECHWORK LLP</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) built the{" "}
                  <strong className="text-white">LUME</strong> application (Package:{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-[#4fd6d0]">
                    com.novafutura.focuslume
                  </code>
                  ) as a productivity, focus, and screen-time management tool.
                </p>
                <p>
                  This Privacy Policy informs users regarding our policies with the collection, use, and disclosure of personal and device information for anyone using our application.
                </p>
                <div className="rounded-xl border border-[#7c5cff]/25 bg-[#7c5cff]/10 p-4 text-[14px] text-white/80">
                  By downloading, installing, or using LUME, you acknowledge the terms outlined in this Privacy Policy. We hold an unwavering commitment to user privacy: your behavioral focus routines remain your personal domain.
                </div>
              </div>
            </section>

            {/* 2. Data Collection and Usage */}
            <section
              id="data-collection"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  2
                </span>
                <h2 className="text-xl font-semibold text-white">Data Collection and Usage</h2>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                We only collect and process data necessary to provide and improve LUME&apos;s core features:
              </p>

              <div className="mt-6 space-y-4">
                {/* App Usage & Activity Data */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="text-[#7c5cff]" size={20} />
                      <h3 className="font-semibold text-white">App Usage & Activity Data</h3>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#4fd6d0]">
                      PACKAGE_USAGE_STATS
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
                    We access device usage statistics (via <code className="text-[#b9a6ff]">PACKAGE_USAGE_STATS</code>) locally on your device to calculate screen time, display usage insights, and enforce user-defined daily app limits.
                  </p>
                  <p className="mt-2 text-[13px] text-white/50">
                    🔒 <strong>Local guarantee:</strong> These statistics are processed directly on your smartphone processor and are not uploaded to remote databases.
                  </p>
                </div>

                {/* Step & Activity Recognition Data */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Activity className="text-[#4fd6d0]" size={20} />
                      <h3 className="font-semibold text-white">Step & Activity Recognition Data</h3>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#4fd6d0]">
                      ACTIVITY_RECOGNITION
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
                    If enabled, we access step counter sensors (via <code className="text-[#b9a6ff]">ACTIVITY_RECOGNITION</code>) locally to support the &ldquo;Steps Before Scroll&rdquo; challenge feature.
                  </p>
                  <p className="mt-2 text-[13px] text-white/50">
                    🚶 <strong>Optional functionality:</strong> Used exclusively to unlock apps when you reach physical activity targets. Can be disabled at any time.
                  </p>
                </div>

                {/* Device Identifiers & Analytics */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Database className="text-[#ff6b57]" size={20} />
                      <h3 className="font-semibold text-white">Device Identifiers & Analytics</h3>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#ff6b57]">
                      Firebase Analytics
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
                    We use Firebase Analytics to aggregate anonymous crash logs, performance metrics, and app interaction events to diagnose bugs and improve app stability.
                  </p>
                  <p className="mt-2 text-[13px] text-white/50">
                    📊 <strong>De-identified:</strong> Never paired with personal identification or individual app usage histories.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Sensitive Permissions & Local Handling */}
            <section
              id="sensitive-permissions"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  3
                </span>
                <h2 className="text-xl font-semibold text-white">Sensitive Permissions & Local Handling</h2>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                LUME requires specific system permissions to function as an app blocker and focus tool:
              </p>

              <div className="mt-6 space-y-4">
                {/* Accessibility Service */}
                <div className="rounded-xl border border-[#7c5cff]/30 bg-[#7c5cff]/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="text-[#b9a6ff]" size={20} />
                      <h3 className="font-semibold text-white">Accessibility Service</h3>
                    </div>
                    <span className="rounded bg-[#7c5cff]/20 px-2 py-0.5 font-mono text-[11px] text-[#b9a6ff]">
                      BIND_ACCESSIBILITY_SERVICE
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                    Used solely to detect when a user-blocked application or website is launched in the foreground and render the focus overlay.
                  </p>
                  <div className="mt-3.5 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-[13px] text-red-200/90">
                    <EyeOff size={18} className="mt-0.5 shrink-0 text-red-400" />
                    <span>
                      <strong>Strict Non-Interception Guarantee:</strong> We do <u>not</u> record keystrokes, intercept screen contents, monitor passwords, or transmit accessibility data off your device.
                    </span>
                  </div>
                </div>

                {/* Installed Applications List */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Layers className="text-[#4fd6d0]" size={20} />
                      <h3 className="font-semibold text-white">Installed Applications List</h3>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#4fd6d0]">
                      QUERY_ALL_PACKAGES
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                    Used exclusively to display installed applications to the user so they can select which apps to block or limit.
                  </p>
                </div>

                {/* Foreground Services & Alarms */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Bell className="text-[#ff6b57]" size={20} />
                      <h3 className="font-semibold text-white">Foreground Services & Alarms</h3>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white/70">
                      FOREGROUND_SERVICE
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                    Used to display an active session notification and schedule focus block timers reliably in the background without termination by Android battery optimization.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Data Sharing & Third-Party Services */}
            <section
              id="data-sharing"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  4
                </span>
                <h2 className="text-xl font-semibold text-white">Data Sharing & Third-Party Services</h2>
              </div>

              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/70">
                <p className="font-medium text-white">
                  We do not sell, rent, or trade your personal data.
                </p>
                <p>
                  We utilize trusted third-party service providers limited strictly to essential app infrastructure:
                </p>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#4fd6d0]" />
                      <h3 className="font-semibold text-white">Google Firebase Analytics</h3>
                    </div>
                    <span className="text-[12px] text-white/40">Diagnostic Partner</span>
                  </div>
                  <p className="mt-2 text-[14px] text-white/70">
                    Used for anonymized crash reporting and app performance diagnostics. Google processes this telemetry in accordance with standard Firebase data processing terms without personal identifiers.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Data Security */}
            <section
              id="data-security"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  5
                </span>
                <h2 className="text-xl font-semibold text-white">Data Security</h2>
              </div>

              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/70">
                <p>
                  We implement administrative, technical, and physical safeguards designed to protect user data.
                </p>
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-[14px] text-emerald-200">
                  <Lock size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                  <p>
                    <strong>Local Storage Security:</strong> Local block settings, schedules, app friction thresholds, and user preferences remain securely stored right on your device sandbox.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Children's Privacy */}
            <section
              id="childrens-privacy"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  6
                </span>
                <h2 className="text-xl font-semibold text-white">Children&apos;s Privacy</h2>
              </div>

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/70">
                <p>
                  LUME is designed for general audiences aged 13 and older. We do not knowingly collect personally identifiable information from children under 13.
                </p>
                <p>
                  If you become aware that a child under 13 has provided personal information to us, please notify us immediately at{" "}
                  <a href="mailto:support@lumeapp.in" className="text-[#b9a6ff] underline hover:text-white">
                    support@lumeapp.in
                  </a>
                  , and we will take immediate measures to delete any such data.
                </p>
              </div>
            </section>

            {/* 7. Updates to This Privacy Policy */}
            <section
              id="policy-updates"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 font-mono text-sm font-semibold text-[#b9a6ff]">
                  7
                </span>
                <h2 className="text-xl font-semibold text-white">Updates to This Privacy Policy</h2>
              </div>

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/70">
                <p>
                  We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.
                </p>
                <p>
                  Any updates are effective immediately upon posting to this page. When significant revisions are made, we will notify users through application update release notes.
                </p>
              </div>
            </section>

            {/* 8. Contact Us */}
            <section
              id="contact-us"
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-[#7c5cff]/10 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/30 font-mono text-sm font-semibold text-[#b9a6ff]">
                  8
                </span>
                <h2 className="text-xl font-semibold text-white">Contact Us</h2>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                If you have any questions or suggestions about our Privacy Policy, contact us at:
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Email Card */}
                <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Mail size={16} className="text-[#b9a6ff]" />
                      <span className="text-[12px] font-medium uppercase tracking-wider">
                        Direct Email
                      </span>
                    </div>
                    <a
                      href="mailto:support@lumeapp.in"
                      className="mt-2 block text-[17px] font-semibold text-white hover:text-[#b9a6ff]"
                    >
                      support@lumeapp.in
                    </a>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href="mailto:support@lumeapp.in"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#7c5cff] px-3.5 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#6c48ff]"
                    >
                      <span>Send email</span>
                      <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Company Entity Card */}
                <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Building size={16} className="text-[#4fd6d0]" />
                      <span className="text-[12px] font-medium uppercase tracking-wider">
                        Registered Entity
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] font-semibold text-white">
                      SARWANA NOVAFUTURA TECHWORK LLP
                    </p>
                    <p className="mt-1 text-[13px] text-white/50">
                      Developer of LUME : Focus on what matters
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-[#4fd6d0] hover:underline"
                    >
                      Visit general contact page <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Copyright Footnote */}
              <div className="mt-8 border-t border-white/10 pt-6 text-center text-[12px] text-white/40">
                © 2026 SARWANA NOVAFUTURA TECHWORK LLP. All rights reserved.
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
