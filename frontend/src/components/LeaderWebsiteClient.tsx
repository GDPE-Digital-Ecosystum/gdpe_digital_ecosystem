"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Landmark, Map, TrendingUp, Quote, X, Send, 
  User, Phone, MessageCircle, Menu, UserCheck, ChevronRight, 
  Calendar, Heart, Camera, Video, Play, ShieldAlert, XCircle, Image as LucideImage 
} from "lucide-react";
import Footer from "./footer";

export default function LeaderWebsiteClient({ panchayat, news }: any) {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  // --- 1. Dynamic Data Mapping ---
  const themeColor = panchayat?.config?.themeColor || "#0055a4"; 
  const avatar = panchayat?.config?.avatar || "https://via.placeholder.com/150";
  const avatarPos = panchayat?.config?.avatarPos ?? 50;
  const avatarZoom = panchayat?.config?.avatarZoom ?? 1;
  const name = panchayat?.name || "Gram Panchayat";
  const leaderName = panchayat?.leader_name || "Sarpanch Pratinidhi";
  const bio = panchayat?.bio || "Gaon ki unnati hamari prathamikta hai. Swasthya, shiksha aur swarozgar ke saath hum ek behtar kal bana rahe hain.";
  const slug = panchayat?.slug;
  const gallery = panchayat?.config?.gallery || [];
  const videos = panchayat?.config?.videos || [];
  const globalAlert = panchayat?.global_alert || "";

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // --- 2. Logic Helpers ---
  const getYT = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleSupportSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch("/api/site/support", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, slug }),
        });
        if (res.ok) {
            alert("Sandesh bhej diya gaya hai. Dhanyawad!");
            setIsModalOpen(false);
            setFormData({ name: "", phone: "", message: "" });
        }
    } catch (err) { alert("Error."); }
    setLoading(false);
  };

  const infoSections = [
    { id: "history", title: "History", icon: <Landmark size={20}/>, text: panchayat.history, img: panchayat.config?.historyImg, sub: "Virasat" },
    { id: "geography", title: "Geography", icon: <Map size={20}/>, text: panchayat.geography, img: panchayat.config?.geographyImg, sub: "Bhugol" },
    { id: "economy", title: "Economy", icon: <TrendingUp size={20}/>, text: panchayat.economy, img: panchayat.config?.economyImg, sub: "Vikas" }
  ];

  // ✅ 1. SUSPENDED STATE CHECK (SABSE PEHLE)
