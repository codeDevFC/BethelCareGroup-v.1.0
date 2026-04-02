"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { members, groups } from "@/data/mockData";
import { Shield, Mail, Phone } from "lucide-react";

export default function LeadershipPage() {
  const { user } = useAuth();
  const leaders = members.filter(m => m.role === "leader");

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Leadership Team</h1>
            <p className="text-gray-500 text-sm mt-1">Care Group leaders and church officers</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {groups.map((group) => {
              const groupLeaders = leaders.filter(l => l.groupId === group.id);
              return (
                <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 bg-gradient-to-r from-indigo-50 to-white border-b">
                    <h2 className="text-xl font-black tracking-tight">{group.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Leader: {group.leader}</p>
                  </div>
                  <div className="divide-y">
                    {groupLeaders.map((leader) => (
                      <div key={leader.id} className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                          <Shield size={24} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-lg">{leader.name}</p>
                          <div className="flex gap-3 text-[10px] text-gray-500 mt-1">
                            {leader.email && <span className="flex items-center gap-1"><Mail size={10} /> {leader.email}</span>}
                            {leader.phone && <span className="flex items-center gap-1"><Phone size={10} /> {leader.phone}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
