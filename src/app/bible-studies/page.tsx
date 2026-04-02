"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

const series = [
  { id: "faith", title: "Faith Series", desc: "Understanding faith through Jesus' ministry", lessons: 6, color: "from-blue-600 to-indigo-600" },
  { id: "newstart", title: "NEWSTART", desc: "Wholistic living - physical & spiritual health", lessons: 8, color: "from-green-600 to-emerald-600" },
  { id: "mary-bethany", title: "Mary of Bethany", desc: "A broken woman touched by Christ's love", lessons: 7, color: "from-rose-600 to-pink-600" },
  { id: "miracles", title: "Miracles of Jesus", desc: "Each miracle carries a deeper spiritual lesson", lessons: 9, color: "from-amber-600 to-orange-600" },
  { id: "parables-1", title: "Parables Pt 1", desc: "Stories Jesus told for seekers", lessons: 11, color: "from-purple-600 to-violet-600" },
  { id: "daniel", title: "Life of Daniel", desc: "Obedience, faithfulness, and prophecy", lessons: 6, color: "from-cyan-600 to-blue-600" },
];

export default function BibleStudiesPage() {
  const { user } = useAuth();

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">Bible Study Library</h1>
            <p className="text-gray-500 mt-2">Complete Care Group Bible study curriculum</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <Link key={s.id} href={`/bible-studies/${s.id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${s.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${s.color} flex items-center justify-center text-white mb-4`}>
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-[10px] text-gray-500">{s.lessons} lessons</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
