
// "use client";
// import { useState, useEffect } from "react";
// import { signOut } from "next-auth/react";
// import { 
//   Users, Globe, Search, ShieldCheck, Bell, PieChart, BarChart3, RefreshCcw, 
//   LogOut, UserPlus, X, Ban, ImageIcon, FileText, ExternalLink, MapPin, Activity, Heart, 
//   Trash2
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function BossHub() {
//     const [activeTab, setActiveTab] = useState("overview"); 
//     const [stats, setStats] = useState<any>(null);
//     const [search, setSearch] = useState("");
//     const [alertText, setAlertText] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [isCreateOpen, setIsCreateOpen] = useState(false);
//     const [isMounted, setIsMounted] = useState(false);
    
//     // Onboarding State
//     const [newNeta, setNewNeta] = useState({ slug: "", leaderName: "", email: "", password: "" });

//     const loadData = async (query = "") => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/boss/advanced?search=${query}`);
//             const d = await res.json();
//             setStats(d);
//             setAlertText(d.settings?.global_alert || "");
//         } catch (e) { console.error("Database Sync Error"); }
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

//     const runAction = async (action: string, data: any) => {
//         if(!confirm(`Confirm Action: ${action}?`)) return;
//         const res = await fetch("/api/boss/advanced", { 
//             method: "POST", 
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action, data }) 
//         });
//         if(res.ok) { 
//             alert("Success!"); 
//             loadData(search); 
//             setIsCreateOpen(false);
//         }
//     };

//     if (!isMounted) return null;
//     if (!stats && loading) return <div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-[10px]">RAJGRAM MASTER ENGINE...</div>;

//     return (
//         <div className="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
            
//             {/* --- 1. SIDEBAR --- */}
//             <div className="w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 shrink-0">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-3xl font-black italic text-blue-500 tracking-tighter uppercase">BOSSHUB</h2>
//                     <p className="text-[9px] font-black uppercase text-slate-500 tracking-[5px] mt-1">Rajasthan Control Panel</p>
//                 </div>
                
//                 <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
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

//                 {/* LOGOUT & REFRESH */}
//                 <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
//                     <button onClick={()=>loadData(search)} className="w-full p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-all flex justify-center shadow-lg"><RefreshCcw size={18} className={loading?"animate-spin":""}/></button>
//                     <button 
//                         onClick={() => signOut({ callbackUrl: "/login" })} 
//                         className="w-full p-4 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
//                     >
//                         <LogOut size={16}/> Logout Boss
//                     </button>
//                 </div>
//             </div>

//             {/* --- 2. MAIN CONTENT AREA --- */}
//             <div className="flex-1 p-12 overflow-y-auto">
//                 <AnimatePresence mode="wait">

//                     {/* --- TAB: OVERVIEW (MANAGEMENT & LIST) --- */}
//                     {activeTab === 'overview' && (
//                         <motion.div key="overview" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-12">
//                             {/* Dashboard Stats Cards */}
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                                 <div className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
//                                     <Globe className="absolute -right-4 -bottom-4 opacity-10" size={120}/>
//                                     <p className="text-[10px] font-black uppercase opacity-60 mb-2 tracking-widest">Total Sites</p>
//                                     <h2 className="text-6xl font-black italic">{stats?.totalGPs}</h2>
//                                 </div>
//                                 <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
//                                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Active Leaders</p>
//                                     <h2 className="text-6xl font-black italic text-green-500">{stats?.activeLeadersCount}</h2>
//                                 </div>
//                                 <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
//                                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Total Voters</p>
//                                     <h2 className="text-6xl font-black italic text-orange-500">{stats?.totalVotersCount}</h2>
//                                 </div>
//                             </div>

