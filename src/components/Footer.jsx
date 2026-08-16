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
      <div className="mx-auto max-w-[1400px] px-8 py-12 lg:px-8">

        {/* =====================================================
            TOP FOOTER
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            md:grid-cols-2
            lg:grid-cols-[1.8fr_0.75fr_0.75fr_0.75fr_1fr]
            lg:gap-8
          "
        >

          {/* ==================================================
              BRAND
          ================================================== */}

          <div>
            {/* LOGO */}

            <img className="w-32 text-black" src="/black-logo.png" alt="" />

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-[260px]
                text-[15px]
                leading-[1.65]
                text-[#777784]
              "
            >
              Lorem ipsum dolor sit amet
              <br />
              consectetur adipiscing elit aliquam
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
              "Features",
              "Pricing",
              "Case studies",
              "Reviews",
              "Updates",
            ]}
          />

          {/* ==================================================
              COMPANY
          ================================================== */}

          <FooterColumn
            title="Company"
            links={[
              "About",
              "Contact us",
              "Careers",
              "Culture",
              "Blog",
            ]}
          />

          {/* ==================================================
              SUPPORT
          ================================================== */}

          <FooterColumn
            title="Support"
            links={[
              "Getting started",
              "Help center",
              "Server status",
              "Report a bug",
              "Chat support",
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
              Contacts us
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              {/* EMAIL */}

              <ContactItem
                icon={<Mail size={12} />}
                text={
                  <>
                    contact@company.com
                  </>
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
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* COPYRIGHT */}

          <p>
            Copyright © 2026 Lume
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
            <a
              href="#"
              className="
                text-[#7137ff]
                transition-colors
                hover:text-[#4f1dca]
              "
            >
              Privacy Policy
            </a>
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
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="
                text-[12px]
                text-[#777784]
                transition-colors
                duration-200
                hover:text-[#7137ff]
              "
            >
              {link}
            </a>
          </li>
        ))}
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