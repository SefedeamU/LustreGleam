export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  rating: number;
  creationAt:string;
  animate?: boolean;
}