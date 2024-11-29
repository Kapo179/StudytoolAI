import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Search, Menu, X } from 'lucide-react';
import { HEADER_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/theme/mode-toggle';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:h-16 md:px-6">
        {/* Logo - Always visible */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-cal text-lg font-medium">StudyScope</span>
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
          <div
            className={cn(
              'w-full transition-all md:w-auto md:flex-none',
              isSearchOpen ? 'flex' : 'hidden md:flex'
            )}
          >
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search study tools..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

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