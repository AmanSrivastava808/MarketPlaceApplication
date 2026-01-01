import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { orders } from '../data/orders';
import { Link } from 'react-router-dom';
import { Order } from '../types';

const mockCurrentUser = {
  id: 1,
  name: "John Doe"
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-blue-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-yellow-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'bought' | 'sold'>('bought');

  const boughtOrders = orders.filter(order => order.buyer.id === mockCurrentUser.id);
  const soldOrders = orders.filter(order => order.seller.id === mockCurrentUser.id);

  const displayOrders = activeTab === 'bought' ? boughtOrders : soldOrders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('bought')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'bought'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Orders Placed
          </button>
          <button
            onClick={() => setActiveTab('sold')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'sold'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Items Sold
          </button>
        </div>
      </div>
      
      {displayOrders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">
            {activeTab === 'bought' 
              ? 'Start shopping to see your orders here'
              : 'Your sold items will appear here'}
          </p>
          {activeTab === 'bought' && (
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayOrders.map((order: Order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                  <p className="text-sm text-gray-600">Placed on {order.orderDate}</p>
                  {activeTab === 'bought' ? (
                    <p className="text-sm text-gray-600">Seller: {order.seller.name}</p>
                  ) : (
                    <p className="text-sm text-gray-600">Buyer: {order.buyer.name}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-indigo-600">₹{order.total.toFixed(2)}</span>
                </div>
                {order.trackingNumber && (
                  <p className="text-sm text-gray-600 mt-2">
                    Tracking Number: {order.trackingNumber}
                  </p>
                )}
                {activeTab === 'bought' && order.otp && order.status !== 'completed' && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Your OTP: {order.otp}</p>
                    <p className="text-xs text-gray-500">Share this with the seller to complete the transaction</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/deliveries/${order.id}`}
                  className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};