
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/40" style={{ backgroundColor: "#08080C" }}>
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="border-r border-border/10 pr-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" 
                alt="Secret Sparks Logo" 
                className="h-36" 
              />
            </Link>
            <p className="text-muted-foreground max-w-xs text-left">
              Mapa waszego życia seksualnego, która wniesie nową energię
            </p>
          </div>
          
          <div className="text-left border-r border-border/10 pr-8">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-6">Nasza misja</h3>
            <p className="text-2xl font-serif mb-6">
              Naszym celem jest zwiększenie Waszej satysfakcji
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-6">Zapisz się</h3>
            <p className="text-muted-foreground mb-6">
              Zapisz się, otrzymuj porady za darmo oraz dowiedz się o naszych promocjach jako pierwszy.
            </p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="Wpisz swój e-mail" 
                className="rounded-l-full border border-border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
              />
              <button className="rounded-r-full bg-primary text-primary-foreground px-5 py-3 hover:bg-primary/80">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Secret Sparks. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex gap-6">
            <Link to="/polityka-prywatnosci" className="text-sm text-muted-foreground hover:text-primary">
              Polityka prywatności
            </Link>
            <Link to="/regulamin" className="text-sm text-muted-foreground hover:text-primary">
              Warunki korzystania
            </Link>
            <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-primary">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
