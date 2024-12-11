import * as React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS } from '@/lib/constants';

const galleryItems = SAMPLE_PRODUCTS.map(product => ({
  title: product.name,
  description: product.description,
  image: product.images[0], // Assuming the first image is the main image
}));

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {galleryItems.map((item, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="mb-2 text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-lg text-gray-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-black/50 text-white hover:bg-black/70"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-black/50 text-white hover:bg-black/70"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-center gap-2">
        {galleryItems.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}