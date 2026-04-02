"use client";
import Link from 'next/link';
import { motion } from "framer-motion";
import { 
  ArrowRight, BookOpen, Users, Heart, Target, 
  Sparkles, Church, HandHeart, Shield, Star, 
  Home, UserPlus, UserCheck, TrendingUp, Award
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import BibleVerseFlipCard from "@/components/BibleVerseFlipCard";

export default function HomePage() {
  // C.L.E.A.R. Framework from SOP
  const values = [
    { 
      letter: "C", 
      word: "Community", 
      title: "Community",
      desc: "Creates a sense of belonging where everyone is welcomed as family",
      icon: <Users size={28} />,
      color: "from-blue-600 to-blue-500"
    },
    { 
      letter: "L", 
      word: "Leadership", 
      title: "Leadership",
      desc: "Strong spiritual direction modeling Christ's character",
      icon: <Shield size={28} />,
      color: "from-indigo-600 to-indigo-500"
    },
    { 
      letter: "E", 
      word: "Evangelism", 
      title: "Evangelism",
      desc: "Focus on soul-winning - 'No seeker, no Care Group'",
      icon: <Target size={28} />,
      color: "from-green-600 to-green-500"
    },
    { 
      letter: "A", 
      word: "Accountability", 
      title: "Accountability",
      desc: "Promotes spiritual growth through prayer and mutual support",
      icon: <HandHeart size={28} />,
      color: "from-amber-600 to-amber-500"
    },
    { 
      letter: "R", 
      word: "Reproduction", 
      title: "Reproduction",
      desc: "Training new leaders to multiply Care Groups and plant churches",
      icon: <TrendingUp size={28} />,
      color: "from-purple-600 to-purple-500"
    }
  ];

  // Seven Competencies from Business Unusual
  const competencies = [
    { title: "Revival by the Word", icon: <BookOpen size={16} />, color: "from-red-500 to-orange-500" },
    { title: "Discipleship", icon: <UserCheck size={16} />, color: "from-blue-500 to-cyan-500" },
    { title: "Home-based Evangelism", icon: <Home size={16} />, color: "from-green-500 to-emerald-500" },
    { title: "Personal Evangelism", icon: <UserPlus size={16} />, color: "from-amber-500 to-yellow-500" },
    { title: "Public Evangelism", icon: <Church size={16} />, color: "from-purple-500 to-pink-500" },
    { title: "Practical Leadership", icon: <Shield size={16} />, color: "from-indigo-500 to-blue-500" },
    { title: "Church Planting", icon: <Sparkles size={16} />, color: "from-teal-500 to-green-500" }
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

      {/* Mission Statement */}
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4">
          <Heart size={14} className="text-red-600" />
          <span className="font-black text-[10px] uppercase tracking-widest text-red-600">Our Mission</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Relationship • Fellowship • Belonging<br />
          <span className="text-xl text-gray-600">→ Discipleship For Mission</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm">
          "No seeker, no Care Group" - Intentional groups to win souls for the Kingdom
        </p>
      </div>

      {/* C.L.E.A.R. Framework Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <Star size={14} className="text-indigo-600" />
            <span className="font-black text-[10px] uppercase tracking-widest text-indigo-600">The CLEAR Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Christ's Attitude Reflected in Everyone
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-all cursor-pointer group relative overflow-hidden`}
            >
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <div className="text-5xl font-black opacity-20 absolute top-4 right-4">{value.letter}</div>
              <h3 className="text-2xl font-black mb-2">{value.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seven Competencies Section */}
      <div className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
            <Award size={14} className="text-[#8DC63F]" />
            <span className="font-black text-[10px] uppercase tracking-widest text-[#8DC63F]">Business Unusual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-10" style={{ fontFamily: 'Georgia, serif' }}>
            Seven Competencies of Effective Ministry
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {competencies.map((comp, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${comp.color} rounded-xl flex items-center justify-center mb-2`}>
                  {comp.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider">{comp.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bible Verse Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <BookOpen size={32} className="mx-auto mb-4 text-indigo-600" />
          <h2 className="text-3xl font-black tracking-tighter uppercase">Scripture for Today</h2>
        </div>
        <BibleVerseFlipCard />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 mx-4 rounded-3xl p-12 my-12 text-center text-white">
        <HandHeart size={48} className="mx-auto mb-6 text-indigo-300" />
        <h2 className="text-3xl font-black mb-4 uppercase">Ready to Grow Together?</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/groups" className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Find Your Group
          </Link>
        </div>
      </div>

      <footer className="text-center py-8 border-t border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Bethel Willenhall Church • CARE Group Connect
        </p>
      </footer>
    </div>
  );
}
