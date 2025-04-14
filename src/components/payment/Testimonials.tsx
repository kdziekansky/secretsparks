
import React from 'react';

const Testimonials: React.FC = () => {
  return <div className="mt-8 space-y-4">
      <h3 className="text-lg font-medium text-white">Co mówią inni:</h3>
      
      <div className="bg-[#111] p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">KM</div>
          <div>
            <p className="text-white text-sm font-medium">Karolina i Michał</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">"To było zaskakujące doświadczenie. Dowiedzieliśmy się o sobie rzeczy, o które nigdy byśmy się nie zapytali. Polecamy!"</p>
      </div>
      
      <div className="bg-[#111] p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">AP</div>
          <div>
            <p className="text-white text-sm font-medium">Anna i Piotr</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>)}
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
              {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">"Narzędzie, które pomogło nam otworzyć się na siebie i lepiej zrozumieć nawzajem. Teraz nasza komunikacja jest jeszcze lepsza."</p>
      </div>
    </div>;
};

export default Testimonials;
