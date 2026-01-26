"use client";
import Link from "next/link";
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, 
  MapPin, Clock, PhoneCall, ShieldCheck, ChevronRight, Heart, Landmark 
} from "lucide-react";

export default function Footer({ panchayat }: { panchayat: any }) {
  // --- Dynamic Data from Props ---
  const themeColor = panchayat?.config?.themeColor || "#0055a4"; 
  const name = panchayat?.name || "Gram Panchayat";
  const leaderName = panchayat?.leader_name || "Sarpanch Pratinidhi";
  const slug = panchayat?.slug;

  const navLinks = [
    { id: "vision", name: "Vision" },
    { id: "history", name: "History" },
    { id: "geography", name: "Geography" },
    { id: "economy", name: "Economy" },
    { id: "news", name: "News" }
  ];

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Decorative Background Icon */}
      <div className="absolute top-0 right-0 opacity-[0.03] -mr-20 -mt-20 pointer-events-none">
        <Landmark size={400} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10 text-left">
         
         {/* Column 1: Brand & Identity */}
         <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 text-white flex items-center justify-center font-black rounded-xl shadow-lg text-xl italic"
                style={{ backgroundColor: themeColor }}
              >
                {name[0]}
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{name}</h3>
                <p className="text-[9px] font-bold uppercase tracking-[2px] mt-1 opacity-60">Digital Panchayat Hub</p>
              </div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed text-justify">
              Digital Gram Panchayat Mission ke tahat hum {name} ko Rajasthan ki sabse aadhunik aur digital panchayat banane ke liye vachanbaddh hain.
            </p>
            <div className="flex gap-4">
               <Link href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-blue-600 transition-all">
                  <Facebook size={18} className="text-slate-400 hover:text-white" />
               </Link>
               <Link href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-pink-600 transition-all">
                  <Instagram size={18} className="text-slate-400 hover:text-white" />
               </Link>
               <Link href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-sky-500 transition-all">
                  <Twitter size={18} className="text-slate-400 hover:text-white" />
               </Link>
            </div>
         </div>

         {/* Column 2: Quick Navigation */}
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-slate-500 border-b border-white/5 pb-2">
              Vibhag (Sections)
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={`#${link.id}`} 
                    className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 group transition-all"
                  >
                    <ChevronRight size={14} style={{ color: themeColor }} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
         </div>

         {/* Column 3: Official Contact */}
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-slate-500 border-b border-white/5 pb-2">
              Sampark (Contact)
            </h4>
            <div className="space-y-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
               <div className="flex items-start gap-4">
                  <MapPin size={18} style={{ color: themeColor }} className="shrink-0" />
                  <p className="leading-relaxed">
                    Gram Panchayat Karyalay, <br/>
                    Block: {panchayat?.block}, <br/>
                    Dist: {panchayat?.district}
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <Mail size={18} style={{ color: themeColor }} className="shrink-0" />
                  <p className="lowercase hover:text-white transition-colors">{slug}@rajgram.in</p>
               </div>
               <div className="flex items-center gap-4">
                  <PhoneCall size={18} style={{ color: themeColor }} className="shrink-0" />
                  <p className="tracking-widest">+91-XXXXXXXXXX</p>
               </div>
            </div>
         </div>

         {/* Column 4: Campaign Badge */}
         {/* <div className="space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 shadow-2xl relative overflow-hidden group">
               <ShieldCheck 
                className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform" 
                size={100} 
                style={{ color: themeColor }}
               /> 
               <h4 className="text-xl font-black uppercase mb-4 leading-tight italic">Naya <br/> Rajasthan</h4>
               <p className="text-[10px] font-bold uppercase opacity-50 mb-6 leading-relaxed">
                Gaon ki pragati hamara sankalp hai. Hamare mission se judiye.
               </p>
               <button 
                className="w-full py-3 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all"
               >
                Support {leaderName.split(' ')[0]}
               </button>
            </div>
         </div> */}

      </div>

      {/* Bottom Copyright Bar */}
      {/* <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-500 animate-pulse" fill="currentColor" />
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[3px]">
                Developed by RajGram Engine © 2026
            </p>
          </div>
          <div className="flex items-center gap-8 text-[9px] font-black uppercase text-slate-600 tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Digital India</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
      </div> */}
    </footer>
  );
}