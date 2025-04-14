
import React from 'react';
import { Clock } from 'lucide-react';

interface PromotionBadgeProps {
  regularPrice: number;
  currentPrice: number;
  currency: string;
}

const PromotionBadge: React.FC<PromotionBadgeProps> = ({ regularPrice, currentPrice, currency }) => {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 rounded-lg p-3 mb-6 flex items-center gap-3">
      <Clock className="h-5 w-5 text-primary animate-pulse" />
      <div>
        <p className="text-primary font-medium">Oferta ograniczona czasowo</p>
        <p className="text-sm text-gray-300">
          Tylko dziś: <span className="line-through text-gray-400">{regularPrice} {currency}</span>{' '}
          <span className="font-bold text-white">{currentPrice} {currency}</span>
        </p>
      </div>
    </div>
  );
};

export default PromotionBadge;
