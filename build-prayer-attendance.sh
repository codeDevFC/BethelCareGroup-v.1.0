#!/bin/bash

# ============================================================
# BETHEL WILLENHALL CARE GROUP - PRAYER & ATTENDANCE BUILD
# ============================================================

set -e

# ============================================================
# STEP 5: Create Prayer Requests Page
# ============================================================
echo "📁 STEP 5: Creating Prayer Requests page..."

mkdir -p src/app/prayer
mkdir -p src/app/prayer/add
mkdir -p src/app/prayer/[id]/edit

cat > src/app/prayer/page.tsx << 'INNER_EOF'
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { prayerRequests } from "@/data/mockData";
import Link from "next/link";
import { 
  Heart, Plus, Search, Filter, CheckCircle, 
  Clock, MessageCircle, Edit, Trash2, Eye,
  ChevronLeft, ChevronRight, Download
} from "lucide-react";

export default function PrayerPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  let filteredPrayers = prayerRequests;

  if (searchTerm) {
    filteredPrayers = filteredPrayers.filter(p => 
      p.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter !== "all") {
    filteredPrayers = filteredPrayers.filter(p => p.status === statusFilter);
  }

  const totalPages = Math.ceil(filteredPrayers.length / itemsPerPage);
  const paginatedPrayers = filteredPrayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMarkAnswered = (id: string) => {
    if (confirm("Mark this prayer request as answered?")) {
      alert("Prayer request marked as answered!");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this prayer request?")) {
      alert("Prayer request deleted!");
    }
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={20} className="text-rose-600" />
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Prayer Ministry</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Prayer Requests</h1>
              <p className="text-gray-500 text-sm mt-1">Submit and track prayer requests</p>
            </div>
            <Link 
              href="/prayer/add"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={16} /> New Request
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Active</p>
              <p className="text-2xl font-black text-rose-600">{prayerRequests.filter(p => p.status === "active").length}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Answered</p>
              <p className="text-2xl font-black text-green-600">{prayerRequests.filter(p => p.status === "answered").length}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Total</p>
              <p className="text-2xl font-black">{prayerRequests.length}</p>
            </div>
          </div>

          {/* Filters */}
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

          {/* Prayer Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {paginatedPrayers.map((prayer) => (
              <div key={prayer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${prayer.status === "active" ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"}`}>
                          {prayer.status.toUpperCase()}
                        </span>
                        {prayer.isPrivate && (
                          <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">PRIVATE</span>
                        )}
                      </div>
                      <p className="font-black">{prayer.memberName}</p>
                      <p className="text-[10px] text-gray-500">{new Date(prayer.date).toLocaleDateString()}</p>
                    </div>
                    <Heart size={20} className={prayer.status === "active" ? "text-rose-500 fill-rose-100" : "text-gray-300"} />
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{prayer.request}</p>
                  
                  {prayer.testimony && (
                    <div className="bg-green-50 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={12} className="text-green-600" />
                        <p className="text-[9px] font-black text-green-700 uppercase">Testimony</p>
                      </div>
                      <p className="text-[11px] text-green-800">{prayer.testimony}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleMarkAnswered(prayer.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-[10px] font-black hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle size={12} /> Mark Answered
                    </button>
                    <Link
                      href={`/prayer/${prayer.id}/edit`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-black hover:bg-gray-100 transition-colors"
                    >
                      <Edit size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(prayer.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-black hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="text-[10px] text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gray-600 disabled:opacity-50"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF
echo "   ✅ Prayer Requests page created"

# ============================================================
# STEP 6: Create Add Prayer Request Page
# ============================================================
echo "📁 STEP 6: Creating Add Prayer Request page..."

cat > src/app/prayer/add/page.tsx << 'INNER_EOF'
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { ArrowLeft, Heart, AlertCircle, Lock, Globe } from "lucide-react";

export default function AddPrayerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    request: "",
    isPrivate: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Prayer request submitted! Our team will pray for you.");
    router.push("/prayer");
    setSubmitting(false);
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex items-center gap-4">
            <Link href="/prayer" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart size={16} className="text-rose-600" />
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Share Request</span>
              </div>
              <h1 className="text-3xl font-black tracking-tighter">Prayer Request</h1>
              <p className="text-gray-500 text-sm">Share your prayer needs with the community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Prayer Request *</label>
                <textarea
                  name="request"
                  required
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-400 resize-none"
                  placeholder="What would you like us to pray about?..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-3">Privacy Setting</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={!formData.isPrivate}
                      onChange={() => setFormData({ ...formData, isPrivate: false })}
                      className="w-4 h-4 text-rose-600"
                    />
                    <Globe size={16} className="text-gray-500" />
                    <div>
                      <p className="font-black text-sm">Public</p>
                      <p className="text-[9px] text-gray-500">Visible to all members</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.isPrivate}
                      onChange={() => setFormData({ ...formData, isPrivate: true })}
                      className="w-4 h-4 text-rose-600"
                    />
                    <Lock size={16} className="text-gray-500" />
                    <div>
                      <p className="font-black text-sm">Private</p>
                      <p className="text-[9px] text-gray-500">Only leaders can see</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 mt-0.5" />
                <div>
                  <p className="font-black text-xs text-rose-800">Prayer Promise</p>
                  <p className="text-[10px] text-rose-600 mt-1">
                    "The effective, fervent prayer of a righteous man avails much." - James 5:16
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href="/prayer" className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-black text-[10px] uppercase hover:bg-gray-100 transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || !formData.request.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Prayer Request"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF
echo "   ✅ Add Prayer Request page created"

# ============================================================
# STEP 7: Create Attendance Page
# ============================================================
echo "📁 STEP 7: Creating Attendance page..."

mkdir -p src/app/attendance

cat > src/app/attendance/page.tsx << 'INNER_EOF'
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { members, attendanceRecords, groups } from "@/data/mockData";
import Link from "next/link";
import { Calendar, CheckCircle, XCircle, Clock, Search, Filter, Save, Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGroup, setSelectedGroup] = useState(user?.groupId || "all");
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.role === "ADMIN";
  const groupMembers = isAdmin && selectedGroup !== "all"
    ? members.filter(m => m.groupId === selectedGroup)
    : members.filter(m => m.groupId === user?.groupId);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      present: "bg-green-100 text-green-700 border-green-200",
      absent: "bg-red-100 text-red-700 border-red-200",
      late: "bg-amber-100 text-amber-700 border-amber-200",
      excused: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[status] || colors.absent;
  };

  const handleStatusChange = (memberId: string, status: string) => {
    setAttendance({ ...attendance, [memberId]: status });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Attendance saved for ${Object.keys(attendance).length} members on ${selectedDate}`);
    setSaving(false);
  };

  const statusOptions = [
    { value: "present", label: "Present", icon: CheckCircle },
    { value: "absent", label: "Absent", icon: XCircle },
    { value: "late", label: "Late", icon: Clock },
    { value: "excused", label: "Excused", icon: Calendar },
  ];

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-blue-600" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Attendance Tracking</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Attendance</h1>
            <p className="text-gray-500 text-sm mt-1">Mark and track Care Group attendance</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              {isAdmin && (
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Care Group</label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none"
                  >
                    <option value="all">All Groups</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all disabled:opacity-50"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save All"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <p className="font-black text-sm">{groupMembers.length} members</p>
            </div>
            <div className="divide-y divide-gray-100">
              {groupMembers.map((member) => {
                const existingRecord = attendanceRecords.find(
                  a => a.memberId === member.id && a.date === selectedDate
                );
                const currentStatus = attendance[member.id] || existingRecord?.status || "present";
                
                return (
                  <div key={member.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-black">{member.name}</p>
                      <p className="text-[10px] text-gray-500 capitalize">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleStatusChange(member.id, option.value)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all ${
                            currentStatus === option.value
                              ? getStatusColor(option.value)
                              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <option.icon size={12} />
                          {option.label}
                        </button>
                      ))}
                    </div>
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
INNER_EOF
echo "   ✅ Attendance page created"
