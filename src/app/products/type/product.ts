// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  description?: string;
  variants?: Array<{
    color: string;
    colorCode: string;
  }>;
  badge?: string;
  savings?: number;
}
