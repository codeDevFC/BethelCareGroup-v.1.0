"use client";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { studySeries } from "@/data/bible-studies";
import { BookOpen, Heart, Activity, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function StudyHubPage() {
  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          <h1 className="text-4xl font-black tracking-tighter">Bible Study Hub</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {studySeries.map((series) => (
              <Link key={series.id} href={`/study-hub/${series.id}`} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className={`h-12 w-12 bg-gradient-to-br ${series.color} rounded-2xl mb-4 flex items-center justify-center text-white`}>
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-black mb-2">{series.title}</h3>
                <p className="text-gray-500 text-xs mb-4">{series.description}</p>
                <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                  <span>{series.totalLessons} Lessons</span>
                  <span>{series.suggestedDuration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
