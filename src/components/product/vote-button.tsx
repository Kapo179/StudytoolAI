import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowBigUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { LoginPromptDialog } from '../product/LoginPromptDialog';

interface VoteButtonProps {
  initialVotes: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function VoteButton({ initialVotes, className, onClick }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth(); // Get the current user

  const handleVote = (e: React.MouseEvent) => {
    if (!user) {
      // Show the login prompt dialog
      return;
    }

    if (onClick) {
      onClick(e);
    } else {
      if (hasVoted) {
        setVotes((prev) => prev - 1);
      } else {
        setVotes((prev) => prev + 1);
      }
      setHasVoted(!hasVoted);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            className={cn(
              'flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl hover:bg-accent',
              hasVoted && 'bg-mint/10 text-mint',
              className
            )}
          >
            <ArrowBigUp
              className={cn('h-6 w-6', hasVoted && 'fill-mint stroke-mint')}
            />
            <span className="text-xs font-medium">{votes}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {hasVoted ? 'Remove vote' : 'Upvote this product'}
        </TooltipContent>
      </Tooltip>
      {!user && <LoginPromptDialog />}
    </TooltipProvider>
  );
}