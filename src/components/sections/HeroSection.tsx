
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Główna sekcja hero z obrazkiem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lewa kolumna - treść główna (szerokość 2/3) */}
          <div className="md:col-span-2 glass-card p-10 flex flex-col justify-center items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <p className="text-primary font-semibold uppercase">NOWY WYMIAR INTYMNEJ KOMUNIKACJI</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Porozumienie bez słów.
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-primary">Życie seksualne</span> na wyższym poziomie
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
              W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret 
              Sparks to przestrzeń, gdzie Twoje niewypowiedziane myśli spotykają się z
              pragnieniami partnera, tworząc mapę wspólnych uniesień.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-2">
              <Link to="/survey">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-auto rounded-md text-base">
                  Zamów raport
                </Button>
              </Link>
              
              <Link to="/zasady">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-2 h-auto rounded-md text-base">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Prawa kolumna - zdjęcie tła */}
          <div className="glass-card relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/d68fef22-dab7-4879-a55a-3e4e49d9e114.png" 
                alt="Secret Sparks" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Liczniki - 3 kolumny - zmniejszony odstęp mt-8 zamiast mt-12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">250+</h3>
            <p className="text-muted-foreground text-lg">Unikalnych scenariuszy i pomysłów na wzbogacenie Waszej intymnej relacji</p>
          </div>
          
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">100%</h3>
            <p className="text-muted-foreground text-lg">Gwarancja bezpieczeństwa danych i pełnej anonimowości każdej ankiety</p>
          </div>
          
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">5min</h3>
            <p className="text-muted-foreground text-lg">Szybka ankieta, której rezultaty zmienią Waszą relację na zawsze</p>
          </div>
        </div>

        {/* Sekcja funkcji - 3 kolumny - zmniejszony odstęp mt-8 zamiast mt-12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
              <Sparkles className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Odkryjcie siebie</h3>
            <p className="text-muted-foreground">
              Poznajcie siebie w nowym świetle. Ujawniamy te pragnienia, które Was łączą, tworząc mapę wspólnych fascynacji i otwierając drzwi do głębszej bliskości. Odkryjcie razem wymiary Waszej relacji, o których istnieniu nie wiedzieliście.
            </p>
          </div>
          
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
              <Heart className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Rozpalcie siebie nawzajem</h3>
            <p className="text-muted-foreground">
              Wprowadźcie element ekscytacji do swojego związku. Nasza aplikacja pomoże Wam przełamać rutynę i zbudować głębszą intymność opartą na wzajemnym zrozumieniu i autentycznym pożądaniu.
            </p>
          </div>
          
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
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
