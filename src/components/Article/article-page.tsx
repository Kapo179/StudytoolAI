import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SAMPLE_ARTICLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ArticlePageProps {
  article: {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    date: string;
    tags: string[];
    notionPageId?: string;
  };
}

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticlePageProps['article'] | null>(null);

  useEffect(() => {
    const articleData = SAMPLE_ARTICLES.find((a) => a.id === id);
    if (articleData) {
      setArticle(articleData as ArticlePageProps['article']);
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="p-6">
          <div className="space-y-4">
            <h1 className="font-cal text-3xl">{article.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">By {article.author}</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-muted-foreground">{article.date}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="default" className="bg-mint text-white">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="prose max-w-none">
              {article.content}
            </div>
            {article.notionPageId && (
              <div className="mt-6">
                <iframe
                  src={`https://www.notion.so/${article.notionPageId}`}
                  style={{ width: '100%', height: '600px', border: 'none' }}
                  title="Notion Page"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}