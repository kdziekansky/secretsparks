
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Testimonials: React.FC = () => {
  const renderStars = (fullStars: number, hasHalfStar: boolean = false) => {
    return [...Array(5)].map((_, i) => {
      if (i < fullStars) {
        return <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />;
      }
      if (hasHalfStar && i === fullStars) {
        return <StarHalf key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />;
      }
      return <Star key={i} className="w-4 h-4 text-gray-300" />;
    });
  };

  return <div className="mt-8 space-y-4">
    <h3 className="text-lg font-medium text-white">Co mówią inni:</h3>
    
    <div className="bg-[#111] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">KM</div>
        <div>
          <p className="text-white text-sm font-medium">Karolina i Michał</p>
          <div className="flex items-center">
            {renderStars(4)}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm italic">&quot;Ankieta mogłaby mieć mniej &quot;wyraźne&quot; zdjęcia, ale sam raport oceniam bardzo pozytywnie. Zaskoczyło mnie, ile rzeczy było dla nas obu OK.&quot;</p>
    </div>
    
    <div className="bg-[#111] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">AP</div>
        <div>
          <p className="text-white text-sm font-medium">Anna i Piotr</p>
          <div className="flex items-center">
            {renderStars(5)}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm italic">"Świetne urozmaicenie, bez skrępowania wnieśliśmy nowości do sypialni. Większość nowości mamy już zaplanowane"</p>
    </div>

    <div className="bg-[#111] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">JM</div>
        <div>
          <p className="text-white text-sm font-medium">Jagoda i Marek</p>
          <div className="flex items-center">
            {renderStars(5)}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm italic">"Narzędzie, które pomogło nam otworzyć się na siebie i lepiej zrozumieć nawzajem. Teraz nasza komunikacja jest jeszcze lepsza."</p>
    </div>
  </div>;
};

export default Testimonials;
