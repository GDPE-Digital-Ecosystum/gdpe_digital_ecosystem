

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Star, ChevronRight, Landmark, Map, TrendingUp, Quote, X, Send, User, Phone, MessageCircle 
// } from "lucide-react";

// export default function LeaderWebsiteClient({ panchayat, news }: any) {
//   const [scrolled, setScrolled] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
//   const [loading, setLoading] = useState(false);

//   const themeColor = panchayat?.config?.themeColor || "#2d5a27";
//   const name = panchayat?.name || "Gram Panchayat";
//   const leaderName = panchayat?.leader_name || "Gram Pratinidhi";
//   const avatar = panchayat?.config?.avatar || "https://via.placeholder.com/100";
//   const avatarPos = panchayat?.config?.avatarPos || 50;
//   const avatarZoom = panchayat?.config?.avatarZoom || 1;
//   const slug = panchayat?.slug;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSupportSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     const res = await fetch("/api/site/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, slug }) });
//     if (res.ok) { alert("Success!"); setIsModalOpen(false); setFormData({ name: "", phone: "", message: "" }); }
//     setLoading(false);
//   };

//   const infoSections = [
//     { id: "history", title: "Itihas", icon: <Landmark />, text: panchayat.history, sub: "Sadiyon Purani Virasat", img: panchayat.config?.historyImg || "https://images.unsplash.com/photo-1590050752117-23a9d7f66d41" },
//     { id: "geography", title: "Bhugol", icon: <Map />, text: panchayat.geography, sub: "Prakritik Saundarya", img: panchayat.config?.geographyImg || "https://images.unsplash.com/photo-1500382017468-9049fed747ef" },
//     { id: "economy", title: "Economy", icon: <TrendingUp />, text: panchayat.economy, sub: "Arthvyavastha aur Kheti", img: panchayat.config?.economyImg || "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10" }
//   ];

//   return (
//     <main className="bg-[#fcfcfc] font-sans text-slate-900 antialiased overflow-x-hidden">
      
//       {/* 1. NAVBAR */}
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-transparent py-6'}`}>
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full border-2 overflow-hidden shadow-lg" style={{ borderColor: themeColor }}>
//                     <img src={avatar} style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})` }} className="w-full h-full" alt="L" />
//                 </div>
//                 <div>
//                     <h1 className="text-lg font-black uppercase tracking-tighter leading-none" style={{ color: scrolled ? themeColor : '#1e293b' }}>{name}</h1>
//                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{leaderName}</p>
//                 </div>
//             </div>
//             <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
//                 <a href="#history" className="hover:text-blue-600 transition-colors">History</a>
//                 <a href="#geography" className="hover:text-blue-600 transition-colors">Geography</a>
//                 <a href="#economy" className="hover:text-blue-600 transition-colors">Economy</a>
//                 <a href="#news" className="hover:text-blue-600 transition-colors">News</a>
//             </div>
//             <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: themeColor }} className="px-6 py-2 text-white text-[10px] font-black uppercase rounded-full shadow-lg">Support Now</button>
//         </div>
//       </nav>

//       {/* 2. HERO */}
//       <section className="relative min-h-screen flex items-center pt-20 px-6 bg-slate-50">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">
//           <motion.div className="lg:col-span-7" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
//             <div style={{ color: themeColor, borderColor: themeColor }} className="inline-flex items-center gap-2 px-4 py-1 border-2 text-[10px] font-black uppercase tracking-[4px] mb-8 rounded-full bg-white shadow-sm">
//               <Star size={12} fill={themeColor} /> Sankalp 2026
//             </div>
//             <h1 className="text-5xl md:text-[100px] font-black uppercase leading-[0.85] tracking-tighter mb-8 text-slate-900">Digital <br/> <span style={{ color: themeColor }}>Panchayat</span></h1>
//             <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-xl border-l-4 pl-6" style={{ borderColor: themeColor, whiteSpace: 'pre-wrap' }}>{panchayat?.bio || "Pragati ka naya abhiyaan."}</p>
//           </motion.div>
//           <div className="lg:col-span-5 relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-[15px] border-white bg-slate-200">
//              <img src={panchayat.config?.banner || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"} className="object-cover w-full h-full" alt="Hero" />
//           </div>
//         </div>
//       </section>

//       {/* 3. MANIFESTO (IMAGE + VISION) */}
//       <section className="py-32 px-6 bg-white overflow-hidden scroll-mt-28">
//           <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
//               <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl">
//                   <img src={panchayat.config?.manifestoImg || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"} className="object-cover w-full h-full" alt="Vision" />
//               </div>
//               <div>
//                   <h2 className="text-sm font-black uppercase tracking-[10px] mb-6" style={{ color: themeColor }}>Mera Manifesto</h2>
//                   <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-tight">Gaon Ke Vikas Ka <br/> Naya Blueprint</h3>
//                   <div className="p-10 rounded-[3rem] bg-slate-50 border-2 border-dashed relative" style={{ borderColor: themeColor }}>
//                       <Quote className="opacity-20 mb-4" size={40} style={{ color: themeColor }} />
//                       <p className="text-2xl font-medium text-slate-700 italic" style={{ whiteSpace: 'pre-wrap' }}>"{panchayat?.bio}"</p>
//                   </div>
//               </div>
//           </div>
//       </section>

