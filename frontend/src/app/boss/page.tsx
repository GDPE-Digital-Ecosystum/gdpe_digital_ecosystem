"use client";
import { useState, useEffect } from "react";
import { 
  Users, Globe, Search, ShieldCheck, Trash2, UserPlus, 
  ExternalLink, Filter, CheckCircle, RefreshCcw 
} from "lucide-react";
import { motion } from "framer-motion";

export default function BossUltimateDashboard() {
    const [viewData, setViewData] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/boss-manage?search=${search}&status=${statusFilter}`);
            const d = await res.json();
            setViewData(d);
        } catch (err) { console.error("Load failed"); }
        setLoading(false);
    };

    useEffect(() => { loadData(); }, [statusFilter]);
    
    const handleAction = async (slug: string, action: string) => {
        if (!confirm(`Are you sure you want to ${action} this leader?`)) return;
        const res = await fetch("/api/boss-manage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, action })
        });
        if (res.ok) loadData();
    };

    if (!viewData && loading) return <div className="h-screen bg-slate-950 text-blue-500 flex items-center justify-center font-black tracking-[10px] animate-pulse">CONNECTING TO RAJASTHAN...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
            
            {/* Header & Stats Box */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <h1 className="text-4xl font-black italic tracking-tighter text-blue-500">BOSS<span className="text-white">HUB</span></h1>
                
                <div className="flex gap-4">
                    <div className="bg-slate-900/80 p-4 px-8 rounded-3xl border border-white/5 shadow-xl">
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Total GPs</p>
                        <p className="text-2xl font-black">{viewData?.stats.total}</p>
                    </div>
                    <div className="bg-green-500/10 p-4 px-8 rounded-3xl border border-green-500/20 shadow-xl">
                        <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">Active</p>
                        <p className="text-2xl font-black text-green-500">{viewData?.stats.active}</p>
                    </div>
                    <div className="bg-orange-500/10 p-4 px-8 rounded-3xl border border-orange-500/20 shadow-xl">
                        <p className="text-[9px] text-orange-500 font-black uppercase tracking-widest">Idle</p>
                        <p className="text-2xl font-black text-orange-500">{viewData?.stats.idle}</p>
                    </div>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-white/5 mb-10 flex flex-wrap gap-4 items-center">
                <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Search Panchayat Name (Press Enter)..." 
                        className="w-full bg-black/40 border border-white/10 p-4 pl-14 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold"
                        onKeyDown={(e: any) => e.key === 'Enter' && loadData()}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-800 border border-white/10 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active Leaders</option>
                    <option value="idle">Inactive (Idle)</option>
                </select>
                <button onClick={loadData} className="bg-blue-600 p-4 rounded-2xl hover:bg-blue-700 transition-all">
                    <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* Main Table Content */}
            <div className="bg-slate-900/20 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/80 text-slate-500 text-[10px] font-black uppercase tracking-[3px]">
                            <tr>
                                <th className="p-8">Panchayat / Slug</th>
                                <th className="p-8">Block & District</th>
                                <th className="p-8 text-center">Status</th>
                                <th className="p-8 text-right">Command</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {viewData?.list.map((gp: any, i: number) => (
                                <tr key={i} className="hover:bg-blue-600/5 transition-all group">
                                    <td className="p-8">
                                        <h4 className="font-black text-lg tracking-tight uppercase group-hover:text-blue-400 transition-colors">{gp.name}</h4>
                                        <p className="text-[10px] text-slate-600 font-mono mt-1">{gp.slug}</p>
                                    </td>
                                    <td className="p-8">
                                        <p className="text-xs font-black uppercase text-slate-300">{gp.block}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{gp.district}</p>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex justify-center">
                                            <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                gp.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                                                'bg-slate-800/50 text-slate-500 border-slate-700'
                                            }`}>
                                                {gp.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex justify-end gap-3">
                                            <a href={`/site/${gp.slug}`} target="_blank" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-all"><ExternalLink size={16}/></a>
                                            {gp.status === 'active' ? (
                                                <button onClick={() => handleAction(gp.slug, 'remove')} className="p-3 bg-red-900/20 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                                            ) : (
                                                <a href={`/leader/${gp.slug}`} className="p-3 bg-green-900/20 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-600 hover:text-white transition-all"><UserPlus size={16}/></a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}