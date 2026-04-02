"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart, Target, Shield, BookOpen, Church, Sparkles, UserPlus, UserCheck, TrendingUp, Award, HandHeart, Star } from 'lucide-react';

export default function HomePage() {
  const clearValues = [
    { letter: "C", title: "Community", desc: "Creates a sense of belonging where everyone is welcomed as family", icon: Users, color: "from-blue-600 to-blue-500" },
    { letter: "L", title: "Leadership", desc: "Strong spiritual direction modeling Christ's character", icon: Shield, color: "from-indigo-600 to-indigo-500" },
    { letter: "E", title: "Evangelism", desc: "Focus on soul-winning with intentional outreach", icon: Target, color: "from-amber-600 to-orange-500" },
    { letter: "A", title: "Accountability", desc: "Promotes spiritual growth through prayer and check-ins", icon: Heart, color: "from-rose-600 to-pink-500" },
    { letter: "R", title: "Reproduction", desc: "Training new leaders for multiplication", icon: Sparkles, color: "from-emerald-600 to-green-500" },
  ];

  const competencies = [
    { title: "Personal Evangelism", icon: UserPlus, color: "from-amber-500 to-yellow-500" },
    { title: "Public Evangelism", icon: Church, color: "from-purple-500 to-pink-500" },
    { title: "Practical Leadership", icon: Shield, color: "from-indigo-500 to-blue-500" },
    { title: "Church Planting", icon: Sparkles, color: "from-teal-500 to-green-500" },
    { title: "Discipleship", icon: BookOpen, color: "from-cyan-500 to-blue-500" },
    { title: "Home-based Evangelism", icon: Heart, color: "from-rose-500 to-red-500" },
    { title: "Revival", icon: Target, color: "from-purple-500 to-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-900 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl">BCG</div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                BETHEL<br />WILLENHALL
              </h1>
              <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">CARE GROUP CONNECT</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
            Sign In <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-blue-900 to-red-600 rounded-3xl p-12 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Discipleship<br />For Mission
          </h1>
          <p className="text-lg text-blue-200 mb-6 max-w-2xl mx-auto">
            "No seeker, no Care Group" - Intentional groups to win souls for the Kingdom
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* CLEAR Framework */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <Star size={14} className="text-indigo-600" />
            <span className="font-black text-[10px] uppercase tracking-widest text-indigo-600">The CLEAR Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Christ's Attitude Reflected in Everyone
          </h2>
          <p className="text-gray-500">The CLEAR Framework for effective Care Groups</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {clearValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-all cursor-pointer relative overflow-hidden`}
            >
              <div className="text-5xl font-black opacity-20 absolute top-4 right-4">{value.letter}</div>
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <value.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-2">{value.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seven Competencies */}
      <div className="bg-gray-900 text-white py-12">
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
                  <comp.icon size={20} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider">{comp.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 text-center text-white">
          <HandHeart size={48} className="mx-auto mb-6 text-indigo-300" />
          <h2 className="text-3xl font-black mb-4">Ready to Grow Together?</h2>
          <p className="text-indigo-200 mb-6">Join a Care Group and start your discipleship journey</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Sign In to Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
