
import React from 'react';
import { useTranslation } from 'react-i18next';

interface RatingScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingScale: React.FC<RatingScaleProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  
  const ratings = [
    { value: 1, label: t('ratings.dislike'), color: "bg-red-500" },
    { value: 2, label: t('ratings.mixed'), color: "bg-yellow-500" },
    { value: 3, label: t('ratings.like'), color: "bg-green-500" },
    { value: 4, label: t('ratings.veryInterested'), color: "bg-emerald-500" },
    { value: 5, label: t('ratings.favorite'), color: "bg-blue-500" }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between w-full mb-2">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            type="button"
            onClick={() => onChange(rating.value)}
            className={`flex flex-col items-center transition-all ${
              value === rating.value ? 'scale-110' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${rating.color} ${
              value === rating.value ? 'ring-2 ring-offset-2 ring-primary' : ''
            }`}>
              {rating.value}
            </div>
            <span className="text-xs text-center max-w-[60px]">{rating.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingScale;
