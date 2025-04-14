
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaymentStepsProps {
  currentStep: number;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ currentStep }) => {
  const isMobile = useIsMobile();
  
  // Zwróć uproszczoną wersję dla urządzeń mobilnych
  if (isMobile) {
    return (
      <div className="mb-6 pt-4">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${currentStep >= step ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center text-white font-bold mb-1`}>
                {step}
              </div>
              {step === 1 && <span className="text-xs text-gray-400">Ankieta</span>}
              {step === 2 && <span className="text-xs text-gray-400">Dane</span>}
              {step === 3 && <span className="text-xs text-gray-400">Partner</span>}
              {step === 4 && <span className="text-xs text-gray-400">Koniec</span>}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <div className="h-1 bg-gray-700 flex-1">
            <div className="h-full bg-primary" style={{width: '100%'}}></div>
          </div>
          <div className="h-1 bg-gray-700 flex-1 ml-1">
            <div className="h-full bg-primary" style={{width: currentStep >= 2 ? '100%' : '0%'}}></div>
          </div>
          <div className="h-1 bg-gray-700 flex-1 ml-1">
            <div className="h-full bg-primary" style={{width: currentStep >= 3 ? '100%' : '0%'}}></div>
          </div>
          <div className="h-1 bg-gray-700 flex-1 ml-1">
            <div className="h-full bg-primary" style={{width: currentStep >= 4 ? '100%' : '0%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Oryginalna wersja dla większych ekranów
  return (
    <div className="mb-8 pt-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-1">
            1
          </div>
          <span className="text-xs text-gray-400">Ankieta</span>
        </div>
        
        <div className="flex-1 h-1 mx-2 bg-gray-700">
          <div className="h-full bg-primary" style={{width: '100%'}}></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center text-white font-bold mb-1`}>
            2
          </div>
          <span className="text-xs text-gray-400">Dane</span>
        </div>
        
        <div className="flex-1 h-1 mx-2 bg-gray-700">
          <div className="h-full bg-primary" style={{width: currentStep >= 2 ? '100%' : '0%'}}></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center text-white font-bold mb-1`}>
            3
          </div>
          <span className="text-xs text-gray-400">Partner</span>
        </div>
        
        <div className="flex-1 h-1 mx-2 bg-gray-700">
          <div className="h-full bg-primary" style={{width: currentStep >= 3 ? '100%' : '0%'}}></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full ${currentStep >= 4 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center text-white font-bold mb-1`}>
            4
          </div>
          <span className="text-xs text-gray-400">Podsumowanie</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSteps;
