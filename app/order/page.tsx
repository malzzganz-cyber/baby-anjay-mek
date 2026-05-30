"use client";
import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronRight, Copy, CheckCircle, RefreshCcw, XCircle, Search } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import toast from 'react-hot-toast';

function OrderContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service_id');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [countrySearch, setCountrySearch] = useState('');
  
  const [orderData, setOrderData] = useState<any>(null);
  const [otpData, setOtpData] = useState<any>(null);

  useEffect(() => setMounted(true), []);

  const { data: countriesRes, isLoading: loadingCountries } = useSWR(
    serviceId ? `/api/countries?service_id=${serviceId}` : null, 
    fetcher
  );

  const { data: operatorsRes, isLoading: loadingOperators } = useSWR(
    selectedCountry && serviceId ? `/api/operators?country=${selectedCountry.name}&provider_id=${selectedCountry.provider_id}` : null,
    fetcher
  );

  const handleCreateOrder = async () => {
    if (!serviceId || !selectedCountry) return;
    
    const toastId = toast.loading("Memproses request...");
    try {
      const opId = selectedOperator ? selectedOperator.id : 'any';
      const res = await fetch(`/api/orders?number_id=${serviceId}&provider_id=${selectedCountry.provider_id}&operator_id=${opId}`);
      const data = await res.json();
      
      if (data?.data?.order_id) {
        setOrderData(data.data);
        setStep(3); // OTP Checking step
        toast.success("Order berhasil dibuat!", { id: toastId });
      } else {
        toast.error(data?.message || "Gagal membuat order", { id: toastId });
      }
    } catch (e) {
      toast.error("Terjadi kesalahan jaringan", { id: toastId });
    }
  };

  // OTP Polling
  useEffect(() => {
    if (step !== 3 || !orderData?.order_id) return;

    let success = false;
    const interval = setInterval(async () => {
      if (success) {
        clearInterval(interval);
        return;
      }
      try {
        const res = await fetch(`/api/otp?order_id=${orderData.order_id}&action=status`);
        const data = await res.json();
        const d = data?.data;
        if (d && d.length > 0) {
          const statusObj = d[0];
          setOtpData(statusObj);
          if (statusObj.status === 'success' || statusObj.status === 'Success' || statusObj.otp) {
            success = true;
            toast.success("OTP Diterima!");
            clearInterval(interval);
          } else if (statusObj.status === 'cancel' || statusObj.status === 'Cancel') {
            success = true;
            toast.error("Order dibatalkan / Timeout.");
            clearInterval(interval);
          }
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [step, orderData]);

  const handleCancel = async () => {
    if (!orderData?.order_id) return;
    try {
      const res = await fetch(`/api/otp?order_id=${orderData.order_id}&action=cancel`);
      const data = await res.json();
      if (data?.status || data?.data) {
        toast.success("Order berhasil dibatalkan. Saldo direfund.");
        router.push('/dashboard');
      } else {
        toast.error("Gagal membatalkan order");
      }
    } catch (e) {}
  };

  if (!mounted) return null;
  if (!serviceId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-slate-400 mb-4">Silakan pilih layanan dari dashboard terlebih dahulu.</p>
        <button onClick={() => router.push('/dashboard')} className="text-blue-400">Kembali ke Dashboard</button>
      </div>
    );
  }

  const countries = countriesRes?.data || [];
  const filteredCountries = countries.filter((c: any) => c.name.toLowerCase().includes(countrySearch.toLowerCase()));

  const operators = operatorsRes?.data || [];

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Nomor</h2>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 opacity-70">
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-current text-white text-sm">1</div>
          <span className="text-xs">Negara</span>
        </div>
        <div className={`flex-1 h-[2px] mx-2 ${step >= 2 ? 'bg-blue-400' : 'bg-slate-700'}`} />
        <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 border-current font-bold text-sm">2</div>
          <span className="text-xs">Operator</span>
        </div>
        <div className={`flex-1 h-[2px] mx-2 ${step >= 3 ? 'bg-blue-400' : 'bg-slate-700'}`} />
        <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 border-current font-bold text-sm">3</div>
          <span className="text-xs">OTP</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari negara..." 
                value={countrySearch}
                onChange={e => setCountrySearch(e.target.value)}
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            {loadingCountries ? <p className="text-center text-slate-400 py-10 animate-pulse">Memuat negara...</p> : (
              <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pb-10 pr-2 custom-scrollbar">
                {filteredCountries.map((c: any) => (
                  <div 
                    key={c.id + c.name} 
                    onClick={() => { setSelectedCountry(c); setStep(2); }}
                    className="glass-panel p-3 rounded-xl flexitems-center justify-between cursor-pointer hover:bg-white/10 transition-all flex flex-col justify-center gap-2 text-center"
                  >
                    <span className="text-2xl">{c.flag || '🌍'}</span>
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-xs text-blue-400">Rp {c.price}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <button onClick={() => setStep(1)} className="text-slate-400 text-sm mb-4 flex items-center hover:text-white">
              <ChevronRight className="w-4 h-4 rotate-180" /> Kembali
            </button>
            <h3 className="text-lg font-bold mb-4">Pilih Operator di {selectedCountry?.name}</h3>
            
            {loadingOperators ? <p className="text-center text-slate-400 py-10 animate-pulse">Memuat operator...</p> : (
              <div className="flex flex-col gap-3">
                <div 
                  onClick={() => { setSelectedOperator(null); handleCreateOrder(); }}
                  className="glass-panel p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all group"
                >
                  <span className="font-bold text-emerald-400">Random / Termurah</span>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400" />
                </div>
                {operators.map((op: any) => (
                  <div 
                    key={op.id} 
                    onClick={() => { setSelectedOperator(op); handleCreateOrder(); }}
                    className="glass-panel p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{op.name}</span>
                      <span className="text-xs text-slate-400">Stock: {op.stock || '~'}</span>
                    </div>
                    <span className="text-sm text-blue-400 font-bold">Rp {op.price}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && orderData && (
          <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-panel p-6 rounded-2xl border-blue-500/30 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl pointer-events-none" />
              
              <h3 className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Nomor Anda</h3>
              <div className="text-3xl sm:text-4xl font-bold tracking-wider mb-6 text-white flex items-center gap-3">
                {orderData.number}
                <button 
                  onClick={() => { navigator.clipboard.writeText(orderData.number); toast.success("Nomor disalin!"); }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-6" />
              
              <h3 className="text-sm text-slate-400 mb-4 tracking-wide">Menunggu SMS OTP...</h3>
              
              <div className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-6 min-h-[120px] flex items-center justify-center relative mb-6">
                {(otpData?.otp || otpData?.sms) ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                      {otpData.otp || otpData.sms}
                    </span>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(otpData.otp || otpData.sms); toast.success("OTP disalin!"); }}
                      className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" /> Copy OTP
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center text-blue-400 animate-pulse">
                    <RefreshCcw className="w-8 h-8 animate-spin mb-3 opacity-50" />
                    <span className="text-sm font-medium">Listening for messages...</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
              >
                <XCircle className="w-4 h-4" /> Batalkan & Refund Saldo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderContent />
    </Suspense>
  );
}
