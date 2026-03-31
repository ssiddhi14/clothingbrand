import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const ShopPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter((p) => p.category === category);
    if (filter === "new") result = result.filter((p) => p.isNew);
    if (filter === "best") result = result.filter((p) => p.isBestSeller);
    if (filter === "trending") result = result.filter((p) => p.isTrending);
    if (filter === "limited") result = result.filter((p) => p.isLimited);
    if (filter === "sale") result = result.filter((p) => p.isSale);
    if (selectedSize) result = result.filter((p) => p.sizes.includes(selectedSize));
    if (selectedFit) result = result.filter((p) => p.fit === selectedFit);
    if (selectedFabric) result = result.filter((p) => p.fabric === selectedFabric);
    return result;
  }, [category, filter, selectedSize, selectedFit, selectedFabric]);

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : filter
    ? filter.charAt(0).toUpperCase() + filter.slice(1)
    : "All Products";

  const sizes = ["S", "M", "L", "XL"];
  const fits = ["oversized", "slim", "regular"];
  const fabrics = ["cotton", "dry-fit"];

  const hasActiveFilters = selectedSize || selectedFit || selectedFabric;

  return (
    <main className="section-padding py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="font-heading text-5xl md:text-6xl tracking-wider">{title}</h1>
          <p className="font-body text-sm text-muted-foreground mt-2">{filtered.length} products</p>
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Filters */}
      {filtersOpen && (
        <div className="border-t border-b border-border py-6 mb-10 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FilterGroup
              title="Size"
              options={sizes}
              selected={selectedSize}
              onSelect={(v) => setSelectedSize(v === selectedSize ? null : v)}
            />
            <FilterGroup
              title="Fit"
              options={fits}
              selected={selectedFit}
              onSelect={(v) => setSelectedFit(v === selectedFit ? null : v)}
            />
            <FilterGroup
              title="Fabric"
              options={fabrics}
              selected={selectedFabric}
              onSelect={(v) => setSelectedFabric(v === selectedFabric ? null : v)}
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => { setSelectedSize(null); setSelectedFit(null); setSelectedFabric(null); }}
              className="mt-6 flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground font-body"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-body">No products found. Try adjusting your filters.</p>
        </div>
      )}
    </main>
  );
};

const FilterGroup = ({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}) => (
  <div>
    <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-4 py-2 text-xs uppercase tracking-widest font-body border transition-colors ${
            selected === opt
              ? "border-foreground bg-foreground text-background"
              : "border-border text-foreground hover:border-foreground"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default ShopPage;
