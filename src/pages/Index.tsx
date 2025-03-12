import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check, Menu, X, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="bg-[#05050a] text-foreground min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#05050a]/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/25599b28-a9cd-4147-b81d-a11f3f31e9e0.png" 
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
          
          {/* Krok po kroku */}
          <div className="mt-16 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Krok po kroku</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="glass-card p-8 text-left">
                <div className="text-4xl font-bold text-primary mb-4">1</div>
                <h3 className="text-xl font-bold mb-3">Wypełnij ankietę</h3>
                <p className="text-muted-foreground">
                  Odpowiedz na pytania dotyczące Twoich preferencji i pragnień seksualnych.
                </p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <div className="text-4xl font-bold text-primary mb-4">2</div>
                <h3 className="text-xl font-bold mb-3">Zaproś partnera</h3>
                <p className="text-muted-foreground">
                  Wyślij link do ankiety swojemu partnerowi, aby również mógł ją wypełnić.
                </p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <div className="text-4xl font-bold text-primary mb-4">3</div>
                <h3 className="text-xl font-bold mb-3">Otrzymaj raport</h3>
                <p className="text-muted-foreground">
                  Po wypełnieniu przez Was obu ankiety, otrzymacie spersonalizowany raport.
                </p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <div className="text-4xl font-bold text-primary mb-4">4</div>
                <h3 className="text-xl font-bold mb-3">Odkryjcie siebie</h3>
                <p className="text-muted-foreground">
                  Poznajcie swoje wspólne pragnienia i wprowadźcie je do waszego związku.
                </p>
              </div>
            </div>
          </div>
          
          {/* Statystyki */}
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
        </div>
      </section>

      {/* Badania */}
      <section className="section-padding bg-[#070711]">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Co mówią badania</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Main content - spans 2 columns */}
            <div className="md:col-span-2 glass-card p-10 flex flex-col items-start text-left">
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
              <h3 className="text-2xl font-bold mb-6">Nie tylko orgazm</h3>
              <p className="text-lg">
                Intymność to nie tylko orgazm. Badania wskazują, że eksperymentowanie i 
                wypróbowywanie nowych doznań seksualnych prowadzi do głębszego 
                połączenia emocjonalnego.
              </p>
            </div>
            
            <div className="glass-card p-10 flex flex-col items-start text-left">
              <h3 className="text-2xl font-bold mb-6">Zmiany w mózgu</h3>
              <p className="text-lg">
                Neuronauka wykazała, że dzielenie się intymnymi pragnieniami aktywuje 
                obszary mózgu związane z przyjemnością i zaufaniem, wzmacniając więź 
                między partnerami.
              </p>
            </div>
            
            <div className="glass-card p-10 flex flex-col items-start text-left">
              <h3 className="text-2xl font-bold mb-6">Fizjologia namiętności</h3>
              <p className="text-lg">
                Regularna, satysfakcjonująca aktywność seksualna prowadzi do wzrostu 
                poziomu oxytocyny i endorfin, zwanych hormonami szczęścia i miłości.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Raport Section */}
      <section className="section-padding bg-[#070711]">
        <div className="section-container">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left">Nasz raport</h2>
          
          {/* Two-column layout with consistent height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Left column */}
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-8 text-left">Co zawiera raport</h3>
              
              <div className="space-y-8 flex-grow">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Wspólne pragnienia</h4>
                    <p className="text-muted-foreground text-lg">Lista aktywności, które oboje chcecie wypróbować.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Obszary do poznania</h4>
                    <p className="text-muted-foreground text-lg">Tematy, które warto omówić, aby zbliżyć się do siebie.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Propozycje i scenariusze</h4>
                    <p className="text-muted-foreground text-lg">Gotowe pomysły na wykorzystanie wspólnych pragnień.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Email editor mockup */}
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-8 text-center">Otrzymaj spersonalizowany raport</h3>
              <p className="text-lg text-muted-foreground text-center mb-8">
                Raport zostanie przygotowany specjalnie dla Was, na podstawie Waszych odpowiedzi.
                Otrzymasz go na podany adres e-mail.
              </p>
              
              {/* Email editor interface - dostosowane wymiary */}
              <div className="bg-[#0c0c14] border border-gray-800 rounded-xl overflow-hidden shadow-xl mx-auto w-full flex-grow flex flex-col">
                {/* Email content area */}
                <div className="p-4 bg-[#0f0f17] flex-grow flex flex-col">
                  <div className="bg-[#161622] rounded-lg p-4 shadow-sm flex-grow flex flex-col">
                    {/* From field */}
                    <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                      <div className="w-24 text-gray-400 text-sm">Od:</div>
                      <div className="text-gray-300">team@secretsparks.pl</div>
                    </div>
                    
                    {/* To field */}
                    <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                      <div className="w-24 text-gray-400 text-sm">Do:</div>
                      <div className="flex items-center bg-gray-700/30 rounded-full px-3 py-1 text-sm">
                        <Users className="h-3.5 w-3.5 mr-1.5" />
                        <span>Ty i Twój partner</span>
                      </div>
                    </div>
                    
                    {/* Subject field */}
                    <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                      <div className="w-24 text-gray-400 text-sm">Temat:</div>
                      <div className="text-gray-300">Wasz raport Secret Sparks</div>
                    </div>
                    
                    {/* Email content preview */}
                    <div className="flex-grow rounded-md overflow-hidden flex flex-col">
                      <div className="flex-grow bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center min-h-[120px]">
                        <div className="bg-gray-700/40 h-16 w-16 rounded-full flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-white/70" />
                        </div>
                      </div>
                      <div className="p-4 bg-white text-black">
                        <p className="text-gray-600 text-sm italic">Naciśnij "Rozpocznij grę", aby otrzymać swój spersonalizowany raport...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/20 to-accent/30 mt-10 md:mt-0">
            <h3 className="text-2xl font-bold mb-6">ODKRYJ WSPÓLNE PRAGNIENIA JUŻ DZIŚ!</h3>
            <p className="text-lg mb-8 max-w-2xl">
              Rozpocznij grę i otrzymaj szczegółowy raport, który pomoże Wam lepiej się zrozumieć i zbliżyć do siebie.
            </p>
            <Link to="/survey" className="w-full max-w-sm">
              <Button className="btn-primary btn-large w-full text-lg py-6">
                Rozpocznij Grę
              </Button>
            </Link>
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
                  src="/lovable-uploads/25599b28-a9cd-4147-b81d-a11f3f31e9e0.png" 
                  alt="Secret Sparks Logo" 
                  className="h-12"
                />
              </Link>
              <p className="text-muted-foreground max-w-xs text-left">
                Gra dla par, która pomoże Wam odkryć wspólne pragnienia i fantazje.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-6">Nasza misja</h3>
              <p className="text-2xl font-serif mb-6">
                Sprawimy, że odkryjecie się na nowo
              </p>
            </div>
            
            <div className="text-left">
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
