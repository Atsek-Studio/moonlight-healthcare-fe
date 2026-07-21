import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  const navLinks = [
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.products"), path: "/products" },
    { name: t("nav.practitioners"), path: "/practitioners" },
    { name: t("nav.library"), path: "/library" },
    { name: t("nav.about"), path: "/about" },
    { name: t("footer.faq"), path: "/faq" },
  ];

  const toggleLanguage = () => {
    const language = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  const clinicLine =
    i18n.language === "vi"
      ? "Phòng khám Đông y · Thành phố Hồ Chí Minh"
      : "Traditional medicine clinic · Ho Chi Minh City";

  return (
    <header className="clinic-mast">
      <div className="page-shell clinic-mast__inner">
        <div className="clinic-mast__issue">
          <span>{clinicLine}</span>
          <button type="button" onClick={toggleLanguage} aria-label={i18n.language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}>
            {i18n.language === "vi" ? "EN" : "VI"}
          </button>
        </div>

        <div className="clinic-mast__brand-row">
          <Link to="/" className="clinic-wordmark" aria-label="Moon Healthcare home">
            <span className="clinic-seal" aria-hidden="true">M</span>
            <span>Moon Healthcare</span>
          </Link>
          <Link to="/booking" className="action-primary clinic-mast__booking">
            {t("nav.bookConsultation")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="clinic-mast__toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="site-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav id="site-navigation" aria-label="Primary navigation" className={cn("clinic-mast__nav", open && "is-open")}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} aria-current={location.pathname === link.path ? "page" : undefined}>
              {link.name}
            </Link>
          ))}
          <Link to="/booking" className="clinic-mast__mobile-booking">
            {t("nav.bookConsultation")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
