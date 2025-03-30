
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmailPreviewProps {
  from?: string;
  to?: string;
  subject?: string;
  userName?: string;
  partnerName?: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ 
  from = "Gra Secret Sparks", 
  to = "email@partnera.com", 
  userName = "Użytkownik", 
  partnerName = "Partner" 
}) => {
  const [activeTab, setActiveTab] = useState<'invitation' | 'confirmation'>('invitation');
  const { t } = useTranslation();

  return (
    <div className="h-full">
      <Card className="shadow-lg rounded-lg border-border bg-black h-full overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="bg-black p-4 text-center text-sm border-b border-gray-800">
            <p className="font-medium text-white">{t('emailPreview.notificationToPartner')}</p>
          </div>
          
          <div className="bg-black p-4 border-b border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-400">{t('emailPreview.from')}</div>
              <div className="font-medium text-white">{from}</div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-400">{t('emailPreview.to')}</div>
              <div className="font-medium text-white">{to}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">{t('emailPreview.subject')}</div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium text-white">
                  {activeTab === 'invitation' 
                    ? t('emailPreview.invitationSubject') 
                    : t('emailPreview.confirmationSubject')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex border-b border-gray-800">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'invitation' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-black text-gray-300 hover:bg-gray-900'
              }`}
              onClick={() => setActiveTab('invitation')}
            >
              {t('emailPreview.invitationEmail')}
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'confirmation' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-black text-gray-300 hover:bg-gray-900'
              }`}
              onClick={() => setActiveTab('confirmation')}
            >
              {t('emailPreview.confirmationEmail')}
            </button>
          </div>
          
          <div className="flex-1 overflow-auto bg-black text-white p-0">
            {activeTab === 'invitation' ? (
              <InvitationPreview userName={userName} partnerName={partnerName} />
            ) : (
              <ConfirmationPreview userName={userName} partnerName={partnerName} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const InvitationPreview: React.FC<{ userName: string; partnerName: string }> = ({ 
  userName, 
  partnerName 
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-red-600 py-4 text-white text-center">
        <h2 className="text-lg font-medium">{t('emailPreview.invitation.title')}</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <p>{t('emailPreview.invitation.greeting')}</p>
        
        <p>
          {userName} {t('emailPreview.invitation.paragraph1')} 
          <span className="text-red-500"> {t('emailPreview.invitation.highlight')}</span>, 
          {t('emailPreview.invitation.paragraph2')}
        </p>
        
        <div className="border-l-4 border-red-600 pl-4 py-2">
          <h3 className="font-medium mb-1">{t('emailPreview.invitation.howItWorks')}</h3>
          <p className="text-sm text-gray-300">
            {t('emailPreview.invitation.howItWorksText').replace('', userName)}
          </p>
        </div>
        
        <p>
          {t('emailPreview.invitation.confidentiality').replace('', userName)}
        </p>
        
        <div className="flex justify-center mt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded">
            {t('emailPreview.invitation.button')}
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>{t('emailPreview.invitation.footer')}</p>
        </div>
      </div>
    </div>
  );
};

const ConfirmationPreview: React.FC<{ userName: string; partnerName: string }> = ({ 
  userName,
  partnerName
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-red-600 py-4 text-white text-center">
        <h2 className="text-lg font-medium">{t('emailPreview.confirmation.title')}</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <p>{t('emailPreview.confirmation.greeting')} {userName},</p>
        
        <p>
          {t('emailPreview.confirmation.paragraph1')}
        </p>
        
        <div className="border-l-4 border-red-600 pl-4 py-2">
          <h3 className="font-medium mb-1">{t('emailPreview.confirmation.whatsNext')}</h3>
          <p className="text-sm text-gray-300">
            {t('emailPreview.confirmation.whatsNextText').replace('', partnerName)}
          </p>
        </div>
        
        <div className="bg-gray-900 p-2 rounded">
          <p className="font-medium">{t('emailPreview.confirmation.orderNumber')} <span className="font-mono text-xs">#28a95bc7</span></p>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>{t('emailPreview.confirmation.footer')}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
