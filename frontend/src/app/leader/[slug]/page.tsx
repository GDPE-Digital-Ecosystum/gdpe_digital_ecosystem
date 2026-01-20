
// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { 
//   Palette, FileText, Send, Sparkles, CheckCircle2, Globe, User, 
//   Image as ImageIcon, Users, Landmark, Map as MapIcon, TrendingUp, 
//   Phone, MessageSquare, Search, Move
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function LeaderDashboard() {
//     const params = useParams();
//     const slug = params.slug;

//     // --- Tab Management ---
//     const [activeTab, setActiveTab] = useState("branding"); 

//     // --- Leader Branding States ---
//     const [leaderName, setLeaderName] = useState("");
//     const [avatar, setAvatar] = useState("");
//     const [avatarPos, setAvatarPos] = useState(50); // Vertical Position (Instagram style)
//     const [avatarZoom, setAvatarZoom] = useState(1); // Zoom scale
//     const [color, setColor] = useState("#2d5a27");
//     const [banner, setBanner] = useState("");

//     // --- Content States ---
//     const [bio, setBio] = useState("");
//     const [manifestoImg, setManifestoImg] = useState("");
//     const [history, setHistory] = useState("");
//     const [historyImg, setHistoryImg] = useState("");
//     const [geography, setGeography] = useState("");
//     const [geoImg, setGeoImg] = useState("");
//     const [economy, setEconomy] = useState("");
//     const [ecoImg, setEcoImg] = useState("");
    
//     // --- System States ---
//     const [voters, setVoters] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);

//     const LIMIT = 800;

//     // --- Manifesto Templates ---
//     const templates = {
//         vikas: "मेरा संकल्प: आपकी ग्राम पंचायत को राजस्थान की सबसे आधुनिक और डिजिटल पंचायत बनाना। \n\n1. शिक्षा: सरकारी स्कूल में डिजिटल क्लासरूम।\n2. स्वास्थ्य: 24/7 प्राथमिक चिकित्सा केंद्र।\n3. पारदर्शिता: पंचायत के हर काम का डिजिटल हिसाब।\n\nगाँव की गलियों में सीसी रोड और हर घर स्वच्छ जल पहुँचाना मेरी पहली प्राथमिकता है। आपका साथ, सबका विकास।",
//         professional: "Vision 2026: Gram Panchayat Development Strategy\n\n- Smart Water Management Systems for every ward.\n- 100% Solar-powered street lighting.\n- High-speed Internet hubs at Community Centers.\n- Direct 24/7 Digital Helpline for Grievance Redressal.\n- Modern Waste Collection and Recycling unit.",
//         emotional: "राम-राम सा! \n\nविकास की राह, अपनों का साथ। मैंने ठाना है कि हमारी पंचायत का कोई भी युवा बेरोजगारी के कारण बाहर न जाए। बुजुर्गों को पेंशन के लिए भटकना नहीं पड़ेगा, सरकारी सेवाएं आपके द्वार आएँगी। आपका एक वोट, गाँव की तस्वीर बदल देगा। मैं आपका बेटा, आपका भाई बनकर सेवा करूँगा।"
//     };

//     const applyTemplate = (type: 'vikas' | 'professional' | 'emotional') => {
//         setBio(templates[type]);
//     };

//     // --- 1. Load Data ---
//     useEffect(() => {
//         const fetchAllData = async () => {
//             try {
//                 const res = await fetch(`/api/site/${slug}`);
//                 const data = await res.json();
//                 if (data) {
//                     setLeaderName(data.leader_name || "");
//                     setAvatar(data.config?.avatar || "");
//                     setAvatarPos(data.config?.avatarPos || 50);
//                     setAvatarZoom(data.config?.avatarZoom || 1);
//                     setColor(data.config?.themeColor || "#2d5a27");
//                     setBio(data.bio || "");
//                     setManifestoImg(data.config?.manifestoImg || "");
//                     setBanner(data.config?.banner || "");
//                     setHistory(data.history || "");
//                     setHistoryImg(data.config?.historyImg || "");
//                     setGeography(data.geography || "");
//                     setGeoImg(data.config?.geographyImg || "");
//                     setEconomy(data.economy || "");
//                     setEcoImg(data.config?.economyImg || "");
//                 }
//                 const voterRes = await fetch(`/api/site/support?slug=${slug}`);
//                 const voterData = await voterRes.json();
//                 if (Array.isArray(voterData)) setVoters(voterData);
//             } catch (err) { console.error("Fetch error"); }
//             finally { setFetching(false); }
//         };
//         fetchAllData();
//     }, [slug]);

//     // --- 2. Save Changes ---
//     const handleUpdate = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/leader/update", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ 
//                     slug, leader_name: leaderName, bio, banner, themeColor: color,
//                     history, geography, economy,
//                     historyImg, geographyImg: geoImg, economyImg: ecoImg,
//                     avatar, avatarPos, avatarZoom, manifestoImg
//                 }),
//             });
//             if (res.ok) alert("🎉 Website Updated Successfully!");
//         } catch (err) { alert("Failed."); }
//         setLoading(false);
//     };

//     // UI Helper
//     const renderEditor = (label: string, value: string, setter: any, img: string, imgSetter: any) => (
//         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
//                 <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3"><ImageIcon className="text-blue-600"/> {label} Image URL</h3>
//                 <input type="text" value={img} onChange={(e)=>imgSetter(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs" placeholder="Paste image link here..."/>
//             </div>
//             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
//                 <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-xl font-black uppercase">{label} Content</h3>
//                     <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full">{value.length} / {LIMIT}</span>
//                 </div>
//                 <textarea value={value} onChange={(e)=>setter(e.target.value.substring(0, LIMIT))} className="w-full p-8 border-2 border-slate-50 rounded-[2rem] h-64 text-lg outline-none bg-slate-50/30" placeholder={`Describe gaon ka ${label}...`}/>
//             </div>
//         </motion.div>
//     );

//     if (fetching) return <div className="h-screen flex items-center justify-center font-black animate-pulse text-blue-600 uppercase tracking-[10px]">RAJGRAM CONSOLE...</div>;

//     return (
//         <div className="min-h-screen bg-[#f8fafc] flex">
//             {/* --- SIDEBAR --- */}
//             <div className="w-80 bg-[#0f172a] text-white p-8 flex flex-col shadow-2xl sticky top-0 h-screen">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-3xl font-black tracking-tighter text-blue-500 italic">RAJGRAM</h2>
//                     <p className="text-[10px] font-black uppercase tracking-[4px] text-slate-500 italic">Control Room</p>
//                 </div>
//                 <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
//                     {[
//                         { id: 'branding', label: 'Branding', icon: <Palette size={16}/> },
//                         { id: 'manifesto', label: 'Manifesto', icon: <Sparkles size={16}/> },
//                         { id: 'history', label: 'History', icon: <Landmark size={16}/> },
//                         { id: 'geography', label: 'Geography', icon: <MapIcon size={16}/> },
//                         { id: 'economy', label: 'Economy', icon: <TrendingUp size={16}/> },
//                         { id: 'voters', label: 'Supporters', icon: <Users size={16}/> }
//                     ].map((t) => (
//                         <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest ${activeTab === t.id ? 'bg-blue-600 shadow-lg' : 'text-slate-500 hover:bg-slate-800'}`}>
//                             {t.icon} {t.label} {t.id === 'voters' && <span className="ml-auto bg-blue-400/20 text-blue-400 px-2 py-0.5 rounded-full">{voters.length}</span>}
//                         </button>
//                     ))}
//                 </nav>
//                 <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
//                     <button onClick={handleUpdate} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
//                         <Send size={14}/> {loading ? "Saving..." : "Save Changes"}
//                     </button>
//                     <a href={`/site/${slug}`} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-700">
//                         View Live <Globe size={14}/>
//                     </a>
//                 </div>
//             </div>

//             {/* --- MAIN CONTENT --- */}
//             <div className="flex-1 p-12 overflow-y-auto">
//                 <AnimatePresence mode="wait">
//                     {/* 1. BRANDING TAB */}
//                     {activeTab === 'branding' && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
//                             <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
//                                 <h3 className="text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4">Leader Identity</h3>
//                                 <div className="grid md:grid-cols-2 gap-10">
//                                     <div className="space-y-6">
//                                         <div>
//                                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Leader Full Name</label>
//                                             <input type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl font-bold bg-slate-50" placeholder="E.g. Rajesh Kumar Sharma"/>
//                                         </div>
//                                         <div>
//                                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Avatar URL</label>
//                                             <input type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl font-mono text-xs bg-slate-50" placeholder="Profile image link..."/>
//                                         </div>
//                                     </div>
                                    
//                                     {/* INSTAGRAM STYLE PREVIEW */}
//                                     <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] p-6 border-2 border-dashed border-slate-200">
//                                         <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative mb-4">
//                                             <img src={avatar || "https://via.placeholder.com/150"} 
//                                                 style={{ 
//                                                     objectFit: "cover", 
//                                                     objectPosition: `center ${avatarPos}%`, 
//                                                     transform: `scale(${avatarZoom})` 
//                                                 }} 
//                                                 className="w-full h-full"
//                                             />
//                                         </div>
//                                         <p className="text-[9px] font-black uppercase text-slate-400 mb-4 tracking-widest">Adjust Avatar</p>
//                                         <div className="w-full space-y-3">
//                                             <input type="range" min="0" max="100" value={avatarPos} onChange={(e)=>setAvatarPos(parseInt(e.target.value))} className="w-full accent-blue-600" />
//                                             <input type="range" min="1" max="3" step="0.1" value={avatarZoom} onChange={(e)=>setAvatarZoom(parseFloat(e.target.value))} className="w-full accent-green-600" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
//                                 <h3 className="text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4">Theme & Banner</h3>
//                                 <div className="grid md:grid-cols-2 gap-10">
//                                     <div className="space-y-6">
//                                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Brand Color</label>
//                                         <div className="flex items-center gap-6">
//                                             <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-24 h-24 rounded-3xl cursor-pointer border-4 border-slate-50 shadow-xl"/>
//                                             <code className="text-2xl font-black text-blue-600">{color}</code>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Hero Banner URL</label>
//                                         <input type="text" value={banner} onChange={(e)=>setBanner(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl font-mono text-xs bg-slate-50" placeholder="Main banner link..."/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* 2. MANIFESTO TAB (RE-ADDED TEMPLATES & IMAGE) */}
//                     {activeTab === 'manifesto' && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
//                             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
//                                 <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3"><ImageIcon className="text-blue-600"/> Manifesto Banner URL</h3>
//                                 <input type="text" value={manifestoImg} onChange={(e)=>setManifestoImg(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs" placeholder="Image URL for Manifesto section..."/>
//                             </div>
//                             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
//                                 <div className="flex justify-between items-center mb-8">
//                                     <h3 className="text-xl font-black uppercase flex items-center gap-3"><Sparkles className="text-orange-500"/> Content & Templates</h3>
//                                     <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
//                                         <button onClick={()=>applyTemplate('vikas')} className="px-4 py-2 bg-white text-[9px] font-black uppercase rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">Vikas</button>
//                                         <button onClick={()=>applyTemplate('professional')} className="px-4 py-2 bg-white text-[9px] font-black uppercase rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">Business</button>
//                                         <button onClick={()=>applyTemplate('emotional')} className="px-4 py-2 bg-white text-[9px] font-black uppercase rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm">Emotional</button>
//                                     </div>
//                                 </div>
//                                 <textarea value={bio} onChange={(e)=>setBio(e.target.value.substring(0, LIMIT))} className="w-full p-8 border-2 border-slate-50 rounded-[2rem] h-80 text-lg focus:border-blue-600 outline-none bg-slate-50/20" />
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* 3. OTHER CONTENT TABS */}
//                     {activeTab === 'history' && renderEditor("History", history, setHistory, historyImg, setHistoryImg)}
//                     {activeTab === 'geography' && renderEditor("Geography", geography, setGeography, geoImg, setGeoImg)}
//                     {activeTab === 'economy' && renderEditor("Economy", economy, setEconomy, ecoImg, setEcoImg)}

