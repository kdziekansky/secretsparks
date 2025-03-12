
import React from 'react';
import { Bot, Sparkles, ShieldCheck, Lightbulb, Users, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const SecretAIPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Bot className="h-10 w-10 text-primary mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">Secret AI</h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Poznaj sztuczną inteligencję, która stoi za naszą grą dla par. Technologia, która pomaga budować bliskość.
            </p>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur mb-12">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Sparkles className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl">Czym jest Secret AI?</CardTitle>
                </div>
                <CardDescription>
                  Zaawansowana sztuczna inteligencja zaprojektowana specjalnie dla par
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Secret AI to nasza autorska technologia oparta na zaawansowanych modelach sztucznej inteligencji, 
                  która została stworzona specjalnie z myślą o analizie i zrozumieniu dynamiki związku.
                </p>
                
                <p className="text-muted-foreground">
                  W przeciwieństwie do ogólnych modeli AI, Secret AI została specjalnie wytrenowana na podstawie:
                </p>
                
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Tysięcy ankiet wypełnionych przez rzeczywiste pary</li>
                  <li>Badań psychologicznych dotyczących bliskości i intymności</li>
                  <li>Konsultacji z seksuologami i terapeutami par</li>
                  <li>Anonimowych danych o preferencjach i pragnieniach w związkach</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <ShieldCheck className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Bezpieczeństwo</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Secret AI traktuje Twoją prywatność jako absolutny priorytet. Wszystkie dane są przetwarzane 
                    z zachowaniem najwyższych standardów bezpieczeństwa:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Pełne szyfrowanie danych end-to-end</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Anonimizacja wszystkich informacji osobistych</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Brak przechowywania wrażliwych danych po wygenerowaniu raportu</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Jak działa?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Secret AI analizuje odpowiedzi obu partnerów, identyfikując obszary zgodności, 
                    rozbieżności i potencjału do eksploracji:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">1</span>
                      <span>Identyfikuje wspólne pragnienia i fantazje</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">2</span>
                      <span>Wykrywa niewypowiedziane potrzeby</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">3</span>
                      <span>Proponuje spersonalizowane aktywności i techniki</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">4</span>
                      <span>Uwzględnia granice i limity każdego z partnerów</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Personalizacja</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Secret AI dostosowuje się do unikalnego charakteru każdego związku:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Tworzy spersonalizowane raporty oparte na Waszych odpowiedziach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Uwzględnia poziom komfortu i doświadczenia obu partnerów</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Proponuje aktywności dopasowane do Waszego poziomu gry</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Heart className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">Empatyczna komunikacja</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Secret AI została zaprojektowana, aby komunikować się w sposób empatyczny i wrażliwy:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Używa języka pełnego szacunku i akceptacji</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Unika oceniania i wartościowania</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>Pomaga w budowaniu otwartej komunikacji między partnerami</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Gotowi odkryć nowy wymiar bliskości?</h2>
              <Link to="/survey">
                <Button className="btn-primary px-8 py-6 text-lg">
                  Wypełnij ankietę ze Secret AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecretAIPage;
