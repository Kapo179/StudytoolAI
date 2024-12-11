import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  isNew?: boolean;
  showDescription?: boolean;
}

export function ToolCard({ title, description, category, image, isNew, showDescription = true }: ToolCardProps) {
  return (
    <Card className="group overflow-hidden border-none bg-transparent transition-all hover:bg-card/5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg ">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && (
          <Badge className="absolute right-2 top-2 bg-blue-600 text-white">NEW</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h4 className=" font-semibold">{title}</h4>
        {showDescription && (
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}
        <span className="text-xs text-muted-foreground">{category}</span>
      </CardContent>
    </Card>
  );
}