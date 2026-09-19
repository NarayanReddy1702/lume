import { Fragment, useEffect, useMemo, useState } from "react";
import { Check, Info, Send, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://lume-backend-sy6r.onrender.com/api";
const CATEGORY_BY_AUDIENCE = {
  me: "For me",
  family: "For Family",
};
const CHECKOUT_STORAGE_KEY = "lume-checkout-selection";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const testimonials = [
  {
    name: "Sarah Smith",
    role: "UX Designer",
    handle: "@sarah.smith",
  },
  {
    name: "Aaron Patel",
    role: "Founder",
    handle: "@aaron.focus",
  },
  {
    name: "Mia Chen",
    role: "Student",
    handle: "@mia.chen",
  },
  {
    name: "Jon Bell",
    role: "Designer",
    handle: "@jon.bell",
  },
  {
    name: "Priya Rao",
    role: "Creator",
    handle: "@priya.rao",
  },
  {
    name: "David Kim",
    role: "Engineer",
    handle: "@david.kim",
  },
];

const comparisonRows = [
  {
    group: "Control",
    items: [
      {
        matter: "Blocks distracting apps",
        why: "Stops the biggest time leaks.",
        detail: "Choose the apps that pull you away. Lume keeps those distractions out of reach during focus time.",
      },
      {
        matter: "App limits and schedules",
        why: "Helps you set healthy boundaries.",
        detail: "Set daily limits or planned focus windows so your phone follows the rhythm you choose.",
      },
      {
        matter: "Strict focus mode",
        why: "Locks distractions so you can go deep.",
        detail: "When strict mode is active, Lume adds real friction before blocked apps can open again.",
      },
      {
        matter: "Hard to bypass",
        why: "The harder it is to break, the more it works.",
        detail: "Lume is designed around a physical action, making impulsive bypasses less automatic.",
      },
    ],
  },
  {
    group: "Friction",
    items: [
      {
        matter: "Requires physical action",
        why: "A physical step breaks autopilot.",
        detail: "The card creates a pause between impulse and action, which gives intention a chance to win.",
      },
      {
        matter: "NFC card trigger",
        why: "One tap starts. One tap ends.",
        detail: "A simple card tap makes starting and ending focus feel concrete without digging through settings.",
      },
      {
        matter: "Instant override protection",
        why: "Prevents impulsive 'just one minute' traps.",
        detail: "Removing one-tap exits keeps focus sessions from collapsing the moment boredom appears.",
      },
    ],
  },
  {
    group: "Behavior",
    items: [
      {
        matter: "Focus sessions",
        why: "Structure helps you go deeper.",
        detail: "Start sessions for study, work, reading, creating, or family time and keep distractions contained.",
      },
      {
        matter: "Focus history",
        why: "Track patterns over time.",
        detail: "See how your focus habits change instead of guessing what worked.",
      },
      {
        matter: "Focus score",
        why: "One number to measure real progress.",
        detail: "A simple progress signal makes consistency easier to understand and repeat.",
      },
      {
        matter: "Habit system and streaks",
        why: "Build consistency that lasts.",
        detail: "Streaks and habit feedback help focus become something you practice daily.",
      },
      {
        matter: "Insights and analytics",
        why: "Understand what's working.",
        detail: "Use your own behavior data to refine limits, schedules, and focus sessions.",
      },
    ],
  },
  {
    group: "Family",
    items: [
      {
        matter: "Parent controls",
        why: "Guide without taking away their phone.",
        detail: "Create boundaries that support better habits without constant arguments or monitoring.",
      },
      {
        matter: "Multiple profiles",
        why: "One account. Multiple kids.",
        detail: "Keep separate routines and limits for different family members.",
      },
    ],
  },
  {
    group: "Practical",
    items: [
      {
        matter: "Works on iOS",
        why: "Seamless experience.",
        detail: "Designed for the phones people already use every day.",
      },
      {
        matter: "Works on Android",
        why: "Seamless experience.",
        detail: "Use Lume across common Android devices without changing your routine.",
      },
      {
        matter: "One-time payment",
        why: "No recurring charges ever.",
        detail: "Pay once for the system instead of adding another monthly subscription.",
      },
      {
        matter: "No subscription",
        why: "Pay once. Use forever.",
        detail: "Lume is built to be owned, not rented.",
      },
    ],
  },
];

export default function PurchasePage({ audience = "me" }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const category = CATEGORY_BY_AUDIENCE[audience] || CATEGORY_BY_AUDIENCE.me;

  useEffect(() => {
    let alive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          category,
          status: "active",
        });
        const response = await fetch(`${API_URL}/products?${params}`);
        if (!response.ok) throw new Error("Plans unavailable");
        const data = await response.json();
        if (alive) setProducts(Array.isArray(data) ? data : []);
      } catch (requestError) {
        if (alive) {
          setProducts([]);
          setError(requestError.message || "Plans unavailable");
        }
      } finally {
        if (alive) setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      alive = false;
    };
  }, [category]);

  const heroProduct = useMemo(
    () => products.find((product) => product.featured) || products[0],
    [products],
  );
  const productOptions = useMemo(() => {
    if (!heroProduct) return [];
    if (Array.isArray(heroProduct.plans) && heroProduct.plans.length) {
      return heroProduct.plans.map(planToOption);
    }
    return [productToOption(heroProduct)];
  }, [heroProduct]);

  return (
    <div className="bg-white text-[#282832]">
      {heroProduct ? (
        <ProductHero
          options={productOptions}
          product={heroProduct}
          category={category}
          audience={audience}
        />
      ) : (
        <ProductDataState
          category={category}
          isLoading={isLoading}
          error={error}
          audience={audience}
        />
      )}
      <Testimonials />
      <Comparison />
    </div>
  );
}

