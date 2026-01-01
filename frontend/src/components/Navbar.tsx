import React from 'react';
import { ShoppingCart, Store, Search as SearchIcon, Clock, Package, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-indigo-400" />
              <span className="font-bold text-xl text-white">IIIT Buy Sell</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-300 hover:text-indigo-400 transition-colors">Products</Link>
            <Link to="/search" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <SearchIcon className="h-5 w-5" />
            </Link>
            <Link to="/orders" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <Clock className="h-5 w-5" />
            </Link>
            <Link to="/deliveries" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <Package className="h-5 w-5" />
            </Link>
            <Link to="/profile" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-indigo-400 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={handleLogout} className="text-gray-300 hover:text-indigo-400 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};