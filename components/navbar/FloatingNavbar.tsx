"use client";
import Link from 'next/link';
import { Home, PlusCircle, ShoppingCart, Clock, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingNavbar() {
  const pathname = usePathname();

  if (pathname === '/') return null; // Don't show on landing page maybe? Or show everywhere.

  const navs = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Deposit', href: '/deposit', icon: PlusCircle },
    { name: 'Order', href: '/order', icon: ShoppingCart },
    { name: 'History', href: '/history', icon: Clock },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="glass-panel flex justify-between items-center rounded-full p-2 w-full shadow-2xl shadow-blue-500/10">
        {navs.map((n) => {
          const isActive = pathname.startsWith(n.href);
          return (
            <Link key={n.name} href={n.href} className="relative group p-3 rounded-full flex flex-col items-center justify-center transition-all">
              {isActive && (
                <div className="absolute inset-0 bg-white/10 rounded-full blur-md"></div>
              )}
              <n.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
