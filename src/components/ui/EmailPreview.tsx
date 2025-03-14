
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

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

  return (
    <div className="h-full">
      <Card className="shadow-lg rounded-lg border-border bg-black h-full overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="bg-black p-4 text-center text-sm border-b border-gray-800">
            <p className="font-medium text-white">TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO TWOJEJ PARTNERKI</p>
          </div>
          
          <div className="bg-black p-4 border-b border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-400">Od</div>
              <div className="font-medium text-white">{from}</div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-400">Do</div>
              <div className="font-medium text-white">{to}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">Temat</div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium text-white">Ktoś zaprasza Cię do gry</span>
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
              Email zaproszeniowy
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'confirmation' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-black text-gray-300 hover:bg-gray-900'
              }`}
              onClick={() => setActiveTab('confirmation')}
            >
              Email potwierdzający
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
  return (
    <div className="flex flex-col h-full">
      <div className="bg-red-600 py-4 text-white text-center">
        <h2 className="text-lg font-medium">Zaproszenie do wyjątkowej gry</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <p>Cześć,</p>
        
        <p>
          {userName} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam 
          <span className="text-red-500"> odkryć wspólne pragnienia i fantazje</span>, 
          o których może nawet nie wiedzieliście.
        </p>
        
        <div className="border-l-4 border-red-600 pl-4 py-2">
          <h3 className="font-medium mb-1">Jak to działa?</h3>
          <p className="text-sm text-gray-300">
            Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. 
            {userName} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi 
            stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, 
            które oboje uznaliście za atrakcyjne.
          </p>
        </div>
        
        <p>
          Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich 
          indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
        </p>
        
        <div className="flex justify-center mt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded">
            Rozpocznij ankietę
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>Pozdrawiamy,<br/>Zespół Secret Sparks</p>
        </div>
      </div>
    </div>
  );
};

const ConfirmationPreview: React.FC<{ userName: string; partnerName: string }> = ({ 
  userName,
  partnerName
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-red-600 py-4 text-white text-center">
        <h2 className="text-lg font-medium">Dziękujemy za zakup!</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <p>Cześć {userName},</p>
        
        <p>
          Dziękujemy za zamówienie raportu Secret Sparks. To pierwszy krok do odkrycia 
          zupełnie nowego wymiaru Waszej relacji!
        </p>
        
        <div className="border-l-4 border-red-600 pl-4 py-2">
          <h3 className="font-medium mb-1">Co się teraz stanie?</h3>
          <p className="text-sm text-gray-300">
            Właśnie wysłaliśmy zaproszenie do ankiety do {partnerName}.
            Gdy wypełni swoją część ankiety, nasz system AI przeanalizuje Wasze 
            odpowiedzi i przygotuje spersonalizowany raport, który pomoże Wam 
            odkryć wspólne pragnienia.
          </p>
        </div>
        
        <div className="bg-gray-900 p-2 rounded">
          <p className="font-medium">Numer Twojego zamówienia: <span className="font-mono text-xs">#28a95bc7</span></p>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>Z gorącymi pozdrowieniami,<br/>Zespół Secret Sparks</p>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
