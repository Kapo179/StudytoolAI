import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { ToolCard } from "@/components/tool-card";
import { ImageGallery } from "@/components/image-gallery";
import { ModeToggle } from '@/components/theme/mode-toggle';
import { SAMPLE_PRODUCTS } from '@/lib/constants';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { ArticleList } from '@/components/Article/article-list';

export default function Page() {
  const featuredTools = SAMPLE_PRODUCTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Layout */}
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto px-4 pb-8 pt-14 lg:pl-72 lg:pr-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <AnimatedGradientText>
                <h1 className="text-4xl font-bold mb-4 font-cal">
                  Discover AI Study Tools
                </h1>
              </AnimatedGradientText>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of AI-powered study tools to enhance your learning experience
              </p>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  className="w-full pl-10 pr-4 py-2"
                  placeholder="Search AI study tools..."
                />
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
                <Button variant="outline">Submit Tool</Button>
              </div>
            </div>
          </div>

          {/* Featured Gallery */}
          <div className="mb-12">
            <ImageGallery />
          </div>

          {/* Articles Section */}
          <section className="mb-12">
            <ArticleList />
          </section>

          {/* Featured Tools Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-cal">Featured Tools</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View All
              </Button>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <div key={tool.id} className="transform transition-all hover:scale-[1.02]">
                  <ToolCard
                    title={tool.name}
                    description={tool.description}
                    category={tool.topics.join(', ')}
                    image={tool.images[0]}
                    isNew={tool.isNew}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}