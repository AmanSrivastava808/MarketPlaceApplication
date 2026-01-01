import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { generateOTP, hashOTP } from '../utils/crypto';
import { getCurrentUser } from '../utils/auth';

export const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);
    
    // Create new order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: state.items,
      total: state.total,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      otp: otp,
      hashedOTP: hashedOTP,
      buyer: {
        id: user.id,
        name: user.name
      },
      seller: {
        id: state.items[0]?.vendor?.id || 1,
        name: state.items[0]?.vendor?.name || 'Store'
      }
    };

    // In a real app, this would be an API call
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    // Create delivery entry
    const newDelivery = {
      orderId: newOrder.id,
      status: 'pending',
      currentLocation: 'Processing Center',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      otp: hashedOTP,
      buyer: newOrder.buyer,
      seller: newOrder.seller,
      updates: [
        {
          date: new Date().toISOString(),
          status: 'Order placed',
          location: 'Processing Center'
        }
      ]
    };

    const existingDeliveries = JSON.parse(localStorage.getItem('deliveries') || '[]');
    localStorage.setItem('deliveries', JSON.stringify([...existingDeliveries, newDelivery]));

    // Clear cart
    dispatch({ type: 'CLEAR_CART' });

    // Show OTP to user
    alert(`Your order has been placed! Your OTP is: ${otp}\nPlease keep this OTP safe and share it with the seller upon delivery.`);

    // Navigate to orders page
    navigate('/orders');
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some products to your cart to get started</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      <div className="glass-card p-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex items-center py-6 border-b border-gray-700 last:border-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-gray-400">₹{item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
                  })}
                  className="p-1 rounded-md hover:bg-gray-700 text-gray-400"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-white">{item.quantity}</span>
                <button
                  onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: item.quantity + 1 }
                  })}
                  className="p-1 rounded-md hover:bg-gray-700 text-gray-400"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                className="p-2 text-red-400 hover:bg-red-900/50 rounded-md"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-white">Total:</span>
            <span className="text-3xl font-bold text-indigo-400">
            ₹{state.total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};