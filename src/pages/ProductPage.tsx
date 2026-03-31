import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products, formatPrice } from "@/data/products";
import { Heart, Star, Ruler } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  if (!product) {
    return (
      <div className="section-padding py-40 text-center">
        <h1 className="font-heading text-4xl mb-4">Product not found</h1>
        <Link to="/shop" className="text-sm uppercase tracking-widest underline font-body">Back to shop</Link>
      </div>
    );
  }

  const images = [product.image, product.hoverImage];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    addItem(product, size, color);
  };

  return (
    <main>
      <div className="section-padding py-10">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-xs font-body text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={800}
                height={1024}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[3/4] bg-secondary overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-8">
            <div className="flex items-center gap-2 mb-2">
              {product.isNew && <span className="text-[10px] uppercase tracking-widest font-body bg-secondary px-2 py-1">New</span>}
              {product.isLimited && <span className="text-[10px] uppercase tracking-widest font-body bg-secondary px-2 py-1">Limited Edition</span>}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl tracking-wider mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-foreground" />
                ))}
              </div>
              <span className="text-xs font-body text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="font-heading text-3xl">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="text-xs font-body text-sale font-semibold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {product.stock && product.stock <= 5 && (
              <p className="text-sm font-body text-sale mb-4">Only {product.stock} left in stock 👀</p>
            )}

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Color */}
            <div className="mb-6">
              <h4 className="font-body text-xs uppercase tracking-widest mb-3">Color — {selectedColor || product.colors[0]}</h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest font-body border transition-colors ${
                      (selectedColor || product.colors[0]) === color
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-body text-xs uppercase tracking-widest">Size — {selectedSize || product.sizes[0]}</h4>
                <button
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                  className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Ruler size={12} /> Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs uppercase tracking-widest font-body border transition-colors ${
                      (selectedSize || product.sizes[0]) === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size guide popup */}
            {sizeGuideOpen && (
              <div className="border border-border p-6 mb-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-body text-xs uppercase tracking-widest">Size Guide (inches)</h4>
                  <button onClick={() => setSizeGuideOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
                </div>
                <table className="w-full text-xs font-body">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 text-left">Size</th><th className="py-2">Chest</th><th className="py-2">Length</th><th className="py-2">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[["S","36","27","16"],["M","38","28","17"],["L","40","29","18"],["XL","42","30","19"]].map(([s,c,l,sh]) => (
                      <tr key={s} className="border-b border-border/50"><td className="py-2">{s}</td><td className="py-2 text-center">{c}</td><td className="py-2 text-center">{l}</td><td className="py-2 text-center">{sh}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Details */}
            <div className="mb-8 space-y-2">
              <p className="font-body text-xs text-muted-foreground"><span className="text-foreground">Fit:</span> {product.fit}</p>
              <p className="font-body text-xs text-muted-foreground"><span className="text-foreground">Fabric:</span> {product.fabric === "dry-fit" ? "Dry-Fit Performance" : "Premium Cotton"}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-4 text-sm uppercase tracking-widest font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 border border-border flex items-center justify-center transition-colors ${wishlisted ? "bg-foreground text-background" : "hover:border-foreground"}`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <p className="font-body text-xs text-muted-foreground">Free shipping on orders above ₹1,999</p>
          </div>
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="section-padding py-16 border-t border-border">
          <h2 className="font-heading text-4xl tracking-wider mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;
