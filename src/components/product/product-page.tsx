import { Button } from '@/components/ui/button';
import { StarRating } from './star-rating';
import { VoteButton } from './vote-button';
import { Separator } from '@/components/ui/separator';
import {
  Globe,
  Users,
  ExternalLink,
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    votes: number;
    rating: number;
    topics: string[];
    emoji: string;
    pricing: {
      type: 'free' | 'freemium' | 'paid';
      plans?: {
        name: string;
        price: number;
        features: string[];
      }[];
    };
    websiteUrl: string;
    stats: {
      users: number;
      reviews: number;
    };
  };
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Card */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#1D2126] text-3xl">
                  {product.emoji}
                </div>
                <div className="space-y-1">
                  <h1 className="font-cal text-2xl md:text-3xl">{product.name}</h1>
                  <p className="text-base text-muted-foreground md:text-lg">
                    {product.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <VoteButton initialVotes={product.votes} />
                <Button
                  className="bg-mint text-white hover:bg-mint/90"
                  onClick={() => window.open(product.websiteUrl, '_blank')}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t">
            <ScrollArea className="w-full">
              <div className="flex divide-x px-6 py-4">
                <div className="px-6">
                  <p className="font-medium capitalize">{product.pricing.type}</p>
                  <p className="text-sm text-muted-foreground">Pricing</p>
                </div>
                <div className="px-6">
                  <p className="font-medium">2024</p>
                  <p className="text-sm text-muted-foreground">Launch Date</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* About */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="font-cal text-xl">About {product.name}</h2>
                <p className="mt-4 text-muted-foreground">{product.description}</p>
              </div>

              {/* Screenshots */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="font-cal text-xl">Screenshots</h2>
                <div className="mt-4 grid gap-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={`https://images.unsplash.com/photo-${index}?w=1200&h=675&fit=crop`}
                          alt={`${product.name} screenshot ${index}`}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-cal text-xl">User Reviews</h2>
                  <Button variant="outline">Write a Review</Button>
                </div>
                <div className="mt-6 space-y-6">
                  {[1, 2].map((index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted" />
                          <div>
                            <p className="font-medium">User {index}</p>
                            <p className="text-sm text-muted-foreground">
                              {index === 1 ? '2 days ago' : '1 week ago'}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={5} />
                      </div>
                      <p className="text-muted-foreground">
                        Great tool! Really helped improve my study routine.
                      </p>
                      {index !== 2 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-cal text-xl">Pricing</h3>
              <div className="mt-4 space-y-4">
                {product.pricing.plans?.map((plan, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{plan.name}</h4>
                      <p className="font-medium">${plan.price}/mo</p>
                    </div>
                    <ul className="mt-2 space-y-2">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-muted-foreground">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-cal text-xl">Quick Links</h3>
              <div className="mt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(product.websiteUrl, '_blank')}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Community
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
