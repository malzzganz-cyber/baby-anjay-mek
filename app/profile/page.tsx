"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, CreditCard, Award, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { SETTINGS } from '@/lib/settings';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-8">Profile</h2>

      <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-500/20">
          M
        </div>
        <div>
          <h3 className="text-xl font-bold">Malzz User</h3>
          <p className="text-sm text-emerald-400 font-medium">Rp 0</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Metode Pembayaran</h4>
            <p className="text-xs text-slate-400">Kelola QRIS & E-Wallet</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Leaderboard</h4>
            <p className="text-xs text-slate-400">Peringkat & Point</p>
          </div>
        </div>

        <Link href="/admin" className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-red-500/10 border-red-500/20 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Admin Panel</h4>
            <p className="text-xs text-slate-400">Kelola Markup & Withdraw</p>
          </div>
        </Link>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer mt-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <LogOut className="w-5 h-5" />
          </div>
          <div className="flex-1 text-slate-300 font-medium">Log Out</div>
        </div>
      </div>
    </main>
  );
}