//                             {/* Search Bar + Create Leader Button */}
//                             <div className="flex flex-col md:flex-row gap-4 items-center">
//                                 <div className="relative flex-1">
//                                     <Search className="absolute left-5 top-5 text-slate-500" size={20}/>
//                                     <input 
//                                         type="text" 
//                                         placeholder="Search by Panchayat Name (Press Enter)..." 
//                                         className="w-full bg-slate-900 border border-white/10 p-5 pl-14 rounded-2xl font-bold outline-none focus:border-blue-500"
//                                         onKeyDown={(e:any) => e.key === 'Enter' && loadData(search)}
//                                         onChange={(e)=>setSearch(e.target.value)}
//                                     />
//                                 </div>
//                                 <button onClick={()=>setIsCreateOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center gap-2 transition-all">
//                                     <UserPlus size={18}/> Onboard Leader
//                                 </button>
//                             </div>

//                             {/* Master List Table */}
//                             <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
//                                 <table className="w-full text-left">
//                                     <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-[3px]">
//                                         <tr><th className="p-8">Panchayat / Leader</th><th className="p-8">Status</th><th className="p-8 text-right">Command Console</th></tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-white/5">
//                                         {stats?.panchayatList.map((gp: any, i: number) => (
//                                             <tr key={i} className="hover:bg-blue-600/5 transition-all group">
//                                                 <td className="p-8">
//                                                     <h4 className="font-black text-xl uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{gp.name}</h4>
//                                                     <p className="text-[10px] text-slate-500 font-bold uppercase">{gp.district} • {gp.leader_name || "Empty Seat"}</p>
//                                                 </td>
//                                                 <td className="p-8">
//                                                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${gp.status === 'active' ? 'bg-green-500/10 text-green-500' : gp.status === 'suspended' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-600'}`}>{gp.status}</span>
//                                                 </td>
//                                                 <td className="p-8">
//                                                     <div className="flex justify-end gap-2">
//                                                         <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-all"><ExternalLink size={16}/></a>
//                                                         {gp.status === 'active' && (
//                                                             <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
//                                                                 <button onClick={()=>runAction("clear_images", gp.slug)} className="p-2 text-orange-500" title="Reset Photos"><ImageIcon size={14}/></button>
//                                                                 <button onClick={()=>runAction("clear_text", gp.slug)} className="p-2 text-yellow-500" title="Clear Text"><FileText size={14}/></button>
//                                                                 <button onClick={()=>runAction("suspend_leader", gp.slug)} className="p-2 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all" title="Lock Site"><Ban size={14}/></button>
//                                                             </div>
//                                                         )}
//                                                         {gp.status === 'suspended' && (
//                                                             <button onClick={()=>runAction("reactivate_leader", gp.slug)} className="px-4 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded-xl transition-all">Unlock Site</button>
//                                                         )}
//                                                         <button onClick={()=>runAction("reset_to_idle", gp.slug)} className="p-3 bg-red-950 text-red-400 rounded-xl hover:bg-red-600 hover:text-white"><Trash2 size={14}/></button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* --- TAB: DISTRICT STATS (RESTORED) --- */}
//                     {activeTab === 'analytics' && (
//                         <motion.div key="analytics" initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                              {stats?.districtStats?.map((d: any, i: number) => (
//                                 <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
//                                     <h4 className="font-black text-2xl uppercase mb-6 tracking-tighter">{d._id || "Other"}</h4>
//                                     <div className="flex justify-between items-end mb-4 font-mono">
//                                         <p className="text-xs text-slate-500 font-bold uppercase">{d.active} of {d.total} Sites</p>
//                                         <p className="text-3xl font-black text-blue-500">{Math.round((d.active/d.total)*100)}%</p>
//                                     </div>
//                                     <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
//                                         <motion.div initial={{width:0}} animate={{width: `${(d.active/d.total)*100}%`}} transition={{duration:1}} className="h-full bg-blue-500"></motion.div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     )}

