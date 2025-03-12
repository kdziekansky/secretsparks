
import React from 'react';
import { Shield, Lock, KeyRound, AlertCircle, EyeOff, ServerCrash, FileCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SecurityPage = () => {
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
                      <span>Wszystkie dane przesyłane są przez szyfrowane połączenie SSL</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Odpowiedzi na ankiety są przechowywane w zaszyfrowanej bazie danych</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Dane są dostępne tylko dla Ciebie i Twojego partnera</span>
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
                  <CardTitle className="text-xl">Nasza polityka prywatności</CardTitle>
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
                    imię/pseudonim Twój i Twojego partnera, odpowiedzi na pytania ankiety
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
                    <li>Anonimowych analiz statystycznych (bez możliwości identyfikacji użytkowników)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Udostępnianie danych</h3>
                  <p className="text-muted-foreground">
                    Nie udostępniamy Twoich danych osobowych ani odpowiedzi na ankietę stronom trzecim.
                    Twoje odpowiedzi są widoczne wyłącznie dla Ciebie i Twojego partnera, jeśli 
                    zdecydujesz się udostępnić mu swój raport.
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
                    <CardTitle className="text-lg">Kopie zapasowe</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regularnie tworzymy kopie zapasowe wszystkich danych, 
                    chroniąc je przed przypadkową utratą czy awarią systemu.
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
                    natychmiast pod adresem: security@secretsparks.pl
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <FileCheck className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl">Zgodność z RODO</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Secret Sparks jest w pełni zgodny z przepisami RODO (Rozporządzenie o Ochronie Danych Osobowych).
                  Jako użytkownik masz prawo do:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Dostępu do swoich danych</li>
                  <li>Poprawiania swoich danych</li>
                  <li>Usunięcia swoich danych ("prawo do bycia zapomnianym")</li>
                  <li>Ograniczenia przetwarzania swoich danych</li>
                  <li>Przenoszenia swoich danych</li>
                  <li>Sprzeciwu wobec przetwarzania swoich danych</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Aby skorzystać z któregokolwiek z tych praw, wyślij e-mail na adres: 
                  privacy@secretsparks.pl. Odpowiemy na Twoją prośbę w ciągu 30 dni.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityPage;
