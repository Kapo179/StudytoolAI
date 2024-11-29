import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ProductManager } from '@/lib/admin/product-management';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  submission: {
    id: string;
    name: string;
    description: string;
    submittedBy: string;
    status: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewComplete: () => void;
}

export function ReviewDialog({ submission, open, onOpenChange, onReviewComplete }: ReviewDialogProps) {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (action: 'approve' | 'reject') => {
    try {
      setIsLoading(true);
      await ProductManager.approveProduct(submission.id);
      
      toast({
        title: `Submission ${action}ed`,
        description: `${submission.name} has been ${action}ed successfully.`,
      });
      
      onReviewComplete();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process the submission. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Submission</DialogTitle>
          <DialogDescription>
            Review the details of this submission and take appropriate action.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Product Name</h3>
            <p className="text-sm text-muted-foreground">{submission.name}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-muted-foreground">{submission.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Submitted By</h3>
            <p className="text-sm text-muted-foreground">{submission.submittedBy}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Review Notes</h3>
            <Textarea
              placeholder="Add any notes about this submission..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="destructive"
            onClick={() => handleAction('reject')}
            disabled={isLoading}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleAction('approve')}
            disabled={isLoading}
            className="bg-mint text-white hover:bg-mint/90"
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}