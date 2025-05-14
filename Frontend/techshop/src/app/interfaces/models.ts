export interface Product {
  prod_id?: number;
  title: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: 'Desktop' | 'GPU' | 'CPU' | 'Keyboard' | 'Headset' | 'Laptop';
}
export interface CategorySum {
  category: string;
  total: number;
}

export interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  password: string;
  role?: string;
  email: string;
}
export interface LogInInterface {
  email: string;
  password: string;
}
export interface Wishlist {
  user_id: number;
  prod_id: number;
}
export interface Order {
  order_id?: number;
  user_id: number;
  status?: string;
  date?: string;
  total: number;
  products: Product[];
}
export interface UpdateOrderStatus {
  order_id: number;
  new_status: string;
}
