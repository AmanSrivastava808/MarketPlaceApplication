import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { deliveries } from '../data/deliveries';
import { orders } from '../data/orders';

const mockCurrentUser = {
  id: 1,
  name: "John Doe"
};

export const Deliveries = () => {
  const [otpInput, setOtpInput] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  const activeDeliveries = deliveries.filter(
    delivery => delivery.status !== 'completed' && delivery.seller.id === mockCurrentUser.id
  );

  const handleOtpSubmit = (orderId: string, enteredOtp: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (enteredOtp === order.otp) {
      // Here you would typically make an API call to update the order status
      setError({ ...error, [orderId]: '' });
      alert('Transaction completed successfully!');
    } else {
      setError({ ...error, [orderId]: 'Incorrect OTP. Please try again.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pending Deliveries</h1>

      {activeDeliveries.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No pending deliveries</h2>
          <p className="text-gray-600">All your orders have been delivered</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeDeliveries.map((delivery) => {
            const order = orders.find(o => o.id === delivery.orderId);
            if (!order) return null;

            return (
              <div key={delivery.orderId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">Ordered on {order.orderDate}</p>
                    <p className="text-sm text-gray-600">Buyer: {delivery.buyer.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {delivery.status === 'shipped' ? (
                      <Truck className="h-5 w-5 text-blue-500" />
                    ) : delivery.status === 'processing' ? (
                      <Package className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      delivery.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      delivery.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Current Location:</span>
                    <span className="font-medium">{delivery.currentLocation}</span>
                  </div>
                  {delivery.estimatedDelivery && (
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Estimated Delivery:</span>
                      <span className="font-medium">{delivery.estimatedDelivery}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Transaction</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter Buyer's OTP
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={otpInput[order.id] || ''}
                          onChange={(e) => setOtpInput({ ...otpInput, [order.id]: e.target.value })}
                          placeholder="Enter 6-digit OTP"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={() => handleOtpSubmit(order.id, otpInput[order.id] || '')}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Complete
                        </button>
                      </div>
                      {error[order.id] && (
                        <p className="mt-2 text-sm text-red-600">{error[order.id]}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};