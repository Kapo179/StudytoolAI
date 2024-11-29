import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// In a real app, use a secure method to store and verify this
const ADMIN_PASSWORD = 'admin123';

export function AdminLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      toast({
        title: "Access Locked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be a secure API call
    if (password === ADMIN_PASSWORD) {
      navigate('/admin');
      setIsOpen(false);
      setPassword('');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 300000); // 5 minutes lockout
      }

      toast({
        title: "Invalid Password",
        description: `Access denied. ${3 - newAttempts} attempts remaining.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-50 hover:opacity-100"
        onClick={() => setIsOpen(true)}
      >
        <Lock className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter the admin password to continue.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLocked || !password}
            >
              Access Admin Panel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}