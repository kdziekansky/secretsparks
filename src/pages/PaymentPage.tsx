
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import PaymentSteps from '@/components/payment/PaymentSteps';
import Step1Form from '@/components/payment/Step1Form';
import Step2Form from '@/components/payment/Step2Form';
import EmailPreview from '@/components/payment/EmailPreview';

// Fixed product price at 29 zł, gift wrapping is free
const PRODUCT_PRICE = 29;
const REGULAR_PRICE = 39; // Dodana regularna cena dla promocji
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

  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-start">
      <div className="container mx-auto py-12 px-4 w-full max-w-7xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" alt="Secret Sparks Logo" className="h-28" />
        </div>
        
        <div className="mx-auto max-w-6xl px-4">
          {/* Komponent kroków */}
          <PaymentSteps currentStep={formStep} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-5">
                {formStep === 1 && (
                  <Step1Form 
                    data={{
                      userName: formData.userName,
                      userEmail: formData.userEmail
                    }}
                    onChange={handleUserFormChange}
                    onSubmit={handleSubmit}
                    isValid={formValid}
                    productPrice={PRODUCT_PRICE}
                    regularPrice={REGULAR_PRICE}
                    currency={CURRENCY}
                  />
                )}

                {formStep === 2 && (
                  <Step2Form 
                    data={{
                      partnerName: formData.partnerName,
                      partnerEmail: formData.partnerEmail,
                      giftWrap: formData.giftWrap,
                      ageConfirmed: formData.ageConfirmed
                    }}
                    onChange={handlePartnerFormChange}
                    onPrevStep={handlePrevStep}
                    onSubmit={handleSubmit}
                    isValid={formValid}
                    isProcessing={isProcessing}
                    productPrice={PRODUCT_PRICE}
                    regularPrice={REGULAR_PRICE}
                    currency={CURRENCY}
                  />
                )}
              </form>
            </div>
            
            {/* Email Preview Section */}
            <div className="w-full lg:w-1/2">
              <EmailPreview
                partnerName={formData.partnerName}
                partnerEmail={formData.partnerEmail}
                userName={formData.userName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
