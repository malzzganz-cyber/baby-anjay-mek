"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle, XCircle, Clock } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import Link from 'next/link';

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <History className="w-6 h-6 text-blue-400" /> Riwayat
      </h2>

      {/* Note: Integration with Firestore typically happens here for history, 
          since RumahOTP doesn't give a full history endpoint without admin rights.
          For the scope of real-time implementation based on Firebase features: */}
      
      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
        <img src="https://ui-avatars.com/api/?name=Empty+History&background=random" className="w-20 h-20 rounded-full mb-4 opacity-50 grayscale" alt="Empty" />
        <h3 className="text-lg font-bold text-white mb-2">Belum ada riwayat transaksi</h3>
        <p className="text-slate-400 text-sm mb-6">Mulai order nomor pertamamu atau lakukan deposit untuk melihat riwayat di sini.</p>
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors">
          Kembali ke Dashboard
        </Link>
      </div>
    </main>
  );
}
