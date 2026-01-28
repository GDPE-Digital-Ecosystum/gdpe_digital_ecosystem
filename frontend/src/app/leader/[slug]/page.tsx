// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { signOut } from "next-auth/react";
// import { useParams } from "next/navigation";
// import { 
//   Palette, FileText, Send, Sparkles, Globe, ImageIcon, Users, Landmark, 
//   Map, TrendingUp, Camera, Video, Loader2, UploadCloud, LogOut, Menu, X, Settings
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function LeaderDashboard() {
//     const params = useParams();
//     const slug = params?.slug as string;

//     // --- UI States ---
//     const [activeTab, setActiveTab] = useState("analytics"); 
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);
//     const [uploading, setUploading] = useState<string | null>(null);

//     // --- Data States ---
//     const [views, setViews] = useState(0); 
//     const [leaderName, setLeaderName] = useState("");
//     const [avatar, setAvatar] = useState("");
//     const [avatarPos, setAvatarPos] = useState(50);
//     const [avatarZoom, setAvatarZoom] = useState(1);
//     const [color, setColor] = useState("#0055a4");
//     const [banner, setBanner] = useState("");
//     const [bio, setBio] = useState("");
//     const [manifestoImg, setManifestoImg] = useState("");
//     const [history, setHistory] = useState("");
//     const [historyImg, setHistoryImg] = useState("");
//     const [geography, setGeography] = useState("");
//     const [geoImg, setGeoImg] = useState("");
//     const [economy, setEconomy] = useState("");
//     const [ecoImg, setEcoImg] = useState("");
//     const [gallery, setGallery] = useState<string[]>(["", "", "", "", "", ""]);
//     const [videos, setVideos] = useState<string[]>(["", "", "", ""]);
//     const [voters, setVoters] = useState([]);

//     const CLOUD_NAME = "dmybowj5w"; 
//     const UPLOAD_PRESET = "rajgram_preset";

//     const loadData = useCallback(async () => {
//         if (!slug) return;
//         try {
//             const analyticsRes = await fetch(`/api/analytics/${slug}`, { cache: 'no-store' }).then(r => r.json());
//             setViews(analyticsRes.views ?? 0);
//             const res = await fetch(`/api/site/${slug}`);
//             const d = await res.json();
//             if (d) {
//                 setLeaderName(d.leader_name || ""); setAvatar(d.config?.avatar || "");
//                 setAvatarPos(d.config?.avatarPos ?? 50); setAvatarZoom(d.config?.avatarZoom ?? 1);
//                 setColor(d.config?.themeColor || "#0055a4"); setBio(d.bio || "");
//                 setManifestoImg(d.config?.manifestoImg || ""); setBanner(d.config?.banner || "");
//                 setHistory(d.history || ""); setHistoryImg(d.config?.historyImg || "");
//                 setGeography(d.geography || ""); setGeoImg(d.config?.geographyImg || "");
//                 setEconomy(d.economy || ""); setEcoImg(d.config?.economyImg || "");
//                 if (d.config?.gallery) setGallery([...d.config.gallery, ...Array(6).fill("")].slice(0, 6));
//                 if (d.config?.videos) setVideos([...d.config.videos, ...Array(4).fill("")].slice(0, 4));
//             }
//             const v = await fetch(`/api/site/support?slug=${slug}`).then(r => r.json());
//             if (Array.isArray(v)) setVoters(v);
//         } catch(e) { console.error(e); }
//         finally { setFetching(false); }
//     }, [slug]);

//     useEffect(() => { loadData(); }, [loadData]);

//     const uploadImg = async (file: File, setter: any, type: string) => {
//         setUploading(type);
//         const fd = new FormData(); fd.append("file", file); fd.append("upload_preset", UPLOAD_PRESET);
//         try {
//             const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
//             const d = await res.json(); setter(d.secure_url); alert("Photo Uploaded!");
//         } catch (err) { alert("Upload fail!"); }
//         setUploading(null);
//     };

