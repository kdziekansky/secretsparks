import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Gift, Lock, CreditCard, ChevronLeft } from 'lucide-react';
import Confetti from './Confetti';
import { useSurvey } from '@/contexts/SurveyContext';
import { EmailPreview } from './ui/EmailPreview';

const ThankYou = () => {
  const { t } = useTranslation();
  const { resetSurvey } = useSurvey();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [sendNow, setSendNow] = useState(true);
  const [giftWrap, setGiftWrap] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Symulacja przetwarzania
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert('Zaproszenie zostało wysłane!');
  };
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 min-h-screen">
      <Confetti />
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('survey.thankYou.thankYouMessage')}</h1>
        <p className="text-muted-foreground text-lg mb-8">{t('survey.thankYou.answersRecorded')}</p>
        
        <div className="flex gap-4 justify-center mb-10">
          <Button variant="outline" onClick={resetSurvey}>
            {t('survey.thankYou.fillAgain')}
          </Button>
          <Button>{t('survey.thankYou.getReport')}</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left column */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="bg-card rounded-xl p-6 md:p-8 border border-accent/10 mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('survey.thankYou.almostDone')}</h2>
            <p className="text-lg mb-6">{t('survey.thankYou.invitePartner')}</p>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('survey.thankYou.yourName')}</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('survey.thankYou.yourEmail')}</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('survey.thankYou.partnerName')}</label>
                  <input 
                    type="text" 
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('survey.thankYou.partnerEmail')}</label>
                  <input 
                    type="email" 
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">{t('survey.thankYou.whenToSend')}</label>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    className={`flex items-center px-4 py-2 rounded-md ${sendNow ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}
                    onClick={() => setSendNow(true)}
                  >
                    <Check className={`h-4 w-4 mr-2 ${sendNow ? 'opacity-100' : 'opacity-0'}`} />
                    {t('survey.thankYou.now')}
                  </button>
                  <button 
                    type="button"
                    className={`flex items-center px-4 py-2 rounded-md ${!sendNow ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}
                    onClick={() => setSendNow(false)}
                  >
                    <Check className={`h-4 w-4 mr-2 ${!sendNow ? 'opacity-100' : 'opacity-0'}`} />
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('survey.thankYou.chooseDate')}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <button 
                  type="button"
                  className={`flex items-center px-4 py-2 rounded-md ${giftWrap ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}
                  onClick={() => setGiftWrap(!giftWrap)}
                >
                  <Check className={`h-4 w-4 mr-2 ${giftWrap ? 'opacity-100' : 'opacity-0'}`} />
                  <Gift className="h-4 w-4 mr-2" />
                  {t('survey.thankYou.giftWrap')}
                </button>
              </div>
              
              <div className="bg-card/30 p-4 rounded-md text-sm text-muted-foreground">
                <p>
                  {t('survey.thankYou.termsAccept')} <Link to="/regulamin" className="text-primary hover:underline">{t('survey.thankYou.terms')}</Link> {t('survey.thankYou.and')} <Link to="/polityka-prywatnosci" className="text-primary hover:underline">{t('survey.thankYou.privacyPolicy')}</Link>, {t('survey.thankYou.privacyGuarantee')}
                </p>
              </div>
              
              <div>
                {isProcessing ? (
                  <Button disabled className="w-full py-6 text-lg">
                    {t('survey.thankYou.processing')}
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Link to="/survey" className="flex-none">
                      <Button variant="outline" className="py-6">
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        {t('survey.thankYou.back')}
                      </Button>
                    </Link>
                    <Button type="submit" className="w-full py-6 text-lg">
                      <CreditCard className="h-5 w-5 mr-2" />
                      {t('survey.thankYou.pay')}
                    </Button>
                  </div>
                )}
                <p className="text-center text-sm text-muted-foreground mt-3">
                  <Lock className="h-3 w-3 inline mr-1" />
                  {t('survey.thankYou.securePayment')}
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right column */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-card rounded-xl p-6 md:p-8 border border-accent/10 h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="bg-success/20 text-success rounded-full px-3 py-1 text-xs font-medium inline-flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  {t('survey.thankYou.recommendationRate')}
                </div>
                <h3 className="text-xl font-bold mt-4">{t('survey.thankYou.reportAvailable')}</h3>
                <div className="text-3xl font-bold text-primary mt-1">49 PLN</div>
              </div>
            </div>
            
            <h4 className="uppercase text-sm font-semibold text-muted-foreground mb-3">{t('survey.thankYou.messageWillBeSent')}</h4>
            <EmailPreview 
              from={`${name} <${email}>`}
              to={`${partnerName} <${partnerEmail}>`}
              subject="Secret Sparks: Odkryjmy Nasze Pragnienia"
              previewText={
                <div className="space-y-4 text-left">
                  <p>{t('survey.thankYou.hello')} {partnerName},</p>
                  <p>{name} {t('survey.thankYou.inviteMessage1')}</p>
                  <p>{t('survey.thankYou.inviteMessage2')}</p>
                  <div className="text-center my-6">
                    <Button className="px-6">Wypełnij ankietę</Button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
