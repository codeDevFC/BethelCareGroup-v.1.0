"use client";
import Link from 'next/link';
import { ArrowLeft, Home, Book, FileText, Users, Heart, ClipboardList, Activity, Download, Printer, Sparkles, Library, Award, Target, TrendingUp } from "lucide-react";

export default function ResourcesCornerPage() {
  const groupId = "1";
  
  const resources = [
    {
      category: "Leadership & Administration",
      icon: <Users size={24} className="text-blue-600" />,
      items: [
        { title: "CARE Group Leader Manual", desc: "Complete guide for group leaders", type: "PDF", pages: 45 },
        { title: "Weekly Report Template", desc: "Track attendance and prayer requests", type: "DOCX", pages: 2 },
        { title: "Quarterly Planning Guide", desc: "Plan meetings and outreach events", type: "PDF", pages: 12 },
        { title: "Core Team Responsibilities", desc: "Roles and expectations", type: "DOCX", pages: 5 }
      ]
    },
    {
      category: "Discipleship & Growth",
      icon: <TrendingUp size={24} className="text-green-600" />,
      items: [
        { title: "One-on-One Discipleship Guide", desc: "Mentorship framework", type: "PDF", pages: 28 },
        { title: "New Believer Follow-up", desc: "First 30 days plan", type: "PDF", pages: 15 },
        { title: "Spiritual Growth Assessment", desc: "Evaluate your walk with God", type: "DOCX", pages: 4 },
        { title: "Bible Reading Plans", desc: "Daily reading schedules", type: "PDF", pages: 8 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 text-gray-900 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <Link href={`/group/${groupId}/study-hub`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
          <ArrowLeft size={14} /> Back to Study Hub
        </Link>
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
          <Home size={14} /> Home
        </Link>
      </div>

      <header className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
          <Library size={14} className="text-purple-600" />
          <span className="font-black text-[10px] uppercase tracking-widest text-purple-600">Resources & Tools</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>Resources Corner</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Quick Tips • Manuals • Templates • Tools for Ministry</p>
      </header>

      <div className="space-y-8">
        {resources.map((category, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {category.icon}
                <h2 className="text-xl font-black tracking-tight uppercase">{category.category}</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[9px] font-black">{category.items.length} resources</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, iIdx) => (
                  <div key={iIdx} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all cursor-pointer border border-transparent hover:border-purple-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={14} className="text-gray-400 group-hover:text-purple-600" />
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${item.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{item.type}</span>
                      </div>
                      <h3 className="font-black text-sm group-hover:text-purple-700">{item.title}</h3>
                      <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                      <p className="text-[8px] text-gray-400 mt-1">{item.pages} pages</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"><Download size={14} /></button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Printer size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white text-center">
        <Sparkles size={32} className="mx-auto mb-4 text-indigo-300" />
        <h3 className="text-2xl font-black mb-2">Need More Resources?</h3>
        <p className="text-indigo-200 text-sm mb-6">Contact your group leader or pastor for additional materials</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Request Resource</button>
          <button className="px-6 py-3 bg-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">Suggest a Resource</button>
        </div>
      </div>
    </div>
  );
}
