
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ZasadyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Zasady Secret Sparks</h1>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <div className="flex items-start mb-4">
          <ShieldCheck className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Bezpieczeństwo przede wszystkim</h2>
            <p className="text-muted-foreground">
              Wszystkie praktyki i fantazje, które proponujemy w naszych ankietach i raportach, 
              są oparte na zasadzie pełnej dobrowolności i wzajemnej zgody. Nigdy nie sugerujemy 
              czynności, które mogłyby wyrządzić komukolwiek krzywdę fizyczną lub psychiczną.
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <div className="flex items-start mb-4">
          <Lock className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Prywatność i dyskrecja</h2>
            <p className="text-muted-foreground mb-4">
              Wasze dane i odpowiedzi są traktowane z najwyższą poufnością. Partnerzy nigdy 
              nie mają bezpośredniego dostępu do Waszych indywidualnych odpowiedzi - zamiast tego, 
              otrzymujecie wspólny raport pokazujący obszary zgodności.
            </p>
            <p className="text-muted-foreground">
              Dodatkowo, wszystkie dane są usuwane z naszych serwerów po 7 dniach od wygenerowania 
              raportu, co zapewnia dodatkową warstwę ochrony Waszej prywatności.
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <div className="flex items-start mb-4">
          <Heart className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Wzajemny szacunek</h2>
            <p className="text-muted-foreground">
              Zachęcamy do eksplorowania seksualności w sposób, który szanuje granice i komfort 
              obojga partnerów. Nasze raporty nigdy nie wywierają presji na wypróbowanie czegoś, 
              na co którekolwiek z partnerów nie ma ochoty - zamiast tego, podkreślają znaczenie 
              otwartej komunikacji i wzajemnego zrozumienia.
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Nasze zobowiązania wobec użytkowników</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Zawsze priorytetowo traktujemy Wasze bezpieczeństwo i prywatność</li>
          <li>Nie udostępniamy Waszych danych stronom trzecim w celach marketingowych</li>
          <li>Nie przechowujemy danych dłużej, niż jest to konieczne</li>
          <li>Jesteśmy transparentni odnośnie tego, jak działa nasza platforma</li>
          <li>Stale udoskonalamy nasze ankiety i raporty na podstawie opinii ekspertów i użytkowników</li>
          <li>Zawsze jesteśmy otwarci na Wasze sugestie i uwagi</li>
        </ul>
      </div>
      
      <div className="text-center mt-12">
        <Link to="/ankieta">
          <Button className="px-8 py-6 rounded-full bg-primary hover:bg-primary/80 text-lg flex items-center gap-2">
            <span>Rozpocznij ankietę</span>
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ZasadyPage;
