"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { 
  BookOpen, Heart, Activity, Sparkles, Library, 
  Church, Shield, Crown, Star, MessageCircle,
  Search, ChevronRight, Clock, Users
} from "lucide-react";

const studySeriesList = [
  { id: "faith", title: "The Faith Series", description: "Through Jesus' ministry, He taught His disciples what faith is all about.", targetAudience: ["Seekers", "New Believers"], totalLessons: 6, color: "from-blue-600 to-indigo-600", icon: "Heart", duration: "6 weeks" },
  { id: "newstart", title: "NEWSTART - Wholistic Living", description: "Jesus provides ALL the important elements that sustain life.", targetAudience: ["Seekers", "Members"], totalLessons: 8, color: "from-green-600 to-emerald-600", icon: "Activity", duration: "8 weeks" },
  { id: "mary-bethany", title: "Mary of Bethany", description: "A broken woman touched by Christ's love.", targetAudience: ["Seekers", "Members"], totalLessons: 7, color: "from-rose-600 to-pink-600", icon: "Heart", duration: "7 weeks" },
  { id: "miracles", title: "Miracles of Jesus", description: "Each miracle carries a deeper spiritual lesson.", targetAudience: ["General", "Seekers"], totalLessons: 9, color: "from-amber-600 to-orange-600", icon: "Sparkles", duration: "9 weeks" },
  { id: "parables-1", title: "Parables of Jesus - Part 1", description: "Stories Jesus told to help us understand who He is.", targetAudience: ["Seekers", "New Believers"], totalLessons: 11, color: "from-purple-600 to-violet-600", icon: "BookOpen", duration: "11 weeks" },
  { id: "parables-2", title: "Parables of Jesus - Part 2", description: "Deeper studies for believers.", targetAudience: ["Believers"], totalLessons: 10, color: "from-indigo-600 to-purple-600", icon: "Library", duration: "10 weeks" },
  { id: "last-week", title: "The Last Week of Jesus", description: "Powerful study of Jesus' final week on earth.", targetAudience: ["Seekers"], totalLessons: 8, color: "from-red-600 to-rose-600", icon: "Church", duration: "8 weeks" },
  { id: "come-alive", title: "Come Alive!", description: "Seven encouraging lessons in dynamic Christian living.", targetAudience: ["New Seekers"], totalLessons: 7, color: "from-teal-600 to-cyan-600", icon: "Sparkles", duration: "7 weeks" },
  { id: "daniel", title: "The Life of Daniel", description: "Obedience, faithfulness unto death, and humility.", targetAudience: ["Seekers", "Revival"], totalLessons: 6, color: "from-cyan-600 to-blue-600", icon: "Shield", duration: "6 weeks" },
  { id: "david", title: "The Life of David", description: "A man after God's own heart.", targetAudience: ["Mixed", "Seekers"], totalLessons: 9, color: "from-amber-600 to-yellow-600", icon: "Crown", duration: "9 weeks" },
  { id: "joseph", title: "The Life of Joseph", description: "An anti-type of Jesus - the Saviour and deliverer.", targetAudience: ["Mixed", "Believers"], totalLessons: 10, color: "from-emerald-600 to-green-600", icon: "Star", duration: "10 weeks" }
];

const iconMap: Record<string, any> = { Heart, Activity, Sparkles, Library, Church, Shield, Crown, Star, BookOpen };

export default function BibleStudiesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSeries = studySeriesList.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={20} className="text-indigo-600" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Study Resources</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">Bible Study Library</h1>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search study series..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map((series) => {
              const Icon = iconMap[series.icon] || BookOpen;
              return (
                <Link key={series.id} href={`/bible-studies/${series.id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${series.color}`}></div>
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${series.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}><Icon size={24} /></div>
                    <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{series.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{series.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2"><BookOpen size={12} className="text-gray-400" /><span className="text-[10px] font-black text-gray-500">{series.totalLessons} lessons</span></div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
