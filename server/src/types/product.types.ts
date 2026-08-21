export interface Product {
  id: number;
  title: string;
  image: string[];
  price: number;
  discount?: number;
  rating?: number;
  sold?: number;
}

export interface Variant {
  color: string;
  size: string;
  price: number;
  stock: number;
}

// Data sent when creating a product
export interface CreateProductData {
  storeid: string;
  categoryid: number;
  description: string;
  sku: string;
  name: string;
  price: number;
  discount?: number;
  stock: number;
  status: string;
  images: Express.Multer.File[];
  variants: Variant[];
}

export interface UpdateProductData {
  id: string;
  storeid: string;
  categoryid: number;
  description: string;
  sku: string;
  name: string;
  price: number;
  discount?: number;
  stock: number;
  status: string;
  images: string[];
  variants: Variant[];
}

export interface UpdateFormProductData {
  categoryid: number;
  description: string;
  sku: string;
  name: string;
  price?: number;
  discount?: number;
  stock: number;
  status: string;
  images?: Express.Multer.File[];
  variants: Variant[];
}

export interface NewProduct {
  id: string;
  storeId: string;
  categoryId: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  status: string;
  stock: number;
  discount: number | null;
  images: string[];
  variants: Variant[];
}

export interface ExistingProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}