//     const save = async () => {
//         setLoading(true);
//         try {
//             await fetch("/api/leader/update", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ 
//                     slug, leader_name: leaderName, bio, banner, themeColor: color, history, geography, economy, historyImg, geographyImg: geoImg, economyImg: ecoImg, avatar, avatarPos, avatarZoom, manifestoImg,
//                     gallery: gallery.filter(u => u !== ""), videos: videos.filter(v => v !== "")
//                 })
//             });
//             alert("🎉 Saved Live!");
//         } catch (e) { alert("Error!"); }
//         setLoading(false);
//     };

//     const renderEditor = (label: string, text: string, setText: any, img: string, setImg: any, type: string) => (
//         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 w-full max-w-4xl">
//             <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border">
//                 <h3 className="text-lg font-black uppercase mb-4 flex gap-3 text-slate-800"><ImageIcon className="text-blue-600"/> {label} Photo</h3>
//                 <div className="flex flex-col sm:flex-row gap-6">
//                     <label className="flex-1 border-2 border-dashed rounded-2xl p-8 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
//                         {uploading === type ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
//                         <span className="text-[10px] font-black uppercase text-slate-500">Upload Image</span>
//                         <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setImg, type)} />
//                     </label>
//                     {img && <img src={img} className="h-40 w-full sm:w-64 object-cover rounded-2xl border shadow-md" />}
//                 </div>
//             </div>
//             <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border text-slate-800">
//                 <h3 className="text-lg font-black mb-6 uppercase italic tracking-tighter underline decoration-blue-100 underline-offset-8">{label} Content</h3>
//                 <textarea value={text} onChange={(e)=>setText(e.target.value.substring(0, 800))} className="w-full p-6 border-2 border-slate-50 rounded-2xl h-48 md:h-64 text-base bg-slate-50/30 outline-none focus:border-blue-600" />
//             </div>
//         </motion.div>
//     );

//     if (fetching) return <div className="h-screen flex items-center justify-center font-black text-blue-600 animate-pulse tracking-[10px]">RAJGRAM SYSTEM LOADING...</div>;

//     return (
//         <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans overflow-x-hidden">
            
//             {/* --- 📱 MOBILE TOP NAV (Visible only on Mobile) --- */}
//             <div className="md:hidden bg-[#0f172a] text-white p-4 flex justify-between items-center sticky top-0 z-[100] shadow-2xl">
//                 <h2 className="text-xl font-black text-blue-500 italic uppercase tracking-tighter">RAJGRAM</h2>
//                 <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-800 rounded-xl">
//                     <Menu size={24} />
//                 </button>
//             </div>

//             {/* --- 📁 SIDEBAR (PERSISTENT ON TABLET/LAPTOP, DRAWER ON MOBILE) --- */}
//             <AnimatePresence>
//                 {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
//                     <>
//                         {/* Mobile Backdrop */}
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] md:hidden" />
                        
//                         <motion.div 
//                             initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { x: "-100%" } : {}}
//                             animate={{ x: 0 }}
//                             exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { x: "-100%" } : {}}
//                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                             className="fixed md:sticky top-0 left-0 bottom-0 w-72 md:w-80 bg-[#0f172a] text-white p-6 md:p-8 flex flex-col z-[120] md:z-0 shadow-2xl h-screen overflow-y-auto"
//                         >
//                             <div className="flex justify-between items-center mb-10">
//                                 <h2 className="text-2xl font-black text-blue-500 italic uppercase tracking-tighter">RAJGRAM</h2>
//                                 <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400"><X size={24}/></button>
//                             </div>

//                             <nav className="flex-1 space-y-1">
//                                 {[
//                                     {id:'analytics', label:'Overview', icon:<TrendingUp size={16}/>},
//                                     {id:'branding', label:'Identity', icon:<Palette size={16}/>},
//                                     {id:'manifesto', label:'Manifesto', icon:<Sparkles size={16}/>},
//                                     {id:'history', label:'History', icon:<Landmark size={16}/>},
//                                     {id:'geography', label:'Geography', icon:<Map size={16}/>},
//                                     {id:'economy', label:'Economy', icon:<TrendingUp size={16}/>},
//                                     {id:'gallery', label:'Gallery', icon:<Camera size={16}/>},
//                                     {id:'videos', label:'Videos', icon:<Video size={16}/>},
//                                     {id:'voters', label:'Supporters', icon:<Users size={16}/>}
//                                 ].map(t => (
//                                     <button key={t.id} onClick={()=>{setActiveTab(t.id); setIsSidebarOpen(false);}} className={`w-full text-left p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab===t.id?'bg-blue-600 shadow-lg shadow-blue-500/20':'hover:bg-slate-800 text-slate-400'}`}>
//                                         <div className="flex items-center gap-3">{t.icon} {t.label}</div>
//                                     </button>
//                                 ))}
//                             </nav>

