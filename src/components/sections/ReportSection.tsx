
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const ReportSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-[#0B0B0E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left">{t('report.title')}</h2>
        
        {/* Two-column layout with consistent height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
          {/* Left column */}
          <div className="flex flex-col h-full">
            <h3 className="text-3xl font-bold mb-8 text-left">{t('report.section1.title')}</h3>
            
            <div className="space-y-8 flex-grow">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">{t('report.section1.feature1.title')}</h4>
                  <p className="text-muted-foreground text-lg">{t('report.section1.feature1.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">{t('report.section1.feature2.title')}</h4>
                  <p className="text-muted-foreground text-lg">{t('report.section1.feature2.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">{t('report.section1.feature3.title')}</h4>
                  <p className="text-muted-foreground text-lg">{t('report.section1.feature3.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">{t('report.section1.feature4.title')}</h4>
                  <p className="text-muted-foreground text-lg">{t('report.section1.feature4.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-5 mt-1 flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">{t('report.section1.feature5.title')}</h4>
                  <p className="text-muted-foreground text-lg">{t('report.section1.feature5.description')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Email editor mockup */}
          <div className="flex flex-col h-full">
            <h3 className="text-3xl font-bold mb-8 text-center">{t('report.section2.title')}</h3>
            <p className="text-lg text-muted-foreground text-center mb-8">
              {t('report.section2.description')}
            </p>
            
            {/* Email editor interface - dostosowane wymiary */}
            <div className="bg-[#0B0B0E] border border-gray-800 rounded-xl overflow-hidden shadow-xl mx-auto w-full max-w-md flex-grow flex flex-col">
              {/* Email content area */}
              <div className="p-4 bg-[#0D0D12] flex-grow flex flex-col">
                <div className="bg-[#111118] rounded-lg p-4 shadow-sm flex-grow flex flex-col">
                  {/* From field */}
                  <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                    <div className="w-24 text-gray-400 text-sm">{t('emailPreview.from')}:</div>
                    <div className="text-gray-300">team@secretsparks.pl</div>
                  </div>
                  
                  {/* To field */}
                  <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                    <div className="w-24 text-gray-400 text-sm">{t('emailPreview.to')}:</div>
                    <div className="flex items-center bg-gray-700/30 rounded-full px-3 py-1 text-sm">
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      <span>{t('emailPreview.youAndPartner')}</span>
                    </div>
                  </div>
                  
                  {/* Subject field */}
                  <div className="mb-4 flex items-center border-b border-gray-700 pb-3">
                    <div className="w-24 text-gray-400 text-sm">{t('emailPreview.subject')}:</div>
                    <div className="text-gray-300">{t('emailPreview.yourReport')}</div>
                  </div>
                  
                  {/* Email content preview */}
                  <div className="flex-grow rounded-md overflow-hidden flex flex-col">
                    <div className="flex-grow bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6 text-center">
                      <div className="bg-gray-700/40 h-14 w-14 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-7 w-7 text-white/70" />
                      </div>
                      <p className="text-gray-400 text-sm italic">{t('emailPreview.fillSurvey')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/20 to-accent/30 mt-10 md:mt-0">
          <h3 className="text-2xl font-bold mb-6">{t('report.cta.title')}</h3>
          <p className="text-lg mb-8 max-w-2xl">
            {t('report.cta.description')}
          </p>
          <Link to="/survey" className="w-full max-w-sm">
            <Button className="btn-primary btn-large w-full text-lg py-6">
              {t('report.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
