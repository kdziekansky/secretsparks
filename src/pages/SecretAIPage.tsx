
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SecretAIPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
          <span>Secret</span>
          <Sparkles className="h-8 w-8 text-yellow-500" />
          <span>AI</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Zaawansowana sztuczna inteligencja, która pomaga parom odkryć wspólne pragnienia
        </p>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-semibold">Jak działa Secret AI?</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Secret AI to zaawansowany system sztucznej inteligencji, który analizuje
              odpowiedzi partnerów na pytania zawarte w naszych ankietach. System identyfikuje
              wzorce, podobieństwa i różnice w preferencjach, a następnie generuje
              spersonalizowany raport, który pomaga parom lepiej się zrozumieć.
            </p>
            
            <p className="text-muted-foreground">
              W przeciwieństwie do zwykłych algorytmów, Secret AI rozumie niuanse ludzkiej
              seksualności i potrafi interpretować odpowiedzi z uwzględnieniem kontekstu
              i emocjonalnego znaczenia, co pozwala na tworzenie naprawdę trafnych
              i pomocnych rekomendacji.
            </p>
          </div>
          
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-semibold">Prywatność i bezpieczeństwo</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Secret AI zostało zaprojektowane z myślą o najwyższych standardach prywatności.
              System analizuje Wasze odpowiedzi lokalnie, a następnie usuwa dane źródłowe,
              zachowując jedynie zanonimizowane wzorce niezbędne do wygenerowania raportu.
            </p>
            
            <p className="text-muted-foreground">
              Co więcej, Secret AI nigdy nie udostępnia Waszych indywidualnych odpowiedzi
              partnerowi - zamiast tego, koncentruje się na obszarach zgodności
              i potencjalnych tematach do rozmowy, które mogą wzbogacić Wasz związek.
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span>Funkcje Secret AI</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-panel p-4">
            <h3 className="font-medium text-lg mb-2">Analiza zgodności</h3>
            <p className="text-sm text-muted-foreground">
              Wykrywa wspólne fantazje i preferencje, na których możecie budować
              bardziej satysfakcjonujące życie intymne.
            </p>
          </div>
          
          <div className="glass-panel p-4">
            <h3 className="font-medium text-lg mb-2">Sugestie rozmów</h3>
            <p className="text-sm text-muted-foreground">
              Proponuje tematy do dyskusji, które mogą pomóc Wam lepiej
              zrozumieć wzajemne potrzeby i pragnienia.
            </p>
          </div>
          
          <div className="glass-panel p-4">
            <h3 className="font-medium text-lg mb-2">Personalizowane rekomendacje</h3>
            <p className="text-sm text-muted-foreground">
              Sugeruje aktywności i doświadczenia dostosowane do Waszych
              wspólnych preferencji i poziomu komfortu.
            </p>
          </div>
          
          <div className="glass-panel p-4">
            <h3 className="font-medium text-lg mb-2">Rozwój związku</h3>
            <p className="text-sm text-muted-foreground">
              Identyfikuje obszary, w których możecie pogłębić Waszą intymność
              i wzmocnić więź emocjonalną.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/ankieta">
          <Button className="px-8 py-6 rounded-full bg-primary hover:bg-primary/80 text-lg flex items-center gap-2">
            <span>Wypróbuj Secret AI</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SecretAIPage;
