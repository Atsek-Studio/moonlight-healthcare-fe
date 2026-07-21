import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAllServices } from "../hooks/useServices";

export default function Services() {
  const services = useAllServices();
  const { t } = useTranslation();

  return (
    <div data-page="services" className="pt-10 md:pt-16 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">
            {t("services.heroTitle1")} <br />
            <span className="font-normal">
              {t("services.heroTitle2")}
            </span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            {t("services.heroSubtitle")}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 transition-colors"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary-container/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    {service.icon === "architecture" ? (
                      <Sparkles className="w-6 h-6" />
                    ) : (
                      <ShieldCheck className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-headline text-3xl text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{t("services.personalizedPlan")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{t("services.gacpCertified")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    to={`/service/${service.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold group/link"
                  >
                    {t("services.viewDetails")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link
                    to="/booking"
                    className="action-primary"
                  >
                    {t("services.bookConsultation")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary-container py-16 md:py-32 text-on-primary-container overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-tight">
                {t("services.whyChooseTitle")} <br />
                <span className="font-normal opacity-80">
                  {t("services.whyChooseSubtitle")}
                </span>
              </h2>
              <div className="space-y-8 md:space-y-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl border border-rule-2-ui shrink-0 flex items-center justify-center">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-headline text-2xl mb-2">
                      {t("services.immediateResults")}
                    </h4>
                    <p className="opacity-70 text-sm leading-relaxed">
                      {t("services.immediateResultsDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl border border-rule-2-ui shrink-0 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-headline text-2xl mb-2">
                      {t("services.absoluteSafety")}
                    </h4>
                    <p className="opacity-70 text-sm leading-relaxed">
                      {t("services.absoluteSafetyDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square border border-rule-2-ui p-12">
                <div className="w-full h-full border border-rule-2-ui p-12">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdH2IyPHdWR-basDHbKssUP_6Sbfr-M-2onECcZW34oQDZHIELfUODRBN9x_YbYcRFUrUzXgnHEp6SGhZOMGm2pP75TdTVUmim6f38t1dmnVirt_qE7s6paiaSkS6-CxpNvqO0YP-9zCm-Jq_DRza21s7aNXLFYRLbvMogTOAgpeZlCmmqhUTWd8n9GMlRfWSUh6kkubzoyzfWM5Z1nyzlQrhdAAhKzeVfFGibBYdDUXDTyM4fx2KCatz1DgToLmg9opg-Ykha3U"
                      alt="Logo"
                      className="w-32 h-auto opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl text-primary mb-8">
            {t("services.readyTitle")}
          </h2>
          <p className="text-secondary mb-12">{t("services.readyBody")}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/booking"
              className="action-primary"
            >
              {t("services.bookNow")}
            </Link>
            <Link
              to="/about#contact"
              className="action-secondary"
            >
              {t("services.contactConsultation")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
