"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'LEADER' | 'MEMBER' | 'SEEKER';
  groupId?: string;
  groupName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS = [
  { id: 'admin1', name: 'Church Administrator', username: 'admin', password: 'admin123', role: 'ADMIN' as const },
  { id: 'leader1', name: 'Frank A', username: 'frank', password: 'frank123', role: 'LEADER' as const, groupId: '1', groupName: 'Willenhall Victory' },
  { id: 'member1', name: 'Felix B', username: 'felix', password: 'felix123', role: 'MEMBER' as const, groupId: '1', groupName: 'Willenhall Victory' },
  { id: 'seeker1', name: 'David Chen', username: 'david', password: 'david123', role: 'SEEKER' as const, groupId: '1', groupName: 'Willenhall Victory' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('bethel_auth_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('bethel_auth_user'); }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('bethel_auth_user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('bethel_auth_user');
    router.push('/login');
  };

  const hasPermission = (roles: string | string[]): boolean => {
    if (!user) return false;
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role) || user.role === 'ADMIN';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
