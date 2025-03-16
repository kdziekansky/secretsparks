
import React, { useEffect } from 'react';
import { Shield, Lock, KeyRound, AlertCircle, EyeOff, ServerCrash, FileCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SecurityPage = () => {
  // Ustawienie nagłówków bezpieczeństwa dla klienta
  useEffect(() => {
    // Ustawienie meta tagów związanych z bezpieczeństwem
    const metaTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'content-security-policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; connect-src 'self' https://*.supabase.co https://*.stripe.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';" }
    ];

    // Dodanie meta tagów
    metaTags.forEach(({ name, content }) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const tag = document.createElement('meta');
        tag.name = name;
        tag.content = content;
        document.head.appendChild(tag);
      }
    });

    return () => {
      // Usunięcie meta tagów przy odmontowaniu komponentu
      metaTags.forEach(({ name }) => {
        const tag = document.querySelector(`meta[name="${name}"]`);
        if (tag && tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Bezpieczeństwo i prywatność</h1>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Twoje zaufanie i prywatność są dla nas najważniejsze. Poznaj nasze środki bezpieczeństwa.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Shield className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Ochrona danych</CardTitle>
                  </div>
                  <CardDescription>
                    Jak chronimy Twoje dane osobowe i odpowiedzi na ankiety
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Baza danych jest zaszyfrowana, a przesył odbywa się przez połączenie SSL</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Odpowiedzi są szyfrowane i nie są powiązane z Twoimi danymi osobowymi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>W bezpieczny sposób wysyłamy do Ciebie raport, nie przechowujemy jego zawartości długoterminowo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <KeyRound className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Unikalne tokeny</CardTitle>
                  </div>
                  <CardDescription>
                    Bezpieczny system zaproszeń dla Twojego partnera
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Jednorazowe linki z tokenami dla partnerów</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Brak możliwości dostępu do ankiety bez ważnego tokenu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Automatyczna weryfikacja tożsamości partnera</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur mb-12">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Lock className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl">W skrócie o bezpieczeństwie danych</CardTitle>
                </div>
                <CardDescription>
                  Transparentność w zarządzaniu Twoimi danymi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Jakie dane zbieramy?</h3>
                  <p className="text-muted-foreground">
                    Zbieramy tylko te dane, które są niezbędne do funkcjonowania aplikacji:
                    imię/pseudonim Twój i Twojego partnera, adresy mailowe, odpowiedzi na pytania ankiety
                    oraz preferencje dotyczące poziomu gry. Nie zbieramy danych osobowych
                    takich jak nazwisko, adres czy PESEL.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Jak wykorzystujemy dane?</h3>
                  <p className="text-muted-foreground">
                    Wykorzystujemy zebrane dane wyłącznie do:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-muted-foreground">
                    <li>Generowania spersonalizowanego raportu dla Ciebie i Twojego partnera</li>
                    <li>Poprawy jakości naszych usług i rozwoju produktu</li>
                    <li>Anonimowych analiz statystycznych (bez możliwości identyfikacji osób)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Nie udostępniamy danych</h3>
                  <p className="text-muted-foreground">
                    Nikomu nie udostępniamy Twoich danych osobowych ani odpowiedzi na ankietę stronom trzecim.
                    Twoje odpowiedzi są widoczne wyłącznie dla Ciebie, nawet twój partner ich nie zobaczy.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Bezpieczeństwo transmisji</h3>
                  <p className="text-muted-foreground">
                    Wszystkie połączenia z naszą aplikacją są szyfrowane za pomocą protokołu HTTPS.
                    Stosujemy nagłówki bezpieczeństwa takie jak Content-Security-Policy, X-Content-Type-Options
                    i inne, aby chronić przed atakami typu XSS i clickjacking.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <EyeOff className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">Anonimowość</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Nie wymagamy logowania ani pełnych danych osobowych. 
                    Możesz korzystać z pseudonimów dla siebie i partnera.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <ServerCrash className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">Szyfrowanie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Nasza baza danych ma wdrożone procedury bezpieczeństwa, 
                    jest zaszyfrowana, a odpowiedzi nie powiązujemy z danymi osobowymi.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">Zgłaszanie problemów</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Zauważyłeś lukę w zabezpieczeniach? Skontaktuj się z nami 
                    natychmiast pod adresem: contact@secretsparks.pl
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityPage;
