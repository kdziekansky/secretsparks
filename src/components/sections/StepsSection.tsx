
import React from 'react';

const StepsSection = () => {
  return (
    <div className="py-12 bg-[#0B0B0E] rounded-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Krok po kroku</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="glass-card p-8 text-left">
          <div className="text-4xl font-bold text-primary mb-4">1</div>
          <h3 className="text-xl font-bold mb-3">Wypełnij ankietę</h3>
          <p className="text-muted-foreground">
            Odpowiedz na pytania dotyczące Twoich preferencji i pragnień seksualnych.
          </p>
        </div>
        
        <div className="glass-card p-8 text-left">
          <div className="text-4xl font-bold text-primary mb-4">2</div>
          <h3 className="text-xl font-bold mb-3">Zaproś partnera</h3>
          <p className="text-muted-foreground">
            Wyślij link do ankiety swojemu partnerowi, aby również mógł ją wypełnić.
          </p>
        </div>
        
        <div className="glass-card p-8 text-left">
          <div className="text-4xl font-bold text-primary mb-4">3</div>
          <h3 className="text-xl font-bold mb-3">Otrzymaj raport</h3>
          <p className="text-muted-foreground">
            Po wypełnieniu przez Was obu ankiety, otrzymacie spersonalizowany raport.
          </p>
        </div>
        
        <div className="glass-card p-8 text-left">
          <div className="text-4xl font-bold text-primary mb-4">4</div>
          <h3 className="text-xl font-bold mb-3">Odkryjcie siebie</h3>
          <p className="text-muted-foreground">
            Poznajcie swoje wspólne pragnienia i wprowadźcie je do waszego związku.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
