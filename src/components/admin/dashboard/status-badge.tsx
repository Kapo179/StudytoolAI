import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, { color: string; icon: JSX.Element }> = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      icon: <AlertTriangle className="mr-1 h-3 w-3" />,
    },
    approved: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
    },
    rejected: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      icon: <XCircle className="mr-1 h-3 w-3" />,
    },
    reported: {
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      icon: <AlertTriangle className="mr-1 h-3 w-3" />,
    },
  };

  const { color, icon } = variants[status] || variants.pending;

  return (
    <Badge variant="outline" className={cn('flex items-center gap-1', color)}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}