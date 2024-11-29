import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export function useAutoSave(form: UseFormReturn<any>) {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        localStorage.setItem('product-form-draft', JSON.stringify(data));
        toast({
          title: 'Draft saved',
          description: 'Your changes have been automatically saved',
        });
      }, 1000);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [form, toast]);
}