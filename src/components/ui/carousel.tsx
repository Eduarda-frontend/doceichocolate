import type { ReactNode } from "react";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { cn } from "@/lib/utils";
import React from "react";


type CarouselProps = {
  children: ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number; 
  showIndicators?: boolean;
  showArrows?: boolean;
};

export function Carousel({
  children,
  className,
  autoPlay = false,
  interval = 4000,
  showIndicators = true,
  showArrows = true,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // autoplay
  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-background",
        className
      )}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Setas */}
      {showArrows && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            <IoChevronBack size={20} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            <IoChevronForward size={20} />
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                "w-3 h-3 rounded-full transition",
                current === index ? "bg-white" : "bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
