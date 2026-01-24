
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Palette, FileText, Send, Sparkles, Globe, ImageIcon, Users, Landmark, Map, TrendingUp, Camera, Video, Loader2, UploadCloud, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
// import { signOut } from "next-auth/react";

export default function LeaderDashboard() {
    const params = useParams();
    const slug = params.slug;

    const [activeTab, setActiveTab] = useState("branding"); 
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
    
    // Gallery state initialize with empty strings to avoid blank screen
    const [gallery, setGallery] = useState<string[]>(["", "", "", "", "", ""]);
    const [videos, setVideos] = useState<string[]>(["", "", "", ""]);
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);

    const CLOUD_NAME = "dmybowj5w"; 
    const UPLOAD_PRESET = "rajgram_preset";

    const uploadImg = async (file: File, setter: any, type: string) => {
        setUploading(type);
        const fd = new FormData(); fd.append("file", file); fd.append("upload_preset", UPLOAD_PRESET);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
            const d = await res.json(); setter(d.secure_url);
        } catch (err) { alert("Upload fail!"); }
        setUploading(null);
    };

    useEffect(() => {
        const load = async () => {
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
                    
                    // Fallback to empty array if gallery is missing in DB
                    const savedGallery = d.config?.gallery || [];
                    const fullGallery = [...savedGallery, ...Array(6).fill("")].slice(0, 6);
                    setGallery(fullGallery);

                    const savedVids = d.config?.videos || [];
                    const fullVids = [...savedVids, ...Array(4).fill("")].slice(0, 4);
                    setVideos(fullVids);
                }
                const v = await fetch(`/api/site/support?slug=${slug}`).then(r => r.json());
                if (Array.isArray(v)) setVoters(v);
            } catch(e) {}
            finally { setFetching(false); }
        };
        load();
    }, [slug]);

    const save = async () => {
        setLoading(true);
        await fetch("/api/leader/update", {
            method: "POST",
            body: JSON.stringify({ 
                slug, leader_name: leaderName, bio, banner, themeColor: color,
                history, geography, economy, historyImg, geographyImg: geoImg, economyImg: ecoImg,
                avatar, avatarPos, avatarZoom, manifestoImg,
                gallery: gallery.filter(u => u !== ""), videos: videos.filter(v => v !== "")
            })
        });
        alert("🎉 Saved Successfully!"); setLoading(false);
    };

    const renderEditor = (label: string, text: string, setText: any, img: string, setImg: any, type: string) => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border">
                <h3 className="text-xl font-black mb-6 uppercase flex gap-3 text-slate-800"><ImageIcon className="text-blue-600"/> {label} Image</h3>
                <div className="flex flex-col md:flex-row gap-10">
                    <label className="flex-1 border-2 border-dashed rounded-[2rem] p-10 cursor-pointer flex flex-col items-center hover:bg-slate-50 transition-all">
                        {uploading === type ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
                        <span className="text-[10px] font-black uppercase text-slate-500">Upload Photo</span>
                        <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setImg, type)} />
                    </label>
                    {img && <img src={img} className="h-48 w-64 object-cover rounded-3xl border shadow-xl" />}
                </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border text-slate-800">
                <h3 className="text-xl font-black mb-6 uppercase">{label} Content (Max 800)</h3>
                <textarea value={text} onChange={(e)=>setText(e.target.value.substring(0, 800))} className="w-full p-8 border rounded-3xl h-64 text-lg bg-slate-50/30 outline-none" />
            </div>
        </motion.div>
    );

    if (fetching) return <div className="h-screen flex items-center justify-center font-black text-blue-600 uppercase tracking-[10px]">CONNECTING...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans">
            {/* Sidebar */}
            <div className="w-72 bg-[#0f172a] text-white p-8 flex flex-col sticky top-0 h-screen shrink-0">
                <h2 className="text-2xl font-black text-blue-500 italic mb-8">RAJGRAM</h2>
                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {['branding', 'manifesto', 'history', 'geography', 'economy', 'gallery', 'videos', 'voters'].map(t => (
                        <button key={t} onClick={()=>setActiveTab(t)} className={`w-full text-left p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest ${activeTab===t?'bg-blue-600 shadow-lg':'hover:bg-slate-800 text-slate-400'}`}>{t}</button>
                    ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                    <button onClick={save} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-black uppercase text-[10px] tracking-widest">{loading?"SAVING...":"SAVE CHANGES"}</button>
                    <button 
                    onClick={() => signOut({ callbackUrl: "/login" })} 
                    className="w-full p-4 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <LogOut size={16}/> Logout Leader
                </button>
                    <a href={`/site/${slug}`} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-700">View Site <Globe size={14}/></a>
                </div>
            </div>

            {/* Main */}
            <div className="flex-1 p-12 overflow-y-auto text-slate-800">
                <AnimatePresence mode="wait">
                    {activeTab === 'branding' && (
                        <div className="max-w-3xl space-y-8">
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border">
                                <h3 className="text-xl font-black uppercase mb-6 border-l-4 border-blue-600 pl-4">Leader Identity</h3>
                                <input type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} className="w-full p-4 border rounded-xl font-bold mb-8 bg-slate-50" placeholder="Full Name" />
                                <div className="grid grid-cols-2 gap-10">
                                    <label className="border-2 border-dashed rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
                                        {uploading==='avatar'? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud className="text-blue-600 mb-2"/>}
                                        <span className="text-[10px] font-black uppercase text-slate-500">Change Photo</span>
                                        <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setAvatar, 'avatar')} />
                                    </label>
                                    <div className="flex flex-col items-center bg-slate-50 p-6 rounded-[2rem]">
                                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 relative">
                                            <img src={avatar || "https://via.placeholder.com/150"} style={{ objectFit: "cover", objectPosition: `center ${avatarPos}%`, transform: `scale(${avatarZoom})` }} className="w-full h-full" />
                                        </div>
                                        <input type="range" min="0" max="100" value={avatarPos} onChange={(e)=>setAvatarPos(parseInt(e.target.value))} className="w-full accent-blue-600 mb-2" />
                                        <input type="range" min="1" max="3" step="0.1" value={avatarZoom} onChange={(e)=>setAvatarZoom(parseFloat(e.target.value))} className="w-full accent-green-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border">
                                <h3 className="text-xl font-black mb-6 uppercase">Main Hero Banner</h3>
                                <label className="border-2 border-dashed rounded-3xl p-10 cursor-pointer flex flex-col items-center mb-6 hover:bg-slate-50 transition-all">
                                    {uploading === 'banner' ? <Loader2 className="animate-spin"/> : <UploadCloud/>}
                                    <span className="text-[10px] font-bold uppercase mt-2">Upload Banner</span>
                                    <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], setBanner, 'banner')} />
                                </label>
                                {banner && <img src={banner} className="h-40 w-full object-cover rounded-3xl border" />}
                                <div className="mt-8 flex items-center gap-6"><input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-20 h-20 rounded-2xl cursor-pointer shadow-lg"/><p className="text-2xl font-black text-blue-600 uppercase tracking-tighter">{color}</p></div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'manifesto' && renderEditor("Manifesto", bio, setBio, manifestoImg, setManifestoImg, "mani")}
                    {activeTab === 'history' && renderEditor("History", history, setHistory, historyImg, setHistoryImg, "hist")}
                    {activeTab === 'geography' && renderEditor("Geography", geography, setGeography, geoImg, setGeoImg, "geo")}
                    {activeTab === 'economy' && renderEditor("Economy", economy, setEconomy, ecoImg, setEcoImg, "eco")}
                    
                    {activeTab === 'gallery' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border max-w-4xl text-slate-800">
                            <h3 className="text-xl font-black uppercase mb-8 border-l-4 border-blue-600 pl-4">Vikas Gallery (6 Photos)</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {gallery.map((url, i) => (
                                    <div key={i} className="space-y-2">
                                        <label className="border-2 border-dashed rounded-2xl p-4 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-all">
                                            <span className="text-[10px] font-black uppercase">Photo #{i+1}</span>
                                            {uploading===`gal-${i}` ? <Loader2 className="animate-spin text-blue-600"/> : <UploadCloud size={16} className="text-blue-600"/>}
                                            <input type="file" className="hidden" onChange={(e)=>e.target.files && uploadImg(e.target.files[0], (link:string)=>{const n=[...gallery];n[i]=link;setGallery(n);}, `gal-${i}`)} />
                                        </label>
                                        {url && <img src={url} className="h-32 w-full object-cover rounded-3xl border shadow-md" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'videos' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border max-w-2xl text-slate-800">
                            <h3 className="text-xl font-black uppercase mb-8 flex gap-3 italic tracking-tighter"><Video className="text-red-600"/> YouTube Feed</h3>
                            {videos.map((url, i) => (
                                <div key={i} className="mb-4">
                                    <label className="text-[9px] font-bold uppercase text-slate-400 mb-1 block">Video #{i+1} Link</label>
                                    <input type="text" value={url} onChange={(e)=>{const n=[...videos];n[i]=e.target.value;setVideos(n);}} className="w-full p-4 border rounded-xl bg-slate-50 font-mono text-xs focus:border-red-500 outline-none" placeholder="https://youtube.com/watch?v=..." />
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {activeTab === 'voters' && (
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border overflow-hidden max-w-5xl text-slate-900">
                             <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b"><tr className="text-[10px] font-black uppercase tracking-widest text-slate-400"><th className="p-8 italic">Supporter</th><th className="p-8 italic">Contact</th><th className="p-8 italic">Date</th></tr></thead>
                                <tbody className="divide-y">{voters.map((v: any, i) => (
                                    <tr key={i} className="hover:bg-blue-50 transition-all"><td className="p-8 font-black uppercase text-slate-700">{v.name}</td><td className="p-8 font-mono text-blue-600 font-bold">{v.phone}</td><td className="p-8 text-[10px] font-bold text-slate-400">{new Date(v.date).toDateString()}</td></tr>
                                ))}</tbody>
                            </table>
                            {voters.length === 0 && <p className="p-20 text-center text-slate-400 font-black uppercase tracking-[10px] italic">No Voter Support Yet</p>}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}