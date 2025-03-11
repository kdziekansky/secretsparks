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
  "OK, jeśli jemu bardzo zależy"
];

// Funkcja obliczająca punkt na krzywej Beziera dla danego parametru t (0-1)
const getBezierPoint = (t: number, p0: any, p1: any, p2: any, p3: any) => {
  // Wzór na krzywą kubiczną Beziera
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;
  
  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;
  
  const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
  const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;
  
  return { x, y };
};

const RatingScale: React.FC<RatingScaleProps> = ({
  value,
  onChange,
}) => {
  // Punkty kontrolne dla krzywej Beziera
  const controlPoints = {
    p0: { x: 20, y: 170 },   // Początek
    p1: { x: 100, y: 120 },  // Kontrolny 1
    p2: { x: 200, y: 50 },   // Kontrolny 2
    p3: { x: 380, y: 60 }    // Koniec
  };
  
  // Obliczanie dokładnych punktów na krzywej dla każdej wartości
  const pointsOnCurve = useMemo(() => {
    // Parametry t dla 4 wartości na krzywej (równomiernie rozłożone)
    const tValues = [0.1, 0.4, 0.7, 0.95];
    
    return tValues.map(t => 
      getBezierPoint(t, controlPoints.p0, controlPoints.p1, controlPoints.p2, controlPoints.p3)
    );
  }, []);
  
  // Generowanie ścieżki krzywej z wysoką precyzją
  const pathData = useMemo(() => {
    let path = `M ${controlPoints.p0.x},${controlPoints.p0.y}`;
    
    // Dokładna krzywa kubiczna Beziera
    path += ` C ${controlPoints.p1.x},${controlPoints.p1.y}`;
    path += ` ${controlPoints.p2.x},${controlPoints.p2.y}`;
    path += ` ${controlPoints.p3.x},${controlPoints.p3.y}`;
    
    return path;
  }, []);

  // Siatka pomocnicza
  const grid = useMemo(() => {
    const lines = [];
    // Linie poziome
    for (let y = 40; y <= 180; y += 35) {
      lines.push(<line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#ddd" strokeWidth="1" />);
    }
    // Linie pionowe
    for (let x = 20; x <= 380; x += 90) {
      lines.push(<line key={`v-${x}`} x1={x} y1="0" x2={x} y2="200" stroke="#ddd" strokeWidth="1" />);
    }
    return lines;
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto pt-14">
      {/* SVG Wykres */}
      <div className="relative h-52 w-full mb-12">
        {/* Oś Y - Label */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 transform origin-center">
          <span className="text-xs font-medium whitespace-nowrap">TWOJA EKSCYTACJA</span>
        </div>
        
        {/* Oś X - Label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium">
          TWOJA SKŁONNOŚĆ DO KOMPROMISU
        </div>
        
        {/* Wykres - krzywa */}
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" 
             style={{ shapeRendering: 'geometricPrecision' }}>
          {/* Definicje gradientów */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" /> {/* pink-500 */}
              <stop offset="33%" stopColor="#f59e0b" /> {/* amber-500 */}
              <stop offset="66%" stopColor="#10b981" /> {/* emerald-500 */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
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
            {grid}
          </g>
          
          {/* Główna krzywa - bardzo gładka */}
          <path 
            d={pathData}
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
          
          {/* Punkty znaczące - dokładnie na krzywej */}
          {pointsOnCurve.map((point, index) => (
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
          
          {/* Aktywny punkt - dokładnie na krzywej */}
          {value && (
            <g>
              {/* Efekt pulsowania */}
              <circle 
                cx={pointsOnCurve[value - 1].x} 
                cy={pointsOnCurve[value - 1].y} 
                r="14" 
                fill="rgba(255,255,255,0.2)"
                className="animate-ping"
              />
              
              {/* Główny punkt */}
              <circle 
                cx={pointsOnCurve[value - 1].x} 
                cy={pointsOnCurve[value - 1].y} 
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
      
      {/* Radio buttons z ulepszoną stylistyką */}
      <div className="grid grid-cols-4 gap-4 mt-2">
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
  );
};

export default RatingScale; 