//                             <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
//                                 <button onClick={save} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-black uppercase text-[10px] shadow-lg transition-all active:scale-95">{loading?"SAVING...":"SAVE CHANGES"}</button>
//                                 <button onClick={() => signOut({callbackUrl: '/login'})} className="w-full p-4 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"><LogOut size={16}/> Logout</button>
//                                 <a href={`/site/${slug}`} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 rounded-xl font-black uppercase text-[10px] hover:bg-slate-700 transition-all">View Site <Globe size={14}/></a>
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* --- 🖥️ MAIN CONTENT AREA --- */}
//             <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full">
//                 <AnimatePresence mode="wait">

//                     {/* OVERVIEW TAB */}
//                     {activeTab === 'analytics' && (
//                         <motion.div key="analytics" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-8">
//                             <div className="bg-blue-600 p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group gap-8">
//                                 <div className="absolute -right-4 -bottom-4 opacity-10 hidden md:block"><TrendingUp size={250}/></div>
//                                 <div className="relative z-10 text-center md:text-left">
//                                     <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Live <br/> Analytics</h3>
//                                     <p className="text-[10px] font-bold uppercase tracking-widest mt-4 opacity-70 italic">Digital Rajasthan Election Monitoring</p>
//                                 </div>
//                                 <div className="relative z-10 flex items-center gap-6 bg-black/20 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/10 w-full md:w-auto justify-center">
//                                     <Users size={40} className="text-blue-200" />
//                                     <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">{views}</h2>
//                                 </div>
//                             </div>
//                             <div className="bg-white p-10 md:p-12 rounded-[3rem] md:rounded-[4rem] border shadow-xl text-center">
//                                 <Sparkles className="mx-auto text-blue-600 mb-6 animate-pulse" size={48} />
//                                 <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-800">Your Portal is Live</h3>
//                                 <p className="text-slate-500 mt-4 max-w-lg mx-auto text-sm font-medium leading-relaxed">Update your branding and manifesto to engage more voters.</p>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* BRANDING TAB */}
//                     {activeTab === 'branding' && (
//                         <motion.div key="branding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl w-full">
//                             <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border">
//                                 <h3 className="text-lg md:text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4 text-slate-800">Identity</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                                     <div className="space-y-6">
//                                         <input type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-xl font-bold bg-slate-50 text-slate-900 focus:border-blue-600 outline-none transition-all" placeholder="Full Name" />
//                                         <label className="border-2 border-dashed rounded-[2rem] p-8 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition-all text-center">
//                                             {uploading==='avatar'? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
//                                             <span className="text-[10px] font-black uppercase text-slate-500">Upload Photo</span>
//                                             <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setAvatar, 'avatar')} />
//                                         </label>
//                                         <div className="flex items-center gap-6 pt-4"><input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer shadow-lg"/><code className="text-lg font-black text-blue-600 uppercase">{color}</code></div>
//                                     </div>
//                                     <div className="flex flex-col items-center bg-slate-50 p-6 rounded-[2.5rem] border shadow-inner">
//                                         <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 relative">
//                                             <img src={avatar || "https://via.placeholder.com/150"} style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})` }} className="w-full h-full" alt="L" />
//                                         </div>
//                                         <div className="w-full space-y-4 px-4">
//                                             <input type="range" min="0" max="100" value={avatarPos} onChange={(e)=>setAvatarPos(parseInt(e.target.value))} className="w-full accent-blue-600" />
//                                             <input type="range" min="1" max="3" step="0.1" value={avatarZoom} onChange={(e)=>setAvatarZoom(parseFloat(e.target.value))} className="w-full accent-green-600" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border">
//                                 <h3 className="text-lg font-black uppercase mb-6 flex gap-3 text-slate-800"><ImageIcon/> Main Hero Image</h3>
//                                 <label className="border-2 border-dashed rounded-[2.5rem] p-12 md:p-20 cursor-pointer flex flex-col items-center mb-6 hover:bg-slate-50 transition-all text-center">
//                                     {uploading === 'banner' ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600"/>}
//                                     <span className="text-[10px] font-black mt-2 text-slate-500 uppercase tracking-widest">Select Banner Photo</span>
//                                     <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setBanner, 'banner')} />
//                                 </label>
//                                 {banner && <img src={banner} className="h-48 md:h-64 w-full object-cover rounded-3xl border shadow-lg" alt="B" />}
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* MANIFESTO, HISTORY, GEOGRAPHY, ECONOMY */}
//                     {activeTab === 'manifesto' && renderEditor("Manifesto", bio, setBio, manifestoImg, setManifestoImg, "mani")}
//                     {activeTab === 'history' && renderEditor("History", history, setHistory, historyImg, setHistoryImg, "hist")}
//                     {activeTab === 'geography' && renderEditor("Geography", geography, setGeography, geoImg, setGeoImg, "geo")}
//                     {activeTab === 'economy' && renderEditor("Economy", economy, setEconomy, ecoImg, setEcoImg, "eco")}

