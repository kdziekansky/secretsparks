import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HeartHandshake, Sparkles, Zap, HelpCircle } from 'lucide-react';

const RulesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05050a] to-[#121217]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-center mb-6">Secret Sparks</h1>
          <Separator className="my-8" />
          
          {/* Na czym polega Secret Sparks */}
          <section className="mb-12">
            <Card className="border-accent/30 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Na czym polega Secret Sparks?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="text-base">
                  Secret Sparks to aplikacja stworzona z myślą o parach, które chcą bezpiecznie i dyskretnie odkrywać
                  nowe obszary swojego życia intymnego. Każdy z partnerów wypełnia krótki, anonimowy kwestionariusz –
                  dzięki temu żadne osobiste odpowiedzi nie są udostępniane drugiej osobie. Secret AI analizuje preferencje
                  seksualne, mapę związku, a następnie prezentuje spersonalizowany raport i praktyczne podpowiedzi, jak
                  ulepszyć Wasze życie seksualne.
                </p>
              </CardContent>
            </Card>
          </section>
          
          {/* Jak korzystać z Secret Sparks */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Jak korzystać z Secret Sparks?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-accent/30 bg-card/40 backdrop-blur h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <CardTitle className="text-lg font-bold">Wypełnij ankietę</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Każdy z partnerów samodzielnie wypełnia ankietę, oceniając na skali od 1 do 4 swoją ekscytację 
                    i zgodność do kompromisu różnymi rodzajami aktywności intymnych.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/30 bg-card/40 backdrop-blur h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <CardTitle className="text-lg font-bold">Zaproś partnera</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Po wypełnieniu swojej ankiety, wyślemy Twojej partnerce/partnerowi specjalny link, 
                    który pozwoli na wypełnienie drugiej części ankiety.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/30 bg-card/40 backdrop-blur h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <CardTitle className="text-lg font-bold">Otrzymacie raport</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Po wypełnieniu ankiety przez obie osoby, otrzymacie spersonalizowany raport zawierający 
                    analizę Waszego życia seksualnego i konkretne wskazówki. Raport będzie zawierał tylko te 
                    aktywności, którymi oboje jesteście zainteresowani.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/30 bg-card/40 backdrop-blur h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <CardTitle className="text-lg font-bold">Odkryjcie seks na nowo</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Potraktujcie to jako punkt wyjścia do podniesienia jakości swojego życia seksualnego, 
                    wdrażajcie wytyczne z raportu w życie i podnieście swoją satysfakcję o kilkadziesiąt procent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Poziomy gry */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Poziomy gry</h2>
            <p className="text-muted-foreground mb-6">
              Secret Sparks oferuje trzy poziomy zaawansowania, dopasowane do Waszych preferencji i gotowości do eksploracji:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-accent/30 bg-card/40 backdrop-blur hover:bg-card/60 transition-all h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 bg-yellow-100/10 rounded-full flex items-center justify-center mr-3">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">Discover</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Dla par, które chcą odkryć podstawowe fantazje i urozmaicić swoją relację intymną.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/30 bg-card/40 backdrop-blur hover:bg-card/60 transition-all h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 bg-orange-100/10 rounded-full flex items-center justify-center mr-3">
                      <HeartHandshake className="h-5 w-5 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">Explore</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Dla par, które są gotowe na głębsze eksplorowanie swoich fantazji i pragnień.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/30 bg-card/40 backdrop-blur hover:bg-card/60 transition-all h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 bg-purple-100/10 rounded-full flex items-center justify-center mr-3">
                      <Zap className="h-5 w-5 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">Exceed</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Dla odważnych par, które chcą przekraczać granice i odkrywać nietypowe doznania.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Najczęściej zadawane pytania */}
          <section>
            <div className="flex items-center mb-6">
              <HelpCircle className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Najczęściej zadawane pytania</h2>
            </div>
            
            <Card className="border-accent/30 bg-card/40 backdrop-blur">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left text-base font-medium">
                      Czy mój partner/partnerka zobaczy moje odpowiedzi?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Nie, Twoje indywidualne odpowiedzi pozostają całkowicie prywatne. 
                      Partner/partnerka nigdy nie zobaczy Twoich konkretnych wyborów. 
                      W raporcie przedstawiamy jedynie wspólne obszary zainteresowań, 
                      bez ujawniania indywidualnych preferencji.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left text-base font-medium">
                      Jak długo trwa wypełnianie ankiety?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Wypełnienie ankiety zajmuje średnio 5-10 minut. Zależy to od wybranego 
                      poziomu (Discover, Explore lub Exceed) oraz od tego, ile czasu poświęcisz 
                      na przemyślenie każdego pytania. Warto poświęcić na to zadanie odpowiednią 
                      ilość czasu, aby uzyskać jak najbardziej precyzyjne wyniki.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left text-base font-medium">
                      Czy mogę zmienić swoje odpowiedzi po ich zapisaniu?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Tak, podczas wypełniania ankiety możesz swobodnie wracać do poprzednich 
                      pytań i zmieniać swoje odpowiedzi. Jednak po zakończeniu ankiety i 
                      wygenerowaniu raportu, odpowiedzi zostają zablokowane i nie ma możliwości 
                      ich zmiany. W razie potrzeby, zawsze możesz wypełnić nową ankietę.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left text-base font-medium">
                      Jak długo mam dostęp do raportu?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Po wygenerowaniu raportu, masz do niego bezterminowy dostęp. Raport jest 
                      przesyłany na podany adres email, dzięki czemu możesz do niego wracać 
                      kiedy tylko chcesz. Dla Twojego bezpieczeństwa i prywatności, wszystkie 
                      dane ankietowe są usuwane z naszych serwerów po 7 dniach od wygenerowania 
                      raportu, ale sam raport pozostaje dostępny dla Ciebie.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RulesPage;
