"use client";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <h3 className="text-4xl font-serif italic text-white mb-8 leading-none">
              {locale === "ar" ? "ماحي فارس" : "Mahi Fares"}
            </h3>
            <p className="text-white/40 max-w-sm mb-10 leading-relaxed font-light text-lg">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/213793704284"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group shadow-lg hover:shadow-gold/20"
                aria-label="WhatsApp"
              >
                <FaWhatsapp
                  size={20}
                  className="text-white/60 group-hover:text-primary transition-colors"
                />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12">
              {t("footer.navigation")}
            </h4>
            <ul className="flex flex-col gap-5 text-white/60 font-medium">
              <li>
                <a
                  href="#home"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12">
              {t("footer.contact")}
            </h4>
            <ul className="flex flex-col gap-8 text-white/60">
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {t("footer.phone")}
                </span>
                <span
                  className={`text-xl font-serif italic text-white ${dir === "rtl" ? "text-right" : "text-left"}`}
                  dir="ltr"
                >
                  0793704284
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {t("footer.whatsapp")}
                </span>
                <a
                  href="https://wa.me/213793704284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xl font-serif italic text-white hover:text-gold transition-colors ${dir === "rtl" ? "text-right" : "text-left"}`}
                  dir="ltr"
                >
                  0793704284
                </a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {t("footer.location")}
                </span>
                <span className="text-xl font-serif italic text-white">
                  {t("contact.location_value")}
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {t("footer.email")}
                </span>
                <span className="text-xl font-serif italic text-white">
                  mahifares2@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-[0.2em]">
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://shadowcompany.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/20 hover:text-white transition-colors group"
            >
              <Image
                src="/logo.png"
                height={100}
                width={100}
                alt="Shadow Company Logo"
                className="size-8"
              />
              <span className="text-xs uppercase tracking-[0.2em]">
                Designed by Shadow Company
              </span>
            </a>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <p className="text-white/20 text-xs uppercase tracking-[0.2em]">
              {new Date().getFullYear()} Edition
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
