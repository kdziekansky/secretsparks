
import React from 'react';

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-16">
      <div className="glass-card text-center p-8 flex flex-col items-center justify-center">
        <h3 className="text-5xl font-bold text-primary mb-4">250+</h3>
        <p className="text-muted-foreground text-lg">Unikalnych scenariuszy i pomysłów</p>
      </div>
      
      <div className="glass-card text-center p-8 flex flex-col items-center justify-center">
        <h3 className="text-5xl font-bold text-primary mb-4">100%</h3>
        <p className="text-muted-foreground text-lg">Gwarancja bezpieczeństwa danych</p>
      </div>
      
      <div className="glass-card text-center p-8 flex flex-col items-center justify-center">
        <h3 className="text-5xl font-bold text-primary mb-4">5min</h3>
        <p className="text-muted-foreground text-lg">Szybka ankieta, duże rezultaty</p>
      </div>
    </div>
  );
};

export default StatsSection;
