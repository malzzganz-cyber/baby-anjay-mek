import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingNavbar from "@/components/navbar/FloatingNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malzz Nokos — Nomor Virtual OTP Premium",
  description: "Platform nomor virtual OTP otomatis dengan QRIS realtime dan UI modern premium.",
  keywords: "nokos murah,nokos whatsapp,otp murah,virtual number indonesia,rumahotp",
  manifest: "/manifest.json",
  themeColor: "#070B14",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#070B14] text-white antialiased pb-24`}>
        {children}
        <FloatingNavbar />
        <Toaster position="top-center" toastOptions={{
          style: { background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(10px)" }
        }}/>
      </body>
    </html>
  );
}


