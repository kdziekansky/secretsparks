import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check, Menu, X } from 'lucide-react';
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
    <div className="bg-white text-gray-800">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-purple-700"></div>
            <span className="text-xl font-bold text-purple-700">Secret Sparks</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-purple-700">
              O nas
            </Link>
            <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-purple-700">
              FAQ
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-gray-600 hover:text-purple-700 flex items-center">
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
              className="text-gray-700 p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          <div className="hidden md:block">
            <Link to="/survey">
              <Button className="rounded-full bg-purple-700 hover:bg-purple-800">
                Rozpocznij Grę
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 pb-6 border-t bg-white">
            <nav className="flex flex-col space-y-4">
              <Link to="/about" className="text-gray-600 hover:text-purple-700 py-2">
                O nas
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-purple-700 py-2">
                FAQ
              </Link>
              <Link to="/survey" className="text-gray-600 hover:text-purple-700 py-2">
                Ankieta
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-purple-700 py-2">
                Blog
              </Link>
              <Link to="/survey">
                <Button className="w-full rounded-full bg-purple-700 hover:bg-purple-800 mt-2">
                  Rozpocznij Grę
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-2">
                GRA DLA PAR
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Przenieście <span className="block">Wasze <span className="text-purple-600">życie seksualne</span> na</span> wyższy poziom
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
                Dzięki tej grze odkryjecie swoje skryte pragnienia w bezpieczny sposób, 
                bez konieczności mówienia o nich wprost.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-8 py-6 text-base">
                    Rozpocznij Grę
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6">
                  Dowiedz się więcej
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -z-10 w-64 h-64 rounded-full bg-purple-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-full h-[450px] bg-gray-100 rounded-2xl flex items-center justify-center">
                  [Ilustracja: Telefon z aplikacją]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Ponad 100 sposobów na wspólną zabawę i rozpalenie namiętności
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Poznajcie się na nowo</h3>
              <p className="text-gray-600">
                Odkryjcie nieznane dotąd pragnienia i marzenia Waszych partnerów. 
                Secret Sparks pozwoli Wam spojrzeć na siebie z nowej perspektywy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Podkręćcie temperaturę</h3>
              <p className="text-gray-600">
                Dodajcie iskry do Waszych intymnych chwil.
                Gra wprowadza ekscytujące elementy, które sprawią, że każdy wieczór 
                będzie pełen namiętności.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Odkrywajcie nowe miejsca</h3>
              <p className="text-gray-600">
                Eksplorujcie nowe możliwości zarówno w domu, jak i poza nim, 
                ciesząc się ekscytującymi chwilami wszędzie tam, gdzie poniesie Was wyobraźnia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intimate Evening Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2">
              <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
                [Ilustracja: Para]
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ekscytujący wieczór tylko dla Was
              </h2>
              <p className="text-gray-600 text-lg">
                Pozwólcie sobie na otwartość i szczerość, bez obaw o presję i dyskomfort. 
                Secret Sparks to przepis na wieczór pełen ekscytacji i wzajemnego zrozumienia.
              </p>
              <div className="pt-4">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-6 py-5">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scientific Section */}
      <section className="py-20 md:py-32 bg-purple-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            <div className="md:w-1/2">
              <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
                [Ilustracja: Para]
              </div>
            </div>
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Naukowy punkt widzenia
              </h2>
              <p className="text-gray-600">
                Pary, które często uprawiają seks, wzmacniają więź i lojalność wobec siebie. 
                Badania wskazują, że regularna i satysfakcjonująca aktywność seksualna może 
                prowadzić do bardziej stabilnej relacji.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <span className="text-purple-600">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Satysfakcja seksualna</h3>
                    <p className="text-gray-600">
                      Satysfakcja seksualna jest istotną składową oceny jakości życia. 
                      Naukowcy wykazują ścisłą korelację pomiędzy życiem seksualnym a jakością zdrowia.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <span className="text-purple-600">💫</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Nie tylko orgazm</h3>
                    <p className="text-gray-600">
                      Satysfakcja seksualna to pojęcie znacznie szersze niż dążenie do osiągnięcia orgazmu; 
                      to wielowymiarowe doświadczenie.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <span className="text-purple-600">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zmiany w mózgu</h3>
                    <p className="text-gray-600">
                      Pogłębianie namiętności powoduje zmiany w mózgu: wytwarza się oksytocyna - hormon 
                      bliskości oraz wzrasta poziom dopaminy.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-6 py-5">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Krok po kroku</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Zobacz, jakie to proste. Tylko kilka kroków dzieli Cię od ekscytującej przygody.
          </p>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Line connecting steps */}
            <div className="absolute top-16 left-14 right-14 h-0.5 bg-purple-100 hidden md:block"></div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-700 text-white flex items-center justify-center z-10 relative">
                    <span className="text-xl">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Zaczynasz grę</h3>
                <p className="text-gray-600">
                  Odpowiadasz szczerze na pytania i podajesz email swój oraz partnera. Twoje odpowiedzi pozostają prywatne.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-700 text-white flex items-center justify-center z-10 relative">
                    <span className="text-xl">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Zaprosź partnera</h3>
                <p className="text-gray-600">
                  Twój partner otrzymuje email z zaproszeniem i odpowiada na te same pytania, zachowując prywatność.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-700 text-white flex items-center justify-center z-10 relative">
                    <span className="text-xl">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Otrzymujecie raport</h3>
                <p className="text-gray-600">
                  Oboje dostajecie dostęp do raportu zawierającego tylko te fantazje, które oboje uznaliście za atrakcyjne.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-700 text-white flex items-center justify-center z-10 relative">
                    <span className="text-xl">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Odkrycie siebie</h3>
                <p className="text-gray-600">
                  Teraz wszystko w Waszych rękach – czas zacząć realizować wspólne fantazje!
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-yellow-400 text-2xl">★</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section className="py-20 md:py-32 bg-purple-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2">
              <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
                [Ilustracja: Bezpieczne dane]
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Bezpieczeństwo Waszych danych to nasz priorytet
              </h2>
              <p className="text-gray-600">
                Tworząc grę Secret Sparks zawsze stawiamy na pierwszym miejscu bezpieczeństwo 
                danych naszych użytkowników.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p>Korzystamy z szyfrowanego połączenia SSL</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p>Nie sprzedajemy Waszych danych osobowych</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p>Po 7 dniach dane osobowe są trwale usuwane</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p>Nie wysyłamy spamu</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p>Jesteśmy zgodni z RODO</p>
                </div>
              </div>
              
              <div className="pt-6">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-6 py-5">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-24 md:py-32 text-center bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              NAJBARDZIEJ EKSCYTUJĄCA GRA DLA PAR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Odkrycie siebie na nowo
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Poznajcie swoje ukryte pragnienia i potrzeby.
              Już dziś możecie sprawdzić, co Was łączy, czego dotąd jeszcze nie odkryliście.
            </p>
            
            <Link to="/survey">
              <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-10 py-6 text-lg">
                Rozpocznij Grę
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-purple-700"></div>
                <span className="text-xl font-bold text-purple-700">Secret Sparks</span>
              </Link>
              <p className="text-gray-500 max-w-xs">
                Gra dla par, która pomoże Wam odkryć wspólne pragnienia i fantazje.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-6">Nasza misja</h3>
              <p className="text-2xl font-serif mb-6">
                Sprawimy, że odkryjecie się na nowo
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-6">Promo alert</h3>
              <p className="text-gray-600 mb-6">
                Odkryjcie nowe wymiary bliskości z grą Secret Sparks! Zapisz się do powiadomień 
                o naszych wyjątkowych promocjach.
              </p>
              
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Wpisz swój e-mail" 
                  className="rounded-l-full border border-gray-300 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                />
                <button className="rounded-r-full bg-purple-700 text-white px-5 py-3 hover:bg-purple-800">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2025 Secret Sparks. Wszelkie prawa zastrzeżone.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-purple-700">
                Polityka prywatności
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-purple-700">
                Warunki korzystania
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-purple-700">
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