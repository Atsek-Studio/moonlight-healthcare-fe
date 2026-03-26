import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useServiceById, useAllServices } from "../hooks/useServices";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function MaterialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`}>
      {name}
    </span>
  );
}

export default function ServiceDetail() {
  const { id } = useParams();
  const service = useServiceById(id ?? "");
  const allServices = useAllServices();
  const displayService = service ?? allServices[0];
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!displayService) return null;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-204.75 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={displayService.heroImage ?? displayService.image}
            alt={displayService.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-primary/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-primary-fixed font-label tracking-widest uppercase mb-4 block text-sm">
              {t("serviceDetail.badge")}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">
              {displayService.title} <br />
              {displayService.subtitle && (
                <span className="text-3xl md:text-4xl font-light italic opacity-90">
                  {displayService.subtitle}
                </span>
              )}
            </h1>
            <p className="text-lg text-blue-50 max-w-lg mb-8 font-body leading-relaxed">
              {displayService.longDescription ?? displayService.description}
            </p>
            <div className="flex gap-4">
              <Link
                to="/booking"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-fixed transition-colors"
              >
                {t("serviceDetail.bookNow")}
              </Link>
              <button className="border border-white/30 text-white backdrop-blur-sm px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                {t("serviceDetail.learnMore")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Asymmetric Bento Grid */}
      {displayService.benefits && displayService.benefits.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16">
              <h2 className="font-headline text-4xl text-primary mb-4">
                {t("serviceDetail.benefitsTitle")}
              </h2>
              <p className="text-on-surface-variant font-body">
                {t("serviceDetail.benefitsSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {displayService.benefits[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-4 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between"
                >
                  <div>
                    <MaterialIcon
                      name={displayService.benefits[0].icon}
                      className="text-primary text-4xl mb-6"
                    />
                    <h3 className="font-headline text-2xl text-primary mb-3">
                      {displayService.benefits[0].title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      {displayService.benefits[0].description}
                    </p>
                  </div>
                </motion.div>
              )}
              {displayService.benefits[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-8 bg-primary-container text-on-primary-container p-8 rounded-xl flex items-center relative overflow-hidden"
                >
                  <div className="relative z-10 max-w-md">
                    <MaterialIcon
                      name={displayService.benefits[1].icon}
                      className="text-4xl mb-6"
                    />
                    <h3 className="font-headline text-2xl mb-3">
                      {displayService.benefits[1].title}
                    </h3>
                    <p className="opacity-90 leading-relaxed">
                      {displayService.benefits[1].description}
                    </p>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center">
                    <MaterialIcon name="acupuncture" className="text-[12rem]" />
                  </div>
                </motion.div>
              )}
              {displayService.benefits[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-7 bg-secondary-container p-8 rounded-xl"
                >
                  <MaterialIcon
                    name={displayService.benefits[2].icon}
                    className="text-on-secondary-fixed text-4xl mb-6"
                  />
                  <h3 className="font-headline text-2xl text-on-secondary-fixed mb-3">
                    {displayService.benefits[2].title}
                  </h3>
                  <p className="text-on-secondary-fixed-variant leading-relaxed">
                    {displayService.benefits[2].description}
                  </p>
                </motion.div>
              )}
              {displayService.benefits[3] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-5 bg-surface-container-low p-8 rounded-xl flex flex-col justify-center border border-outline-variant/10"
                >
                  <h3 className="font-headline text-2xl text-primary mb-3">
                    {displayService.benefits[3].title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {displayService.benefits[3].description}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Treatment Process */}
      {displayService.processSteps &&
        displayService.processSteps.length > 0 && (
          <section className="py-24 bg-surface-container-low">
            <div className="max-w-7xl mx-auto px-8">
              <div className="text-center mb-20">
                <h2 className="font-headline text-4xl text-primary mb-4">
                  {t("serviceDetail.processTitle")}
                </h2>
                <div className="h-1 w-20 bg-primary mx-auto opacity-20" />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-12 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-outline-variant/30" />

                {displayService.processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex-1 text-center group"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-outline-variant/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative z-10">
                      <span className="font-headline text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="font-headline text-xl text-primary mb-3">
                      {step.title}
                    </h4>
                    <p className="text-on-surface-variant font-body px-4 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Specialist Highlight */}
      {displayService.specialist && (
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center shadow-sm"
            >
              <div className="w-full md:w-1/2 h-96 md:h-125">
                <img
                  src={displayService.specialist.image}
                  alt={displayService.specialist.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 p-12">
                <span className="text-primary font-label font-bold tracking-widest uppercase text-xs mb-2 block">
                  {t("serviceDetail.specialistBadge")}
                </span>
                <h2 className="font-headline text-4xl text-primary mb-4">
                  {displayService.specialist.name}
                </h2>
                <p className="text-on-surface-variant italic mb-6">
                  {displayService.specialist.role}
                </p>
                <p className="text-on-surface mb-8 leading-relaxed">
                  "{displayService.specialist.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed flex items-center justify-center text-[10px] font-bold">
                    {displayService.specialist.experience}
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {t("serviceDetail.clinicalExperience")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ/Safety */}
      {displayService.faqs && displayService.faqs.length > 0 && (
        <section className="py-24 bg-surface-container-high/30">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="font-headline text-3xl text-primary text-center mb-12">
              {t("serviceDetail.faqTitle")}
            </h2>
            <div className="space-y-4">
              {displayService.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg border border-outline-variant/10"
                >
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-headline text-lg text-primary">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-on-surface-variant transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 text-on-surface-variant leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-linear-to-br from-primary to-primary-container rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-fixed rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-headline text-4xl md:text-5xl mb-6">
                {t("serviceDetail.ctaTitle")}
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                {t("serviceDetail.ctaBody")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
                  className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-black/10"
                >
                  {t("serviceDetail.ctaBookNow")}
                </Link>
                <Link
                  to="/about#contact"
                  className="bg-primary-container/40 border border-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  {t("serviceDetail.ctaCall")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
