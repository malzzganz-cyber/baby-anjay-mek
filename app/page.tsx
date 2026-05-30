"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Zap, Shield, Users, Activity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Glows, Extra Shapes */}
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-blue-600/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/25 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative Orbs */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_20px_4px_rgba(96,165,250,0.6)]"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[20%] w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_3px_rgba(192,132,252,0.6)]"
      />
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-40 pb-20 flex flex-col items-center text-center relative z-10">
        
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-blue-400 mb-8 border border-blue-500/30 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] cursor-default"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </div>
          <span className="font-semibold tracking-wide uppercase text-xs">V2.0 Realtime Engine Active</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Malzz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Nokos</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Elevate your multi-account strategies. Platform nomor virtual OTP otomatis tercepat dengan integrasi QRIS realtime dan UI modern.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto items-center"
        >
          <Link href="/dashboard" className="group relative px-8 py-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 hover:bg-blue-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] overflow-hidden w-full sm:w-auto">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Mulai Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-slate-200 font-medium flex items-center justify-center transition-all hover:text-white border border-white/5 hover:border-white/20 w-full sm:w-auto">
            Admin Panel
          </Link>
        </motion.div>

        {/* Features / Benefits List inline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium"
        >
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Auto Refund</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Deposit QRIS 1 Detik</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> API Super Cepat</div>
        </motion.div>

        {/* Live Stats Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-5xl relative">
          {/* Subtle glow behind grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 blur-3xl -z-10" />

          {[
            { label: 'Total Users', value: '12K+', icon: Users, color: 'text-blue-400', border: 'border-blue-500/20' },
            { label: 'Transaksi', value: '850K+', icon: Activity, color: 'text-purple-400', border: 'border-purple-500/20' },
            { label: 'Negara', value: '150+', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { label: 'Layanan', value: '80+', icon: Smartphone, color: 'text-cyan-400', border: 'border-cyan-500/20' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.1), duration: 0.5, ease: "backOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center border-t border-l ${stat.border} hover:bg-white/5 transition-all group relative overflow-hidden`}
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-current opacity-10 blur-2xl rounded-full ${stat.color}`} />
              <stat.icon className={`w-10 h-10 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_currentColor]`} />
              <div className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
