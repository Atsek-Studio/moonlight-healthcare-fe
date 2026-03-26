import { motion } from "motion/react";
import {
  CheckCircle2,
  Heart,
  Award,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
              {t("about.badge")}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight">
              {t("about.heroTitle1")} <br />
              <span className="italic font-normal">
                {t("about.heroTitle2")}
              </span>
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              {t("about.heroBody")}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-headline text-primary mb-1">
                  10+
                </h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  {t("about.yearsExperience")}
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-headline text-primary mb-1">
                  5k+
                </h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  {t("about.trustedCustomers")}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwaHgD-q67c3QUX1peg4XAxX8XYs3r9qHEr2T-soFiLwZvB98YV4Qb2XyWLxqdQBVCG3oBMVELQBeY5KVS6Ldps8HZTBHK4qHEX98gSmRFsxt-tXsHexLBt_grBLMBJ3-wXOpKbhjKcsZ0_Y_-hZxxXtvHQ49dEX_QyyZeJIYBTaf3VUpb4pPaEH4Js4ljYCVk-lCXQgEOm2IAOjegX86aj65qgSgO4zHMxvA7pqhAhPwoV8dzl5Z649Ynd9GeWS01fr0-2OIIyz4"
                alt="Our clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <p className="text-primary font-headline italic text-xl">
                {t("about.quote")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-headline text-4xl text-primary mb-4">
              {t("about.coreValues")}
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              {t("about.coreValuesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-8">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">
                {t("about.dedication")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t("about.dedicationDesc")}
              </p>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-8">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">
                {t("about.quality")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t("about.qualityDesc")}
              </p>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-8">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">
                {t("about.community")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t("about.communityDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Deep Dive */}
      <section className="py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm12x6KLkUKU7qnWNisXy9bpurYzCtEUR3G218eIqovXOEbVzf-93CuRp4ZEQWEXOGOTKVELzxUNH_Cy5W6whTuaYH-GEIUV1XGHa2B9zuz7bvT55f9ZcgWu7s3AhDiz_Gi4suUy124JOKFDUdwGXeM-VlDf9HVmB7i2DSw9sStC7jAHN85ebskfcfo20UZ4tTMQ-RWGs7IaQdciBocSqX--FtcsX4x9zRfZt0TlpqX_eVKU621ry401jVyGG0vNs9J5uQg2Tch7A"
                alt="Philosophy"
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="font-headline text-4xl text-primary">
                {t("about.clinicalZen")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {t("about.clinicalZenBody")}
              </p>
              <ul className="space-y-4">
                {[
                  t("about.sterileSpace"),
                  t("about.gacpHerbs"),
                  t("about.evidenceBased"),
                  t("about.trainedAbroad"),
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-primary font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-surface-container-low py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-headline text-4xl text-primary mb-4">
              {t("about.contactTitle")}
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              {t("about.contactDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl text-primary mb-2">
                    {t("about.phone")}
                  </h3>
                  <p className="text-slate-600 text-sm">+84 (028) 1234 5678</p>
                  <p className="text-slate-600 text-sm">+84 909 123 456</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl text-primary mb-2">
                    {t("about.email")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    hello@moonhealthcare.vn
                  </p>
                  <p className="text-slate-600 text-sm">
                    support@moonhealthcare.vn
                  </p>
                </div>
              </div>

              <div className="bg-primary p-10 rounded-2xl text-on-primary shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6" />
                    <h3 className="font-headline text-2xl">
                      {t("about.workingHours")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-80">{t("about.monFri")}</span>
                      <span className="font-medium">08:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-80">{t("about.saturday")}</span>
                      <span className="font-medium">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">{t("about.sunday")}</span>
                      <span className="font-medium italic">
                        {t("about.holiday")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 md:p-16 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="font-headline text-3xl text-primary mb-8">
                  {t("about.sendMessage")}
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                        {t("about.fullName")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("about.namePlaceholder")}
                        className="w-full px-4 py-3 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                        {t("about.phoneNumber")}
                      </label>
                      <input
                        type="tel"
                        placeholder={t("about.phonePlaceholder")}
                        className="w-full px-4 py-3 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                      {t("about.email")}
                    </label>
                    <input
                      type="email"
                      placeholder={t("about.emailPlaceholder")}
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                      {t("about.topic")}
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                      <option>{t("about.topicTreatment")}</option>
                      <option>{t("about.topicAppointment")}</option>
                      <option>{t("about.topicCollaboration")}</option>
                      <option>{t("about.topicOther")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                      {t("about.message")}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t("about.messagePlaceholder")}
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full py-5 bg-primary text-on-primary font-bold rounded-xl flex justify-center items-center gap-3 hover:opacity-95 transition-all active:scale-95 shadow-lg">
                    <Send className="w-5 h-5" />
                    {t("about.sendRequest")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
        <div className="relative h-125 rounded-3xl overflow-hidden border border-slate-100 shadow-inner bg-slate-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl text-primary mb-2">
                {t("about.ourLocation")}
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                {t("footer.address")}
              </p>
              <button className="mt-6 text-primary font-semibold border-b border-primary pb-1">
                {t("about.openGoogleMaps")}
              </button>
            </div>
          </div>
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