//                     {/* 4. VOTERS TAB (FIXED LIST) */}
//                     {activeTab === 'voters' && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl">
//                             <div className="bg-blue-600 p-10 rounded-[3.5rem] text-white shadow-2xl flex justify-between items-center">
//                                 <div>
//                                     <h3 className="text-3xl font-black uppercase tracking-tighter italic">Voter Leads</h3>
//                                     <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">People who support your vision</p>
//                                 </div>
//                                 <div className="text-7xl font-black italic">{voters.length}</div>
//                             </div>
//                             <div className="bg-white rounded-[3.5rem] shadow-xl border border-slate-100 overflow-hidden">
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-left">
//                                         <thead className="bg-slate-50 border-b border-slate-100">
//                                             <tr>
//                                                 <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Supporter</th>
//                                                 <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</th>
//                                                 <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Message</th>
//                                                 <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-slate-50">
//                                             {voters.map((v: any, i: number) => (
//                                                 <tr key={i} className="hover:bg-blue-50/30 transition-all group">
//                                                     <td className="p-8 flex items-center gap-4">
//                                                         <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform">{v.name[0]}</div>
//                                                         <span className="font-bold text-slate-800">{v.name}</span>
//                                                     </td>
//                                                     <td className="p-8 font-mono text-sm text-blue-600 font-bold">{v.phone}</td>
//                                                     <td className="p-8 text-slate-500 text-sm italic line-clamp-1 max-w-[200px]">"{v.message}"</td>
//                                                     <td className="p-8 text-slate-400 text-[10px] font-bold uppercase">{new Date(v.date).toDateString()}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 {voters.length === 0 && <p className="p-32 text-center text-slate-400 font-black uppercase tracking-[10px] italic">No Supporters found...</p>}
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Palette, FileText, Send, Sparkles, Globe, User, 
  Image as ImageIcon, Users, Landmark, Map, TrendingUp, Move
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeaderDashboard() {
    const params = useParams();
    const slug = params.slug;

    const [activeTab, setActiveTab] = useState("branding"); 
    const [leaderName, setLeaderName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPos, setAvatarPos] = useState(50);
    const [avatarZoom, setAvatarZoom] = useState(1);
    const [color, setColor] = useState("#2d5a27");
    const [banner, setBanner] = useState("");
    const [bio, setBio] = useState("");
    const [manifestoImg, setManifestoImg] = useState("");
    const [history, setHistory] = useState("");
    const [historyImg, setHistoryImg] = useState("");
    const [geography, setGeography] = useState("");
    const [geoImg, setGeoImg] = useState("");
    const [economy, setEconomy] = useState("");
    const [ecoImg, setEcoImg] = useState("");
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const LIMIT = 800;

    const templates = {
        vikas: "मेरा संकल्प: आपकी ग्राम पंचायत को राजस्थान की सबसे आधुनिक और डिजिटल पंचायत बनाना। शिक्षा, स्वास्थ्य और पारदर्शिता ही हमारे विकास का आधार होगी।",
        professional: "Vision 2026: Strategizing smart governance and 100% digital literacy for our Gram Panchayat.",
        emotional: "राम-राम सा! मैं आपका बेटा, आपका भाई बनकर सेवा करूँगा। आपका एक वोट गाँव की तस्वीर बदल देगा।"
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await fetch(`/api/site/${slug}`);
                const data = await res.json();
                if (data) {
                    setLeaderName(data.leader_name || "");
                    setAvatar(data.config?.avatar || "");
                    setAvatarPos(data.config?.avatarPos ?? 50);
                    setAvatarZoom(data.config?.avatarZoom ?? 1);
                    setColor(data.config?.themeColor || "#2d5a27");
                    setBio(data.bio || "");
                    setManifestoImg(data.config?.manifestoImg || "");
                    setBanner(data.config?.banner || "");
                    setHistory(data.history || "");
                    setHistoryImg(data.config?.historyImg || "");
                    setGeography(data.geography || "");
                    setGeoImg(data.config?.geographyImg || "");
                    setEconomy(data.economy || "");
                    setEcoImg(data.config?.economyImg || "");
                }
                const voterRes = await fetch(`/api/site/support?slug=${slug}`);
                const voterData = await voterRes.json();
                if (Array.isArray(voterData)) setVoters(voterData);
            } catch (err) { console.error("Fetch error"); }
            finally { setFetching(false); }
        };
        fetchAllData();
    }, [slug]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await fetch("/api/leader/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    slug, leader_name: leaderName, bio, banner, themeColor: color,
                    history, geography, economy, historyImg, geographyImg: geoImg, economyImg: ecoImg,
                    avatar, avatarPos, avatarZoom, manifestoImg
                }),
            });
            alert("🎉 Branding & Content Live!");
        } catch (err) { alert("Failed."); }
        setLoading(false);
    };

    const renderEditor = (label: string, value: string, setter: any, img: string, imgSetter: any) => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3"><ImageIcon className="text-blue-600"/> {label} Image URL</h3>
                <input type="text" value={img} onChange={(e)=>imgSetter(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs" placeholder="Paste image link..."/>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black uppercase">{label} Content</h3>
                    <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full">{value.length} / {LIMIT}</span>
                </div>
                <textarea value={value} onChange={(e)=>setter(e.target.value.substring(0, LIMIT))} className="w-full p-8 border-2 border-slate-50 rounded-[2rem] h-64 text-lg outline-none bg-slate-50/30" />
            </div>
        </motion.div>
    );

    if (fetching) return <div className="h-screen flex items-center justify-center font-black animate-pulse text-blue-600">LOADING...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <div className="w-80 bg-[#0f172a] text-white p-8 flex flex-col shadow-2xl sticky top-0 h-screen">
                <h2 className="text-3xl font-black tracking-tighter text-blue-500 mb-10 italic">RAJGRAM</h2>
                <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
                    {['branding', 'manifesto', 'history', 'geography', 'economy', 'voters'].map((t) => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest ${activeTab === t ? 'bg-blue-600 shadow-lg' : 'text-slate-500 hover:bg-slate-800'}`}>
                            {t === 'branding' ? <Palette size={16}/> : t === 'voters' ? <Users size={16}/> : <FileText size={16}/>} {t}
                        </button>
                    ))}
                </nav>
                <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                    <button onClick={handleUpdate} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                        <Send size={14}/> {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <a href={`/site/${slug}`} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-700">View Site <Globe size={14}/></a>
                </div>
            </div>

            <div className="flex-1 p-12 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'branding' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                                <h3 className="text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4">Branding</h3>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <input type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl font-bold bg-slate-50" placeholder="Full Name"/>
                                        <input type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl font-mono text-xs bg-slate-50" placeholder="Avatar URL"/>
                                        <div className="flex items-center gap-6 pt-4">
                                            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer shadow-xl"/>
                                            <code className="text-xl font-black text-blue-600 uppercase">{color}</code>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] p-6 border-2 border-dashed border-slate-200">
                                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-4 relative">
                                            <img src={avatar || "https://via.placeholder.com/150"} style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})` }} className="w-full h-full" alt="Preview"/>
                                        </div>
                                        <div className="w-full space-y-3">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Position & Zoom</label>
                                            <input type="range" min="0" max="100" value={avatarPos} onChange={(e)=>setAvatarPos(parseInt(e.target.value))} className="w-full accent-blue-600" />
                                            <input type="range" min="1" max="3" step="0.1" value={avatarZoom} onChange={(e)=>setAvatarZoom(parseFloat(e.target.value))} className="w-full accent-green-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3"><ImageIcon size={20}/> Main Hero Photo</h3>
                                <input type="text" value={banner} onChange={(e)=>setBanner(e.target.value)} className="w-full p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-xs" placeholder="Link for hero image..."/>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'manifesto' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3"><ImageIcon className="text-blue-600"/> Manifesto Image URL</h3>
                                <input type="text" value={manifestoImg} onChange={(e)=>setManifestoImg(e.target.value)} className="w-full p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 font-mono text-xs" placeholder="Manifesto image link..."/>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                                <div className="flex gap-2 mb-6">
                                    {['vikas', 'professional', 'emotional'].map(type => (
                                        <button key={type} onClick={() => setBio(templates[type as keyof typeof templates])} className="px-4 py-2 bg-slate-50 border rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">{type}</button>
                                    ))}
                                </div>
                                <textarea value={bio} onChange={(e)=>setBio(e.target.value.substring(0, LIMIT))} className="w-full p-8 border-2 border-slate-50 rounded-[2rem] h-80 text-lg outline-none bg-slate-50/20" />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'history' && renderEditor("History", history, setHistory, historyImg, setHistoryImg)}
                    {activeTab === 'geography' && renderEditor("Geography", geography, setGeography, geoImg, setGeoImg)}
                    {activeTab === 'economy' && renderEditor("Economy", economy, setEconomy, ecoImg, setEcoImg)}
                    
                    {activeTab === 'voters' && (
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                             <table className="w-full text-left">
                                <thead className="bg-slate-50"><tr className="text-[10px] font-black uppercase tracking-widest text-slate-400"><th className="p-8">Supporter</th><th className="p-8">Contact</th><th className="p-8">Message</th><th className="p-8">Date</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                    {voters.map((v: any, i) => (
                                        <tr key={i} className="hover:bg-blue-50 transition-all"><td className="p-8 font-bold">{v.name}</td><td className="p-8 font-mono text-blue-600">{v.phone}</td><td className="p-8 italic text-slate-500">"{v.message}"</td><td className="p-8 text-xs text-slate-400">{new Date(v.date).toLocaleDateString()}</td></tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}