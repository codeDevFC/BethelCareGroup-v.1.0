"use client";

import { useParams } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { 
  BookOpen, Clock, Users, ChevronRight, Download, 
  Printer, Heart, Share2, CheckCircle, ArrowLeft
} from "lucide-react";

// Define lesson data directly in the component to ensure it works immediately
const seriesLessons: Record<string, Array<{id: string; title: string; description: string; scripture: string[]}>> = {
  faith: [
    { id: "faith-1", title: "Definition of Faith - The Faith of the Centurion", description: "Understanding what faith is through the centurion's example.", scripture: ["Matthew 8:5-13", "Luke 7:1-10"] },
    { id: "faith-2", title: "What Faith is Not - Little Faith", description: "Exploring the difference between little faith, great faith, and no faith.", scripture: ["Matthew 8:23-27", "Mark 4:36-41", "Matthew 14:23-33"] },
    { id: "faith-3", title: "Saved by Faith - Healing of the Woman", description: "The woman's faith in touching Jesus' garment brought healing.", scripture: ["Matthew 9:20-22", "Mark 5:25-34", "Luke 8:43-48"] },
    { id: "faith-4", title: "Faith Expressed Through Action - The Paralytic", description: "Jesus saw THEIR faith - the friends who brought the paralytic.", scripture: ["Matthew 9:1-2", "Mark 2:1-5", "Luke 5:17-21"] },
    { id: "faith-5", title: "Growing Faith - The Demon-Possessed Boy", description: "The father's cry - 'Lord, I believe; help my unbelief!'", scripture: ["Matthew 17:14-21", "Mark 9:14-27", "Luke 17:5-6"] },
    { id: "faith-6", title: "The Faith of Jesus - The Crucifixion", description: "Jesus' ultimate act of faith - trusting the Father even unto death.", scripture: ["Matthew 27:32-54"] }
  ],
  newstart: [
    { id: "ns-1", title: "Food / Bread - Jesus, the Bread of Life", description: "Physical food sustains the body; Jesus sustains the soul.", scripture: ["John 6:25-41"] },
    { id: "ns-2", title: "Exercise - Lord of the Talents", description: "Using our physical, mental, and spiritual gifts for God's glory.", scripture: ["Matthew 25:14-29"] },
    { id: "ns-3", title: "Water - The Living Water", description: "Water cleanses and refreshes. Jesus offers living water.", scripture: ["John 4:1-14"] },
    { id: "ns-4", title: "Sunlight / Light - The Light of the World", description: "Physical sunlight brings health; Jesus brings spiritual sight.", scripture: ["John 9:1-5, 35-41", "John 1:1-9"] },
    { id: "ns-5", title: "Temperance - The Overcomer", description: "Jesus overcame temptation using God's Word.", scripture: ["Matthew 4:1-11"] },
    { id: "ns-6", title: "Air / Breath - The Breath of Life", description: "The Holy Spirit gives spiritual life.", scripture: ["John 20:19-23"] },
    { id: "ns-7", title: "Rest - The Restorer", description: "Physical rest restores the body. Jesus offers spiritual rest.", scripture: ["Matthew 11:28-30"] },
    { id: "ns-8", title: "Trust - The Way, the Truth, and the Life", description: "Trust in God is the foundation of all principles.", scripture: ["John 14:5-14"] }
  ]
};

const seriesInfo: Record<string, {title: string; description: string; color: string; totalLessons: number}> = {
  faith: {
    title: "The Faith Series",
    description: "Through Jesus' ministry, He taught His disciples what faith is all about. Discover the blessings for those who apply these principles.",
    color: "from-blue-600 to-indigo-600",
    totalLessons: 6
  },
  newstart: {
    title: "NEWSTART - Wholistic Living",
    description: "Jesus provides ALL the important elements that sustain life. Physical elements point to spiritual truths.",
    color: "from-green-600 to-emerald-600",
    totalLessons: 8
  }
};

export default function SeriesPage({ params }: { params: Promise<{ seriesId: string }> }) {
  const resolvedParams = use(params);
  const seriesId = resolvedParams.seriesId;
  const { user } = useAuth();
  
  const series = seriesInfo[seriesId as keyof typeof seriesInfo];
  const lessons = seriesLessons[seriesId as keyof typeof seriesLessons] || [];
  
  if (!series) {
    return (
      <ProtectedLayout>
        <DashboardShell>
          <div className="text-center py-12">
            <p className="text-gray-500">Series not found</p>
            <Link href="/bible-studies" className="text-indigo-600 mt-4 inline-block">Back to Library</Link>
          </div>
        </DashboardShell>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <Link href="/bible-studies" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black text-[10px] uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Library
          </Link>
          
          <div className={`bg-gradient-to-r ${series.color} rounded-3xl p-8 text-white`}>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-white/80" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/80">{series.totalLessons} Lessons</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">{series.title}</h1>
                <p className="text-white/80 text-lg mt-3 max-w-2xl">{series.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                  <Download size={18} />
                </button>
                <button className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                  <Printer size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-5 bg-gray-50 border-b border-gray-100">
              <h2 className="font-black text-xl">All Lessons</h2>
              <p className="text-sm text-gray-500 mt-1">Click any lesson to view full study guide</p>
            </div>
            <div className="divide-y divide-gray-100">
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                          {idx + 1}
                        </span>
                        <h3 className="font-black text-lg">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 ml-11">{lesson.description}</p>
                      <div className="flex flex-wrap gap-3 ml-11 mt-2">
                        {lesson.scripture.map((ref, ridx) => (
                          <span key={ridx} className="text-[9px] font-mono text-gray-500">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Heart size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-black text-amber-800">Tips for Leading This Study</h3>
                <ul className="mt-2 space-y-1 text-sm text-amber-700">
                  <li>• 5-7 min INTRO: Introduce the theme and topic</li>
                  <li>• 15-20 min CONTENT: Draw 2-3 main principles from Scripture</li>
                  <li>• 5 min APPLICATION: Suggest 1-2 ways to apply the lesson</li>
                  <li>• Use Desire of Ages / Spirit of Prophecy for deeper study</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
