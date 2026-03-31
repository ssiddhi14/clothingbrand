import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";
import categoryOversized from "@/assets/category-oversized.jpg";
import categoryStreetwear from "@/assets/category-streetwear.jpg";
import categoryMinimal from "@/assets/category-minimal.jpg";
import { products, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const trending = products.filter((p) => p.isTrending);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-secondary">
        <img
          src={heroModel}
          alt="Model wearing IDENTITY tee"
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-end section-padding pb-16 md:pb-24">
          <div className="max-w-xl animate-slide-up">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-background/70 mb-4">Spring/Summer 2026</p>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-background leading-[0.9] mb-6">
              Wear Your Identity
            </h1>
            <p className="font-body text-sm text-background/70 mb-8 max-w-md">
              Premium essentials crafted for those who define their own style. No logos, no noise — just you.
            </p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 text-xs uppercase tracking-widest font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
              <Link
                to="/shop?filter=new"
                className="inline-flex items-center gap-2 border border-background/40 text-background px-8 py-4 text-xs uppercase tracking-widest font-body hover:bg-background/10 transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Oversized", image: categoryOversized },
            { name: "Streetwear", image: categoryStreetwear },
            { name: "Minimal", image: categoryMinimal },
          ].map((cat) => (
            <Link key={cat.name} to="/shop" className="group relative aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover image-zoom"
                loading="lazy"
                width={800}
                height={512}
              />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-3xl text-background tracking-wider">{cat.name}</h3>
                <span className="font-body text-xs uppercase tracking-widest text-background/70 flex items-center gap-1 mt-1">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <ProductSection title="New Arrivals" products={newArrivals} link="/shop?filter=new" />

      {/* Best Sellers */}
      <ProductSection title="Best Sellers" products={bestSellers} link="/shop?filter=best" />

      {/* Full-width banner */}
      <section className="section-padding py-20">
        <div className="bg-primary text-primary-foreground text-center py-20 px-8">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/50 mb-4">Limited Drop</p>
          <h2 className="font-heading text-5xl md:text-7xl tracking-wider mb-4">Don't miss out</h2>
          <p className="font-body text-sm text-primary-foreground/60 max-w-md mx-auto mb-8">
            Exclusive limited-edition tees dropping this weekend. Once they're gone, they're gone.
          </p>
          <Link
            to="/shop?filter=limited"
            className="inline-flex items-center gap-2 border border-primary-foreground/40 px-8 py-4 text-xs uppercase tracking-widest font-body hover:bg-primary-foreground/10 transition-colors"
          >
            Shop Limited Edition <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Trending */}
      <ProductSection title="Trending 🔥" products={trending} link="/shop?filter=trending" />
    </main>
  );
};

const ProductSection = ({
  title,
  products: sectionProducts,
  link,
}: {
  title: string;
  products: typeof products;
  link: string;
}) => (
  <section className="section-padding py-16">
    <div className="flex items-end justify-between mb-10">
      <h2 className="font-heading text-4xl md:text-5xl tracking-wider">{title}</h2>
      <Link to={link} className="font-body text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
        View All <ArrowRight size={12} />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {sectionProducts.slice(0, 4).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default Index;
