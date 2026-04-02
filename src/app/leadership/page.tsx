"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { members, groups } from "@/data/mockData";
import Link from "next/link";
import { Shield, Users, Church, Award, Mail, Phone, Calendar, Edit, Trash2, Plus } from "lucide-react";

export default function LeadershipPage() {
  const { user, hasPermission } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  
  const leaders = members.filter(m => m.role === "leader");
  const leadersByGroup = groups.map(group => ({
    ...group,
    leaders: leaders.filter(l => l.groupId === group.id)
  }));

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={20} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Church Leadership</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Leadership Team</h1>
              <p className="text-gray-500 text-sm mt-1">Care Group leaders and church officers</p>
            </div>
            {isAdmin && (
              <Link 
                href="/leadership/add"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
              >
                <Plus size={16} /> Add Leader
              </Link>
            )}
          </div>

          {/* Leadership by Group */}
          {leadersByGroup.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Church size={18} className="text-indigo-600" />
                  <h2 className="text-xl font-black tracking-tight">{group.name}</h2>
                  <span className="text-[10px] text-gray-500">• {group.leader}</span>
                </div>
              </div>
              
              {group.leaders.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {group.leaders.map((leader) => (
                    <div key={leader.id} className="p-5 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                          <Shield size={24} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-black text-lg">{leader.name}</p>
                          <div className="flex flex-wrap gap-3 text-[10px] text-gray-500 mt-1">
                            {leader.email && (
                              <span className="flex items-center gap-1">
                                <Mail size={10} /> {leader.email}
                              </span>
                            )}
                            {leader.phone && (
                              <span className="flex items-center gap-1">
                                <Phone size={10} /> {leader.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> Leader since {new Date(leader.joinedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Link href={`/leadership/${leader.id}/edit`} className="p-2 rounded-xl text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                            <Edit size={16} />
                          </Link>
                          <button className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-gray-500">
                  <p className="text-sm">No additional leaders assigned</p>
                </div>
              )}
            </div>
          ))}

          {/* Leadership Resources */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-black mb-3">Leadership Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="#" className="bg-white p-4 rounded-xl hover:shadow-md transition-all">
                <Award size={20} className="text-indigo-600 mb-2" />
                <p className="font-black text-sm">Care Group Leader Manual</p>
                <p className="text-[9px] text-gray-500 mt-1">Complete guide for group leaders</p>
              </Link>
              <Link href="#" className="bg-white p-4 rounded-xl hover:shadow-md transition-all">
                <Users size={20} className="text-indigo-600 mb-2" />
                <p className="font-black text-sm">Mentor Training Guide</p>
                <p className="text-[9px] text-gray-500 mt-1">How to disciple effectively</p>
              </Link>
              <Link href="#" className="bg-white p-4 rounded-xl hover:shadow-md transition-all">
                <Church size={20} className="text-indigo-600 mb-2" />
                <p className="font-black text-sm">Church Planting Handbook</p>
                <p className="text-[9px] text-gray-500 mt-1">Start new Care Groups</p>
              </Link>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
