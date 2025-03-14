import React from 'react';
import { BookOpen, BookText, Scale, HeartHandshake, Sparkles, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">Co mówią badania</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main content - spans 2 columns */}
          <div className="md:col-span-2 glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Siła autentycznej rozmowy</h3>
            <p className="text-lg mb-6">
              Psychologiczna analiza przeprowadzona przez Mallory i współpracowników (2022) wykazała, że otwarta komunikacja w sferze intymnej znacząco zwiększa satysfakcję z relacji. Regularne dialogi o potrzebach i fantazjach pozwalają partnerom zbudować trwałe więzi emocjonalne.
            </p>
            <p className="text-lg mb-6">
              Secret Sparks ułatwia te rozmowy, umożliwiając bezpieczne dzielenie się pragnieniami i odkrywanie wspólnych zainteresowań bez obaw o nieporozumienia. To skuteczny sposób na pogłębienie wzajemnego zrozumienia.
            </p>
            <div className="text-sm text-muted-foreground">
              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/34968095/#:~:text=38%2C499%20unique%20individuals%20in%20a,effect%20sizes%20compared%20to%20samples" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Mallory, A.B. i in. (2022). <em>Dimensions of couples' sexual communication, relationship satisfaction, and sexual satisfaction: A meta-analysis</em>. <strong>Journal of Family Psychology, 36</strong>(3), 358-371
              </a>
            </div>
          </div>
          
          {/* Side card */}
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Rozmowa kluczem do pożądania</h3>
            <p className="text-lg mb-6">
              W badaniu Montesi i współautorów (2011) pary szczerze dyskutujące o aktywności seksualnej deklarowały wyraźnie wyższe zadowolenie z życia intymnego i relacji. Wyniki te pokazują, jak ogromne znaczenie ma otwartość w budowaniu silniejszej więzi emocjonalnej.
            </p>
            <p className="text-lg mb-6">
              Secret Sparks wspiera takie dialogi, pozwalając partnerom na wypełnianie anonimowych ankiet i porównywanie wyników. Dzięki temu każdy głos jest słyszany, a wspólne zainteresowania nabierają realnych kształtów.
            </p>
            <div className="text-sm text-muted-foreground">
              <a 
                href="https://journals.sagepub.com/doi/10.1177/0265407510386833" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Montesi, J.L. i in. (2011). <em>The specific importance of communicating about sex to couples' sexual and overall relationship satisfaction</em>. <strong>Journal of Social and Personal Relationships, 28</strong>(5), 591-609
              </a>
            </div>
          </div>
        </div>
        
        {/* 3 Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Równowaga w relacji</h3>
            <p className="text-lg mb-6">
              Zgodnie z wnioskami Goli (2019), osoby osiągające wyższy poziom satysfakcji seksualnej doświadczają również lepszego dobrostanu psychicznego i mocniejszego zaangażowania w związek. Zarówno kobiety, jak i mężczyźni przyznają, że ich jakość życia wzrasta, gdy potrzeby intymne są spełniane.
            </p>
            <p className="text-lg mb-6">
              Secret Sparks pozwala parom odkryć, w których obszarach mogą się najlepiej uzupełniać, oferując wgląd w wzajemne preferencje i proponując pomysły na dalszy rozwój relacji.
            </p>
            <div className="text-sm text-muted-foreground">
              <a 
                href="https://ruj.uj.edu.pl/entities/publication/9f90ed2d-0432-4e6b-af78-5792923477de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Gola, I. (2019). <em>Satysfakcja seksualna w związku a inne sfery funkcjonowania związku</em>. Praca magisterska, UJ Kraków
              </a>
            </div>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Hormony bliskości</h3>
            <p className="text-lg mb-6">
              Feldman i zespół (2012) wykazali, że częsty kontakt fizyczny i zaangażowanie romantyczne podnoszą poziom oksytocyny – hormonu przyczyniającego się do wzrostu zaufania i poczucia bezpieczeństwa. Z czasem partnerzy budują w ten sposób trwalszą i bardziej harmonijną więź.
            </p>
            <p className="text-lg mb-6">
              Aplikacja Secret Sparks podpowiada, jak świadomie wzmacniać ten efekt poprzez proste rytuały: ćwiczenia we dwoje, nowe formy bliskości czy regularną rozmowę o potrzebach, co sprzyja długotrwałemu przywiązaniu.
            </p>
            <div className="text-sm text-muted-foreground">
              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3936960/#:~:text=new%20lovers%20,correlated%20with%20the%20couples%E2%80%99%20interactive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Feldman, R. et al. (2012). <em>Oxytocin and the development of romantic attachment: A study of new lovers</em>. <strong>Psychoneuroendocrinology, 37</strong>(8), 1277–1285
              </a>
            </div>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Smile className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Zadowolenie i codzienna satysfakcja</h3>
            <p className="text-lg mb-6">
              W analizie Schmiedeberg i innych (2017) zaobserwowano istotny związek między częstotliwością współżycia a ogólnym szczęściem w życiu. Pary, które pozostają aktywne seksualnie i poszukują nowych doświadczeń, częściej deklarują wyższe zadowolenie w pozostałych sferach codzienności.
            </p>
            <p className="text-lg mb-6">
              Secret Sparks pomaga w znalezieniu inspirujących scenariuszy oraz punktów wspólnych, co pozwala parom zachować entuzjazm w sypialni i jednocześnie przekłada się na lepsze samopoczucie na co dzień.
            </p>
            <div className="text-sm text-muted-foreground">
              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/27757732/#:~:text=intraindividual%20changes%20in%20life%20satisfaction,corresponding%20increases%20in%20life%20satisfaction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Schmiedeberg, C. et al. (2017). <em>The more or the better? How sex contributes to life satisfaction</em>. <strong>Archives of Sexual Behavior, 46</strong>(2), 465–473
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
