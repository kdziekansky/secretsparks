
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05050a] to-[#121217]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-center">Polityka Prywatności Secret Sparks</h1>
          <p className="text-center text-muted-foreground">Ostatnia aktualizacja: 14.03.2025</p>
          <Separator className="my-8" />
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§1 Postanowienia ogólne</h2>
            <p className="text-muted-foreground">
              Polityka prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników serwisu Secret Sparks („Serwis") oraz zasady korzystania z plików Cookies przez Serwis. Jest integralną częścią Regulaminu Serwisu.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§2 Definicje</h2>
            <p className="text-muted-foreground">
              Serwis – strona internetowa Secret Sparks działająca pod domeną secretsparks.pl.
            </p>
            <p className="text-muted-foreground">
              Administrator – KDY PROJECT z siedzibą w Fiszewie 12/3, 82-335 Gronowo Elbląskie.
            </p>
            <p className="text-muted-foreground">
              Użytkownik – osoba fizyczna korzystająca z Serwisu.
            </p>
            <p className="text-muted-foreground">
              Dane osobowe – wszelkie informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.
            </p>
            <p className="text-muted-foreground">
              Cookies – niewielkie pliki tekstowe zapisywane na urządzeniu Użytkownika.
            </p>
            <p className="text-muted-foreground">
              RODO – Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
            </p>
            <p className="text-muted-foreground">
              Profilowanie – automatyczne przetwarzanie danych osobowych w celu analizy preferencji użytkowników.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§3 Administrator danych</h2>
            <p className="text-muted-foreground">
              Administratorem danych osobowych jest KDY PROJECT z siedzibą w Fiszewie 12/3, 82-335 Gronowo Elbląskie. Kontakt: contact@secretsparks.pl
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§4 Rodzaje zbieranych danych</h2>
            <p className="text-muted-foreground">
              Serwis gromadzi:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Dane identyfikacyjne: imię, adres e-mail.</li>
              <li>Dane techniczne: IP, typ przeglądarki, system operacyjny, urządzenie, lokalizacja.</li>
              <li>Odpowiedzi na pytania z ankiety</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§5 Cele przetwarzania danych</h2>
            <p className="text-muted-foreground">
              Przetwarzamy dane osobowe w celu:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Realizacji usług dostępnych w Serwisie (art. 6 ust. 1 lit. b RODO).</li>
              <li>Obsługi kontaktów z Użytkownikiem (art. 6 ust. 1 lit. f RODO).</li>
              <li>Prowadzenia marketingu bezpośredniego (art. 6 ust. 1 lit. a RODO).</li>
              <li>Analizy statystycznej i poprawy jakości Serwisu (art. 6 ust. 1 lit. f RODO).</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§6 Udostępnianie danych osobowych</h2>
            <p className="text-muted-foreground">
              Dane osobowe mogą być udostępniane zaufanym podmiotom:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Firmom świadczącym usługi IT (hosting, obsługa techniczna).</li>
              <li>Firmom marketingowym oraz analitycznym (np. Google Analytics, Meta Ads).</li>
            </ul>
            <p className="text-muted-foreground">
              Administrator nie sprzedaje danych osobowych użytkowników. Dane są udostępniane na podstawie odpowiednich umów i wykorzystywane wyłącznie w celach określonych w §5 niniejszej polityki prywatności.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§7 Profilowanie</h2>
            <p className="text-muted-foreground">
              Serwis może stosować profilowanie w celu dostosowania oferty do preferencji Użytkownika. Nie podejmujemy automatycznych decyzji wpływających istotnie na prawa bądź zachowanie użytkownika.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§8 Prawa użytkowników</h2>
            <p className="text-muted-foreground">
              Użytkownik posiada prawo do:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Dostępu, sprostowania, usunięcia, ograniczenia przetwarzania danych.</li>
              <li>Przenoszenia danych.</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania.</li>
              <li>Wniesienia skargi do organu nadzorczego (Prezes UODO).</li>
            </ul>
            <p className="text-muted-foreground">
              Żądania można kierować na adres contact@secretsparks.pl.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§9 Bezpieczeństwo danych</h2>
            <p className="text-muted-foreground">
              Stosujemy odpowiednie środki techniczne i organizacyjne chroniące dane osobowe przed utratą, modyfikacją, nieuprawnionym dostępem i przetwarzaniem.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§10 Pliki Cookies</h2>
            <p className="text-muted-foreground">
              Serwis stosuje:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Cookies wewnętrzne (sesyjne i trwałe) – dla poprawy funkcjonalności Serwisu.</li>
              <li>Cookies zewnętrzne – partnerów analitycznych (np. Google Analytics).</li>
            </ul>
            <p className="text-muted-foreground">
              Użytkownik może zarządzać ustawieniami Cookies poprzez ustawienia przeglądarki.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§11 Linki zewnętrzne</h2>
            <p className="text-muted-foreground">
              Serwis może zawierać linki do stron zewnętrznych, za których zasady prywatności Administrator nie odpowiada.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§12 Osoby niepełnoletnie</h2>
            <p className="text-muted-foreground">
              Serwis przeznaczony jest wyłącznie dla osób pełnoletnich. Nie zbieramy świadomie danych osób poniżej 18. roku życia.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§13 Transfer danych poza EOG</h2>
            <p className="text-muted-foreground">
              Dane mogą być przekazywane poza Europejski Obszar Gospodarczy wyłącznie na podstawie odpowiednich zabezpieczeń, zgodnie z RODO (np. standardowe klauzule umowne).
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§14 Okres przechowywania danych</h2>
            <p className="text-muted-foreground">
              Dane osobowe są przechowywane przez okres niezbędny do realizacji celów przetwarzania lub do momentu cofnięcia zgody przez Użytkownika. Po tym czasie dane zostaną usunięte lub zanonimizowane.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§15 Zmiany Polityki Prywatności</h2>
            <p className="text-muted-foreground">
              Administrator zastrzega prawo do aktualizacji niniejszej Polityki. O istotnych zmianach poinformujemy Użytkowników drogą elektroniczną lub poprzez informację na stronie Serwisu.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§16 Kontakt</h2>
            <p className="text-muted-foreground">
              Wszelkie pytania dotyczące Polityki Prywatności należy kierować na adres e-mail: contact@secretsparks.pl lub pocztą tradycyjną na adres Administratora: KDY PROJECT, Fiszewo 12/3, 82-335 Gronowo Elbląskie.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
