"use client";
import { useParams } from 'next/navigation';
import { use } from "react";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Library, Users, Calendar, Heart, Target, ChevronRight } from "lucide-react";

export default function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  
  const features = [
    { title: "Study Hub", icon: BookOpen, href: `/groups/${groupId}/study-hub`, color: "from-blue-500 to-indigo-500", bgLight: "bg-blue-50", description: "4 Levels of Discipleship" },
    { title: "Resources Corner", icon: Library, href: `/groups/${groupId}/study-hub/resources-corner`, color: "from-purple-500 to-pink-500", bgLight: "bg-purple-50", description: "Manuals & Templates" },
    { title: "Attendance", icon: Calendar, href: `/groups/${groupId}/attendance`, color: "from-green-500 to-emerald-500", bgLight: "bg-green-50", description: "Track meetings" },
    { title: "Prayer Requests", icon: Heart, href: `/groups/${groupId}/prayer`, color: "from-rose-500 to-red-500", bgLight: "bg-rose-50", description: "Share prayer needs" },
    { title: "Mission", icon: Target, href: `/groups/${groupId}/mission`, color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50", description: "Outreach & evangelism" },
    { title: "Members", icon: Users, href: `/groups/${groupId}/members`, color: "from-cyan-500 to-blue-500", bgLight: "bg-cyan-50", description: "Group roster" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
          <div className="flex items-center gap-3">
            <Link 
              href="/groups"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} />
              All Groups
            </Link>
            <div className="w-px h-4 bg-gray-300 hidden sm:block" />
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black text-xs uppercase tracking-widest transition-colors"
            >
              <Home size={14} />
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase">Group ID: {groupId}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <Users size={14} className="text-indigo-600" />
            <span className="font-black text-[10px] uppercase text-indigo-600">CARE Group</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Group {groupId}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Welcome to your CARE Group dashboard. Grow together in faith and mission.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl font-black text-blue-600">12</div>
            <div className="text-[10px] font-black text-gray-400 uppercase">Members</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl font-black text-green-600">85%</div>
            <div className="text-[10px] font-black text-gray-400 uppercase">Attendance</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl font-black text-amber-600">8</div>
            <div className="text-[10px] font-black text-gray-400 uppercase">Souls Won</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl font-black text-purple-600">24</div>
            <div className="text-[10px] font-black text-gray-400 uppercase">Prayers</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link
                key={idx}
                href={feature.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black mb-1 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{feature.description}</p>
                <div className="flex items-center gap-1 text-blue-600 text-xs font-black">
                  Explore <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { event: "Weekly Meeting", date: "Today, 3:00 PM", status: "upcoming" },
              { event: "Prayer Meeting", date: "Tomorrow, 7:00 PM", status: "upcoming" },
              { event: "Agape Feast", date: "Sunday, March 16", status: "planned" }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-black text-sm">{activity.event}</p>
                  <p className="text-[10px] text-gray-400">{activity.date}</p>
                </div>
                <span className="text-[8px] font-black px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/groups"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              <ArrowLeft size={14} />
              All Groups
            </Link>
            <Link 
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              <Home size={14} />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
