import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item: typeof wishlist[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, size: "M", quantity: 1 });
    removeFromWishlist(item.id);
  };

  return (
    <main className="section-padding py-10 min-h-[60vh]">
      <h1 className="font-heading text-5xl md:text-6xl tracking-wider mb-10">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <Heart size={48} className="text-muted-foreground" />
          <p className="text-muted-foreground font-body text-lg">Your wishlist is empty</p>
          <Link
            to="/shop"
            className="mt-4 inline-block bg-foreground text-background px-8 py-3 text-sm uppercase tracking-widest font-body hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group border border-border">
              <Link to={`/product/${item.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Link>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-body text-sm font-medium">{item.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-2 text-xs uppercase tracking-widest font-body hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
