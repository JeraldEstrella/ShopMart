export interface Product {
  id: number;
  title: string;
  image: string[];
  price: number;
  discount?: number;
  rating?: number;
  sold?: number;
}
