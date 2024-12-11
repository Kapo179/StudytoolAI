import * as React from 'react';
import { Providers } from '@/components/providers';
import './globals.css';

// Import Google Fonts using a standard method
const inter = new FontFace('Inter', 'url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.fonts.add(inter);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Providers>
        {children}
      </Providers>
    </div>
  );
}