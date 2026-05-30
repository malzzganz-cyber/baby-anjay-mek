"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Search, Plus, Sparkles, TrendingUp, Zap, ChevronRight, Bell } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import Image from 'next/image';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => setMounted(true), []);

  const { data, error, isLoading } = useSWR('/api/services', fetcher);

  if (!mounted) return null;

  const services = data?.data || [];
  const filtered = services.filter((s: any) => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen px-4 pt-8 pb-32 max-w-lg mx-auto relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      {/* Header Profile / Balance */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
               <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center font-bold text-lg text-white">
                 M
               </div>
             </div>
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#070B14] rounded-full"></div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Selamat Datang</p>
            <h2 className="text-lg font-bold text-white">Malzz User</h2>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </motion.div>

      {/* Main Balance Card - Luxury Glass */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
        className="relative overflow-hidden rounded-3xl p-[1px] mb-8 bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]"
      >
        <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
        <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-[23px] p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2 mb-1">
                 Total Saldo <Sparkles className="w-4 h-4 text-blue-400" />
              </p>
              <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight">
                Rp 0
              </h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> <span className="text-xs font-bold">+0.0%</span>
            </div>
          </div>

          <div className="flex gap-3">
             <Link href="/deposit" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
               <Plus className="w-5 h-5" /> Isi Saldo
             </Link>
             <Link href="/history" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium flex items-center justify-center transition-all">
               Riwayat
             </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Access or Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-4 rounded-2xl mb-8 flex items-center justify-between border border-purple-500/30 bg-purple-500/5 group cursor-pointer hover:bg-purple-500/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Promo Layanan Spesial!</h4>
            <p className="text-xs text-slate-400">Harga turun untuk WhatsApp & TG</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
      </motion.div>

      {/* Services Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight">Layanan Populer</h3>
          <span className="text-xs text-blue-400 font-medium cursor-pointer hover:text-blue-300">View All</span>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Cari layanan apa hari ini?" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-[#0F172A] transition-all shadow-inner"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="glass-panel h-28 rounded-2xl animate-pulse bg-white/5 border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {filtered.map((s: any, i: number) => (
              <Link href={`/order?service_id=${s.id}`} key={s.id}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-panel p-4 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col items-center text-center gap-3 relative overflow-hidden group border-t border-l border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all z-10">
                    <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400">
                      {s.name.substring(0,2).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="z-10 w-full">
                    <h4 className="font-bold text-sm text-white truncate w-full tracking-wide">{s.name}</h4>
                    <p className="text-xs text-emerald-400 font-medium mt-1">Mulai Rp {s.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
