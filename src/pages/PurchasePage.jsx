import { useEffect, useMemo, useState } from "react";
import { Check, Send, X } from "lucide-react";
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

const rows = [
  ["Block distracting apps", true, true, true],
  ["Daily limits", true, true, true],
  ["Focus sessions", true, true, true],
  ["Easy to bypass wifi", true, true, false],
  ["Physical friction", false, false, true],
  ["NFC card required in strict mode", false, false, true],
  ["Strict focus mode", false, false, true],
  ["Prevent app deletion during session", false, false, true],
  ["Limited emergency exits", false, false, true],
  ["Habit system built into the app", false, false, true],
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
        <ProductHero options={productOptions} product={heroProduct} category={category} />
      ) : (
        <ProductDataState category={category} isLoading={isLoading} error={error} />
      )}
      <Testimonials />
      <Comparison />
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

function ProductDataState({ category, isLoading, error }) {
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
    <section className="px-5 pb-24 pt-32 sm:px-8 lg:px-10">
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

function ProductHero({ options, product, category }) {
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
    <section className="px-5 pb-24 pt-32 sm:px-8 lg:px-10">
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
      <div className="flex items-center gap-4">
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

        <span className="shrink-0 text-right">
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
        <h2 className="text-center text-[28px] font-semibold tracking-[-0.03em] text-[#3a3a44]">
          Choose what you want to compare with
        </h2>
        <p className="mt-2 text-center text-[11px] text-[#9b9ba5] sm:hidden">
          ← Swipe horizontally to view full comparison →
        </p>

        <div className="mt-6 overflow-x-auto rounded-[8px] border border-[#dfdfe5] bg-white">
          <div className="grid min-w-[760px] grid-cols-[1.3fr_1fr_1fr_1fr_1.8fr]">
            <HeaderCell align="left">
              <span className="block text-[9px] font-medium text-[#9d9da8]">
                Feature
              </span>
              <span className="mt-2 block max-w-[160px] text-[24px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#30303a]">
                See how Lume is different.
              </span>
              <span className="mt-2 block max-w-[150px] text-[10px] leading-relaxed text-[#9b9ba5]">
                Built for deep work. Designed to make distraction harder.
              </span>
            </HeaderCell>
            <HeaderCell>
              Screen Time /
              <br />
              Digital Wellbeing
              <span className="mt-1 block text-[10px] font-normal text-[#9b9ba5]">
                Built into your phone
              </span>
            </HeaderCell>
            <HeaderCell>Other Applications</HeaderCell>
            <HeaderCell highlight>
              <img
                src="/black-logo.png"
                alt="Lume"
                className="mx-auto mb-1 w-24"
              />
              <span className="text-[10px] font-normal text-[#777784]">
                Behavior system
              </span>
            </HeaderCell>
            <HeaderCell>Why it matters</HeaderCell>

            {rows.map((row) => (
              <ComparisonRow key={row[0]} row={row} />
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
      className={`flex min-h-[140px] flex-col justify-center border-b border-r border-[#dfdfe5] px-5 py-6 text-[13px] font-semibold text-[#4a4a55] last:border-r-0 ${
        highlight ? "bg-[#f2e9ff]" : "bg-white"
      } ${align === "left" ? "items-start text-left" : "items-center text-center"}`}
    >
      {children}
    </div>
  );
}

function ComparisonRow({ row }) {
  const [label, screenTime, apps, lume] = row;

  return (
    <>
      <BodyCell align="left">
        <span className="underline decoration-[#b9b9c1] underline-offset-2">
          {label}
        </span>
      </BodyCell>
      <BodyCell>
        <StatusIcon active={screenTime} />
      </BodyCell>
      <BodyCell>
        <StatusIcon active={apps} />
      </BodyCell>
      <BodyCell highlight>
        <StatusIcon active={lume} />
      </BodyCell>
      <BodyCell>
        <span className="text-[10px] text-[#9b9ba5]">Built into your phone</span>
      </BodyCell>
    </>
  );
}

function BodyCell({ children, highlight = false, align = "center" }) {
  return (
    <div
      className={`flex min-h-[54px] items-center border-b border-r border-[#dfdfe5] px-5 text-[11px] text-[#777784] last:border-r-0 ${
        highlight ? "bg-[#f2e9ff]" : "bg-white"
      } ${align === "left" ? "justify-start text-left" : "justify-center text-center"}`}
    >
      {children}
    </div>
  );
}

function StatusIcon({ active }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${
        active ? "bg-[#43d27b]" : "bg-[#ff493b]"
      }`}
    >
      {active ? <Check size={15} /> : <X size={15} />}
    </span>
  );
}