// Is file mein return se theek pehle (line ~70) ye logic dalo:
if (panchayat?.status === "suspended") {
  return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border-2 border-red-500/30 p-12 rounded-[3rem] shadow-2xl shadow-red-900/20">
              <XCircle size={60} className="text-red-500 mx-auto mb-8" />
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Website Suspended</h1>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed mb-10">
                 Suraaksha aur prashasanik kaarano se is Gram Panchayat ki digital sevaayein temporary rok di gayi hain.
                 <br/> <span className="text-red-400 mt-2 block font-black underline italic">Sampark: Admin Office</span>
              </p>
              <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase text-slate-600 tracking-[5px]">RAJGRAM SECURITY HUB</div>
          </div>
      </div>
  );
}

  if (!isMounted) return null;

  return (
    <main className="bg-white font-sans text-slate-900 antialiased scroll-smooth overflow-x-hidden">
      
      {/* 🟢 GLOBAL ALERT TICKER */}
      {globalAlert && (
          <div className="bg-red-600 text-white py-2 overflow-hidden sticky top-0 z-[1000] shadow-lg">
              <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-[10px] tracking-[4px]">
                  {[1,2,3,4,5,6,7,8].map(i => <span key={i} className="mx-10 flex items-center gap-2"><ShieldAlert size={14}/> {globalAlert}</span>)}
              </div>
          </div>
      )}

      {/* 2. NAVBAR (SPACING FIX) */}
      <nav className={`fixed ${!scrolled && globalAlert ? 'top-8' : 'top-0'} w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-4 border-b'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-1 text-slate-900 shrink-0"><Menu size={26} /></button>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 overflow-hidden bg-slate-100 shrink-0" style={{ borderColor: themeColor }}>
                    <img 
                        src={avatar} 
                        style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})`, transformOrigin: 'center', width: '100%', height: '100%' }} 
                        alt="L" 
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[10px] sm:text-base font-black text-slate-900 leading-none uppercase tracking-tighter truncate max-w-[100px] sm:max-w-full">{name}</h1>
                    <p className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 leading-none">{leaderName}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
                {['vision', 'history', 'geography', 'economy', 'news'].map(id => <a key={id} href={`#${id}`} className="hover:text-blue-600 transition-all">{id}</a>)}
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: themeColor }} className="px-4 py-2 sm:px-6 sm:py-2.5 text-white text-[9px] sm:text-[10px] font-black uppercase rounded-full shadow-lg shrink-0 hover:scale-105 transition-all">Support</button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[120] shadow-2xl flex flex-col lg:hidden">
              <div className="p-6 border-b flex justify-between items-center"><span className="font-black text-blue-600 text-xs uppercase">Navigation</span><button onClick={()=>setIsMenuOpen(false)}><X size={24}/></button></div>
              <div className="flex-1 py-8 px-8 flex flex-col gap-2 overflow-y-auto">
                 {['vision', 'history', 'geography', 'economy', 'news'].map(id => (<a key={id} href={`#${id}`} onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase border-b border-slate-50 py-5 text-slate-700 hover:text-blue-600">{id}</a>))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION */}
      <section id="vision" className="relative pt-32 pb-16 px-4 bg-slate-50 overflow-hidden sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:text-left">
            <div style={{ color: themeColor }} className="inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-[4px] mb-6"><Star size={16} fill={themeColor}/> MISSION 2026</div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 uppercase tracking-tighter">Sashakt Gram, <br/> <span style={{ color: themeColor }}>Naya Sankalp.</span></h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 border-l-4 pl-6 italic max-w-xl mx-auto lg:mx-0 break-words" style={{ borderColor: themeColor }}>
                Aapka Swagat Hai! {name} ke sarvangeen vikas ke liye hum vachanbaddh hain. Hamari panchayat ab digital kranti ke saath pragati ke naye kshitij ko chu rahi hai.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: themeColor }} className="px-10 py-4 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 transition-all">Connect Now</button>
               <a href="#news" className="px-10 py-4 border-2 border-slate-200 font-black text-[10px] uppercase tracking-widest rounded-xl text-slate-700">Latest Feed</a>
            </div>
          </motion.div>
          {panchayat.config?.banner && (
            <img src={panchayat.config.banner} className="w-full h-[280px] sm:h-[450px] lg:h-[550px] object-cover rounded-[3rem] shadow-2xl" alt="Banner" />
          )}
        </div>
      </section>

      {/* 4. MANIFESTO */}
      <section className="py-20 px-4 bg-slate-900 text-white rounded-[3rem] sm:rounded-[4rem] mx-2 sm:mx-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center text-center lg:text-left">
              {panchayat.config?.manifestoImg && (
                <img src={panchayat.config.manifestoImg} className="w-full h-[300px] sm:h-[500px] object-cover rounded-[3rem] shadow-2xl shadow-black/50" alt="Vision" />
              )}
              <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[10px] text-blue-400 mb-6">Mera Manifesto</h2>
                  <h3 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-10 leading-tight italic text-slate-100">Blueprint For Vikas</h3>
                  <div className="relative p-10 bg-white/5 border-l-8 rounded-r-3xl shadow-xl" style={{ borderColor: themeColor }}>
                      <Quote className="opacity-20 mb-6 mx-auto lg:mx-0" size={40} style={{ color: themeColor }} />
                      <p className="text-xl sm:text-2xl font-medium text-slate-200 leading-relaxed italic break-words" style={{ whiteSpace: 'pre-wrap' }}>"{bio}"</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. INFORMATION SECTIONS */}
      <div className="space-y-4">
        {infoSections.map((sec, i) => (
            <section key={sec.id} id={sec.id} className={`py-16 sm:py-24 px-4 scroll-mt-24 ${i % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0" style={{ backgroundColor: themeColor }}>{sec.icon}</div>
                        <h2 className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">{sec.title}</h2>
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic leading-none">{sec.sub}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed border-l-4 pl-8 mx-auto lg:mx-0 break-words font-medium" style={{ borderColor: themeColor, whiteSpace: 'pre-wrap' }}>{sec.text || "Jankari jald hi update ki jayegi."}</p>
                </div>
                {sec.img && (
                    <img src={sec.img} className="w-full h-[300px] sm:h-[450px] object-cover rounded-[3rem] shadow-xl" alt={sec.id} />
                )}
            </div>
            </section>
        ))}
      </div>

      {/* 6. VIDEO HUB (EVEN GRID) */}
      {videos.length > 0 && (
        <section id="videos" className="py-24 px-4 bg-slate-950 text-white rounded-[5rem] mx-4 mb-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black uppercase mb-16 text-center italic tracking-tighter text-white/90">Live Video Feed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {videos.map((url: string, i: number) => {
                    const vidId = getYT(url);
                    if (!vidId) return null;
                    return (
                        <div key={i} className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} allowFullScreen></iframe>
                        </div>
                    );
                })}
            </div>
          </div>
        </section>
      )}

      {/* 7. GALLERY (EVEN GRID) */}
      <section id="gallery" className="py-24 px-4 bg-slate-50 scroll-mt-24 border-t text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 uppercase mb-16 tracking-tighter italic">Vikas Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((img: string, i: number) => (
              img ? (
                <motion.div whileHover={{y:-10}} key={i} className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl bg-slate-200">
                  <img src={img} className="w-full h-full object-cover" alt="Work" />
                </motion.div>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWS SECTION (WP-API IMAGE FIX) */}
      <section id="news" className="py-24 px-4 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black text-slate-900 uppercase mb-16 underline decoration-8 decoration-blue-50 underline-offset-8" style={{ textDecorationColor: `${themeColor}20` }}>Rajasthan News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {news?.map((item: any) => (
              <div key={item.id} className="bg-slate-50 rounded-[3rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all text-left group">
                <div className="relative h-52 overflow-hidden rounded-[2rem] mb-6 bg-slate-200">
                    <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="N" />
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase mb-4 tracking-widest"><Calendar size={14} style={{ color: themeColor }}/> {formatDate(item.date)}</div>
                <h4 className="font-bold text-lg mb-8 line-clamp-2 uppercase text-slate-900 leading-tight" dangerouslySetInnerHTML={{ __html: item.title }}></h4>
                <a href={item.link} target="_blank" className="text-[10px] font-black uppercase tracking-[3px] flex items-center justify-center gap-2 py-4 px-8 border-2 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">Full Story</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SUPPORT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 overflow-hidden">
                <div className="flex justify-between items-center mb-8 border-b pb-4 font-black uppercase italic tracking-tighter">Support Candidate <button onClick={()=>setIsModalOpen(false)}><X/></button></div>
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                    <input required type="text" placeholder="Naam" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-5 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-900" />
                    <input required type="tel" placeholder="Mobile" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full p-5 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-900" />
                    <textarea required placeholder="Sandesh..." value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} className="w-full p-5 border-2 border-slate-100 rounded-2xl h-32 font-bold resize-none text-slate-900" />
                    <button disabled={loading} type="submit" style={{ backgroundColor: themeColor }} className="w-full py-6 text-white font-black uppercase rounded-2xl shadow-xl shadow-black/20">Submit Samarthan</button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. PREMIUM INFORMATIVE FOOTER */}
      <Footer panchayat={panchayat} />

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; animation: marquee 25s linear infinite; }
      `}</style>
    </main>
  );
}