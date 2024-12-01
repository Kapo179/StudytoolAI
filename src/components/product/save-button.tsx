// src/components/product/save-button.tsx
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

interface SaveButtonProps {
  productId: string;
  className?: string;
}

export function SaveButton({ productId, className }: SaveButtonProps) {
  const { user, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchSavedStatus = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const savedProducts = userDoc.data().savedProducts || [];
          setIsSaved(savedProducts.includes(productId));
        }
      };
      fetchSavedStatus();
    }
  }, [user, productId]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to save this product.',
        variant: 'destructive',
      });
      signInWithGoogle();
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    if (isSaved) {
      await updateDoc(userDocRef, {
        savedProducts: arrayRemove(productId),
      });
      setIsSaved(false);
      toast({
        title: 'Product Removed',
        description: 'This product has been removed from your saved list.',
      });
    } else {
      await updateDoc(userDocRef, {
        savedProducts: arrayUnion(productId),
      });
      setIsSaved(true);
      toast({
        title: 'Product Saved',
        description: 'This product has been saved to your list.',
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleSave}
    >
      {isSaved ? <Bookmark className="h-6 w-6" /> : <BookmarkPlus className="h-6 w-6" />}
    </Button>
  );
}