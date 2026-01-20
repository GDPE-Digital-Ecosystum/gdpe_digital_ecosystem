"use client";
import Link from "next/link";
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, 
  MapPin, Clock, PhoneCall, ShieldCheck 
} from "lucide-react";

// Data import
import pageData from "@/app/data.json";

export default function Footer() {
  const data = pageData.footer;
  const navData = pageData.navbar; // Nav links reuse karne ke liye

  if (!data) return null;

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8 px-6 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ">
         
         {/* Column 1: Brand & Social */}
         <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-black rounded-xl shadow-lg text-xl">
                {navData.logoInitial}
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{navData.name}</h3>
                <p className="text-[9px] font-bold text-orange-500 uppercase tracking-[2px] mt-1">{navData.subtext}</p>
              </div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 leading-relaxed text-justify">
              {data.description}
            </p>
            <div className="flex gap-4">
               <Link href={data.socials.facebook} className="p-2.5 bg-white/5 rounded-lg hover:bg-blue-600 transition-all group">
                  <Facebook size={18} className="text-slate-400 group-hover:text-white" />
               </Link>
               <Link href={data.socials.instagram} className="p-2.5 bg-white/5 rounded-lg hover:bg-pink-600 transition-all group">
                  <Instagram size={18} className="text-slate-400 group-hover:text-white" />
               </Link>
               <Link href={data.socials.twitter} className="p-2.5 bg-white/5 rounded-lg hover:bg-sky-500 transition-all group">
                  <Twitter size={18} className="text-slate-400 group-hover:text-white" />
               </Link>
               <Link href={data.socials.youtube} className="p-2.5 bg-white/5 rounded-lg hover:bg-red-600 transition-all group">
                  <Youtube size={18} className="text-slate-400 group-hover:text-white" />
               </Link>
            </div>
         </div>

         {/* Column 2: Official Address */}
         <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 underline underline-offset-8">
              {data.address.title}
            </h4>
            <div className="space-y-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
               <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-orange-500 shrink-0" />
                  <p className="leading-relaxed whitespace-pre-line">
                    {data.address.lines}
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <Mail size={18} className="text-orange-500 shrink-0" />
                  <p className="lowercase hover:text-white transition-colors">{data.address.email}</p>
               </div>
               <div className="flex items-center gap-4">
                  <Clock size={18} className="text-orange-500 shrink-0" />
                  <p>{data.address.timing}</p>
               </div>
            </div>
         </div>

         {/* Column 3: Helplines */}
         <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 underline underline-offset-8">
              {data.helplines.title}
            </h4>
            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
               {data.helplines.items.map((item, idx) => (
                 <div key={idx} className={`p-3 bg-white/5 border-l-4 rounded-lg ${
                   item.type === 'blue' ? 'border-blue-600' : 
                   item.type === 'orange' ? 'border-orange-600' : 'border-green-600'
                 }`}>
                    <p className={`text-[9px] mb-1 ${
                      item.type === 'blue' ? 'text-blue-500' : 
                      item.type === 'orange' ? 'text-orange-500' : 'text-green-500'
                    }`}>{item.label}</p>
                    <p className="text-white flex items-center gap-2 font-black tracking-widest">
                      {item.label !== "Emergency Help" && <PhoneCall size={14}/>} {item.number}
                    </p>
                 </div>
               ))}
            </div>
         </div>

         {/* Column 4: Links */}
         <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 underline underline-offset-8">
              {data.navTitle}
            </h4>
            <ul className="space-y-3 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8">
               {navData.links.map((l) => (
                 <li key={l.name}>
                   <Link href={l.href} className="hover:text-white transition-all flex items-center gap-2">/ {l.name}</Link>
                 </li>
               ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
               {data.badges.map((badge, idx) => (
                 <div key={idx} className="p-2 bg-white/5 rounded border border-white/10 text-[8px] font-black uppercase text-center">
                   {badge}
                 </div>
               ))}
            </div>
         </div>

      </div>
      
      {/* Copyright Bar */}
      {/* <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[5px] text-slate-500">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>{data.copyright}</span>
         </div>
         <div className="flex gap-8">
            {data.bottomLinks.map((link, idx) => (
              <span key={idx} className="hover:text-white cursor-pointer transition-colors tracking-[2px]">{link}</span>
            ))}
         </div>
      </div> */}
    </footer>
  );
}