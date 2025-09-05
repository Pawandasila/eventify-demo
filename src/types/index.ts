export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  unit: string;
  weight: string;
  image: string;
  images?: string[];
  inStock: boolean;
  deliveryTime: string;
  description: string;
  rating: number;
  reviewCount: number;
  isOrganic?: boolean;
  isFresh?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  isOrganic: boolean;
  inStock: boolean;
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  validUntil: string;
  products: Product[];
}
