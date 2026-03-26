import { motion } from "motion/react";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAllPractitioners } from "../hooks/usePractitioners";

export default function Practitioners() {
  const practitioners = useAllPractitioners();
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">
            {t("practitioners.heroTitle1")} <br />
            <span className="italic font-normal">
              {t("practitioners.heroTitle2")}
            </span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-xl">
            {t("practitioners.heroSubtitle")}
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {practitioners.map((practitioner) => (
          <div
            key={practitioner.id}
            className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-80 lg:h-full overflow-hidden">
                <img
                  src={practitioner.avatar}
                  alt={practitioner.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
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
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
                  {t("practitioners.viewProfile")}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Join Us CTA */}
      <section className="max-w-7xl mx-auto px-8 mt-32">
        <div className="bg-slate-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl text-white mb-6">
              {t("practitioners.joinTitle")}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">
              {t("practitioners.joinBody")}
            </p>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-primary-fixed-dim transition-all">
              {t("practitioners.joinTeam")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
