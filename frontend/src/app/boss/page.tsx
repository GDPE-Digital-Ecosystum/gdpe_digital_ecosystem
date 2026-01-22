
// "use client";
// import { useState, useEffect } from "react";
// import { 
//   Users, Globe, Search, ShieldCheck, Bell, Lock, 
//   BarChart3, RefreshCcw, PieChart, ShieldAlert, 
//   Trash2, ExternalLink, Activity, Ban, MessageSquare, Heart, X, AlertTriangle, FileText, ImageIcon
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function BossHub() {
//     const [activeTab, setActiveTab] = useState("overview"); 
//     const [stats, setStats] = useState<any>(null);
//     const [search, setSearch] = useState("");
//     const [alertText, setAlertText] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isMounted, setIsMounted] = useState(false);

//     const loadData = async (query = "") => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await fetch(`/api/boss/advanced?search=${query}`);
//             const d = await res.json();
//             if (d.error) {
//                 setError(d.error);
//             } else {
//                 setStats(d);
//                 setAlertText(d.settings?.global_alert || "");
//             }
//         } catch (e) { 
//             setError("Master Server unreachable."); 
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         setIsMounted(true);
//         loadData();
//     }, []);

//     const formatDate = (dateString: string) => {
//         if (!dateString) return "";
//         const date = new Date(dateString);
//         return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
//     };

//     const runAction = async (action: string, slug: string) => {
//         if(!confirm(`Confirm Action: ${action} for ${slug}?`)) return;
//         const res = await fetch("/api/boss/advanced", { 
//             method: "POST", 
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action, data: { slug, alert: alertText } }) 
//         });
//         if(res.ok) { alert("Done!"); loadData(search); }
//     };

//     if (!isMounted) return null;

//     if (loading && !stats) return (
//         <div className="h-screen bg-[#020617] flex flex-col items-center justify-center">
//             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="mt-6 text-blue-500 font-black tracking-[10px] animate-pulse uppercase text-[10px]">Boss Hub Syncing...</p>
//         </div>
//     );

//     if (error) return (
//         <div className="h-screen bg-[#020617] flex flex-col items-center justify-center p-10 text-center">
//             <AlertTriangle size={60} className="text-red-500 mb-4" />
//             <h1 className="text-xl font-black text-red-500 uppercase">Connection Error</h1>
//             <p className="text-slate-500 text-xs mt-2 uppercase">{error}</p>
//             <button onClick={() => loadData()} className="mt-8 px-8 py-3 bg-blue-600 rounded-full font-black text-[10px] uppercase">Retry Now</button>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
            
//             {/* SIDEBAR */}
//             <div className="w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 shrink-0">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-3xl font-black italic text-blue-500 tracking-tighter uppercase">BOSSHUB</h2>
//                     <p className="text-[9px] font-black uppercase text-slate-500 tracking-[5px] mt-1">Rajasthan Control</p>
//                 </div>
//                 <nav className="flex-1 space-y-2">
//                     {[
//                         {id:'overview', label:'Management', icon:<PieChart size={18}/>},
//                         {id:'analytics', label:'District Stats', icon:<BarChart3 size={18}/>},
//                         {id:'leads', label:'Global Voters', icon:<Users size={18}/>},
//                         {id:'alerts', label:'Alert Center', icon:<Bell size={18}/>},
//                     ].map(t => (
//                         <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab===t.id?'bg-blue-600 shadow-lg':'text-slate-500 hover:bg-slate-800'}`}>
//                             {t.icon} {t.label}
//                         </button>
//                     ))}
//                 </nav>
//                 <button onClick={()=>loadData(search)} className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 mt-4 transition-all shadow-xl flex justify-center"><RefreshCcw size={18}/></button>
//             </div>

//             {/* CONTENT */}
//             <div className="flex-1 p-12 overflow-y-auto">
//                 <AnimatePresence mode="wait">

//                     {activeTab === 'overview' && (
//                         <motion.div key="overview" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-12">
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                                 <div className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
//                                     <Globe className="absolute -right-4 -bottom-4 opacity-10" size={120}/>
//                                     <p className="text-[10px] font-black uppercase opacity-60 mb-2">Total Sites</p>
//                                     <h2 className="text-6xl font-black italic">{stats.totalGPs}</h2>
//                                 </div>
//                                 <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
//                                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Active Leaders</p>
//                                     <h2 className="text-6xl font-black italic text-green-500">{stats.activeLeadersCount}</h2>
//                                 </div>
//                                 <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
//                                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Total Support</p>
//                                     <h2 className="text-6xl font-black italic text-orange-500">{stats.totalVotersCount}</h2>
//                                 </div>
//                             </div>

