"use client";
import { useState, useEffect } from "react";
import LinkActual from "next/link";
import Image from "next/image"; // Image import kiya
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, Twitter, ArrowRight } from "lucide-react";

// JSON Import
import pageData from "@/app/data.json";

export default function Navbar() {
  const data = pageData.navbar; 
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  if (!data) return null;

  return (
    <>
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO & LEFT SECTION */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={28} />
            </button>

            <LinkActual href="/" className="flex items-center gap-3">
              {/* Logo container mein Initial ki jagah Image lagayi */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white flex items-center justify-center font-black rounded-xl shadow-lg rotate-3 overflow-hidden relative">
                <Image 
                  src={data.logoAvatar} 
                  fill 
                  className="object-cover" 
                  alt="Leader Logo" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-black uppercase tracking-tighter leading-none text-black">
                  {data.name}
                </span>
                <span className="text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-[2px] mt-1">
                  {data.subtext}
                </span>
              </div>
            </LinkActual>
          </div>

          {/* DESKTOP LINKS - Colors updated to Primary */}
          <ul className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[2px] text-slate-600">
            {data.links.map((link) => (
              <li key={link.name}>
                <LinkActual 
                  href={link.href} 
                  className={`hover:text-primary transition-all hover:tracking-widest border-b-2 pb-1 ${pathname === link.href ? "border-primary text-primary" : "border-transparent"}`}
                >
                  {link.name}
                </LinkActual>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1100] lg:hidden"
            />

            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[1200] shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  {/* Mobile Logo Avatar */}
                  <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-black rounded-lg text-xs overflow-hidden relative">
                    <Image src={data.logoAvatar} fill className="object-cover" alt="Logo" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs text-slate-900">
                    {data.mobileHeader}
                  </span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-900" />
                </button>
              </div>

              {/* Drawer Links - Updated to bg-accent and text-primary */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {data.links.map((link) => (
                  <LinkActual 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-4 font-black uppercase text-sm tracking-widest rounded-xl transition-all ${
                      pathname === link.href 
                      ? "bg-accent text-primary" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <ArrowRight size={16} className={pathname === link.href ? "opacity-100" : "opacity-20"} />
                  </LinkActual>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-8 border-t bg-slate-50">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[3px] mb-4">
                  {data.mobileFooterLabel}
                </p>
                <div className="flex gap-6 text-slate-400">
                  <Facebook size={20} className="hover:text-primary cursor-pointer transition-colors" />
                  <Twitter size={20} className="hover:text-sky-500 cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}