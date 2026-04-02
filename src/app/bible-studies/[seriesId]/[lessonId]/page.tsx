"use client";

import { useParams } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import PageNavigation from "@/components/PageNavigation";
import { studySeries, allLessonsBySeries, BibleStudy } from "@/data/bible-studies";
import { 
  BookOpen, Bible, Heart, MessageCircle, Download, 
  Printer, ChevronLeft, ChevronRight, CheckCircle,
  Users, Clock, Target, Sparkles
} from "lucide-react";

export default function LessonPage({ params }: { params: Promise<{ seriesId: string; lessonId: string }> }) {
  const resolvedParams = use(params);
  const { seriesId, lessonId } = resolvedParams;
  const { user } = useAuth();
  
  const series = studySeries.find(s => s.id === seriesId);
  const lessons = allLessonsBySeries[seriesId] || [];
  const lessonIndex = lessons.findIndex(l => l.id === lessonId);
  const lesson = lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
  
  if (!series || !lesson) {
    return (
      <ProtectedLayout>
        <DashboardShell>
          <div className="text-center py-12">
            <p className="text-gray-500">Lesson not found</p>
            <Link href="/bible-studies" className="text-indigo-600 mt-4 inline-block">Back to Library</Link>
          </div>
        </DashboardShell>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <PageNavigation 
            backText="Back to Series" 
            backHref={`/bible-studies/${seriesId}`}
            showHome={true} 
            showStudyHub={false} 
          />
          
          {/* Lesson Header */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${series.color}`}></div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                  Lesson {lessonIndex + 1} of {lessons.length}
                </span>
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {series.title}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter mb-4">
                {lesson.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {lesson.description}
              </p>
              
              {/* Scripture References */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Bible size={16} className="text-indigo-600" />
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Key Scriptures</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lesson.scriptureRef.map((ref, idx) => (
                    <span key={idx} className="font-mono text-sm bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-green-600" />
                  <h2 className="text-xl font-black">Key Points</h2>
                </div>
                <ul className="space-y-3">
                  {lesson.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Application Questions */}
          {lesson.applicationQuestions && lesson.applicationQuestions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle size={18} className="text-amber-600" />
                  <h2 className="text-xl font-black">Discussion & Application</h2>
                </div>
                <ul className="space-y-3">
                  {lesson.applicationQuestions.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Spirit of Prophecy Reference */}
          {lesson.desireOfAgesRef && (
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-purple-600 mt-0.5" />
                <div>
                  <p className="font-black text-purple-800">Spirit of Prophecy Reference</p>
                  <p className="text-purple-700 text-sm mt-1">
                    Desire of Ages, Chapter {lesson.desireOfAgesRef}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation between lessons */}
          <div className="flex justify-between gap-4 pt-4">
            {prevLesson ? (
              <Link
                href={`/bible-studies/${seriesId}/${prevLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-black text-[10px] uppercase hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={14} /> Previous: {prevLesson.title.substring(0, 30)}
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextLesson ? (
              <Link
                href={`/bible-studies/${seriesId}/${nextLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-black text-[10px] uppercase hover:bg-indigo-700 transition-colors"
              >
                Next: {nextLesson.title.substring(0, 30)} <ChevronRight size={14} />
              </Link>
            ) : (
              <Link
                href={`/bible-studies/${seriesId}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-green-600 text-green-600 font-black text-[10px] uppercase hover:bg-green-50 transition-colors"
              >
                <CheckCircle size={14} /> Complete Series
              </Link>
            )}
          </div>

          {/* Print/Download */}
          <div className="flex justify-center gap-3 pt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-[10px] font-black hover:bg-gray-200 transition-colors">
              <Printer size={14} /> Print Lesson
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-[10px] font-black hover:bg-gray-200 transition-colors">
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
