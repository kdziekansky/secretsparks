
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRightCircle, CheckCircle2, FileText, Check } from 'lucide-react';
import PromotionBadge from './PromotionBadge';

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
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
          Podsumowanie <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 mb-3">
          Sprawdź poprawność danych przed przejściem do płatności
        </p>
      </div>
      
      <PromotionBadge regularPrice={regularPrice} currentPrice={productPrice} currency={currency} />

      <div className="bg-[#111] border border-[#333] rounded-md p-5 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-medium text-white">Dane zamówienia</h2>
        </div>
        
        <div className="grid gap-3">
          <div>
            <p className="text-gray-400 text-sm">Twoje imię:</p>
            <p className="text-white">{userData.userName}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Twój email:</p>
            <p className="text-white">{userData.userEmail}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Imię partnera/ki:</p>
            <p className="text-white">{userData.partnerName}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Email partnera/ki:</p>
            <p className="text-white">{userData.partnerEmail}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-[#333] mt-4">
          <div className="flex justify-between items-center">
            <p className="text-white font-medium">Do zapłaty:</p>
            <p className="text-xl font-bold text-primary">{productPrice} {currency}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border border-green-600/30 bg-green-600/10 rounded-lg space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-green-400 text-lg mb-1">100% satysfakcji lub zwrot pieniędzy</h3>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">Email z raportem zostanie wysłany na Twój adres</p>
        </div>
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">Twój partner/ka otrzyma link do ankiety na podany adres email</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onPrevStep} variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800">
          Wstecz
        </Button>
        
        <Button type="submit" disabled={isProcessing} onClick={onSubmit} className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
          {isProcessing ? <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Przetwarzanie...
            </> : <>
              <span>Zapłać {productPrice} {currency}</span>
              <ArrowRightCircle className="h-5 w-5" />
            </>}
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2">
        Płatność jest zabezpieczona szyfrowaniem SSL
      </p>
    </div>
  );
};

export default OrderSummaryStep;
