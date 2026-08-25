import { useState } from "react";

const FAQ_DATA = {
  "Getting Started": [
    {
      question: "What is Lume?",
      answer:
        "Lume is a physical and digital focus system designed to help you take control of your attention. The Lume Card works with the app to create intentional focus sessions and reduce access to distracting apps and websites.",
    },
    {
      question: "Why was Lume created?",
      answer:
        "Lume is built around a simple idea: attention is easier to protect when the decision to focus is made deliberately, instead of being left to the same screen that can distract you.",
    },
    {
      question: "How does Lume work?",
      answer:
        "You choose what you want to stay away from, define the focus experience you want, and start a session. The app applies your rules, while the physical card adds a deliberate step between your intention and the distraction.",
    },
    {
      question: "What happens when I tap the Lume Card?",
      answer:
        "The card uses NFC to communicate with your phone and trigger the Lume action connected to your selected mode or session.",
    },
    {
      question: "What do I need to start using Lume?",
      answer:
        "You need a compatible phone, the Lume app, and your Lume Card where the selected experience requires it. Setup connects the card with the app and lets you choose your first focus settings.",
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
      question: "What happens if I don't have my Lume Card?",
      answer:
        "Behavior depends on the blocking mode you choose. In modes that require the card for access, protected apps remain restricted until the permitted unlock or recovery method is used.",
    },
    {
      question: "Will Lume work through my phone case?",
      answer:
        "Most standard cases should allow NFC. Very thick, metal, or certain magnetic cases may interfere with the tap.",
    },
  ],

  "Focus & Blocking": [
    {
      question: "Can I completely block distracting apps?",
      answer:
        "Lume is designed to restrict selected apps during focus sessions. The exact strength of the block depends on the operating system and the mode you choose.",
    },
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
      question: "What happens when my focus session ends?",
      answer:
        "The selected restrictions end according to your session rules, and your normal phone access returns.",
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
    {
      question: "Can I delete my data?",
      answer:
        "Users should have a clear way to delete their account and applicable stored data, with an explanation of anything that must be retained for legal or transaction reasons.",
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
    {
      question: "What if I cannot find my question?",
      answer:
        "Use the FAQ search or Ask a Question flow. If no answer is found, Lume can preserve your question and send it directly to the team.",
    },
  ],
};

const CATEGORIES = Object.keys(FAQ_DATA);

export default function FAQSection() {
  const [activeCategory, setActiveCategory] =
    useState("Getting Started");

  const [openIndex, setOpenIndex] = useState(2);

  const faqs = FAQ_DATA[activeCategory];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    // Keep first/initial FAQ closed when changing category
    setOpenIndex(-1);
  };

  const handleFAQClick = (index) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-180px]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-purple-950/30
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[350px]
          w-[500px]
          -translate-x-1/2
          bg-gradient-to-b
          from-purple-950/20
          to-transparent
          blur-[80px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1100px]
          px-5
          py-16
          sm:px-8
          md:py-20
          lg:py-16
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col items-center text-center">
          {/* FAQ PILL */}

          <span
            className="
              inline-flex
              rounded-full
              border
              border-white/50
              px-5
              py-1.5
              text-[9px]
              font-medium
              tracking-wide
              text-white
            "
          >
            FAQ
          </span>

          {/* TITLE */}

          <h2
            className="
              mt-5
              text-[clamp(38px,4vw,58px)]
              font-medium
              leading-[0.95]
              tracking-[-0.045em]
            "
          >
            Questions?
            <br />
            We've got answers.
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              max-w-[520px]
              text-[11px]
              leading-[1.55]
              text-white/45
            "
          >
            Everything you need to know about Lume, the
            Lume Card, and how physical friction, smarter
            boundaries, and intentional habits can help you
            take back control of your attention.
          </p>
        </div>

        {/* =====================================================
            CATEGORY TABS
        ====================================================== */}

        <div
          className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
            md:gap-5
          "
        >
          {CATEGORIES.map((category) => {
            const active =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  handleCategoryChange(category)
                }
                className={`
                  rounded-full
                  px-4
                  py-2.5
                  text-[10px]
                  transition-all
                  duration-300
                  md:px-5
                  ${
                    active
                      ? `
                        bg-white
                        text-black
                        shadow-[0_8px_25px_rgba(255,255,255,0.08)]
                      `
                      : `
                        bg-transparent
                        text-white/40
                        hover:text-white/70
                      `
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* =====================================================
            FAQ LIST
        ====================================================== */}

        <div className="mx-auto mt-9 max-w-[900px]">
          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={isOpen}
                  onClick={() =>
                    handleFAQClick(index)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   FAQ ITEM
============================================================ */

function FAQItem({
  faq,
  isOpen,
  onClick,
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-[7px]
        border
        transition-all
        duration-300
        ${
          isOpen
            ? "border-purple-500/20 bg-[#170027]"
            : "border-transparent bg-[#13001f]"
        }
      `}
    >
      {/* ==================================================
          QUESTION
      ================================================== */}

      <button
        type="button"
        onClick={onClick}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-5
          px-4
          py-4
          text-left
          md:px-5
          md:py-4
        "
      >
        <span
          className="
            text-[12px]
            font-normal
            leading-relaxed
            text-white
            md:text-[13px]
          "
        >
          {faq.question}
        </span>

        {/* ==================================================
            PLUS / CLOSE ICON
        ================================================== */}

        <span
          className={`
            relative
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            text-white
            transition-transform
            duration-300
            ${
              isOpen
                ? "rotate-0"
                : "rotate-0"
            }
          `}
        >
          {/* Horizontal line */}

          <span
            className="
              absolute
              h-px
              w-2.5
              bg-white
            "
          />

          {/* Vertical line */}

          <span
            className={`
              absolute
              h-2.5
              w-px
              bg-white
              transition-transform
              duration-300
              ${
                isOpen
                  ? "scale-y-0"
                  : "scale-y-100"
              }
            `}
          />
        </span>
      </button>

      {/* ==================================================
          ANSWER
      ================================================== */}

      <div
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-300
          ease-out
          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              px-4
              pb-4
              pr-12
              text-[9px]
              leading-[1.6]
              text-white/40
              md:px-5
              md:pb-5
            "
          >
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
