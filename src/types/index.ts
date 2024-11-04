export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: string;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}