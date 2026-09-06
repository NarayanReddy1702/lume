import { CheckCircle2, Home, PackageCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const LAST_ORDER_STORAGE_KEY = "lume-last-order";

function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

function readLastOrder(locationState) {
  if (locationState?.order) return locationState;
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export default function OrderSuccessPage() {
  const location = useLocation();
  const state = readLastOrder(location.state);
  const order = state?.order;
  const total = state?.total || order?.total;

  return (
    <section className="min-h-screen bg-white px-5 py-28 text-[#20202a] sm:px-8">
      <div className="mx-auto max-w-[760px] rounded-[8px] border border-[#e6e6ec] bg-white p-8 text-center shadow-[0_18px_50px_rgba(20,20,30,0.05)]">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfff4] text-[#159947]">
          <CheckCircle2 size={34} />
        </span>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e8cff]">Order placed</p>
        <h1 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.04em]">Order successful</h1>
        <p className="mx-auto mt-4 max-w-[460px] text-sm leading-relaxed text-[#777784]">
          Thanks for ordering Lume. Your order has been created successfully and you can pay by cash on delivery.
        </p>

        <div className="mx-auto mt-8 grid max-w-[460px] gap-3 rounded-[8px] border border-[#eeeeef] bg-[#fbfbfd] p-5 text-left text-[13px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#777784]">Order number</span>
            <strong>{order?.orderNumber || "Confirmed"}</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#777784]">Amount to pay</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#777784]">Payment method</span>
            <strong>Cash on Delivery</strong>
          </div>
          <div className="flex items-center gap-2 border-t border-[#eeeeef] pt-3 text-[#777784]">
            <PackageCheck size={16} className="text-[#7c5cff]" />
            We will prepare your card for shipping.
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[#7c5cff] px-6 py-3 text-[13px] font-semibold text-white">
            <Home size={16} /> Go home
          </Link>
          <Link to="/for-me" className="inline-flex rounded-full border border-[#d9d9e2] px-6 py-3 text-[13px] font-semibold text-[#30303a]">
            Buy another card
          </Link>
        </div>
      </div>
    </section>
  );
}
