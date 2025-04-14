import React from 'react';
interface PromotionBadgeProps {
  regularPrice: number;
  currentPrice: number;
  currency: string;
}
const PromotionBadge: React.FC<PromotionBadgeProps> = ({
  regularPrice,
  currentPrice,
  currency
}) => {
  // Oblicz procent zniżki
  const discount = Math.round((regularPrice - currentPrice) / regularPrice * 100);
  return;
};
export default PromotionBadge;