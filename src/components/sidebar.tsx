import { Link } from 'react-router-dom';
import { Star, BookOpen, Brain, Laptop, Layout, MessageSquare, PenTool, Users2, Video } from 'lucide-react'
import { cn } from "@/lib/utils"

const categories = [
  { name: "Discover", icon: Layout },
  { name: "Featured", icon: Star },
  { name: "Study Resources", icon: BookOpen },
  { name: "Note Taking", icon: PenTool },
  { name: "Video Learning", icon: Video },
  { name: "Group Study", icon: Users2 },
  { name: "AI Tools", icon: Brain },
  { name: "Productivity", icon: Laptop },
  { name: "Discussion", icon: MessageSquare },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-background pt-14 lg:block">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">AISTUDYTOOLS</h1>
        </div>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                category.name === "Discover" && "bg-accent text-foreground"
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

