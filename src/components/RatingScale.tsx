import React from 'react';
import { cn } from '@/lib/utils';

interface RatingScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const ratingLabels = [
  "Nie, to nie dla mnie",
  "Może warto rozważyć",
  "Zdecydowanie tak!",
  "OK, jeśli jemu bardzo zależy"
];

const RatingScale: React.FC<RatingScaleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-md mx-auto pt-14">
      {/* SVG Wykres */}
      <div className="relative h-48 w-full mb-12">
        {/* Oś Y - Label */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 transform origin-center">
          <span className="text-xs font-medium whitespace-nowrap">TWOJA EKSCYTACJA</span>
        </div>
        
        {/* Oś X - Label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium">
          TWOJA SKŁONNOŚĆ DO KOMPROMISU
        </div>
        
        {/* Wykres - krzywa */}
        <svg className="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          {/* Krzywa wykresu */}
          <path 
            d="M 20,160 Q 100,100 200,40 Q 300,10 380,60" 
            fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          
          {/* Gradient kolorów */}
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" /> {/* pink-400 */}
            <stop offset="33%" stopColor="#f9d174" /> {/* żółtawy */}
            <stop offset="66%" stopColor="#76e4c8" /> {/* turkusowy */}
            <stop offset="100%" stopColor="#86efac" /> {/* green-300 */}
          </linearGradient>
          
          {/* Aktywny punkt na krzywej, jeśli wartość jest wybrana */}
          {value && (
            <circle 
              cx={value === 1 ? 60 : value === 2 ? 160 : value === 3 ? 260 : 340} 
              cy={value === 1 ? 140 : value === 2 ? 60 : value === 3 ? 40 : 60} 
              r="8" 
              fill="white" 
              stroke="#000" 
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
      
      {/* Radio buttons */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((rating) => (
          <div key={rating} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange(rating)}
              className={cn(
                "w-5 h-5 rounded-full border mb-2 transition-all",
                value === rating 
                  ? "border-primary bg-primary" 
                  : "border-gray-300"
              )}
              aria-label={`Ocena ${rating} z 4`}
            />
            <span className="text-xs text-center">{ratingLabels[rating-1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingScale;