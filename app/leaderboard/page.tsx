"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const topUsers = [
    { name: "Malzz_ID", tx: 1240, color: "from-yellow-400 to-amber-600", border: "border-yellow-500/50" },
    { name: "RajaOTP", tx: 980, color: "from-slate-300 to-slate-500", border: "border-slate-400/50" },
    { name: "JuraganNokos", tx: 856, color: "from-amber-700 to-orange-900", border: "border-amber-700/50" },
    { name: "Rina_Store", tx: 602, color: "from-blue-600 to-blue-800", border: "border-blue-500/30" },
    { name: "BudiTzy", tx: 490, color: "from-blue-600 to-blue-800", border: "border-blue-500/30" }
  ];

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" /> Leaderboard
      </h2>

      <div className="flex justify-center items-end gap-2 sm:gap-4 mb-12 h-48">
        {/* Pos 2 */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center w-1/3">
          <div className="w-12 h-12 rounded-full bg-slate-800 mb-2 border-2 border-slate-400 flex items-center justify-center font-bold text-lg">2</div>
          <div className="h-24 w-full bg-gradient-to-t from-slate-400/20 to-slate-400/5 rounded-t-xl border-t border-slate-400/30"></div>
          <p className="text-xs font-bold mt-2 truncate max-w-full">{topUsers[1].name}</p>
        </motion.div>

        {/* Pos 1 */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center w-1/3">
          <Medal className="w-8 h-8 text-yellow-400 mb-1 absolute -top-10" />
          <div className="w-16 h-16 rounded-full bg-slate-800 mb-2 border-2 border-yellow-400 flex items-center justify-center font-bold text-2xl shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10">1</div>
          <div className="h-32 w-full bg-gradient-to-t from-yellow-400/20 to-yellow-400/5 rounded-t-xl border-t-2 border-yellow-400/50"></div>
          <p className="text-sm font-bold text-yellow-400 mt-2 truncate w-full flex justify-center text-center">{topUsers[0].name}</p>
        </motion.div>

        {/* Pos 3 */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center w-1/3">
          <div className="w-12 h-12 rounded-full bg-slate-800 mb-2 border-2 border-amber-700 flex items-center justify-center font-bold text-lg">3</div>
          <div className="h-20 w-full bg-gradient-to-t from-amber-700/20 to-amber-700/5 rounded-t-xl border-t border-amber-700/30"></div>
          <p className="text-xs font-bold mt-2 truncate max-w-full">{topUsers[2].name}</p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3">
        {topUsers.map((user, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            className={`glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 ${user.border}`}
          >
            <div className="w-8 flex justify-center text-lg font-bold text-slate-500">#{idx + 1}</div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr flex-shrink-0 flex items-center justify-center text-white font-bold opacity-80" style={{ backgroundImage: `linear-gradient(to top right, var(--color-${user.color.split(' ')[0].substring(5)}), var(--color-${user.color.split(' ')[1].substring(3)}))` }}>
               {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white tracking-wide">{user.name}</h4>
              <p className="text-xs text-blue-400">{user.tx} Transaksi Sukses</p>
            </div>
            {idx === 0 && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
