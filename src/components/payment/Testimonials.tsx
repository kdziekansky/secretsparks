
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();

  const renderStars = (fullStars: number, hasHalfStar: boolean = false) => {
    return [...Array(5)].map((_, i) => {
      if (i < fullStars) {
        return <Star key={i} className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-500 fill-yellow-500`} />;
      }
      if (hasHalfStar && i === fullStars) {
        return <StarHalf key={i} className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-500 fill-yellow-500`} />;
      }
      return <Star key={i} className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-300`} />;
    });
  };

  return (
    <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-white text-left">Co mówią inni:</h3>
      
      <div className="bg-[#111] p-3 sm:p-4 rounded-lg">
        <div className="flex items-start gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs flex-shrink-0">KM</div>
          <div>
            <p className="text-white text-xs sm:text-sm font-medium">Karolina i Michał</p>
            <div className="flex items-center">
              {renderStars(4)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm italic text-left mt-1">&quot;Ankieta mogłaby mieć mniej &quot;wyraźne&quot; zdjęcia, ale sam raport oceniam bardzo pozytywnie. Zaskoczyło mnie, ile rzeczy było dla nas obu OK.&quot;</p>
      </div>
      
      <div className="bg-[#111] p-3 sm:p-4 rounded-lg">
        <div className="flex items-start gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs flex-shrink-0">AP</div>
          <div>
            <p className="text-white text-xs sm:text-sm font-medium">Anna i Piotr</p>
            <div className="flex items-center">
              {renderStars(5)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm italic text-left mt-1">"Świetne urozmaicenie, bez skrępowania wnieśliśmy nowości do sypialni. Większość nowości mamy już zaplanowane"</p>
      </div>

      <div className="bg-[#111] p-3 sm:p-4 rounded-lg">
        <div className="flex items-start gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs flex-shrink-0">JM</div>
          <div>
            <p className="text-white text-xs sm:text-sm font-medium">Jagoda i Marek</p>
            <div className="flex items-center">
              {renderStars(4)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm italic text-left mt-1">&quot;Kupiłem to na naszą 3 rocznicę. Okazało się, że mamy podobne fantazje, tylko po prostu o nich nie rozmawialiśmy. Oboje jesteśmy zadowoleni&quot;</p>
      </div>
    </div>
  );
};

export default Testimonials;
