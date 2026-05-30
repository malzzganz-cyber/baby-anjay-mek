"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, DollarSign, Settings } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [markup, setMarkup] = useState('800');

  useEffect(() => setMounted(true), []);

  const { data: adminBalance, isLoading } = useSWR('/api/admin', fetcher);

  const handleSaveMarkup = () => {
    toast.success(`Markup diupdate menjadi Rp ${markup}`);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      {/* Saldo RumahOTP */}
      <div className="glass-panel p-6 rounded-2xl mb-8 relative overflow-hidden border-blue-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <p className="text-slate-400 text-sm mb-1">Saldo RumahOTP (Pusat)</p>
        <h3 className="text-3xl font-bold text-white mb-2">
          {isLoading ? <span className="animate-pulse">Loading...</span> : `Rp ${adminBalance?.data?.balance?.toLocaleString('id-ID') || '0'}`}
        </h3>
        <p className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded inline-block">Realtime Sync</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-4 rounded-xl text-center">
          <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-xs text-slate-400">Total Users</p>
          <p className="font-bold text-lg">1,240</p>
        </div>
        <div className="glass-panel p-4 rounded-xl text-center">
          <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-slate-400">Total Transaksi</p>
          <p className="font-bold text-lg">8,432</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-purple-500/20 mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" /> Global Markup
        </h3>
        <p className="text-sm text-slate-400 mb-4">Markup harga ditambahkan otomatis ke harga asli dari provider.</p>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="number" 
              value={markup}
              onChange={e => setMarkup(e.target.value)}
              className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <button 
            onClick={handleSaveMarkup}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 rounded-xl transition-all"
          >
            Save
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-red-500/20">
        <h3 className="text-lg font-bold mb-4 text-red-400 flex items-center gap-2">
          Withdraw Saldo (H2H)
        </h3>
        <p className="text-sm text-slate-400 mb-6">Tarik saldo dari pusat ke rekening / E-Wallet Anda pribadi.</p>
        
        <button className="w-full py-4 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 font-medium border border-red-600/30 transition-all flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5" /> Buat Withdraw Request
        </button>
      </div>
    </main>
  );
}
