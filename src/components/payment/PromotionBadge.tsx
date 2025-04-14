import React from 'react';
import { Clock } from 'lucide-react';
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
  return;
};
export default PromotionBadge;