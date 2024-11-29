
declare module 'input-OTP' {
  import * as React from 'react';

  export interface OTPInputProps extends React.ComponentPropsWithoutRef<'div'> {
    containerClassName?: string;
  }

  export const OTPInput: React.ForwardRefExoticComponent<OTPInputProps & React.RefAttributes<HTMLDivElement>>;

  export interface OTPInputContextValue {
    slots: {
      char: string;
      hasFakeCaret: boolean;
      isActive: boolean;
    }[];
  }

  export const OTPInputContext: React.Context<OTPInputContextValue>;
}