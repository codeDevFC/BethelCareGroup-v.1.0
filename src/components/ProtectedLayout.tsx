"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedLayout({ 
  children, 
  requiredRoles = [] 
}: ProtectedLayoutProps) {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (!loading && user && requiredRoles.length > 0) {
      if (!hasPermission(requiredRoles)) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, router, requiredRoles, hasPermission]);

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

  return <>{children}</>;
}
