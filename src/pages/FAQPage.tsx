
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
                <CardTitle className="text-xl text-primary">O Secret Sparks</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czym jest Secret Sparks?</AccordionTrigger>
                    <AccordionContent>
                      Secret Sparks to gra dla par, która pozwala odkryć wspólne pragnienia 
                      i fantazje poprzez serię pytań i ankiet. Pozwala partnerom w bezpieczny 
                      sposób poznać wzajemne preferencje i otworzyć się na nowe doświadczenia.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Dla kogo jest Secret Sparks?</AccordionTrigger>
                    <AccordionContent>
                      Secret Sparks jest idealna dla par w każdym wieku i na każdym etapie związku, 
                      które chcą pogłębić swoją bliskość i odkryć nowe wymiary intymności. 
                      Gra sprawdzi się zarówno dla par, które dopiero zaczynają swoją relację, 
                      jak i dla długoletnich związków szukających odświeżenia.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy Secret Sparks jest bezpieczna dla mojej prywatności?</AccordionTrigger>
                    <AccordionContent>
                      Tak, Twoja prywatność jest dla nas priorytetem. Wszystkie dane są zaszyfrowane, 
                      a Twoje odpowiedzi są widoczne tylko dla Ciebie i Twojego partnera. 
                      Nie udostępniamy żadnych danych osobowych stronom trzecim.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Korzystanie z gry</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-4" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jak zacząć grę?</AccordionTrigger>
                    <AccordionContent>
                      Aby rozpocząć, wystarczy wejść na stronę główną i kliknąć przycisk "Rozpocznij Grę". 
                      Następnie wypełnisz krótką ankietę o swoich preferencjach, a po dokonaniu płatności 
                      otrzymasz dostęp do pełnej wersji gry, którą możesz dzielić ze swoim partnerem.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę edytować swoje odpowiedzi po ich zapisaniu?</AccordionTrigger>
                    <AccordionContent>
                      Tak, możesz wrócić do poprzednich pytań i zmienić swoje odpowiedzi w trakcie 
                      wypełniania ankiety. Po zakończeniu i wygenerowaniu raportu, odpowiedzi są już finalne.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę zaprosić partnera do gry?</AccordionTrigger>
                    <AccordionContent>
                      Tak, po zakupie otrzymasz unikalny link, który możesz przesłać swojemu partnerowi. 
                      Po wypełnieniu przez niego ankiety, oboje otrzymacie dostęp do spersonalizowanego 
                      raportu dopasowanego do Waszych wspólnych preferencji.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Płatności i dostęp</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-7" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Ile kosztuje Secret Sparks?</AccordionTrigger>
                    <AccordionContent>
                      Secret Sparks to jednorazowa opłata w wysokości 99 zł, która daje Ci i Twojemu 
                      partnerowi pełny dostęp do gry, raportu i wszystkich materiałów.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jakie formy płatności są akceptowane?</AccordionTrigger>
                    <AccordionContent>
                      Akceptujemy płatności kartą kredytową/debetową, BLIK, oraz szybkie przelewy 
                      internetowe. Wszystkie płatności są bezpieczne i szyfrowane.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-9" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy mogę otrzymać zwrot pieniędzy?</AccordionTrigger>
                    <AccordionContent>
                      Ze względu na cyfrowy charakter produktu, nie oferujemy zwrotów pieniędzy po 
                      dokonaniu zakupu. Jeśli masz jakiekolwiek problemy techniczne, nasz zespół 
                      wsparcia jest gotowy pomóc.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-10" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jak długo mam dostęp do gry po zakupie?</AccordionTrigger>
                    <AccordionContent>
                      Po zakupie, masz bezterminowy dostęp do swojego spersonalizowanego raportu 
                      i wszystkich materiałów. Możesz wracać do nich kiedy tylko chcesz.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Wsparcie</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-11" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Jak mogę skontaktować się z obsługą klienta?</AccordionTrigger>
                    <AccordionContent>
                      Możesz skontaktować się z nami poprzez formularz kontaktowy na naszej stronie 
                      lub napisać bezpośrednio na adres pomoc@secretsparks.pl. Staramy się odpowiadać 
                      na wszystkie zapytania w ciągu 24 godzin.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-12" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">Czy oferujecie pomoc przy problemach technicznych?</AccordionTrigger>
                    <AccordionContent>
                      Tak, nasz zespół techniczny jest gotowy pomóc w przypadku jakichkolwiek problemów. 
                      Opisz dokładnie swój problem w wiadomości do nas, a postaramy się go rozwiązać 
                      jak najszybciej.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left">Czy mogę zasugerować nowe pytania lub funkcje?</AccordionTrigger>
                    <AccordionContent>
                      Oczywiście! Cenimy opinie naszych użytkowników. Możesz przesłać swoje sugestie 
                      za pomocą formularza kontaktowego. Regularnie aktualizujemy naszą bazę pytań 
                      i funkcjonalność w oparciu o feedback od społeczności.
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
