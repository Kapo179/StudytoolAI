import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { ToolCard } from "@/components/tool-card";
import { ImageGallery } from "@/components/image-gallery";
import { ModeToggle } from '@/components/theme/mode-toggle';
import { SAMPLE_PRODUCTS } from '@/lib/constants';

export default function Page() {
  // Get the first 4 featured tools
  const featuredTools = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Banner */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-blue-600 py-2 text-center text-sm text-white">
        We&apos;re giving away Study Tools! Join Here →
      </div>
      
      {/* Main Layout */}
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto px-4 pb-8 pt-14 lg:pl-72 lg:pr-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold">Discover</h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  className="w-full pl-10 sm:w-64"
                  placeholder="Search"
                />
              </div>
              <ModeToggle />
              <Button variant="outline">Submit Suggestion</Button>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery />

          {/* Featured Tools */}
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Featured Tools</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View All
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredTools.map((product) => (
                <div key={product.id} className="relative group">
                  <a
                    href={product.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full rounded-lg transition-shadow duration-300"
                  >
                    <ToolCard
                      title={product.name}
                      description={product.description}
                      category={product.topics.join(', ')}
                      image={product.images[0]}
                      isNew={product.isNew}
                      showDescription={false}
                    />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}