//                     {/* --- TAB: GLOBAL VOTERS (RESTORED) --- */}
//                     {activeTab === 'leads' && (
//                         <motion.div key="leads" initial={{opacity:0}} animate={{opacity:1}} className="bg-slate-900/20 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
//                             <table className="w-full text-left">
//                                 <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest">
//                                     <tr><th className="p-8">Voter</th><th className="p-8">Panchayat</th><th className="p-8">Sandesh (Message)</th><th className="p-8">Date</th></tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-white/5 text-sm font-bold">
//                                     {stats?.globalLeads?.map((l:any, i:number)=>(
//                                         <tr key={i} className="hover:bg-white/5 transition-all">
//                                             <td className="p-8 font-bold text-white">{l.name} <br/><span className="text-green-500 font-mono text-xs">{l.phone}</span></td>
//                                             <td className="p-8 text-blue-400 uppercase font-black text-xs">{l.slug}</td>
//                                             <td className="p-8 text-slate-400 italic font-medium">"{l.message}"</td>
//                                             <td className="p-8 text-slate-600 text-xs font-black uppercase">{formatDate(l.date)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             {stats?.globalLeads?.length === 0 && <p className="p-32 text-center text-slate-600 font-black uppercase tracking-[10px] italic">No Voter Leads Found</p>}
//                         </motion.div>
//                     )}

//                     {/* --- TAB: ALERT CENTER --- */}
//                     {activeTab === 'alerts' && (
//                         <motion.div key="alerts" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
//                             <h3 className="text-2xl font-black mb-8 flex items-center gap-4 italic uppercase text-blue-500 tracking-tighter"><Bell className="text-red-500" size={32}/> Global Broadcast</h3>
//                             <textarea value={alertText} onChange={(e)=>setAlertText(e.target.value)} className="w-full bg-black/60 border-2 border-white/10 p-10 rounded-[3rem] mb-10 outline-none focus:border-red-500 font-bold h-48 text-white text-xl" placeholder="Broadcast message to all 11,283 sites..." />
//                             <button onClick={()=>runAction("update_alert", {alert: alertText})} className="w-full py-7 bg-red-600 hover:bg-red-700 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl transition-all">Push Global Alert</button>
//                         </motion.div>
//                     )}

//                 </AnimatePresence>
//             </div>

