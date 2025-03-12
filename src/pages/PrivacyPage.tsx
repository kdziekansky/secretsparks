
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
          <p className="text-center text-muted-foreground">Ostatnia aktualizacja: 30.07.2023</p>
          <Separator className="my-8" />
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Informacje ogólne</h2>
            <p className="text-muted-foreground">
              Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu Secret Sparks.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Administrator danych</h2>
            <p className="text-muted-foreground">
              Administratorem danych osobowych jest Secret Sparks Sp. z o.o. z siedzibą w Warszawie.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Cel i zakres zbierania danych</h2>
            <p className="text-muted-foreground">
              Dane osobowe są zbierane w celu:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Realizacji usługi generowania spersonalizowanego raportu</li>
              <li>Komunikacji z użytkownikiem</li>
              <li>Przesyłania informacji marketingowych (w przypadku wyrażenia zgody)</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Prawa użytkownika</h2>
            <p className="text-muted-foreground">
              Użytkownik ma prawo do:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-6">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Bezpieczeństwo danych</h2>
            <p className="text-muted-foreground">
              Administrator zapewnia bezpieczeństwo danych osobowych poprzez stosowanie odpowiednich środków technicznych i organizacyjnych.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Cookies</h2>
            <p className="text-muted-foreground">
              Serwis wykorzystuje pliki cookies w celu świadczenia usług na najwyższym poziomie oraz w celach statystycznych i marketingowych.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Kontakt</h2>
            <p className="text-muted-foreground">
              W sprawach związanych z ochroną danych osobowych można kontaktować się pod adresem email: privacy@secretsparks.pl
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
