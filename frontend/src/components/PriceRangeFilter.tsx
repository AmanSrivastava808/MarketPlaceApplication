import React from 'react';
import { Sliders } from 'lucide-react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange,
}) => {
  return (
    <div className="p-4 glass-card rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-5 w-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Price Range</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-1">Min (₹)</label>
            <input
              type="number"
              value={currentMin}
              onChange={(e) => onPriceChange(Number(e.target.value), currentMax)}
              min={minPrice}
              max={currentMax}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-1">Max (₹)</label>
            <input
              type="number"
              value={currentMax}
              onChange={(e) => onPriceChange(currentMin, Number(e.target.value))}
              min={currentMin}
              max={maxPrice}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="relative pt-1">
          <div className="h-2 bg-gray-700 rounded-lg">
            <div
              className="absolute h-2 bg-indigo-600 rounded-lg"
              style={{
                left: `${((currentMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
                right: `${100 - ((currentMax - minPrice) / (maxPrice - minPrice)) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};