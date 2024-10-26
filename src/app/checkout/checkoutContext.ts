import { createContext, SetStateAction, useContext } from 'react';

export interface checkoutInfoType {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  locationType: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  country: string;
  del_phone: string;
  occasion?: string;
  message?: string;
}

// Define the context type to include both the state and the setter
export type CheckoutContextType = {
    setStep: React.Dispatch<SetStateAction<number>>,
  checkoutInfo: checkoutInfoType;
  setCheckoutInfo: React.Dispatch<React.SetStateAction<checkoutInfoType>>;
};

// Update the context to use the new type
export const checkoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function useCheckout() {
  const context = useContext(checkoutContext);
  if (context === undefined) {
    throw new Error('Checkout context is undefined');
  }
  return context;
}
