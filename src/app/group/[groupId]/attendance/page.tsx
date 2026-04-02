"use client";

import { useParams } from "next/navigation";
import { use } from "react";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import PageNavigation from "@/components/PageNavigation";
import { members, groups, attendanceRecords } from "@/data/mockData";
import Link from "next/link";
import { Calendar, CheckCircle, XCircle, Clock, Save, Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function GroupAttendancePage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  
  const group = groups.find(g => g.id === groupId);
  const groupMembers = members.filter(m => m.groupId === groupId);

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
    alert(`Attendance saved for ${Object.keys(attendance).length} members`);
    setSaving(false);
  };

  const statusOptions = [
    { value: "present", label: "Present", icon: CheckCircle },
    { value: "absent", label: "Absent", icon: XCircle },
    { value: "late", label: "Late", icon: Clock },
    { value: "excused", label: "Excused", icon: Calendar },
  ];

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <PageNavigation backText="Back to Group" showHome={true} showStudyHub={true} />
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-green-600" />
              <span className="text-[10px] font-black text-green-600 uppercase tracking-wider">Attendance</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">{group?.name}</h1>
            <p className="text-gray-500 text-sm mt-1">Mark attendance for your Care Group</p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Meeting Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all disabled:opacity-50"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Attendance"}
              </button>
            </div>
          </div>

          {/* Members List */}
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
