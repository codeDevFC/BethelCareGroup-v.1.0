"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X, LayoutDashboard, Users, Calendar, Heart, Target, BookOpen, Shield, Award, Church, Settings, Library } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Show loading state while auth is initializing
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

  // Don't render if no user (will redirect to login via auth provider)
  if (!user) {
    return null;
  }

  const groupBasePath = user?.groupId ? `/group/${user.groupId}` : "";

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', showFor: ['ADMIN'] },
    { label: 'Members', icon: Users, path: '/members', showFor: ['ADMIN'] },
    { label: 'Groups', icon: Church, path: '/groups', showFor: ['ADMIN'] },
    { label: 'Manage Groups', icon: Settings, path: '/groups/manage', showFor: ['ADMIN'] },
    { label: 'Leadership', icon: Shield, path: '/leadership', showFor: ['ADMIN'] },
    { label: 'My Dashboard', icon: LayoutDashboard, path: groupBasePath || '/group-dashboard', showFor: ['LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Attendance', icon: Calendar, path: groupBasePath ? `${groupBasePath}/attendance` : '/attendance', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Prayer', icon: Heart, path: groupBasePath ? `${groupBasePath}/prayer` : '/prayer', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Discipleship', icon: Award, path: groupBasePath ? `${groupBasePath}/discipleship` : '/discipleship', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Mission', icon: Target, path: groupBasePath ? `${groupBasePath}/mission` : '/mission', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Study Hub', icon: BookOpen, path: groupBasePath ? `${groupBasePath}/study-hub` : '/study-hub', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
    { label: 'Resources Corner', icon: Library, path: groupBasePath ? `${groupBasePath}/study-hub/resources-corner` : '/resources-corner', showFor: ['ADMIN', 'LEADER', 'MEMBER', 'SEEKER'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    user && item.showFor.includes(user.role)
  );

  const isActivePath = (path: string) => {
    if (!pathname) return false;
    if (path === pathname) return true;
    if (path !== '/' && pathname.startsWith(path + '/')) return true;
    return false;
  };

  const mainItems = filteredNavItems.filter(item => 
    !item.path.includes('/study-hub') && 
    !item.path.includes('/attendance') && 
    !item.path.includes('/prayer') && 
    !item.path.includes('/discipleship') && 
    !item.path.includes('/mission')
  );
  
  const groupItems = filteredNavItems.filter(item => 
    item.path.includes('/attendance') || 
    item.path.includes('/prayer') || 
    item.path.includes('/discipleship') || 
    item.path.includes('/mission')
  );
  
  const studyItems = filteredNavItems.filter(item => 
    item.path.includes('/study-hub') && !item.path.includes('/resources-corner')
  );
  
  const resourceItem = filteredNavItems.find(item => 
    item.path.includes('/resources-corner')
  );

  // Safe access to user properties with optional chaining
  const userName = user?.name || "User";
  const userRole = user?.role || "member";
  const userGroupName = user?.groupName || "";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm hidden lg:flex">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-xl font-black tracking-tighter uppercase" style={{ fontFamily: 'Georgia, serif' }}>BETHEL<br />WILLENHALL</h1>
          <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mt-1">Care Group Connect</p>
        </div>
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
          <p className="font-black text-sm text-gray-900">{userName}</p>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">{userRole}</p>
          {userGroupName && <p className="text-[8px] font-black text-blue-600 mt-1">{userGroupName}</p>}
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          <div>
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">MAIN</p>
            <div className="space-y-1">
              {mainItems.map((item) => (
                <Link key={item.label} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
                  <item.icon size={16} /> <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {groupItems.length > 0 && (
            <div>
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">CARE GROUP</p>
              <div className="space-y-1">
                {groupItems.map((item) => (
                  <Link key={item.label} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
                    <item.icon size={16} /> <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest px-4 mb-2">DISCIPLESHIP</p>
            <div className="space-y-1">
              {studyItems.map((item) => (
                <Link key={item.label} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
                  <item.icon size={16} /> <span>{item.label}</span>
                </Link>
              ))}
              {resourceItem && (
                <Link href={resourceItem.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all mt-2 ${isActivePath(resourceItem.path) ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 hover:from-purple-100 hover:to-indigo-100 border border-purple-100"}`}>
                  <Library size={16} /> <span>{resourceItem.label}</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <div className="p-6 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600 shadow-lg hover:bg-red-700 transition-all"><LogOut size={14} /> Logout</button>
          <p className="text-[8px] font-black text-gray-400 text-center mt-4">Bethel Willenhall Church</p>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div><h1 className="text-sm font-black tracking-tighter uppercase">BETHEL WILLENHALL</h1><p className="text-[6px] font-black text-red-600">Care Group Connect</p></div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl shadow-lg">{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden">
              <div className="p-6 border-b border-gray-100"><h1 className="text-xl font-black tracking-tighter uppercase">BETHEL<br />WILLENHALL</h1><p className="text-[8px] font-black text-red-600">Care Group Connect</p></div>
              <div className="px-6 py-4 border-b"><p className="text-[10px] font-black text-gray-400">Logged in as</p><p className="font-black text-sm">{userName}</p><p className="text-[8px] font-black text-gray-400 uppercase mt-1">{userRole}</p></div>
              <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div><p className="text-[8px] font-black text-gray-300 px-4 mb-2">MAIN</p>{mainItems.map((item) => (<Link key={item.label} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"}`}><item.icon size={16} /><span>{item.label}</span></Link>))}</div>
                {groupItems.length > 0 && (<div><p className="text-[8px] font-black text-gray-300 px-4 mb-2">CARE GROUP</p>{groupItems.map((item) => (<Link key={item.label} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"}`}><item.icon size={16} /><span>{item.label}</span></Link>))}</div>)}
                <div><p className="text-[8px] font-black text-gray-300 px-4 mb-2">DISCIPLESHIP</p>{studyItems.map((item) => (<Link key={item.label} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"}`}><item.icon size={16} /><span>{item.label}</span></Link>))}
                {resourceItem && (<Link href={resourceItem.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase mt-2 ${isActivePath(resourceItem.path) ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700"}`}><Library size={16} /><span>{resourceItem.label}</span></Link>)}</div>
              </nav>
              <div className="p-6 border-t"><button onClick={handleLogout} className="w-full py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600">Logout</button></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0"><div className="p-4 lg:p-8">{children}</div></main>
    </div>
  );
}
