"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, Edit, Trash2, 
  Plus, MapPin, Calendar, ChevronRight, TrendingUp,
  Search
} from "lucide-react";

// Mock data directly in the file to avoid import errors
const groupsData = [
  { id: '1', name: 'Willenhall Victory', meetingDay: 'Sunday', meetingTime: '15:00', leader: 'Frank A', members: 12, seekers: 3, healthScore: 92, location: 'Willenhall Town Centre' },
  { id: '2', name: 'Dudley Faith Builders', meetingDay: 'Wednesday', meetingTime: '18:30', leader: 'Michael A', members: 11, seekers: 2, healthScore: 85, location: 'Dudley Town Centre' },
  { id: '3', name: 'Birmingham Hope', meetingDay: 'Tuesday', meetingTime: '19:00', leader: 'Charles A', members: 13, seekers: 4, healthScore: 88, location: 'Birmingham City Centre' },
  { id: '4', name: 'Wolverhampton Harvest', meetingDay: 'Sunday', meetingTime: '16:00', leader: 'Anthony A', members: 12, seekers: 3, healthScore: 91, location: 'Wolverhampton City Centre' },
  { id: '5', name: 'Walsall Steadfast', meetingDay: 'Monday', meetingTime: '18:00', leader: 'Jason A', members: 10, seekers: 2, healthScore: 79, location: 'Walsall Town Centre' },
  { id: '6', name: 'Coventry Connect', meetingDay: 'Friday', meetingTime: '19:30', leader: 'Daniel A', members: 12, seekers: 3, healthScore: 88, location: 'Coventry City Centre' },
  { id: '7', name: 'Sandwell New Life', meetingDay: 'Thursday', meetingTime: '18:30', leader: 'Sarah D', members: 11, seekers: 2, healthScore: 86, location: 'Sandwell Town Centre' },
];

const membersData = [
  { id: '1', name: 'Frank A', groupId: '1', role: 'leader' },
  { id: '2', name: 'Felix B', groupId: '1', role: 'member' },
  { id: '13', name: 'Michael A', groupId: '2', role: 'leader' },
  { id: '24', name: 'Charles A', groupId: '3', role: 'leader' },
  { id: '37', name: 'Anthony A', groupId: '4', role: 'leader' },
  { id: '49', name: 'Jason A', groupId: '5', role: 'leader' },
  { id: '59', name: 'Daniel A', groupId: '6', role: 'leader' },
  { id: '71', name: 'Sarah D', groupId: '7', role: 'leader' },
];

export default function GroupsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const isAdmin = user?.role === "ADMIN";
  const displayGroups = isAdmin ? groupsData : groupsData.filter(g => g.id === user?.groupId);
  
  const filteredGroups = displayGroups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGroupStats = (groupId: string) => {
    const groupMembers = membersData.filter(m => m.groupId === groupId);
    return {
      total: groupMembers.length,
      leaders: groupMembers.filter(m => m.role === "leader").length,
      active: groupMembers.length,
    };
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This will also remove all members.`)) {
      alert("Group deletion would be implemented with API");
    }
  };

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Church size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Care Groups</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Care Groups</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and monitor all Care Groups</p>
            </div>
            {isAdmin && (
              <Link 
                href="/groups/add"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
              >
                <Plus size={16} /> New Group
              </Link>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => {
              const stats = getGroupStats(group.id);
              return (
                <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
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
                    <div className="grid grid-cols-4 gap-3 text-center mb-5">
                      <div>
                        <Users size={16} className="mx-auto text-blue-600 mb-1" />
                        <p className="text-xl font-black">{stats.total}</p>
                        <p className="text-[8px] text-gray-500">Members</p>
                      </div>
                      <div>
                        <Heart size={16} className="mx-auto text-rose-600 mb-1" />
                        <p className="text-xl font-black">{group.seekers}</p>
                        <p className="text-[8px] text-gray-500">Seekers</p>
                      </div>
                      <div>
                        <Target size={16} className="mx-auto text-amber-600 mb-1" />
                        <p className="text-xl font-black">{group.leader}</p>
                        <p className="text-[8px] text-gray-500">Leader</p>
                      </div>
                      <div>
                        <TrendingUp size={16} className="mx-auto text-green-600 mb-1" />
                        <p className="text-xl font-black">{stats.active}</p>
                        <p className="text-[8px] text-gray-500">Active</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/groups/${group.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-black text-[10px] uppercase hover:bg-blue-100 transition-colors"
                      >
                        View Details <ChevronRight size={12} />
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            href={`/groups/${group.id}/edit`}
                            className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(group.id, group.name)}
                            className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
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
