
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const RulesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05050a] to-[#121217]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-center">Zasady gry Secret Sparks</h1>
          <Separator className="my-8" />
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Idea gry</h2>
            <p className="text-muted-foreground">
              Secret Sparks to wyjątkowa gra dla par, która pomaga odkryć wspólne pragnienia i fantazje erotyczne w bezpieczny i dyskretny sposób. 
              Korzystając z zaawansowanych algorytmów AI, Secret Sparks analizuje odpowiedzi obu partnerów, aby zidentyfikować obszary wspólnych zainteresowań.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">Jak grać?</h2>
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">1. Wypełnij ankietę</h3>
                <p className="text-muted-foreground">
                  Każdy z partnerów samodzielnie wypełnia ankietę, oceniając na skali od 1 do 5 swoje zainteresowanie różnymi rodzajami aktywności intymnych.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">2. Zaproś partnera</h3>
                <p className="text-muted-foreground">
                  Po wypełnieniu swojej ankiety, wyślij partnerce/partnerowi specjalny link, który pozwoli na wypełnienie drugiej części ankiety.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">3. Otrzymaj spersonalizowany raport</h3>
                <p className="text-muted-foreground">
                  Po wypełnieniu ankiety przez obie osoby, otrzymacie spersonalizowany raport zawierający analizę Waszych wspólnych preferencji. Raport będzie zawierał tylko te aktywności, którymi oboje jesteście zainteresowani.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">4. Odkryjcie nowe wymiary bliskości</h3>
                <p className="text-muted-foreground">
                  Wykorzystajcie raport jako punkt wyjścia do szczerej rozmowy i odkrywania nowych wymiarów Waszej relacji intymnej.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">Poziomy gry</h2>
            <p className="text-muted-foreground mb-4">
              Secret Sparks oferuje trzy poziomy zaawansowania, dopasowane do odwagi i otwartości Waszej relacji:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">Discover</h3>
                <p className="text-muted-foreground">
                  Poziom dla par, które chcą odkryć podstawowe fantazje i urozmaicić swoją relację intymną.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">Explore</h3>
                <p className="text-muted-foreground">
                  Dla par, które są gotowe na głębsze eksplorowanie swoich fantazji i pragnień.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-xl font-medium mb-2">Exceed</h3>
                <p className="text-muted-foreground">
                  Dla odważnych par, które chcą przekraczać granice i odkrywać bardziej intensywne i nietypowe doznania.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">Zasady bezpieczeństwa</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Zawsze respektujcie granice i komfort partnera/partnerki</li>
              <li>Ustalcie słowo bezpieczeństwa przed wprowadzaniem nowych aktywności</li>
              <li>Komunikujcie swoje odczucia i wrażenia na bieżąco</li>
              <li>Pamiętajcie, że wszystkie aktywności powinny być dobrowolne i sprawiać przyjemność obu stronom</li>
              <li>W przypadku aktywności wymagających dodatkowej wiedzy, zapoznajcie się z odpowiednimi materiałami edukacyjnymi</li>
            </ul>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RulesPage;
