import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Heart, CheckCircle } from 'lucide-react';

interface EmailPreviewProps {
  from: string;
  to: string;
  subject: string;
  userName: string;
  partnerName: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ from, to, subject, userName, partnerName }) => {
  const [activeTab, setActiveTab] = useState<'invitation' | 'confirmation'>('invitation');

  return (
    <div className="h-full">
      <Card className="shadow-lg rounded-lg border-border bg-card/60 backdrop-blur h-full">
        <div className="flex flex-col h-full">
          <div className="bg-muted/30 p-4 text-center text-sm rounded-t-lg">
            <p className="font-medium">TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO TWOJEJ PARTNERKI</p>
          </div>
          
          <div className="bg-card/60 p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">Od</div>
              <div className="font-medium">Gra Secret Sparks</div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">Do</div>
              <div className="font-medium text-primary">{to}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">Temat</div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium">{subject}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex gap-2 border-b">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                activeTab === 'invitation' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
              onClick={() => setActiveTab('invitation')}
            >
              Email zaproszeniowy
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                activeTab === 'confirmation' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
              onClick={() => setActiveTab('confirmation')}
            >
              Email potwierdzający
            </button>
          </div>
          
          <CardContent className="flex-1 overflow-auto p-0">
            {activeTab === 'invitation' ? (
              <InvitationPreview userName={userName} partnerName={partnerName} />
            ) : (
              <ConfirmationPreview userName={userName} />
            )}
          </CardContent>
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
    <div className="p-4 space-y-4">
      <div className="bg-primary rounded-md p-4 text-white text-center">
        <h2 className="text-xl font-bold mb-1">Zaproszenie do wyjątkowej gry</h2>
      </div>
      
      <p>Cześć {partnerName},</p>
      
      <p>
        {userName} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam 
        <span className="text-primary font-medium"> odkryć wspólne pragnienia i fantazje</span>, 
        o których może nawet nie wiedzieliście.
      </p>
      
      <div className="bg-muted/30 p-4 rounded-md border-l-4 border-primary">
        <h3 className="font-medium text-lg mb-1">Jak to działa?</h3>
        <p className="text-sm">
          Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. 
          {userName} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi 
          stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, 
          które oboje uznaliście za atrakcyjne.
        </p>
      </div>
      
      <p>
        Twoje odpowiedzi są <strong>całkowicie poufne</strong> – {userName} nigdy 
        nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania 
        w raporcie końcowym.
      </p>
      
      <div className="text-center mt-6">
        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full">
          Rozpocznij ankietę
        </button>
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>Pozdrawiamy,<br/>Zespół Secret Sparks</p>
      </div>
    </div>
  );
};

const ConfirmationPreview: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-primary rounded-md p-4 text-white text-center">
        <h2 className="text-xl font-bold mb-1">Dziękujemy za zakup!</h2>
      </div>
      
      <p>Cześć {userName},</p>
      
      <p>
        Dziękujemy za zamówienie raportu Secret Sparks. To pierwszy krok do odkrycia 
        zupełnie nowego wymiaru Waszej relacji!
      </p>
      
      <div className="bg-muted/30 p-4 rounded-md border-l-4 border-primary">
        <h3 className="font-medium text-lg mb-1">Co się teraz stanie?</h3>
        <p className="text-sm">
          Właśnie wysłaliśmy zaproszenie do ankiety do Twojej partnerki.
          Gdy wypełni swoją część ankiety, nasz system AI przeanalizuje Wasze 
          odpowiedzi i przygotuje spersonalizowany raport, który pomoże Wam 
          odkryć wspólne pragnienia.
        </p>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <CheckCircle className="text-green-500 h-5 w-5" />
        <p className="font-medium">Numer Twojego zamówienia: <span className="bg-muted/40 p-1 rounded text-xs font-mono">#28a95bc7</span></p>
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>Z gorącymi pozdrowieniami,<br/>Zespół Secret Sparks</p>
      </div>
    </div>
  );
};

export default EmailPreview;
