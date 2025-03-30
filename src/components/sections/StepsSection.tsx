
import React from 'react';
import { useTranslation } from 'react-i18next';

const StepsSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="py-12 bg-[#0B0B0E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left">{t('home.steps.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">1</div>
            <h3 className="text-xl font-bold mb-3">{t('home.steps.step1.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.steps.step1.description')}
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">2</div>
            <h3 className="text-xl font-bold mb-3">{t('home.steps.step2.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.steps.step2.description')}
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">3</div>
            <h3 className="text-xl font-bold mb-3">{t('home.steps.step3.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.steps.step3.description')}
            </p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="text-4xl font-bold text-primary mb-4">4</div>
            <h3 className="text-xl font-bold mb-3">{t('home.steps.step4.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.steps.step4.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
