import { motion } from "motion/react";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAllPractitioners } from "../hooks/usePractitioners";

export default function Practitioners() {
  const practitioners = useAllPractitioners();
  const { t } = useTranslation();

  return (
    <div data-page="practitioners" className="pt-10 md:pt-16 pb-20">
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">
            {t("practitioners.heroTitle1")} <br />
            <span className="font-normal">
              {t("practitioners.heroTitle2")}
            </span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-xl">
            {t("practitioners.heroSubtitle")}
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {practitioners.map((practitioner) => (
          <div
            key={practitioner.id}
            className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-slate-100 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-80 lg:h-full overflow-hidden">
                <img
                  src={practitioner.avatar}
                  alt={practitioner.name}
                  className="w-full h-full object-cover grayscale transition-[filter] duration-700"
                />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="text-xs font-label uppercase tracking-widest text-primary mb-2">
                  {practitioner.role}
                </span>
                <h3 className="font-headline text-3xl text-primary mb-6">
                  {practitioner.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {t("practitioners.bio")}
                </p>
                <div className="flex gap-4 mb-8">
                  <button type="button" aria-label={`LinkedIn — ${practitioner.name}`} className="min-h-11 min-w-11 rounded-lg bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button type="button" aria-label={`Email — ${practitioner.name}`} className="min-h-11 min-w-11 rounded-lg bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
                <button type="button" className="action-secondary">
                  {t("practitioners.viewProfile")}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Join Us CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-32">
        <div className="bg-primary-container rounded-3xl p-12 md:p-20 text-on-primary-container relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline text-4xl text-on-primary-container mb-6">
              {t("practitioners.joinTitle")}
            </h2>
            <p className="max-w-xl mb-10 opacity-80">
              {t("practitioners.joinBody")}
            </p>
            <button type="button" className="action-secondary bg-surface-container-lowest">
              {t("practitioners.joinTeam")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
