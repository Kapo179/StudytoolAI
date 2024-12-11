import * as React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const carouselItems = [
  {
    title: "AI Study Assistant",
    description: "Generate study guides and practice questions instantly",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    title: "Smart Notes",
    description: "Take better notes with AI-powered suggestions",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    title: "Study Analytics",
    description: "Track your progress and optimize your study time",
    image: "/placeholder.svg?height=400&width=800",
  },
];

export function ToolsCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="relative">
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="relative aspect-[2/1] p-0">
          <div className="absolute inset-0">
            <img
              src={carouselItems[currentSlide].image}
              alt={carouselItems[currentSlide].title}
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 transform">
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 transform">
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}