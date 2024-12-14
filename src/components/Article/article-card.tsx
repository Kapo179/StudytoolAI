import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/article/${article.id}`} className="block">
      <Card className="group overflow-hidden border-none bg-transparent transition-all hover:bg-card/5">
        <CardContent className="p-4">
          <h4 className="font-semibold">{article.title}</h4>
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span>{article.date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}