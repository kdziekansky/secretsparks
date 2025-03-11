
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, UserCircle2 } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';

interface PartnerWelcomeProps {
  orderDetails: {
    userName: string;
    partnerName: string;
  };
}

const PartnerWelcome: React.FC<PartnerWelcomeProps> = ({ orderDetails }) => {
  const { completeConfig } = useSurvey();
  
  return (
    <div className="glass-panel w-full max-w-4xl p-8 animate-slide-up">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Witaj, {orderDetails.partnerName}!</h1>
        
        <p className="text-xl mb-8">
          <strong>{orderDetails.userName}</strong> zaprosił(a) Cię do wspólnego wypełnienia ankiety.
        </p>
        
        <div className="flex items-center justify-center space-x-4 p-4 mb-8 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <UserCircle2 className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm">{orderDetails.userName}</span>
          </div>
          
          <div className="w-8 h-0.5 bg-gray-300"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm">{orderDetails.partnerName}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-lg">
          Ta ankieta pomoże Wam lepiej zrozumieć swoje potrzeby i pragnienia. 
          Po wypełnieniu, otrzymacie wnikliwy raport, który otworzy przed Wami nowe możliwości.
        </p>
        
        <Button 
          onClick={completeConfig} 
          className="px-8 py-6 text-lg"
        >
          Rozpocznij ankietę
        </Button>
      </div>
    </div>
  );
};

export default PartnerWelcome;
