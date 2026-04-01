"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('bethel_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('bethel_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Demo login - replace with actual auth
    if (username === "demo" && password === "demo") {
      const demoUser: User = {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        role: "MEMBER",
        groupId: "1",
        groupName: "Victory Group"
      };
      setUser(demoUser);
      localStorage.setItem('bethel_auth_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('bethel_auth_user');
    router.push('/login');
  };

  const hasPermission = (roles: string | string[]) => {
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