//             {/* --- CREATE LEADER MODAL --- */}
//             <AnimatePresence>
//                 {isCreateOpen && (
//                     <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
//                         <div onClick={()=>setIsCreateOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
//                         <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative w-full max-w-md bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/10 shadow-2xl shadow-blue-900/40">
//                             <button onClick={()=>setIsCreateOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X/></button>
//                             <div className="text-center mb-10">
//                                 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20"><UserPlus className="text-white"/></div>
//                                 <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Onboard New Leader</h2>
//                             </div>
//                             <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); runAction("create_leader", newNeta);}}>
//                                 <input required placeholder="Panchayat Slug (e.g. amer-jaipur)" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e)=>setNewNeta({...newNeta, slug: e.target.value})} />
//                                 <input required placeholder="Leader Full Name" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e)=>setNewNeta({...newNeta, leaderName: e.target.value})} />
//                                 <input required type="email" placeholder="Official Email (Login ID)" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e)=>setNewNeta({...newNeta, email: e.target.value})} />
//                                 <input required type="password" placeholder="Set Dashboard Password" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e)=>setNewNeta({...newNeta, password: e.target.value})} />
//                                 <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl">Create Account & Go Live</button>
//                             </form>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }
"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { 
  Users, Globe, Search, ShieldCheck, Bell, PieChart, BarChart3, RefreshCcw, 
  LogOut, UserPlus, X, Ban, ImageIcon, FileText, ExternalLink, MapPin, Activity, Heart, 
  Trash2, CheckCircle2, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BossHub() {
    const [activeTab, setActiveTab] = useState("overview"); 
    const [stats, setStats] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [newNeta, setNewNeta] = useState({ slug: "", leaderName: "", email: "", password: "" });

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

    useEffect(() => { 
        setIsMounted(true); 
        loadData(); 
    }, []);

    // Is function ko apne code mein replace kar lo
const runAction = async (action: string, slug: string) => {
    let msg = `Confirm ${action}?`;
    if(action === 'reset_to_idle') msg = "🚨 DANGER: This will delete the account and wipe all data!";
    if(!confirm(msg)) return;

    try {
        const res = await fetch("/api/boss/advanced", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, // 👈 Yeh hona bohot zaroori hai
            body: JSON.stringify({ action, data: { slug, ...newNeta, alert: alertText } }) 
        });

        if(res.ok) { 
            alert("✅ Data Cleared Successfully!"); 
            loadData(search); 
        } else {
            alert("❌ Server Error!");
        }
    } catch (err) {
        alert("❌ Network Error!");
    }
};

    if (!isMounted) return null;
    if (!stats && loading) return <div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-[10px]">RAJGRAM BOSS ENGINE...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
            
            {/* --- SIDEBAR --- */}
            <div className="w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 shrink-0">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black italic text-blue-500 tracking-tighter uppercase">BOSSHUB</h2>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-[5px] mt-1">Rajasthan Control</p>
                </div>
                <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
                    {[
                        {id:'overview', label:'Management', icon:<PieChart size={18}/>},
                        {id:'analytics', label:'District Stats', icon:<BarChart3 size={18}/>},
                        {id:'leads', label:'Global Voters', icon:<Users size={18}/>},
                        {id:'alerts', label:'Alert Center', icon:<Bell size={18}/>},
                    ].map(t => (
                        <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab===t.id?'bg-blue-600 shadow-lg':'text-slate-400 hover:bg-slate-800'}`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </nav>
                <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                    <button onClick={()=>loadData(search)} className="w-full p-4 bg-slate-800 rounded-xl hover:bg-slate-700 flex justify-center"><RefreshCcw size={18}/></button>
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full p-4 bg-red-900/20 text-red-500 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2"><LogOut size={16}/> Logout Boss</button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 p-12 overflow-y-auto">
                <AnimatePresence mode="wait">

                    {/* MANAGEMENT TAB */}
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden text-white"><p className="text-[10px] font-black uppercase opacity-60 mb-2">Total Sites</p><h2 className="text-6xl font-black italic">{stats.totalGPs}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500">Active</p><h2 className="text-6xl font-black italic text-green-500">{stats.activeLeadersCount}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500">Support</p><h2 className="text-6xl font-black italic text-orange-500">{stats.totalVotersCount}</h2></div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1"><Search className="absolute left-5 top-5 text-slate-500"/><input type="text" placeholder="Search..." className="w-full bg-slate-900 border border-white/10 p-5 pl-14 rounded-2xl font-bold outline-none focus:border-blue-500 text-white" onKeyDown={(e:any)=>e.key==='Enter' && loadData(search)} onChange={(e)=>setSearch(e.target.value)} /></div>
                                <button onClick={()=>setIsCreateOpen(true)} className="bg-green-600 p-5 rounded-2xl font-black uppercase text-xs flex items-center gap-2"><UserPlus size={18}/> Onboard Leader</button>
                            </div>
                            <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500"><tr><th className="p-8 text-left">Panchayat</th><th>Status</th><th className="text-right p-8 text-slate-500">Command Console</th></tr></thead>
                                    <tbody className="divide-y divide-white/5">
                                        {stats.panchayatList.map((gp:any, i:number)=>(
                                            <tr key={i} className="hover:bg-blue-600/5 transition-all">
                                                <td className="p-8 text-left text-white"><h4 className="font-black text-lg uppercase">{gp.name}</h4><p className="text-[10px] text-slate-500">{gp.district} • {gp.leader_name || "Empty"}</p></td>
                                                <td><span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${gp.status==='active'?'text-green-500':gp.status==='suspended'?'text-red-500':'text-slate-600'}`}>{gp.status}</span></td>
                                                <td className="p-8 flex justify-end gap-2">
                                                    <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 text-white"><ExternalLink size={16}/></a>
                                                    {gp.status === 'active' ? (
                                                        <div className="flex gap-2">
                                                            <button onClick={()=>runAction("clear_images", gp.slug)} className="p-3 bg-orange-950 text-orange-500 rounded-xl"><ImageIcon size={14}/></button>
                                                            <button onClick={()=>runAction("clear_text", gp.slug)} className="p-3 bg-yellow-950 text-yellow-500 rounded-xl"><FileText size={14}/></button>
                                                            <button onClick={()=>runAction("suspend_leader", gp.slug)} className="p-3 bg-red-950 text-red-500 rounded-xl"><Ban size={14}/></button>
                                                        </div>
                                                    ) : gp.status === 'suspended' ? (
                                                        <button onClick={()=>runAction("reactivate_leader", gp.slug)} className="p-3 bg-green-950 text-green-500 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle2 size={16}/></button>
                                                    ) : null}
                                                    <button onClick={()=>runAction("reset_to_idle", gp.slug)} className="p-3 bg-red-950 text-red-400 rounded-xl"><Trash2 size={14}/></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* ANALYTICS TAB (RESTORED) */}
                    {activeTab === 'analytics' && (
                        <motion.div key="analytics" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {stats?.districtStats?.map((d: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-xl">
                                    <h4 className="font-black text-2xl uppercase mb-6">{d._id || "Other"}</h4>
                                    <div className="flex justify-between items-end mb-4"><p className="text-xs font-bold uppercase text-slate-500">{d.active} of {d.total}</p><p className="text-3xl font-black text-blue-500">{Math.round((d.active/d.total)*100)}%</p></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width: `${(d.active/d.total)*100}%`}} className="h-full bg-blue-500"></motion.div></div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* LEADS TAB (RESTORED) */}
                    {activeTab === 'leads' && (
                        <motion.div key="leads" initial={{opacity:0}} animate={{opacity:1}} className="bg-slate-900/20 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                             <table className="w-full text-left">
                                <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                    <tr><th className="p-8">Voter</th><th>Panchayat</th><th>Sandesh</th><th>Date</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {stats?.globalLeads?.map((l:any, i:number)=>(
                                        <tr key={i} className="hover:bg-white/5 transition-all text-slate-300">
                                            <td className="p-8 font-bold text-white">{l.name} <br/><span className="text-blue-500 font-mono text-xs">{l.phone}</span></td>
                                            <td className="font-black text-blue-400 uppercase text-xs">{l.slug}</td>
                                            <td className="italic text-slate-400">"{l.message}"</td>
                                            <td className="text-slate-600 text-xs px-4">{new Date(l.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {/* ALERTS TAB (RESTORED) */}
                    {activeTab === 'alerts' && (
                        <motion.div key="alerts" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-2xl bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 text-center shadow-2xl">
                            <Bell className="mx-auto text-red-500 mb-6" size={40}/><h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">Global Broadcast</h3>
                            <textarea value={alertText} onChange={(e)=>setAlertText(e.target.value)} className="w-full bg-black border-2 border-white/10 p-10 rounded-[3rem] mb-10 outline-none text-white text-xl" placeholder="Broadcast alert..." />
                            <button onClick={()=>runAction("update_alert", {alert: alertText})} className="w-full py-6 bg-red-600 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-900/20">Broadcast Now</button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isCreateOpen && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <div onClick={()=>setIsCreateOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative w-full max-w-md bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-black text-blue-500 mb-8 uppercase italic tracking-tighter text-center">Onboard Leader</h2>
                            <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); runAction("create_leader", newNeta);}}>
                                <input required placeholder="Panchayat Slug (e.g. ajaysar...)" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold" onChange={(e)=>setNewNeta({...newNeta, slug: e.target.value})} />
                                <input required placeholder="Full Name" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold" onChange={(e)=>setNewNeta({...newNeta, leaderName: e.target.value})} />
                                <input required type="email" placeholder="Login Email" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold" onChange={(e)=>setNewNeta({...newNeta, email: e.target.value})} />
                                <input required type="password" placeholder="Password" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold" onChange={(e)=>setNewNeta({...newNeta, password: e.target.value})} />
                                <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs shadow-xl transition-all">Create Account</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}