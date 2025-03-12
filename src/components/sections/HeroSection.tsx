
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Main content - lewa kolumna */}
          <div className="glass-card p-10 md:p-12 flex flex-col justify-center items-start text-left">
            <p className="text-red-500 font-semibold uppercase mb-4">NOWY WYMIAR INTYMNEJ KOMUNIKACJI</p>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Porozumienie bez słów.
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
              Życie seksualne <span className="text-white">na wyższym poziomie</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
              W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret 
              Sparks to przestrzeń, gdzie Twoje niewypowiedziane myśli spotykają się z
              pragnieniami partnera, tworząc mapę wspólnych uniesień.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/survey">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-6 h-auto rounded-md text-base">
                  Rozpocznij Grę
                </Button>
              </Link>
              
              <Link to="/idea">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-6 h-auto rounded-md text-base">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right column - aplikacja mobilna */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/516d860c-2c12-44c6-b85c-5ad4d8016e9c.png" 
                alt="Aplikacja mobilna" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
