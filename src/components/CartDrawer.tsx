import { useCart, CartItem } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-foreground/30" onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-background animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-2xl tracking-wider">Your Bag ({items.length})</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body mb-4">Your bag is empty</p>
              <button onClick={closeCart} className="text-sm uppercase tracking-widest underline font-body">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={`${item.product.id}-${item.size}`} item={item} onRemove={removeItem} onUpdate={updateQuantity} />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body font-medium">Subtotal</span>
              <span className="font-heading text-xl">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground font-body">Shipping & taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="block w-full bg-primary text-primary-foreground text-center py-4 text-sm uppercase tracking-widest font-body font-semibold hover:opacity-90 transition-opacity"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const CartItemRow = ({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: (id: string, size: string) => void;
  onUpdate: (id: string, size: string, qty: number) => void;
}) => (
  <div className="flex gap-4">
    <div className="w-24 h-28 bg-secondary flex-shrink-0 overflow-hidden">
      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <p className="font-body font-medium text-sm">{item.product.name}</p>
        <p className="text-xs text-muted-foreground font-body mt-1">
          Size: {item.size} · {item.color}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 border border-border">
          <button
            onClick={() => onUpdate(item.product.id, item.size, item.quantity - 1)}
            className="p-2 hover:bg-secondary transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-body w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdate(item.product.id, item.size, item.quantity + 1)}
            className="p-2 hover:bg-secondary transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-sm font-body font-medium">{formatPrice(item.product.price * item.quantity)}</span>
      </div>
    </div>
    <button onClick={() => onRemove(item.product.id, item.size)} className="self-start text-muted-foreground hover:text-foreground" aria-label="Remove item">
      <X size={16} />
    </button>
  </div>
);

export default CartDrawer;
