import { useMemo, useState } from "react";
import {
  BadgeHelp,
  CreditCard,
  HelpCircle,
  Lock,
  MessageSquareText,
  Receipt,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

const FAQ_DATA = {
  "Getting Started": [
    {
      question: "What is Lume?",
      answer:
        "Lume is a physical and digital focus system designed to help you take control of your attention. The Lume Card works with the app to create intentional focus sessions and reduce access to distracting apps and websites.",
    },
    {
      question: "How does the Lume Card work?",
      answer:
        "The card uses NFC to communicate with your phone and trigger the Lume action connected to your selected mode or session.",
    },
    {
      question: "What happens when I don't have my Lume Card?",
      answer:
        "Locked apps remain protected until you use your Lume Card, depending on the blocking mode you've selected.",
    },
    {
      question: "Can I completely block distracting apps?",
      answer:
        "Lume is designed to restrict selected apps during focus sessions. The exact strength of the block depends on the operating system and the mode you choose.",
    },
    {
      question: "Can I set automatic focus schedules?",
      answer:
        "You can create repeatable focus routines so Lume helps you protect the same hours without rebuilding your setup every day.",
    },
  ],
  "How to use": [
    {
      question: "What do I need to start using Lume?",
      answer:
        "You need a compatible phone, the Lume app, and your Lume Card where the selected experience requires it. Setup connects the card with the app and lets you choose your first focus settings.",
    },
    {
      question: "How do I start a focus session?",
      answer:
        "Choose the apps or websites you want to stay away from, pick your focus mode, then tap the Lume Card to begin.",
    },
    {
      question: "Can I use different modes?",
      answer:
        "Yes. Lume is designed for different contexts such as study, deep work, family time, workouts, reading, and creating.",
    },
    {
      question: "What happens when my focus session ends?",
      answer:
        "The selected restrictions end according to your session rules, and your normal phone access returns.",
    },
  ],
  "Focus & Blocking": [
    {
      question: "Can I block apps and websites at the same time?",
      answer:
        "Where supported, yes. This helps prevent the common workaround of blocking an app but opening the same service in a browser.",
    },
    {
      question: "What happens if I try to bypass Lume?",
      answer:
        "Lume is designed to create friction, not imprison you. Depending on the mode, bypassing may require an intentional action, the Lume Card, an emergency path, or another permitted exit.",
    },
    {
      question: "Can I use my phone for important things while Lume is blocking?",
      answer:
        "Essential functions should remain accessible where technically supported, while the apps you explicitly choose to restrict stay protected.",
    },
    {
      question: "Why was Lume created?",
      answer:
        "Lume is built around a simple idea: attention is easier to protect when the decision to focus is made deliberately, instead of being left to the same screen that can distract you.",
    },
  ],
  "Lume Card": [
    {
      question: "Why does Lume need a physical card?",
      answer:
        "Because the phone is both the thing you use and the thing that distracts you. The physical card moves the commitment outside the screen and creates a deliberate moment before access returns.",
    },
    {
      question: "Is Lume just an NFC card?",
      answer:
        "No. The NFC hardware is only the physical trigger. The value is in how the Lume app interprets that interaction and applies the focus experience around it.",
    },
    {
      question: "Does the Lume Card need charging?",
      answer:
        "The Lume Card is designed as a passive NFC object, so it is not intended to need charging like a battery-powered device.",
    },
    {
      question: "Will Lume work through my phone case?",
      answer:
        "Most standard cases should allow NFC. Very thick, metal, or certain magnetic cases may interfere with the tap.",
    },
  ],
  Privacy: [
    {
      question: "What data does Lume collect?",
      answer:
        "Lume is designed to collect only the information required to provide the app, focus, account, and support functions, with clear boundaries between device permissions, local data, and server-side data.",
    },
    {
      question: "Can Lume see which apps I use?",
      answer:
        "Lume may require app or device usage permissions to enforce blocking and measure focus-related activity. That does not mean Lume can see private content inside those apps.",
    },
    {
      question: "Can Lume read my messages?",
      answer:
        "Blocking permissions should not be confused with message access. Lume's focus features are about restricting access to distractions, not reading private message content.",
    },
    {
      question: "Does Lume sell my data?",
      answer:
        "Lume's privacy policy explains how your data is handled and whether any third-party services are used to operate the product.",
    },
  ],
  Billing: [
    {
      question: "How much does Lume cost?",
      answer:
        "The live website should be treated as the source of truth for pricing, launch offers, and any current discounts.",
    },
    {
      question: "Is Lume a one-time purchase or subscription?",
      answer:
        "The FAQ should clearly separate the physical Lume Card purchase from any optional app subscription, if one exists.",
    },
    {
      question: "What is included with the Lume Card?",
      answer:
        "The purchase includes the physical Lume Card, plus the app access, included features, and support or warranty details shown at checkout.",
    },
    {
      question: "Can I return Lume?",
      answer:
        "Returns follow the window, eligibility, and process listed at purchase, with a support path for return requests.",
    },
  ],
};

const CATEGORIES = [
  "Getting Started",
  "How to use",
  "Focus & Blocking",
  "Lume Card",
  "Privacy",
  "Billing",
];

const CATEGORY_ICONS = {
  "Getting Started": Zap,
  "How to use": HelpCircle,
  "Focus & Blocking": ShieldCheck,
  "Lume Card": CreditCard,
  Privacy: Lock,
  Billing: Receipt,
};

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openIndex, setOpenIndex] = useState(2);
  const [query, setQuery] = useState("");

  const faqs = useMemo(() => {
    const activeFaqs = FAQ_DATA[activeCategory] || [];
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) return activeFaqs;

    return activeFaqs.filter((faq) =>
      `${faq.question} ${faq.answer}`.toLowerCase().includes(searchTerm)
    );
  }, [activeCategory, query]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(category === "Getting Started" ? 2 : -1);
  };

  const handleFAQClick = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="faq-exact-section">
      <div className="faq-exact-glow" />
      <div className="faq-exact-top-glow" />

      <div className="faq-exact-shell">
        <header className="faq-exact-header mt-10">
          <span className="faq-exact-pill">
            FAQ
          </span>

          <h2 className="faq-exact-title">
            Questions? We've got answers.
          </h2>

          <label className="faq-exact-search">
            <Search
              size={16}
              strokeWidth={1.7}
              className="faq-exact-search-icon"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your question"
              className="faq-exact-search-input"
            />
          </label>
        </header>

        <div className="faq-exact-tabs">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            const Icon = CATEGORY_ICONS[category] || BadgeHelp;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`faq-exact-tab ${
                  active
                    ? "faq-exact-tab-active"
                    : ""
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.6}
                />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        <div className="faq-exact-content">
          <div className="faq-exact-list">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => handleFAQClick(index)}
                />
              ))
            ) : (
              <div className="faq-exact-empty">
                No questions found in this category.
              </div>
            )}
          </div>

          <HelpCard />
        </div>
      </div>
    </section>
  );
}

function HelpCard() {
  return (
    <aside className="faq-exact-help">
      <span className="faq-exact-help-icon">
        <MessageSquareText size={18} strokeWidth={1.7} />
      </span>

      <h3 className="faq-exact-help-title">
        Still need help?
      </h3>
      <p className="faq-exact-help-copy">
        Can't find what you're looking for? Ask us directly and we'll get back
        to you within 24 hours.
      </p>

      <div className="faq-exact-help-actions">
        <a
          href="mailto:support@lume.com"
          className="faq-exact-help-button"
        >
          Get in touch
        </a>
        <a
          href="#contact"
          className="faq-exact-help-button"
        >
          Connect on WhatsApp
          <span className="faq-exact-whatsapp-dot">
            ✓
          </span>
        </a>
      </div>
    </aside>
  );
}

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div
      className={`faq-exact-item ${
        isOpen ? "faq-exact-item-open" : ""
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="faq-exact-question"
      >
        <span>
          {faq.question}
        </span>

        <span
          className={`faq-exact-plus ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <span />
          <span />
        </span>
      </button>

      <div
        className={`faq-exact-answer-wrap ${
          isOpen ? "faq-exact-answer-open" : ""
        }`}
      >
        <div className="overflow-hidden">
          <div className="faq-exact-answer">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
