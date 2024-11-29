import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Star, Trash2 } from 'lucide-react';
import { StatusBadge } from './status-badge';

interface Submission {
  id: string;
  name: string;
  category: string;
  submittedBy: string;
  status: string;
  submittedAt: string;
  votes: number;
  reports: number;
}

interface SubmissionsTableProps {
  submissions: Submission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Submitted By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Votes</TableHead>
          <TableHead>Reports</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="font-medium">
              {submission.name}
            </TableCell>
            <TableCell>{submission.category}</TableCell>
            <TableCell>{submission.submittedBy}</TableCell>
            <TableCell>
              <StatusBadge status={submission.status} />
            </TableCell>
            <TableCell>
              {new Date(submission.submittedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                {submission.votes}
              </div>
            </TableCell>
            <TableCell>
              {submission.reports > 0 ? (
                <Badge variant="destructive">
                  {submission.reports}
                </Badge>
              ) : (
                '0'
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Approve</DropdownMenuItem>
                  <DropdownMenuItem>Reject</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}