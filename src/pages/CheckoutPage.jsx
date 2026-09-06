import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Banknote, PackageCheck, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const CHECKOUT_STORAGE_KEY = "lume-checkout-selection";
const LAST_ORDER_STORAGE_KEY = "lume-last-order";

function readSelection(locationState) {
  if (locationState?.product && locationState?.plan) return locationState;
  try {
    return JSON.parse(localStorage.getItem(CHECKOUT_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function numberFromPrice(value) {
  const numeric = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selection = useMemo(() => readSelection(location.state), [location.state]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!selection?.product || !selection?.plan) {
    return (
      <section className="min-h-screen bg-white px-5 py-28 text-[#20202a] sm:px-8">
        <div className="mx-auto max-w-[680px] rounded-[8px] border border-[#e6e6ec] p-8 text-center">
          <h1 className="text-[30px] font-semibold tracking-[-0.03em]">Checkout is empty</h1>
          <p className="mt-3 text-sm text-[#747481]">Choose a Lume plan first, then continue to checkout.</p>
          <Link to="/for-me" className="mt-6 inline-flex rounded-full bg-[#7c5cff] px-6 py-3 text-sm font-semibold text-white">
            Choose a plan
          </Link>
        </div>
      </section>
    );
  }

  const unitPrice = numberFromPrice(selection.plan.price);
  const subtotal = unitPrice * quantity;
  const shipping = 0;
  const total = subtotal + shipping;

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function requestJson(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || "Request failed");
    return body;
  }

  async function submitOrder(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const order = await requestJson("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: form,
          items: [
            {
              product: selection.product.id,
              name: `${selection.product.name} - ${selection.plan.title}`,
              price: unitPrice,
              quantity,
              image: selection.product.image,
            },
          ],
          shipping,
          paymentMethod: "cod",
        }),
      });

      const successState = {
        order,
        selection,
        total,
      };
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(successState));
      navigate("/order-success", {
        replace: true,
        state: successState,
      });
    } catch (caught) {
      setError(caught.message);
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-white px-5 pb-20 pt-28 text-[#20202a] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <Link to={selection.category === "For Family" ? "/for-family" : "/for-me"} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#777784]">
          <ArrowLeft size={15} /> Back to plan
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <form onSubmit={submitOrder} className="rounded-[8px] border border-[#e6e6ec] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e8cff]">Checkout</p>
            <h1 className="mt-3 text-[34px] font-semibold leading-none tracking-[-0.035em]">Complete your order</h1>
            <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-[#e7ddff] bg-[#fbf8ff] px-4 py-3 text-[13px] text-[#4a405f]">
              <Banknote size={18} className="mt-0.5 shrink-0 text-[#7c5cff]" />
              <span>
                <strong className="block text-[#25202f]">Cash on Delivery</strong>
                Pay when your Lume card reaches your address.
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(value) => setField("name", value)} required />
              <Field label="Phone" value={form.phone} onChange={(value) => setField("phone", value)} required />
              <Field label="Email" type="email" value={form.email} onChange={(value) => setField("email", value)} required />
              <Field label="Pincode" value={form.pincode} onChange={(value) => setField("pincode", value)} />
              <Field label="Address" value={form.address} onChange={(value) => setField("address", value)} required wide />
              <Field label="City" value={form.city} onChange={(value) => setField("city", value)} />
              <Field label="State" value={form.state} onChange={(value) => setField("state", value)} />
            </div>

            {error ? (
              <p className="mt-5 rounded-[8px] border border-[#ffd0cc] bg-[#fff6f5] px-4 py-3 text-[13px] text-[#b42318]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !unitPrice}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c5cff] px-6 py-4 text-[13px] font-semibold text-white transition hover:bg-[#6848dd] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PackageCheck size={17} />
              {submitting ? "Placing order..." : `Place COD order ${formatPrice(total)}`}
            </button>
          </form>

          <aside className="rounded-[8px] border border-[#e6e6ec] bg-[#fbfbfd] p-5">
            <h2 className="text-[16px] font-semibold">Order summary</h2>
            <div className="mt-5 flex gap-4">
              <img src={selection.product.image || "/Card.png"} alt="" className="h-20 w-24 rounded-[8px] object-cover" />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold">{selection.product.name}</p>
                <p className="mt-1 text-[12px] text-[#777784]">{selection.plan.title}</p>
                <p className="mt-2 text-[13px] font-semibold">{formatPrice(unitPrice)}</p>
              </div>
            </div>

            <label className="mt-6 block text-[12px] font-semibold text-[#555562]">
              Quantity
              <input
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                className="mt-2 h-11 w-full rounded-[8px] border border-[#dddde5] px-3 outline-none focus:border-[#7c5cff]"
              />
            </label>

            <div className="mt-6 space-y-3 border-t border-[#e6e6ec] pt-5 text-[13px] text-[#686874]">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow label="Shipping" value="Free" />
              <SummaryRow label="Total" value={formatPrice(total)} strong />
            </div>

            <div className="mt-6 grid gap-3 text-[12px] text-[#777784]">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#7c5cff]" /> No online payment needed</span>
              <span className="inline-flex items-center gap-2"><PackageCheck size={15} className="text-[#7c5cff]" /> Ships in 24 hours</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", value, onChange, required = false, wide = false }) {
  return (
    <label className={`block text-[12px] font-semibold text-[#555562] ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 h-12 w-full rounded-[8px] border border-[#dddde5] px-4 text-[14px] outline-none transition focus:border-[#7c5cff]"
      />
    </label>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-[16px] font-semibold text-[#20202a]" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
