import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sparkles, HeartHandshake, Zap, HelpCircle } from 'lucide-react';

const RulesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-center">Secret Sparks</h1>
        <Separator className="my-8" />
        
        {/* Na czym polega Secret Sparks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Na czym polega Secret Sparks?</h2>
          <Card className="border-[#333] bg-[#0B0B0E]">
            <CardContent className="p-6">
              <p className="text-gray-300">
                Secret Sparks to aplikacja stworzona z myślą o parach, które chcą bezpiecznie i dyskretnie odkrywać
                nowe obszary swojego życia intymnego. Każdy z partnerów wypełnia krótki, anonimowy kwestionariusz –
                dzięki temu żadne osobiste odpowiedzi nie są udostępniane drugiej osobie. Secret AI analizuje preferencje
                seksualne, mapę związku, a następnie prezentuje spersonalizowany raport i praktyczne podpowiedzi, jak
                ulepszyć Wasze życie seksualne.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Jak korzystać z Secret Sparks - poziomy układ z numerami */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Jak korzystać z Secret Sparks?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Krok 1 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Wypełnij ankietę</h3>
              </div>
              <p className="text-sm text-gray-400">
                Każdy z partnerów samodzielnie wypełnia ankietę, oceniając na skali od 1 do 4 swoją ekscytację 
                i zgodność do kompromisu różnymi rodzajami aktywności intymnych.
              </p>
            </div>
            
            {/* Krok 2 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Zaproś partnera</h3>
              </div>
              <p className="text-sm text-gray-400">
                Po wypełnieniu ankiety otrzymasz link do wysłania partnerce/partnerowi, 
                aby mógł wypełnić swoją część. Dzięki temu Secret AI stworzy raport.
              </p>
            </div>
            
            {/* Krok 3 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Otrzymacie raport</h3>
              </div>
              <p className="text-sm text-gray-400">
                Po zakończeniu obu ankiet otrzymacie raport z analizą Waszego życia seksualnego i wskazówkami. 
                Zawiera on tylko te aktywności, którymi oboje będziecie zainteresowani.
              </p>
            </div>
            
            {/* Krok 4 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold">Odkryjcie seks na nowo</h3>
              </div>
              <p className="text-sm text-gray-400">
                Potraktujcie to jako punkt wyjścia do urozmaicenia życia intymnego. 
                Wdrażając sugestie z raportu, możecie podnieść poziom satysfakcji i bliskości w związku.
              </p>
            </div>
          </div>
        </section>
        
        {/* Poziomy gry */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Poziomy gry</h2>
          <p className="text-gray-400 mb-8">
            Secret Sparks oferuje trzy poziomy zaawansowania, dopasowane do Waszych preferencji i gotowości do eksploracji:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discover */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">Discover</h3>
              </div>
              <p className="text-sm text-gray-400">
                Dla par, które chcą odkryć podstawowe fantazje i urozmaicić swoją relację intymną.
              </p>
            </div>
            
            {/* Explore */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                  <HeartHandshake className="h-4 w-4 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">Explore</h3>
              </div>
              <p className="text-sm text-gray-400">
                Dla par, które są gotowe na głębsze eksplorowanie swoich fantazji i pragnień.
              </p>
            </div>
            
            {/* Exceed */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Exceed</h3>
              </div>
              <p className="text-sm text-gray-400">
                Dla odważnych par, które chcą przekraczać granice i odkrywać nietypowe doznania.
              </p>
            </div>
          </div>
        </section>
        
        {/* Najczęściej zadawane pytania */}
        <section>
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold">Najczęściej zadawane pytania</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                Czy mój partner/partnerka zobaczy moje odpowiedzi?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Nie, Twoje indywidualne odpowiedzi pozostają całkowicie prywatne. 
                Partner/partnerka nigdy nie zobaczy Twoich konkretnych wyborów. 
                W raporcie przedstawiamy jedynie wspólne obszary zainteresowań, 
                bez ujawniania indywidualnych preferencji.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                Jak długo trwa wypełnianie ankiety?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Wypełnienie ankiety zajmuje średnio 5-10 minut. Zależy to od wybranego 
                poziomu (Discover, Explore lub Exceed) oraz od tego, ile czasu poświęcisz 
                na przemyślenie każdego pytania. Warto poświęcić na to zadanie odpowiednią 
                ilość czasu, aby uzyskać jak najbardziej precyzyjne wyniki.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                Czy mogę zmienić swoje odpowiedzi po ich zapisaniu?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Tak, podczas wypełniania ankiety możesz swobodnie wracać do poprzednich 
                pytań i zmieniać swoje odpowiedzi. Jednak po zakończeniu ankiety i 
                wygenerowaniu raportu, odpowiedzi zostają zablokowane i nie ma możliwości 
                ich zmiany. W razie potrzeby, zawsze możesz wypełnić nową ankietę.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left py-4">
                Jak długo mam dostęp do raportu?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Po wygenerowaniu raportu, masz do niego bezterminowy dostęp. Raport jest 
                przesyłany na podany adres email, dzięki czemu możesz do niego wracać 
                kiedy tylko chcesz. Dla Twojego bezpieczeństwa i prywatności, wszystkie 
                dane ankietowe są usuwane z naszych serwerów po 7 dniach od wygenerowania 
                raportu, ale sam raport pozostaje dostępny dla Ciebie.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default RulesPage;
