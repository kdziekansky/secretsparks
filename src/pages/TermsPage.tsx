
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05050a] to-[#121217]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-center">Regulamin serwisu Secret Sparks</h1>
          <p className="text-center text-muted-foreground">Ostatnia aktualizacja: 14.03.2025</p>
          <Separator className="my-8" />
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§1 Postanowienia ogólne</h2>
            <p className="text-muted-foreground">
              Regulamin określa zasady świadczenia usług drogą elektroniczną za pośrednictwem serwisu internetowego Secret Sparks („Serwis").
            </p>
            <p className="text-muted-foreground">
              Administratorem Serwisu jest KDY PROJECT z siedzibą w Fiszewie 12/3, 82-335 Gronowo Elbląskie, kontakt: contact@secretsparks.pl.
            </p>
            <p className="text-muted-foreground">
              Niniejszy regulamin stanowi integralną część umowy zawieranej między Administratorem a Użytkownikiem.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§2 Definicje</h2>
            <p className="text-muted-foreground">
              Administrator – KDY PROJECT z siedzibą w Fiszewie 12/3, 82-335 Gronowo Elbląskie.
            </p>
            <p className="text-muted-foreground">
              Serwis – serwis internetowy działający pod domeną secretsparks.pl.
            </p>
            <p className="text-muted-foreground">
              Użytkownik – osoba fizyczna korzystająca z usług Serwisu.
            </p>
            <p className="text-muted-foreground">
              Usługa – usługa świadczona elektronicznie polegająca na generowaniu spersonalizowanych raportów na podstawie ankiety wypełnianej przez Użytkownika.
            </p>
            <p className="text-muted-foreground">
              Ankieta – zestaw pytań, na które odpowiada Użytkownik w celu wygenerowania spersonalizowanego raportu.
            </p>
            <p className="text-muted-foreground">
              Raport – zestawienie wyników i informacji wygenerowane na podstawie odpowiedzi Użytkowników udzielonych w Ankietach.
            </p>
            <p className="text-muted-foreground">
              Partner – osoba, którą Użytkownik zaprasza do wypełnienia Ankiety w celu wygenerowania wspólnego raportu.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§3 Warunki korzystania z Serwisu</h2>
            <p className="text-muted-foreground">
              Korzystanie z Serwisu wymaga zaakceptowania Regulaminu.
            </p>
            <p className="text-muted-foreground">
              Serwis przeznaczony jest wyłącznie dla osób pełnoletnich.
            </p>
            <p className="text-muted-foreground">
              Użytkownik zobowiązany jest do podawania prawdziwych i aktualnych danych.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§4 Warunki świadczenia usługi</h2>
            <p className="text-muted-foreground">
              Usługa jest przeznaczona dla osób pełnoletnich.
            </p>
            <p className="text-muted-foreground">
              Aby skorzystać z usługi generowania raportu, Użytkownik musi wypełnić Ankietę dostępną w Serwisie oraz opłacić usługę.
            </p>
            <p className="text-muted-foreground">
              Usługę uruchamia Użytkownik inicjujący, który jako pierwszy wypełnia Ankietę i podaje swoje dane kontaktowe (imię oraz adres e-mail), a także dane Partnera. Opłaca również usługę i akceptuję Regulamin oraz Politykę Prywatności.
            </p>
            <p className="text-muted-foreground">
              Po ukończeniu Ankiety przez Użytkownika inicjującego, Partner otrzymuje drogą elektroniczną zaproszenie do wypełnienia Ankiety.
            </p>
            <p className="text-muted-foreground">
              Po wypełnieniu Ankiety przez obu Użytkowników, Serwis generuje Raport, który wysyłany jest w formie elektronicznej na wskazany adres e-mail.
            </p>
            <p className="text-muted-foreground">
              Raport jest generowany w ciągu maksymalnie 24 godzin od momentu zakończenia Ankiet przez obu Użytkowników.
            </p>
            <p className="text-muted-foreground">
              Raport nie zawiera szczegółowych odpowiedzi poszczególnych Użytkowników.
            </p>
            <p className="text-muted-foreground">
              Użytkownik ponosi pełną odpowiedzialność za prawdziwość oraz zgodność ze stanem faktycznym udzielonych odpowiedzi.
            </p>
            <p className="text-muted-foreground">
              Administrator zastrzega sobie prawo do odmowy świadczenia usługi, jeśli treść odpowiedzi Użytkownika jest niezgodna z prawem, narusza prawa osób trzecich lub jest sprzeczna z dobrymi obyczajami.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§5 Płatności</h2>
            <p className="text-muted-foreground">
              Korzystanie z podstawowych usług Serwisu może być bezpłatne.
            </p>
            <p className="text-muted-foreground">
              Administrator zastrzega możliwość wprowadzenia dodatkowych płatnych usług. W takim przypadku informacja o płatnościach zostanie jasno przedstawiona Użytkownikowi.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§6 Odpowiedzialność</h2>
            <p className="text-muted-foreground">
              Administrator dokłada wszelkich starań, aby raporty były rzetelne i aktualne, jednak mają one charakter wyłącznie informacyjny.
            </p>
            <p className="text-muted-foreground">
              Administrator nie ponosi odpowiedzialności za decyzje Użytkownika podjęte na podstawie informacji zawartych w raportach.
            </p>
            <p className="text-muted-foreground">
              Administrator nie ponosi odpowiedzialności za szkody wynikłe z nieprawidłowego użytkowania Serwisu.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§7 Reklamacje</h2>
            <p className="text-muted-foreground">
              Reklamacje dotyczące działania Serwisu można zgłaszać na adres contact@secretsparks.pl.
            </p>
            <p className="text-muted-foreground">
              Reklamacja powinna zawierać dane Użytkownika oraz szczegółowy opis problemu.
            </p>
            <p className="text-muted-foreground">
              Administrator rozpatruje reklamacje w terminie 14 dni od ich otrzymania.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§8 Ochrona danych osobowych</h2>
            <p className="text-muted-foreground">
              Dane osobowe są przetwarzane zgodnie z Polityką Prywatności Serwisu dostępną na stronie secretsparks.pl/privacy-policy.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§9 Własność intelektualna</h2>
            <p className="text-muted-foreground">
              Wszystkie materiały udostępnione w Serwisie są własnością Administratora i podlegają ochronie prawnej.
            </p>
            <p className="text-muted-foreground">
              Zabrania się kopiowania, rozpowszechniania lub wykorzystywania materiałów bez zgody Administratora.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§10 Zmiany Regulaminu</h2>
            <p className="text-muted-foreground">
              Administrator zastrzega sobie prawo do zmiany Regulaminu.
            </p>
            <p className="text-muted-foreground">
              O każdej istotnej zmianie Regulaminu Administrator powiadomi Użytkowników drogą elektroniczną lub poprzez widoczną informację na stronie Serwisu.
            </p>
            <p className="text-muted-foreground">
              Korzystanie z Serwisu po wprowadzeniu zmian oznacza akceptację nowego Regulaminu.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§11 Postanowienia końcowe</h2>
            <p className="text-muted-foreground">
              W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają obowiązujące przepisy prawa polskiego.
            </p>
            <p className="text-muted-foreground">
              Spory wynikające z korzystania z Serwisu rozpatrywane będą przez właściwy sąd zgodnie z obowiązującymi przepisami.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§12 Kontakt</h2>
            <p className="text-muted-foreground">
              W przypadku pytań dotyczących Regulaminu prosimy o kontakt mailowy na adres: contact@secretsparks.pl lub listownie na adres Administratora: KDY PROJECT, Fiszewo 12/3, 82-335 Gronowo Elbląskie.
            </p>
          </section>
          
          <div className="mt-12 p-6 border rounded-lg bg-card/50 text-center">
            <p className="text-muted-foreground">
              Korzystając z serwisu Secret Sparks, akceptujesz postanowienia niniejszego Regulaminu.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
