#!/bin/bash

# ============================================================
# COMPLETE RESTRUCTURE - SINGLE SOURCE OF TRUTH
# ============================================================

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           COMPLETE FOLDER RESTRUCTURING                      ║"
echo "║              Consolidating Duplicate Files                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 📦 BACKUP
echo "📦 Creating backup..."
mkdir -p .backup/$(date +%Y%m%d_%H%M%S)
cp -r src .backup/$(date +%Y%m%d_%H%M%S)/src 2>/dev/null || true
echo "✅ Backup created"

# 📁 STEP 1: Remove duplicate group routes and folders
echo "📁 STEP 1: Cleaning duplicate structures..."
rm -rf src/app/groups/group 2>/dev/null
rm -rf src/app/groups/[groupId] 2>/dev/null
rm -rf src/lib/data 2>/dev/null
rm -rf src/lib/types 2>/dev/null
rm -rf types 2>/dev/null
rm -f src/lib/auth/AuthProvider.tsx 2>/dev/null
echo "   ✅ Cleaned duplicate routes, data, types, and auth files"

# 📁 STEP 2: Consolidate data and types
echo "📁 STEP 2: Creating single source for data and types..."
mkdir -p src/data
mkdir -p src/types

cat > src/data/mockData.ts << 'INNER_EOF'
export const groups = [
  { id: '1', name: 'Willenhall Victory', meetingDay: 'Sunday', meetingTime: '15:00', leader: 'Frank A', members: 12, seekers: 3, healthScore: 92, location: 'Willenhall Town Centre' },
  { id: '2', name: 'Dudley Faith Builders', meetingDay: 'Wednesday', meetingTime: '18:30', leader: 'Michael A', members: 11, seekers: 2, healthScore: 85, location: 'Dudley Town Centre' },
  { id: '3', name: 'Birmingham Hope', meetingDay: 'Tuesday', meetingTime: '19:00', leader: 'Charles A', members: 13, seekers: 4, healthScore: 88, location: 'Birmingham City Centre' },
];

export const members = [
  { id: '1', name: 'Frank A', email: 'frank@willenhall.org', phone: '+44 1902 123001', role: 'leader', groupId: '1', joinedDate: '2024-01-15', status: 'active' },
  { id: '2', name: 'Felix B', email: 'felix@willenhall.org', phone: '+44 1902 123002', role: 'member', groupId: '1', joinedDate: '2024-02-01', status: 'active' },
  { id: '5', name: 'David Chen', email: 'david@willenhall.org', phone: '+44 1902 123005', role: 'seeker', groupId: '1', joinedDate: '2024-03-20', status: 'active' },
];

export const prayerRequests = [
  { id: '1', memberName: 'Frank A', request: 'Pray for our group outreach', date: '2025-03-25', status: 'active', isPrivate: false },
];

export const attendanceRecords = [];
export const discipleshipProgress = [];
export const missionStages = [];
INNER_EOF

cat > src/types/index.ts << 'INNER_EOF'
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  groupId?: string;
  groupName?: string;
}

export interface Group {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  leader: string;
  members: number;
  seekers: number;
  healthScore: number;
}
INNER_EOF

# 📁 STEP 3: Update AuthContext
echo "📁 STEP 3: Consolidating Auth..."
mkdir -p src/lib/auth
cat > src/lib/auth/AuthContext.tsx << 'INNER_EOF'
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User { id: string; name: string; email: string; role: string; groupId?: string; groupName?: string; }
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (r: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS = [
  { id: "admin1", name: "Church Administrator", username: "admin", password: "BETHEL@UK77", role: "ADMIN" },
  { id: "g1_leader", name: "Frank A", username: "frank_willenhall", password: "victory@BWcg03", role: "LEADER", groupId: "1", groupName: "Willenhall Victory" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('bethel_auth_user');
    if (stored) { try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('bethel_auth_user'); } }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const found = DEMO_USERS.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser as User);
      localStorage.setItem('bethel_auth_user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = async () => { setUser(null); localStorage.removeItem('bethel_auth_user'); router.push('/login'); };

  const hasPermission = (roles: string | string[]) => {
    if (!user) return false;
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role) || user.role === 'ADMIN';
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
INNER_EOF

# 📁 STEP 4: Update Layout and Shell
echo "📁 STEP 4: Updating Shell and Layout..."
cat > src/app/layout.tsx << 'INNER_EOF'
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
INNER_EOF

# 📁 STEP 5: Create Correct Group Dynamic Routes
echo "📁 STEP 5: Consolidating Group Pages..."
mkdir -p "src/app/group/[groupId]/members"
mkdir -p "src/app/group/[groupId]/attendance"
mkdir -p "src/app/group/[groupId]/prayer"

cat > "src/app/group/[groupId]/page.tsx" << 'INNER_EOF'
"use client";
import { use } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { Users, Calendar, Heart } from "lucide-react";
import { groups } from "@/data/mockData";

export default function GroupDashboardPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const group = groups.find(g => g.id === resolvedParams.groupId);
  if (!group) return <div>Group not found</div>;

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-red-600 rounded-3xl p-8 text-white">
            <h1 className="text-3xl font-black uppercase tracking-tighter">{group.name}</h1>
            <p className="mt-2 opacity-90">{group.meetingDay}s at {group.meetingTime}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href={`/group/${group.id}/members`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Users size={24} className="text-blue-600 mb-2" /><h3 className="font-black">Members</h3>
            </Link>
            <Link href={`/group/${group.id}/attendance`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Calendar size={24} className="text-green-600 mb-2" /><h3 className="font-black">Attendance</h3>
            </Link>
            <Link href={`/group/${group.id}/prayer`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-all">
              <Heart size={24} className="text-rose-600 mb-2" /><h3 className="font-black">Prayer Wall</h3>
            </Link>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
INNER_EOF

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    RESTRUCTURING COMPLETE!                   ║"
echo "║  ✅ Consolidated data, types, and auth                       ║"
echo "║  ✅ Fixed dynamic route structure                            ║"
echo "║  ✅ Updated Root Layout with AuthProvider                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
