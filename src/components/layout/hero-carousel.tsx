import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&q=80",
    link: "https://example.com/study-tools-1",
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
    link: "https://example.com/study-tools-2",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
    link: "https://example.com/study-tools-3",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Images */}
      <div className="relative aspect-[21/9]">
        {CAROUSEL_IMAGES.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={image.url}
              alt={`Featured study tool ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </a>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}