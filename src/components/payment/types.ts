
export interface UserFormData {
  userName: string;
  userEmail: string;
}

export interface PartnerFormData {
  partnerName: string;
  partnerEmail: string;
  giftWrap: boolean;
  ageConfirmed: boolean;
}

export interface PaymentFormData extends UserFormData, PartnerFormData {}
