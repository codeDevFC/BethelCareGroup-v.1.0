"use client";

import { useParams } from "next/navigation";
import { use, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import PageNavigation from "@/components/PageNavigation";
import { members, groups } from "@/data/mockData";
import Link from "next/link";
import { Users, Mail, Phone, Calendar, UserCheck, UserX, Search, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function GroupMembersPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const group = groups.find(g => g.id === groupId);
  const groupMembers = members.filter(m => m.groupId === groupId);
  
  const filteredMembers = groupMembers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const badges: Record<string, string> = {
      leader: "bg-blue-100 text-blue-700",
      member: "bg-green-100 text-green-700",
      seeker: "bg-amber-100 text-amber-700",
    };
    return badges[role] || "bg-gray-100 text-gray-700";
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove ${name} from this group?`)) {
      alert("Member removal would be implemented with API");
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
                <Users size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Group Members</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">{group?.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{groupMembers.length} members in this Care Group</p>
            </div>
            <Link 
              href={`/group/${groupId}/members/add`}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={16} /> Add Member
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <div key={member.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black">{member.name}</p>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${getRoleBadge(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[10px] text-gray-500">
                      {member.email && (
                        <span className="flex items-center gap-1">
                          <Mail size={10} /> {member.email}
                        </span>
                      )}
                      {member.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={10} /> {member.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> Joined {new Date(member.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/members/${member.id}`}
                      className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/members/${member.id}/edit`}
                      className="p-2 rounded-xl text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
