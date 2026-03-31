import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group product-card-hover">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          {/* Main image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
            width={800}
            height={1024}
          />
          {/* Hover image */}
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
            width={800}
            height={1024}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1 font-body font-semibold">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-sale text-background text-[10px] uppercase tracking-widest px-2 py-1 font-body font-semibold">
                Sale
              </span>
            )}
            {product.isLimited && (
              <span className="bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1 font-body font-semibold">
                Limited
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.stock && product.stock <= 5 && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-background/90 text-foreground text-[10px] px-2 py-1 font-body">
                Only {product.stock} left 👀
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-start justify-between">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
          className="mt-1 text-foreground/40 hover:text-foreground transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-foreground" : ""} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
