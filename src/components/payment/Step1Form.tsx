
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle } from 'lucide-react';
import { UserFormData } from './types';
import BenefitsSection from './BenefitsSection';
import { Shield, CheckCircle2 } from 'lucide-react';

interface Step1FormProps {
  data: UserFormData;
  onChange: (field: keyof UserFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  productPrice: number;
  regularPrice: number;
  currency: string;
}

const Step1Form: React.FC<Step1FormProps> = ({
  data,
  onChange,
  onSubmit,
  isValid,
  productPrice,
  regularPrice,
  currency
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
          Twoje dane <span className="text-red-500 ml-2">❤️</span>
        </h1>
        <p className="text-gray-300 mb-4">
          Najpierw potrzebujemy Twoich danych, aby wysłać Ci raport po zakończeniu.
        </p>
      </div>
      
      <Input 
        placeholder="Twoje imię" 
        value={data.userName} 
        onChange={(e) => onChange('userName', e.target.value)} 
        className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" 
        autoFocus
      />
      
      <Input 
        placeholder="Twój e-mail (tam wyślemy raport)" 
        type="email" 
        value={data.userEmail} 
        onChange={(e) => onChange('userEmail', e.target.value)} 
        className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" 
      />
      
      <Button 
        onClick={onSubmit} 
        disabled={!isValid} 
        className={`w-full py-6 rounded-full text-lg mt-6 flex items-center justify-center gap-2 ${isValid ? 'bg-primary hover:bg-primary/90' : 'bg-gray-700'}`}
      >
        Kontynuuj
        <ArrowRightCircle className="h-5 w-5" />
      </Button>
      
      <BenefitsSection />
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex items-center gap-2 bg-[#111] p-3 rounded-md">
          <div className="bg-primary/20 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="text-sm text-gray-300">
            <p className="font-medium text-white">Bezpieczna płatność</p>
            <p>SSL & 3D Secure</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#111] p-3 rounded-md">
          <div className="bg-primary/20 p-2 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div className="text-sm text-gray-300">
            <p className="font-medium text-white">Ponad 500 par</p>
            <p>odkryło swoje pragnienia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
