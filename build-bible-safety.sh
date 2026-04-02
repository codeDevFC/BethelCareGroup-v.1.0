#!/bin/bash

set -e

echo "📚 Creating Bible Study Library data..."
mkdir -p src/data/bible-studies

cat > src/data/bible-studies/index.ts << 'INNER_EOF'
export interface BibleStudy {
  id: string;
  seriesId: string;
  seriesTitle: string;
  title: string;
  targetAudience: string[];
  description: string;
  scriptureRef: string[];
  desireOfAgesRef?: string;
  christObjectLessonsRef?: string;
  prophetsKingsRef?: string;
  patriarchsProphetsRef?: string;
  discussionLeader?: string;
  order: number;
  keyPoints?: string[];
  applicationQuestions?: string[];
}

export interface StudySeries {
  id: string;
  title: string;
  description: string;
  targetAudience: string[];
  totalLessons: number;
  color: string;
  icon: string;
  suggestedDuration: string;
  prerequisites?: string[];
}

export const studySeries: StudySeries[] = [
  {
    id: "faith",
    title: "The Faith Series",
    description: "Through Jesus' ministry, He taught His disciples what faith is all about.",
    targetAudience: ["Seekers", "New Believers"],
    totalLessons: 6,
    color: "from-blue-600 to-indigo-600",
    icon: "Heart",
    suggestedDuration: "6 weeks"
  },
  {
    id: "newstart",
    title: "NEWSTART - Wholistic Living",
    description: "Jesus provides ALL the important elements that sustain life.",
    targetAudience: ["Seekers", "Members"],
    totalLessons: 8,
    color: "from-green-600 to-emerald-600",
    icon: "Activity",
    suggestedDuration: "8 weeks"
  },
  {
    id: "parables-1",
    title: "Parables of Jesus - Part 1",
    description: "Stories Jesus told to help us understand who He is.",
    targetAudience: ["Seekers", "New Believers"],
    totalLessons: 11,
    color: "from-purple-600 to-violet-600",
    icon: "BookOpen",
    suggestedDuration: "11 weeks"
  }
];

export const faithSeriesLessons: BibleStudy[] = [
  {
    id: "faith-1",
    seriesId: "faith",
    seriesTitle: "The Faith Series",
    title: "Definition of Faith - The Faith of the Centurion",
    targetAudience: ["Seekers"],
    description: "Understanding what faith is through the centurion's example.",
    scriptureRef: ["Matthew 8:5-13", "Luke 7:1-10"],
    desireOfAgesRef: "Chapter 32",
    order: 1,
    keyPoints: ["Faith is trusting Jesus", "Authority recognized"],
    applicationQuestions: ["What does faith mean to you?", "How can you exercise faith?"]
  },
  {
    id: "faith-6",
    seriesId: "faith",
    seriesTitle: "The Faith Series",
    title: "The Faith of Jesus - The Crucifixion",
    targetAudience: ["Seekers"],
    description: "Jesus' ultimate act of faith - trusting the Father even unto death.",
    scriptureRef: ["Matthew 27:32-54"],
    desireOfAgesRef: "Chapter 78",
    order: 6,
    keyPoints: ["Jesus trusted the Father", "Ultimate demonstration of love"],
    applicationQuestions: ["What does the cross mean to you?", "How can you follow Jesus' example?"]
  }
];
INNER_EOF

echo "📖 Creating Study Hub page..."
mkdir -p src/app/study-hub
cat > src/app/study-hub/page.tsx << 'INNER_EOF'
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
INNER_EOF

echo "🛡️ Creating Safety page..."
mkdir -p src/app/safety
cat > src/app/safety/page.tsx << 'INNER_EOF'
"use client";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Shield, AlertTriangle, FileText, Phone, CheckCircle } from "lucide-react";

export default function SafetyPage() {
  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          <h1 className="text-4xl font-black tracking-tighter">Safety & Safeguarding</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Policy", icon: Shield, color: "text-blue-600" },
              { title: "Risk", icon: AlertTriangle, color: "text-amber-600" },
              { title: "Reports", icon: FileText, color: "text-red-600" },
              { title: "Contacts", icon: Phone, color: "text-green-600" }
            ].map((m, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center">
                <m.icon size={32} className={`mx-auto mb-2 ${m.color}`} />
                <p className="font-black text-sm">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF

echo "✅ Build Complete!"
