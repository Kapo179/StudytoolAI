import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';
import { HEADER_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text.tsx';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:h-16 md:px-6">
        {/* Logo - Always visible */}
        <Link to="/">
          <AnimatedGradientText>
            <h1 className="text-2xl font-bold">AIStudytools</h1>
          </AnimatedGradientText>
        </Link>
        {/* Navigation - Hidden on mobile */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {HEADER_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    to={link.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
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
            {HEADER_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center text-sm font-medium transition-colors hover:text-mint"
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
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