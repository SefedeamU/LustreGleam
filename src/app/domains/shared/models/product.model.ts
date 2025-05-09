import { Category } from "./category.model";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  rating: number;
  creationAt:string;
  category: Category;
}