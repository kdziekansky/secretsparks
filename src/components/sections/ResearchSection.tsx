
import React from 'react';
import { BookOpen, Brain, HeartHandshake, Sparkles, Flame } from 'lucide-react';

const ResearchSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Co mówią badania</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main content - spans 2 columns */}
          <div className="md:col-span-2 glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Długoterminowe badania wykazują</h3>
            <p className="text-lg mb-6">
              Pary, które regularnie komunikują swoje potrzeby i pragnienia seksualne, doświadczają 
              wyższego poziomu satysfakcji ze związku oraz lepszego samopoczucia psychicznego. Jednak 
              wiele osób ma trudności z rozpoczęciem takich rozmów.
            </p>
            <p className="text-lg">
              Secret Sparks pomaga przełamać tę barierę, umożliwiając bezpieczne i prywatne 
              wyrażenie swoich pragnień, a następnie połączenie ich z pragnieniami partnera.
            </p>
          </div>
          
          {/* Side card */}
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Satysfakcja seksualna</h3>
            <p className="text-lg">
              Badania pokazują, że pary dzielące się swoimi pragnieniami seksualnymi 
              doświadczają o 78% wyższego poziomu satysfakcji seksualnej niż pary, 
              które unikają tego tematu.
            </p>
            <div className="mt-auto pt-6">
              <p className="text-primary text-lg font-medium">78% wyższa satysfakcja seksualna</p>
            </div>
          </div>
        </div>
        
        {/* 3 Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Nie tylko orgazm</h3>
            <p className="text-lg">
              Intymność to nie tylko orgazm. Badania wskazują, że eksperymentowanie i 
              wypróbowywanie nowych doznań seksualnych prowadzi do głębszego 
              połączenia emocjonalnego.
            </p>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Zmiany w mózgu</h3>
            <p className="text-lg">
              Neuronauka wykazała, że dzielenie się intymnymi pragnieniami aktywuje 
              obszary mózgu związane z przyjemnością i zaufaniem, wzmacniając więź 
              między partnerami.
            </p>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Fizjologia namiętności</h3>
            <p className="text-lg">
              Regularna, satysfakcjonująca aktywność seksualna prowadzi do wzrostu 
              poziomu oxytocyny i endorfin, zwanych hormonami szczęścia i miłości.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
