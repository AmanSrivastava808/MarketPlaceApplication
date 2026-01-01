import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Profile } from './Profile';

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div 
          className="relative h-[60vh] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=60')`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-6">Welcome to IIITH Buy Sell</h1>
              <p className="text-xl mb-8 max-w-2xl">
                Discover our curated collection of premium products. 
                From electronics to accessories, find exactly what you need.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Profile />
      </div>
    </div>
  );
};