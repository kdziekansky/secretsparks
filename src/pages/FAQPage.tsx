
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { LockKeyhole, ShieldCheck, Clock, HeartHandshake, Star, CreditCard, ArrowRight, HelpCircle, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t('faqPage.title')}</h1>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <LockKeyhole className="h-5 w-5 mr-2" />
                  {t('faqPage.privacy.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="priv-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.privacy.question1.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.privacy.question1.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="priv-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.privacy.question2.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.privacy.question2.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="priv-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.privacy.question3.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.privacy.question3.answer')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <HeartHandshake className="h-5 w-5 mr-2" />
                  {t('faqPage.survey.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="survey-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.survey.question1.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.survey.question1.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.survey.question2.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.survey.question2.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.survey.question3.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.survey.question3.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="survey-4" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.survey.question4.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.survey.question4.answer')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-12 border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {t('faqPage.payment.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.payment.question1.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.payment.question1.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.payment.question2.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.payment.question2.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.payment.question3.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.payment.question3.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment-4">
                    <AccordionTrigger className="text-left">{t('faqPage.payment.question4.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.payment.question4.answer')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  {t('faqPage.other.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="other-1" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.other.question1.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.other.question1.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-2" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.other.question2.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.other.question2.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-3" className="border-b border-border/40">
                    <AccordionTrigger className="text-left">{t('faqPage.other.question3.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.other.question3.answer')}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="other-4">
                    <AccordionTrigger className="text-left">{t('faqPage.other.question4.question')}</AccordionTrigger>
                    <AccordionContent>
                      {t('faqPage.other.question4.answer')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
