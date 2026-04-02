"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { members, attendanceRecords } from "@/data/mockData";
import { useState } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const groupMembers = user?.role === "ADMIN" ? members : members.filter(m => m.groupId === user?.groupId);

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Attendance</h1>
            <p className="text-gray-500 text-sm mt-1">Mark and track Care Group attendance</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Meeting Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <p className="font-black text-sm">{groupMembers.length} members</p>
            </div>
            <div className="divide-y">
              {groupMembers.map((member) => {
                const existing = attendanceRecords.find(a => a.memberId === member.id && a.date === selectedDate);
                return (
                  <div key={member.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-black">{member.name}</p>
                      <p className="text-[10px] text-gray-500 capitalize">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black ${existing?.status === "present" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-500 border-gray-200"}`}>
                        <CheckCircle size={12} /> Present
                      </button>
                      <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black ${existing?.status === "absent" ? "bg-red-100 text-red-700 border-red-200" : "bg-white text-gray-500 border-gray-200"}`}>
                        <XCircle size={12} /> Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="w-full py-3 bg-green-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-green-700 transition-all">
            Save Attendance
          </button>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
