"use client";
import { useParams } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Home, BookOpen, Library, ChevronRight } from "lucide-react";

export default function StudyHubPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;

  const levels = [
    { level: "Level 1", title: "To Know Jesus", color: "from-blue-600 to-blue-500", icon: "🔍" },
    { level: "Level 2", title: "To Grow in Jesus", color: "from-green-600 to-emerald-500", icon: "🌱" },
    { level: "Level 3", title: "To Mature in Jesus", color: "from-amber-600 to-orange-500", icon: "🌳" },
    { level: "Level 4", title: "Extra Meat", color: "from-purple-600 to-violet-600", icon: "📖" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <Link href={`/groups/${groupId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={14} /> Back</Link>
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-xs font-black uppercase tracking-widest">
            <Home size={14} /> Home</Link>
        </div>
        <div className="text-center mt-8 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <BookOpen size={14} className="text-indigo-600" />
            <span className="font-black text-[10px] uppercase text-indigo-600">Discipleship Journey</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-2" style={{ fontFamily: "Georgia, serif" }}>Study Hub</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">4 Levels • Resources Corner</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {levels.map((level, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${level.color} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="text-4xl mb-3">{level.icon}</div>
              <p className="text-xs font-black opacity-80 uppercase">{level.level}</p>
              <h2 className="text-2xl font-black mt-1">{level.title}</h2>
              <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
                <span>Coming Soon</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center border border-indigo-100">
          <Library size={32} className="mx-auto mb-3 text-indigo-600" />
          <h2 className="text-xl font-black mb-2">Resources Corner</h2>
          <p className="text-gray-500 text-sm mb-4">Quick Tips • Manuals • Templates</p>
          <Link href={`/groups/${groupId}/study-hub/resources-corner`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-md transition-all">
            Browse Resources <ChevronRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
