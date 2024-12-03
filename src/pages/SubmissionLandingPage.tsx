import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function SubmissionLandingPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-2">
        <h1 className="font-cal text-3xl">Submission Successful</h1>
        <p className="text-muted-foreground">
          Your study tool has been submitted for review. You will receive an email confirmation shortly.
        </p>
        <Link to="/">
          <Button variant="default">Go to Home</Button> 
        </Link>
      </div>
    </div>
  );
}