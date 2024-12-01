import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { VoteButton } from './vote-button';
import { StarRating } from './star-rating';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    tagline: string;
    votes: number;
    rating: number;
    topics: string[];
    websiteUrl?: string;
    images: string[];
    logo: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click
    if (product.websiteUrl) {
      window.open(product.websiteUrl, '_blank');
    }
  };

  return (
    <TooltipProvider>
      <Link 
        to={`/product/${product.id}`}
        className="block"
      >
        <div className="group card-hover flex flex-col gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent/5 sm:flex-row">
          <VoteButton
            initialVotes={product.votes}
            className="hidden sm:flex"
            onClick={handleVote}
          />
          <div className="flex flex-1 flex-col space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg transform scale-105">
                <img src={product.logo} alt={`${product.name} logo`} className="product-logo" />
                </div>
                <div>
                  <h3 className="font-cal text-lg font-medium tracking-tight transition-colors group-hover:text-mint">
                    {product.name}
                  </h3>
                  <p className="hidden sm:block text-sm text-muted-foreground">{product.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {product.websiteUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:inline-flex"
                        onClick={handleVisit}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Visit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Visit website</TooltipContent>
                  </Tooltip>
                )}
                <VoteButton
                  initialVotes={product.votes}
                  className="flex h-10 w-16 sm:hidden"
                  onClick={handleVote}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground transition-opacity group-hover:opacity-90">
              {product.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <StarRating rating={product.rating} />
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {product.topics.map((topic) => (
                    <span
                      key={topic}
                      className="button-hover inline-flex items-center rounded-full bg-mint/10 px-2.5 py-0.5 text-xs font-medium text-mint transition-all hover:bg-mint/20"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                {product.websiteUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="sm:hidden"
                    onClick={handleVisit}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </TooltipProvider>
  );
}