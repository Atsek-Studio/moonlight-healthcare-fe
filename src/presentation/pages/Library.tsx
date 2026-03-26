import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Filter, ArrowRight, Sparkles, Beaker } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAllProducts } from "../hooks/useProducts";

export default function Library() {
  const products = useAllProducts();
  const { t } = useTranslation();
  const categories = [
    t("library.allRemedies"),
    t("library.herbalTea"),
    t("library.tinctures"),
    t("library.naturalTherapy"),
  ];
  const featuredProduct = products[0];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-8">
      {/* Editorial Header */}
      <header className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">
            {t("library.heroTitle1")} <br />
            <span className="italic font-normal">
              {t("library.heroTitle2")}
            </span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-xl">
            {t("library.heroSubtitle")}
          </p>
        </motion.div>
      </header>

      {/* Filter Chips */}
      <section className="mb-12 flex flex-wrap gap-3 items-center">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              i === 0
                ? "bg-primary text-on-primary"
                : "bg-secondary-container text-on-secondary-fixed hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto hidden md:flex items-center gap-2 text-slate-400">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-label uppercase tracking-widest">
            {t("library.sort")}
          </span>
        </div>
      </section>

      {/* Featured Product: Bento Layout */}
      {featuredProduct && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden bg-surface-container-low group min-h-125 flex items-end">
            <div className="absolute inset-0 z-0">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent"></div>
            </div>
            <div className="relative z-10 p-12 text-on-primary">
              <span className="inline-block px-3 py-1 rounded bg-primary-fixed-dim text-on-primary-fixed text-[10px] font-label uppercase tracking-widest mb-4">
                {t("library.featuredProduct")}
              </span>
              <h2 className="font-headline text-4xl mb-4">
                {featuredProduct.name}
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-md">
                {featuredProduct.description}
              </p>
              <Link
                to={`/product/${featuredProduct.id}`}
                className="inline-flex bg-surface-container-lowest text-primary px-8 py-3 rounded-lg font-semibold items-center gap-2 group-hover:bg-primary group-hover:text-on-primary transition-all"
              >
                {t("library.viewDetails")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-surface-container-lowest p-10 rounded-xl flex-1 flex flex-col justify-center border border-slate-100 hover:border-primary/10 transition-all">
              <span className="text-primary text-xs font-label uppercase tracking-tighter mb-2">
                {t("library.ingredients")}
              </span>
              <h3 className="font-headline text-2xl mb-4">
                {t("library.pureOrigin")}
              </h3>
              <p className="text-secondary leading-relaxed mb-6">
                {t("library.pureOriginDesc")}
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <Beaker className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-primary p-10 rounded-xl text-on-primary">
              <h3 className="font-headline text-2xl mb-4">
                {t("library.memberPrivileges")}
              </h3>
              <p className="opacity-80 mb-6">
                {t("library.memberPrivilegesDesc")}
              </p>
              <Link
                to="/membership"
                className="text-sm font-label border-b border-on-primary/30 pb-1 hover:border-on-primary transition-all"
              >
                {t("library.learnMore")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {products.slice(1).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group cursor-pointer"
          >
            <div className="aspect-4/5 rounded-xl overflow-hidden bg-surface-container mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-headline text-xl text-primary">
                {product.name}
              </h4>
              <span className="text-primary font-medium">{product.price}</span>
            </div>
            <p className="text-sm text-secondary mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-label text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
