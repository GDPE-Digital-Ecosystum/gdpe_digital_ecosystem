// "use client";
// import { useState, useEffect } from "react";
// import LinkActual from "next/link";
// import Image from "next/image"; // Image import kiya
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Facebook, Twitter, ArrowRight } from "lucide-react";

// // JSON Import
// import pageData from "@/app/data.json";

// export default function Navbar() {
//   const data = pageData.navbar; 
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isMenuOpen]);

//   if (!data) return null;

//   return (
//     <>
//       <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`}>
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
//           {/* LOGO & LEFT SECTION */}
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsMenuOpen(true)}
//               className="lg:hidden p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
//             >
//               <Menu size={28} />
//             </button>

//             <LinkActual href="/" className="flex items-center gap-3">
//               {/* Logo container mein Initial ki jagah Image lagayi */}
//               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white flex items-center justify-center font-black rounded-xl shadow-lg rotate-3 overflow-hidden relative">
//                 <Image 
//                   src={data.logoAvatar} 
//                   fill 
//                   className="object-cover" 
//                   alt="Leader Logo" 
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm md:text-base font-black uppercase tracking-tighter leading-none text-black">
//                   {data.name}
//                 </span>
//                 <span className="text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-[2px] mt-1">
//                   {data.subtext}
//                 </span>
//               </div>
//             </LinkActual>
//           </div>

//           {/* DESKTOP LINKS - Colors updated to Primary */}
//           <ul className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[2px] text-slate-600">
//             {data.links.map((link) => (
//               <li key={link.name}>
//                 <LinkActual 
//                   href={link.href} 
//                   className={`hover:text-primary transition-all hover:tracking-widest border-b-2 pb-1 ${pathname === link.href ? "border-primary text-primary" : "border-transparent"}`}
//                 >
//                   {link.name}
//                 </LinkActual>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER OVERLAY */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMenuOpen(false)}
//               className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1100] lg:hidden"
//             />

//             <motion.div 
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[1200] shadow-2xl flex flex-col lg:hidden"
//             >
//               {/* Drawer Header */}
//               <div className="p-6 border-b flex items-center justify-between bg-slate-50">
//                 <div className="flex items-center gap-2">
//                   {/* Mobile Logo Avatar */}
//                   <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-black rounded-lg text-xs overflow-hidden relative">
//                     <Image src={data.logoAvatar} fill className="object-cover" alt="Logo" />
//                   </div>
//                   <span className="font-black uppercase tracking-widest text-xs text-slate-900">
//                     {data.mobileHeader}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={() => setIsMenuOpen(false)}
//                   className="p-2 hover:bg-slate-200 rounded-full transition-colors"
//                 >
//                   <X size={24} className="text-slate-900" />
//                 </button>
//               </div>

//               {/* Drawer Links - Updated to bg-accent and text-primary */}
//               <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
//                 {data.links.map((link) => (
//                   <LinkActual 
//                     key={link.name} 
//                     href={link.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center justify-between px-4 py-4 font-black uppercase text-sm tracking-widest rounded-xl transition-all ${
//                       pathname === link.href 
//                       ? "bg-accent text-primary" 
//                       : "text-slate-600 hover:bg-slate-50 hover:text-primary"
//                     }`}
//                   >
//                     {link.name}
//                     <ArrowRight size={16} className={pathname === link.href ? "opacity-100" : "opacity-20"} />
//                   </LinkActual>
//                 ))}
//               </div>

//               {/* Drawer Footer */}
//               <div className="p-8 border-t bg-slate-50">
//                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-[3px] mb-4">
//                   {data.mobileFooterLabel}
//                 </p>
//                 <div className="flex gap-6 text-slate-400">
//                   <Facebook size={20} className="hover:text-primary cursor-pointer transition-colors" />
//                   <Twitter size={20} className="hover:text-sky-500 cursor-pointer transition-colors" />
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Menu, Landmark, ChevronRight, ArrowRight, Star 
} from "lucide-react";

interface NavbarProps {
  panchayat: any;
  scrolled: boolean;
  globalAlert: string;
  setIsModalOpen: (val: boolean) => void;
}

export default function Navbar({ panchayat, scrolled, globalAlert, setIsModalOpen }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const name = panchayat?.name || "Gram Panchayat";
  const themeColor = panchayat?.config?.themeColor || "#112F20";

  return (
    <>
      <nav className={`fixed ${scrolled ? 'top-4' : globalAlert ? 'top-10' : 'lg:top-18'} left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[1000] transition-all duration-500`}>
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl px-4 md:px-6 py-3 flex justify-between items-center border border-black/5">
          
          {/* 🍔 MOBILE HAMBURGER (Left) */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-2 text-[#112F20] hover:bg-slate-100 rounded-lg transition-all"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* 🏛️ LOGO AREA */}
          <div className="flex items-center gap-3 flex-1 lg:flex-none justify-center lg:justify-start">
            {panchayat?.config?.avatar && (
              <img src={panchayat.config.avatar} className="h-8 w-8 md:h-10 md:w-10 object-cover rounded-full border-2 border-red-700/20" alt="Avatar" />
            )}
            <div className="leading-none text-left">
              <h1 className="text-xs md:text-sm font-black uppercase tracking-tighter Oswald">{name}</h1>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 tracking-[2px] uppercase">Digital Gram</span>
            </div>
          </div>

          {/* 🖥️ DESKTOP NAV LINKS (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#112F20]">
            {['Home', 'History', 'Geography', 'Economy', 'Gallery', 'News'].map(id => (
              <a key={id} href={`#${id.toLowerCase()}`} className="hover:text-red-700 transition-colors relative group Oswald">
                {id}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* 🔘 CONNECT BUTTON (Desktop Only) */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="hidden lg:flex bg-[#112F20] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-lg hover:bg-red-700 transition-all hover:scale-105 Oswald"
          >
            Connect
          </button>
          
          {/* Mobile placeholder for alignment */}
          <div className="w-10 lg:hidden"></div>
        </div>

        {/* 📱 MOBILE OVERLAY MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-2000 lg:hidden"
              />
              
              {/* Sidebar */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-screen w-[80%] max-w-75 bg-white shadow-2xl z-2001 lg:hidden flex flex-col p-6 text-left"
              >
                <div className="flex items-center justify-between mb-10 gap-3">
                  <button 
                    onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
                    className="flex-1 bg-[#112F20] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-[2px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 Oswald"
                  >
                    Connect <ArrowRight size={14} />
                  </button>
                  
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="p-2.5 bg-slate-100 text-[#112F20] rounded-xl hover:bg-red-700 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col gap-1 overflow-y-auto">
                  {['Home', 'History', 'Geography', 'Economy', 'Gallery', 'News'].map((id, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      key={id}
                      href={`#${id.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-4 px-4 rounded-xl text-sm font-bold uppercase tracking-widest text-[#112F20] hover:bg-slate-50 transition-all flex items-center justify-between group Oswald"
                    >
                      {id}
                      <ChevronRight size={14} className="text-slate-200 group-hover:text-red-700" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
                   <Landmark size={16} className="text-red-700" />
                   <p className="text-[9px] font-black uppercase text-[#112F20] Oswald">{name}</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}