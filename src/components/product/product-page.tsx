// src/components/product/product-page.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SAMPLE_PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { StarRating } from './star-rating';
import { SaveButton } from './save-button';
import { Separator } from '@/components/ui/separator';
import { Globe, Users, ExternalLink, Share2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { ShineBorder } from '@/components/magicui/shine-border';
import { RainbowButton } from '@/components/magicui/rainbow-button';

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    fullDescription: string;
    rating: number;
    topics: string[];
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
    images: string[];
    logo: string;
  };
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductPageProps['product'] | null>(null);

  useEffect(() => {
    const productData = SAMPLE_PRODUCTS.find((p) => p.id === id);
    if (productData) {
      // Ensure pricing.type is one of the allowed values
      if (['free', 'freemium', 'paid'].includes(productData.pricing.type)) {
        setProduct(productData as ProductPageProps['product']);
      } else {
        console.error('Invalid pricing type:', productData.pricing.type);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out this product!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Web Share API is not supported in your browser.');
    }
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Card */}
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg transform scale-105">
                <img src={product.logo} alt={`${product.name} logo`} className="product-logo" />
              </div>
              <div className="space-y-1 relative">
                <h1 className="font-cal text-2xl md:text-3xl">{product.name}</h1>
                <SaveButton productId={product.id} className="absolute top-0 right-0 h-8 w-8" />
                <p className="hidden sm:block text-base text-muted-foreground md:text-lg">
                  {product.tagline}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.topics.map((topic) => (
                    <Badge key={topic} variant="default" className="bg-mint text-white">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rainbow Button Section */}
        <div className="p-6">
          <RainbowButton
            onClick={() => window.open(product.websiteUrl, '_blank')}
            className="w-full"
          >
            <Globe className="mr-2 h-4 w-4" />
            Visit Website
          </RainbowButton>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* About */}
              <ShineBorder borderRadius={16} borderWidth={2} duration={14} color={["#00DEA9", "#00de7e"]}>
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="font-cal text-xl">About {product.name}</h2>
                  <p className="mt-4 text-muted-foreground">{product.fullDescription}</p>
                </div>
              </ShineBorder>

              {/* Screenshots */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="font-cal text-xl">Screenshots</h2>
                <div className="mt-4 grid gap-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={image}
                          alt={`${product.name} screenshot ${index + 1}`}
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
                  <h2 className="font-cal text-xl">Top Reviews</h2>
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
            {/* Quick Links */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-cal text-xl">Quick Links</h3>
              <div className="mt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start min-w-[120px] px-4 py-2"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}