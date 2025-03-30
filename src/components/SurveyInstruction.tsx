
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Shield, Timer, FileText, ChevronRight } from 'lucide-react';

const SurveyInstruction = ({ onStart }: { onStart: () => void }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="glass-card p-8 md:p-12 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">{t('survey.instruction.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('survey.instruction.honest.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.honest.description')}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('survey.instruction.discretion.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.discretion.description')}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('survey.instruction.invite.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.invite.description')}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('survey.instruction.report.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.report.description')}
            </p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border/50 mb-10">
          <h3 className="font-semibold text-xl mb-4">{t('survey.instruction.serviceCost')}</h3>
          <div className="flex items-baseline">
            <div className="text-5xl font-bold text-primary">49 PLN</div>
            <div className="text-muted-foreground ml-3">{t('survey.instruction.oneTimePayment')}</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.paymentAfterSurvey')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.personalizedReport')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.commonFascinations')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.scenarios')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.comfortMap')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{t('survey.instruction.features.betterSexLife')}</span>
            </div>
          </div>
          
          <Button onClick={onStart} className="rounded-full px-8 py-6 text-lg">
            {t('survey.instruction.startSurvey')}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyInstruction;
