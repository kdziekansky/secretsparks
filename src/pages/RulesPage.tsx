
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sparkles, HeartHandshake, Zap, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RulesPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-center">{t('rulesPage.title')}</h1>
        <Separator className="my-8" />
        
        {/* Na czym polega Secret Sparks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('rulesPage.whatIs.title')}</h2>
          <Card className="border-[#333] bg-[#0B0B0E]">
            <CardContent className="p-6">
              <p className="text-gray-300">
                {t('rulesPage.whatIs.description')}
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Jak korzystać z Secret Sparks - poziomy układ z numerami */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t('rulesPage.howToUse.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Krok 1 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.howToUse.step1.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.howToUse.step1.description')}
              </p>
            </div>
            
            {/* Krok 2 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.howToUse.step2.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.howToUse.step2.description')}
              </p>
            </div>
            
            {/* Krok 3 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.howToUse.step3.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.howToUse.step3.description')}
              </p>
            </div>
            
            {/* Krok 4 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.howToUse.step4.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.howToUse.step4.description')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Poziomy gry */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('rulesPage.gameLevels.title')}</h2>
          <p className="text-gray-400 mb-8">
            {t('rulesPage.gameLevels.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discover */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.gameLevels.discover.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.gameLevels.discover.description')}
              </p>
            </div>
            
            {/* Explore */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                  <HeartHandshake className="h-4 w-4 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.gameLevels.explore.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.gameLevels.explore.description')}
              </p>
            </div>
            
            {/* Exceed */}
            <div className="border border-[#333] bg-[#0B0B0E] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">{t('rulesPage.gameLevels.exceed.title')}</h3>
              </div>
              <p className="text-sm text-gray-400">
                {t('rulesPage.gameLevels.exceed.description')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Najczęściej zadawane pytania */}
        <section>
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold">{t('rulesPage.faq.title')}</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                {t('rulesPage.faq.question1.question')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                {t('rulesPage.faq.question1.answer')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                {t('rulesPage.faq.question2.question')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                {t('rulesPage.faq.question2.answer')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-[#333]">
              <AccordionTrigger className="text-left py-4">
                {t('rulesPage.faq.question3.question')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                {t('rulesPage.faq.question3.answer')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left py-4">
                {t('rulesPage.faq.question4.question')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                {t('rulesPage.faq.question4.answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default RulesPage;
