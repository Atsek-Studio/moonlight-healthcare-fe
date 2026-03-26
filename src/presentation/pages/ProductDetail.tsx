import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductById, useAllProducts } from "../hooks/useProducts";
import {
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = useProductById(id ?? "");
  const allProducts = useAllProducts();
  const displayProduct = product ?? allProducts[0];
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 md:mb-12 text-slate-500 font-label text-xs uppercase tracking-widest">
        <Link to="/" className="hover:text-primary transition-colors">
          {t("productDetail.home")}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-primary transition-colors">
          {t("productDetail.products")}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary font-semibold">
          {displayProduct.name}
        </span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
        {/* Left: Visual Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 grid grid-cols-6 gap-4"
        >
          <div className="col-span-6 overflow-hidden rounded-2xl bg-surface-container-low aspect-4/3 group">
            <img
              src={displayProduct.image}
              alt={displayProduct.name}
              className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="col-span-3 overflow-hidden rounded-2xl bg-surface-container-low aspect-square">
            <img
              src="https://images.unsplash.com/photo-1615485242211-739995650747?q=80&w=800&auto=format&fit=crop"
              alt="Natural ingredients"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="col-span-3 overflow-hidden rounded-2xl bg-surface-container-low aspect-square">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
              alt="Healing process"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Right: Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="mb-4">
            <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label text-[10px] uppercase tracking-widest rounded-full">
              {displayProduct.category}
            </span>
          </div>
          <h1 className="text-5xl font-headline text-primary leading-tight mb-2 tracking-tight">
            {displayProduct.name}
          </h1>
          {displayProduct.subtitle && (
            <p className="text-xl font-headline italic text-on-secondary-container mb-6">
              {displayProduct.subtitle}
            </p>
          )}

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-3xl font-bold text-primary">
              {displayProduct.price}
            </span>
            {displayProduct.oldPrice && (
              <span className="text-slate-400 line-through text-lg">
                {displayProduct.oldPrice}
              </span>
            )}
          </div>

          <div className="space-y-8 mb-12">
            <p className="text-slate-600 leading-relaxed text-lg">
              {displayProduct.description}
            </p>

            {/* Benefits List */}
            {displayProduct.benefits && (
              <div className="space-y-3">
                <h4 className="font-label text-xs uppercase tracking-widest text-slate-400 mb-4">
                  {t("productDetail.benefits")}
                </h4>
                {displayProduct.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Usage Section */}
            {displayProduct.usage && (
              <div className="p-6 bg-surface-container-low rounded-2xl border border-slate-100">
                <h4 className="font-label text-xs uppercase tracking-widest text-primary mb-3">
                  {t("productDetail.usage")}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {displayProduct.usage}
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-4">
            <button className="w-full py-5 bg-primary text-on-primary font-semibold rounded-xl flex justify-center items-center gap-3 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <ShoppingCart className="w-5 h-5" />
              {t("productDetail.addToCart")}
            </button>
            <button className="w-full py-4 bg-white text-primary border border-primary/20 font-medium rounded-xl hover:bg-surface-container-low transition-all">
              {t("productDetail.expertConsultation")}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs/Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-20 border-t border-slate-100">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center mb-6">
            <FlaskConical className="w-6 h-6 text-on-secondary-fixed" />
          </div>
          <h3 className="font-headline text-2xl text-primary">
            {t("productDetail.naturalIngredients")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {displayProduct.ingredients?.map((ing, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full border border-slate-100"
              >
                {ing}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("productDetail.ingredientsCommitment")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-on-secondary-fixed" />
          </div>
          <h3 className="font-headline text-2xl text-primary">
            {t("productDetail.qualityCert")}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("productDetail.qualityCertDesc")}
          </p>
          <ul className="text-xs text-slate-400 space-y-2">
            <li>• ISO 22000:2018 Certified</li>
            <li>• GMP Compliant Facility</li>
            <li>• Organic Certification</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-on-secondary-fixed" />
          </div>
          <h3 className="font-headline text-2xl text-primary">
            {t("productDetail.clinicalEfficacy")}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("productDetail.clinicalEfficacyDesc")}
          </p>
          <div className="pt-2">
            <span className="text-primary font-bold text-3xl">98%</span>
            <span className="text-slate-400 text-xs ml-2">
              {t("productDetail.satisfiedUsers")}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative h-125 rounded-4xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop"
          alt="Healthy lifestyle"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-center px-8">
          <div className="max-w-2xl text-white">
            <h2 className="font-headline text-4xl md:text-5xl mb-6 leading-tight">
              {t("productDetail.ctaTitle")}
            </h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              {t("productDetail.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                {t("productDetail.continueShopping")}
              </Link>
              <Link
                to="/about#contact"
                className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                {t("productDetail.contactConsultation")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
