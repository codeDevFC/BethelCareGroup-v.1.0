#!/bin/bash

# ============================================================
# STEP 3: Create Members Management Page
# ============================================================
echo "📁 STEP 3: Creating Members Management page..."

mkdir -p src/app/members
mkdir -p src/app/members/add
mkdir -p src/app/members/[id]/edit

cat > src/app/members/page.tsx << 'INNER_EOF'
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
INNER_EOF
echo "   ✅ Members page created"

# ============================================================
# STEP 4: Create Add Member Page
# ============================================================
echo "📁 STEP 4: Creating Add Member page..."

cat > src/app/members/add/page.tsx << 'INNER_EOF'
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { groups } from "@/data/mockData";
import Link from "next/link";
import { ArrowLeft, UserPlus, AlertCircle } from "lucide-react";

export default function AddMemberPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "member",
    groupId: user?.groupId || "",
    status: "active",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/members");
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex items-center gap-4">
            <Link href="/members" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-black tracking-tighter">Add Member</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Role *</label>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400"
                  >
                    <option value="member">Member</option>
                    <option value="leader">Leader</option>
                    <option value="seeker">Seeker</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href="/members" className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-black text-[10px] uppercase">Cancel</Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF
echo "   ✅ Add Member page created"
