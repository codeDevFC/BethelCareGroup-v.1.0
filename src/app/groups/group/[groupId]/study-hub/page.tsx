"use client";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Library, ChevronRight } from "lucide-react";

export default function StudyHubPage() {
  const groupId = "1";
  
  const curriculum = [
    {
      level: "Level 1",
      title: "To Know Jesus",
      subtitle: "SEEKER-FOCUSED STUDIES",
      color: "from-blue-600 to-blue-400",
      icon: "🔍",
      series: [
        { title: "Reliability of the BookText", slug: "reliability" },
        { title: "Come Alive with Jesus", slug: "come-alive" },
        { title: "Steps to Jesus", slug: "steps-to-jesus" },
        { title: "Search for Certainty", slug: "search-for-certainty" },
        { title: "Explorer Class Series", slug: "explorer-class" }
      ]
    },
    {
      level: "Level 2",
      title: "To Grow in Jesus",
      subtitle: "NEW BELIEVER FOCUS",
      color: "from-green-600 to-emerald-500",
      icon: "🌱",
      series: [
        { title: "Stay Alive with Jesus", slug: "stay-alive" },
        { title: "Encounter with Jesus", slug: "encounter" },
        { title: "The Branch and The Vine", slug: "branch-and-vine" },
        { title: "Daniel Verse by Verse", slug: "daniel" },
        { title: "Sanctuary: Heaven's Blueprint", slug: "sanctuary" },
        { title: "Discover: 3 Angels & RBF", slug: "discover" },
        { title: "Secrets of Prophecy", slug: "secrets-of-prophecy" },
        { title: "Seven Churches Study", slug: "seven-churches" }
      ]
    },
    {
      level: "Level 3",
      title: "To Mature in Jesus",
      subtitle: "DISCIPLESHIP FOCUS",
      color: "from-amber-600 to-orange-500",
      icon: "🌳",
      series: [
        { title: "Excellence in Life", slug: "excellence-in-life" },
        { title: "Courtship & Relationship", slug: "courtship" },
        { title: "Christian Parenting", slug: "parenting" },
        { title: "Being a Godly Man", slug: "godly-man" },
        { title: "Christian Finance", slug: "finance" },
        { title: "Overcome Lust", slug: "overcome-lust" },
        { title: "Trinity and Godhead", slug: "trinity" }
      ]
    },
    {
      level: "Level 4",
      title: "Extra Meat",
      subtitle: "DEEP DIVE STUDIES",
      color: "from-purple-600 to-violet-600",
      icon: "📖",
      series: [
        { title: "Desire of Ages", slug: "desire-of-ages" },
        { title: "Mount of Blessing", slug: "mount-of-blessing" },
        { title: "Christ's Object Lessons", slug: "christ-object-lessons" },
        { title: "Great Controversy", slug: "great-controversy" },
        { title: "Steps to Christ", slug: "steps-to-christ" },
        { title: "Ministry of Healing", slug: "ministry-of-healing" }
      ]
    }
  ];

  const resources = [
    { title: "CARE Group Leader Manual", desc: "Complete guide for group leaders", icon: "👥" },
    { title: "Discipleship Tracking Templates", desc: "Weekly reports and attendance forms", icon: "📊" },
    { title: "Agape Feast Planning Guide", desc: "Meal planning and fellowship ideas", icon: "🍽️" },
    { title: "Soul Winning Strategies", desc: "Evangelism and outreach methods", icon: "🎯" },
    { title: "Spirit of Prophecy Reading Plan", desc: "Daily study schedule", icon: "📅" },
    { title: "Health & Wellness Manual", desc: "Biblical health principles", icon: "🏥" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 text-gray-900 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <Link href={`/group/${groupId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
          <ArrowLeft size={14} /> Back to Group Dashboard
        </Link>
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
          <Home size={14} /> Home
        </Link>
      </div>

      <header className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
          <BookOpen size={14} className="text-indigo-600" />
          <span className="font-black text-[10px] uppercase tracking-widest text-indigo-600">Discipleship Journey</span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>Study Hub</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">4 Levels • Resources Corner • Guided Discipleship</p>
      </header>

      <div className="space-y-10">
        {curriculum.map((level, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`text-3xl bg-gradient-to-r ${level.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md`}>{level.icon}</div>
              <div>
                <h2 className="text-2xl font-black tracking-tight uppercase">{level.level}: {level.title}</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{level.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {level.series.map((series, sIdx) => (
                <Link key={sIdx} href={`/group/${groupId}/study-hub/${series.slug}`} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 transition-all hover:scale-[1.02]">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-indigo-300">Lesson Series</p>
                    <h3 className="font-black text-sm md:text-base tracking-tight group-hover:text-white">{series.title}</h3>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <Library size={28} className="text-indigo-600" />
          <h2 className="text-2xl font-black tracking-tight uppercase">Resources Corner</h2>
          <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-[10px] font-black">Quick Tips & Manuals</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource, idx) => (
            <Link key={idx} href={`/group/${groupId}/study-hub/resources-corner`} className="bg-white p-5 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all group hover:border-indigo-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{resource.icon}</span>
                <div>
                  <h3 className="font-black text-sm">{resource.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{resource.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-indigo-200 text-center">
          <Link href={`/group/${groupId}/study-hub/resources-corner`} className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
            View All Resources <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
