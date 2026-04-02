"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { prayerRequests } from "@/data/mockData";
import { Heart, Plus } from "lucide-react";
import Link from "next/link";

export default function PrayerPage() {
  const { user } = useAuth();

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter">Prayer Wall</h1>
              <p className="text-gray-500 text-sm mt-1">Share and track prayer requests</p>
            </div>
            <Link href="/prayer/add" className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all">
              <Plus size={16} /> New Request
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {prayerRequests.map((prayer) => (
              <div key={prayer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${prayer.status === "active" ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"}`}>
                        {prayer.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-black">{prayer.memberName}</p>
                    <p className="text-[10px] text-gray-500">{new Date(prayer.date).toLocaleDateString()}</p>
                  </div>
                  <Heart size={20} className={prayer.status === "active" ? "text-rose-500 fill-rose-100" : "text-gray-300"} />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{prayer.request}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
