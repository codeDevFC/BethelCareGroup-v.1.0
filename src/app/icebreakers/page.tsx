"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { 
  MessageCircle, Heart, Users, User, Globe, 
  Sparkles, Copy, CheckCircle, RefreshCw,
  ChevronRight, ChevronDown
} from "lucide-react";

const icebreakerCategories = [
  {
    id: "spiritual",
    title: "Spiritual Questions",
    icon: Heart,
    color: "from-purple-600 to-pink-600",
    questions: [
      "What impresses you most about Jesus?",
      "What event in the life of Christ means the most to you?",
      "When did God become real to you?",
      "Who helped you most in your understanding of God?",
      "When do you feel closest to God?",
      "What does 'faith' mean to you personally?",
      "What do you find hardest to believe about God?",
      "'God is love' - what does that mean to you personally?"
    ]
  },
  {
    id: "interpersonal",
    title: "Getting to Know You",
    icon: Users,
    color: "from-blue-600 to-cyan-600",
    questions: [
      "Describe the person who has meant most in your life. What is their outstanding characteristic?",
      "Who was the first person you felt really understood you?",
      "Are you the kind of person others confide in? Why?",
      "What makes a person a good listener?",
      "What kind of listener do you think you have been in this group?"
    ]
  },
  {
    id: "self-awareness",
    title: "About You",
    icon: User,
    color: "from-green-600 to-emerald-600",
    questions: [
      "What would you do if you knew you could not fail?",
      "What would you most like to do or be in the next 5 years?",
      "What is your most satisfying accomplishment?",
      "What is your happiest memory?",
      "What do you most daydream about?",
      "Who has most changed your life?",
      "What gives you self-respect?"
    ]
  },
  {
    id: "world",
    title: "The World Around Us",
    icon: Globe,
    color: "from-amber-600 to-orange-600",
    questions: [
      "What would you most like to do to be remembered in history?",
      "What is the greatest current need in your community?",
      "What could you do to change your church, home, or neighbourhood?",
      "If you had limitless resources, how would you use them to benefit others?"
    ]
  },
  {
    id: "young-people",
    title: "For Young People",
    icon: Sparkles,
    color: "from-rose-600 to-pink-600",
    questions: [
      "The 3 things I do best at school are...",
      "I have these hobbies or things I like to do...",
      "If I could spend one day as I please, I would...",
      "The three things that I want more than anything else are...",
      "What I like best about church is...",
      "I think the Bible is...",
      "One or two words which best describe God to me are..."
    ]
  }
];

export default function IcebreakersPage() {
  const { user } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState<string>("spiritual");
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<string | null>(null);
  const [randomCategory, setRandomCategory] = useState<string>("spiritual");

  const copyToClipboard = (question: string) => {
    navigator.clipboard.writeText(question);
    setCopiedQuestion(question);
    setTimeout(() => setCopiedQuestion(null), 2000);
  };

  const getRandomQuestion = () => {
    const category = icebreakerCategories.find(c => c.id === randomCategory);
    if (category) {
      const randomIndex = Math.floor(Math.random() * category.questions.length);
      setRandomQuestion(category.questions[randomIndex]);
    }
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={20} className="text-indigo-600" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Group Fellowship</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">Icebreaker Questions</h1>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl">
              50+ questions to build community, spark meaningful conversations, 
              and help your Care Group grow closer together.
            </p>
          </div>

          {/* Random Question Generator */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="font-black text-lg mb-3">🎲 Random Icebreaker</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <select
                value={randomCategory}
                onChange={(e) => setRandomCategory(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm border border-white/30"
              >
                {icebreakerCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
              <button
                onClick={getRandomQuestion}
                className="px-5 py-2 bg-white text-indigo-700 rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all"
              >
                Generate Question
              </button>
            </div>
            {randomQuestion && (
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-lg font-medium">{randomQuestion}</p>
                <button
                  onClick={() => copyToClipboard(randomQuestion)}
                  className="mt-3 text-[10px] font-black text-white/70 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Copy size={12} /> Copy Question
                </button>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {icebreakerCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? "" : category.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h2 className="font-black text-lg">{category.title}</h2>
                        <p className="text-[10px] text-gray-500">{category.questions.length} questions</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {category.questions.map((question, idx) => (
                          <div key={idx} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <p className="text-sm text-gray-700 pr-2">{question}</p>
                            <button
                              onClick={() => copyToClipboard(question)}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors flex-shrink-0"
                            >
                              {copiedQuestion === question ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="font-black text-amber-800 mb-3">💡 Tips for Using Icebreakers</h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Give everyone 1-2 minutes to answer - no interruptions</li>
              <li>• Start with lighter questions, go deeper as trust builds</li>
              <li>• Leaders should answer first to model vulnerability</li>
              <li>• "Pass" is always acceptable - never force anyone to answer</li>
              <li>• Use 1-2 icebreakers per meeting, not more</li>
            </ul>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
