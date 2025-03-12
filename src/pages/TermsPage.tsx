
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
          <p className="text-center text-muted-foreground">Ostatnia aktualizacja: 30.07.2023</p>
          <Separator className="my-8" />
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§1. Postanowienia ogólne</h2>
            <p className="text-muted-foreground">
              1.1 Niniejszy Regulamin określa zasady korzystania z serwisu internetowego Secret Sparks dostępnego pod adresem www.secretsparks.pl.
            </p>
            <p className="text-muted-foreground">
              1.2 Właścicielem i administratorem serwisu Secret Sparks jest Secret Sparks Sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 123, 00-001 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla m.st. Warszawy, XIII Wydział Gospodarczy Krajowego Rejestru Sądowego pod numerem KRS 0000123456, NIP 1234567890, REGON 123456789.
            </p>
            <p className="text-muted-foreground">
              1.3 Niniejszy Regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§2. Definicje</h2>
            <p className="text-muted-foreground">
              2.1 Serwis – serwis internetowy Secret Sparks dostępny pod adresem www.secretsparks.pl, za pośrednictwem którego Użytkownik może korzystać z usług oferowanych przez Właściciela.
            </p>
            <p className="text-muted-foreground">
              2.2 Użytkownik – osoba fizyczna posiadająca pełną zdolność do czynności prawnych, korzystająca z Serwisu.
            </p>
            <p className="text-muted-foreground">
              2.3 Usługa – usługa świadczona drogą elektroniczną przez Właściciela na rzecz Użytkownika za pośrednictwem Serwisu.
            </p>
            <p className="text-muted-foreground">
              2.4 Raport – spersonalizowany dokument generowany na podstawie odpowiedzi udzielonych przez Użytkownika i jego partnera/partnerkę w ankiecie.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§3. Zasady korzystania z Serwisu</h2>
            <p className="text-muted-foreground">
              3.1 Korzystanie z Serwisu jest dobrowolne i bezpłatne, z wyjątkiem usługi generowania Raportu, która jest usługą płatną.
            </p>
            <p className="text-muted-foreground">
              3.2 Warunkiem korzystania z Serwisu jest:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Ukończenie 18 roku życia i posiadanie pełnej zdolności do czynności prawnych</li>
              <li>Zaakceptowanie postanowień niniejszego Regulaminu</li>
              <li>Wyrażenie zgody na przetwarzanie danych osobowych w zakresie niezbędnym do korzystania z Serwisu</li>
            </ul>
            <p className="text-muted-foreground">
              3.3 Zabronione jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, obraźliwym, naruszającym dobra osobiste osób trzecich lub sprzecznych z dobrymi obyczajami.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§4. Usługa generowania Raportu</h2>
            <p className="text-muted-foreground">
              4.1 Usługa generowania Raportu polega na analizie odpowiedzi udzielonych przez Użytkownika i jego partnera/partnerkę w ankiecie oraz utworzeniu na ich podstawie spersonalizowanego Raportu.
            </p>
            <p className="text-muted-foreground">
              4.2 Cena za usługę generowania Raportu jest podana w Serwisie i jest wyrażona w złotych polskich (PLN).
            </p>
            <p className="text-muted-foreground">
              4.3 Płatność za usługę generowania Raportu może być dokonana za pomocą systemu płatności elektronicznych dostępnego w Serwisie.
            </p>
            <p className="text-muted-foreground">
              4.4 Po dokonaniu płatności Użytkownik otrzyma Raport w formie elektronicznej na podany adres e-mail.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§5. Ochrona danych osobowych</h2>
            <p className="text-muted-foreground">
              5.1 Administratorem danych osobowych Użytkowników jest Secret Sparks Sp. z o.o. z siedzibą w Warszawie.
            </p>
            <p className="text-muted-foreground">
              5.2 Dane osobowe Użytkowników są przetwarzane zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).
            </p>
            <p className="text-muted-foreground">
              5.3 Szczegółowe informacje dotyczące przetwarzania danych osobowych zawarte są w Polityce Prywatności dostępnej w Serwisie.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§6. Reklamacje</h2>
            <p className="text-muted-foreground">
              6.1 Użytkownik ma prawo do złożenia reklamacji dotyczącej usług świadczonych przez Właściciela za pośrednictwem Serwisu.
            </p>
            <p className="text-muted-foreground">
              6.2 Reklamacje należy składać drogą elektroniczną na adres e-mail: kontakt@secretsparks.pl lub pisemnie na adres siedziby Właściciela.
            </p>
            <p className="text-muted-foreground">
              6.3 Reklamacja powinna zawierać co najmniej: imię i nazwisko Użytkownika, adres e-mail oraz opis zgłaszanych zastrzeżeń.
            </p>
            <p className="text-muted-foreground">
              6.4 Właściciel rozpatrzy reklamację w terminie 14 dni od daty jej otrzymania i poinformuje Użytkownika o sposobie jej rozpatrzenia na adres e-mail podany w reklamacji.
            </p>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">§7. Postanowienia końcowe</h2>
            <p className="text-muted-foreground">
              7.1 Właściciel zastrzega sobie prawo do zmiany niniejszego Regulaminu w dowolnym momencie.
            </p>
            <p className="text-muted-foreground">
              7.2 Zmiany Regulaminu wchodzą w życie z dniem ich opublikowania w Serwisie.
            </p>
            <p className="text-muted-foreground">
              7.3 W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.
            </p>
            <p className="text-muted-foreground">
              7.4 Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Właściciela.
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
