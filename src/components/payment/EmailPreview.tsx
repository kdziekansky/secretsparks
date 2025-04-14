
import React from 'react';

interface EmailPreviewProps {
  partnerName: string;
  partnerEmail: string;
  userName: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ partnerName, partnerEmail, userName }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-800 bg-[#0D0D12] h-full">
      <div className="bg-[#0D0D12] text-center p-4 border-b border-gray-800">
        <p className="text-gray-200 text-sm font-medium">TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO PARTNERA/PARTNERKI</p>
      </div>
      
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-sm">Od</span>
          <span className="text-white">Secret Sparks</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-sm">Do</span>
          <span className="text-white">{partnerName ? `${partnerName} <${partnerEmail || 'email@gmail.com'}>` : 'Imię <email@gmail.com>'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Temat</span>
          <div className="flex items-center">
            <span className="text-amber-500 mr-2">🔔</span>
            <span className="text-white"> {userName || 'Ktoś'} zaprasza Cię do gry</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 text-gray-200">
        <div className="space-y-4">
          <p>Cześć,</p>
          
          <p>
            {userName ? `${userName}` : 'Twój partner'} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam odkryć wspólne pragnienia i fantazje, o których może nawet nie wiedzieliście.
          </p>
          
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium mb-1">Jak to działa?</h3>
            <p className="text-sm text-gray-300">
              Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. {userName ? userName : 'Twój partner'} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, które oboje uznaliście za atrakcyjne.
            </p>
          </div>
          
          <p>
            Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
