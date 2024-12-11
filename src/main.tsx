import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import App from './App';
import './index.css';

if (typeof window !== 'undefined') {
  import('global').then(({ global }) => {
    window.global = global;
  });

  import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
  });

  import('process').then(({ process }) => {
    window.process = process;
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);