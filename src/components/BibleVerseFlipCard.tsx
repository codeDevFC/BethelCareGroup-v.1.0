"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, RefreshCw } from "lucide-react";

const bibleVerses = [
  { reference: "John 3:16", text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life." },
  { reference: "Romans 8:28", text: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose." },
  { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { reference: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { reference: "Isaiah 40:31", text: "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles." },
  { reference: "Matthew 11:28", text: "Come to Me, all you who labor and are heavy laden, and I will give you rest." },
  { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths." },
  { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go." },
  { reference: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
  { reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new." },
  { reference: "Romans 12:2", text: "And do not be conformed to this world, but be transformed by the renewing of your mind." },
  { reference: "Ephesians 2:8-9", text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast." },
  { reference: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
  { reference: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you." },
  { reference: "1 John 4:19", text: "We love Him because He first loved us." },
  { reference: "John 14:27", text: "Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled." },
  { reference: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
  { reference: "Psalm 136:26", text: "Give thanks to the God of heaven, for His steadfast love endures forever." },
  { reference: "Luke 1:37", text: "For with God nothing will be impossible." },
  { reference: "Romans 10:9", text: "If you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved." },
  { reference: "Philippians 4:6-7", text: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God." },
  { reference: "Psalm 34:8", text: "Oh, taste and see that the Lord is good; blessed is the man who trusts in Him!" },
  { reference: "James 1:2-3", text: "Count it all joy when you fall into various trials, knowing that the testing of your faith produces patience." },
  { reference: "Galatians 5:22-23", text: "The fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control." }
];

export default function BibleVerseFlipCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextVerse = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % bibleVerses.length);
    }, 300);
  };

  const prevVerse = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + bibleVerses.length) % bibleVerses.length);
    }, 300);
  };

  const currentVerse = bibleVerses[currentIndex];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {currentIndex + 1} / {bibleVerses.length}
        </span>
      </div>

      <div className="relative w-full h-[280px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden" }}>
            <BookOpen size={40} className="text-white/60 mb-4" />
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">{currentVerse.reference}</h3>
            <p className="text-white/70 text-xs mt-4">Tap to read verse</p>
          </div>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center border-2 border-amber-200" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed">"{currentVerse.text}"</p>
            <p className="text-amber-600 text-xs font-black mt-4">{currentVerse.reference}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={prevVerse} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">Previous</button>
        <button onClick={() => setIsFlipped(!isFlipped)} className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2"><RefreshCw size={12} /> Flip</button>
        <button onClick={nextVerse} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">Next</button>
      </div>
    </div>
  );
}
