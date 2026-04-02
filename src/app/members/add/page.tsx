"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { groups } from "@/data/mockData";
import Link from "next/link";
import { ArrowLeft, UserPlus, AlertCircle } from "lucide-react";

export default function AddMemberPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "member",
    groupId: user?.groupId || "",
    status: "active",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/members");
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ProtectedLayout requiredRoles={["ADMIN", "LEADER"]}>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex items-center gap-4">
            <Link href="/members" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-black tracking-tighter">Add Member</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Role *</label>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400"
                  >
                    <option value="member">Member</option>
                    <option value="leader">Leader</option>
                    <option value="seeker">Seeker</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href="/members" className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-black text-[10px] uppercase">Cancel</Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
