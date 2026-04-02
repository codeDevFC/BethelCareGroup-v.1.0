"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Users, Church, Heart, Calendar, Target, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { groups, members, prayerRequests, attendanceRecords } from "@/data/mockData";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const userGroup = user?.groupId ? groups.find(g => g.id === user.groupId) : null;
  const filteredMembers = user?.role === "ADMIN" ? members : members.filter(m => m.groupId === user?.groupId);
  const activePrayers = prayerRequests.filter(p => p.status === "active").length;
  
  const stats = [
    { label: "Members", value: filteredMembers.length, icon: Users, color: "blue" },
    { label: "Groups", value: user?.role === "ADMIN" ? groups.length : 1, icon: Church, color: "purple" },
    { label: "Prayers", value: activePrayers, icon: Heart, color: "rose" },
    { label: "Attendance", value: attendanceRecords.length, icon: Calendar, color: "green" },
  ];

  const quickActions = [
    { title: "Mark Attendance", icon: Calendar, href: "/attendance", color: "green" },
    { title: "Submit Prayer", icon: Heart, href: "/prayer", color: "rose" },
    { title: "View Groups", icon: Church, href: "/groups", color: "blue" },
    { title: "Mission Pipeline", icon: Target, href: "/mission", color: "amber" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 text-blue-600",
      purple: "bg-purple-50 text-purple-600",
      rose: "bg-rose-50 text-rose-600",
      green: "bg-green-50 text-green-600",
      amber: "bg-amber-50 text-amber-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-900 to-red-600 rounded-3xl p-8 text-white">
            <p className="text-blue-200 text-sm font-black uppercase tracking-wider">Welcome back,</p>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter mt-1">{user?.name}</h1>
            <p className="text-blue-100 mt-2 flex items-center gap-2">
              <Church size={16} />
              {user?.role === "ADMIN" ? "Church Administrator" : `${user?.groupName || "Care Group"} • ${user?.role}`}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${getColorClasses(stat.color)} flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-black tracking-tight mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, idx) => (
                <Link key={idx} href={action.href} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${getColorClasses(action.color)} hover:opacity-80`}>
                  <div className="flex items-center gap-3">
                    <action.icon size={18} />
                    <span className="font-black text-sm">{action.title}</span>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-black">Recent Prayer Requests</h3>
              </div>
              <div className="divide-y">
                {prayerRequests.slice(0, 3).map((prayer) => (
                  <div key={prayer.id} className="p-4">
                    <p className="font-black text-sm">{prayer.memberName}</p>
                    <p className="text-xs text-gray-600 mt-1">{prayer.request}</p>
                    <p className="text-[9px] text-gray-400 mt-2">{new Date(prayer.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-black">Recent Attendance</h3>
              </div>
              <div className="divide-y">
                {attendanceRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-black text-sm">{record.memberName}</p>
                      <p className="text-[9px] text-gray-400">{new Date(record.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full ${record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {record.status}
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
