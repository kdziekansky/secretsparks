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
              Badanie Montesi i in. (2011) dowiodło, że szczera rozmowa o seksie podnosi satysfakcję i więź. Secret Sparks ułatwia taki dialog, zapewniając bezpieczne, anonimowe ankiety.
            </p>
            <div className="text-sm text-muted-foreground">
                              <a 
                href="https://journals.sagepub.com/doi/10.1177/0265407510386833" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Montesi, J.L. i in. (2011). <em>The specific importance of communicating about sex to couples' sexual and overall relationship satisfaction</em>. <strong>Journal of Social and Personal Relationships</strong>
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
              Badanie Goli (2019) wskazuje, że wyższa satysfakcja seksualna sprzyja lepszemu dobrostanowi i zaangażowaniu. Secret Sparks pomaga parom poznać potrzeby i wzmacniać relację.
            </p>
            <div className="text-sm text-muted-foreground">
                              <a 
                href="https://ruj.uj.edu.pl/entities/publication/9f90ed2d-0432-4e6b-af78-5792923477de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Gola, I. (2019). <em>Satysfakcja seksualna w związku a inne sfery funkcjonowania związku</em>. UJ Kraków
              </a>
            </div>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Hormony bliskości</h3>
            <p className="text-lg mb-6">
              Feldman i in. (2012) pokazali, że częste kontakty fizyczne zwiększają oksytocynę, wzmacniając zaufanie i bezpieczeństwo. Secret Sparks oferuje rytuały sprzyjające trwałemu przywiązaniu.
            </p>
            <div className="text-sm text-muted-foreground">
                              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3936960/#:~:text=new%20lovers%20,correlated%20with%20the%20couples%E2%80%99%20interactive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Feldman, R. et al. (2012). <em>Oxytocin and the development of romantic attachment: A study of new lovers</em>. <strong>Psychoneuroendocrinology</strong>
              </a>
            </div>
          </div>
          
          <div className="glass-card p-10 flex flex-col items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <Smile className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Zadowolenie i codzienna satysfakcja</h3>
            <p className="text-lg mb-6">
              Schmiedeberg i in. (2017) wykazali, że częstsze współżycie wiąże się z wyższym poczuciem szczęścia. Secret Sparks inspiruje do odkrywania nowych doznań, podtrzymując entuzjazm w relacji.
            </p>
            <div className="text-sm text-muted-foreground">
                              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/27757732/#:~:text=intraindividual%20changes%20in%20life%20satisfaction,corresponding%20increases%20in%20life%20satisfaction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Schmiedeberg, C. et al. (2017). <em>The more or the better? How sex contributes to life satisfaction</em>. <strong>Archives of Sexual Behavior</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
