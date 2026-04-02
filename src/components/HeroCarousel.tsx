"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/Bcg-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `CARE Group Activity ${i + 1}`
}));

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let loaded = 0;
    images.forEach(img => {
      const i = new Image();
      i.src = img.src;
      i.onload = () => {
        loaded++;
        if (loaded === images.length) setAllLoaded(true);
      };
      i.onerror = () => {
        loaded++;
        if (loaded === images.length) setAllLoaded(true);
      };
    });
    const fallback = setTimeout(() => setAllLoaded(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  if (!allLoaded) {
    return <div className="w-full h-[500px] bg-gray-100 rounded-3xl animate-pulse flex items-center justify-center text-gray-400">Loading Gallery...</div>;
  }

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-3xl shadow-2xl bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt} 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=600&fit=crop"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <button onClick={() => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-10">
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button onClick={() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-10">
        <ChevronRight size={24} className="text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-white" : "w-1 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
