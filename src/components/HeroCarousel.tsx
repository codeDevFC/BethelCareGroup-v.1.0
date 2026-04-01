"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=600&fit=crop", alt: "Worship" },
  { id: 2, src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop", alt: "Fellowship" },
  { id: 3, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop", alt: "Community" },
  { id: 4, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop", alt: "Prayer" },
  { id: 5, src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop", alt: "Bible Study" },
  { id: 6, src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=600&fit=crop", alt: "Worship" },
  { id: 7, src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=600&fit=crop", alt: "Outreach" },
  { id: 8, src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop", alt: "Leadership" },
  { id: 9, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=600&fit=crop", alt: "Discipleship" },
  { id: 10, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop", alt: "Mission" },
  { id: 11, src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=600&fit=crop", alt: "Community" },
  { id: 12, src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&h=600&fit=crop", alt: "Fellowship" },
  { id: 13, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop", alt: "Youth Group" },
  { id: 14, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop", alt: "Bible Study" },
  { id: 15, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop", alt: "Worship" },
  { id: 16, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop", alt: "Prayer" },
  { id: 17, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop", alt: "Community" },
  { id: 18, src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop", alt: "Outreach" },
  { id: 19, src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=600&fit=crop", alt: "Fellowship" },
  { id: 20, src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=600&fit=crop", alt: "Celebration" }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
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
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-10">
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-10">
        <ChevronRight size={24} className="text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
