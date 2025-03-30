
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Główna sekcja hero z obrazkiem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lewa kolumna - treść główna (szerokość 2/3) */}
          <div className="md:col-span-2 glass-card p-10 flex flex-col justify-center items-start text-left">
            <div className="px-6 py-2 rounded-full bg-accent inline-block mb-6">
              <p className="text-primary font-semibold uppercase">{t('hero.tag')}</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {t('hero.title1')}
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-primary">{t('hero.title2')}</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-2">
              <Link to="/survey">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-auto rounded-md text-base">
                  {t('hero.orderButton')}
                </Button>
              </Link>
              
              <Link to="/zasady">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-2 h-auto rounded-md text-base">
                  {t('hero.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Prawa kolumna - zdjęcie tła */}
          <div className="glass-card relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/d68fef22-dab7-4879-a55a-3e4e49d9e114.png" 
                alt="Secret Sparks" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Liczniki - 3 kolumny - zmniejszony odstęp mt-8 zamiast mt-12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">{t('stats.stat1.number')}</h3>
            <p className="text-muted-foreground text-lg">{t('stats.stat1.text')}</p>
          </div>
          
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">{t('stats.stat2.number')}</h3>
            <p className="text-muted-foreground text-lg">{t('stats.stat2.text')}</p>
          </div>
          
          <div className="bg-card text-center p-8 flex flex-col items-center justify-center rounded-2xl border border-accent/10">
            <h3 className="text-5xl font-bold text-primary mb-4">{t('stats.stat3.number')}</h3>
            <p className="text-muted-foreground text-lg">{t('stats.stat3.text')}</p>
          </div>
        </div>

        {/* Sekcja funkcji - 3 kolumny - zmniejszony odstęp mt-8 zamiast mt-12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
              <Sparkles className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('features.feature1.title')}</h3>
            <p className="text-muted-foreground">
              {t('features.feature1.description')}
            </p>
          </div>
          
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
              <Heart className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('features.feature2.title')}</h3>
            <p className="text-muted-foreground">
              {t('features.feature2.description')}
            </p>
          </div>
          
          <div className="bg-card p-8 flex flex-col rounded-2xl border border-accent/10">
            <div className="text-primary mb-6">
              <Zap className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('features.feature3.title')}</h3>
            <p className="text-muted-foreground">
              {t('features.feature3.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
