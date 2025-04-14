import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { PartnerFormData } from './types';
import PromotionBadge from './PromotionBadge';
import Testimonials from './Testimonials';
import { CheckCircle2, Loader2, ArrowRightCircle } from 'lucide-react';
interface Step2FormProps {
  data: PartnerFormData;
  onChange: (field: keyof PartnerFormData, value: any) => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  isProcessing: boolean;
  productPrice: number;
  regularPrice: number;
  currency: string;
}
const Step2Form: React.FC<Step2FormProps> = ({
  data,
  onChange,
  onPrevStep,
  onSubmit,
  isValid,
  isProcessing,
  productPrice,
  regularPrice,
  currency
}) => {
  return <div className="space-y-5 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
          Dane partnera <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 mb-3">Czas zaprosić swoją partnerkę/-ra. Nawet on/ona nie pozna Twoich odpowiedzi. Otrzymacie spersonalizowany raport</p>
        
      </div>
      
      <PromotionBadge regularPrice={regularPrice} currentPrice={productPrice} currency={currency} />

      <div className="mb-6 p-4 border border-green-600/30 bg-green-600/10 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-green-400 text-lg mb-1">100% Gwarancja Satysfakcji</h3>
            <p className="text-gray-300 text-sm">
              Jeśli raport nie spełni Twoich oczekiwań, zwrócimy Ci pieniądze w ciągu 14 dni. 
              Bez zbędnych pytań. To my podejmujemy całe ryzyko.
            </p>
          </div>
        </div>
      </div>

      <Input placeholder="Imię Twojej partnerki/partnera" value={data.partnerName} onChange={e => onChange('partnerName', e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" autoFocus />
      
      <Input placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)" type="email" value={data.partnerEmail} onChange={e => onChange('partnerEmail', e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />

      <div className="flex items-center gap-3 pt-3">
        <Checkbox id="ageConfirmation" checked={data.ageConfirmed} onCheckedChange={checked => onChange('ageConfirmed', !!checked)} className="h-4 w-4 border-white/40" />
        <Label htmlFor="ageConfirmation" className="text-gray-300 text-sm cursor-pointer">
          Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
        </Label>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onPrevStep} variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800">
          Wstecz
        </Button>
        
        <Button type="submit" disabled={isProcessing || !isValid} onClick={onSubmit} className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
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
      
      <Testimonials />
    </div>;
};
export default Step2Form;