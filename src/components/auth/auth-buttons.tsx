import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Bookmark } from 'lucide-react'; // Import Bookmark icon
import { Link } from 'react-router-dom'; // Import Link component

export function AuthButtons() {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/saved">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Products
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={signOutUser}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="hidden md:inline-flex"
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
      <Button
        className="hidden bg-mint text-white hover:bg-mint/90 md:inline-flex"
        onClick={signInWithGoogle}
      >
        Sign Up Free
      </Button>
    </>
  );
}