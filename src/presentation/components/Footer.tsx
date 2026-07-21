import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const links = [
    [t("footer.clinicalServices"), "/services"],
    [t("footer.herbalProducts"), "/products"],
    [t("footer.doctorTeam"), "/practitioners"],
    [t("footer.medicalLibrary"), "/library"],
    [t("footer.faq"), "/faq"],
  ];

  const note = i18n.language === "vi"
    ? "Thông tin trên website nhằm mục đích tham khảo và không thay thế chẩn đoán trực tiếp từ người hành nghề y tế."
    : "Website information is educational and does not replace an in-person assessment by a qualified practitioner.";

  return (
    <footer className="clinic-footer">
      <div className="page-shell clinic-footer__inner">
        <div className="clinic-footer__mark">
          <span className="clinic-seal" aria-hidden="true">M</span>
          <Link to="/">Moon Healthcare</Link>
        </div>
        <p>{t("footer.tagline")}</p>
        <address>
          {t("footer.address")} · <a href="tel:+842812345678">+84 (028) 1234 5678</a> · <a href="mailto:hello@moonhealthcare.vn">hello@moonhealthcare.vn</a>
        </address>
        <nav aria-label="Footer navigation">
          {links.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </nav>
        <p className="clinic-footer__note">{note}</p>
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
