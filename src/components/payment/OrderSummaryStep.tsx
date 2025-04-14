
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRightCircle, CheckCircle2, FileText, Check, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Proszę zaakceptować regulamin i politykę prywatności');
      return;
    }
    onSubmit(e);
  };

  return <div className="space-y-5 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
          Podsumowanie <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 mb-3">
          Sprawdź poprawność danych przed przejściem do płatności
        </p>
      </div>

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
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">Gwarantujemy bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.</p>
        </div>
      </div>
      
      {/* Checkbox do akceptacji regulaminu */}
      <div className="flex items-center gap-3 pt-3 mb-4">
        <Checkbox 
          id="ageConfirmation" 
          checked={termsAccepted} 
          onCheckedChange={(checked) => setTermsAccepted(!!checked)} 
          className="h-4 w-4 border-white/40" 
        />
        <Label htmlFor="ageConfirmation" className="text-gray-300 text-sm cursor-pointer">
          Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
        </Label>
      </div>
      
      {/* Testimonials */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-white">Co mówią inni:</h3>
        
        {/* Pierwsza nowa opinia */}
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">ZT</div>
            <div>
              <p className="text-white text-sm font-medium">Zosia i Tomek</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"To było dokładnie to, czego potrzebowaliśmy po 5 latach małżeństwa. Odkryliśmy siebie na nowo i nauczyliśmy się nowych sposobów wyrażania naszych pragnień."</p>
        </div>
        
        {/* Druga nowa opinia */}
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">BK</div>
            <div>
              <p className="text-white text-sm font-medium">Beata i Kacper</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"Myśleliśmy, że znamy swoje potrzeby, ale ankieta Secret Sparks otworzyła przed nami zupełnie nowy wymiar bliskości. Warto było zainwestować!"</p>
        </div>
        
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">MS</div>
            <div>
              <p className="text-white text-sm font-medium">Monika i Stefan</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"Nigdy nie myślałam, że może być tak ciekawie! Dowiedziałam się wielu rzeczy o moim partnerze, które zmieniły nasze życie intymne na lepsze."</p>
        </div>
        
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">JT</div>
            <div>
              <p className="text-white text-sm font-medium">Joanna i Tomasz</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"Ankieta pomogła nam przełamać barierę wstydu i zacząć rozmawiać o naszych pragnieniach. Polecam każdej parze, która chce wnieść świeżość do związku."</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onPrevStep} variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800">
          Wstecz
        </Button>
        
        <div className="flex flex-col items-end">
          <Button type="submit" disabled={isProcessing} onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 w-full">
            {isProcessing ? <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Przetwarzanie...
              </> : <>
                <span>Odkryj wasze pragnienia</span>
                <ArrowRightCircle className="h-5 w-5" />
              </>}
          </Button>
          <p className="text-right text-gray-400 text-xs mt-1">Za jedyne {productPrice} {currency}</p>
        </div>
      </div>
    </div>;
};

export default OrderSummaryStep;
