
"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
    Users, Globe, Search, ShieldCheck, Bell, PieChart, BarChart3, RefreshCcw,
    LogOut, UserPlus, X, Ban, ImageIcon, FileText, ExternalLink, MapPin, Activity,
    Heart, Trash2, CheckCircle2, ChevronDown
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

    useEffect(() => { setIsMounted(true); loadData(); }, []);

    const runAction = async (action: string, slug: string) => {
        let msg = `Confirm ${action}?`;
        if (action === 'reset_to_idle') msg = "🚨 DANGER: This will delete everything!";
        if (!confirm(msg)) return;

        const payload = {
            action: action,
            data: action === "create_leader" ? newNeta : { slug, alert: alertText }
        };

        try {
            const res = await fetch("/api/boss/advanced", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (res.ok && result.success) {
                alert("✅ Success!"); loadData(search); setIsCreateOpen(false);
                if (action === "create_leader") setNewNeta({ slug: "", leaderName: "", email: "", password: "" });
            } else { alert("❌ Error: " + (result.error || "Failed")); }
        } catch (err) { alert("❌ Network Error!"); }
    };

    if (!isMounted) return null;
    if (!stats && loading) return <div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-[10px]">BOSS Hub Initializing...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 shrink-0">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black italic text-blue-500 tracking-tighter">BOSSHUB</h2>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[5px] mt-1">Rajasthan Control</p>
                </div>
                <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
                    {['overview', 'analytics', 'leads', 'alerts'].map(id => (
                        <button key={id} onClick={() => setActiveTab(id)} className={`w-full text-left p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab === id ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-500 hover:bg-slate-800'}`}>
                            {id === 'overview' ? <PieChart size={18} /> : id === 'analytics' ? <BarChart3 size={18} /> : id === 'leads' ? <Users size={18} /> : <Bell size={18} />}
                            <span className="ml-3">{id}</span>
                        </button>
                    ))}
                </nav>
                <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full p-4 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2"><LogOut size={16} /> Logout Boss</button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <button onClick={() => loadData(search)} className="flex items-center gap-2 bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
                        <RefreshCcw size={16} className={loading ? "animate-spin text-blue-400" : "text-white"} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Refresh System</span>
                    </button>
                    <div className="text-right"><h1 className="text-xl font-black uppercase text-white tracking-tighter italic">Master Control Hub</h1></div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                                <div className="bg-blue-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden"><p className="text-[10px] font-black uppercase opacity-60 mb-2">Total Sites</p><h2 className="text-6xl font-black italic">{stats.totalGPs}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500 mb-2">Active</p><h2 className="text-6xl font-black italic text-green-500">{stats.activeLeadersCount}</h2></div>
                                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl"><p className="text-[10px] font-black uppercase text-slate-500 mb-2">Voters</p><h2 className="text-6xl font-black italic text-orange-500">{stats.totalVotersCount}</h2></div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1 group"><Search className="absolute left-5 top-5 text-slate-500" /><input type="text" placeholder="Search..." className="w-full bg-slate-900 border border-white/10 p-5 pl-14 rounded-2xl font-bold outline-none focus:border-blue-500 text-white" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e: any) => e.key === 'Enter' && loadData(search)} /></div>
                                <button onClick={() => setIsCreateOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black uppercase text-xs flex items-center gap-2 shadow-xl"><UserPlus size={18} /> Onboard Leader</button>
                            </div>

                            <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500"><tr><th className="p-8">Panchayat / Leader</th><th>Status</th><th className="p-8 text-right font-black">Controls</th></tr></thead>
                                    <tbody className="divide-y divide-white/5">
                                       {/* // ✅ Naya (Sahi) */}
{stats.panchayatList.map((gp: any, index: number) => (
  // gp_id hamesha unique hai, agar wo na mile toh index use kar lo
  <tr key={gp.gp_id || `gp-${index}`}>
    

                                                <td className="p-8 text-left text-white"><h4 className="font-black text-lg uppercase leading-none">{gp.name}</h4><p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">{gp.district}</p></td>
                                                <td><span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase border ${gp.status === 'active' ? 'text-green-500' : gp.status === 'suspended' ? 'text-red-500' : 'text-slate-600'}`}>{gp.status}</span></td>
                                                <td className="p-8 flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-all">
                                                    <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 text-white"><ExternalLink size={16} /></a>
                                                    {gp.status === 'active' || gp.status === 'suspended' ? (
                                                        <div className="flex gap-2">
                                                            <button onClick={() => runAction("clear_images", gp.slug)} className="p-3 bg-orange-950 text-orange-500 rounded-xl"><ImageIcon size={14} /></button>
                                                            <button onClick={() => runAction("clear_text", gp.slug)} className="p-3 bg-yellow-950 text-yellow-500 rounded-xl"><FileText size={14} /></button>
                                                            {gp.status === 'active' ? (
                                                                <button onClick={() => runAction("suspend_leader", gp.slug)} className="p-3 bg-red-950 text-red-500 rounded-xl" title="Lock Site"><Ban size={14} /></button>
                                                            ) : (
                                                                <button onClick={() => runAction("reactivate_leader", gp.slug)} className="p-3 bg-green-950 text-green-500 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle2 size={16} /></button>
                                                            )}
                                                        </div>
                                                    ) : null}
                                                    <button onClick={() => runAction("reset_to_idle", gp.slug)} className="p-3 bg-red-950 text-red-400 rounded-xl hover:bg-red-600 transition-all"><Trash2 size={14} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* 2. ANALYTICS TAB */}
                    {activeTab === 'analytics' && (
                        <motion.div key="an" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stats?.districtStats?.map((d: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-xl">
                                    <h4 className="font-black text-2xl uppercase mb-6 text-white tracking-tighter italic">{d._id || "Other"}</h4>
                                    <div className="flex justify-between items-end mb-4 font-mono text-slate-300"><p className="text-xs font-bold uppercase">{d.active} of {d.total}</p><p className="text-3xl font-black text-blue-500">{Math.round((d.active / d.total) * 100)}%</p></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(d.active / d.total) * 100}%` }} className="h-full bg-blue-500"></motion.div></div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* 3. LEADS TAB */}
                    {activeTab === 'leads' && (
                        <motion.div key="ld" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/20 rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl">
                            <table className="w-full text-left text-slate-300">
                                <thead className="bg-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">
                                    <tr><th className="p-8 text-left">Voter</th><th>Panchayat</th><th>Sandesh</th><th className="p-8 text-right">Date</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm font-bold text-slate-300">
                                    {stats?.globalLeads?.map((l: any, i: number) => (
                                        <tr key={i} className="hover:bg-white/5 transition-all text-center">
                                            <td className="p-8 text-left text-white">{l.name} <br /><span className="text-green-500 font-mono text-xs">{l.phone}</span></td>
                                            <td className="font-black text-blue-400 uppercase text-xs tracking-tighter">{l.slug}</td>
                                            <td className="italic text-slate-400 font-medium truncate max-w-xs px-4 text-left">"{l.message}"</td>
                                            <td className="text-slate-600 text-xs text-right pr-10">{new Date(l.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {/* 4. ALERTS TAB */}
                    {activeTab === 'alerts' && (
                        <motion.div key="al" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 text-center shadow-2xl">
                            <Bell className="mx-auto text-red-500 mb-6" size={40} /><h3 className="text-2xl font-black mb-10 uppercase text-white tracking-tighter underline underline-offset-8 decoration-red-500">Global Notification</h3>
                            <textarea value={alertText} onChange={(e) => setAlertText(e.target.value)} className="w-full bg-black border-2 border-white/10 p-10 rounded-[3.5rem] mb-10 outline-none text-white text-xl font-bold focus:border-red-500 shadow-inner" placeholder="Puri Rajasthan ki sites par ye alert dikhega..." />
                            <button onClick={() => runAction("update_alert", "")} className="w-full py-6 bg-red-600 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-red-700 shadow-xl shadow-red-900/20 transition-all">Broadcast Notification</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isCreateOpen && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <div onClick={() => setIsCreateOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-[#0f172a] p-10 rounded-[4rem] border border-white/10 shadow-2xl">
                            <button onClick={() => setIsCreateOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                            <h2 className="text-2xl font-black text-blue-500 mb-8 uppercase italic tracking-tighter text-center leading-none">Onboard <br /> New Leader</h2>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); runAction("create_leader", ""); }}>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Available Gram Panchayat</label>
                                    <div className="relative">
                                        <select required className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm appearance-none cursor-pointer shadow-inner" value={newNeta.slug} onChange={(e) => setNewNeta({ ...newNeta, slug: e.target.value })}>
                                            <option value="">-- Choose Panchayat --</option>
                                            {stats?.idleList?.map((idle: any) => (<option key={idle.slug} value={idle.slug} className="bg-slate-900">{idle.name} ({idle.district})</option>))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-4 text-slate-500 pointer-events-none" size={18} />
                                    </div>
                                </div>
                                <input required placeholder="Leader Full Name" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e) => setNewNeta({ ...newNeta, leaderName: e.target.value })} />
                                <input required type="email" placeholder="Login Email" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e) => setNewNeta({ ...newNeta, email: e.target.value })} />
                                <input required type="password" placeholder="Dashboard Password" className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none focus:border-blue-500 text-white font-bold text-sm" onChange={(e) => setNewNeta({ ...newNeta, password: e.target.value })} />
                                <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs shadow-xl transition-all">Verify & Activate Website</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}