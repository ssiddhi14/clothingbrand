import productBlackOversized from "@/assets/product-black-oversized.jpg";
import productWhiteFitted from "@/assets/product-white-fitted.jpg";
import productNavyModel from "@/assets/product-navy-model.jpg";
import productCropTop from "@/assets/product-crop-top.jpg";
import productGreyOversized from "@/assets/product-grey-oversized.jpg";
import productBeige from "@/assets/product-beige.jpg";
import productKids from "@/assets/product-kids.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: "men" | "women" | "kids";
  subcategory: "oversized" | "fitted" | "crop-top";
  fit: "oversized" | "slim" | "regular";
  fabric: "cotton" | "dry-fit";
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isLimited?: boolean;
  isSale?: boolean;
  stock?: number;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Oversized Tee",
    price: 2499,
    image: productBlackOversized,
    hoverImage: productGreyOversized,
    category: "men",
    subcategory: "oversized",
    fit: "oversized",
    fabric: "cotton",
    colors: ["Black", "Grey", "White"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isBestSeller: true,
    stock: 5,
    rating: 4.8,
    reviews: 234,
    description: "Premium heavyweight cotton oversized tee with dropped shoulders and a relaxed boxy fit. 240 GSM organic cotton.",
  },
  {
    id: "2",
    name: "Classic Fitted Tee",
    price: 1999,
    image: productWhiteFitted,
    hoverImage: productBeige,
    category: "men",
    subcategory: "fitted",
    fit: "slim",
    fabric: "cotton",
    colors: ["White", "Beige", "Black"],
    sizes: ["S", "M", "L", "XL"],
    isBestSeller: true,
    rating: 4.6,
    reviews: 189,
    description: "Clean-cut slim fit tee crafted from ultra-soft 180 GSM Supima cotton. Tailored for a modern silhouette.",
  },
  {
    id: "3",
    name: "Athletic Dry-Fit Tee",
    price: 2999,
    originalPrice: 3499,
    image: productNavyModel,
    hoverImage: productBlackOversized,
    category: "men",
    subcategory: "fitted",
    fit: "regular",
    fabric: "dry-fit",
    colors: ["Navy", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    isSale: true,
    rating: 4.7,
    reviews: 156,
    description: "Engineered moisture-wicking dry-fit tee for peak performance. Breathable mesh panels and 4-way stretch.",
  },
  {
    id: "4",
    name: "Minimal Crop Top",
    price: 1799,
    image: productCropTop,
    hoverImage: productWhiteFitted,
    category: "women",
    subcategory: "crop-top",
    fit: "regular",
    fabric: "cotton",
    colors: ["White", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isTrending: true,
    stock: 3,
    rating: 4.9,
    reviews: 312,
    description: "Effortlessly chic crop top in premium soft cotton. Perfect cropped length with a relaxed fit.",
  },
  {
    id: "5",
    name: "Street Oversized Tee",
    price: 2699,
    image: productGreyOversized,
    hoverImage: productBlackOversized,
    category: "men",
    subcategory: "oversized",
    fit: "oversized",
    fabric: "cotton",
    colors: ["Grey", "Charcoal", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    isLimited: true,
    rating: 4.5,
    reviews: 98,
    description: "Heavy-wash oversized tee with a vintage streetwear aesthetic. Stone-washed 260 GSM cotton.",
  },
  {
    id: "6",
    name: "Everyday Essential Tee",
    price: 1499,
    image: productBeige,
    hoverImage: productWhiteFitted,
    category: "women",
    subcategory: "fitted",
    fit: "regular",
    fabric: "cotton",
    colors: ["Beige", "White", "Dusty Rose"],
    sizes: ["XS", "S", "M", "L"],
    isBestSeller: true,
    rating: 4.4,
    reviews: 267,
    description: "Your go-to everyday tee in buttery-soft cotton. Relaxed regular fit that flatters every shape.",
  },
  {
    id: "7",
    name: "Color Block Kids Tee",
    price: 999,
    image: productKids,
    hoverImage: productKids,
    category: "kids",
    subcategory: "fitted",
    fit: "regular",
    fabric: "cotton",
    colors: ["Multi", "Blue", "Red"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    isNew: true,
    rating: 4.7,
    reviews: 145,
    description: "Fun color-blocked tee for active kids. Pre-shrunk soft cotton that's durable and easy to wash.",
  },
  {
    id: "8",
    name: "Oversized Women's Tee",
    price: 2299,
    originalPrice: 2799,
    image: productGreyOversized,
    hoverImage: productBeige,
    category: "women",
    subcategory: "oversized",
    fit: "oversized",
    fabric: "cotton",
    colors: ["Grey", "Black", "Cream"],
    sizes: ["XS", "S", "M", "L"],
    isSale: true,
    isBestSeller: true,
    rating: 4.6,
    reviews: 203,
    description: "Boyfriend-fit oversized tee with dropped shoulders. Ultra-cozy 240 GSM organic cotton.",
  },
];

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