//                     {/* GALLERY TAB */}
//                     {activeTab === 'gallery' && (
//                         <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border max-w-4xl w-full text-slate-800">
//                             <h3 className="text-lg md:text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4 italic">Vikas Gallery</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
//                                 {gallery.map((url, i) => (
//                                     <div key={i} className="space-y-4">
//                                         <label className="border-2 border-dashed rounded-2xl p-6 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-all">
//                                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Photo #{i+1}</span>
//                                             {uploading===`gal-${i}` ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud size={18} className="text-blue-600"/>}
//                                             <input type="file" className="hidden" onChange={(e) => { if(e.target.files) { uploadImg(e.target.files[0], (link:string)=>{const n=[...gallery];n[i]=link;setGallery(n);}, `gal-${i}`); } }} />
//                                         </label>
//                                         {url && <img src={url} className="h-40 md:h-48 w-full object-cover rounded-2xl border shadow-xl transition-transform hover:scale-[1.02]" alt="G" />}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* VIDEOS TAB */}
//                     {activeTab === 'videos' && (
//                         <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border max-w-2xl w-full text-slate-800 text-center">
//                             <h3 className="text-xl md:text-2xl font-black uppercase mb-10 flex gap-3 justify-center italic tracking-tighter"><Video className="text-red-600" size={32}/> Youtube Election Feed</h3>
//                             <div className="space-y-6 text-left">
//                                 {videos.map((url, i) => (
//                                     <div key={i}>
//                                         <label className="text-[9px] font-black uppercase text-slate-400 mb-2 ml-2 block italic tracking-widest">Video URL #{i+1}</label>
//                                         <input type="text" value={url} onChange={(e)=>{const n=[...videos];n[i]=e.target.value;setVideos(n);}} className="w-full p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs focus:border-red-600 outline-none shadow-inner" placeholder="Paste link..." />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
                    
//                     {/* SUPPORTERS TAB */}
//                     {activeTab === 'voters' && (
//                         <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border overflow-hidden max-w-5xl w-full">
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-left border-collapse min-w-[700px]">
//                                     <thead className="bg-slate-50 border-b"><tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic"><th className="p-8">Supporter</th><th className="p-8">Contact</th><th className="p-8">Message</th><th className="p-8 text-right">Date</th></tr></thead>
//                                     <tbody className="divide-y divide-slate-100 font-bold">
//                                         {voters.map((v: any, i) => (
//                                             <tr key={i} className="hover:bg-blue-50 transition-all group text-slate-700">
//                                                 <td className="p-8 flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">{v.name[0]}</div>{v.name}</td>
//                                                 <td className="p-8 font-mono text-blue-600 font-black">{v.phone}</td>
//                                                 <td className="p-8 text-slate-500 italic text-sm font-medium line-clamp-1 max-w-[200px]">"{v.message}"</td>
//                                                 <td className="p-8 text-[9px] text-slate-400 uppercase text-right">{new Date(v.date).toDateString()}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             {voters.length === 0 && <p className="p-24 text-center text-slate-400 font-black uppercase tracking-[10px] italic">No supporters found yet.</p>}
//                         </div>
//                     )}

