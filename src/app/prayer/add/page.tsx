"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { ArrowLeft, Heart, AlertCircle, Lock, Globe } from "lucide-react";

export default function AddPrayerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    request: "",
    isPrivate: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Prayer request submitted! Our team will pray for you.");
    router.push("/prayer");
    setSubmitting(false);
  };

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          <div className="flex items-center gap-4">
            <Link href="/prayer" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart size={16} className="text-rose-600" />
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Share Request</span>
              </div>
              <h1 className="text-3xl font-black tracking-tighter">Prayer Request</h1>
              <p className="text-gray-500 text-sm">Share your prayer needs with the community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Prayer Request *</label>
                <textarea
                  name="request"
                  required
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-400 resize-none"
                  placeholder="What would you like us to pray about?..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-3">Privacy Setting</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={!formData.isPrivate}
                      onChange={() => setFormData({ ...formData, isPrivate: false })}
                      className="w-4 h-4 text-rose-600"
                    />
                    <Globe size={16} className="text-gray-500" />
                    <div>
                      <p className="font-black text-sm">Public</p>
                      <p className="text-[9px] text-gray-500">Visible to all members</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.isPrivate}
                      onChange={() => setFormData({ ...formData, isPrivate: true })}
                      className="w-4 h-4 text-rose-600"
                    />
                    <Lock size={16} className="text-gray-500" />
                    <div>
                      <p className="font-black text-sm">Private</p>
                      <p className="text-[9px] text-gray-500">Only leaders can see</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 mt-0.5" />
                <div>
                  <p className="font-black text-xs text-rose-800">Prayer Promise</p>
                  <p className="text-[10px] text-rose-600 mt-1">
                    "The effective, fervent prayer of a righteous man avails much." - James 5:16
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href="/prayer" className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-black text-[10px] uppercase hover:bg-gray-100 transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || !formData.request.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Prayer Request"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
