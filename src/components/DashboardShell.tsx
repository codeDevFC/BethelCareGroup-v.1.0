"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LogOut, Menu, X, LayoutDashboard, Users, Calendar, 
  Heart, Target, BookOpen, Shield, Church, 
  ChevronDown, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(["studies"]));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = (menuId: string) => {
    const newSet = new Set(expandedMenus);
    if (newSet.has(menuId)) newSet.delete(menuId);
    else newSet.add(menuId);
    setExpandedMenus(newSet);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname?.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Groups", icon: Church, path: "/groups" },
    { name: "Leadership", icon: Shield, path: "/leadership" },
    { name: "Mission", icon: Target, path: "/mission" },
  ];

  const bibleStudies = [
    { name: "Faith Series", path: "/bible-studies/faith" },
    { name: "NEWSTART", path: "/bible-studies/newstart" },
    { name: "Mary of Bethany", path: "/bible-studies/mary-bethany" },
    { name: "Miracles", path: "/bible-studies/miracles" },
    { name: "Parables Pt 1", path: "/bible-studies/parables-1" },
    { name: "Life of Daniel", path: "/bible-studies/daniel" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 bg-white border-r border-gray-100">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg">BCG</div>
              <div>
                <h1 className="text-lg font-black tracking-tighter uppercase">BETHEL<br />WILLENHALL</h1>
                <p className="text-[8px] font-black text-red-600">Care Group Connect</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-b">
            <p className="text-[10px] font-black text-gray-400">Logged in as</p>
            <p className="font-black">{user.name}</p>
            <p className="text-[8px] font-black text-gray-400 uppercase mt-1">{user.role}</p>
            {user.groupName && <p className="text-[8px] font-black text-blue-600 mt-1">{user.groupName}</p>}
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1 mb-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActive(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
                  <item.icon size={16} /><span>{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="mb-6">
              <button onClick={() => toggleMenu("studies")} className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-500 hover:bg-gray-50">
                <div className="flex items-center gap-3"><BookOpen size={16} /><span>BIBLE STUDIES</span></div>
                {expandedMenus.has("studies") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              <AnimatePresence>
                {expandedMenus.has("studies") && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-7 mt-1">
                    {bibleStudies.map((study) => (
                      <Link key={study.path} href={study.path} className={`block px-4 py-2 rounded-xl text-[9px] font-black transition-all ${isActive(study.path) ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50"}`}>
                        {study.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/prayer" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest mb-2 ${isActive("/prayer") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <Heart size={16} /><span>PRAYER WALL</span>
            </Link>

            <Link href="/attendance" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest ${isActive("/attendance") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <Calendar size={16} /><span>ATTENDANCE</span>
            </Link>
          </nav>

          <div className="p-6 border-t">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600 hover:bg-red-700 transition-all">
              <LogOut size={14} /> Logout
            </button>
            <p className="text-[8px] font-black text-gray-400 text-center mt-4">Bethel Willenhall Church</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="flex justify-between items-center px-4 py-3">
          <div><h1 className="text-sm font-black">BETHEL WILLENHALL</h1><p className="text-[6px] font-black text-red-600">Care Group Connect</p></div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl"><Menu size={20} /></button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col">
              <div className="p-6 border-b flex justify-between items-center">
                <h1 className="text-xl font-black">BETHEL</h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X size={20} /></button>
              </div>
              <div className="px-6 py-4 border-b"><p className="text-[10px] font-black text-gray-400">Logged in as</p><p className="font-black">{user.name}</p></div>
              <nav className="flex-1 p-4">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase mb-2 ${isActive(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white" : "text-gray-500"}`}>
                    <item.icon size={16} /><span>{item.name}</span>
                  </Link>
                ))}
                <Link href="/prayer" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase text-gray-500"><Heart size={16} /><span>Prayer Wall</span></Link>
                <Link href="/attendance" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase text-gray-500"><Calendar size={16} /><span>Attendance</span></Link>
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
