"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { 
  BookOpen, Heart, Activity, Sparkles, Library, 
  Church, Shield, Crown, Star, MessageCircle,
  Search, ChevronRight, Clock, Users, Bible
} from "lucide-react";

// Study series data
const studySeriesList = [
  {
    id: "faith",
    title: "The Faith Series",
    description: "Through Jesus' ministry, He taught His disciples what faith is all about. Discover the blessings for those who apply these principles.",
    targetAudience: ["Seekers", "New Believers"],
    totalLessons: 6,
    color: "from-blue-600 to-indigo-600",
    icon: "Heart",
    duration: "6 weeks"
  },
  {
    id: "newstart",
    title: "NEWSTART - Wholistic Living",
    description: "Jesus provides ALL the important elements that sustain life. Physical elements point to spiritual truths.",
    targetAudience: ["Seekers", "Members", "Health-Minded"],
    totalLessons: 8,
    color: "from-green-600 to-emerald-600",
    icon: "Activity",
    duration: "8 weeks"
  },
  {
    id: "mary-bethany",
    title: "Mary of Bethany",
    description: "A broken woman touched by Christ's love, responding with great love, tenacious loyalty, and perfect devotion.",
    targetAudience: ["Seekers", "Members"],
    totalLessons: 7,
    color: "from-rose-600 to-pink-600",
    icon: "Heart",
    duration: "7 weeks"
  },
  {
    id: "miracles",
    title: "Miracles of Jesus",
    description: "Each miracle carries a deeper spiritual lesson - healing the blind reveals spiritual blindness, the demon-possessed shows slavery to sin.",
    targetAudience: ["General", "Seekers", "Believers"],
    totalLessons: 9,
    color: "from-amber-600 to-orange-600",
    icon: "Sparkles",
    duration: "9 weeks"
  },
  {
    id: "parables-1",
    title: "Parables of Jesus - Part 1",
    description: "Stories Jesus told to help us understand who He is and what He teaches. Perfect for seekers and believers alike.",
    targetAudience: ["Seekers", "New Believers"],
    totalLessons: 11,
    color: "from-purple-600 to-violet-600",
    icon: "BookOpen",
    duration: "11 weeks"
  },
  {
    id: "parables-2",
    title: "Parables of Jesus - Part 2",
    description: "Deeper studies for believers and long-term seekers. Advanced parables for spiritual growth.",
    targetAudience: ["Believers", "Long-term Seekers"],
    totalLessons: 10,
    color: "from-indigo-600 to-purple-600",
    icon: "Library",
    duration: "10 weeks"
  },
  {
    id: "last-week",
    title: "The Last Week of Jesus",
    description: "Powerful study of Jesus' final week on earth. Excellent lead-up to decision-making events.",
    targetAudience: ["Seekers", "Pre-Decision"],
    totalLessons: 8,
    color: "from-red-600 to-rose-600",
    icon: "Church",
    duration: "8 weeks"
  },
  {
    id: "come-alive",
    title: "Come Alive!",
    description: "Seven encouraging lessons in dynamic Christian living. What does it mean to be a Christian?",
    targetAudience: ["New Seekers", "New Believers"],
    totalLessons: 7,
    color: "from-teal-600 to-cyan-600",
    icon: "Sparkles",
    duration: "7 weeks"
  },
  {
    id: "daniel",
    title: "The Life of Daniel",
    description: "Obedience, faithfulness unto death, humility, and submissive prayers. Characters God's end-time people must possess.",
    targetAudience: ["Seekers", "Revival", "Prophecy"],
    totalLessons: 6,
    color: "from-cyan-600 to-blue-600",
    icon: "Shield",
    duration: "6 weeks"
  },
  {
    id: "david",
    title: "The Life of David",
    description: "A man after God's own heart. Humility, respect for authority, true repentance, and obedience.",
    targetAudience: ["Mixed", "Seekers", "Believers"],
    totalLessons: 9,
    color: "from-amber-600 to-yellow-600",
    icon: "Crown",
    duration: "9 weeks"
  },
  {
    id: "joseph",
    title: "The Life of Joseph",
    description: "An anti-type of Jesus - the Saviour and deliverer. Faith in all circumstances, humility, diligence, and forgiveness.",
    targetAudience: ["Mixed", "Believers"],
    totalLessons: 10,
    color: "from-emerald-600 to-green-600",
    icon: "Star",
    duration: "10 weeks"
  }
];

const iconMap: Record<string, any> = {
  Heart, Activity, Sparkles, Library, Church, Shield, Crown, Star, BookOpen
};

export default function BibleStudiesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  let filteredSeries = studySeriesList;

  if (searchTerm) {
    filteredSeries = filteredSeries.filter(s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || BookOpen;
    return <Icon size={24} />;
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bible size={20} className="text-indigo-600" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Study Resources</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">Bible Study Library</h1>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl">
              Complete Care Group Bible study curriculum - over 90 lessons across 11 series.
              Perfect for seekers, new believers, and mature Christians.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-black text-indigo-700">{studySeriesList.length}</p>
                <p className="text-[9px] font-black text-indigo-600">Study Series</p>
              </div>
              <div className="w-px h-8 bg-indigo-200"></div>
              <div>
                <p className="text-2xl font-black text-indigo-700">91+</p>
                <p className="text-[9px] font-black text-indigo-600">Individual Lessons</p>
              </div>
              <div className="w-px h-8 bg-indigo-200"></div>
              <div>
                <p className="text-2xl font-black text-indigo-700">2+ Years</p>
                <p className="text-[9px] font-black text-indigo-600">Weekly Material</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-indigo-600" />
              <span className="text-[10px] font-black text-indigo-700">Complete Curriculum</span>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search study series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Series Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map((series) => (
              <Link 
                key={series.id} 
                href={`/bible-studies/${series.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${series.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${series.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {getIcon(series.icon)}
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {series.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{series.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {series.targetAudience.slice(0, 2).map((audience, idx) => (
                      <span key={idx} className="text-[8px] font-black px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {audience}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <BookOpen size={12} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500">{series.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500">{series.duration}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-black mb-2">Need Printable Materials?</h3>
            <p className="text-gray-300 text-sm mb-6">Download PDF versions of all Bible studies for your Care Group</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all">
                Download All Studies
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:bg-indigo-500 transition-all">
                Request Leader Guide
              </button>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
