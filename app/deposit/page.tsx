"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import QRCode from 'qrcode';

export default function Deposit() {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState<string>('1000');
  const [depositData, setDepositData] = useState<any>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDeposit = async () => {
    if (parseInt(amount) < 1000) return alert('Minimal deposit Rp 1.000');
    setLoading(true);
    try {
      const res = await fetch(`/api/deposit?action=create&amount=${amount}`);
      const data = await res.json();
      if (data?.data?.qr_string) {
        setDepositData(data.data);
        const url = await QRCode.toDataURL(data.data.qr_string, { width: 300, margin: 2, color: { dark: '#000', light: '#fff' } });
        setQrCodeDataUrl(url);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // Polling for deposit status
  useEffect(() => {
    if (!depositData?.deposit_id || success) return;
    
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/deposit?action=status&deposit_id=${depositData.deposit_id}`);
        const data = await res.json();
        if (data?.data?.status === 'Success' || data?.data?.status === 'success') {
          setSuccess(true);
          clearInterval(interval);
        }
      } catch (e) {}
    }, 15000); // 15 detik

    return () => clearInterval(interval);
  }, [depositData, success]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Deposit Saldo</h2>

      {!depositData ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 rounded-2xl">
          <label className="block text-slate-400 mb-2 font-medium">Nominal Deposit (Minimal Rp 1.000)</label>
          <div className="relative mb-6">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="number" 
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button 
            onClick={handleDeposit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Buat Qris'}
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 rounded-2xl border-blue-500/30 flex flex-col items-center">
          <h3 className="text-xl font-bold text-center mb-2">Scan QRIS</h3>
          <p className="text-slate-400 text-center mb-6">Silakan scan QR Code di bawah dengan aplikasi e-wallet / m-banking Anda.</p>
          
          <div className="bg-white p-2 rounded-xl mb-6">
            {qrCodeDataUrl ? (
              <img src={qrCodeDataUrl} alt="QRIS" className="w-64 h-64 border border-slate-200 rounded-lg" />
            ) : (
              <div className="w-64 h-64 animate-pulse bg-slate-200 rounded-lg"></div>
            )}
          </div>

          <div className="w-full text-center mb-6">
            <p className="text-sm text-slate-400">Total Pembayaran</p>
            <p className="text-3xl font-bold text-emerald-400">Rp {depositData.amount?.toLocaleString('id-ID')}</p>
          </div>

          {success ? (
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <CheckCircle className="w-5 h-5" />
              Deposit Berhasil! Saldo ditambahkan.
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-400 font-medium animate-pulse">
              <Clock className="w-5 h-5" />
              Menunggu pembayaran...
            </div>
          )}
        </motion.div>
      )}
    </main>
  );
}
