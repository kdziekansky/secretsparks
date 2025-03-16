
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface RatingScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const ratingLabels = [
  "Nie, to nie dla mnie",
  "Może warto rozważyć",
  "Zdecydowanie tak!",
  "OK, jeśli jemu/jej bardzo zależy"
];

const RatingScale: React.FC<RatingScaleProps> = ({
  value,
  onChange,
}) => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <div className="w-full">
      {/* Wykres z krzywą dla urządzeń mobilnych (uproszczony) */}
      {isMobile ? (
        <div className="flex flex-col">
          {/* Prosty wykres jako kolorowy gradient */}
          <div className="h-8 w-full bg-gradient-to-r from-pink-500 via-amber-500 to-blue-500 rounded-full mb-4 relative">
            {/* Aktywny punkt na wykresie */}
            {value && (
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 shadow-lg transform scale-110 transition-all duration-300"
                style={{ 
                  left: `calc(${(value - 1) * 33}% + ${value === 4 ? '1%' : value === 1 ? '-1%' : '0%'})`,
                  borderColor: value === 1 ? '#ec4899' : value === 2 ? '#f59e0b' : value === 3 ? '#10b981' : '#3b82f6'
                }}
              />
            )}
          </div>
          
          {/* Radio buttons bez tekstu, tylko z wartościami */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((rating) => (
              <div key={rating} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onChange(rating)}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mb-2 transition-all duration-200",
                    value === rating 
                      ? "scale-110 shadow-sm" 
                      : "border-gray-300",
                    rating === 1 ? (value === 1 ? "bg-pink-500 border-pink-500" : "hover:border-pink-500") : "",
                    rating === 2 ? (value === 2 ? "bg-amber-500 border-amber-500" : "hover:border-amber-500") : "",
                    rating === 3 ? (value === 3 ? "bg-emerald-500 border-emerald-500" : "hover:border-emerald-500") : "",
                    rating === 4 ? (value === 4 ? "bg-blue-500 border-blue-500" : "hover:border-blue-500") : ""
                  )}
                  aria-label={`Ocena ${rating} z 4: ${ratingLabels[rating-1]}`}
                />
                <span className="text-[10px] text-center leading-tight">{ratingLabels[rating-1]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Pełna wersja dla desktopa
        <div className="pt-10">
          {/* SVG Wykres */}
          <div className="relative h-52 w-full mb-10">
            {/* Oś Y - Label */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 transform origin-center">
              <span className="text-xs font-medium whitespace-nowrap">EKSCYTACJA</span>
            </div>
            
            {/* Oś X - Label */}
            <div className="absolute bottom-0 right-0 text-xs font-medium">
              <span className="whitespace-nowrap">KOMPROMIS Z PARTNEREM</span>
            </div>
            
            {/* Wykres - krzywa */}
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Definicje gradientów */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="33%" stopColor="#f59e0b" />
                  <stop offset="66%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                
                {/* Filtr dla efektu świecenia */}
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 12 -4"
                    result="glow"
                  />
                  <feBlend in="SourceGraphic" in2="glow" mode="normal" />
                </filter>
              </defs>
              
              {/* Siatka pomocnicza */}
              <g className="opacity-20">
                {/* Linie poziome */}
                {[40, 75, 110, 145, 180].map((y) => (
                  <line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#ddd" strokeWidth="1" />
                ))}
                {/* Linie pionowe */}
                {[20, 110, 200, 290, 380].map((x) => (
                  <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="200" stroke="#ddd" strokeWidth="1" />
                ))}
              </g>
              
              {/* Główna krzywa */}
              <path 
                d="M 20,170 C 100,120 200,20 380,120"
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ 
                  filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))',
                  vectorEffect: 'non-scaling-stroke' 
                }}
              />
              
              {/* Punkty na krzywej */}
              {[
                { x: 60, y: 150 },  // Punkt 1 - "Nie, to nie dla mnie"
                { x: 160, y: 70 },  // Punkt 2 - "Może warto rozważyć"
                { x: 260, y: 40 },  // Punkt 3 - "Zdecydowanie tak!"
                { x: 340, y: 90 }   // Punkt 4 - "OK, jeśli jemu/jej bardzo zależy"
              ].map((point, index) => (
                <circle 
                  key={`point-${index}`}
                  cx={point.x} 
                  cy={point.y} 
                  r="4" 
                  fill={index + 1 === value ? 'white' : 'rgba(255,255,255,0.5)'}
                  className="cursor-pointer hover:scale-150 transition-transform"
                  onClick={() => onChange(index + 1)}
                  style={{ pointerEvents: 'all' }}
                />
              ))}
              
              {/* Aktywny punkt */}
              {value && (
                <g>
                  {/* Efekt pulsowania */}
                  <circle 
                    cx={[60, 160, 260, 340][value - 1]} 
                    cy={[150, 70, 40, 90][value - 1]} 
                    r="14" 
                    fill="rgba(255,255,255,0.2)"
                    className="animate-ping"
                  />
                  
                  {/* Główny punkt */}
                  <circle 
                    cx={[60, 160, 260, 340][value - 1]} 
                    cy={[150, 70, 40, 90][value - 1]} 
                    r="10" 
                    fill="white" 
                    stroke={value === 1 ? '#ec4899' : value === 2 ? '#f59e0b' : value === 3 ? '#10b981' : '#3b82f6'} 
                    strokeWidth="3"
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                </g>
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
                    "w-6 h-6 rounded-full border-2 mb-3 transition-all duration-300",
                    value === rating 
                      ? "scale-125 shadow-lg" 
                      : "border-gray-300 hover:scale-110",
                    rating === 1 ? (value === 1 ? "bg-pink-500 border-pink-500" : "hover:border-pink-500") : "",
                    rating === 2 ? (value === 2 ? "bg-amber-500 border-amber-500" : "hover:border-amber-500") : "",
                    rating === 3 ? (value === 3 ? "bg-emerald-500 border-emerald-500" : "hover:border-emerald-500") : "",
                    rating === 4 ? (value === 4 ? "bg-blue-500 border-blue-500" : "hover:border-blue-500") : ""
                  )}
                  aria-label={`Ocena ${rating} z 4: ${ratingLabels[rating-1]}`}
                />
                <span className="text-xs text-center font-medium">{ratingLabels[rating-1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingScale;
