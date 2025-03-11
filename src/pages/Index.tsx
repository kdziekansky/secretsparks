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
      
      {/* Hero Section - Bento Grid Style */}
      <section className="section-padding pt-12 md:pt-16">
        <div className="section-container">
          {/* Main hero bento grid */}
          <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Featured main card - spans 2 columns on larger screens */}
            <div className="lg:col-span-2 bento-cell p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="hero-badge">
                  NOWY WYMIAR INTYMNEJ KOMUNIKACJI
                </div>
                <h1 className="hero-title">
                  Porozumienie bez słów. <span className="block"><span className="text-primary">Życie seksualne</span> na wyższym poziomie</span>
                </h1>
                <p className="hero-subtitle">
                  W każdym związku istnieją pragnienia, które trudno wyrazić na głos. Secret Sparks to przestrzeń, 
                  gdzie Twoje niewypowiedziane myśli spotykają się z pragnieniami partnera, tworząc mapę wspólnych uniesień.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/survey">
                  <Button className="btn-primary btn-large">
                    Rozpocznij Grę
                  </Button>
                </Link>
                <Button variant="outline" className="btn-secondary btn-large">
                  Dowiedz się więcej
                </Button>
              </div>
            </div>
            
            {/* Side card with app preview */}
            <div className="bento-cell items-center justify-center relative overflow-hidden">
              <div className="absolute -z-10 w-64 h-64 rounded-full bg-accent/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-full max-w-[280px] h-[400px] mx-auto bg-card rounded-2xl flex items-center justify-center border border-border/40">
                <img 
                  src="/lovable-uploads/516d860c-2c12-44c6-b85c-5ad4d8016e9c.png" 
                  alt="Aplikacja mobilna" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* Feature cards in grid - teraz z identycznymi odstępami */}
          <div className="bento-grid grid-cols-1 md:grid-cols-3 mt-8">
            <div className="bento-cell">
              <div className="bento-icon-container">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="bento-title">Odkryjcie siebie</h3>
              <p className="bento-text">
                Poznajcie siebie w zupełnie nowym świetle. Secret Sparks ujawnia te pragnienia, 
                które łączą Was oboje, tworząc mapę wspólnych fascynacji i otwierając drzwi do głębszej bliskości.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="bento-icon-container">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="bento-title">Rozpalcie siebie nawzajem</h3>
              <p className="bento-text">
                Wprowadźcie element ekscytacji do swojego związku. Nasza aplikacja pomoże Wam 
                przełamać rutynę i zbudować głębszą intymność opartą na wzajemnym zrozumieniu i autentycznym pożądaniu.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="bento-icon-container">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="bento-title">Eksplorujcie pragnienia</h3>
              <p className="bento-text">
                Twórzcie nowe wspomnienia w bezpiecznej przestrzeni wzajemnego zaufania. Od subtelnych sugestii 
                po odważne propozycje – odkryjcie, jak ekscytująca może być wspólna eksploracja pragnień.
              </p>
            </div>
          </div>
          
          {/* Statistics section - identyczny odstęp jak poprzednie sekcje */}
          <div className="bento-grid grid-cols-1 md:grid-cols-3 mt-8">
            <div className="bento-cell text-center py-8">
              <h3 className="text-4xl font-bold text-primary mb-3">250+</h3>
              <p className="text-muted-foreground">Unikalnych scenariuszy i pomysłów na wzbogacenie Waszej intymnej relacji</p>
            </div>
            
            <div className="bento-cell text-center py-8">
              <h3 className="text-4xl font-bold text-primary mb-3">100%</h3>
              <p className="text-muted-foreground">Gwarancja bezpieczeństwa danych i pełnej anonimowości każdej ankiety</p>
            </div>
            
            <div className="bento-cell text-center py-8">
              <h3 className="text-4xl font-bold text-primary mb-3">5min</h3>
              <p className="text-muted-foreground">Szybka ankieta, której rezultaty zmienią Waszą relację na zawsze</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Section - Bento Grid - Reduced spacing */}
      <section className="section-padding pt-8 md:pt-12">
        <div className="section-container">
          <h2 className="section-title">
            Naukowy punkt widzenia
          </h2>
          
          <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured scientific insight */}
            <div className="lg:col-span-2 bento-cell">
              <div className="flex items-start gap-6">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Długoterminowe badania wykazują</h3>
                  <p className="text-muted-foreground mb-6">
                    Pary, które często uprawiają seks, wzmacniają więź i lojalność wobec siebie. 
                    Badania wskazują, że regularna i satysfakcjonująca aktywność seksualna może 
                    prowadzić do bardziej stabilnej relacji.
                  </p>
                  <Link to="/survey" className="text-primary hover:underline flex items-center">
                    Zacznij teraz <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Scientific points */}
            <div className="bento-cell">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Satysfakcja seksualna</h3>
              <p className="text-muted-foreground">
                Satysfakcja seksualna jest istotną składową oceny jakości życia. 
                Naukowcy wykazują ścisłą korelację pomiędzy życiem seksualnym a jakością zdrowia.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Nie tylko orgazm</h3>
              <p className="text-muted-foreground">
                Satysfakcja seksualna to pojęcie znacznie szersze niż dążenie do osiągnięcia orgazmu; 
                to wielowymiarowe doświadczenie.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Zmiany w mózgu</h3>
              <p className="text-muted-foreground">
                Pogłębianie namiętności powoduje zmiany w mózgu: wytwarza się oksytocyna - hormon 
                bliskości oraz wzrasta poziom dopaminy.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fizjologia namiętności</h3>
              <p className="text-muted-foreground">
                Fizjologia uczuć seksualnych jest zakorzeniona w układzie limbicznym mózgu.
                To tam powstają sygnały prowadzące do wzbudzenia pożądania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Bento Timeline - Reduced spacing */}
      <section className="section-padding pt-8 md:pt-12">
        <div className="section-container">
          <h2 className="section-title">
            Krok po kroku
          </h2>
          
          <div className="bento-grid grid-cols-1 md:grid-cols-4">
            <div className="bento-cell">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Zaczynasz grę</h3>
              <p className="text-muted-foreground">
                Odpowiadasz szczerze na pytania i podajesz email swój oraz partnera. 
                Twoje odpowiedzi pozostają prywatne.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Zaprosź partnera</h3>
              <p className="text-muted-foreground">
                Twój partner otrzymuje email z zaproszeniem i odpowiada na te same pytania, 
                zachowując prywatność.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Otrzymujecie raport</h3>
              <p className="text-muted-foreground">
                Oboje dostajecie dostęp do raportu zawierającego tylko te fantazje, 
                które oboje uznaliście za atrakcyjne.
              </p>
            </div>
            
            <div className="bento-cell">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-4">Odkrycie siebie</h3>
              <p className="text-muted-foreground">
                Teraz wszystko w Waszych rękach – czas zacząć realizować wspólne fantazje!
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/survey">
              <Button className="btn-primary btn-large text-lg px-10 py-6">
                Rozpocznij Grę
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Security Section - Bento Grid - Reduced spacing */}
      <section className="section-padding pt-8 md:pt-12">
        <div className="section-container">
          <div className="bento-grid grid-cols-1 md:grid-cols-3">
            {/* Main security card */}
            <div className="md:col-span-2 bento-cell p-8 md:p-10">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Bezpieczeństwo Waszych danych to nasz priorytet
              </h2>
              <p className="text-muted-foreground mb-8">
                Tworząc grę Secret Sparks zawsze stawiamy na pierwszym miejscu bezpieczeństwo 
                danych naszych użytkowników.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="check-container">
                    <Check className="green-check" />
                  </div>
                  <p>Szyfrowane połączenie SSL</p>
                </div>
                <div className="flex items-center">
                  <div className="check-container">
                    <Check className="green-check" />
                  </div>
                  <p>Brak sprzedaży danych</p>
                </div>
                <div className="flex items-center">
                  <div className="check-container">
                    <Check className="green-check" />
                  </div>
                  <p>Usuwanie danych po 7 dniach</p>
                </div>
                <div className="flex items-center">
                  <div className="check-container">
                    <Check className="green-check" />
                  </div>
                  <p>Zgodność z RODO</p>
                </div>
              </div>
            </div>
            
            {/* Side illustration */}
            <div className="bento-cell flex items-center justify-center">
              <div className="w-full h-[300px] bg-accent/10 rounded-2xl flex items-center justify-center border border-border/40 overflow-hidden">
                <img 
                  src="/lovable-uploads/a4798506-21aa-4666-805f-130a6259f84f.png" 
                  alt="Bezpieczeństwo danych" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section - Reduced spacing */}
      <section className="section-padding pt-8 md:pt-12 pb-24 md:pb-32 text-center">
        <div className="section-container">
          <div className="mx-auto p-12 rounded-3xl glass-panel animate-fade-in">
            <div className="hero-badge">
              NAJBARDZIEJ EKSCYTUJĄCA GRA DLA PAR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Odkrycie siebie na nowo
            </h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-3xl mx-auto">
              Poznajcie swoje ukryte pragnienia i potrzeby.
              Już dziś możecie sprawdzić, co Was łączy, czego dotąd jeszcze nie odkryliście.
            </p>
            
            <Link to="/survey">
              <Button className="btn-primary btn-large text-lg px-10 py-6">
                Rozpocznij Grę
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 border-t border-border/40">
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
