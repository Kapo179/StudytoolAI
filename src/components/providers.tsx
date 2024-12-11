"use client"

import * as React from 'react';
import { ThemeProvider, type ThemeProviderProps } from '@/components/theme/theme-provider';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}