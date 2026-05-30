"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewPage() {
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (review.trim() === '') return toast.error("Komentar tidak boleh kosong.");
    toast.success("Review berhasil dikirim! Terima kasih atas tanggapan Anda.");
    setReview('');
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-10 pb-32 max-w-lg mx-auto">
      {/* SEO Schema automatically added via <script> below */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": "Malzz Nokos",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "12450"
        },
        "offers": {
          "@type": "Offer",
          "price": "1000",
          "priceCurrency": "IDR"
        }
      })}} />

      <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
        Review & Rating
      </h2>

      <div className="glass-panel p-6 rounded-2xl mb-8 flex flex-col items-center">
        <h3 className="text-5xl font-bold mb-2">4.9</h3>
        <div className="flex gap-1 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
        </div>
        <p className="text-sm text-slate-400">Dari 12,450+ Review Pengguna</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" /> Tulis Ulasan Anda
        </h3>
        
        <div className="flex gap-2 mb-6 justify-center">
          {[1,2,3,4,5].map(i => (
            <Star 
              key={i} 
              className={`w-8 h-8 cursor-pointer transition-colors ${rating >= i ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
              onClick={() => setRating(i)}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea 
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="Bagikan pengalaman Anda menggunakan layanan kami..."
            className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
          ></textarea>
          
          <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
            <Send className="w-5 h-5" /> Kirim Review
          </button>
        </form>
      </div>

      {/* Testimonials Slider (Static implementation for visual) */}
      <div className="mt-8">
        <h3 className="font-bold mb-4">Ulasan Terbaru</h3>
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold">R</div>
                <div>
                  <h4 className="font-medium text-sm text-white">Reza A.</h4>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
             </div>
             <p className="text-sm text-slate-300">OTP sangat cepat masuk, UI responsif dan elegan. Top markotop!</p>
          </div>

          <div className="glass-panel p-4 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold">S</div>
                <div>
                  <h4 className="font-medium text-sm text-white">Sarah O.</h4>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
             </div>
             <p className="text-sm text-slate-300">Aplikasi nomor virtual terbaik yang pernah aku pakai. Auto refund jalan mulus.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