function ProductSwitcher({ activeAudience }) {
  const navigate = useNavigate();

  const tabs = [
    { label: "For me", path: "/forme", key: "me" },
    { label: "For Family", path: "/for-family", key: "family" },
    { label: "Business", path: "/business", key: "business" },
  ];

  return (
    <div className="mx-auto mb-8 sm:mb-10 flex justify-center">
      <div className="flex max-w-full flex-wrap items-center justify-center rounded-[14px] border border-[#e5e5eb] bg-white p-1 sm:inline-flex sm:p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        {tabs.map((tab) => {
          const isActive = tab.key === activeAudience;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => navigate(tab.path)}
              className={`rounded-[10px] px-4 py-2 sm:px-7 sm:py-2.5 text-[12px] sm:text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#f4f0ff] text-[#7137ff] font-semibold"
                  : "text-[#3a3a46] hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function planToOption(plan, index) {
  return {
    id: `${plan.title || "plan"}-${index}`,
    title: plan.title,
    subtitle: plan.subtitle || "Lume plan",
    price: formatPrice(plan.price),
    original: plan.compareAtPrice ? formatPrice(plan.compareAtPrice) : "",
    badge: plan.badge || (plan.featured ? "Most people pick this" : ""),
    selected: Boolean(plan.featured),
  };
}

function productToOption(product) {
  return {
    id: product._id || product.slug || product.name,
    title: product.name,
    subtitle: product.description || `${product.category} plan`,
    price: "",
    original: "",
    badge: product.featured ? "Most people pick this" : "",
    selected: true,
  };
}

function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

function ProductDataState({ category, isLoading, error, audience }) {
  const title = isLoading
    ? "Loading product details..."
    : error
      ? "Product details are unavailable"
      : `No active ${category} product found`;
  const message = isLoading
    ? "Fetching the latest product, images, and attached plans from the backend."
    : error
      ? `Could not connect to the backend product API. ${error}`
      : "Create or activate this product in the admin panel to show it here.";

  return (
    <section className="px-5 pb-24 pt-28 sm:pt-32 sm:px-8 lg:px-10">
      <ProductSwitcher activeAudience={audience} />

      <div className="mx-auto max-w-[760px] rounded-[8px] border border-[#e9e9ed] bg-white p-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e8cff]">
          {category} plan
        </p>
        <h1 className="mt-3 text-[15px] font-semibold leading-tight text-[#17171e]">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-[460px] text-[13px] leading-relaxed text-[#767682]">
          {message}
        </p>
      </div>
    </section>
  );
}

function ProductHero({ options, product, category, audience }) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryImages = useMemo(() => {
    const productImages = (product?.images || [])
      .map((image) => image?.url)
      .filter(Boolean);
    return productImages.length
      ? productImages
      : ["/Card.png", "/CardBack.png", "/CardFront.png"];
  }, [product]);
  const title = product?.name || "Put the phone down.";
  const description = product?.description || "Lume is a small card that sits on your desk. Tap your phone to it and every app on your locked list goes quiet until your timer ends. Nothing to open, nothing to charge.";
  const defaultOptionIndex = Math.max(
    0,
    options.findIndex((option) => option.selected),
  );
  useEffect(() => {
    setSelectedIndex(defaultOptionIndex);
  }, [defaultOptionIndex, options]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [galleryImages]);

  function goToCheckout() {
    const selectedOption = options[selectedIndex] || options[0];
    const checkoutSelection = {
      category,
      product: {
        id: product?._id,
        name: product?.name,
        description: product?.description,
        image: galleryImages[0] || "",
      },
      plan: selectedOption,
    };
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutSelection));
    navigate("/checkout", { state: checkoutSelection });
  }

  return (
    <section className="px-5 pb-24 pt-28 sm:pt-32 sm:px-8 lg:px-10">
      <ProductSwitcher activeAudience={audience} />

      <div className="mx-auto grid max-w-[1120px] items-start gap-9 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div className="overflow-hidden rounded-[14px] bg-[#08070c] shadow-[0_22px_50px_rgba(20,16,35,0.12)]">
            <img
              src={galleryImages[activeImageIndex] || galleryImages[0]}
              alt={product?.name || "Lume focus card"}
              className="aspect-[1.62] w-full object-cover"
            />
          </div>

          <div className="mt-3 grid grid-cols-5 gap-3">
            {galleryImages.slice(0, 5).map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`overflow-hidden rounded-[7px] bg-[#8f8f95] ${
                  index === activeImageIndex
                    ? "ring-2 ring-[#7c5cff] ring-offset-2"
                    : ""
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 24,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.62,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="mx-auto w-full max-w-[430px] lg:mx-0"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e8cff]">
            {category} plan
          </p>
          <h1 className="mt-3 text-[32px] font-semibold leading-[1] tracking-[-0.035em] text-[#17171e] sm:text-[40px]">
            {title}
            <br />
            On purpose.
          </h1>
          <p className="mt-4 max-w-[390px] text-[13px] leading-relaxed text-[#767682]">
            {description}
          </p>

          <ul className="mt-5 space-y-2 text-[11px] leading-relaxed text-[#85858f]">
            {[
              "Your locked apps go quiet in under a second, every time.",
              "You build the list yourself. Anything left off it stays untouched.",
              "Six ready-made modes: study, deep work, family, workout, reading, create.",
              "If your phone can tap to pay, Lume works on it.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cff]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            {options.map((option, index) => (
              <PlanOption
                key={option.id || `${option.title}-${index}`}
                option={option}
                selected={index === selectedIndex}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToCheckout}
            className="mt-5 w-full rounded-full bg-[#7c5cff] px-6 py-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#6848dd]"
          >
            Get your card
          </button>

          <p className="mt-3 text-center text-[10px] text-[#a4a4ae]">
            In stock. Ships in 24 hours. Free returns.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {["A", "M", "K", "R"].map((letter) => (
                <span
                  key={letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#7c5cff] text-[10px] font-semibold text-white"
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#777784]">
              <strong className="text-[#23232c]">4.8/5</strong> from 1,200+
              verified buyers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PlanOption({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[8px] border p-4 text-left transition-colors ${
        selected
          ? "border-[#7c5cff] bg-[#f4efff]"
          : "border-[#e9e9ed] bg-white hover:border-[#cfc6ff]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-4 min-[420px]:flex-nowrap">
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#7c5cff] bg-[#7c5cff]"
              : "border-[#d8d8de]"
          }`}
        >
          {selected && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          {option.badge && (
            <span
              className={`mb-1 inline-flex rounded-full px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-white ${
                option.badgeTone === "green"
                  ? "bg-[#31bf70]"
                  : "bg-[#7c5cff]"
              }`}
            >
              {option.badge}
            </span>
          )}
          <span className="block text-[12px] font-semibold text-[#27272f]">
            {option.title}
          </span>
          <span className="mt-0.5 block text-[10px] text-[#85858f]">
            {option.subtitle}
          </span>
        </span>

        <span className="ml-9 shrink-0 text-left min-[420px]:ml-0 min-[420px]:text-right">
          <span className="block text-[12px] font-semibold text-[#27272f]">
            {option.price}
          </span>
          {option.original && (
            <span className="ml-1 text-[9px] text-[#a8a8b0] line-through">
              {option.original}
            </span>
          )}
          {option.save && (
            <span className="block text-[9px] font-semibold text-[#2cbb76]">
              {option.save}
            </span>
          )}
        </span>
      </div>
    </button>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#f4f4f5] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <div>
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-[#777784]">
              Testimonials
            </span>
            <h2 className="mt-4 max-w-[410px] text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#2b2b34] sm:text-[42px]">
              What are they saying about us?
            </h2>
          </div>
          <div className="md:justify-self-end">
            <p className="max-w-[280px] text-[12px] leading-relaxed text-[#666670]">
              People use Lume to make focus feel simple, visible, and easier to
              repeat.
            </p>
            <a
              href="#top"
              className="mt-5 inline-flex rounded-full bg-[#7c5cff] px-6 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#6848dd]"
            >
              Get Lume
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.05,
                ease: "easeOut",
              }}
              className="rounded-[8px] bg-white p-5 shadow-[0_14px_36px_rgba(20,20,28,0.04)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-[#e7e7eb]" />
                  <span>
                    <span className="block text-[12px] font-semibold text-[#30303a]">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#9999a3]">
                      {item.handle}
                    </span>
                  </span>
                </div>
                <span className="rounded-full bg-[#f4f4f6] px-3 py-1 text-[9px] text-[#666670]">
                  {item.role}
                </span>
              </div>
              <p className="mt-5 text-[12px] leading-relaxed text-[#777784]">
                Lume made it easier to start a focus session and stay with it.
                The card gives the habit a place to live.
              </p>
              <p className="mt-3 text-[12px] font-semibold text-[#54545f]">
                Vestibulum sed mauris a ex posuere luctus!
              </p>
              <div className="mt-6 flex items-center justify-between text-[10px] text-[#a2a2ab]">
                <span className="inline-flex items-center gap-1.5">
                  <Send size={12} />
                  Invoice2go
                </span>
                <span>Nov 20, 2024</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a39ff]">
          Why Lume
        </p>
        <h2 className="mx-auto mt-3 max-w-[620px] text-center text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#3a3a44] sm:text-[44px]">
          What matters when you protect your focus.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-[13px] leading-relaxed text-[#777784]">
          No gimmicks, no clutter. Just the parts that decide whether a focus
          system actually works in daily life.
        </p>
        <div className="mt-10 overflow-visible rounded-[8px] border border-[#dfdfe5] bg-white shadow-[0_14px_36px_rgba(20,20,28,0.04)]">
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(88px,0.72fr)_minmax(88px,0.72fr)_minmax(0,1.25fr)]">
            <HeaderCell align="left">What matters</HeaderCell>
            <HeaderCell>
              Built-in phone tools
              <span className="mt-1 block text-[10px] font-normal text-[#9b9ba5]">
                iPhone / Android
              </span>
            </HeaderCell>
            <HeaderCell highlight>
              <img
                src="/black-logo.png"
                alt="Lume"
                className="mx-auto mb-1 w-24"
              />
              <span className="text-[10px] font-normal text-[#777784]">
                Physical + digital focus system
              </span>
            </HeaderCell>
            <HeaderCell align="left">Why it matters</HeaderCell>

            {comparisonRows.map((section) => (
              <Fragment key={section.group}>
                <div className="col-span-4 border-b border-[#dfdfe5] bg-[#fbfbfd] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a39ff]">
                  {section.group}
                </div>

                {section.items.map((item) => (
                  <ComparisonMatterRow
                    key={`${section.group}-${item.matter}`}
                    item={item}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderCell({ children, highlight = false, align = "center" }) {
  return (
    <div
      className={`flex min-h-[96px] min-w-0 flex-col justify-center border-b border-r border-[#dfdfe5] px-3 py-5 text-[11px] font-semibold text-[#4a4a55] last:border-r-0 sm:px-5 sm:text-[12px] ${
        highlight ? "bg-[#f2e9ff]" : "bg-white"
      } ${align === "left" ? "items-start text-left" : "items-center text-center"}`}
    >
      {children}
    </div>
  );
}

function ComparisonMatterRow({ item }) {
  const builtIn = getBuiltInStatus(item.matter);
  const lume = getLumeStatus(item.matter);

  return (
    <>
      <BodyCell align="left">
        <span className="inline-flex items-center gap-2">
          <span>{item.matter}</span>
          <span className="group relative inline-flex">
            <Info
              size={13}
              strokeWidth={1.8}
              className="cursor-help text-[#8d8d97] transition group-hover:text-[#7c5cff]"
              aria-label={`${item.matter} details`}
            />
            <span className="pointer-events-none absolute left-1/2 top-6 z-20 w-[230px] -translate-x-1/2 rounded-[8px] border border-[#dfd7ff] bg-white px-3 py-2 text-[10px] leading-relaxed text-[#666670] opacity-0 shadow-[0_16px_40px_rgba(20,20,28,0.14)] transition group-hover:opacity-100">
              {item.detail}
            </span>
          </span>
        </span>
      </BodyCell>
      <BodyCell>
        <StatusIcon status={builtIn} />
      </BodyCell>
      <BodyCell highlight>
        <StatusIcon status={lume} />
      </BodyCell>
      <BodyCell align="left">
        <span className="text-[10px] leading-relaxed text-[#85858f]">
          {item.why}
        </span>
      </BodyCell>
    </>
  );
}

function BodyCell({ children, highlight = false, align = "center" }) {
  return (
    <div
      className={`flex min-h-[54px] min-w-0 items-center border-b border-r border-[#dfdfe5] px-3 text-[10px] text-[#777784] last:border-r-0 sm:px-5 sm:text-[11px] ${
        highlight ? "bg-[#f2e9ff]" : "bg-white"
      } ${align === "left" ? "justify-start text-left" : "justify-center text-center"}`}
    >
      {children}
    </div>
  );
}

function StatusIcon({ status }) {
  if (status === "partial" || status === "basic" || status === "free") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8e7] px-2 py-1 text-[9px] font-medium text-[#a06a00]">
        <span className="h-2 w-2 rounded-full border border-current" />
        {status === "free" ? "Free" : status === "basic" ? "Basic" : "Partial"}
      </span>
    );
  }

  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${
        status ? "bg-[#43d27b]" : "bg-[#ff493b]"
      }`}
    >
      {status ? <Check size={15} /> : <X size={15} />}
    </span>
  );
}

function getBuiltInStatus(matter) {
  const statusByMatter = {
    "Blocks distracting apps": true,
    "App limits and schedules": true,
    "Strict focus mode": "partial",
    "Hard to bypass": false,
    "Requires physical action": false,
    "NFC card trigger": false,
    "Instant override protection": false,
    "Focus sessions": "partial",
    "Focus history": "basic",
    "Focus score": false,
    "Habit system and streaks": false,
    "Insights and analytics": "basic",
    "Parent controls": false,
    "Multiple profiles": false,
    "Works on iOS": true,
    "Works on Android": true,
    "One-time payment": "free",
    "No subscription": "free",
  };

  return statusByMatter[matter] ?? false;
}

function getLumeStatus(matter) {
  const unavailable = new Set([
    "Instant override protection",
  ]);

  return !unavailable.has(matter);
}
