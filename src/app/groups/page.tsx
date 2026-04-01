"use client";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Library } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black text-xs uppercase tracking-widest transition-colors"
            >
              <Home size={14} />
              Home
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            CARE Groups
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] sm:text-[11px] tracking-[0.3em]">
            Choose Your Group • Join the Journey
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
            <Link 
              key={id} 
              href={`/groups/${id}`}
              className="group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl font-black text-blue-600">
                  {id}
                </div>
                <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
              <h2 className="text-xl font-black mb-1 group-hover:text-blue-600 transition-colors">Group {id}</h2>
              <p className="text-gray-500 text-sm">Victory Group</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/groups/1/study-hub"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-md transition-all"
            >
              <BookOpen size={14} />
              Study Hub
            </Link>
            <Link 
              href="/groups/1/study-hub/resources-corner"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-md transition-all"
            >
              <Library size={14} />
              Resources Corner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
