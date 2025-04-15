
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRightCircle, CheckCircle2, FileText, Shield } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderSummaryStepProps {
  userData: {
    userName: string;
    userEmail: string;
    partnerName: string;
    partnerEmail: string;
  };
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  productPrice: number;
  regularPrice: number;
  currency: string;
}

const OrderSummaryStep: React.FC<OrderSummaryStepProps> = ({
  userData,
  onPrevStep,
  onSubmit,
  isProcessing,
  productPrice,
  regularPrice,
  currency
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Proszę zaakceptować regulamin i politykę prywatności');
      return;
    }
    
    console.log('Wywołuję funkcję płatności - onSubmit');
    onSubmit(e);
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white flex items-center">
          Podsumowanie <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Sprawdź poprawność danych przed przejściem do płatności
        </p>
      </div>

      <div className="bg-[#111] border border-[#333] rounded-md p-4 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-medium text-white">Dane zamówienia</h2>
        </div>
        
        <div className="grid gap-2 sm:gap-3">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">Twoje imię:</p>
            <p className="text-white text-sm sm:text-base">{userData.userName}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">Twój email:</p>
            <p className="text-white text-sm sm:text-base break-all">{userData.userEmail}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">Imię partnera/ki:</p>
            <p className="text-white text-sm sm:text-base">{userData.partnerName}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-xs sm:text-sm">Email partnera/ki:</p>
            <p className="text-white text-sm sm:text-base break-all">{userData.partnerEmail}</p>
          </div>
        </div>
        
        <div className="pt-3 sm:pt-4 border-t border-[#333] mt-3 sm:mt-4">
          <div className="flex justify-between items-center">
            <p className="text-white font-medium text-sm sm:text-base">Do zapłaty:</p>
            <p className="text-lg sm:text-xl font-bold text-primary">{productPrice} {currency}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 border border-green-600/20 bg-green-600/10 rounded-lg">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-400 text-sm sm:text-base mb-0.5">100% satysfakcji lub zwrot pieniędzy</h3>
          </div>
        </div>
      </div>
      
      {/* Checkbox do akceptacji regulaminu */}
      <div className="flex items-start gap-2 pt-2 mb-4">
        <Checkbox 
          id="termsAcceptance" 
          checked={termsAccepted} 
          onCheckedChange={checked => setTermsAccepted(!!checked)} 
          className="h-4 w-4 border-white/40 mt-1" 
        />
        <Label htmlFor="termsAcceptance" className="text-gray-300 text-xs sm:text-sm cursor-pointer">
          Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
        </Label>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Button onClick={onPrevStep} variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 text-xs sm:text-sm py-2.5 h-auto flex items-center justify-center">
          Wstecz
        </Button>
        
        <Button 
          type="submit" 
          disabled={isProcessing || !termsAccepted} 
          onClick={handleSubmitPayment} 
          className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-1 sm:gap-2 w-full text-xs sm:text-sm py-2.5 h-auto"
        >
          {isProcessing ? <>
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              <span>Przetwarzanie...</span>
            </> : <>
              <span>Odkryj raport</span>
              <ArrowRightCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </>}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryStep;
