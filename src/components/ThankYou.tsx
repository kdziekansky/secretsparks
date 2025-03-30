
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSurvey } from '@/contexts/SurveyContext';
import { Clipboard, Check, Send, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/Confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EmailPreview from '@/components/ui/EmailPreview';
import { toast } from 'sonner';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { resetSurvey } = useSurvey();
  
  const partnerLink = window.location.href;
  
  useEffect(() => {
    let timeout: number;
    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);
  
  const copyLink = () => {
    navigator.clipboard.writeText(partnerLink);
    setCopied(true);
    toast.success(t('survey.thankYou.linkCopied'));
  };
  
  const sendEmail = () => {
    if (!partnerEmail) {
      toast.error(t('survey.thankYou.enterEmail'));
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      toast.success(t('survey.thankYou.emailSent'));
      setPartnerEmail('');
    }, 1500);
  };
  
  return (
    <div className="glass-card p-8 md:p-12 w-full max-w-3xl mx-auto">
      <Confetti />
      
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">{t('survey.thankYou.title')}</h1>
        <p className="text-lg mb-8">
          {t('survey.thankYou.subtitle')}
        </p>
        
        <div className="bg-card p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('survey.thankYou.invitePartner')}</h2>
          <p className="mb-4">{t('survey.thankYou.inviteExplanation')}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                value={partnerLink}
                readOnly
                className="w-full py-2 px-3 border rounded-md bg-card/50"
              />
            </div>
            <Button 
              onClick={copyLink} 
              className="flex items-center justify-center"
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
              {copied ? t('survey.thankYou.copied') : t('survey.thankYou.copyLink')}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="email"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                placeholder={t('survey.thankYou.partnerEmail')}
                className="w-full py-2 px-3 border rounded-md"
              />
            </div>
            
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  {t('survey.thankYou.preview')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{t('survey.thankYou.previewTitle')}</DialogTitle>
                </DialogHeader>
                <EmailPreview />
              </DialogContent>
            </Dialog>
            
            <Button 
              onClick={sendEmail} 
              disabled={isSending || !partnerEmail}
              className="flex items-center justify-center"
            >
              {isSending ? (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {t('survey.thankYou.sendInvite')}
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={resetSurvey}
            variant="outline" 
            className="w-full sm:w-auto"
          >
            {t('survey.thankYou.startNew')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
