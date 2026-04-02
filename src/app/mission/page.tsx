"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { missionStages, members } from "@/data/mockData";
import Link from "next/link";
import { Target, Users, Heart, Church, TrendingUp, CheckCircle, Clock, Edit, Plus } from "lucide-react";

export default function MissionPage() {
  const { user } = useAuth();
  
  const stages = [
    { id: "praying", label: "Praying", color: "bg-amber-100 text-amber-700", icon: Heart },
    { id: "invited", label: "Invited", color: "bg-blue-100 text-blue-700", icon: Users },
    { id: "attending", label: "Attending", color: "bg-green-100 text-green-700", icon: Church },
    { id: "decided", label: "Decided", color: "bg-purple-100 text-purple-700", icon: CheckCircle },
    { id: "baptized", label: "Baptized", color: "bg-emerald-100 text-emerald-700", icon: TrendingUp },
  ];
  
  const stats = stages.map(stage => ({
    ...stage,
    count: missionStages.filter(m => m.stage === stage.id).length
  }));
  
  const recentMissions = missionStages.slice(0, 5);

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-purple-600" />
              <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">Evangelism Pipeline</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Mission Stages</h1>
            <p className="text-gray-500 text-sm mt-1">Track seekers through the evangelism journey</p>
          </div>

          {/* Funnel Stats */}
          <div className="grid grid-cols-5 gap-3">
            {stats.map((stage, idx) => (
              <div key={stage.id} className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <stage.icon size={20} className={`mx-auto mb-2 ${stage.color.split(' ')[1]}`} />
                <p className="text-2xl font-black">{stage.count}</p>
                <p className="text-[9px] font-black uppercase">{stage.label}</p>
                {idx < 4 && (
                  <div className="hidden lg:block text-gray-300 text-xs mt-2">→</div>
                )}
              </div>
            ))}
          </div>

          {/* Mission List */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-black">Current Seekers & Their Stages</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentMissions.map((mission) => {
                const stage = stages.find(s => s.id === mission.stage);
                const StageIcon = stage?.icon || Heart;
                return (
                  <div key={mission.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-black">{mission.memberName}</p>
                      {mission.notes && (
                        <p className="text-[10px] text-gray-500 mt-1">{mission.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${stage?.color}`}>
                        <StageIcon size={10} /> {stage?.label}
                      </span>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 transition-colors">
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evangelism Cycle Info */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="font-black mb-3">The Evangelism Cycle</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-black">1</span>
                </div>
                <p className="font-black text-sm">Sowing</p>
                <p className="text-[9px] text-gray-600">Feb-Apr • Community events</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-black">2</span>
                </div>
                <p className="font-black text-sm">Cultivating</p>
                <p className="text-[9px] text-gray-600">Apr-Jul • Care Group focus</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-black">3</span>
                </div>
                <p className="font-black text-sm">Reaping</p>
                <p className="text-[9px] text-gray-600">Aug • Evangelism series</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-emerald-600 font-black">4</span>
                </div>
                <p className="font-black text-sm">Nurturing</p>
                <p className="text-[9px] text-gray-600">Sep-Jan • Discipleship</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
