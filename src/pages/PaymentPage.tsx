
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
import { useIsMobile } from '@/hooks/use-mobile';

const PRODUCT_PRICE = 29;
const REGULAR_PRICE = 39;
const CURRENCY = 'zł';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const isMobile = useIsMobile();
  
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

  console.log('PaymentPage render - formStep:', formStep);

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('PaymentPage - handleFormSubmit wywołane');
    handleSubmit(e);
  };

  const renderRightColumn = () => {
    if (formStep === 3) {
      // Ukryj testimoniale na urządzeniach mobilnych
      return <div className="space-y-4 px-0 md:px-4">
        {!isMobile && (
          <div className="p-4 space-y-3 bg-transparent">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <h2 className="text-lg font-medium text-white">Wnieście swoją relację na nowy poziom</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <ul className="list-disc pl-5 text-gray-300 space-y-1.5 text-sm">
                  <li>Wspólne fascynacje</li>
                  <li>Gotowe scenariusze</li>
                  <li>Konkretne wskazówki</li>
                  <li>Mapa komfortu</li>
                </ul>
              </div>
              
              <div>
                <ul className="list-disc pl-5 text-gray-300 space-y-1.5 text-sm">
                  <li>Przewodnik rozmowy</li>
                  <li>Plan gry wstępnej</li>
                  <li>Pomysł na wieczór</li>
                  <li>Waszą zgodność</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Ukryj testimoniale na urządzeniach mobilnych */}
        {!isMobile && (
          <div>
            <Testimonials />
          </div>
        )}
      </div>;
    }
    return <EmailPreview partnerName={formData.partnerName} partnerEmail={formData.partnerEmail} userName={formData.userName} />;
  };

  return <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-start">
    <div className="container mx-auto py-6 sm:py-12 px-4 w-full max-w-7xl">
      <div className="flex justify-center mb-6 sm:mb-8">
        <img src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" alt="Secret Sparks Logo" className="h-20 sm:h-28" />
      </div>
      
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <PaymentSteps currentStep={formStep} />
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {formStep === 1 && <Step1Form data={{
                userName: formData.userName,
                userEmail: formData.userEmail
              }} onChange={handleUserFormChange} onSubmit={handleFormSubmit} isValid={formValid} productPrice={PRODUCT_PRICE} regularPrice={REGULAR_PRICE} currency={CURRENCY} />}

              {formStep === 2 && <Step2Form data={{
                partnerName: formData.partnerName,
                partnerEmail: formData.partnerEmail,
                giftWrap: formData.giftWrap,
                ageConfirmed: formData.ageConfirmed
              }} onChange={handlePartnerFormChange} onPrevStep={handlePrevStep} onSubmit={handleFormSubmit} isValid={formValid} isProcessing={isProcessing} />}
                
              {formStep === 3 && <OrderSummaryStep userData={{
                userName: formData.userName,
                userEmail: formData.userEmail,
                partnerName: formData.partnerName,
                partnerEmail: formData.partnerEmail
              }} onPrevStep={handlePrevStep} onSubmit={handleFormSubmit} isProcessing={isProcessing} productPrice={PRODUCT_PRICE} regularPrice={REGULAR_PRICE} currency={CURRENCY} />}
            </form>
          </div>
          
          <div className={`w-full lg:w-1/2 ${isMobile && formStep !== 3 ? 'hidden' : ''} order-1 lg:order-2 mb-4 lg:mb-0`}>
            {renderRightColumn()}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default PaymentPage;
