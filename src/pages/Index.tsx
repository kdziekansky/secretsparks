import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="glass-panel p-8 sm:p-12 max-w-xl w-full text-center animate-fade-in">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-secondary rounded-full text-sm font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Odkryjcie siebie na nowo
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-down" style={{ animationDelay: '0.5s' }}>
          Badanie preferencji
        </h1>
        
        <p className="text-muted-foreground mb-8 animate-slide-down" style={{ animationDelay: '0.7s' }}>
          Nie martw się, nic nie ujawnimy Twojej drugiej połówce odpowiedzi, a wszystkie dane usuniemy 7 dni po dostarczeniu Wam raportu. Otrzymasz kilkanaście pomysłów na urozmaicenie Waszego życia seksualnego. Zgodnych z Waszymi preferencjami
        </p>
        
        <Link 
          to="/survey" 
          className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full hover:opacity-90 transition-all duration-300 animate-slide-up"
          style={{ 
            backgroundColor: '#800000',
            animationDelay: '0.9s' 
          }}
        >
          <span>Wejdź do gry</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Index;