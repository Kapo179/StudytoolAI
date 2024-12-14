import { Link } from 'react-router-dom';
import { 
  Star, 
  BookOpen, 
  Brain, 
  Laptop, 
  Layout, 
  MessageSquare, 
  PenTool, 
  Users2, 
  Video,
  Sparkles,
  Compass,
  TrendingUp
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories = [
  { name: "Discover", icon: Compass, isNew: false },
  { name: "Trending", icon: TrendingUp, isNew: true },
  { name: "Featured", icon: Star, isNew: false },
  { name: "Study Resources", icon: BookOpen, isNew: false },
  { name: "Note Taking", icon: PenTool, isNew: false },
  { name: "Video Learning", icon: Video, isNew: false },
  { name: "Group Study", icon: Users2, isNew: false },
  { name: "AI Tools", icon: Brain, isNew: true },
  { name: "Productivity", icon: Laptop, isNew: false },
  { name: "Discussion", icon: MessageSquare, isNew: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-border bg-background/95 backdrop-blur-sm pt-14 lg:block">
      <ScrollArea className="h-full px-6 pb-6">
        <div className="mb-8 flex items-center gap-2">
          <Layout className="h-6 w-6 text-mint" />
          <h1 className="font-cal text-xl font-bold">AISTUDYTOOLS</h1>
        </div>

        <div className="mb-8">
          <Button className="w-full bg-mint text-white hover:bg-mint/90" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Submit Tool
          </Button>
        </div>

        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="#"
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-foreground",
                category.name === "Discover" 
                  ? "bg-accent text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
              {category.isNew && (
                <span className="ml-auto flex h-5 w-10 items-center justify-center rounded-full bg-mint/10 px-2 text-xs font-medium text-mint">
                  New
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-lg border bg-card p-4">
          <h3 className="font-medium mb-2">Pro Features</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Unlock advanced features and premium tools
          </p>
          <Button variant="outline" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}