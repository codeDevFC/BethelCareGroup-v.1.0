"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { members, groups } from "@/data/mockData";
import Link from "next/link";
import { 
  Users, Search, Filter, Plus, Edit, Trash2, 
  Mail, Phone, Calendar, UserCheck, UserX,
  ChevronLeft, ChevronRight, Download, Printer,
  Eye, Star, Shield, Heart
} from "lucide-react";

export default function MembersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filteredMembers = user?.role === "ADMIN" 
    ? members 
    : members.filter(m => m.groupId === user?.groupId);

  if (searchTerm) {
    filteredMembers = filteredMembers.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (roleFilter !== "all") {
    filteredMembers = filteredMembers.filter(m => m.role === roleFilter);
  }

  if (user?.role === "ADMIN" && groupFilter !== "all") {
    filteredMembers = filteredMembers.filter(m => m.groupId === groupFilter);
  }

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoleBadge = (role: string) => {
    const badges: Record<string, string> = {
      leader: "bg-blue-100 text-blue-700",
      member: "bg-green-100 text-green-700",
      seeker: "bg-amber-100 text-amber-700",
    };
    return badges[role] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? 
      <UserCheck size={14} className="text-green-500" /> : 
      <UserX size={14} className="text-red-500" />;
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Member Management</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Members</h1>
            </div>
            <Link 
              href={user?.role === "ADMIN" ? "/members/add" : `/group/${user?.groupId}/members/add`}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={16} /> Add Member
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 text-[10px] font-black text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="text-left p-4 text-[10px] font-black text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left p-4 text-[10px] font-black text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left p-4 text-[10px] font-black text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4"><p className="font-black text-sm">{member.name}</p></td>
                      <td className="p-4">
                        <span className={`text-[9px] font-black px-2 py-1 rounded-full ${getRoleBadge(member.role)}`}>
                          {member.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(member.status)}
                          <span className="text-[10px] font-black capitalize">{member.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Edit size={14} className="text-gray-400" />
                          <Trash2 size={14} className="text-gray-400" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
