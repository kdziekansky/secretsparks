import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { LockKeyhole, ShieldCheck, Clock, HeartHandshake, Star, CreditCard, ArrowRight, HelpCircle, Eye } from 'lucide-react';

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Najczęściej zadawane pytania</h1>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <LockKeyhole className="h-5 w-5 mr-2" />
                  Prywatność i bezpieczeństwo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="priv-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mój partner/partnerka zobaczy moje odpowiedzi z ankiety?</AccordionTrigger>
                    <AccordionContent>
                      Absolutnie nie. Secret Sparks gwarantuje pełną anonimowość i prywatność Twoich odpowiedzi. Twój partner nigdy nie zobaczy Twoich indywidualnych wyborów - dostępne będą tylko te aktywności, które oboje oceniliście pozytywnie. Dzięki temu możesz być całkowicie szczery/a w swoich odpowiedziach bez obaw o ocenę czy presję.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="priv-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jak długo przechowujecie moje dane?</AccordionTrigger>
                    <AccordionContent>
                      Dbamy o Twoją prywatność. Wszystkie dane ankietowe są automatycznie usuwane z naszych serwerów po 7 dniach od wygenerowania raportu. Nie przechowujemy danych dłużej niż to konieczne do realizacji usługi. Sam raport zostaje wysłany na Twój adres email, dzięki czemu masz do niego bezterminowy dostęp.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="priv-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy moje odpowiedzi są bezpieczne?</AccordionTrigger>
                    <AccordionContent>
                      Tak, wszystkie dane są szyfrowane i przechowywane z najwyższymi standardami bezpieczeństwa. Stosujemy szyfrowanie end-to-end, a nasza infrastruktura jest regularnie testowana pod kątem bezpieczeństwa. Nigdy nie udostępniamy Twoich danych stronom trzecim ani nie wykorzystujemy ich do celów marketingowych bez Twojej zgody.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <HeartHandshake className="h-5 w-5 mr-2" />
                  Ankieta i raport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="survey-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Co znajdę w raporcie Secret Sparks?</AccordionTrigger>
                    <AccordionContent>
                      Raport Secret Sparks zawiera: analizę Waszych wspólnych preferencji, mapę dopasowania i zróżnicowania w podejściu do seksualności, konkretne scenariusze i aktywności, które mogą podnieść Waszą intymną bliskość, oraz praktyczne wskazówki jak wprowadzić je w życie. Raport jest całkowicie spersonalizowany - oparty wyłącznie na Waszych wspólnych zainteresowaniach.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Co jeśli moje preferencje nie pokrywają się z preferencjami partnera/ki?</AccordionTrigger>
                    <AccordionContent>
                      To całkowicie normalne - każda para ma różnice w preferencjach. Secret Sparks koncentruje się na obszarach, gdzie Wasze zainteresowania się spotykają, nawet jeśli jest ich niewiele. W takim przypadku raport skupi się na tych wspólnych punktach i zaproponuje sposoby na rozwijanie tej części Waszego życia intymnego. Czasem odkrycie nawet kilku wspólnych obszarów może otworzyć zupełnie nowy rozdział w relacji.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jak długo trwa wypełnianie ankiety?</AccordionTrigger>
                    <AccordionContent>
                      Wypełnienie ankiety zajmuje średnio 5-10 minut, w zależności od wybranego poziomu (Discover, Explore lub Exceed). Nie ma ograniczenia czasowego, możesz przemyśleć każde pytanie tak długo, jak potrzebujesz. Zalecamy znalezienie spokojnego momentu, kiedy nikt Ci nie przeszkadza, aby Twoje odpowiedzi były jak najbardziej szczere i przemyślane.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-4" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę przerwać ankietę i dokończyć ją później?</AccordionTrigger>
                    <AccordionContent>
                      Tak, możesz przerwać wypełnianie ankiety w dowolnym momencie i wrócić do niej później. Twoje odpowiedzi są automatycznie zapisywane po każdym pytaniu. Po prostu użyj tego samego urządzenia i przeglądarki, aby kontynuować od miejsca, w którym skończyłeś/aś.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Płatności i logistyka
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Ile kosztuje Secret Sparks i co zawiera cena?</AccordionTrigger>
                    <AccordionContent>
                      Secret Sparks to jednorazowa opłata w wysokości 29 zł. W cenę wliczony jest dostęp do ankiety dla obojga partnerów, generowanie spersonalizowanego raportu oraz bezterminowy dostęp do wyników. Nie ma żadnych ukrytych opłat ani abonamentów - płacisz raz i korzystasz z pełnej funkcjonalności.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jakie metody płatności są akceptowane?</AccordionTrigger>
                    <AccordionContent>
                      Akceptujemy różnorodne metody płatności, w tym: karty kredytowe i debetowe (Visa, Mastercard), BLIK, przelewy internetowe przez większość polskich banków oraz portfele elektroniczne (Google Pay, Apple Pay). Wszystkie płatności są zabezpieczone i szyfrowane.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Co się stanie, jeśli mój partner/ka nie wypełni swojej ankiety?</AccordionTrigger>
                    <AccordionContent>
                      Aby wygenerować raport, oboje partnerzy muszą wypełnić ankietę. Jeśli Twój partner nie wypełni swojej części, raport nie zostanie wygenerowany. W takim przypadku możesz ponownie przesłać zaproszenie lub skontaktować się z naszym zespołem wsparcia, który pomoże rozwiązać problem. Twoja płatność jest ważna przez 30 dni, co daje wystarczająco dużo czasu na wypełnienie ankiety przez oboje partnerów.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-4">
                    <AccordionTrigger className="text-left">Czy oferujecie zwroty pieniędzy?</AccordionTrigger>
                    <AccordionContent>
                      Ze względu na cyfrowy charakter naszego produktu, co do zasady nie oferujemy zwrotów po dokonaniu zakupu i wygenerowaniu raportu. Jeśli jednak masz problemy techniczne lub raport nie został wygenerowany z powodu błędu systemu, prosimy o kontakt z naszym zespołem wsparcia - rozpatrzymy każdy przypadek indywidualnie i postaramy się znaleźć satysfakcjonujące rozwiązanie.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Inne pytania
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="other-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę wypełnić ankietę bez partnera/ki?</AccordionTrigger>
                    <AccordionContent>
                      Tak, możesz wypełnić swoją część ankiety samodzielnie. Jednak aby otrzymać pełny, spersonalizowany raport, Twój partner/ka również musi wypełnić swoją część. Jeśli obecnie nie jesteś w związku, możesz odwiedzić naszą stronę, gdy będziesz gotowy/a na wspólne doświadczenie.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy Secret Sparks jest odpowiedni dla par LGBT+?</AccordionTrigger>
                    <AccordionContent>
                      Tak, Secret Sparks jest zaprojektowany z myślą o wszystkich rodzajach par. Nasze ankiety i raporty są tworzone w sposób inkluzywny i neutralny płciowo, aby każda para mogła znaleźć wartościowe wskazówki dla swojego związku. Podczas konfiguracji możesz wybrać odpowiednie preferencje płciowe.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę wykorzystać Secret Sparks jako prezent dla mojej pary?</AccordionTrigger>
                    <AccordionContent>
                      Oczywiście! Secret Sparks to doskonały i oryginalny prezent dla par - zarówno na rocznice, walentynki jak i bez okazji. Podczas zamawiania możesz wybrać opcję "zapakuj na prezent", aby otrzymać specjalny kod i instrukcję, jak podarować tę wyjątkową przygodę swojemu partnerowi/partnerce.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-4">
                    <AccordionTrigger className="text-left">Jak mogę skontaktować się z zespołem wsparcia?</AccordionTrigger>
                    <AccordionContent>
                      Nasz zespół wsparcia jest dostępny pod adresem email: contact@secretsparks.pl. Zazwyczaj odpowiadamy w ciągu 24 godzin w dni robocze. W wiadomości prosimy o podanie adresu email, który został użyty przy zakupie (jeśli dotyczy), aby szybciej zidentyfikować Twoje zamówienie.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
