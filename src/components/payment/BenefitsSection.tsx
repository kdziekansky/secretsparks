
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">Co otrzymasz?</h2>
      <div className="space-y-3">
        {[
          'Spersonalizowane wskazówki i scenariusze dopasowane do Was',
          'Praktyczne podpowiedzi i gotowe scenariusze na wspólny wieczór',
          'Wzmocnienie bliskości i zrozumienia partnera',
          '100% dyskrecji - tylko Wy zobaczycie wyniki, dane usuwamy'
        ].map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-5 w-5 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-gray-200">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
