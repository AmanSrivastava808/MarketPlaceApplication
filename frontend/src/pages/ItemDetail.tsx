import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Store, Package, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const ItemDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="glass-card rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-white">{product.rating}</span>
                <span className="ml-1 text-gray-400">({product.reviews} reviews)</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{product.stock} in stock</span>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Store className="h-5 w-5 text-indigo-400" />
                <span className="text-white font-medium">{product.vendor.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white">{product.vendor.rating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{product.vendor.totalSales} sales</span>
              </div>
            </div>
            <p className="text-gray-300">{product.description}</p>
          </div>

          <div className="glass-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-indigo-400">₹{product.price.toFixed(2)}</span>
              <button
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">1 Year Warranty</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-700 pb-2">
                  <p className="text-gray-400">{key}</p>
                  <p className="text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};