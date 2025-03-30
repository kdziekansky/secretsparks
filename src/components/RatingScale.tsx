
import React from 'react';
import { useTranslation } from 'react-i18next';

interface RatingScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingScale: React.FC<RatingScaleProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  
  const ratings = [
    { value: 1, label: t('ratings.dislike'), color: 'bg-red-500' },
    { value: 2, label: t('ratings.mixed'), color: 'bg-orange-500' },
    { value: 3, label: t('ratings.like'), color: 'bg-yellow-500' },
    { value: 4, label: t('ratings.veryInterested'), color: 'bg-green-500' },
    { value: 5, label: t('ratings.favorite'), color: 'bg-blue-500' }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            className={`focus:outline-none transition-transform transform ${
              value === rating.value ? 'scale-110' : 'scale-100 opacity-70'
            }`}
            onClick={() => onChange(rating.value)}
            aria-label={rating.label}
          >
            <div className="flex flex-col items-center">
              <div 
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${rating.color} mb-2`}
              />
              <span className="text-xs md:text-sm whitespace-nowrap text-center max-w-[80px]">
                {rating.label}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="relative h-2 bg-background rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/5 bg-red-500" />
          <div className="w-1/5 bg-orange-500" />
          <div className="w-1/5 bg-yellow-500" />
          <div className="w-1/5 bg-green-500" />
          <div className="w-1/5 bg-blue-500" />
        </div>
        <div 
          className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-lg transform -translate-x-1/2"
          style={{ left: `${(value - 0.5) * 20}%` }}
        />
      </div>
    </div>
  );
};

export default RatingScale;
