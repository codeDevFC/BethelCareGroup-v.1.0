#!/bin/bash

# ============================================================
# BETHEL WILLENHALL CARE GROUP - COMPLETE BUILD
# ============================================================

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     BETHEL WILLENHALL CARE GROUP - COMPLETE BUILD           ║"
echo "║              Building Missing Components                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Create backup of existing files
echo "📦 Creating backup of existing files..."
mkdir -p .backup/$(date +%Y%m%d_%H%M%S)
cp -r src/app .backup/$(date +%Y%m%d_%H%M%S)/app 2>/dev/null || true
cp -r src/components .backup/$(date +%Y%m%d_%H%M%S)/components 2>/dev/null || true
echo "✅ Backup complete"
echo ""

# ============================================================
# STEP 1: Create ProtectedLayout Component
# ============================================================
echo "📁 STEP 1: Creating ProtectedLayout component..."

cat > src/components/ProtectedLayout.tsx << 'INNER_EOF'
"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedLayout({ 
  children, 
  requiredRoles = [] 
}: ProtectedLayoutProps) {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (!loading && user && requiredRoles.length > 0) {
      if (!hasPermission(requiredRoles)) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, router, requiredRoles, hasPermission]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
INNER_EOF
echo "   ✅ ProtectedLayout.tsx created"

# ============================================================
# STEP 2: Create Dashboard Page
# ============================================================
echo "📁 STEP 2: Creating Dashboard page..."

cat > src/app/dashboard/page.tsx << 'INNER_EOF'
"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { 
  Users, Church, Heart, Calendar, TrendingUp, Target, Award,
  ArrowRight, Activity, UserPlus, CheckCircle, Clock, AlertCircle,
  Edit, Trash2, Plus, Search, Filter, Download, Printer
} from "lucide-react";
import { groups, members, prayerRequests, attendanceRecords, discipleshipProgress, missionStages } from "@/data/mockData";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalGroups: 0,
    activePrayers: 0,
    weeklyAttendance: 0,
    discipleshipActive: 0,
    seekersCount: 0,
    baptismReady: 0,
    retentionRate: 0
  });

  useEffect(() => {
    const filteredMembers = user?.role === "ADMIN" 
      ? members 
      : members.filter(m => m.groupId === user?.groupId);
    
    const filteredPrayers = prayerRequests.filter(p => p.status === "active");
    
    const recentAttendance = attendanceRecords.filter(a => {
      const date = new Date(a.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo;
    });

    const discipleshipActiveCount = discipleshipProgress.filter(d => 
      d.level !== "completed"
    ).length;
    
    const seekersCount = filteredMembers.filter(m => m.role === "seeker").length;
    const baptismReadyCount = missionStages.filter(m => m.stage === "decided").length;
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const activeLongTerm = filteredMembers.filter(m => 
      new Date(m.joinedDate) < oneYearAgo && m.status === "active"
    ).length;
    const totalLongTerm = filteredMembers.filter(m => 
      new Date(m.joinedDate) < oneYearAgo
    ).length;
    const retentionRate = totalLongTerm > 0 ? (activeLongTerm / totalLongTerm) * 100 : 0;

    setStats({
      totalMembers: filteredMembers.length,
      totalGroups: user?.role === "ADMIN" ? groups.length : 1,
      activePrayers: filteredPrayers.length,
      weeklyAttendance: recentAttendance.length,
      discipleshipActive: discipleshipActiveCount,
      seekersCount: seekersCount,
      baptismReady: baptismReadyCount,
      retentionRate: Math.round(retentionRate)
    });
  }, [user]);

  const quickActions = [
    { title: "Mark Attendance", icon: Calendar, href: user?.role === "ADMIN" ? "/attendance" : `/group/${user?.groupId}/attendance`, color: "blue" },
    { title: "Submit Prayer", icon: Heart, href: user?.role === "ADMIN" ? "/prayer" : `/group/${user?.groupId}/prayer`, color: "rose" },
    { title: "View Members", icon: Users, href: user?.role === "ADMIN" ? "/members" : `/group/${user?.groupId}/members`, color: "green" },
    { title: "Study Hub", icon: TrendingUp, href: user?.groupId ? `/group/${user?.groupId}/study-hub` : "/study-hub", color: "purple" },
    { title: "Add Member", icon: UserPlus, href: user?.role === "ADMIN" ? "/members/add" : `/group/${user?.groupId}/members/add`, color: "orange" },
    { title: "Discipleship", icon: Award, href: "/discipleship", color: "indigo" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      rose: "bg-rose-50 text-rose-600 hover:bg-rose-100",
      green: "bg-green-50 text-green-600 hover:bg-green-100",
      purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      orange: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      indigo: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    };
    return colors[color] || colors.blue;
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      survival: "bg-blue-100 text-blue-700",
      basic: "bg-green-100 text-green-700",
      tactics: "bg-purple-100 text-purple-700",
      completed: "bg-emerald-100 text-emerald-700",
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      praying: "bg-amber-100 text-amber-700",
      invited: "bg-blue-100 text-blue-700",
      attending: "bg-green-100 text-green-700",
      decided: "bg-purple-100 text-purple-700",
      baptized: "bg-emerald-100 text-emerald-700",
    };
    return colors[stage] || "bg-gray-100 text-gray-700";
  };

  const recentActivities = attendanceRecords.slice(0, 5);
  const recentPrayers = prayerRequests.filter(p => p.status === "active").slice(0, 5);
  const discipleshipData = discipleshipProgress.slice(0, 5);
  const missionData = missionStages.slice(0, 5);

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
          <div className="bg-gradient-to-r from-blue-900 to-red-600 rounded-3xl p-8 text-white">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <p className="text-blue-200 text-sm font-black uppercase tracking-wider">Welcome back,</p>
                <h1 className="text-3xl lg:text-5xl font-black tracking-tighter mt-1">{user?.name}</h1>
                <p className="text-blue-100 mt-2 flex items-center gap-2">
                  <Church size={16} />
                  {user?.role === "ADMIN" ? "Church Administrator" : `${user?.groupName || "Care Group"} • ${user?.role}`}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-wider">Your Role</p>
                <p className="text-2xl font-black">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <Users size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-gray-400">MEMBERS</span>
              </div>
              <p className="text-3xl font-black">{stats.totalMembers}</p>
              <p className="text-[10px] text-gray-500 mt-1">Active in your group</p>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <Heart size={20} className="text-rose-600" />
                <span className="text-[10px] font-black text-gray-400">PRAYER REQUESTS</span>
              </div>
              <p className="text-3xl font-black">{stats.activePrayers}</p>
              <p className="text-[10px] text-gray-500 mt-1">Active requests</p>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <Target size={20} className="text-amber-600" />
                <span className="text-[10px] font-black text-gray-400">SEEKERS</span>
              </div>
              <p className="text-3xl font-black">{stats.seekersCount}</p>
              <p className="text-[10px] text-gray-500 mt-1">In your group</p>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <Award size={20} className="text-green-600" />
                <span className="text-[10px] font-black text-gray-400">DISCIPLESHIP</span>
              </div>
              <p className="text-3xl font-black">{stats.discipleshipActive}</p>
              <p className="text-[10px] text-gray-500 mt-1">In progress</p>
            </div>
          </div>

          <div className={`rounded-2xl p-4 flex items-center justify-between ${stats.retentionRate >= 90 ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
            <div className="flex items-center gap-3">
              <Activity size={24} className={stats.retentionRate >= 90 ? "text-emerald-600" : "text-amber-600"} />
              <div>
                <p className="font-black text-sm">12-Month Retention Rate</p>
                <p className="text-xs text-gray-600">Members active after 1 year</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-black ${stats.retentionRate >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{stats.retentionRate}%</p>
              <p className="text-[10px] text-gray-500">Target: 90%+</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black tracking-tight">Quick Actions</h2>
              <Link href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-wider">View All</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${getColorClasses(action.color)}`}
                >
                  <div className="flex items-center gap-3">
                    <action.icon size={18} />
                    <span className="font-black text-sm">{action.title}</span>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <h3 className="font-black text-sm">Recent Attendance</h3>
                  </div>
                  <Link href="/attendance" className="text-[9px] font-black text-blue-600">View All</Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((record) => (
                  <div key={record.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${record.status === "present" ? "bg-green-500" : "bg-red-500"}`}></div>
                      <div>
                        <p className="font-black text-xs">{record.memberName}</p>
                        <p className="text-[9px] text-gray-500">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full ${record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-rose-600" />
                    <h3 className="font-black text-sm">Prayer Requests</h3>
                  </div>
                  <Link href="/prayer" className="text-[9px] font-black text-rose-600">View All</Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentPrayers.map((prayer) => (
                  <div key={prayer.id} className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-black text-xs">{prayer.memberName}</p>
                      <p className="text-[9px] text-gray-500">{new Date(prayer.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-[10px] text-gray-600 line-clamp-2">{prayer.request}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <Link href="/prayer/add" className="flex items-center justify-center gap-2 text-[10px] font-black text-rose-600">
                  <Plus size={12} /> Add Prayer Request
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-green-600" />
                    <h3 className="font-black text-sm">Discipleship Progress</h3>
                  </div>
                  <Link href="/discipleship" className="text-[9px] font-black text-green-600">View All</Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {discipleshipData.map((disciple) => (
                  <div key={disciple.id} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-black text-xs">{disciple.memberName}</p>
                      <p className="text-[9px] text-gray-500">Mentor: {disciple.mentor}</p>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full ${getLevelColor(disciple.level)}`}>
                      {disciple.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF
echo "   ✅ Dashboard page created"
