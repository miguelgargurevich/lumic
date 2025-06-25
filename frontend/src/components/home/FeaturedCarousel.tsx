import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface FeaturedCarouselProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  // Limitar a máximo 10 productos
  const featured = products.slice(0, 10);
  const [idx, setIdx] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % featured.length);
    }, 3000); // Cambia de producto cada 3 segundos
    return () => clearInterval(interval);
  }, [featured.length]);

  // Si el índice se sale del rango por cambio de featured
  useEffect(() => {
    if (idx >= featured.length) setIdx(0);
  }, [featured.length, idx]);

  if (featured.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="relative flex items-center justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 text-primary border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-primary hover:text-white transition z-10"
          onClick={() => setIdx(i => (i - 1 + featured.length) % featured.length)}
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="w-full flex flex-col items-center bg-white/90 rounded-3xl shadow-2xl border border-primary/20 px-6 py-8 sm:px-12 sm:py-10 relative animate-fade-in">
          <div className="w-full flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-[340px] h-[200px] sm:h-[240px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={featured[idx].images[0]}
                alt={featured[idx].name}
                width={320}
                height={200}
                className="rounded-2xl object-cover aspect-video border-2 border-primary/20 shadow-lg"
                style={{ width: '320px', height: 'auto', aspectRatio: '16/10' }}
                objectFit="cover"
              />
            </div>
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-headline mb-2 text-primary drop-shadow">{featured[idx].name}</h3>
              <p className="text-muted-foreground mb-2 text-base sm:text-lg line-clamp-3 max-w-md">{featured[idx].description}</p>
              <span className="text-primary font-bold text-2xl mb-4 block">${featured[idx].price.toFixed(2)}</span>
              <Link href={`/products/${featured[idx].id}`} className="inline-block px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all text-base mt-2">Ver Detalle</Link>
            </div>
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 text-primary border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-primary hover:text-white transition z-10"
          onClick={() => setIdx(i => (i + 1) % featured.length)}
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex gap-2 justify-center mt-5">
        {featured.map((_, i) => (
          <button
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${i===idx ? 'bg-primary border-primary scale-110 shadow' : 'bg-gray-200 border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setIdx(i)}
            aria-label={`Ir a producto ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}
