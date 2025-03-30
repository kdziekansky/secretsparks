
import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ContactPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-16">{t('pages.contact.title')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">{t('pages.contact.contactData')}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('pages.contact.company')}</h3>
                  <p className="text-muted-foreground">{t('pages.contact.address')}</p>
                  <p className="text-muted-foreground">{t('pages.contact.postalCode')}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('pages.contact.email')}</h3>
                  <div className="flex items-center text-primary">
                    <Mail className="h-5 w-5 mr-2" />
                    <a href="mailto:team@secretsparks.pl" className="hover:underline">team@secretsparks.pl</a>
                  </div>
                  <p className="text-muted-foreground mt-1">{t('pages.contact.customerService')}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('pages.contact.email')}</h3>
                  <div className="flex items-center text-primary">
                    <Mail className="h-5 w-5 mr-2" />
                    <a href="mailto:privacy@secretsparks.pl" className="hover:underline">privacy@secretsparks.pl</a>
                  </div>
                  <p className="text-muted-foreground mt-1">{t('pages.contact.dataProtection')}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('pages.contact.workingHours')}</h3>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 mt-1" />
                    <div>
                      <p className="text-muted-foreground">Poniedziałek - Piątek: 9:00 - 17:00</p>
                      <p className="text-muted-foreground mt-4">{t('pages.contact.emailResponse')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Imię i nazwisko</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-card border border-border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 bg-card border border-border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Temat</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-card border border-border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Wiadomość</label>
                  <textarea 
                    rows={5}
                    className="w-full p-3 bg-card border border-border rounded-md"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