//                             <div className="space-y-6">
//                                 <div className="relative max-w-2xl">
//                                     <Search className="absolute left-5 top-5 text-slate-500" size={20}/>
//                                     <input 
//                                         type="text" 
//                                         placeholder="Search Panchayat Name..." 
//                                         className="w-full bg-slate-900 border border-white/10 p-5 pl-14 rounded-2xl font-bold outline-none focus:border-blue-500 text-white"
//                                         onKeyDown={(e:any) => e.key === 'Enter' && loadData(search)}
//                                         onChange={(e)=>setSearch(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
//                                     <table className="w-full text-left">
//                                         <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest">
//                                             <tr><th className="p-8">Panchayat / Leader</th><th className="p-8">Status</th><th className="p-8 text-right">Emergency Controls</th></tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-white/5">
//                                             {stats.panchayatList.map((gp: any, i: number) => (
//                                                 <tr key={i} className="hover:bg-blue-600/5 transition-all group">
//                                                     <td className="p-8">
//                                                         <h4 className="font-black text-xl uppercase tracking-tighter group-hover:text-blue-400">{gp.name}</h4>
//                                                         <p className="text-[10px] text-slate-500 font-bold uppercase">{gp.district} • {gp.leader_name || "Empty"}</p>
//                                                     </td>
//                                                     <td className="p-8">
//                                                         <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${gp.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-800 text-slate-600'}`}>{gp.status}</span>
//                                                     </td>
//                                                     <td className="p-8 text-right">
//                                                         <div className="flex justify-end gap-2">
//                                                             <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-all"><ExternalLink size={16}/></a>
//                                                             {gp.status === 'active' && (
//                                                                 <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
//                                                                     <button onClick={()=>runAction("clear_images", gp.slug)} className="p-2 text-orange-500 hover:bg-orange-500/10 rounded-lg" title="Clear Photos"><ImageIcon size={14}/></button>
//                                                                     {/* ✅ RELOADED: Clear Content Button Back */}
//                                                                     <button onClick={()=>runAction("clear_text", gp.slug)} className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg" title="Clear All Text"><FileText size={14}/></button>
//                                                                     <button onClick={()=>runAction("suspend_leader", gp.slug)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg" title="Full Suspend"><Ban size={14}/></button>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ALERT CENTER */}
//                     {activeTab === 'alerts' && (
//                         <motion.div key="alerts" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 shadow-2xl">
//                             <h3 className="text-2xl font-black mb-8 flex items-center gap-4 italic uppercase tracking-tighter text-blue-500"><Bell size={32}/> Global Broadcast</h3>
//                             <textarea value={alertText} onChange={(e)=>setAlertText(e.target.value)} className="w-full bg-black/60 border-2 border-white/10 p-10 rounded-[3rem] mb-10 outline-none focus:border-red-500 font-bold text-white text-xl" placeholder="Broadcast message to all sites..." />
//                             <button onClick={()=>runAction("update_alert", "all")} className="w-full py-7 bg-red-600 hover:bg-red-700 rounded-3xl font-black uppercase text-xs shadow-2xl transition-all">Broadcast Now</button>
//                         </motion.div>
//                     )}

//                     {/* Analytics & Leads Tabs same logic as before */}
//                     {activeTab === 'analytics' && (
//                         <motion.div key="analytics" initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-300">
//                              {stats?.districtStats.map((d: any, i: number) => (
//                                 <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
//                                     <h4 className="font-black text-2xl uppercase mb-6">{d._id || "Other"}</h4>
//                                     <div className="flex justify-between items-end mb-4"><p className="text-xs font-bold uppercase">{d.active} of {d.total}</p><p className="text-3xl font-black text-blue-500">{Math.round((d.active/d.total)*100)}%</p></div>
//                                     <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${(d.active/d.total)*100}%`}} className="h-full bg-blue-500"></motion.div></div>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     )}

//                     {activeTab === 'leads' && (
//                         <div className="bg-slate-900/20 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl text-slate-300">
//                             <table className="w-full text-left">
//                                 <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest">
//                                     <tr><th className="p-8 text-left">Voter</th><th className="p-8">Panchayat</th><th className="p-8">Sandesh</th><th className="p-8">Date</th></tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-white/5">
//                                     {stats.globalLeads.map((l:any, i:number)=>(
//                                         <tr key={i} className="hover:bg-white/5 transition-all">
//                                             <td className="p-8 font-bold">{l.name} <br/><span className="text-[10px] text-green-500">{l.phone}</span></td>
//                                             <td className="p-8 uppercase font-black text-blue-400 text-xs">{l.slug}</td>
//                                             <td className="p-8 text-slate-400 italic text-sm">"{l.message}"</td>
//                                             <td className="p-8 text-slate-600 text-xs font-black">{formatDate(l.date)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}

