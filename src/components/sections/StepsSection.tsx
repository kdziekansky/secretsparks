
import React from 'react';

const StepsSection = () => {
  return (
    <div className="py-12 bg-[#0B0B0E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Krok po kroku</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">1</div>
            <h3 className="text-xl font-bold mb-3">Odkryj siebie</h3>
            <p className="text-muted-foreground">
              Odpowiedz szczerze na pytania ankiety w całkowitej prywatności, bez obaw o ocenę czy presję.
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">2</div>
            <h3 className="text-xl font-bold mb-3">Zaproś partnera/-kę</h3>
            <p className="text-muted-foreground">
              Prześlemy zaproszenie do wskazanej osoby, która wypełni ankietę, również z gwarancją poufności.
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">3</div>
            <h3 className="text-xl font-bold mb-3">Otrzymajcie raport</h3>
            <p className="text-muted-foreground">
              Otrzymaj unikalny raport i mapę do wspólnych uniesień, których nie zapomnicie na długo.
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">4</div>
            <h3 className="text-xl font-bold mb-3">Rozpocznij przygodę</h3>
            <p className="text-muted-foreground">
              Wykorzystaj otrzymane wskazówki, by wprowadzić nowy wymiar przyjemności do Waszej relacji.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
