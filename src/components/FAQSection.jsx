import { useState } from "react";

const FAQ_DATA = {
  "Getting Started": [
    {
      question: "What is Lume?",
      answer:
        "Lume combines smart software with a physical NFC card to help you block distractions, protect your focus, and build better digital habits.",
    },
    {
      question: "How does the Lume Card work?",
      answer:
        "When a distracting app is locked, you need to use your physical Lume Card to unlock it. This adds a small moment of friction before you return to the app.",
    },
    {
      question: "What happens when I don't have my Lume Card?",
      answer:
        "Locked apps remain protected until you use your Lume Card, depending on the blocking mode you've selected.",
    },
    {
      question: "Can I completely block distracting apps?",
      answer:
        "Yes. Lume allows you to create blocking rules for distracting applications and decide when they should remain unavailable.",
    },
    {
      question: "Can I set automatic focus schedules?",
      answer:
        "Yes. You can create schedules that automatically activate your focus settings during specific times of the day.",
    },
  ],

  "Lume Card": [
    {
      question: "What is the Lume Card?",
      answer:
        "The Lume Card is a physical NFC card that works together with the Lume app to create intentional friction before accessing distracting applications.",
    },
    {
      question: "How do I use my Lume Card?",
      answer:
        "Simply tap your Lume Card when you want to unlock an application protected by your focus settings.",
    },
    {
      question: "Can I use the card with multiple devices?",
      answer:
        "Your Lume Card can be configured with your Lume account and used with supported devices.",
    },
    {
      question: "What happens if I lose my card?",
      answer:
        "You can manage your card and account from the Lume application and follow the recovery process to protect your account.",
    },
  ],

  "Focus & Blocking": [
    {
      question: "Which apps can I block?",
      answer:
        "You can configure the applications that you find distracting and create focus rules around them.",
    },
    {
      question: "Can I create different blocking modes?",
      answer:
        "Yes. Lume can support different levels of blocking depending on how much friction you want before accessing distracting apps.",
    },
    {
      question: "Can I schedule focus sessions?",
      answer:
        "Yes. Automatic schedules allow you to plan focus periods ahead of time.",
    },
    {
      question: "Can I track my focus progress?",
      answer:
        "Lume provides insights into your focus sessions and usage patterns so you can understand how your habits change over time.",
    },
  ],

  Privacy: [
    {
      question: "How does Lume protect my privacy?",
      answer:
        "Lume is designed around intentional technology use while keeping your personal information protected.",
    },
    {
      question: "Does Lume collect my app usage?",
      answer:
        "Lume may use usage information required to provide focus and productivity features.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Security and responsible handling of user information are important parts of the Lume experience.",
    },
  ],

  Billing: [
    {
      question: "How much does Lume cost?",
      answer:
        "Pricing depends on the Lume plan you choose. Check the pricing section for the latest available plans.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes. You can manage your subscription according to the billing options available with your account.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Refund availability depends on the applicable purchase and subscription terms.",
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