
import React from 'react';

interface PromotionBadgeProps {
  regularPrice: number;
  currentPrice: number;
  currency: string;
}

const PromotionBadge: React.FC<PromotionBadgeProps> = ({ regularPrice, currentPrice, currency }) => {
  // Oblicz procent zniżki
  const discount = Math.round(((regularPrice - currentPrice) / regularPrice) * 100);
  
  return (
    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-500 font-medium">Promocja! Tylko dziś</p>
          <p className="text-white text-xl font-bold">{currentPrice} {currency}</p>
          <p className="text-gray-400 text-sm line-through">{regularPrice} {currency}</p>
        </div>
        
        <div className="bg-green-600 text-white font-bold px-3 py-1 rounded-full text-lg">
          -{discount}%
        </div>
      </div>
    </div>
  );
};

export default PromotionBadge;