//       {/* 4. INFO SECTIONS */}
//       <section className="py-20 px-6 space-y-40 bg-slate-50">
//         {infoSections.map((sec, i) => (
//           <div key={sec.id} id={sec.id} className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center scroll-mt-28 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
//              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className={i % 2 !== 0 ? 'md:order-2' : ''}>
//                 <div style={{ color: themeColor }} className="mb-6">{sec.icon}</div>
//                 <h2 className="text-sm font-black uppercase tracking-[10px] mb-4 text-slate-400">{sec.title}</h2>
//                 <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic leading-none">{sec.sub}</h3>
//                 <p className="text-xl text-slate-600 leading-relaxed font-medium" style={{ whiteSpace: 'pre-wrap' }}>{sec.text || "Coming soon."}</p>
//              </motion.div>
//              <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
//                 <img src={sec.img} className="object-cover w-full h-full" alt={sec.id} />
//              </div>
//           </div>
//         ))}
//       </section>

//       {/* 5. NEWS */}
//       <section id="news" className="py-24 px-6 bg-slate-900 text-white rounded-[5rem] mx-4 mb-20 scroll-mt-28">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 italic text-center underline" style={{ textDecorationColor: themeColor }}>Live Rajasthan Updates</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {news?.map((item: any) => (
//               <div key={item.id} className="bg-white/5 rounded-[3rem] border border-white/10 p-6 group transition-all">
//                 <img src={item._embedded?.['wp:featuredmedia']?.[0]?.source_url} className="w-full h-48 object-cover rounded-[2rem] mb-6 grayscale group-hover:grayscale-0 transition-all duration-500" alt="N" />
//                 <h4 className="font-bold text-lg mb-4 line-clamp-2 uppercase" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h4>
//                 <a href={item.link} target="_blank" className="text-xs font-black uppercase tracking-widest flex items-center gap-2" style={{ color: themeColor }}>Read Full Story <ChevronRight size={14}/></a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SUPPORT MODAL */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-10">
//                 <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-black uppercase tracking-tight">Support Candidate</h2><button onClick={()=>setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X/></button></div>
//                 <form onSubmit={handleSupportSubmit} className="space-y-5">
//                     <input required type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none font-bold" />
//                     <input required type="tel" placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none font-bold" />
//                     <textarea required placeholder="Message" value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl h-32 focus:border-blue-600 outline-none font-bold" />
//                     <button disabled={loading} type="submit" style={{ backgroundColor: themeColor }} className="w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-3">Submit <Send size={18}/></button>
//                 </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <footer className="py-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-[10px] bg-slate-50">© 2026 {name} Digital Initiative</footer>
//     </main>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, ChevronRight, Landmark, Map, TrendingUp, Quote, X, Send, User, Phone, MessageCircle 
} from "lucide-react";