//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { 
  Users, Globe, Search, ShieldCheck, Bell, Lock, BarChart3, RefreshCcw, PieChart, 
  ShieldAlert, Trash2, ExternalLink, Ban, Image as ImageIcon, FileText, Activity, Heart, Upload, X, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BossHub() {
    const [activeTab, setActiveTab] = useState("overview"); 
    const [stats, setStats] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const loadData = async (query = "") => {
        setLoading(true);
        try {
            const res = await fetch(`/api/boss/advanced?search=${query}`);
            const d = await res.json();
            setStats(d);
            setAlertText(d.settings?.global_alert || "");
        } catch (e) { console.error("Sync Error"); }
        setLoading(false);
    };

    useEffect(() => { setIsMounted(true); loadData(); }, []);

    const runAction = async (action: string, slug: string) => {
        if(!confirm(`Confirm ${action} for ${slug}?`)) return;
        await fetch("/api/boss/advanced", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, data: { slug, alert: alertText } }) 
        });
        loadData(search);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (!isMounted) return null;
    if (!stats && loading) return <div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse">BOOTING BOSS HUB...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
            {/* --- SIDEBAR --- */}
            <div className="w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 shrink-0">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black italic text-blue-500 tracking-tighter uppercase">BOSSHUB</h2>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-[5px] mt-1">Rajasthan Control</p>
                </div>
                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {[
                        {id:'overview', label:'Management', icon:<PieChart size={18}/>},
                        {id:'analytics', label:'District Stats', icon:<BarChart3 size={18}/>},
                        {id:'leads', label:'Global Voters', icon:<Users size={18}/>},
                        {id:'alerts', label:'Alert Center', icon:<Bell size={18}/>},
                    ].map(t => (
                        <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab===t.id?'bg-blue-600 shadow-lg':'text-slate-500 hover:bg-slate-800'}`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </nav>
                <button onClick={()=>loadData(search)} className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 mt-4 transition-all shadow-xl flex justify-center"><RefreshCcw size={18} className={loading?"animate-spin":""}/></button>
            </div>

            {/* --- CONTENT --- */}
            <div className="flex-1 p-12 overflow-y-auto">
                <AnimatePresence mode="wait">

                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden"><p className="text-[10px] font-black uppercase opacity-60 mb-2">Total Sites</p><h2 className="text-6xl font-black italic">{stats.totalGPs}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500 mb-2">Active</p><h2 className="text-6xl font-black italic text-green-500">{stats.activeLeadersCount}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500 mb-2">Voters</p><h2 className="text-6xl font-black italic text-orange-500">{stats.totalVotersCount}</h2></div>
                            </div>

                            <div className="space-y-6">
                                <div className="relative max-w-2xl">
                                    <Search className="absolute left-5 top-5 text-slate-500" size={20}/>
                                    <input type="text" placeholder="Search 11,283 Panchayats..." className="w-full bg-slate-900 border border-white/10 p-5 pl-14 rounded-2xl font-bold outline-none focus:border-blue-500 text-white" onKeyDown={(e:any) => e.key === 'Enter' && loadData(search)} onChange={(e)=>setSearch(e.target.value)} />
                                </div>
                                <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">
                                            <tr><th className="p-8 text-left">Panchayat / Leader</th><th className="p-8">Status</th><th className="p-8 text-right">Emergency Controls</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-center">
                                            {stats.panchayatList.map((gp: any, i: number) => (
                                                <tr key={i} className="hover:bg-blue-600/5 transition-all group">
                                                    <td className="p-8 text-left">
                                                        <h4 className="font-black text-xl uppercase tracking-tighter group-hover:text-blue-400">{gp.name}</h4>
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase">{gp.district} • {gp.leader_name || "Empty"}</p>
                                                    </td>
                                                    <td className="p-8">
                                                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${gp.status === 'active' ? 'bg-green-500/10 text-green-500' : gp.status === 'suspended' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-600'}`}>{gp.status}</span>
                                                    </td>
                                                    <td className="p-8 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600"><ExternalLink size={16}/></a>
                                                            
                                                            {gp.status === 'active' && (
                                                                <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
                                                                    <button onClick={()=>runAction("clear_images", gp.slug)} className="p-2 text-orange-500" title="Reset Photos"><ImageIcon size={14}/></button>
                                                                    <button onClick={()=>runAction("clear_text", gp.slug)} className="p-2 text-yellow-500" title="Clear All Text"><FileText size={14}/></button>
                                                                    <button onClick={()=>runAction("suspend_leader", gp.slug)} className="p-2 text-red-500" title="Lock Site"><Ban size={14}/></button>
                                                                </div>
                                                            )}

                                                            {gp.status === 'suspended' && (
                                                                <button onClick={()=>runAction("reactivate_leader", gp.slug)} className="p-2 bg-green-900/40 text-green-500 rounded-xl"><CheckCircle2 size={16}/></button>
                                                            )}

                                                            <button onClick={()=>runAction("reset_to_idle", gp.slug)} className="p-2 bg-red-950 text-red-400 rounded-xl" title="Full Reset (New Leader)"><Trash2 size={14}/></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ALERTS TAB SAME AS PREVIOUS */}
                    {activeTab === 'alerts' && (
                        <motion.div key="alerts" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
                            <h3 className="text-2xl font-black mb-8 italic uppercase tracking-tighter text-blue-500"><Bell size={32}/> Global Broadcast</h3>
                            <textarea value={alertText} onChange={(e)=>setAlertText(e.target.value)} className="w-full bg-black/60 border-2 border-white/10 p-10 rounded-[3rem] mb-10 outline-none focus:border-red-500 font-bold h-48 text-white text-xl" />
                            <button onClick={()=>runAction("update_alert", "all")} className="w-full py-7 bg-red-600 hover:bg-red-700 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl transition-all shadow-red-900/20">Publish Live Notification</button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}