// src/components/layout/header.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/theme/mode-toggle';
import ShinyButton from '@/components/magicui/shiny-button'; // Import the shiny button as default export

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:h-16 md:px-6">
        {/* Logo - Always visible */}
        <Link to="/">
          <img src="/assets/images/logo/L0026.png" alt="AIStudytools Logo" className="h-10" />
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <ShinyButton>Database</ShinyButton>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />
            <AuthButtons />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'border-b md:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="container px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <ShinyButton>I'm Ready</ShinyButton>
            <div className="flex items-center gap-2 pt-2">
              <ModeToggle />
              <AuthButtons />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}