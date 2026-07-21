import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
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
    <div data-page="faq" className="pt-10 md:pt-16 pb-20 min-h-screen bg-surface-container-low">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-headline text-5xl md:text-6xl text-primary leading-tight tracking-tight mb-8">
            {t("faq.title1")}{" "}
            <span className="font-normal">{t("faq.title2")}</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-10">
            {t("faq.subtitle")}
          </p>

          {/* Search Bar */}
          <label className="relative block max-w-xl">
            <span className="sr-only">{t("faq.searchPlaceholder")}</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t("faq.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full min-h-12 pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 outline-2 outline-transparent focus-visible:outline-focus"
            />
          </label>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 px-8 py-6">
                  <h2 className="min-w-0 font-headline text-lg text-primary">{faq.question}</h2>
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg"
                    aria-label={openId === faq.id ? "Collapse answer" : "Expand answer"}
                    aria-expanded={openId === faq.id}
                    aria-controls={`faq-${faq.id}`}
                  >
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      openId === faq.id && "rotate-180",
                    )}
                  />
                  </button>
                </div>

                  {openId === faq.id && (
                    <div id={`faq-${faq.id}`}>
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
                    </div>
                  )}
              </div>
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
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12 md:mt-20">
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
                className="action-secondary bg-surface-container-lowest"
              >
                {t("faq.contactNow")}
              </a>
              <a
                href="tel:0901234567"
                className="action-secondary action-on-dark"
              >
                {t("faq.callHotline")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