//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { 
  Palette, FileText, Send, Sparkles, Globe, ImageIcon, Users, Landmark, 
  Map, TrendingUp, Camera, Video, Loader2, UploadCloud, LogOut, Menu, X, ChevronRight, LayoutDashboard, Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeaderDashboard() {
    const params = useParams();
    const slug = params?.slug as string;

    // --- UI States ---
    const [activeTab, setActiveTab] = useState("analytics"); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Menu
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);

    // --- Leader Data States ---
    const [leaderName, setLeaderName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPos, setAvatarPos] = useState(50);
    const [avatarZoom, setAvatarZoom] = useState(1);
    const [color, setColor] = useState("#0055a4");
    const [banner, setBanner] = useState("");
    const [bio, setBio] = useState("");
    const [manifestoImg, setManifestoImg] = useState("");
    const [history, setHistory] = useState("");
    const [historyImg, setHistoryImg] = useState("");
    const [geography, setGeography] = useState("");
    const [geoImg, setGeoImg] = useState("");
    const [economy, setEconomy] = useState("");
    const [ecoImg, setEcoImg] = useState("");
    const [gallery, setGallery] = useState<string[]>(["", "", "", "", "", ""]);
    const [videos, setVideos] = useState<string[]>(["", "", "", ""]);
    const [views, setViews] = useState(0); 
    const [voters, setVoters] = useState<any[]>([]);

    // ✅ CLOUDINARY CONFIG
    const CLOUD_NAME = "dmybowj5w"; 
    const UPLOAD_PRESET = "rajgram_preset";

    const templates = {
        vikas: "मेरा संकल्प: आपकी ग्राम पंचायत को राजस्थान की सबसे आधुनिक और डिजिटल पंचायत बनाना। शिक्षा, स्वास्थ्य और पारदर्शिता ही हमारे विकास का आधार होगी।",
        professional: "Vision 2026: Strategizing smart governance and 100% digital literacy for our Gram Panchayat.",
        emotional: "राम-राम सा! मैं आपका बेटा, आपका भाई बनकर सेवा करूँगा। आपका एक वोट गाँव की तस्वीर बदल देगा।"
    };

    const uploadImg = async (file: File, setter: any, type: string) => {
        setUploading(type);
        const fd = new FormData(); fd.append("file", file); fd.append("upload_preset", UPLOAD_PRESET);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
            const d = await res.json(); 
            if(d.secure_url) { setter(d.secure_url); alert("Photo Uploaded!"); }
        } catch (err) { alert("Upload fail!"); }
        setUploading(null);
    };

    const loadData = useCallback(async () => {
        if (!slug) return;
        try {
            const res = await fetch(`/api/site/${slug}`);
            const d = await res.json();
            if (d) {
                setLeaderName(d.leader_name || ""); setAvatar(d.config?.avatar || "");
                setAvatarPos(d.config?.avatarPos ?? 50); setAvatarZoom(d.config?.avatarZoom ?? 1);
                setColor(d.config?.themeColor || "#0055a4"); setBio(d.bio || "");
                setManifestoImg(d.config?.manifestoImg || ""); setBanner(d.config?.banner || "");
                setHistory(d.history || ""); setHistoryImg(d.config?.historyImg || "");
                setGeography(d.geography || ""); setGeoImg(d.config?.geographyImg || "");
                setEconomy(d.economy || ""); setEcoImg(d.config?.economyImg || "");
                setViews(d.views || 0);
                if (d.config?.gallery) setGallery([...d.config.gallery, ...Array(6).fill("")].slice(0, 6));
                if (d.config?.videos) setVideos([...d.config.videos, ...Array(4).fill("")].slice(0, 4));
            }
            const vRes = await fetch(`/api/site/support?slug=${slug}`);
            const vData = await vRes.json();
            if (Array.isArray(vData)) setVoters(vData);
        } catch(e) { console.error("Error loading", e); }
        finally { setFetching(false); }
    }, [slug]);

    useEffect(() => { loadData(); }, [loadData]);

    const save = async () => {
        setLoading(true);
        try {
            await fetch("/api/leader/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    slug, leader_name: leaderName, bio, banner, themeColor: color, history, geography, economy, historyImg, geographyImg: geoImg, economyImg: ecoImg, avatar, avatarPos, avatarZoom, manifestoImg,
                    gallery: gallery.filter(u => u !== ""), videos: videos.filter(v => v !== "")
                })
            });
            alert("🎉 Website Updated Successfully!");
        } catch (e) { alert("Error!"); }
        setLoading(false);
    };

    const renderEditor = (label: string, text: string, setText: any, img: string, setImg: any, type: string) => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 w-full max-w-4xl">
            <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border">
                <h3 className="text-lg md:text-xl font-black uppercase mb-4 flex gap-3 text-slate-800"><ImageIcon className="text-blue-600"/> {label} Photo</h3>
                <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex-1 border-2 border-dashed rounded-[2rem] p-10 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
                        {uploading === type ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
                        <span className="text-[10px] font-black uppercase text-slate-500">Upload Image</span>
                        <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setImg, type)} />
                    </label>
                    {img && <img src={img} className="h-40 md:h-48 w-full md:w-64 object-cover rounded-3xl border shadow-lg" alt="preview" />}
                </div>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border text-slate-800">
                <h3 className="text-lg md:text-xl font-black mb-6 uppercase italic tracking-tighter underline decoration-blue-100 underline-offset-8">{label} Content</h3>
                <textarea value={text} onChange={(e)=>setText(e.target.value.substring(0, 800))} className="w-full p-6 border-2 border-slate-50 rounded-2xl h-48 md:h-64 text-base bg-slate-50/30 outline-none focus:border-blue-600" />
            </div>
        </motion.div>
    );

    if (fetching) return <div className="h-screen flex items-center justify-center font-black text-blue-600 animate-pulse">RAJGRAM SYSTEM...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans overflow-x-hidden">
            
            {/* --- 📱 MOBILE TOP NAV --- */}
            <div className="md:hidden bg-[#0f172a] text-white p-4 flex justify-between items-center sticky top-0 z-[100] shadow-2xl">
                <h2 className="text-xl font-black text-blue-500 italic">RAJGRAM</h2>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-800 rounded-xl"><Menu size={24} /></button>
            </div>

            {/* --- 📁 SIDEBAR --- */}
            <AnimatePresence>
                {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] md:hidden" />
                        <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="fixed md:sticky top-0 left-0 bottom-0 w-72 md:w-80 bg-[#0f172a] text-white p-8 flex flex-col z-[120] md:z-0 shadow-2xl h-screen overflow-y-auto">
                            <h2 className="text-3xl font-black text-blue-500 italic uppercase mb-12 hidden md:block">RAJGRAM</h2>
                            <nav className="flex-1 space-y-1">
                                {[
                                    {id:'analytics', label:'Overview', icon:<TrendingUp size={16}/>},
                                    {id:'branding', label:'Identity', icon:<Palette size={16}/>},
                                    {id:'manifesto', label:'Manifesto', icon:<Sparkles size={16}/>},
                                    {id:'history', label:'History', icon:<Landmark size={16}/>},
                                    {id:'geography', label:'Geography', icon:<Map size={16}/>},
                                    {id:'economy', label:'Economy', icon:<TrendingUp size={16}/>},
                                    {id:'gallery', label:'Gallery', icon:<Camera size={16}/>},
                                    {id:'videos', label:'Videos', icon:<Video size={16}/>},
                                    {id:'voters', label:'Supporters', icon:<Users size={16}/>}
                                ].map(t => (
                                    <button key={t.id} onClick={()=>{setActiveTab(t.id); setIsSidebarOpen(false);}} className={`w-full text-left p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab===t.id?'bg-blue-600 shadow-lg':'hover:bg-slate-800 text-slate-400'}`}>
                                        <div className="flex items-center gap-3">{t.icon} {t.label}</div>
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                                <button onClick={save} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-black uppercase text-[10px] shadow-lg transition-all">{loading?"SAVING...":"SAVE ALL"}</button>
                                <button onClick={() => signOut({callbackUrl: '/login'})} className="w-full p-4 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"><LogOut size={16}/> Logout</button>
                                <a href={`/site/${slug}`} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 rounded-xl font-black uppercase text-[10px] hover:bg-slate-700 transition-all text-blue-400 font-bold italic underline">View Site</a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- 🖥️ MAIN CONTENT AREA --- */}
            <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full">
                <AnimatePresence mode="wait">

                    {activeTab === 'analytics' && (
                        <motion.div key="analytics" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-8">
                            <div className="bg-blue-600 p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group gap-8">
                                <div className="absolute -right-4 -bottom-4 opacity-10 hidden md:block"><TrendingUp size={250}/></div>
                                <div className="relative z-10 text-center md:text-left">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Live <br/> Analytics</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mt-4 opacity-70">Portal performance monitoring</p>
                                </div>
                                <div className="relative z-10 flex items-center gap-6 bg-black/20 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/10 w-full md:w-auto justify-center">
                                    <Users size={40} className="text-blue-200" />
                                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">{views}</h2>
                                </div>
                            </div>
                            <div className="bg-white p-10 md:p-12 rounded-[3rem] md:rounded-[4rem] border shadow-xl text-center">
                                <Sparkles className="mx-auto text-blue-600 mb-6 animate-pulse" size={48} />
                                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-800">Your Portal is Live</h3>
                                <p className="text-slate-500 mt-4 max-w-lg mx-auto text-sm font-medium leading-relaxed uppercase">Update your branding and manifesto to engage more voters.</p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'branding' && (
                        <motion.div key="branding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl w-full">
                            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border">
                                <h3 className="text-lg md:text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4 text-slate-800">Leader Identity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <input type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-xl font-bold bg-slate-50 text-slate-900 focus:border-blue-500 outline-none" placeholder="Full Name" />
                                        <label className="border-2 border-dashed rounded-[2rem] p-8 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition-all text-center text-slate-800">
                                            {uploading==='avatar'? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
                                            <span className="text-[10px] font-black uppercase text-slate-500">Change Photo</span>
                                            <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setAvatar, 'avatar')} />
                                        </label>
                                        <div className="flex items-center gap-6 pt-4"><input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer shadow-lg"/><code className="text-lg font-black text-blue-600 uppercase">{color}</code></div>
                                    </div>
                                    <div className="flex flex-col items-center bg-slate-50 p-6 rounded-[2.5rem] border shadow-inner">
                                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 relative">
                                            <img src={avatar || "https://via.placeholder.com/150"} style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})` }} className="w-full h-full" alt="Avatar" />
                                        </div>
                                        <div className="w-full space-y-4 px-4">
                                            <input type="range" min="0" max="100" value={avatarPos} onChange={(e)=>setAvatarPos(parseInt(e.target.value))} className="w-full accent-blue-600" />
                                            <input type="range" min="1" max="3" step="0.1" value={avatarZoom} onChange={(e)=>setAvatarZoom(parseFloat(e.target.value))} className="w-full accent-green-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border">
                                <h3 className="text-lg font-black uppercase mb-6 flex gap-3 text-slate-800"><ImageIcon/> Main Hero Image</h3>
                                <label className="border-2 border-dashed rounded-[2.5rem] p-12 md:p-20 cursor-pointer flex flex-col items-center mb-6 hover:bg-slate-50 transition-all text-center">
                                    {uploading === 'banner' ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600"/>}
                                    <span className="text-[10px] font-black mt-2 text-slate-500 uppercase">Upload Banner Photo</span>
                                    <input type="file" className="hidden" onChange={(e) => e.target.files && uploadImg(e.target.files[0], setBanner, 'banner')} />
                                </label>
                                {banner && <img src={banner} className="h-48 md:h-64 w-full object-cover rounded-3xl border shadow-lg" alt="Banner" />}
                            </div>
                        </motion.div>
                    )}

                    {/* MANIFESTO, HISTORY, GEOGRAPHY, ECONOMY */}
                    {['manifesto', 'history', 'geography', 'economy'].includes(activeTab) && (
                        <div className="w-full">
                            {activeTab === 'manifesto' ? renderEditor("Manifesto", bio, setBio, manifestoImg, setManifestoImg, "mani") : null}
                            {activeTab === 'history' ? renderEditor("History", history, setHistory, historyImg, setHistoryImg, "hist") : null}
                            {activeTab === 'geography' ? renderEditor("Geography", geography, setGeography, geoImg, setGeoImg, "geo") : null}
                            {activeTab === 'economy' ? renderEditor("Economy", economy, setEconomy, ecoImg, setEcoImg, "eco") : null}
                        </div>
                    )}

                    {/* GALLERY TAB */}
                    {activeTab === 'gallery' && (
                        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border max-w-4xl w-full text-slate-800">
                            <h3 className="text-lg md:text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4 italic">Vikas Gallery (6 Photo Limit)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                {gallery.map((url, i) => (
                                    <div key={i} className="space-y-4">
                                        <label className="border-2 border-dashed rounded-2xl p-6 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-all">
                                            <span className="text-[10px] font-black uppercase">Photo #{i+1}</span>
                                            {uploading===`gal-${i}` ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud size={18} className="text-blue-600"/>}
                                            <input type="file" className="hidden" onChange={(e) => { if(e.target.files) { uploadImg(e.target.files[0], (link:string)=>{const n=[...gallery];n[i]=link;setGallery(n);}, `gal-${i}`); } }} />
                                        </label>
                                        {url && <img src={url} className="h-40 md:h-48 w-full object-cover rounded-2xl border shadow-xl transition-transform hover:scale-[1.02]" alt="Work" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIDEO TAB */}
                    {activeTab === 'videos' && (
                        <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border max-w-2xl w-full text-slate-800 text-center">
                            <h3 className="text-xl md:text-2xl font-black uppercase mb-10 flex gap-3 justify-center italic tracking-tighter"><Video className="text-red-600" size={32}/> Youtube Election Feed</h3>
                            <div className="space-y-6 text-left">
                                {videos.map((url, i) => (
                                    <div key={i}>
                                        <label className="text-[9px] font-black uppercase text-slate-400 mb-2 ml-2 block italic">YouTube Link #{i+1}</label>
                                        <input type="text" value={url} onChange={(e)=>{const n=[...videos];n[i]=e.target.value;setVideos(n);}} className="w-full p-4 md:p-5 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs focus:border-red-600 outline-none shadow-inner" placeholder="Paste YouTube link here..." />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* VOTERS TAB */}
                    {activeTab === 'voters' && (
                        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border overflow-hidden max-w-5xl w-full">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead className="bg-slate-50 border-b"><tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic"><th className="p-8 text-slate-800">Supporter</th><th className="p-8 text-slate-800">Contact</th><th className="p-8 text-slate-800">Message</th><th className="p-8 text-right text-slate-800">Date</th></tr></thead>
                                    <tbody className="divide-y divide-slate-100 font-bold">
                                        {voters.map((v: any, i) => (
                                            <tr key={i} className="hover:bg-blue-50 transition-all group text-slate-700">
                                                <td className="p-8 flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">{v.name[0]}</div>{v.name}</td>
                                                <td className="p-8 font-mono text-blue-600 font-black">{v.phone}</td>
                                                <td className="p-8 text-slate-500 italic text-sm font-medium line-clamp-1 max-w-[200px]">"{v.message}"</td>
                                                <td className="p-8 text-[9px] text-slate-400 uppercase text-right">{new Date(v.date).toDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {voters.length === 0 && <p className="p-24 text-center text-slate-400 font-black uppercase tracking-[10px] italic">No supporters found yet.</p>}
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}