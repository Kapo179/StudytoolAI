// src/components/product/save-button.tsx
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkPlus, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface SaveButtonProps {
  productId: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void; // Add onClick prop
}

export function SaveButton({ productId, className, onClick }: SaveButtonProps) {
  const { user, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

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

  const handleSave = async (e: React.MouseEvent) => {
    if (onClick) onClick(e); // Call onClick prop if provided

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
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1000);
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
      {showCheck ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <CheckCircle className="h-6 w-6 text-green-500" />
        </motion.div>
      ) : (
        isSaved ? <Bookmark className="h-6 w-6" /> : <BookmarkPlus className="h-6 w-6" />
      )}
    </Button>
  );
}