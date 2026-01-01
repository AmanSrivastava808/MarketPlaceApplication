function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const orders = [
  {
    id: "ORD-001",
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics",
        quantity: 1
      }
    ],
    total: 299.99,
    status: "shipped",
    orderDate: "2024-03-10",
    trackingNumber: "TRK123456789",
    deliveryDate: "2024-03-15",
    otp: generateOTP(),
    buyer: {
      id: 1,
      name: "Aman Srivastava"
    },
    seller: {
      id: 2,
      name: "TechGear Pro"
    }
  },
  {
    id: "ORD-002",
    items: [
      {
        id: 2,
        name: "Minimalist Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
        description: "Elegant minimalist watch with leather strap",
        category: "Accessories",
        quantity: 2
      }
    ],
    total: 399.98,
    status: "pending",
    orderDate: "2024-03-12",
    otp: generateOTP(),
    buyer: {
      id: 2,
      name: "Jane Smith"
    },
    seller: {
      id: 1,
      name: "Aman Srivastava"
    }
  }
];