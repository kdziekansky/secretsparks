
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check, Menu, X, Sparkles, Heart, ExternalLink, Clock, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-[#05050a] text-foreground min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#05050a]/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/d54cd97a-3024-4d2f-87fd-23769403237c.png" 
              alt="Secret Sparks Logo" 
              className="h-10"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="nav-link">
              O nas
            </Link>
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link flex items-center">
                Więcej <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/survey" className="w-full">Ankieta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="w-full">Blog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          <div className="hidden md:block">
            <Link to="/survey">
              <Button className="btn-primary">
                Rozpocznij Grę
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 pb-6 border-t border-border/40 bg-[#05050a]">
            <nav className="flex flex-col space-y-4">
              <Link to="/about" className="nav-link-mobile">
                O nas
              </Link>
              <Link to="/faq" className="nav-link-mobile">
                FAQ
              </Link>
              <Link to="/survey" className="nav-link-mobile">
                Ankieta
              </Link>
              <Link to="/blog" className="nav-link-mobile">
                Blog
              </Link>
              <Link to="/survey">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/80 mt-2">
                  Rozpocznij Grę
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Main content - spans 2 columns */}
            <div className="md:col-span-2 glass-card p-8 md:p-10 flex flex-col justify-center items-center text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Rozumienie bez słów.<br />
                Życie seksualne na wyższym poziomie
              </h1>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret Sparks to przestrzeń, 
                gdzie Twoje niewypowiedziane myśli spotykają się z pragnieniami partnera.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/survey">
                  <Button className="btn-primary btn-large">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Side card */}
            <div className="glass-card flex items-center justify-center p-6">
              <div className="w-full max-w-[280px] h-[300px] mx-auto rounded-2xl flex items-center justify-center">
                <img 
                  src="/lovable-uploads/516d860c-2c12-44c6-b85c-5ad4d8016e9c.png" 
                  alt="Aplikacja mobilna" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* 3 Feature boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">
            <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-2">Odkryjcie siebie</h3>
              <p className="text-muted-foreground text-sm">
                Poznajcie siebie w zupełnie nowym świetle. Secret Sparks ujawnia pragnienia, 
                które łączą Was oboje.
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-2">Rozwijcie relację intymną</h3>
              <p className="text-muted-foreground text-sm">
                Wprowadźcie element ekscytacji do swojego związku. Nasza aplikacja pomoże Wam 
                przełamać rutynę.
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-2">Eksplorujcie pragnienia</h3>
              <p className="text-muted-foreground text-sm">
                Twórzcie nowe wspomnienia w bezpiecznej przestrzeni wzajemnego zaufania. Od subtelnych sugestii 
                po odważne propozycje.
              </p>
            </div>
          </div>
          
          {/* Statistics section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">
            <div className="glass-card text-center p-6 flex flex-col items-center justify-center">
              <h3 className="text-4xl font-bold text-primary mb-2">250+</h3>
              <p className="text-muted-foreground text-sm">Unikalnych scenariuszy i pomysłów</p>
            </div>
            
            <div className="glass-card text-center p-6 flex flex-col items-center justify-center">
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground text-sm">Gwarancja bezpieczeństwa danych</p>
            </div>
            
            <div className="glass-card text-center p-6 flex flex-col items-center justify-center">
              <h3 className="text-4xl font-bold text-primary mb-2">5min</h3>
              <p className="text-muted-foreground text-sm">Szybka ankieta, duże rezultaty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Tytuł sekcji</h2>
            <p className="text-muted-foreground">opis sekcji</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Main content - spans 2 columns */}
            <div className="md:col-span-2 glass-card p-8 flex items-center justify-center">
              <p className="text-center">Długoterminowe badania wykazują</p>
            </div>
            
            {/* Side card */}
            <div className="glass-card flex items-center justify-center p-6">
              <p className="text-center">Satysfakcja seksualna</p>
            </div>
          </div>
          
          {/* 3 Feature boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">
            <div className="glass-card p-6 flex items-center justify-center">
              <p className="text-center">Nie tylko orgazm</p>
            </div>
            
            <div className="glass-card p-6 flex items-center justify-center">
              <p className="text-center">Zmiany w mózgu</p>
            </div>
            
            <div className="glass-card p-6 flex items-center justify-center">
              <p className="text-center">Fizjologia namiętności</p>
            </div>
          </div>
        </div>
      </section>

      {/* Raport Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Nasz raport</h2>
            <p className="text-muted-foreground">opis sekcji</p>
          </div>
          
          {/* Full-width card */}
          <div className="glass-card p-8 mb-6 flex items-center justify-center">
            <p className="text-center">Co zawiera raport</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Main content - spans 2 columns */}
            <div className="md:col-span-2 glass-card p-8 flex items-center justify-center">
              <p className="text-center">Konfidencjalność</p>
            </div>
            
            {/* Side card */}
            <div className="glass-card flex items-center justify-center p-6">
              <p className="text-center">NAJBARDZIEJ EKSCYTUJĄCA GRA DLA PAR!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 border-t border-border/40 bg-card">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <img 
                  src="/lovable-uploads/d54cd97a-3024-4d2f-87fd-23769403237c.png" 
                  alt="Secret Sparks Logo" 
                  className="h-12"
                />
              </Link>
              <p className="text-muted-foreground max-w-xs">
                Gra dla par, która pomoże Wam odkryć wspólne pragnienia i fantazje.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-6">Nasza misja</h3>
              <p className="text-2xl font-serif mb-6">
                Sprawimy, że odkryjecie się na nowo
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-6">Promo alert</h3>
              <p className="text-muted-foreground mb-6">
                Odkryjcie nowe wymiary bliskości z grą Secret Sparks! Zapisz się do powiadomień 
                o naszych wyjątkowych promocjach.
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
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Polityka prywatności
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Warunki korzystania
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
