import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useSearchFAQs } from "../hooks/useFAQs";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const filteredFaqs = useSearchFAQs(searchTerm);
  const { t } = useTranslation();

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-surface-container-low">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-label uppercase tracking-widest text-primary font-bold mb-4 block">
            {t("faq.badge")}
          </span>
          <h1 className="font-headline text-5xl md:text-6xl text-primary leading-tight tracking-tight mb-8">
            {t("faq.title1")}{" "}
            <span className="italic font-normal">{t("faq.title2")}</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-10">
            {t("faq.subtitle")}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t("faq.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-8">
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-label text-primary/40 font-bold">
                      0{index + 1}
                    </span>
                    <h3 className="font-headline text-lg text-primary">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      openId === faq.id && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <div className="h-px w-full bg-slate-100 mb-6" />
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                          <span className="text-[10px] font-label uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">{t("faq.noResults")}</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-primary font-bold border-b border-primary pb-1"
              >
                {t("faq.clearSearch")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions? */}
      <section className="max-w-4xl mx-auto px-8 mt-20">
        <div className="bg-primary p-10 md:p-16 rounded-3xl text-on-primary text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="font-headline text-3xl mb-4">
              {t("faq.stillHaveQuestions")}
            </h2>
            <p className="opacity-80 max-w-xl mx-auto mb-10">
              {t("faq.stillHaveQuestionsDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about#contact"
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                {t("faq.contactNow")}
              </a>
              <a
                href="tel:0901234567"
                className="border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                {t("faq.callHotline")}
              </a>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
