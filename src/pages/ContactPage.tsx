
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05050a] to-[#121217]">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-center">{t('pages.contact.title')}</h1>
          <Separator className="my-8" />
          
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">{t('pages.contact.contactData')}</h2>
              <p className="text-muted-foreground">
                {t('pages.contact.company')}<br />
                {t('pages.contact.address')}<br />
                {t('pages.contact.postalCode')}
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">{t('pages.contact.email')}</h2>
              <p className="text-muted-foreground">
                {t('pages.contact.customerService')}: contact@secretsparks.pl<br />
                {t('pages.contact.dataProtection')}: contact@secretsparks.pl
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">{t('pages.contact.workingHours')}</h2>
              <p className="text-muted-foreground">
                {t('pages.contact.emailResponse')}
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
