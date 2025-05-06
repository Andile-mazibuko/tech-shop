export interface Product {
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
  first_name: string;
  last_name: string;
  password: string;
  role?: string,
  email: string;
}
