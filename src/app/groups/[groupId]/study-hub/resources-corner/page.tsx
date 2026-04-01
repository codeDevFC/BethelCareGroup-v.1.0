"use client";
import { useParams } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Library, Download, Printer, Sparkles } from "lucide-react";

export default function ResourcesCornerPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;

  const resources = [
    { title: "Leadership Manuals", count: 4, icon: "👥" },
    { title: "Discipleship Guides", count: 4, icon: "📚" },
    { title: "Worship Resources", count: 4, icon: "🎵" },
    { title: "Outreach Tools", count: 4, icon: "🎯" },
    { title: "Health & Wellness", count: 4, icon: "🏥" },
    { title: "Quick Templates", count: 4, icon: "📋" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <Link href={`/groups/${groupId}/study-hub`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={14} /> Back</Link>
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-xs font-black uppercase tracking-widest">
            <Home size={14} /> Home</Link>
        </div>
        <div className="text-center mt-8 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
            <Library size={14} className="text-purple-600" />
            <span className="font-black text-[10px] uppercase text-purple-600">Resources & Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-2" style={{ fontFamily: "Georgia, serif" }}>Resources Corner</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Manuals • Templates • Tools</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {resources.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-black text-lg">{cat.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{cat.count} resources</p>
              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-xl text-xs font-black">
                  <Download size={12} /> PDF</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white text-center">
          <Sparkles size={28} className="mx-auto mb-3 text-indigo-300" />
          <h3 className="text-xl font-black mb-2">More Resources Coming Soon</h3>
          <p className="text-indigo-200 text-sm">Check back weekly for new materials</p>
        </div>
      </div>
    </div>
  );
}
