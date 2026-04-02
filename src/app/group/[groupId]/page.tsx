"use client";
import { use } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { Users, Calendar, Heart } from "lucide-react";
import { groups } from "@/data/mockData";

export default function GroupDashboardPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const group = groups.find(g => g.id === resolvedParams.groupId);
  if (!group) return <div>Group not found</div>;

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-red-600 rounded-3xl p-8 text-white">
            <h1 className="text-3xl font-black uppercase tracking-tighter">{group.name}</h1>
            <p className="mt-2 opacity-90">{group.meetingDay}s at {group.meetingTime}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href={`/group/${group.id}/members`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Users size={24} className="text-blue-600 mb-2" /><h3 className="font-black">Members</h3>
            </Link>
            <Link href={`/group/${group.id}/attendance`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Calendar size={24} className="text-green-600 mb-2" /><h3 className="font-black">Attendance</h3>
            </Link>
            <Link href={`/group/${group.id}/prayer`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Heart size={24} className="text-rose-600 mb-2" /><h3 className="font-black">Prayer Wall</h3>
            </Link>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
