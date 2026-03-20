"use client";
import Image from "next/image";
import { useLanguage } from "../LanguageContext";
const Footer = () => {
  const { lang, dir, t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <h3 className="text-4xl font-serif italic text-white mb-8 leading-none">
              {lang === "ar" ? "ماحي فارس" : "Mahi Fares"}
            </h3>
            <p className="text-white/40 max-w-sm mb-10 leading-relaxed font-light text-lg">
              {lang === "ar"
                ? "محامي معتمد لدى محكمة بوفاريك ومجلس قضاء البليدة. تمثيلكم امام المحاكم والمجالس القضائية وأيضا المحكمة العليا ومجلس الدولة. نلتزم بتقديم أرقى مستويات التمثيل القانوني لضمان حقوقكم وخدمة العدالة."
                : "Avocat agréé près le tribunal de Boufarik et la cour de Blida. Agréé à la Cour Suprême et Conseil d'État. Nous nous engageons à fournir le plus haut niveau de représentation juridique pour garantir vos droits et servir la justice."}
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors cursor-pointer group"
                >
                  <div className="w-4 h-4 bg-white/40 group-hover:bg-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12">
              {lang === "ar" ? "الوصول السريع" : "Navigation"}
            </h4>
            <ul className="flex flex-col gap-5 text-white/60 font-medium">
              <li>
                <a
                  href="#home"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gold transition-all duration-300"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12">
              {lang === "ar" ? "معلومات الاتصال" : "Contact"}
            </h4>
            <ul className="flex flex-col gap-8 text-white/60">
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {lang === "ar" ? "الهاتف" : "Tél"}
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
                  {lang === "ar" ? "الموقع" : "Localisation"}
                </span>
                <span className="text-xl font-serif italic text-white">
                  56 rue des freres rettal boufarik 09400
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/20">
                  {lang === "ar" ? "البريد" : "Email"}
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
            {t.footer.rights}
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
