"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LogOut, Menu, X, LayoutDashboard, Users, Calendar, 
  Heart, Target, BookOpen, Shield, Award, Church, Settings, 
  Library, MessageCircle, Activity, FileText, Home,
  ChevronDown, ChevronRight, Sparkles, Crown, Star
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(["studies"]));

  const toggleMenu = (menuId: string) => {
    const newSet = new Set(expandedMenus);
    if (newSet.has(menuId)) {
      newSet.delete(menuId);
    } else {
      newSet.add(menuId);
    }
    setExpandedMenus(newSet);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const groupBasePath = user?.groupId ? `/group/${user.groupId}` : "";
  const isAdmin = user?.role === "ADMIN";
  const isLeader = user?.role === "LEADER";
  const isMember = user?.role === "MEMBER" || user?.role === "SEEKER";

  const isActivePath = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname?.startsWith(path)) return true;
    return false;
  };

  // Main navigation items
  const mainNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", showFor: ["ADMIN", "LEADER", "MEMBER", "SEEKER"] },
    { label: "Members", icon: Users, path: "/members", showFor: ["ADMIN"] },
    { label: "Care Groups", icon: Church, path: "/groups", showFor: ["ADMIN", "LEADER"] },
    { label: "Leadership", icon: Shield, path: "/leadership", showFor: ["ADMIN", "LEADER"] },
    { label: "Mission Pipeline", icon: Target, path: "/mission", showFor: ["ADMIN", "LEADER"] },
    { label: "Health & Safety", icon: Shield, path: "/safety", showFor: ["ADMIN", "LEADER"] },
  ];

  // Care Group navigation (for non-admin)
  const careGroupNavItems = [
    { label: "My Group", icon: Church, path: groupBasePath || "/group-dashboard", showFor: ["LEADER", "MEMBER", "SEEKER"] },
    { label: "Members", icon: Users, path: `${groupBasePath}/members`, showFor: ["LEADER", "MEMBER"] },
    { label: "Attendance", icon: Calendar, path: `${groupBasePath}/attendance`, showFor: ["LEADER"] },
    { label: "Prayer Wall", icon: Heart, path: `${groupBasePath}/prayer`, showFor: ["LEADER", "MEMBER", "SEEKER"] },
  ];

  // Discipleship & Training
  const discipleshipNavItems = [
    { label: "Discipleship Progress", icon: Award, path: "/discipleship", showFor: ["ADMIN", "LEADER"] },
    { label: "Resources Corner", icon: Library, path: `${groupBasePath}/study-hub/resources-corner`, showFor: ["ADMIN", "LEADER", "MEMBER", "SEEKER"] },
  ];

  // Bible Study Library items
  const bibleStudyItems = [
    { label: "All Series", path: "/bible-studies", lessons: 11 },
    { label: "Faith Series", path: "/bible-studies/faith", lessons: 6 },
    { label: "NEWSTART Health", path: "/bible-studies/newstart", lessons: 8 },
    { label: "Mary of Bethany", path: "/bible-studies/mary-bethany", lessons: 7 },
    { label: "Miracles of Jesus", path: "/bible-studies/miracles", lessons: 9 },
    { label: "Parables Pt 1", path: "/bible-studies/parables-1", lessons: 11 },
    { label: "Parables Pt 2", path: "/bible-studies/parables-2", lessons: 10 },
    { label: "Last Week of Jesus", path: "/bible-studies/last-week", lessons: 8 },
    { label: "Come Alive!", path: "/bible-studies/come-alive", lessons: 7 },
    { label: "Life of Daniel", path: "/bible-studies/daniel", lessons: 6 },
    { label: "Life of David", path: "/bible-studies/david", lessons: 9 },
    { label: "Life of Joseph", path: "/bible-studies/joseph", lessons: 10 },
  ];

  const userName = user?.name || "User";
  const userRole = user?.role || "MEMBER";
  const userGroupName = user?.groupName || "";

  // Filter items based on user role
  const filteredMainNav = mainNavItems.filter(item => item.showFor.includes(user?.role || ""));
  const filteredCareGroupNav = careGroupNavItems.filter(item => item.showFor.includes(user?.role || ""));
  const filteredDiscipleshipNav = discipleshipNavItems.filter(item => item.showFor.includes(user?.role || ""));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 bg-white border-r border-gray-100">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img 
                src="/images/gallery/logoCG-.png" 
                alt="BCG Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/48x48?text=BCG";
                }}
              />
              <div>
                <h1 className="text-xl font-black tracking-tighter uppercase leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  BETHEL<br />WILLENHALL
                </h1>
                <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">Care Group Connect</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-[10px] font-black text-gray-400">Logged in as</p>
            <p className="font-black text-sm">{userName}</p>
            <p className="text-[8px] font-black text-gray-400 uppercase mt-1">{userRole}</p>
            {userGroupName && <p className="text-[8px] font-black text-blue-600 mt-1">{userGroupName}</p>}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {/* MAIN Section */}
            <div className="mb-6">
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">MAIN</p>
              <div className="space-y-1">
                {filteredMainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      isActivePath(item.path) 
                        ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CARE GROUP Section */}
            {filteredCareGroupNav.length > 0 && (
              <div className="mb-6">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">CARE GROUP</p>
                <div className="space-y-1">
                  {filteredCareGroupNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        isActivePath(item.path) 
                          ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" 
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* BIBLE STUDY LIBRARY - Expandable */}
            <div className="mb-6">
              <button
                onClick={() => toggleMenu("studies")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={16} />
                  <span>BIBLE STUDY LIBRARY</span>
                </div>
                {expandedMenus.has("studies") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              <AnimatePresence>
                {expandedMenus.has("studies") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-7 mt-1 space-y-1"
                  >
                    {bibleStudyItems.map((study) => (
                      <Link
                        key={study.path}
                        href={study.path}
                        className={`flex items-center justify-between px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                          isActivePath(study.path)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span>{study.label}</span>
                        <span className="text-[7px] text-gray-400">{study.lessons} lessons</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DISCIPLESHIP Section */}
            {filteredDiscipleshipNav.length > 0 && (
              <div className="mb-6">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">DISCIPLESHIP</p>
                <div className="space-y-1">
                  {filteredDiscipleshipNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        isActivePath(item.path) 
                          ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" 
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ICEBREAKERS */}
            <div className="mb-6">
              <Link
                href="/icebreakers"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  isActivePath("/icebreakers")
                    ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <MessageCircle size={16} />
                <span>ICEBREAKERS</span>
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600 shadow-lg hover:bg-red-700 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
            <p className="text-[8px] font-black text-gray-400 text-center mt-4">Bethel Willenhall Church</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase">BETHEL WILLENHALL</h1>
            <p className="text-[6px] font-black text-red-600">Care Group Connect</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl shadow-lg"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-black tracking-tighter uppercase">BETHEL<br />WILLENHALL</h1>
                <p className="text-[8px] font-black text-red-600">Care Group Connect</p>
              </div>
              <div className="px-6 py-4 border-b">
                <p className="text-[10px] font-black text-gray-400">Logged in as</p>
                <p className="font-black text-sm">{userName}</p>
                <p className="text-[8px] font-black text-gray-400 uppercase mt-1">{userRole}</p>
              </div>
              <nav className="flex-1 p-4 overflow-y-auto">
                {filteredMainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase mb-1 ${
                      isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"
                    }`}
                  >
                    <item.icon size={16} /><span>{item.label}</span>
                  </Link>
                ))}
                <Link
                  href="/bible-studies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase mb-1 mt-4 ${
                    isActivePath("/bible-studies") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"
                  }`}
                >
                  <BookOpen size={16} /><span>Bible Studies</span>
                </Link>
                <Link
                  href="/icebreakers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase mb-1 ${
                    isActivePath("/icebreakers") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"
                  }`}
                >
                  <MessageCircle size={16} /><span>Icebreakers</span>
                </Link>
                <Link
                  href="/safety"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase ${
                    isActivePath("/safety") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"
                  }`}
                >
                  <Shield size={16} /><span>Health & Safety</span>
                </Link>
              </nav>
              <div className="p-6 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