export default function LeaderWebsiteClient({ panchayat, news }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  // --- Dynamic Styles from Database ---
  const themeColor = panchayat?.config?.themeColor || "#2d5a27";
  const avatar = panchayat?.config?.avatar || "https://via.placeholder.com/150";
  const avatarPos = panchayat?.config?.avatarPos ?? 50; // 👈 Dashboard se aayi position
  const avatarZoom = panchayat?.config?.avatarZoom ?? 1; // 👈 Dashboard se aaya zoom
  
  const name = panchayat?.name || "Gram Panchayat";
  const leaderName = panchayat?.leader_name || "Gram Pratinidhi";
  const slug = panchayat?.slug;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSupportSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/site/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, slug }) });
    if (res.ok) { alert("Success!"); setIsModalOpen(false); setFormData({ name: "", phone: "", message: "" }); }
    setLoading(false);
  };

  const infoSections = [
    { id: "history", title: "Itihas", icon: <Landmark />, text: panchayat.history, sub: "Sadiyon Purani Virasat", img: panchayat.config?.historyImg || "https://images.unsplash.com/photo-1590050752117-23a9d7f66d41" },
    { id: "geography", title: "Bhugol", icon: <Map />, text: panchayat.geography, sub: "Prakritik Saundarya", img: panchayat.config?.geographyImg || "https://images.unsplash.com/photo-1500382017468-9049fed747ef" },
    { id: "economy", title: "Economy", icon: <TrendingUp />, text: panchayat.economy, sub: "Arthvyavastha aur Kheti", img: panchayat.config?.economyImg || "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10" }
  ];

  return (
    <main className="bg-[#fcfcfc] font-sans text-slate-900 antialiased overflow-x-hidden">
      
      {/* 1. NAVBAR (AVATAR FIX) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 overflow-hidden shadow-lg bg-white" style={{ borderColor: themeColor }}>
                    {/* Yahan Styles apply ho rahe hain jo Dashboard se control hote hain */}
                    <img 
                      src={avatar} 
                      style={{ 
                        objectFit: "cover", 
                        objectPosition: `center ${avatarPos}%`, 
                        transform: `scale(${avatarZoom})`,
                        width: '100%',
                        height: '100%'
                      }} 
                      alt="Leader" 
                    />
                </div>
                <div>
                    <h1 className="text-lg font-black uppercase tracking-tighter leading-none" style={{ color: scrolled ? themeColor : '#1e293b' }}>{name}</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{leaderName}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <a href="#history" className="hover:text-blue-600 transition-colors">History</a>
                <a href="#geography" className="hover:text-blue-600 transition-colors">Geography</a>
                <a href="#economy" className="hover:text-blue-600 transition-colors">Economy</a>
                <a href="#news" className="hover:text-blue-600 transition-colors">News</a>
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: themeColor }} className="px-6 py-2 text-white text-[10px] font-black uppercase rounded-full shadow-lg">Support Now</button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div className="lg:col-span-7" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: themeColor, borderColor: themeColor }} className="inline-flex items-center gap-2 px-4 py-1 border-2 text-[10px] font-black uppercase tracking-[4px] mb-8 rounded-full bg-white shadow-sm">
              <Star size={12} fill={themeColor} /> Sankalp 2026
            </div>
            <h1 className="text-5xl md:text-[100px] font-black uppercase leading-[0.85] tracking-tighter mb-8 text-slate-900">Vikas <br/> <span style={{ color: themeColor }}>Abhiyaan</span></h1>
            <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-xl border-l-4 pl-6" style={{ borderColor: themeColor, whiteSpace: 'pre-wrap' }}>{panchayat?.bio || "Pragati ka naya abhiyaan."}</p>
          </motion.div>
          <div className="lg:col-span-5 relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-[15px] border-white bg-slate-200">
             <img src={panchayat.config?.banner || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"} className="object-cover w-full h-full" alt="Hero" />
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO (IMAGE + VISION) */}
      <section className="py-32 px-6 bg-white overflow-hidden scroll-mt-28">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
              <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-100">
                  {/* Manifesto Image Fix */}
                  <img src={panchayat.config?.manifestoImg || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"} className="object-cover w-full h-full" alt="Vision" />
              </div>
              <div>
                  <h2 className="text-sm font-black uppercase tracking-[10px] mb-6" style={{ color: themeColor }}>Mera Manifesto</h2>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-tight italic">Naya Blueprint</h3>
                  <div className="p-10 rounded-[3rem] bg-slate-50 border-2 border-dashed relative" style={{ borderColor: themeColor }}>
                      <Quote className="opacity-20 mb-4" size={40} style={{ color: themeColor }} />
                      <p className="text-2xl font-medium text-slate-700 italic" style={{ whiteSpace: 'pre-wrap' }}>"{panchayat?.bio}"</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. INFO SECTIONS (HISTORY, GEO, ECONOMY) */}
      <section className="py-20 px-6 space-y-40 bg-slate-50">
        {infoSections.map((sec, i) => (
          <div key={sec.id} id={sec.id} className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center scroll-mt-28 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
             <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className={i % 2 !== 0 ? 'md:order-2' : ''}>
                <div style={{ color: themeColor }} className="mb-6">{sec.icon}</div>
                <h2 className="text-sm font-black uppercase tracking-[10px] mb-4 text-slate-400">{sec.title}</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic leading-none">{sec.sub}</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium" style={{ whiteSpace: 'pre-wrap' }}>{sec.text || "Jankari jald hi update ki jayegi."}</p>
             </motion.div>
             <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={sec.img} className="object-cover w-full h-full" alt={sec.id} />
             </div>
          </div>
        ))}
      </section>

      {/* 5. NEWS */}
      <section id="news" className="py-24 px-6 bg-slate-900 text-white rounded-[5rem] mx-4 mb-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 italic underline" style={{ textDecorationColor: themeColor }}>Live Rajasthan News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {news?.map((item: any) => (
              <div key={item.id} className="bg-white/5 rounded-[3rem] border border-white/10 p-6 hover:bg-white/10 transition-all text-left">
                <img src={item._embedded?.['wp:featuredmedia']?.[0]?.source_url} className="w-full h-48 object-cover rounded-[2rem] mb-6  transition-all" alt="news" />
                <h4 className="font-bold text-lg mb-4 line-clamp-2 uppercase" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h4>
                <a href={item.link} target="_blank" className="text-xs font-black uppercase tracking-widest" style={{ color: themeColor }}>Read Full Story →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SUPPORT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-10">
                <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-black uppercase tracking-tight">Support Candidate</h2><button onClick={()=>setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X/></button></div>
                <form onSubmit={handleSupportSubmit} className="space-y-5">
                    <input required type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none font-bold" />
                    <input required type="tel" placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none font-bold" />
                    <textarea required placeholder="Message" value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl h-32 outline-none font-bold" />
                    <button disabled={loading} type="submit" style={{ backgroundColor: themeColor }} className="w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-3">Submit <Send size={18}/></button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-[10px] bg-slate-50">© 2026 Rajgram Digital Portal</footer>
    </main>
  );
}