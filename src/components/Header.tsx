import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Kids", href: "/shop/kids" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Best Sellers", href: "/shop?filter=best" },
  { label: "Trending 🔥", href: "/shop?filter=trending" },
  { label: "Limited Edition", href: "/shop?filter=limited" },
  { label: "Sale", href: "/shop?filter=sale" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs text-center py-2 tracking-widest uppercase font-body">
        Free shipping on orders above ₹1,999 — Limited time only
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="section-padding flex items-center justify-between h-16">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading text-3xl tracking-[0.2em] text-foreground">
            IDENTITY
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="nav-link text-xs">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-foreground/70 hover:text-foreground transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="hidden sm:block text-foreground/70 hover:text-foreground transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/account" className="hidden sm:block text-foreground/70 hover:text-foreground transition-colors">
              <User size={20} />
            </Link>
            <button onClick={openCart} className="relative text-foreground/70 hover:text-foreground transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-body font-semibold w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="section-padding py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Header;
