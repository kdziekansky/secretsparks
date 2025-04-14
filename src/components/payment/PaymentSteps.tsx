
import React from 'react';

interface PaymentStepsProps {
  currentStep: number;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ currentStep }) => {
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
