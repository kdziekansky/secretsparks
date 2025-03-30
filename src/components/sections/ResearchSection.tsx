
import React from 'react';
import { BookOpen, Sparkles, HeartHandshake, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResearchSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left">{t('research.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Main content - spans 2 columns */}
          <div className="md:col-span-2 glass-card p-8 flex flex-col items-start text-left">
            <div className="px-5 py-2 rounded-full bg-accent inline-block mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('research.mainCard.title')}</h3>
            <p className="text-base mb-4">
              {t('research.mainCard.paragraph1')}
            </p>
            <p className="text-base mb-4">
              {t('research.mainCard.paragraph2')}
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/34968095/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Mallory, A.B. i in. (2022). <em>Dimensions of couples' sexual communication, relationship satisfaction, and sexual satisfaction</em>
              </a>
            </div>
          </div>
          
          {/* Side card */}
          <div className="glass-card p-8 flex flex-col items-start text-left">
            <div className="px-5 py-2 rounded-full bg-accent inline-block mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('research.sideCard.title')}</h3>
            <p className="text-base mb-4">
              {t('research.sideCard.description')}
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://journals.sagepub.com/doi/10.1177/0265407510386833" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Montesi, J.L. i in. (2011). <em>The specific importance of communicating about sex</em>
              </a>
            </div>
          </div>
        </div>
        
        {/* 3 Feature boxes - zredukowana wysokość */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col items-start text-left">
            <div className="px-5 py-2 rounded-full bg-accent inline-block mb-3">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('research.feature1.title')}</h3>
            <p className="text-sm mb-3">
              {t('research.feature1.description')}
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3936960/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Feldman, R. et al. (2012). <em>Oxytocin and romantic attachment</em>
              </a>
            </div>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-start text-left">
            <div className="px-5 py-2 rounded-full bg-accent inline-block mb-3">
              <Smile className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('research.feature2.title')}</h3>
            <p className="text-sm mb-3">
              {t('research.feature2.description')}
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://pubmed.ncbi.nlm.nih.gov/27757732/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Schmiedeberg, C. et al. (2017). <em>The more or the better?</em>
              </a>
            </div>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-start text-left">
            <div className="px-5 py-2 rounded-full bg-accent inline-block mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('research.feature3.title')}</h3>
            <p className="text-sm mb-3">
              {t('research.feature3.description')}
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://ruj.uj.edu.pl/entities/publication/9f90ed2d-0432-4e6b-af78-5792923477de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Gola, I. (2019). <em>Satysfakcja seksualna w związku</em>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
