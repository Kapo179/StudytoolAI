import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, MessageCircle, Link as LinkIcon, Users } from 'lucide-react';

export function SubmissionInfoPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">
        <h1 className="font-cal text-4xl font-bold text-center">Why Submit Your SaaS Tool?</h1>
        <p className="text-lg text-muted-foreground text-center">
          Submitting your SaaS tool to our platform provides numerous benefits:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <Eye className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Increase Visibility</h3>
              <p className="text-muted-foreground">
                Reach a targeted audience of learners and educators.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MessageCircle className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Gain Feedback</h3>
              <p className="text-muted-foreground">
                Receive valuable feedback from users to improve your product.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <LinkIcon className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Boost SEO</h3>
              <p className="text-muted-foreground">
                Enhance your SEO with backlinks from our high-traffic site.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Join a Community</h3>
              <p className="text-muted-foreground">
                Collaborate with other developers in our innovative SaaS community.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Access Analytics</h3>
              <p className="text-muted-foreground">
                Track the performance of your submission with detailed analytics.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Ready to get started? Click the button below to submit your SaaS tool.
          </p>
          <Link to="/submit">
            <Button variant="default" className="mt-4">Submit Your Tool</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}