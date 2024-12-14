import { useState, useEffect } from 'react';
import { SAMPLE_ARTICLES } from '@/lib/constants';
import { ArticleCard } from './article-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn, shuffleArray } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function ArticleList() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isChanging, setIsChanging] = useState(false);
  const [shuffledArticles, setShuffledArticles] = useState(SAMPLE_ARTICLES);

  useEffect(() => {
    if (user) {
      setShuffledArticles(shuffleArray([...SAMPLE_ARTICLES]));
    }
  }, [user]);

  const handleCategoryChange = (category: string) => {
    setIsChanging(true);
    setActiveCategory(category);
    setTimeout(() => setIsChanging(false), 300);
  };

  const filteredArticles = activeCategory === 'all'
    ? shuffledArticles
    : shuffledArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="animate-slide-down space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-medium tracking-tight md:text-2xl">
            Latest Articles
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore our collection of articles to enhance your knowledge
          </p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="button-hover w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="health">Health</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex w-full items-center justify-center gap-4">
          <ScrollArea className="hidden w-full md:block">
            <div className="animate-slide-down inline-flex w-full justify-center space-x-2 rounded-lg bg-background p-1">
              {['all', 'technology', 'education', 'health'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    'button-hover flex-shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                    activeCategory === category ? 'bg-[#1D2126] text-white' : 'hover:bg-muted'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>

        <div className={cn('space-y-4 transition-opacity duration-300', isChanging ? 'opacity-50' : 'opacity-100')}>
          {filteredArticles.map((article, index) => (
            <div key={article.id} className="w-full max-w-2xl">
              <ArticleCard article={article} />
              {index < filteredArticles.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No articles found in this category
          </div>
        )}
      </div>
    </div>
  );
}