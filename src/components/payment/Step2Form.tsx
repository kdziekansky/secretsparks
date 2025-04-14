
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { PartnerFormData } from './types';
import { Loader2, ArrowRightCircle, Star } from 'lucide-react';

interface Step2FormProps {
  data: PartnerFormData;
  onChange: (field: keyof PartnerFormData, value: any) => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  isProcessing: boolean;
}

const Step2Form: React.FC<Step2FormProps> = ({
  data,
  onChange,
  onPrevStep,
  onSubmit,
  isValid,
  isProcessing
}) => {
  return <div className="space-y-5 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
          Dane partnera <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 mb-3">Czas zaprosić swoją partnerkę/-ra. Nawet on/ona nie pozna Twoich odpowiedzi. Otrzymacie spersonalizowany raport</p>
      </div>

      <Input placeholder="Imię Twojej partnerki/partnera" value={data.partnerName} onChange={e => onChange('partnerName', e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" autoFocus />
      
      <Input placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)" type="email" value={data.partnerEmail} onChange={e => onChange('partnerEmail', e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />

      <div className="flex items-center gap-3 pt-3">
        <Checkbox id="ageConfirmation" checked={data.ageConfirmed} onCheckedChange={checked => onChange('ageConfirmed', !!checked)} className="h-4 w-4 border-white/40" />
        <Label htmlFor="ageConfirmation" className="text-gray-300 text-sm cursor-pointer">
          Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
        </Label>
      </div>
      
      {/* Opinie klientów */}
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium text-white">Co mówią inni:</h3>
        
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">MK</div>
            <div>
              <p className="text-white text-sm font-medium">Marek i Kasia</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"Dzięki ankiecie odkryliśmy swoje ukryte fantazje. To zupełnie odmieniło nasze życie intymne!"</p>
        </div>
        
        <div className="bg-[#111] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">DM</div>
            <div>
              <p className="text-white text-sm font-medium">Daniel i Magda</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"Po 7 latach związku myśleliśmy, że już nic nas nie zaskoczy... Ta ankieta pokazała nam, jak bardzo się myliliśmy!"</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onPrevStep} variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800">
          Wstecz
        </Button>
        
        <div className="flex flex-col items-end">
          <Button type="submit" disabled={isProcessing || !isValid} onClick={onSubmit} className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 w-full">
            {isProcessing ? <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Przetwarzanie...
              </> : <>
                <span>Przejdź do podsumowania</span>
                <ArrowRightCircle className="h-5 w-5" />
              </>}
          </Button>
          <span className="text-primary font-medium text-sm mt-1">tylko 29 zł</span>
        </div>
      </div>
    </div>;
};

export default Step2Form;
