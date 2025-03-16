
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">O nas</h1>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nasza misja</h2>
        <p className="mb-6 text-muted-foreground">
          Secret Sparks powstało z prostej misji - pomóc parom odkryć wzajemne pragnienia 
          i poprawić komunikację w najbardziej intymnej sferze życia. Wierzymy, że szczere 
          rozmowy o seksualności są fundamentem zdrowego związku, ale jednocześnie 
          rozumiemy, że nie zawsze łatwo jest je rozpocząć.
        </p>
        
        <p className="text-muted-foreground">
          Nasza platforma tworzy bezpieczną przestrzeń, gdzie możecie poznać swoje ukryte 
          pragnienia bez konieczności wyrażania ich bezpośrednio. Dzięki zaawansowanej 
          technologii AI, pomagamy parom odkryć wspólne fantazje i preferencje, 
          zachowując przy tym pełną dyskrecję.
        </p>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nasz zespół</h2>
        <p className="mb-6 text-muted-foreground">
          Za Secret Sparks stoi zespół specjalistów z dziedziny psychologii związków, 
          seksuologii i technologii. Łączymy naukowe podejście do relacji międzyludzkich 
          z innowacyjnymi rozwiązaniami technologicznymi, aby tworzyć narzędzia, które 
          realnie pomagają parom budować głębsze i bardziej satysfakcjonujące relacje.
        </p>
        
        <p className="text-muted-foreground">
          Wszystkie ankiety i raporty tworzymy w konsultacji z certyfikowanymi seksuologami 
          i terapeutami par, dbając o to, by każde pytanie i rekomendacja były oparte na 
          wiedzy naukowej i dobrych praktykach w terapii związków.
        </p>
      </div>
      
      <div className="glass-panel p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nasza filozofia</h2>
        <p className="mb-6 text-muted-foreground">
          Wierzymy, że każdy związek jest unikalny i zasługuje na indywidualne podejście. 
          Nie proponujemy uniwersalnych rozwiązań ani nie narzucamy konkretnych stylów 
          relacji - zamiast tego, pomagamy Wam odkryć to, co dla Was działa najlepiej.
        </p>
        
        <p className="mb-6 text-muted-foreground">
          Podstawą naszej filozofii jest przekonanie, że zdrowa seksualność opiera się na 
          wzajemnym szacunku, zgodzie i zrozumieniu. Wszystko, co promujemy, musi spełniać 
          te fundamentalne zasady.
        </p>
        
        <p className="text-muted-foreground">
          Jednocześnie wiemy, że seksualność jest różnorodna i dynamiczna, dlatego 
          oferujemy szeroki wachlarz pytań i sugestii, które mogą inspirować do 
          odkrywania nowych wymiarów Waszej intymności.
        </p>
      </div>
      
      <div className="text-center mt-12">
        <Link to="/ankieta">
          <Button className="px-8 py-6 rounded-full bg-primary hover:bg-primary/80 text-lg flex items-center gap-2">
            <span>Rozpocznij swoją podróż</span>
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUsPage;
