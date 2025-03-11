
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div className="bg-white text-gray-800">
      {/* Header/Nawigacja */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-purple-800"></div>
            <span className="text-xl font-bold text-purple-800">Secret Sparks</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/idea" className="text-sm font-medium text-gray-600 hover:text-purple-800">Idea</Link>
            <Link to="/zasady-gry" className="text-sm font-medium text-gray-600 hover:text-purple-800">Zasady gry</Link>
            <Link to="/priveai" className="text-sm font-medium text-gray-600 hover:text-purple-800">PrivéAI™</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-gray-600 hover:text-purple-800 flex items-center">
                Więcej <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/o-nas" className="w-full">O nas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/kontakt" className="w-full">Kontakt</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/regulamin" className="w-full">Regulamin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          <Link to="/survey">
            <Button className="rounded-full bg-purple-800 hover:bg-purple-900">Rozpocznij Grę</Button>
          </Link>
        </div>
      </header>

      {/* Sekcja główna / Hero */}
      <section className="min-h-[90vh] flex items-center py-20 md:py-32 container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">
          <div>
            <div className="uppercase text-sm font-medium text-gray-500 mb-3">GRA DLA PAR</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Przenieście <span className="block">Wasze <span className="text-pink-600">życie seksualne</span> na</span> wyższy poziom
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Dzięki tej grze odkryjecie swoje skryte pragnienia. Poznacie wzajemne preferencje w bezpieczny sposób, nie mówiąc o nich wprost.
            </p>
            <p className="text-gray-600 mb-10 text-lg">
              To bardzo proste - najpierw grasz Ty, a następnie zaprosisz do zabawy swoją drugą połówkę. Gorący finał będzie Waszym wspólnym doświadczeniem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/survey">
                <Button className="rounded-full bg-purple-800 hover:bg-purple-900 px-8 py-6 text-base">
                  Rozpocznij Grę
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full px-8 py-6">
                Dowiedz się więcej
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Placeholder na ilustrację - telefon z aplikacją i grafiką pary */}
            <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
              [Ilustracja: Telefon z aplikacją]
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja wieczór dla Was */}
      <section className="min-h-[80vh] flex items-center py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                Ekscytujący wieczór tylko dla Was
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                Pozwólcie sobie na otwartość i szczerość, bez obaw o presję i dyskomfort. 
                Secret Sparks to przepis na wieczór pełen ekscytacji i wzajemnego zrozumienia.
              </p>
              <Link to="/survey">
                <Button className="rounded-full bg-purple-800 hover:bg-purple-900 px-8 py-6 text-base">
                  Rozpocznij Grę
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              {/* Placeholder na ilustrację pary */}
              <div className="w-full h-[350px] md:h-[450px] bg-gray-100 rounded-lg flex items-center justify-center">
                [Ilustracja: Para]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja 100+ sposobów */}
      <section className="min-h-[80vh] flex items-center py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="uppercase text-sm font-medium text-gray-500 mb-3">PRZEŻYJCIE RAZEM COŚ WYJĄTKOWEGO</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-20 max-w-4xl mx-auto">
            Ponad 100 sposobów na wspólną zabawę i rozpalenie namiętności!
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <div className="p-6">
              <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Poznajcie się na nowo!</h3>
              <p className="text-gray-600 text-lg">
                Odkryjcie nieznane dotąd pragnienia i marzenia Waszych partnerów. 
                Secret Sparks pozwoli Wam spojrzeć na siebie z nowej perspektywy i zbudować głębszą więź.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Podkręćcie temperaturę w sypialni...</h3>
              <p className="text-gray-600 text-lg">
                Dodajcie iskry do Waszych intymnych chwil.
                Gra wprowadza ekscytujące elementy, które sprawią, że każdy wieczór będzie pełen
                namiętności i nowych emocji.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">...i poza nią</h3>
              <p className="text-gray-600 text-lg">
                Odkrywajcie nowe miejsca zarówno w domu, jak i poza nim, ciesząc się
                ekscytującymi chwilami wszędzie tam, gdzie poniesie Was wyobraźnia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja naukowa */}
      <section className="min-h-[90vh] flex items-center py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="flex justify-center">
              {/* Placeholder na ilustrację pary */}
              <div className="w-full h-[350px] md:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                [Ilustracja: Para]
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                Naukowy punkt widzenia
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                Pary, które często uprawiają seks, wzmacniają więź i lojalność wobec siebie. 
                Badania wskazują, że regularna i satysfakcjonująca aktywność seksualna może 
                prowadzić do bardziej stabilnej relacji, a chemiczne procesy zachodzące w 
                organizmie w trakcie stosunku wyjaśniają to zjawisko.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-100 mr-5 flex items-center justify-center shrink-0">
                    <span className="text-green-600">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Satysfakcja seksualna</h3>
                    <p className="text-gray-600 text-base">
                      Satysfakcja seksualna jest istotną składową oceny jakości życia. 
                      Naukowcy coraz częściej wykazują ścisłą korelację pomiędzy życiem 
                      seksualnym a jakością zdrowia i życia.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-100 mr-5 flex items-center justify-center shrink-0">
                    <span className="text-purple-600">💫</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Nie tylko orgazm</h3>
                    <p className="text-gray-600 text-base">
                      Satysfakcja seksualna to pojęcie znacznie szersze niż dążenie do osiągnięcia orgazmu; 
                      to wielowymiarowe doświadczenie z udziałem myśli, uczuć, osobistych postaw i przekonań.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 mr-5 flex items-center justify-center shrink-0">
                    <span className="text-blue-600">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zmiany w mózgu</h3>
                    <p className="text-gray-600 text-base">
                      Pogłębianie namiętności powoduje zmiany w mózgu: wytwarza się oksytocyna - hormon 
                      bliskości oraz wzrasta poziom dopaminy, odpowiedzialnej za przyjemność i motywację do działania.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-800 hover:bg-purple-900 px-8 py-6 text-base">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sekcja krok po kroku */}
      <section className="min-h-[90vh] flex items-center py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Krok po kroku</h2>
          <p className="text-gray-600 mb-20 max-w-2xl mx-auto text-lg">
            Zobacz, jakie to proste. Tylko kilka kroków dzieli Cię od ekscytującej przygody.
          </p>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Linia łącząca kroki */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>
            
            <div className="grid md:grid-cols-4 gap-10 md:gap-16">
              <div className="relative">
                <div className="mb-8 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-gray-800 text-white flex items-center justify-center z-10 relative">
                    <span className="text-3xl">📱</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">Krok 1</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Zaczynasz grę</h3>
                <p className="text-gray-600 text-lg">
                  Odpowiadasz na zestaw pytań - szczerze i bez wstydu. Podajesz e-mail swój oraz e-mail osoby, którą chcesz zaprosić do gry. Twój partner / partnerka nie zobaczy Twoich odpowiedzi.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-8 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-gray-800 text-white flex items-center justify-center z-10 relative">
                    <span className="text-3xl">💌</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">Krok 2</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Zaproś Twojego partnera</h3>
                <p className="text-gray-600 text-lg">
                  Twój partner / partnerka otrzymuje e-maila z zaproszeniem do gry. W grze odpowiada na te same pytania co Ty, zachowując pełną prywatność.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-8 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-gray-800 text-white flex items-center justify-center z-10 relative">
                    <span className="text-3xl">📊</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">Krok 3</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Otrzymujecie raport</h3>
                <p className="text-gray-600 text-lg">
                  Oboje otrzymujecie e-maila z dostępem do Waszego raportu. Raport, generowany przez sztuczną inteligencję, zawiera wyłącznie te czynności i fantazje, które oboje uznaliście za atrakcyjne.
                </p>
              </div>
              
              <div className="relative">
                <div className="mb-8 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-gray-800 text-white flex items-center justify-center z-10 relative">
                    <span className="text-3xl">✨</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">Krok 4</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Odkrycie siebie na nowo</h3>
                <p className="text-gray-600 text-lg">
                  Teraz wszystko w Waszych rękach – nadszedł moment, by zacząć realizować wspólne fantazje! ❤️
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-20">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-yellow-400 text-3xl">★</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Sekcja bezpieczeństwa */}
      <section className="min-h-[80vh] flex items-center py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                Bezpieczeństwo Waszych danych to nasz priorytet
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                Tworząc grę Secret Sparks zawsze stawiamy na pierwszym miejscu bezpieczeństwo 
                danych naszych użytkowników.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Check className="h-6 w-6 mr-4 text-green-500" />
                  <p className="text-lg">Korzystamy z szyfrowanego połączenia SSL</p>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 mr-4 text-green-500" />
                  <p className="text-lg">Nie sprzedajemy Waszych danych osobowych</p>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 mr-4 text-green-500" />
                  <p className="text-lg">Po 7 dniach od zakończenia gry dane osobowe są trwale usuwane</p>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 mr-4 text-green-500" />
                  <p className="text-lg">Nie wysyłamy spamu</p>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 mr-4 text-green-500" />
                  <p className="text-lg">Jesteśmy zgodni z RODO</p>
                </div>
              </div>
              
              <div className="mt-10">
                <Link to="/survey">
                  <Button className="rounded-full bg-purple-800 hover:bg-purple-900 px-8 py-6 text-base">
                    Rozpocznij Grę
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center">
              {/* Placeholder na ilustrację bezpieczeństwa */}
              <div className="w-full h-[350px] md:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                [Ilustracja: Bezpieczne dane]
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sekcja CTA końcowa */}
      <section className="min-h-[60vh] flex items-center py-24 md:py-32 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="uppercase text-sm font-medium text-gray-500 mb-4">NAJBARDZIEJ EKSCYTUJĄCA GRA DLA PAR</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Odkrycie siebie na nowo
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg md:text-xl">
            Poznajcie swoje ukryte pragnienia i potrzeby.
            Już dziś możecie sprawdzić, co Was łączy, czego dotąd jeszcze nie odkryliście.
          </p>
          
          <Link to="/survey">
            <Button className="rounded-full bg-purple-800 hover:bg-purple-900 px-10 py-7 text-lg">
              Rozpocznij Grę
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Stopka */}
      <footer className="py-20 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 md:gap-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-full bg-purple-800"></div>
                <span className="text-xl font-bold text-purple-800">Secret Sparks</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Idea</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Zasady gry</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">PrivéAI™</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Zespół</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Kontakt</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Regulamin</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Polityka Prywatności</Link>
                <Link to="#" className="block text-sm text-gray-600 hover:text-purple-800">Obowiązek informacyjny RODO</Link>
              </div>
            </div>
            
            <div>
              <h3 className="uppercase text-sm font-medium text-gray-500 mb-6">NASZA MISJA</h3>
              <p className="text-2xl font-serif mb-6">
                Sprawimy, że odkryjecie się na nowo
              </p>
            </div>
            
            <div>
              <h3 className="uppercase text-sm font-medium text-gray-500 mb-6">PROMO ALERT</h3>
              <p className="text-gray-600 mb-8">
                Odkryjcie nowe wymiary bliskości z grą Secret Sparks! Zapisz się do powiadomień o naszych wyjątkowych promocjach i nie przegap okazji na niezapomniane chwile we dwoje.
              </p>
              
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Wpisz swój e-mail" 
                  className="rounded-l-full border border-gray-300 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                />
                <button className="rounded-r-full bg-purple-800 text-white px-5 py-3 hover:bg-purple-900">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-sm text-gray-500">
            © 2025 Secret Sparks™. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
