export interface ProductColor {
  hex_value: string;
  colour_name: string | null;
}

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign: string | null;
  image_link: string;
  description: string;
  rating: number | null;
  category: string | null;
  product_type: string;
  product_colors: ProductColor[];
}