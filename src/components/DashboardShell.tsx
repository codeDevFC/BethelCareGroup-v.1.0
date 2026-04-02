"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LogOut, Menu, X, LayoutDashboard, Users, Calendar, 
  Heart, Target, BookOpen, Shield, Award, Church, 
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
    if (newSet.has(menuId)) newSet.delete(menuId);
    else newSet.add(menuId);
    setExpandedMenus(newSet);
  };

  const handleLogout = async () => { await logout(); router.push("/login"); };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return null;

  const isActivePath = (path: string) => pathname === path || (path !== "/dashboard" && pathname?.startsWith(path));

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", showFor: ["ADMIN", "LEADER", "MEMBER", "SEEKER"] },
    ...(user.role === "ADMIN" ? [{ label: "Members", icon: Users, path: "/members", showFor: ["ADMIN"] }] : []),
    { label: "Care Groups", icon: Church, path: "/groups", showFor: ["ADMIN", "LEADER"] },
    { label: "Leadership", icon: Shield, path: "/leadership", showFor: ["ADMIN", "LEADER"] },
    { label: "Mission Pipeline", icon: Target, path: "/mission", showFor: ["ADMIN", "LEADER"] },
    { label: "Health & Safety", icon: Shield, path: "/safety", showFor: ["ADMIN", "LEADER"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-white border-r border-gray-100">
        <div className="p-6 border-b"><h1 className="text-xl font-black tracking-tighter uppercase leading-tight">BETHEL WILLENHALL</h1></div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActivePath(item.path) ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
              <item.icon size={16} /><span>{item.label}</span>
            </Link>
          ))}
          <Link href="/bible-studies" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isActivePath("/bible-studies") ? "bg-gradient-to-r from-blue-900 to-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
            <BookOpen size={16} /><span>Bible Studies</span>
          </Link>
        </nav>
        <div className="p-6 border-t"><button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase text-white bg-red-600 hover:bg-red-700 transition-all"><LogOut size={14} /> Logout</button></div>
      </aside>
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
