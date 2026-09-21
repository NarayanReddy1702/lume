import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#30303a]">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-12 lg:px-8">

        {/* =====================================================
            TOP FOOTER
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-8
            gap-y-10
            md:grid-cols-4
            lg:grid-cols-[1.8fr_0.75fr_0.75fr_0.75fr_1fr]
            lg:gap-8
          "
        >

          {/* ==================================================
              BRAND
          ================================================== */}

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            {/* LOGO */}

            <img className="w-32 text-black" src="/black-logo.png" alt="" />

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-[320px]
                text-[15px]
                leading-[1.65]
                text-[#777784]
              "
            >
              Lume pairs a physical NFC card with smart app controls to help
              you block distractions, protect deep work, and build calmer
              phone habits.
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-4 flex items-center gap-3">
              <SocialIcon>
                <Facebook size={20} fill="currentColor" />
              </SocialIcon>

              <SocialIcon>
                <span className="text-[20px] font-bold">
                  𝕏
                </span>
              </SocialIcon>

              <SocialIcon>
                <Instagram size={20} />
              </SocialIcon>

              <SocialIcon>
                <Linkedin
                  size={20}
                  fill="currentColor"
                />
              </SocialIcon>

              <SocialIcon>
                <Youtube
                  size={20}
                  fill="currentColor"
                />
              </SocialIcon>
            </div>
          </div>

          {/* ==================================================
              PRODUCT
          ================================================== */}

          <FooterColumn
            title="Product"
            links={[
              "Home",
              "Feature",
              "Benefits",
              "Blogs",
            ]}
          />

          {/* ==================================================
              COMPANY
          ================================================== */}

          <FooterColumn
            title="Company"
            links={[
              "Business",
              "For me",
              "For Family",
              "Pricing",
            ]}
          />

          {/* ==================================================
              SUPPORT
          ================================================== */}

          <FooterColumn
            title="Support"
            links={[
              "Getting started",
              "FAQ",
              "Contact",
              "Privacy Policy",
            ]}
          />

          {/* ==================================================
              CONTACT
          ================================================== */}

          <div>
            <h3
              className="
                text-[15px]
                font-semibold
                text-[#30303a]
              "
            >
              Contact us
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              {/* EMAIL */}

              <ContactItem
                icon={<Mail size={12} />}
                text={
                  <a
                    href="mailto:support@lumeapp.in"
                    className="hover:text-[#7137ff] transition-colors"
                  >
                    support@lumeapp.in
                  </a>
                }
              />

              {/* PHONE */}

              <ContactItem
                icon={<Phone size={12} />}
                text={
                  <>
                    (414) 687 - 5892
                  </>
                }
              />

              {/* LOCATION */}

              <ContactItem
                icon={<MapPin size={12} />}
                text={
                  <>
                    794 Mcallister St
                    <br />
                    San Francisco, 94102
                  </>
                }
              />

            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div className="mt-10 h-px w-full bg-[#eeeeef]" />

        {/* =====================================================
            BOTTOM FOOTER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            pt-4
            text-[12px]
            text-[#85858f]
            leading-relaxed
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* COPYRIGHT */}

          <p>
            Copyright © 2026 SARWANA NOVAFUTURA TECHWORK LLP. All rights reserved.
          </p>

          {/* LEGAL */}

          <p>
            All Rights Reserved |{" "}
            <a
              href="#"
              className="
                text-[#7137ff]
                transition-colors
                hover:text-[#4f1dca]
              "
            >
              Terms and Conditions
            </a>
            {" | "}
            <Link
              to="/privacy-policy"
              className="
                text-[#7137ff]
                transition-colors
                hover:text-[#4f1dca]
              "
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}


/* ============================================================
   FOOTER COLUMN
============================================================ */

function FooterColumn({ title, links }) {
  const getHref = (link) => {
    if (link === "Home") return "/";
    if (link === "Blogs") return "/blogs";
    if (link === "Contact") return "/contact";
    if (link === "Contact us") return "/contact";
    if (link === "Privacy Policy") return "/privacy-policy";
    if (link === "Feature") return "/#features";
    if (link === "Features") return "/#features";
    if (link === "Benefits") return "/#benefits";
    if (link === "Pricing") return "/forme";
    if (link === "Business") return "/business";
    if (link === "For me") return "/forme";
    if (link === "For Family") return "/for-family";
    if (link === "FAQ") return "/#faq";
    if (link === "Bulk orders") return "/#business";
    return null;
  };

  return (
    <div>
      <h3
        className="
          text-[15px]
          font-semibold
          text-[#30303a]
        "
      >
        {title}
      </h3>

      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => {
          const path = getHref(link);
          const linkClass = "text-[12px] text-[#777784] transition-colors duration-200 hover:text-[#7137ff]";

          return (
            <li key={link}>
              {path ? (
                path.startsWith("/") && !path.includes("#") ? (
                  <Link to={path} className={linkClass}>
                    {link}
                  </Link>
                ) : (
                  <a href={path} className={linkClass}>
                    {link}
                  </a>
                )
              ) : (
                <a
                  href="#"
                  className={linkClass}
                >
                  {link}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


/* ============================================================
   CONTACT ITEM
============================================================ */

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-2">
      <span className="  mt-[2px] shrink-0 text-[#30303a]">
        {icon}
      </span>

      <span
        className="
          text-[12px]
          leading-[1.5]
          text-[#777784]
        "
      >
        {text}
      </span>
    </div>
  );
}


/* ============================================================
   SOCIAL ICON
============================================================ */

function SocialIcon({ children }) {
  return (
    <a
      href="#"
      className="
        flex
        h-4
        w-4
        items-center
        justify-center
        text-[#7137ff]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:text-[#4f1dca]
      "
    >
      {children}
    </a>
  );
}
