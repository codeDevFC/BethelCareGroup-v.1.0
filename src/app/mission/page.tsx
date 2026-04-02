"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { missionStages } from "@/data/mockData";
import { Target, Heart, Users, Church, CheckCircle, TrendingUp } from "lucide-react";

export default function MissionPage() {
  const { user } = useAuth();
  
  const stages = [
    { id: "praying", label: "Praying", icon: Heart, color: "bg-amber-100 text-amber-700", count: missionStages.filter(m => m.stage === "praying").length },
    { id: "invited", label: "Invited", icon: Users, color: "bg-blue-100 text-blue-700", count: missionStages.filter(m => m.stage === "invited").length },
    { id: "attending", label: "Attending", icon: Church, color: "bg-green-100 text-green-700", count: missionStages.filter(m => m.stage === "attending").length },
    { id: "decided", label: "Decided", icon: CheckCircle, color: "bg-purple-100 text-purple-700", count: missionStages.filter(m => m.stage === "decided").length },
    { id: "baptized", label: "Baptized", icon: TrendingUp, color: "bg-emerald-100 text-emerald-700", count: missionStages.filter(m => m.stage === "baptized").length },
  ];

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Mission Pipeline</h1>
            <p className="text-gray-500 text-sm mt-1">Track seekers through the evangelism journey</p>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {stages.map((stage) => (
              <div key={stage.id} className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <div className={`w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center mx-auto mb-2`}>
                  <stage.icon size={18} />
                </div>
                <p className="text-2xl font-black">{stage.count}</p>
                <p className="text-[9px] font-black uppercase">{stage.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-black">Current Seekers</h3>
            </div>
            <div className="divide-y">
              {missionStages.map((mission) => {
                const stage = stages.find(s => s.id === mission.stage);
                const StageIcon = stage?.icon || Heart;
                return (
                  <div key={mission.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-black">{mission.memberName}</p>
                      {mission.notes && <p className="text-[10px] text-gray-500 mt-1">{mission.notes}</p>}
                    </div>
                    <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${stage?.color}`}>
                      <StageIcon size={10} /> {stage?.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
