import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFilteredProducts,
  useProductCategories,
} from "../hooks/useProducts";

export default function Products() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useProductCategories();
  const filteredProducts = useFilteredProducts(activeCategory, searchQuery);

  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-label uppercase tracking-widest text-primary font-bold mb-4 block">
              {t("products.badge")}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight">
              {t("products.heroTitle1")} <br />
              <span className="italic font-normal">
                {t("products.heroTitle2")}
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-secondary leading-relaxed max-w-md"
          >
            {t("products.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("products.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 min-h-100">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    </div>
                    {product.oldPrice && (
                      <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {t("products.sale")}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-label uppercase tracking-widest text-slate-400">
                      {product.category}
                    </span>
                    <h3 className="font-headline text-xl text-primary group-hover:text-primary/80 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary">
                        {product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-headline text-primary mb-2">
              {t("products.noProductsTitle")}
            </h3>
            <p className="text-secondary max-w-xs">
              {t("products.noProductsBody")}
            </p>
            <button
              onClick={() => {
                setActiveCategory("Tất cả");
                setSearchQuery("");
              }}
              className="mt-6 text-primary font-label text-xs uppercase tracking-widest border-b border-primary pb-1"
            >
              {t("products.viewAll")}
            </button>
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-32">
        <div className="bg-surface-container-low rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="font-headline text-3xl text-primary mb-4">
              {t("products.consultTitle")}
            </h2>
            <p className="text-secondary">{t("products.consultBody")}</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input
              type="email"
              placeholder={t("products.emailPlaceholder")}
              className="grow md:w-64 px-6 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-primary transition-all"
            />
            <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">
              {t("products.send")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
