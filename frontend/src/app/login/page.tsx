// "use client";
// import { useState } from "react";
// import { signIn, getSession } from "next-auth/react"; // 👈 getSession add kiya
// import { useRouter } from "next/navigation";
// import { ShieldCheck, ArrowRight, Loader2, Lock, User } from "lucide-react";

// export default function LoginPage() {
//     const [id, setId] = useState("");
//     const [password, setPassword] = useState("");
//     const [type, setType] = useState("leader"); 
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleLogin = async (e: any) => {
//         e.preventDefault();
//         setLoading(true);
        
//         // 1. Next-Auth Sign-In
//         const res = await signIn("credentials", {
//             id,
//             password,
//             loginType: type,
//             redirect: false
//         });

//         if (res?.ok) {
//             // 2. ✅ SUCCESS: Ab session se neta ka slug nikalo
//             const session: any = await getSession();
            
//             if (session?.user?.role === "BOSS") {
//                 router.push("/boss");
//             } else if (session?.user?.slug) {
//                 // Neta ko uske asli slug par bhejo
//                  const safeSlug = encodeURIComponent(session.user.slug);
//         router.push(`/leader/${safeSlug}`);
//             } else {
//                 alert("Account Error: Slug not found!");
//                 setLoading(false);
//             }
//         } else {
//             alert("Galt Email ya Password!");
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
//             <div className="max-w-md w-full bg-white rounded-[3.5rem] p-10 shadow-2xl">
//                 <div className="text-center mb-10 text-slate-800">
//                     <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
//                         <ShieldCheck className="text-white" size={40} />
//                     </div>
//                     <h1 className="text-3xl font-black uppercase italic">RajGram Auth</h1>
//                     <div className="flex justify-center gap-2 mt-6 bg-slate-100 p-1.5 rounded-2xl">
//                         <button onClick={()=>setType("leader")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type==='leader'?'bg-white shadow-sm text-blue-600':'text-slate-500'}`}>Leader</button>
//                         <button onClick={()=>setType("boss")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type==='boss'?'bg-white shadow-sm text-blue-600':'text-slate-500'}`}>Boss</button>
//                     </div>
//                 </div>

//                 <form onSubmit={handleLogin} className="space-y-5 text-slate-800">
//                     <div className="space-y-1">
//                         <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
//                         <input required type="email" value={id} onChange={(e)=>setId(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 font-bold" placeholder="neta@example.com" />
//                     </div>
//                     <div className="space-y-1">
//                         <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Security Password</label>
//                         <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 font-bold" placeholder="••••••••" />
//                     </div>
//                     <button type="submit" disabled={loading} className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-[3px] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
//                         {loading ? <Loader2 className="animate-spin" /> : "Verify & Enter"} <ArrowRight size={18}/>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }



"use client";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2, Lock, User } from "lucide-react";

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("leader"); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        // 1. Next-Auth Sign-In
        const res = await signIn("credentials", {
            id,
            password,
            loginType: type,
            redirect: false
        });

        if (res?.ok) {
            // 2. SUCCESS: Ab session se neta ka slug nikalo
            const session: any = await getSession();
            
            if (session?.user?.role === "BOSS") {
                router.push("/boss");
            } else if (session?.user?.slug) {
                // ✅ HINDI SLUG FIX: encodeURIComponent use kiya hai taaki URL sahi bane
                const safeSlug = encodeURIComponent(session.user.slug);
                router.push(`/leader/${safeSlug}`);
            } else {
                alert("Account Error: Slug not found in database!");
                setLoading(false);
            }
        } else {
            alert("❌ Invalid Email or Password!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl">
                <div className="text-center mb-10 text-slate-800">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <ShieldCheck className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-black uppercase italic">RajGram Auth</h1>
                    <div className="flex justify-center gap-2 mt-6 bg-slate-100 p-1.5 rounded-2xl">
                        <button onClick={()=>setType("leader")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type==='leader'?'bg-white shadow-sm text-blue-600':'text-slate-500'}`}>Leader</button>
                        <button onClick={()=>setType("boss")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type==='boss'?'bg-white shadow-sm text-blue-600':'text-slate-500'}`}>Boss</button>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5 text-slate-800">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
                        <input required type="email" value={id} onChange={(e)=>setId(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 font-bold" placeholder="neta@example.com" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Security Password</label>
                        <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 font-bold" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-[3px] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : "Verify & Enter"} <ArrowRight size={18}/>
                    </button>
                </form>
            </div>
        </div>
    );
}