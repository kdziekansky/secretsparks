
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import PaymentSteps from '@/components/payment/PaymentSteps';
import Step1Form from '@/components/payment/Step1Form';
import Step2Form from '@/components/payment/Step2Form';
import OrderSummaryStep from '@/components/payment/OrderSummaryStep';
import EmailPreview from '@/components/payment/EmailPreview';
import { CheckCircle2 } from 'lucide-react';
import Testimonials from '@/components/payment/Testimonials';

const PRODUCT_PRICE = 29;
const REGULAR_PRICE = 39;
const CURRENCY = 'zł';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const {
    formData,
    formStep,
    formValid,
    isProcessing,
    handleUserFormChange,
    handlePartnerFormChange,
    handlePrevStep,
    handleSubmit
  } = usePaymentForm(orderId);

  const renderRightColumn = () => {
    if (formStep === 3) {
      return <div className="space-y-6 px-0 md:px-4">
        <div className="p-5 space-y-4 bg-transparent">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-medium text-white">Wnieście swoją relację na nowy poziom</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Wspólne fascynacje</li>
                <li>Gotowe scenariusze</li>
                <li>Konkretne wskazówki</li>
                <li>Mapa komfortu</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Przewodnik rozmowy</li>
                <li>Plan gry wstępnej</li>
                <li>Pomysł na wieczór</li>
                <li>Waszą zgodność</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <Testimonials />
        </div>
      </div>;
    }
    return <EmailPreview partnerName={formData.partnerName} partnerEmail={formData.partnerEmail} userName={formData.userName} />;
  };

  return <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-start">
    <div className="container mx-auto py-12 px-4 w-full max-w-7xl">
      <div className="flex justify-center mb-8">
        <img src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" alt="Secret Sparks Logo" className="h-28" />
      </div>
      
      <div className="mx-auto max-w-6xl px-4">
        <PaymentSteps currentStep={formStep} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {formStep === 1 && <Step1Form data={{
                userName: formData.userName,
                userEmail: formData.userEmail
              }} onChange={handleUserFormChange} onSubmit={handleSubmit} isValid={formValid} productPrice={PRODUCT_PRICE} regularPrice={REGULAR_PRICE} currency={CURRENCY} />}

              {formStep === 2 && <Step2Form data={{
                partnerName: formData.partnerName,
                partnerEmail: formData.partnerEmail,
                giftWrap: formData.giftWrap,
                ageConfirmed: formData.ageConfirmed
              }} onChange={handlePartnerFormChange} onPrevStep={handlePrevStep} onSubmit={handleSubmit} isValid={formValid} isProcessing={isProcessing} />}
                
              {formStep === 3 && <OrderSummaryStep userData={{
                userName: formData.userName,
                userEmail: formData.userEmail,
                partnerName: formData.partnerName,
                partnerEmail: formData.partnerEmail
              }} onPrevStep={handlePrevStep} onSubmit={handleSubmit} isProcessing={isProcessing} productPrice={PRODUCT_PRICE} regularPrice={REGULAR_PRICE} currency={CURRENCY} />}
            </form>
          </div>
          
          <div className="w-full lg:w-1/2">
            {renderRightColumn()}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default PaymentPage;
