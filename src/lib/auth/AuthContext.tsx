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
