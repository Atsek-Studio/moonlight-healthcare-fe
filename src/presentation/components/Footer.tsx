import { Link } from "react-router-dom";
import { Share2, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-1">
          <Link
            to="/"
            className="text-xl font-headline italic text-primary block mb-6"
          >
            Moon Healthcare
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h4 className="font-headline font-bold text-primary mb-6">
            {t("footer.quickLinks")}
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                to="/services"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.clinicalServices")}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.herbalProducts")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                to="/practitioners"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.doctorTeam")}
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.medicalLibrary")}
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-slate-500 hover:text-primary transition-colors text-sm"
              >
                {t("footer.faq")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-primary mb-6">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-primary" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>+84 (028) 1234 5678</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span>hello@moonhealthcare.vn</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-primary mb-6">
            {t("footer.language")}
          </h4>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => switchLanguage("vi")}
              className={`text-sm transition-colors ${i18n.language === "vi" ? "text-primary underline font-medium" : "text-slate-500 hover:text-primary"}`}
            >
              {t("footer.vietnamese")}
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`text-sm transition-colors ${i18n.language === "en" ? "text-primary underline font-medium" : "text-slate-500 hover:text-primary"}`}
            >
              {t("footer.english")}
            </button>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-primary hover:bg-primary-fixed-dim transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-primary hover:bg-primary-fixed-dim transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-400">{t("footer.copyright")}</span>
        <div className="flex gap-8">
          <Link
            to="/privacy"
            className="text-xs text-slate-400 hover:text-primary"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            to="/terms"
            className="text-xs text-slate-400 hover:text-primary"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
