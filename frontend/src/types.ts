export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  vendor: {
    id: number;
    name: string;
    rating: number;
    totalSales: number;
  };
  specifications: {
    [key: string]: string;
  };
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed';
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
  otp?: string;
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
}

export interface DeliveryStatus {
  orderId: string;
  status: Order['status'];
  currentLocation?: string;
  estimatedDelivery?: string;
  otp: string;
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
  updates: {
    date: string;
    status: string;
    location: string;
  }[];
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  avatar?: string;
  joinedDate: string;
  totalOrders: number;
}