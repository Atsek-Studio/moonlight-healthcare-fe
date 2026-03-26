import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAllServices } from "../hooks/useServices";
import { useFeaturedProducts } from "../hooks/useProducts";

export default function Home() {
  const { t } = useTranslation();
  const services = useAllServices();
  const featuredProducts = useFeaturedProducts(4);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-200 flex items-center overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 z-10"
          >
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-label tracking-widest uppercase">
              {t("home.badge")}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-[1.1] mb-8 tracking-tight">
              {t("home.heroTitle1")} <br />
              <span className="italic font-normal">{t("home.heroTitle2")}</span>
            </h1>
            <p className="text-xl text-secondary max-w-lg mb-12 leading-relaxed">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-medium text-base hover:opacity-95 transition-all active:scale-95"
              >
                {t("home.discoverTreatments")}
              </Link>
              <Link
                to="/about"
                className="border border-primary/20 text-primary px-8 py-4 rounded-lg font-medium text-base hover:bg-primary/5 transition-all"
              >
                {t("home.learnMore")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden moon-glow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYfnJs-GeKTVaEecHlc4urPStxRxNZpOWgvu82kgQqYSAMeylgqJzJfF6Uu1NFoB3_uTvDdoUy87efKbKa-PBkntNnXXMnGVyLMdH1YYjF1AtsHe8uMbF699NKK3-dzPj-J06prIQWJUas0_Omy7ORrHsO4OLAL7ljg_9V3YUcWEM-ieJrRYo-rbS_hOrXtrUKfmJxd5Z-86nkcwuAgQfXmJuXOMxYO6lJsi5o1rEaLlU4yk0mTIHnrmx5VrKjvXQA1hazqHHLwSM"
                alt="Clinical Zen atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent"></div>
            </div>

            <div className="absolute -bottom-8 -left-8 clinical-glass p-6 rounded-xl border border-white/30 shadow-2xl max-w-60">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-primary fill-primary" />
                <span className="text-xs font-label font-bold text-primary uppercase tracking-tighter">
                  {t("home.holisticRecovery")}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-snug">
                {t("home.customerCount")}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <h2 className="font-headline text-4xl text-primary mb-6">
                {t("home.philosophyTitle")}
              </h2>
              <div className="w-20 h-1 bg-primary mb-10"></div>
              <p className="text-lg text-secondary leading-relaxed mb-8">
                {t("home.philosophyBody")}
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">
                      {t("home.mindBody")}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {t("home.mindBodyDesc")}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">
                      {t("home.personalized")}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {t("home.personalizedDesc")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="pt-12">
                <div className="bg-surface-container-lowest p-8 rounded-2xl mb-6 shadow-sm border border-slate-100">
                  <span className="material-symbols-outlined text-4xl text-primary mb-4">
                    history_edu
                  </span>
                  <h3 className="font-headline text-xl text-primary mb-3">
                    {t("home.heritage")}
                  </h3>
                  <p className="text-sm text-secondary">
                    {t("home.heritageDesc")}
                  </p>
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwaHgD-q67c3QUX1peg4XAxX8XYs3r9qHEr2T-soFiLwZvB98YV4Qb2XyWLxqdQBVCG3oBMVELQBeY5KVS6Ldps8HZTBHK4qHEX98gSmRFsxt-tXsHexLBt_grBLMBJ3-wXOpKbhjKcsZ0_Y_-hZxxXtvHQ49dEX_QyyZeJIYBTaf3VUpb4pPaEH4Js4ljYCVk-lCXQgEOm2IAOjegX86aj65qgSgO4zHMxvA7pqhAhPwoV8dzl5Z649Ynd9GeWS01fr0-2OIIyz4"
                  alt="Ancient manuscript"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm12x6KLkUKU7qnWNisXy9bpurYzCtEUR3G218eIqovXOEbVzf-93CuRp4ZEQWEXOGOTKVELzxUNH_Cy5W6whTuaYH-GEIUV1XGHa2B9zuz7bvT55f9ZcgWu7s3AhDiz_Gi4suUy124JOKFDUdwGXeM-VlDf9HVmB7i2DSw9sStC7jAHN85ebskfcfo20UZ4tTMQ-RWGs7IaQdciBocSqX--FtcsX4x9zRfZt0TlpqX_eVKU621ry401jVyGG0vNs9J5uQg2Tch7A"
                  alt="Modern lab"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="bg-primary p-8 rounded-2xl text-on-primary shadow-lg">
                  <span className="material-symbols-outlined text-4xl mb-4">
                    science
                  </span>
                  <h3 className="font-headline text-xl mb-3">
                    {t("home.clinicalPrecision")}
                  </h3>
                  <p className="text-sm opacity-80">
                    {t("home.clinicalPrecisionDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl text-primary mb-4">
              {t("home.clinicalServices")}
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              {t("home.clinicalServicesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest transition-all hover:shadow-xl border border-slate-100"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-10 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary">
                        {service.icon}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl text-primary mb-4">
                      {service.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-4 transition-all"
                    >
                      {t("home.serviceDetails")}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="h-64 lg:h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl text-primary mb-4">
                {t("home.featuredProducts")}
              </h2>
              <p className="text-secondary">{t("home.featuredProductsDesc")}</p>
            </div>
            <Link
              to="/products"
              className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
              {t("home.viewAllProducts")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-50 mb-6">
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
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-label uppercase tracking-widest text-slate-400">
                      {product.category}
                    </span>
                    <h3 className="font-headline text-xl text-primary group-hover:text-primary transition-colors">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-12 md:p-20 text-center">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -right-1/4 w-150 h-150 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-1/2 -left-1/4 w-150 h-150 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl text-on-primary mb-8 leading-tight">
                {t("home.ctaTitle")}
              </h2>
              <p className="text-on-primary/80 text-lg mb-12">
                {t("home.ctaBody")}
              </p>
              <Link
                to="/booking"
                className="inline-block bg-surface-container-lowest text-primary px-10 py-5 rounded-lg font-bold text-lg hover:bg-secondary-fixed transition-all shadow-xl active:scale-95"
              >
                {t("home.bookNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
