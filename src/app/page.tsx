"use client";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Users, Heart, Target, ArrowRight, Sparkles, BookOpen, Church } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import BibleVerseFlipCard from "@/components/BibleVerseFlipCard";

export default function HomePage() {
  const features = [
    { icon: <Users size={24} />, title: "Relationship", desc: "Build meaningful connections with God and others", color: "from-blue-500 to-cyan-500" },
    { icon: <Heart size={24} />, title: "Fellowship", desc: "Share life together in authentic community", color: "from-rose-500 to-pink-500" },
    { icon: <Target size={24} />, title: "Belonging", desc: "Find your place in God's family", color: "from-amber-500 to-orange-500" },
    { icon: <Sparkles size={24} />, title: "Discipleship", desc: "Grow and multiply for mission", color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Logo & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/images/gallery/logoCG-.png" 
              alt="BCG Logo" 
              className="h-14 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/56x56?text=BCG";
              }}
            />
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                BETHEL<br />WILLENHALL
              </h1>
              <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">CARE GROUP CONNECT</p>
            </div>
          </div>
          <Link 
            href="/groups"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            Enter Groups <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <HeroCarousel />
      </div>

      {/* Tagline */}
      <div className="text-center py-12 px-4">
        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
          Relationship • Fellowship • Belonging → Discipleship For Mission
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-all cursor-pointer`}
            >
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bible Verse Flip Card Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <BookOpen size={14} className="text-indigo-600" />
            <span className="font-black text-[10px] uppercase tracking-widest text-indigo-600">Daily Encouragement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Scripture for Today
          </h2>
          <p className="text-gray-500 text-sm">Tap the card to flip and read the verse</p>
        </div>
        <BibleVerseFlipCard />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 mx-4 rounded-3xl p-8 my-12">
        <div className="text-center text-white">
          <Church size={48} className="mx-auto mb-4 text-indigo-300" />
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Join a CARE Group Today</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto mb-6">Find your community, grow in faith, and make a difference</p>
          <Link 
            href="/groups"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Find Your Group <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Bethel Willenhall Church • CARE Group Connect
        </p>
        <p className="text-[8px] font-black text-gray-300 mt-2">
          Engineering by DevFC Engineering
        </p>
      </footer>
    </div>
  );
}
