
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main content - spans 2 columns */}
          <div className="md:col-span-2 glass-card p-10 md:p-12 flex flex-col justify-center items-start text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rozumienie bez słów.<br />
              Życie seksualne na wyższym poziomie
            </h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
              W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret Sparks to przestrzeń, 
              gdzie Twoje niewypowiedziane myśli spotykają się z pragnieniami partnera.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/survey">
                <Button className="btn-primary btn-large">
                  Rozpocznij Grę
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Side card */}
          <div className="glass-card flex items-center justify-center p-8">
            <div className="w-full h-[340px] rounded-2xl flex items-center justify-center">
              <img 
                src="/lovable-uploads/516d860c-2c12-44c6-b85c-5ad4d8016e9c.png" 
                alt="Aplikacja mobilna" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
