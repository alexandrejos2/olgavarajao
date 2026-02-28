export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  isFeatured: boolean;
  status: 'Venda' | 'Arrendamento' | 'Vendido';
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar?: string;
}