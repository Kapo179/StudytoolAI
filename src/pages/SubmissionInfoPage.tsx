// src/pages/SubmissionInfoPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle, Link as LinkIcon, Users } from 'lucide-react';
import { PricingCard } from '@/components/PricingCard';
import { BorderBeam } from '@/components/magicui/border-beam';

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
        </div>
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Ready to get started? Click the button below to submit your SaaS tool.
          </p>
          <Link to="/submit">
            <Button variant="default" className="mt-4">Submit Your Tool</Button>
          </Link>
        </div>
        {/* Pricing Cards */}
        <div className="flex justify-center gap-8 flex-nowrap">
          <PricingCard
            title="Free"
            subtitle="Slate helps you see how many more days you need"
            price="19"
            currency="$"
            period="per month"
            buttonText="Try for Free"
            features={[
              "Unlimited product updates",
              "Slate helps you see how",
              "Amazing offers",
              "1GB Cloud Storage",
              "Email and community support",
            ]}
            greyTicks={3} // Add this prop
          />
          <div className="relative">
            <BorderBeam className="rounded-lg" />
            <PricingCard
              title="Pro"
              subtitle="Get more features with the Pro plan"
              price="49"
              currency="$"
              period="per month"
              buttonText="Get Started"
              features={[
                "Unlimited product updates",
                "Priority support",
                "Advanced analytics",
                "10GB Cloud Storage",
                "Email and community support",
              ]}
              greyTicks={2} // Add this prop
            />
          </div>
          <PricingCard
            title="Enterprise"
            subtitle="Best for large teams and organizations"
            price="99"
            currency="$"
            period="per month"
            buttonText="Contact Us"
            features={[
              "Unlimited product updates",
              "Dedicated support",
              "Custom integrations",
              "100GB Cloud Storage",
              "Email and community support",
            ]}
          />
        </div>
      </div>
    </div>
  );
}