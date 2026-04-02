"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { groups } from "@/data/mockData";
import Link from "next/link";
import { Church, Users, Heart, MapPin, Calendar, ChevronRight } from "lucide-react";

export default function GroupsPage() {
  const { user } = useAuth();
  const displayGroups = user?.role === "ADMIN" ? groups : groups.filter(g => g.id === user?.groupId);

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 75) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Care Groups</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and monitor all Care Groups</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {displayGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-black tracking-tight">{group.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-gray-500">
                          <MapPin size={10} /> {group.location}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Calendar size={10} /> {group.meetingDay}s at {group.meetingTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-black ${getHealthColor(group.healthScore)}`}>{group.healthScore}</p>
                      <p className="text-[8px] text-gray-500">HEALTH SCORE</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 text-center mb-5">
                    <div>
                      <Users size={16} className="mx-auto text-blue-600 mb-1" />
                      <p className="text-xl font-black">{group.members}</p>
                      <p className="text-[8px] text-gray-500">Members</p>
                    </div>
                    <div>
                      <Heart size={16} className="mx-auto text-rose-600 mb-1" />
                      <p className="text-xl font-black">{group.seekers}</p>
                      <p className="text-[8px] text-gray-500">Seekers</p>
                    </div>
                    <div>
                      <Church size={16} className="mx-auto text-amber-600 mb-1" />
                      <p className="text-xl font-black truncate">{group.leader}</p>
                      <p className="text-[8px] text-gray-500">Leader</p>
                    </div>
                  </div>
                  
                  <Link href={`/groups/${group.id}`} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-black text-[10px] uppercase hover:bg-blue-100 transition-colors">
                    View Details <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
