import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const navLinks = [
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.products"), path: "/products" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.practitioners"), path: "/practitioners" },
    { name: t("nav.library"), path: "/library" },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdH2IyPHdWR-basDHbKssUP_6Sbfr-M-2onECcZW34oQDZHIELfUODRBN9x_YbYcRFUrUzXgnHEp6SGhZOMGm2pP75TdTVUmim6f38t1dmnVirt_qE7s6paiaSkS6-CxpNvqO0YP-9zCm-Jq_DRza21s7aNXLFYRLbvMogTOAgpeZlCmmqhUTWd8n9GMlRfWSUh6kkubzoyzfWM5Z1nyzlQrhdAAhKzeVfFGibBYdDUXDTyM4fx2KCatz1DgToLmg9opg-Ykha3U"
            alt="Moon Healthcare Logo"
            className="h-8 md:h-10 w-auto"
          />
          <span className="text-lg md:text-2xl font-headline italic text-primary">
            Moon Healthcare
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "text-primary border-b-2 border-primary/30 py-1"
                  : "text-slate-600 hover:text-primary",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="text-xs font-label text-slate-500 hover:text-primary transition-colors"
          >
            {i18n.language === "vi" ? "EN" : "VI"}
          </button>
          <Link
            to="/booking"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 active:scale-95 shadow-sm"
          >
            {t("nav.bookConsultation")}
          </Link>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-xs font-label text-slate-500 hover:text-primary transition-colors px-2 py-1"
          >
            {i18n.language === "vi" ? "EN" : "VI"}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobile}
              className={cn(
                "text-base font-medium py-3 px-4 rounded-lg transition-colors",
                location.pathname === link.path
                  ? "text-primary bg-primary/5"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={closeMobile}
            className="mt-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-medium text-center transition-all hover:opacity-90 active:scale-95 shadow-sm"
          >
            {t("nav.bookConsultation")}
          </Link>
        </div>
      )}
    </nav>
  );
}
