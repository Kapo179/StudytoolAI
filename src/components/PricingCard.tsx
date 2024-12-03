// src/components/PricingCard.tsx
import React from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { BorderBeam } from '@/components/magicui/border-beam';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  currency: string;
  period: string;
  buttonText: string;
  features: string[];
  greyTicks?: number; // Add this prop
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  currency,
  period,
  buttonText,
  features,
  greyTicks = 0, // Default to 0 if not provided
}) => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className={`relative w-full max-w-xs rounded-lg border p-4 shadow-lg transition-transform transform hover:scale-105 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <BorderBeam className="rounded-lg" />
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* Subtitle */}
        <h2 className="text-center text-lg text-muted-foreground">{subtitle}</h2>
        {/* Price */}
        <div className="flex items-center justify-between w-full px-5 font-semibold">
          <div className="text-6xl">{price}</div>
          <div className="flex flex-col ml-3">
            <div className="text-2xl font-bold">{currency}</div>
            <div className="text-xl">{period}</div>
          </div>
        </div>
        {/* CTA Button */}
        <button className={`w-full rounded-md px-4 py-2 text-xl font-semibold ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
          {buttonText}
        </button>
        {/* Features */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-start gap-2 w-full">
              {/* Icon */}
              <div className="h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={index >= features.length - greyTicks ? '#B5B5B5' : '#3dbb77'} className="w-6 h-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              {/* Description */}
              <p className="text-sm font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};