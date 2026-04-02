"use client";

import { useParams } from "next/navigation";
import { use, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import PageNavigation from "@/components/PageNavigation";
import { prayerRequests, members, groups } from "@/data/mockData";
import Link from "next/link";
import { Heart, Plus, Search, CheckCircle, Edit, Trash2, Lock, Globe } from "lucide-react";

export default function GroupPrayerPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const group = groups.find(g => g.id === groupId);
  const groupMemberNames = members.filter(m => m.groupId === groupId).map(m => m.name);
  const groupPrayers = prayerRequests.filter(p => groupMemberNames.includes(p.memberName));
  
  let filteredPrayers = groupPrayers;
  
  if (searchTerm) {
    filteredPrayers = filteredPrayers.filter(p =>
      p.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (statusFilter !== "all") {
    filteredPrayers = filteredPrayers.filter(p => p.status === statusFilter);
  }

  const handleMarkAnswered = (id: string) => {
    if (confirm("Mark this prayer as answered?")) {
      alert("Prayer marked as answered!");
    }
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <PageNavigation backText="Back to Group" showHome={true} showStudyHub={true} />
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={20} className="text-rose-600" />
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Prayer Wall</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">{group?.name} Prayers</h1>
              <p className="text-gray-500 text-sm mt-1">Share and track prayer requests</p>
            </div>
            <Link 
              href={`/group/${groupId}/prayer/add`}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={16} /> New Request
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search prayers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="answered">Answered</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filteredPrayers.map((prayer) => (
              <div key={prayer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${prayer.status === "active" ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"}`}>
                          {prayer.status.toUpperCase()}
                        </span>
                        {prayer.isPrivate && (
                          <span className="flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            <Lock size={8} /> PRIVATE
                          </span>
                        )}
                      </div>
                      <p className="font-black">{prayer.memberName}</p>
                      <p className="text-[10px] text-gray-500">{new Date(prayer.date).toLocaleDateString()}</p>
                    </div>
                    <Heart size={20} className={prayer.status === "active" ? "text-rose-500 fill-rose-100" : "text-gray-300"} />
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{prayer.request}</p>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleMarkAnswered(prayer.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-[10px] font-black hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle size={12} /> Mark Answered
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
