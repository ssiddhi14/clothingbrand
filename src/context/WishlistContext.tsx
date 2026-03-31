import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  totalWishlistItems: number;
}

const STORAGE_KEY = "identity-wishlist";

const loadWishlist = (): WishlistItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(loadWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      return exists ? prev.filter((w) => w.id !== item.id) : [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.some((w) => w.id === id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist, totalWishlistItems: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
