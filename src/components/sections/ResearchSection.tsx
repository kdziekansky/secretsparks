
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
            <h3 className="text-2xl font-bold mb-6">Nauka o relacjach</h3>
            <p className="text-lg mb-6">
              Psychologowie odkryli, że szczera komunikacja intymnych potrzeb jest kluczowym czynnikiem trwałości związków. Jednak 67% par przyznaje, że nigdy nie odbyło szczerej rozmowy o swoich głębszych pragnieniach.
            </p>
            <p className="text-lg">
              Secret Sparks tworzy pomost komunikacyjny, który pozwala bezpiecznie odkrywać wspólne zainteresowania bez ryzyka odrzucenia.
            </p>
          </div>
          
          {/* Side card */}
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Klucz do bliskości</h3>
            <p className="text-lg">
              Pary uczestniczące w badaniach Uniwersytetu Columbia, które regularnie odkrywały nowe wymiary intymności, wykazywały o 78% wyższy poziom ogólnej satysfakcji z relacji niż grupy kontrolne.
            </p>
            <div className="mt-auto pt-6">
              <p className="text-primary text-lg font-medium">78% silniejsza więź emocjonalna</p>
            </div>
          </div>
        </div>
        
        {/* 3 Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Głębokie połączenie</h3>
            <p className="text-lg">
              Wzajemne poznawanie intymnych potrzeb buduje więź wykraczającą poza fizyczność. Tworzy fundamenty zaufania, otwartości i autentycznego zaangażowania, które przekładają się na wszystkie aspekty związku.
            </p>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Chemia zaufania</h3>
            <p className="text-lg">
              Współdzielenie intymnych doświadczeń uwalnia w mózgu mieszankę neuroprzekaźników odpowiedzialnych za budowanie więzi, redukując lęk i zwiększając poczucie bezpieczeństwa w obecności partnera.
            </p>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Biologia bliskości</h3>
            <p className="text-lg">
              Eksperymenty z nowymi formami intymności stymulują układ limbiczny odpowiedzialny za emocje, zwiększając produkcję naturalnych związków poprawiających nastrój i wzmacniających odporność na stres.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
