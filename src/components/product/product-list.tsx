import { useState } from 'react';
import { CATEGORIES, SAMPLE_PRODUCTS } from '@/lib/constants';
import { ProductCard } from './product-card';
import { HeroCarousel } from '@/components/layout/hero-carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/magicui/border-beam';

export function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isChanging, setIsChanging] = useState(false);

  const handleCategoryChange = (category: string) => {
    setIsChanging(true);
    setActiveCategory(category);
    setTimeout(() => setIsChanging(false), 300);
  };

  const filteredProducts = activeCategory === 'all'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter((p) => {
        const categoryName = CATEGORIES.find(c => c.id === activeCategory)?.name;
        return categoryName && p.topics.some(topic => 
          topic.toLowerCase().includes(categoryName.split(' ')[0].toLowerCase())
        );
      });

  // Split products into two parts for carousel placement
  const midPoint = Math.ceil(filteredProducts.length / 2);
  const firstHalf = filteredProducts.slice(0, midPoint);
  const secondHalf = filteredProducts.slice(midPoint);

  return (
    <div className="space-y-6">
      <div className="animate-slide-down space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h2 className="text-xl font-medium tracking-tight md:text-2xl">
            Featured Study Tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover the best tools to enhance your learning journey
          </p>
        </div>
        <Select defaultValue="trending">
          <SelectTrigger className="button-hover w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">🔥 Trending</SelectItem>
            <SelectItem value="newest">✨ New Tools</SelectItem>
            <SelectItem value="popular">🌟 Most Used</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {/* Category Selection - Dropdown on Mobile, Tabs on Desktop */}
        <div className="flex w-full items-center gap-4">
          {/* Mobile Dropdown */}
          <div className="w-full md:hidden">
            <Select value={activeCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue>
                  {CATEGORIES.find(c => c.id === activeCategory)?.name || 'All Tools'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Tabs */}
          <ScrollArea className="hidden w-full md:block">
            <div className="animate-slide-down inline-flex w-full justify-start space-x-2 rounded-lg bg-background p-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    'button-hover flex-shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                    activeCategory === category.id 
                      ? 'bg-[#1D2126] text-white' 
                      : 'hover:bg-muted'
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>

        {/* Product Cards - First Half */}
        <div 
          className={cn(
            'space-y-4 transition-opacity duration-300',
            isChanging ? 'opacity-50' : 'opacity-100'
          )}
        >
          {firstHalf.map((product, index) => (
            <div key={product.id} className={index === 0 ? 'relative' : ''}>
              {index === 0 && <BorderBeam />}
              <ProductCard product={product} />
              {index !== 0 && index < firstHalf.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>

        {/* Featured Carousel */}
        {filteredProducts.length > 0 && (
          <div className="mx-auto max-w-3xl rounded-lg border bg-card p-4">
            <HeroCarousel />
          </div>
        )}

        {/* Product Cards - Second Half */}
        <div 
          className={cn(
            'space-y-4 transition-opacity duration-300',
            isChanging ? 'opacity-50' : 'opacity-100'
          )}
        >
          {secondHalf.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} />
              {index < secondHalf.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No study tools found in this category
          </div>
        )}
      </div>
    </div>
  );
}