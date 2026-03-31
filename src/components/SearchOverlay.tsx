import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { formatPrice } from "@/data/products";

interface SearchOverlayProps {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const filtered = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[60] bg-background/98 animate-fade-in">
      <div className="section-padding pt-8">
        <div className="flex items-center justify-between mb-8">
          <span className="font-heading text-2xl tracking-wider">Search</span>
          <button onClick={onClose} aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b-2 border-foreground pb-3 mb-8">
          <Search size={20} className="text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-transparent text-lg font-body outline-none placeholder:text-muted-foreground"
          />
        </div>

        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={onClose}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm font-medium font-body">{p.name}</p>
                <p className="text-sm text-muted-foreground font-body">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        )}

        {query.length > 1 && filtered.length === 0 && (
          <p className="text-muted-foreground font-body">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
