#!/bin/bash

echo "=========================================="
echo "CARE GROUP - Study Hub Restructuring"
echo "Adding navigation buttons and Level 4"
echo "=========================================="
echo ""

# Create backup directory
mkdir -p .backup/study-hub
cp -r src/app/group/\[groupId\]/study-hub/. .backup/study-hub/ 2>/dev/null || true

# =====================================================
# 1. Update main Study Hub page
# =====================================================
echo "📚 Updating main Study Hub page..."

mkdir -p src/app/group/\[groupId\]/study-hub

cat > src/app/group/\[groupId\]/study-hub/page.tsx << 'EOF'
"use client";
import { useParams } from 'next/navigation';
import { use } from "react";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Sparkles, Library, ChevronRight } from "lucide-react";

export default function StudyHubPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId || "1";

  const curriculum = [
    {
      level: "Level 1",
      title: "To Know Jesus",
      subtitle: "SEEKER-FOCUSED STUDIES",
      color: "from-blue-600 to-blue-400",
      icon: "🔍",
      series: [
        { title: "Reliability of the BookText", slug: "reliability", desc: "Why trust the Bible?" },
        { title: "Come Alive with Jesus", slug: "come-alive", desc: "7 lessons on new life in Christ" },
        { title: "Steps to Jesus", slug: "steps-to-jesus", desc: "Classic Steps to Christ journey" },
        { title: "Search for Certainty", slug: "search-for-certainty", desc: "30 lessons on biblical faith" },
        { title: "Explorer Class Series", slug: "explorer-class", desc: "18 foundational lessons" }
      ]
    },
    {
      level: "Level 2",
      title: "To Grow in Jesus",
      subtitle: "NEW BELIEVER FOCUS",
      color: "from-green-600 to-emerald-500",
      icon: "🌱",
      series: [
        { title: "Stay Alive with Jesus", slug: "stay-alive", desc: "15 lessons for new believers" },
        { title: "Encounter with Jesus", slug: "encounter", desc: "Life-changing meetings with Christ" },
        { title: "The Branch and The Vine", slug: "branch-and-vine", desc: "Abiding in Christ" },
        { title: "Daniel Verse by Verse", slug: "daniel", desc: "12 lessons on prophecy" },
        { title: "Sanctuary: Heaven's Blueprint", slug: "sanctuary", desc: "The gospel in symbols" },
        { title: "Discover: 3 Angels & RBF", slug: "discover", desc: "End-time messages & righteousness by faith" },
        { title: "Secrets of Prophecy", slug: "secrets-of-prophecy", desc: "24 prophetic lessons" },
        { title: "Seven Churches Study", slug: "seven-churches", desc: "Jesus' letters to His church" }
      ]
    },
    {
      level: "Level 3",
      title: "To Mature in Jesus",
      subtitle: "DISCIPLESHIP FOCUS",
      color: "from-amber-600 to-orange-500",
      icon: "🌳",
      series: [
        { title: "Excellence in Life", slug: "excellence-in-life", desc: "Living at your best" },
        { title: "Courtship & Relationship", slug: "courtship", desc: "God's design for love" },
        { title: "Christian Parenting", slug: "parenting", desc: "Raising godly children" },
        { title: "Being a Godly Man", slug: "godly-man", desc: "Biblical manhood" },
        { title: "Christian Finance", slug: "finance", desc: "Stewardship and wealth" },
        { title: "Overcome Lust", slug: "overcome-lust", desc: "Sexual integrity" },
        { title: "Trinity and Godhead", slug: "trinity", desc: "Understanding God's nature" }
      ]
    },
    {
      level: "Level 4",
      title: "Extra Meat",
      subtitle: "DEEP DIVE STUDIES",
      color: "from-purple-600 to-violet-600",
      icon: "📖",
      series: [
        { title: "Desire of Ages", slug: "desire-of-ages", desc: "Life of Christ" },
        { title: "Mount of Blessing", slug: "mount-of-blessing", desc: "Sermon on the Mount" },
        { title: "Christ's Object Lessons", slug: "christ-object-lessons", desc: "Parables of Jesus" },
        { title: "Great Controversy", slug: "great-controversy", desc: "Cosmic conflict" },
        { title: "Steps to Christ", slug: "steps-to-christ", desc: "Classic devotional" },
        { title: "Ministry of Healing", slug: "ministry-of-healing", desc: "Health and wellness" }
      ]
    }
  ];

  const resources = [
    { title: "CARE Group Leader Manual", desc: "Complete guide for group leaders", icon: "👥", link: "#" },
    { title: "Discipleship Tracking Templates", desc: "Weekly reports and attendance forms", icon: "📊", link: "#" },
    { title: "Agape Feast Planning Guide", desc: "Meal planning and fellowship ideas", icon: "🍽️", link: "#" },
    { title: "Soul Winning Strategies", desc: "Evangelism and outreach methods", icon: "🎯", link: "#" },
    { title: "Spirit of Prophecy Reading Plan", desc: "Daily study schedule", icon: "📅", link: "#" },
    { title: "Health & Wellness Manual", desc: "Biblical health principles", icon: "🏥", link: "#" }
  ];

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 text-gray-900 pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <Link href={\`/group/\${groupId}\`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
              <ArrowLeft size={14} /> Back to Group Dashboard
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
              <Home size={14} /> Home
            </Link>
          </div>

          <header className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
              <BookOpen size={14} className="text-indigo-600" />
              <span className="font-black text-[10px] uppercase tracking-widest text-indigo-600">Discipleship Journey</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>Study Hub</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">4 Levels • Resources Corner • Guided Discipleship</p>
          </header>

          <div className="space-y-10">
            {curriculum.map((level, idx) => (
              <div key={idx} className={\`bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md\`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={\`text-3xl bg-gradient-to-r \${level.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md\`}>{level.icon}</div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">{level.level}: {level.title}</h2>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{level.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {level.series.map((series, sIdx) => (
                    <Link key={sIdx} href={\`/group/\${groupId}/study-hub/\${series.slug}\`} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 transition-all hover:scale-[1.02]">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-indigo-300">{series.desc.substring(0, 30)}...</p>
                        <h3 className="font-black text-sm md:text-base tracking-tight group-hover:text-white">{series.title}</h3>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <Library size={28} className="text-indigo-600" />
              <h2 className="text-2xl font-black tracking-tight uppercase">Resources Corner</h2>
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-[10px] font-black">Quick Tips & Manuals</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource, idx) => (
                <Link key={idx} href={resource.link} className="bg-white p-5 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all group hover:border-indigo-300">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <h3 className="font-black text-sm">{resource.title}</h3>
                      <p className="text-[10px] text-gray-500 mt-1">{resource.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-indigo-200 text-center">
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">More resources added weekly • Check back often</p>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
EOF

echo "✅ Main Study Hub page updated"

# =====================================================
# 2. Create PageNavigation component
# =====================================================
echo "🧭 Creating navigation helper component..."

cat > src/components/PageNavigation.tsx << 'EOF'
"use client";
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

interface PageNavigationProps {
  backText?: string;
  backHref?: string;
  showHome?: boolean;
  showStudyHub?: boolean;
  customClass?: string;
}

export default function PageNavigation({ 
  backText = "Back",
  backHref,
  showHome = true,
  showStudyHub = true,
  customClass = ""
}: PageNavigationProps) {
  const params = useParams();
  const pathname = usePathname();
  const groupId = params?.groupId || "1";

  const getBackHref = () => {
    if (backHref) return backHref;
    if (pathname.includes('/study-hub/') && !pathname.match(/\/study-hub\/?$/)) {
      const segments = pathname.split('/');
      const sectionIndex = segments.indexOf('study-hub') + 1;
      const currentSection = segments[sectionIndex];
      if (currentSection && !segments[sectionIndex + 1]) {
        return `/group/${groupId}/study-hub/${currentSection}`;
      }
      return `/group/${groupId}/study-hub`;
    }
    return `/group/${groupId}`;
  };

  return (
    <div className={\`flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 \${customClass}\`}>
      <Link href={getBackHref()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
        <ArrowLeft size={14} /> {backText}
      </Link>
      <div className="flex items-center gap-3">
        {showStudyHub && (
          <Link href={\`/group/\${groupId}/study-hub\`} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] transition-colors">
            <BookOpen size={14} /> Study Hub
          </Link>
        )}
        {showHome && (
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
            <Home size={14} /> Home
          </Link>
        )}
      </div>
    </div>
  );
}
EOF

echo "✅ PageNavigation component created"

# =====================================================
# 3. Create Resources Corner page
# =====================================================
echo "📚 Creating Resources Corner page..."

mkdir -p src/app/group/\[groupId\]/study-hub/resources-corner

cat > src/app/group/\[groupId\]/study-hub/resources-corner/page.tsx << 'EOF'
"use client";
import { useParams } from 'next/navigation';
import { use } from "react";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import PageNavigation from "@/components/PageNavigation";
import { Book, FileText, Users, Heart, ClipboardList, Activity, Download, Printer, Sparkles, Library, Award, Target, TrendingUp } from "lucide-react";

export default function ResourcesCornerPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId || "1";

  const resources = [
    {
      category: "Leadership & Administration",
      icon: <Users size={24} className="text-blue-600" />,
      items: [
        { title: "CARE Group Leader Manual", desc: "Complete guide for group leaders", type: "PDF", pages: 45 },
        { title: "Weekly Report Template", desc: "Track attendance and prayer requests", type: "DOCX", pages: 2 },
        { title: "Quarterly Planning Guide", desc: "Plan meetings and outreach events", type: "PDF", pages: 12 },
        { title: "Core Team Responsibilities", desc: "Roles and expectations", type: "DOCX", pages: 5 }
      ]
    },
    {
      category: "Discipleship & Growth",
      icon: <TrendingUp size={24} className="text-green-600" />,
      items: [
        { title: "One-on-One Discipleship Guide", desc: "Mentorship framework", type: "PDF", pages: 28 },
        { title: "New Believer Follow-up", desc: "First 30 days plan", type: "PDF", pages: 15 },
        { title: "Spiritual Growth Assessment", desc: "Evaluate your walk with God", type: "DOCX", pages: 4 },
        { title: "Bible Reading Plans", desc: "Daily reading schedules", type: "PDF", pages: 8 }
      ]
    },
    {
      category: "Worship & Prayer",
      icon: <Heart size={24} className="text-rose-600" />,
      items: [
        { title: "Prayer Meeting Guide", desc: "Structure and ideas", type: "PDF", pages: 20 },
        { title: "Songbook Collection", desc: "Hymns and praise songs", type: "PDF", pages: 85 },
        { title: "Intercessory Prayer Manual", desc: "Praying for others", type: "PDF", pages: 32 },
        { title: "Fasting Guide", desc: "Biblical principles and tips", type: "PDF", pages: 12 }
      ]
    },
    {
      category: "Outreach & Evangelism",
      icon: <Target size={24} className="text-amber-600" />,
      items: [
        { title: "Soul Winning Strategies", desc: "Effective evangelism methods", type: "PDF", pages: 38 },
        { title: "Bible Study Invitation Cards", desc: "Printable invitation cards", type: "PDF", pages: 4 },
        { title: "Community Outreach Ideas", desc: "50+ ideas to connect", type: "PDF", pages: 15 },
        { title: "Testimony Sharing Guide", desc: "How to share your story", type: "PDF", pages: 8 }
      ]
    },
    {
      category: "Health & Wellness",
      icon: <Activity size={24} className="text-emerald-600" />,
      items: [
        { title: "Biblical Health Principles", desc: "NEWSTART lifestyle guide", type: "PDF", pages: 42 },
        { title: "Healthy Recipes Collection", desc: "Plant-based meal ideas", type: "PDF", pages: 35 },
        { title: "Stress Management Guide", desc: "Finding peace in God", type: "PDF", pages: 18 },
        { title: "Exercise & Faith", desc: "Physical activity for spiritual growth", type: "PDF", pages: 12 }
      ]
    },
    {
      category: "Family & Relationships",
      icon: <Heart size={24} className="text-purple-600" />,
      items: [
        { title: "Family Worship Guide", desc: "Daily devotion ideas", type: "PDF", pages: 25 },
        { title: "Parenting Tips", desc: "Raising godly children", type: "PDF", pages: 30 },
        { title: "Marriage Enrichment", desc: "Strengthening your union", type: "PDF", pages: 22 },
        { title: "Conflict Resolution", desc: "Biblical approach to disagreements", type: "PDF", pages: 14 }
      ]
    },
    {
      category: "Quick Tips & Templates",
      icon: <ClipboardList size={24} className="text-orange-600" />,
      items: [
        { title: "Meeting Agenda Template", desc: "30-min leadership meeting", type: "DOCX", pages: 1 },
        { title: "Prayer Request Form", desc: "Collect and track prayer needs", type: "DOCX", pages: 1 },
        { title: "Attendance Tracker", desc: "Monthly attendance sheet", type: "XLSX", pages: 1 },
        { title: "New Member Registration", desc: "Information collection form", type: "DOCX", pages: 2 }
      ]
    },
    {
      category: "Spirit of Prophecy",
      icon: <Book size={24} className="text-indigo-600" />,
      items: [
        { title: "Desire of Ages Study Guide", desc: "Life of Christ companion", type: "PDF", pages: 52 },
        { title: "Great Controversy Reading Plan", desc: "6-month schedule", type: "PDF", pages: 8 },
        { title: "Steps to Christ Devotional", desc: "Daily reflections", type: "PDF", pages: 45 },
        { title: "Ministry of Healing Handbook", desc: "Health and wellness guide", type: "PDF", pages: 38 }
      ]
    }
  ];

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 text-gray-900 pb-20">
          <PageNavigation backText="Back to Study Hub" showHome={true} showStudyHub={false} />

          <header className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
              <Library size={14} className="text-purple-600" />
              <span className="font-black text-[10px] uppercase tracking-widest text-purple-600">Resources & Tools</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>Resources Corner</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Quick Tips • Manuals • Templates • Tools for Ministry</p>
          </header>

          <div className="space-y-8">
            {resources.map((category, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h2 className="text-xl font-black tracking-tight uppercase">{category.category}</h2>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[9px] font-black">{category.items.length} resources</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, iIdx) => (
                      <div key={iIdx} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all cursor-pointer border border-transparent hover:border-purple-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText size={14} className="text-gray-400 group-hover:text-purple-600" />
                            <span className={\`text-[8px] font-black px-2 py-0.5 rounded-full \${item.type === 'PDF' ? 'bg-red-100 text-red-600' : item.type === 'DOCX' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}\`}>{item.type}</span>
                          </div>
                          <h3 className="font-black text-sm group-hover:text-purple-700">{item.title}</h3>
                          <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                          <p className="text-[8px] text-gray-400 mt-1">{item.pages} pages</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"><Download size={14} /></button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Printer size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white text-center">
            <Sparkles size={32} className="mx-auto mb-4 text-indigo-300" />
            <h3 className="text-2xl font-black mb-2">Need More Resources?</h3>
            <p className="text-indigo-200 text-sm mb-6">Contact your group leader or pastor for additional materials</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Request Resource</button>
              <button className="px-6 py-3 bg-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">Suggest a Resource</button>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
EOF

echo "✅ Resources Corner page created"

echo ""
echo "=========================================="
echo "✅ All changes completed!"
echo "=========================================="
echo ""
echo "To apply these changes, run:"
echo "  npm run dev"
echo ""
echo "Then navigate to:"
echo "  /group/[groupId]/study-hub"
echo "  /group/[groupId]/study-hub/resources-corner"
