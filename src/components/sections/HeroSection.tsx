
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main content - spans 2 columns */}
          <div className="md:col-span-2 glass-card p-10 md:p-12 flex flex-col justify-center items-start text-left">
            <div className="px-4 py-2 rounded-full bg-accent/20 inline-block mb-4">
              <p className="text-red-500 font-semibold uppercase">NOWY WYMIAR INTYMNEJ KOMUNIKACJI</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Porozumienie bez słów.
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-red-500">Życie seksualne</span> na wyższym poziomie
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
              W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret 
              Sparks to przestrzeń, gdzie Twoje niewypowiedziane myśli spotykają się z
              pragnieniami partnera, tworząc mapę wspólnych uniesień.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/survey">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 h-auto rounded-md text-base">
                  Rozpocznij Grę
                </Button>
              </Link>
              
              <Link to="/idea">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-2 h-auto rounded-md text-base">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right column - aplikacja mobilna */}
          <div className="glass-card flex items-center justify-center p-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/516d860c-2c12-44c6-b85c-5ad4d8016e9c.png" 
                alt="Aplikacja mobilna" 
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Stats section - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-16">
          <div className="bg-[#0D0E18] text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-red-500 mb-4">250+</h3>
            <p className="text-muted-foreground text-lg">Unikalnych scenariuszy i pomysłów na wzbogacenie Waszej intymnej relacji</p>
          </div>
          
          <div className="bg-[#0D0E18] text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-red-500 mb-4">100%</h3>
            <p className="text-muted-foreground text-lg">Gwarancja bezpieczeństwa danych i pełnej anonimowości każdej ankiety</p>
          </div>
          
          <div className="bg-[#0D0E18] text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-red-500 mb-4">5min</h3>
            <p className="text-muted-foreground text-lg">Szybka ankieta, której rezultaty zmienią Waszą relację na zawsze</p>
          </div>
        </div>

        {/* Features section - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass-card p-8 flex flex-col">
            <div className="text-red-500 mb-6">
              <Sparkles className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Odkryjcie siebie</h3>
            <p className="text-muted-foreground">
              Poznajcie siebie w zupełnie nowym świetle. Secret Sparks ujawnia te pragnienia, które łączą Was oboje, tworząc mapę wspólnych fascynacji i otwierając drzwi do głębszej bliskości.
            </p>
          </div>
          
          <div className="glass-card p-8 flex flex-col">
            <div className="text-red-500 mb-6">
              <Heart className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Rozpalcie siebie nawzajem</h3>
            <p className="text-muted-foreground">
              Wprowadźcie element ekscytacji do swojego związku. Nasza aplikacja pomoże Wam przełamać rutynę i zbudować głębszą intymność opartą na wzajemnym zrozumieniu i autentycznym pożądaniu.
            </p>
          </div>
          
          <div className="glass-card p-8 flex flex-col">
            <div className="text-red-500 mb-6">
              <Zap className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Eksplorujcie pragnienia</h3>
            <p className="text-muted-foreground">
              Twórzcie nowe wspomnienia w bezpiecznej przestrzeni wzajemnego zaufania. Od subtelnych sugestii po odważne propozycje – odkryjcie, jak ekscytująca może być wspólna eksploracja pragnień.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
