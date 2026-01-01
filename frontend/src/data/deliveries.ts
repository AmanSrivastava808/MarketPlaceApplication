import { DeliveryStatus } from '../types'; // Adjust the import path as needed
export const deliveries: DeliveryStatus[] = [
  {
    orderId: "ORD-001",
    status: "shipped",
    currentLocation: "Local Distribution Center",
    estimatedDelivery: "2024-03-15",
    otp: "123456", // In a real app, this would match the order's OTP
    buyer: {
      id: 1,
      name: "Aman Srivastava"
    },
    seller: {
      id: 2,
      name: "TechGear Pro"
    },
    updates: [
      {
        date: "2024-03-12 14:30",
        status: "Package arrived at local distribution center",
        location: "Local Distribution Center"
      },
      {
        date: "2024-03-11 09:15",
        status: "Package in transit",
        location: "Regional Hub"
      },
      {
        date: "2024-03-10 16:45",
        status: "Order processed",
        location: "Warehouse"
      }
    ]
  },
  {
    orderId: "ORD-002",
    status: "pending",
    currentLocation: "Warehouse",
    estimatedDelivery: "2024-03-17",
    otp: "789012", // In a real app, this would match the order's OTP
    buyer: {
      id: 2,
      name: "Jane Smith"
    },
    seller: {
      id: 1,
      name: "Aman Srivastava"
    },
    updates: [
      {
        date: "2024-03-12 10:00",
        status: "Order confirmed",
        location: "Warehouse"
      }
    ]
  }
];