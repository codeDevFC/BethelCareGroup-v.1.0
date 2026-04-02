#!/bin/bash

# ============================================================
# STEP 8: Create Discipleship Page
# ============================================================
echo "📁 STEP 8: Creating Discipleship page..."

mkdir -p src/app/discipleship

cat > src/app/discipleship/page.tsx << 'INNER_EOF'
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { discipleshipProgress, members } from "@/data/mockData";
import Link from "next/link";
import { Award, BookOpen, CheckCircle, TrendingUp, Target, Users, Edit, Plus, Search, ChevronRight } from "lucide-react";

export default function DiscipleshipPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  let filteredProgress = discipleshipProgress;
  
  if (user?.role !== "ADMIN") {
    const groupMembers = members.filter(m => m.groupId === user?.groupId).map(m => m.id);
    filteredProgress = discipleshipProgress.filter(d => groupMembers.includes(d.memberId));
  }

  if (searchTerm) {
    filteredProgress = filteredProgress.filter(d => 
      d.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getLevelInfo = (level: string) => {
    const levels: Record<string, { color: string, next: string, progress: number }> = {
      survival: { color: "bg-blue-100 text-blue-700", next: "basic", progress: 25 },
      basic: { color: "bg-green-100 text-green-700", next: "tactics", progress: 50 },
      tactics: { color: "bg-purple-100 text-purple-700", next: "completed", progress: 75 },
      completed: { color: "bg-emerald-100 text-emerald-700", next: "mentor", progress: 100 },
    };
    return levels[level] || levels.survival;
  };

  const stats = {
    total: filteredProgress.length,
    survival: filteredProgress.filter(d => d.level === "survival").length,
    basic: filteredProgress.filter(d => d.level === "basic").length,
    tactics: filteredProgress.filter(d => d.level === "tactics").length,
    completed: filteredProgress.filter(d => d.level === "completed").length,
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award size={20} className="text-green-600" />
                <span className="text-[10px] font-black text-green-600 uppercase tracking-wider">FAST Discipleship</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Discipleship Progress</h1>
              <p className="text-gray-500 text-sm mt-1">Track members through the FAST journey</p>
            </div>
            <Link 
              href="/discipleship/assign"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={16} /> Assign Mentor
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-[10px] font-black text-gray-400">Total</p>
              <p className="text-2xl font-black">{stats.total}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black text-blue-600">Survival Kit</p>
              <p className="text-2xl font-black text-blue-700">{stats.survival}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black text-green-600">Basic Training</p>
              <p className="text-2xl font-black text-green-700">{stats.basic}</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black text-purple-600">Team Tactics</p>
              <p className="text-2xl font-black text-purple-700">{stats.tactics}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-black text-emerald-600">Completed</p>
              <p className="text-2xl font-black text-emerald-700">{stats.completed}</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* Progress List */}
          <div className="space-y-3">
            {filteredProgress.map((disciple) => {
              const levelInfo = getLevelInfo(disciple.level);
              return (
                <div key={disciple.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${levelInfo.color}`}>
                          {disciple.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-black text-lg">{disciple.memberName}</p>
                      <p className="text-[10px] text-gray-500">Mentor: {disciple.mentor}</p>
                      <p className="text-[10px] text-gray-500">Started: {new Date(disciple.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <p className="text-xl font-black">{disciple.scripturesMemorized.length}</p>
                          <p className="text-[8px] text-gray-500">Verses</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black">{disciple.devotionsCompleted}</p>
                          <p className="text-[8px] text-gray-500">Devotions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-[10px] font-black hover:bg-green-100 transition-colors">
                          <Edit size={12} /> Update Progress
                        </button>
                        <Link href={`/discipleship/${disciple.memberId}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-black hover:bg-gray-100 transition-colors">
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[8px] text-gray-500 mb-1">
                      <span>Survival Kit</span>
                      <span>Basic Training</span>
                      <span>Team Tactics</span>
                      <span>Completed</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="w-1/4 h-full bg-blue-500"></div>
                      <div className={`h-full ${disciple.level === "basic" || disciple.level === "tactics" || disciple.level === "completed" ? "bg-green-500" : "bg-gray-200"}`} style={{ width: "25%" }}></div>
                      <div className={`h-full ${disciple.level === "tactics" || disciple.level === "completed" ? "bg-purple-500" : "bg-gray-200"}`} style={{ width: "25%" }}></div>
                      <div className={`h-full ${disciple.level === "completed" ? "bg-emerald-500" : "bg-gray-200"}`} style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProgress.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No discipleship records found</p>
              <Link href="/discipleship/assign" className="inline-block mt-3 text-green-600 font-black text-sm">
                Assign a mentor →
              </Link>
            </div>
          )}
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF
echo "   ✅ Discipleship page created"
