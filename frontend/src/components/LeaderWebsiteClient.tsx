"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { 
  X, Menu, ShieldAlert, ArrowRight, Play, Globe, Camera, Calendar,
  Landmark, Map, PieChart, Zap, School, HeartPulse, Wifi,
  ChevronRight,
  Users,
  XCircle
} from "lucide-react";

// --- THREE.JS IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import Footer from "./footer";
import dynamic from "next/dynamic";
import Navbar from "./navbar";



// 🔥 OPTIMIZATION COMPONENT: Isse sirf dikhne wala Canvas hi chalega
const OptimizedCanvas = ({ children, camera }: { children?: any; camera?: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 }); // Jab 10% dikhe tabhi chalao

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
      {isInView && (
        <Canvas 
          dpr={[1, 1.2]} // Performance ke liye resolution limit
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }} 
          camera={camera || undefined}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};



// --- 4. TILT EFFECT ---
const TiltCard = ({ children }: { children?: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 }); // Smooth movement
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
      }} 
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};



// --- 6. ECONOMY COMPONENTS ---
function ProsperityNodes() {
  const groupRef = useRef<any>(null);
  useFrame((state: any) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });
  return (
    <group ref={groupRef}>
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={2}>
          <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, -5]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#F4EBD0" metalness={0.8} roughness={0.2} emissive="#F4EBD0" emissiveIntensity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// --- 7. GALLERY & VIDEO COMPONENTS ---
function GalleryAmbience() {
  const groupRef = useRef<any>(null);
  useFrame((state: any) => { 
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05; 
  });
  return (
    <group ref={groupRef}>
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={2}>
          <mesh position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, -10]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#112F20" opacity={0.2} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
}



function NewsDataStream() {
  const groupRef = useRef<any>(null);
  useFrame((state: any) => { 
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08; 
  });
  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2}>
          <mesh position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10, -6]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial color="#112F20" opacity={0.15} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// --- DIVIDER ---
const ScallopedDivider = ({ color, top = false }: { color?: any; top?: boolean }) => (
  <div 
    className={`w-full h-10 relative z-20 ${top ? '-mb-10' : '-mt-10'}`} 
    style={{ 
      backgroundColor: color,
      // maskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
      maskSize: "30px 40px",
      WebkitMaskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
      WebkitMaskSize: "30px 40px",
    }} 
  />
);

const NewsCard = ({ item, panchayat }: { item: any; panchayat: any }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col h-full border border-slate-100 transition-all duration-500 hover:shadow-2xl">
    <div className="relative overflow-hidden aspect-video">
      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="News" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
         <p className="text-[9px] font-black text-[#112F20] uppercase">
           {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
         </p>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-6 bg-red-700"></span>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Digital Gram</span>
      </div>

      <h4 className="text-xl font-bold text-[#112F20] leading-tight mb-4 line-clamp-2 group-hover:text-red-700 transition-colors Oswald uppercase">
        {item.title}
      </h4>

        {/* ✅ Asli News Content (Excerpt) */}
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-8 italic">
        {item.data}
      </p>


      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-50 shadow-sm">
            {panchayat?.config?.avatar ? (
  <img src={panchayat.config.avatar} className="w-full h-full object-cover" alt="Admin" />
) : (
  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users size={14}/></div>
)}
           </div>
           <span className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Admin</span>
        </div>
        
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#112F20] text-white p-3 rounded-xl hover:bg-red-700 transition-all group/btn flex items-center justify-center"
        >
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </div>
);

export default function LeaderWebsiteClient({ panchayat, news }: { panchayat?: any; news?: any[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSupportSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/site/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slug: panchayat.slug }),
      });
      if (res.ok) {
        alert("🙏 Dhanyawad! Aapka samarthan neta ji tak pahunch gaya hai.");
        setFormData({ name: "", phone: "", message: "" });
        setIsModalOpen(false);
      }
    } catch (err) { alert("❌ Fail!"); }
    finally { setLoading(false); }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  if (!isMounted) return null;

    // 🔴 SUSPEND LOGIC START (Ise yahan paste karo)
  if (panchayat?.status === "suspended") {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center relative z-9999">
            <div className="max-w-md w-full bg-slate-900 border-2 border-red-500/30 p-12 rounded-[3rem] shadow-2xl shadow-red-900/20">
                <XCircle size={60} className="text-red-500 mx-auto mb-8" />
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic Teko">Website Suspended</h1>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed mb-10 Oswald">
                   Suraaksha aur prashasanik kaarano se is Gram Panchayat ki digital sevaayein temporary rok di gayi hain. 
                   <br/> <span className="text-red-400 mt-2 block font-black underline italic">Sampark: Admin Office</span>
                </p>
                <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase text-slate-600 tracking-[5px] Oswald">
                    RAJGRAM SECURITY HUB
                </div>
            </div>
        </div>
    );
  }
  // 🔴 SUSPEND LOGIC END

  const name = panchayat?.name || "The Bharat Project";
  const colors = { red: "#A12A1E", green: "#112F20", yellow: "#F4EBD0", white: "#FAF9F6" };
  const globalAlert = panchayat?.global_alert || "";

  const getYT = (url?: any) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <main className="bg-[#FAF9F6] font-sans antialiased overflow-x-hidden relative text-left">
      
       {/* 🔴 RUNNING GLOBAL ALERT */}
{globalAlert && (
  <div className="bg-[#A12A1E] text-white py-2 overflow-hidden sticky top-0 z-1001 shadow-lg border-b border-white/10">
    <div className="flex whitespace-nowrap">
      <div className="animate-marquee flex">
        {/* Content ko 2 baar repeat kiya hai taaki loop seamless lage */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-10 flex items-center gap-2 font-black uppercase text-[11px] tracking-[4px] Oswald">
            <ShieldAlert size={14} className="text-white fill-white/20"/> {globalAlert}
          </span>
        ))}
        {[...Array(10)].map((_, i) => (
          <span key={`dup-${i}`} className="mx-10 flex items-center gap-2 font-black uppercase text-[11px] tracking-[4px] Oswald">
            <ShieldAlert size={14} className="text-white fill-white/20"/> {globalAlert}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

     {/* 🟢 NAVBAR - Optimized for Mobile (Connect hidden on mobile nav) */}
<Navbar 
  panchayat={panchayat} 
  scrolled={scrolled} 
  globalAlert={globalAlert} 
  setIsModalOpen={setIsModalOpen} 
/>

{/* 1. HOME / HERO SECTION - Centered and Notch Proof */}
<section 
  id="home" 
  className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F6]"
>
  {/* Desktop Background */}
  <div 
    className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/sitebg.jpeg')" }}
  >
    <div className="absolute inset-0 bg-black/5"></div>
  </div>
  
  {/* Mobile Background - High Performance Cover */}
  <div 
    className="absolute inset-0 block md:hidden w-full h-full"
    style={{
      backgroundImage: "url('/images/mobilebg.jpeg')",
      backgroundSize: 'cover', // contain se better hai cover mobile ke liye
      backgroundPosition: 'center 20%', // Image ko thoda niche se dikhayega taaki notch na kate
      backgroundRepeat: 'no-repeat',
    }}
  >
  </div>

  {/* Content Container - No fixed negative margins */}
  <div className="relative z-10 w-full px-4 py-12 mb-14 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
    
    <div className="text-center w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl">
      
      {/* Subtitle "The" */}
      <div className="mb-1">
        <p className="text-[10px] sm:text-xs md:text-sm font-black text-[#112F20] tracking-[3px] sm:tracking-[6px] md:tracking-[8px] uppercase opacity-70">
          The
        </p>
        
        {/* Main Title - Scaled for Small Devices */}
        <h1 
          className="text-[48px] xs:text-[56px] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] leading-[0.85] text-[#A12A1E] drop-shadow-sm uppercase font-bold"
          style={{ fontFamily: "'Teko', sans-serif" }}
        >
          {panchayat?.name || "UCCAIN"}
        </h1>
      </div>
      
      {/* Hindi Tagline - Scaled for Mobile */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 md:my-8">
        <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#A12A1E]/40"></div>
        <p 
          className="text-[11px] xs:text-[13px] sm:text-lg md:text-2xl lg:text-3xl font-bold text-[#112F20] whitespace-nowrap px-2"
          style={{ fontFamily: "'Hind', sans-serif" }}
        >
          <span className="text-orange-600">●</span> बनो जागरूक… बदलो गांव <span className="text-orange-600">●</span>
        </p>
        <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#A12A1E]/40"></div>
      </div>

      {/* Bio Quote - Smaller on narrow screens for better readability */}
      <div className="max-w-[95%] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-10">
        <p className="text-[10px] xs:text-[12px] sm:text-sm md:text-base lg:text-lg text-slate-700 font-medium italic leading-relaxed opacity-90 px-1">
          "{panchayat?.bio || "A manifesto is a public explanation of the views, motives, and intentions..."}"
        </p>
      </div>
      
      {/* CTA Button - Standardized size */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-8 py-3.5 sm:px-12 sm:py-4 bg-[#064235] text-white rounded-full font-bold text-[10px] sm:text-sm uppercase tracking-[2px] shadow-lg hover:bg-[#A12A1E] transition-all duration-300 active:scale-95"
      >
        Join The Movement
      </button>

    </div>
  </div>
</section>

{/* ⚡ 2. BREAKING NEWS TICKER - Fixed overlap */}
{news && news.length > 0 && (
  <div className="w-full bg-red-600 border-y-2 border-slate-100 overflow-hidden flex items-center shadow-lg relative z-20">
     <div className="bg-blue-700 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-r-2xl text-[10px] sm:text-sm font-black uppercase flex items-center gap-2 shrink-0 z-10 shadow-md">
        <Zap size={14} fill="white" className="animate-pulse shrink-0"/> 
        <span className="whitespace-nowrap">Breaking News</span>
     </div>
     <div className="flex text-white whitespace-nowrap overflow-hidden w-full py-2 sm:py-3">
        <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center min-w-max"
        >
            {news.map((item: any, i: number) => (
                <span key={i} className="mx-6 sm:mx-12 text-xs sm:text-lg font-black uppercase tracking-wider text-white flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {item.title}
                </span>
            ))}
            {/* Duplication for seamless loop */}
            {news.map((item: any, i: number) => (
                <span key={`dup-${i}`} className="mx-6 sm:mx-12 text-xs sm:text-lg font-black uppercase tracking-wider text-white flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div> {item.title}
                </span>
            ))}
        </motion.div>
     </div>
  </div>
)}

{/* 🖼️ 3. HERO BANNER - Fixed height for all devices */}
<section className="relative w-full py-8 sm:py-16 px-4 md:px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full  xs:h-[280px] overflow-hidden shadow-2xl"
    >
      <img 
        src={panchayat?.config?.banner || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"} 
        className="w-full h-full object-cover" 
        alt="Main Banner" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 text-left">
        <p className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[4px] sm:tracking-[8px] mb-1 sm:mb-2 opacity-80">
          Gram Panchayat
        </p>
        <h2 className="text-white text-2xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none drop-shadow-xl">
          {name}
        </h2>
      </div>
    </motion.div>
  </div>
</section>

{/*  🟢 MAP TICKETS SECTION - Full Width with Custom Background */}
{/* <PanchayatMap panchayat={panchayat} /> */}
      
      {/* 🟢 HISTORY SECTION - With Quatrefoil Image Frame */ }
<section id="history" className="relative py-20 lg:py-32 bg-[#FAF9F6] px-6 overflow-hidden border-t border-slate-200" 
  style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}>
  
  <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10 text-left">
      
      {/* LEFT SIDE: Heading + Text */}
      <div className="space-y-10" data-aos="fade-right">
        {/* Heading Section */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-[80px] font-black leading-[0.85] text-[#112F20] uppercase tracking-tighter Teko">
            The History of  <br/>   
            <span className="text-[#A12A1E]">{panchayat?.name || "UCCAIN"}</span>
          </h2>
          {/* Simple Separator Line */}
          <div className="h-1 w-20 bg-red-700"></div>
        </div>

        {/* History Content */}
        <div className="text-l md:text-xl text-slate-700 leading-relaxed Oswald" 
             style={{ whiteSpace: 'pre-wrap' }}>
          {panchayat.history || "Panchayat ka itihas yahan dikhega..."}
        </div>
      </div>

      {/* RIGHT SIDE: Simple Square Photo */}
      <div className="flex justify-center lg:justify-end lg:sticky lg:top-32" data-aos="zoom-in">
        <div className="w-full h-[60vh] object-cover">
         {panchayat?.config?.historyImg ? (
  <img src={panchayat.config.historyImg} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" alt="History Square Photo" />
) : (
  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic uppercase font-black text-xs">History Photo</div>
)}
        </div>
      </div>

  </div>
</section>

      {/* 🟢 GEOGRAPHY SECTION (Replica of Why Bharat Section) */}
<div className="relative">
  {/* TOP SCALLOPED BORDER */}
  <div 
    className="w-full h-12 bg-white" 
    style={{ 
      maskImage: "radial-gradient(circle at 15px -10px, transparent 20px, black 21px)",
      WebkitMaskImage: "radial-gradient(circle at 15px -10px, transparent 20px, black 21px)",
      maskSize: "30px ",
      backgroundColor: "#A12A1E" 
    }}
  />

  <section id="geography" className="bg-[#A12A1E] text-white py-16 lg:py-24 px-6 relative overflow-hidden">
    <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT: Text Content */}
        <div className="space-y-8 text-left" data-aos="fade-right">
          <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] Teko">
<span className="text-[#F4EBD0]">{panchayat?.name}</span>, <br/> Geography
          </h2>
          
          <div className="space-y-6 text-l md:text-xl font-medium leading-relaxed opacity-90 Oswald">
             <p>{panchayat.geography || "Since 2008, we have championed change. Bharat needs access, mentorship, and funding."}</p>
            
          </div>
        </div>

        {/* RIGHT: Image with Left ZigZag Frame */}
        <div className="relative group" data-aos="fade-left">
           <div className="relative bg-white p-0 shadow-2xl overflow-hidden">
              {/* Pink ZigZag Border on Left Side */}
              {/* <ImageZigZag /> */}
              
              {panchayat?.config?.economyImg ? (
  <img src={panchayat.config.economyImg} className="w-full h-[60vh] object-cover" alt="Economy" />
) : (
  <div className="w-full h-[60vh] bg-slate-100 flex items-center justify-center text-slate-300 italic uppercase font-black text-xs">Economy Photo</div>
)}
           </div>
           
           {/* Decorative Shadow/Offset border */}
           <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-white/20 -z-10 rounded-sm"></div>
        </div>

    </div>
  </section>
</div>

      {/* 🟢 ECONOMY SECTION - Style Matched with History/Geography */}
{/* <ScallopedDivider color={colors.red} top={true} /> */}
<section id="economy" className="bg-[#A12A1E] text-white py-16 lg:py-24 px-6 relative overflow-hidden">
  
  {/* 🌌 THREE.JS BACKGROUND */}
  {/* <OptimizedCanvas>
    <ambientLight intensity={0.8} />
    <pointLight position={[10, 10, 10]} color="#F4EBD0" />
    <ProsperityNodes />
  </OptimizedCanvas> */}

  <div className=" mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
      
      {/* 📜 TEXT CONTENT (Matched with History style) */}
      <div className="space-y-8">
          <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tighter">
            LOCAL <span className="text-[#F4EBD0] italic"><br/>ECONOMY</span>
          </h2>
          
          <p className="space-y-6 text-l md:text-xl font-medium leading-relaxed opacity-90 Oswald">
            {panchayat.economy}
          </p>
      </div>

      {/* 🖼️ IMAGE CONTENT */}
      <div className="flex justify-center">
          <TiltCard>
            <div className="w-full h-[60vh] object-cover">
               {panchayat?.config?.geographyImg ? (
  <img src={panchayat.config.geographyImg} className="w-full h-87.5 md:h-112.5 object-cover contrast-125 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Geography View" />
) : (
  <div className="w-full h-87.5 md:h-112.5 bg-slate-100 flex items-center justify-center text-slate-300 italic uppercase font-black text-xs">Geography Photo</div>
)}
            </div>
          </TiltCard>
      </div>
  </div>
</section>
{/* <ScallopedDivider color={colors.red} /> */}

      {/* 🟢 GALLERY SECTION - Full Image Cover & Smooth Mobile Flow */}
<section id="gallery" className="relative py-16 lg:py-28 bg-white px-0 md:px-6 overflow-hidden">
  
  {/* 🌌 THREE.JS BACKGROUND */}
  <OptimizedCanvas>
    {/* <ambientLight intensity={0.5} /> */}
    <GalleryAmbience />
  </OptimizedCanvas>

  <div className=" mx-auto text-center relative z-10">
    {/* 🏷️ Header */}
    <div className="px-6 mb-12 lg:mb-20">
      <h2 className="text-4xl lg:text-[60px] font-black uppercase text-[#112F20] leading-none Oswald">
        THE <span className="text-red-700 italic">GALLERY</span>
      </h2>
      <div className="flex justify-center items-center gap-3 mt-4">
        <span className="h-0.5 w-10 bg-red-700 opacity-30"></span>
        <p className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">Captured Moments</p>
        <span className="h-0.5 w-10 bg-red-700 opacity-30"></span>
      </div>
    </div>

    {/* --- 🖥️ DESKTOP VIEW: FULL COVER GRID --- */}
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
      {panchayat?.config?.gallery?.map((img: string, i: number) => (
        <motion.div 
          key={i} 
          whileHover={{ y: -8 }}
          onClick={() => setLightboxImg(img)} 
          className="cursor-pointer group relative"
        >
          <TiltCard>
            <div className="relative aspect-square overflow-hidden bg-slate-100 rounded-2xl shadow-lg border border-slate-100">
              {/* Image filling 100% of the container */}
              <img 
                src={img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                loading="lazy" 
                alt="Gallery"
              />
              {/* High-end hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#112F20]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                 <p className="text-white text-[10px] font-black uppercase tracking-[3px]">View Full Story</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>

    {/* --- 📱 MOBILE VIEW: EDGE-TO-EDGE COVER CAROUSEL --- */}
    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-0 no-scrollbar">
      {panchayat?.config?.gallery?.map((img: string, i: number) => (
        <div
          key={i}
          onClick={() => setLightboxImg(img)}
          className="snap-center min-w-full px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-3/4 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            {/* Image as a full cover background */}
            <img 
              src={img} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Gallery Mobile" 
            />
            

          </motion.div>
        </div>
      ))}
    </div>

    {/* Mobile Progress Line */}
    <div className="md:hidden w-1/2 h-0.5 bg-slate-100 mx-auto mt-10 relative overflow-hidden">
        <motion.div 
           className="absolute top-0 left-0 h-full bg-red-700 w-full"
           initial={{ x: "-100%" }}
           whileInView={{ x: "0%" }}
           transition={{ duration: 1 }}
        />
    </div>

  </div>

  
</section>

      {/* 🎥 VIDEOS SECTION — Soft Pastel Style */}
{panchayat?.config?.videos?.length > 0 && (
<section
  id="videos"
  className="py-24 px-6 bg-linear-to-b from-[#FAF9F6] via-[#F4EBD0] to-[#EBC3D4]"
>
  <div className=" mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-6xl font-black Oswald text-[#112F20]">
        Village <span className="text-red-700">Stories</span>
      </h2>
      <p className="mt-4 text-slate-600 max-w-xl mx-auto">
        Real moments, real people — directly from our Panchayat.
      </p>
    </div>

    {/* Desktop Grid */}
    <div className="hidden md:grid grid-cols-2 gap-10">
      {panchayat.config.videos.map((url: string, i: number) => {
        const vidId = getYT(url)
        return vidId ? (
          <div
            key={i}
            className="rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200"
          >
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${vidId}`}
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : null
      })}
    </div>

    {/* Mobile Carousel */}
    <div className="md:hidden flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar">
      {panchayat.config.videos.map((url: string, i: number) => {
        const vidId = getYT(url)
        return vidId ? (
          <div key={i} className="snap-center min-w-[90%]">
            <div className="rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${vidId}`}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        ) : null
      })}
    </div>

  </div>
</section>
)}


      {/* 🟢 NEWS SECTION */}
{news && news.length > 0 && (
  <section id="news" className="relative lg:py-32 py-16 bg-[#f8fafc] px-6 overflow-hidden border-t">
    
    {/* Grid Dots Background */}
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" 
         style={{ backgroundImage: `radial-gradient(#112F20 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    
    <OptimizedCanvas>
      <ambientLight intensity={0.5} /><NewsDataStream />
    </OptimizedCanvas>

    <div className=" mx-auto relative z-10 text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-20 border-l-4 border-red-700 pl-6">
        <div>
          <h2 className="text-4xl lg:text-7xl font-black text-[#112F20] uppercase tracking-tighter Oswald">
            NEWS <span className="text-slate-400 font-light">Updates</span>
          </h2>
          <p className="text-[10px] md:text-xs font-black text-red-700 tracking-[5px] md:tracking-[10px] uppercase mt-2">
            Latest from the ground
          </p>
        </div>
        <div className="block md:hidden mt-4 text-[9px] font-black uppercase tracking-widest text-slate-400 animate-pulse">
          Swipe to explore →
        </div>
      </div>

      {/* 🖥️ DESKTOP VIEW: MASONRY GRID */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {news.map((item: any, i: number) => (
          <div key={i} className={`${i % 2 === 1 ? 'lg:mt-16' : ''}`}>
            <TiltCard>
              <NewsCard item={item} panchayat={panchayat} />
            </TiltCard>
          </div>
        ))}
      </div>

      {/* 📱 MOBILE VIEW: MODERN CAROUSEL */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar px-2">
        {news.map((item: any, i: number) => (
          <div key={i} className="snap-center min-w-[85vw] h-full">
            <NewsCard item={item} panchayat={panchayat} />
          </div>
        ))}
      </div>

    </div>

  </section>
)}

      <Footer panchayat={panchayat} />

      {/* MODAL & LIGHTBOX */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#112F20]/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-xl bg-white rounded-[3rem] p-12 shadow-2xl"><button className="absolute top-8 right-8 text-slate-300" onClick={() => setIsModalOpen(false)}><X size={32}/></button><h2 className="text-4xl font-black mb-8 italic">Support Now</h2>{/* --- 1. Form tag dhundo aur onSubmit jodo --- */}
<form onSubmit={handleSupportSubmit} className="space-y-4">
    <input 
        required 
        type="text" 
        placeholder="Full Name" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-4 rounded-xl border-2 font-bold focus:border-red-700 outline-none text-slate-800 Oswald" 
    />
    
    <input 
        required 
        type="tel" 
        placeholder="Mobile" 
        value={formData.phone} 
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-4 rounded-xl border-2 font-bold focus:border-red-700 outline-none text-slate-800 Oswald" 
    />
    
    <textarea 
        required 
        placeholder="Message..." 
        value={formData.message} 
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-4 rounded-xl border-2 h-32 font-bold focus:border-red-700 outline-none resize-none text-slate-800 Oswald" 
    />

    {/* --- 2. Button ka type 'submit' hona chahiye --- */}
    <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-5 bg-[#112F20] text-white font-black uppercase rounded-2xl shadow-xl hover:bg-red-700 transition-all Oswald"
    >
        {loading ? "Wait..." : "Submit Support"}
    </button>
</form></motion.div>
          </div>
        )}
        {lightboxImg && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-3000 flex items-center justify-center bg-black/90 p-4" onClick={()=>setLightboxImg(null)}><img src={lightboxImg} className="max-h-full rounded-2xl shadow-2xl" /></motion.div>
        )}
      </AnimatePresence>

      
    {/* 🪄 NO-SCROLLBAR CSS (Ise section ke andar hi rakhein) */}
    {/* Google Font Import (Sirf Hindi ke liye) */}
  <style jsx global>{`
  /* 1. FONT IMPORTS */
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&family=Playfair+Display:ital,wght@0,700;1,700&family=Hind:wght@600&family=Oswald:wght@400;700&display=swap');

  /* 2. FONT UTILITIES */
  .Teko { font-family: 'Teko', sans-serif !important; }
  .Hind { font-family: 'Hind', sans-serif !important; }
  .Playfair { font-family: 'Playfair Display', serif !important; }
  .Oswald { font-family: 'Oswald', sans-serif !important; }

  /* 3. 🏃 RUNNING GLOBAL ALERT (MARQUEE) ANIMATION */
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-30%); }
  }

  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 25s linear infinite;
  }

  .marquee-container {
    width: 100%;
    overflow: hidden;
  }

  /* Hover karne par alert ruk jayega (Optional) */
  .animate-marquee:hover {
    animation-play-state: paused;
  }

  /* 4. PREMIUM CUSTOM SCROLLBAR */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #A12A1E; /* Aapka Red Theme Color */
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #7a1f16;
  }

  /* 5. GLOBAL SMOOTHNESS */
  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Faltu space hatane ke liye (Mobile fix) */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
    </main>
  );
}


//deepseek
// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
// import { 
//   X, Menu, ShieldAlert, ArrowRight, Play, Globe, Camera, Calendar,
//   Landmark, Map, PieChart, Zap, School, HeartPulse, Wifi,
//   ChevronRight,
//   Users,
//   XCircle,
//   Home,
//   BookOpen,
//   MapPin,
//   DollarSign,
//   Images,
//   Newspaper,
//   Phone,
//   Mail,
//   Clock,
//   Shield,
//   Award,
//   Target,
//   Building,
//   FileText,
//   CheckCircle,
//   UsersIcon
// } from "lucide-react";

// // --- THREE.JS IMPORTS ---
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
// import Footer from "./footer";

// // 🔥 OPTIMIZED CANVAS COMPONENT
// const OptimizedCanvas = ({ children, camera }: { children?: any; camera?: any }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { amount: 0.1 });

//   return (
//     <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
//       {isInView && (
//         <Canvas 
//           dpr={[1, 1.2]}
//           gl={{ antialias: false, powerPreference: "high-performance", alpha: true }} 
//           camera={camera || undefined}
//         >
//           {children}
//         </Canvas>
//       )}
//     </div>
//   );
// };

// // 🏛️ GOVERNMENT STYLE COMPONENTS
// const GovernmentBadge = ({ children, color = "#112F20" }: { children: React.ReactNode, color?: string }) => (
//   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-200 shadow-sm">
//     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
//     <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{children}</span>
//   </div>
// );

// const OfficialSeal = ({ size = 60 }: { size?: number }) => (
//   <div className="relative">
//     <div className="rounded-full border-4 border-amber-500 p-2">
//       <div className="rounded-full border-2 border-amber-400 p-3 flex items-center justify-center">
//         <Shield size={size * 0.5} className="text-amber-600" />
//       </div>
//     </div>
//     <div className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-20"></div>
//   </div>
// );

// // 📊 STATS CARD FOR GOVERNMENT
// const StatsCard = ({ icon: Icon, value, label, color }: any) => (
//   <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center">
//     <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${color}15` }}>
//       <Icon size={24} style={{ color }} />
//     </div>
//     <div className="text-3xl font-black text-slate-800 mb-1">{value}</div>
//     <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
//   </div>
// );

// // --- TILT EFFECT ---
// const TiltCard = ({ children }: { children?: any }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
//   const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

//   return (
//     <motion.div 
//       onMouseMove={(e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         x.set(e.clientX / rect.width - 0.5);
//         y.set(e.clientY / rect.height - 0.5);
//       }} 
//       onMouseLeave={() => { x.set(0); y.set(0); }}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       className="w-full h-full"
//     >
//       {children}
//     </motion.div>
//   );
// };

// // --- ECONOMY COMPONENTS ---
// function ProsperityNodes() {
//   const groupRef = useRef<any>(null);
//   useFrame((state: any) => {
//     if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
//   });
//   return (
//     <group ref={groupRef}>
//       {[...Array(10)].map((_, i) => (
//         <Float key={i} speed={2}>
//           <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, -5]}>
//             <boxGeometry args={[0.3, 0.3, 0.3]} />
//             <meshStandardMaterial color="#0D4B2D" metalness={0.8} roughness={0.2} emissive="#0D4B2D" emissiveIntensity={0.2} />
//           </mesh>
//         </Float>
//       ))}
//     </group>
//   );
// }

// function NewsDataStream() {
//   const groupRef = useRef<any>(null);
//   useFrame((state: any) => { 
//     if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08; 
//   });
//   return (
//     <group ref={groupRef}>
//       {[...Array(12)].map((_, i) => (
//         <Float key={i} speed={2}>
//           <mesh position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10, -6]}>
//             <sphereGeometry args={[0.04, 6, 6]} />
//             <meshStandardMaterial color="#0D4B2D" opacity={0.15} transparent />
//           </mesh>
//         </Float>
//       ))}
//     </group>
//   );
// }

// // --- DIVIDER ---
// const ScallopedDivider = ({ color, top = false }: { color?: any; top?: boolean }) => (
//   <div 
//     className={`w-full h-10 relative z-20 ${top ? '-mb-10' : '-mt-10'}`} 
//     style={{ 
//       backgroundColor: color,
//       maskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
//       maskSize: "30px 40px",
//       WebkitMaskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
//       WebkitMaskSize: "30px 40px",
//     }} 
//   />
// );

// const NewsCard = ({ item, panchayat }: { item: any; panchayat: any }) => (
//   <div className="group bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-slate-300">
//     <div className="relative overflow-hidden aspect-video">
//       <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="News" />
//       <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
//         <p className="text-[9px] font-black text-[#0D4B2D] uppercase">
//           {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
//         </p>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
//         <span className="text-[10px] font-bold uppercase tracking-widest text-white">Official Bulletin</span>
//       </div>
//     </div>

//     <div className="p-5">
//       <div className="flex items-center gap-2 mb-3">
//         <FileText size={12} className="text-slate-400" />
//         <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Govt. Notification</span>
//       </div>

//       <h4 className="text-lg font-bold text-slate-800 leading-tight mb-3 line-clamp-2">
//         {item.title}
//       </h4>

//       <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
//         {item.data}
//       </p>

//       <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
//             <Shield size={14} className="text-slate-600" />
//           </div>
//           <span className="text-xs font-semibold text-slate-700">Official Source</span>
//         </div>
        
//         <a 
//           href={item.link} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="bg-[#0D4B2D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#0A3A23] transition-colors flex items-center gap-2"
//         >
//           View Details <ArrowRight size={14} />
//         </a>
//       </div>
//     </div>
//   </div>
// );

// export default function LeaderWebsiteClient({ panchayat, news }: { panchayat?: any; news?: any[] }) {
//   const themeColor = panchayat?.config?.themeColor || "#0D4B2D";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [lightboxImg, setLightboxImg] = useState<string | null>(null);

//   // 🏛️ GOVERNMENT COLORS
//   const govtColors = {
//     primary: "#0D4B2D", // Dark Green (Government Green)
//     secondary: "#1E40AF", // Official Blue
//     accent: "#DC2626",   // Red for alerts
//     light: "#F8FAFC",    // Light background
//     dark: "#1E293B",     // Dark text
//     gold: "#D97706"      // For seals and badges
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (!isMounted) return null;

//   // 🔴 SUSPENSION LOGIC
//   if (panchayat?.status === "suspended") {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl">
//           <OfficialSeal size={80} />
//           <h1 className="text-3xl font-black text-white uppercase mt-8 mb-4 text-center">Website Suspended</h1>
//           <p className="text-slate-300 text-center mb-8 leading-relaxed">
//             This Gram Panchayat portal has been temporarily suspended due to administrative reasons.
//           </p>
//           <div className="bg-white/5 p-4 rounded-lg border border-white/10">
//             <p className="text-white text-sm text-center">
//               For inquiries, contact the District Administration Office.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const name = panchayat?.name || "Digital Gram Panchayat";
//   const globalAlert = panchayat?.global_alert || "";

//   // 🎯 GOVERNMENT STATISTICS DATA
//   const govtStats = [
//     { icon: UsersIcon, value: "15,000+", label: "Citizens Served", color: govtColors.primary },
//     { icon: Home, value: "1,200+", label: "Houses", color: govtColors.secondary },
//     { icon: DollarSign, value: "₹25 Cr", label: "Annual Budget", color: govtColors.gold },
//     { icon: CheckCircle, value: "98%", label: "Scheme Coverage", color: "#059669" },
//   ];

//   return (
//     <main className="bg-gray-50 font-sans antialiased overflow-x-hidden relative">
//       {/* 🔴 GOVERNMENT ALERT BAR */}
//       {globalAlert && (
//         <div className="bg-red-600 text-white py-3 overflow-hidden sticky top-0 z-50 border-b border-red-700">
//           <div className="container mx-auto px-4 flex items-center justify-center gap-3">
//             <ShieldAlert size={18} className="flex-shrink-0" />
//             <div className="flex-1 text-center">
//               <span className="font-bold text-sm uppercase tracking-wide">
//                 {globalAlert}
//               </span>
//             </div>
//             <Clock size={16} className="flex-shrink-0" />
//           </div>
//         </div>
//       )}

//       {/* 🏛️ OFFICIAL GOVERNMENT HEADER */}
//       <header className={`fixed w-full ${scrolled ? 'bg-white/95 shadow-lg' : 'bg-white/90'} backdrop-blur-md z-40 transition-all duration-300 border-b border-slate-200`}>
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* GOVERNMENT LOGO */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-[#0D4B2D] to-[#1E40AF] rounded-lg flex items-center justify-center">
//                   <Landmark size={24} className="text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg font-bold text-slate-800 leading-tight">
//                     {name}
//                   </h1>
//                   <p className="text-xs text-slate-500 font-medium">
//                     Government of India • Official Portal
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* DESKTOP NAVIGATION */}
//             <nav className="hidden lg:flex items-center gap-8">
//               {[
//                 { icon: Home, label: 'Home', href: '#home' },
//                 { icon: BookOpen, label: 'About', href: '#history' },
//                 { icon: MapPin, label: 'Geography', href: '#geography' },
//                 { icon: DollarSign, label: 'Economy', href: '#economy' },
//                 { icon: Images, label: 'Gallery', href: '#gallery' },
//                 { icon: Newspaper, label: 'News', href: '#news' }
//               ].map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#0D4B2D] transition-colors group"
//                 >
//                   <item.icon size={16} />
//                   <span>{item.label}</span>
//                   <span className="h-0.5 w-0 group-hover:w-full bg-[#0D4B2D] transition-all duration-300"></span>
//                 </a>
//               ))}
              
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-[#0D4B2D] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0A3A23] transition-colors flex items-center gap-2"
//               >
//                 <Phone size={16} />
//                 Contact Us
//               </button>
//             </nav>

//             {/* MOBILE MENU BUTTON */}
//             <button 
//               onClick={() => setIsMenuOpen(true)} 
//               className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* 1. HERO SECTION - GOVERNMENT STYLE */}
//       <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
//         {/* OFFICIAL PATTERN BACKGROUND */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230d4b2d' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//             backgroundSize: '300px'
//           }}></div>
//         </div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* LEFT CONTENT */}
//             <div>
//               <GovernmentBadge color={govtColors.primary}>
//                 Official Government Portal
//               </GovernmentBadge>
              
//               <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mt-6 mb-6 leading-tight">
//                 Welcome to
//                 <span className="block text-[#0D4B2D]">
//                   {panchayat?.name || "Digital Gram"}
//                 </span>
//                 Panchayat
//               </h1>
              
//               <p className="text-xl text-slate-600 mb-8 leading-relaxed">
//                 Official digital platform for transparent governance, citizen services, 
//                 and community development initiatives.
//               </p>
              
//               <div className="flex flex-wrap gap-4">
//                 <button 
//                   onClick={() => setIsModalOpen(true)}
//                   className="bg-[#0D4B2D] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#0A3A23] transition-colors flex items-center gap-3"
//                 >
//                   <Users size={20} />
//                   Citizen Services
//                 </button>
//                 <a 
//                   href="#news"
//                   className="bg-white text-slate-800 px-8 py-3.5 rounded-lg font-bold border-2 border-slate-200 hover:border-[#0D4B2D] transition-all flex items-center gap-3"
//                 >
//                   <Newspaper size={20} />
//                   Latest Updates
//                 </a>
//               </div>
//             </div>

//             {/* RIGHT CONTENT - OFFICIAL SEAL */}
//             <div className="flex justify-center">
//               <div className="relative">
//                 <OfficialSeal size={120} />
//                 <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
//                   <div className="text-center">
//                     <div className="text-sm font-bold text-slate-700 mb-1">Since</div>
//                     <div className="text-2xl font-black text-[#0D4B2D]">1947</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🎯 GOVERNMENT STATISTICS */}
//       <section className="py-12 bg-white border-y border-slate-200">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {govtStats.map((stat, index) => (
//               <StatsCard key={index} {...stat} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 🏛️ HISTORY SECTION */}
//       <section id="history" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
//                 About <span className="text-[#0D4B2D]">Our</span> Panchayat
//               </h2>
//               <div className="prose prose-lg max-w-none">
//                 <p className="text-lg text-slate-700 leading-relaxed mb-6">
//                   {panchayat?.history || "Our panchayat has a rich history of community governance and development. Established as part of India's local self-government system, we have been serving citizens with dedication and transparency."}
//                 </p>
//                 <div className="bg-slate-100 p-6 rounded-lg border-l-4 border-[#0D4B2D]">
//                   <p className="text-slate-700 italic">
//                     "Committed to providing efficient public services and fostering community development through transparent governance."
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <img 
//                 src={panchayat?.config?.historyImg || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f"} 
//                 className="w-full h-96 object-cover rounded-xl shadow-lg"
//                 alt="Panchayat Office"
//               />
//               <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg border border-slate-200">
//                 <Target size={24} className="text-[#0D4B2D] mb-2" />
//                 <div className="text-sm font-bold text-slate-700">Our Mission</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🗺️ GEOGRAPHY SECTION */}
//       <section id="geography" className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <GovernmentBadge color={govtColors.primary}>Geographical Information</GovernmentBadge>
//             <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-4">
//               Location & <span className="text-[#0D4B2D]">Demographics</span>
//             </h2>
//           </div>
          
//           <div className="grid lg:grid-cols-2 gap-12">
//             <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-200">
//               <Map className="text-[#0D4B2D] mb-6" size={48} />
//               <h3 className="text-2xl font-bold text-slate-900 mb-4">Geographical Features</h3>
//               <p className="text-slate-700 mb-6">
//                 {panchayat?.geography || "Located in the fertile plains with rich agricultural land, our panchayat covers an area of 25 square kilometers. The region is blessed with natural water resources and favorable climate for year-round cultivation."}
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-slate-50 p-4 rounded-lg">
//                   <div className="text-sm text-slate-500">Area</div>
//                   <div className="text-xl font-bold text-slate-900">25 sq km</div>
//                 </div>
//                 <div className="bg-slate-50 p-4 rounded-lg">
//                   <div className="text-sm text-slate-500">Population</div>
//                   <div className="text-xl font-bold text-slate-900">15,000+</div>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <img 
//                 src={panchayat?.config?.geographyImg || "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"} 
//                 className="w-full h-96 object-cover rounded-xl shadow-lg"
//                 alt="Geographical View"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 💰 ECONOMY SECTION */}
//       <section id="economy" className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <PieChart className="text-[#0D4B2D]" size={32} />
//                 <GovernmentBadge color={govtColors.gold}>Economic Development</GovernmentBadge>
//               </div>
//               <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
//                 Local <span className="text-[#0D4B2D]">Economy</span>
//               </h2>
//               <p className="text-lg text-slate-700 leading-relaxed mb-8">
//                 {panchayat?.economy || "Our economy thrives on agriculture, small-scale industries, and tourism. With strategic government initiatives and community participation, we have achieved sustainable economic growth and improved living standards."}
//               </p>
              
//               <div className="space-y-4">
//                 {[
//                   "Agricultural Development Programs",
//                   "Small Business Support",
//                   "Skill Development Initiatives",
//                   "Tourism Promotion"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <CheckCircle size={20} className="text-green-600" />
//                     <span className="text-slate-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <OptimizedCanvas>
//               <ambientLight intensity={0.5} />
//               <ProsperityNodes />
//             </OptimizedCanvas>
//           </div>
//         </div>
//       </section>

//       {/* 🖼️ GALLERY SECTION */}
//       <section id="gallery" className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
//               Official <span className="text-[#0D4B2D]">Gallery</span>
//             </h2>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Documenting our development journey and community initiatives
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {panchayat?.config?.gallery?.slice(0, 8).map((img: string, i: number) => (
//               <div 
//                 key={i} 
//                 className="relative group cursor-pointer overflow-hidden rounded-lg"
//                 onClick={() => setLightboxImg(img)}
//               >
//                 <img 
//                   src={img} 
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                   alt="Gallery"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 📰 NEWS SECTION */}
//       {news && news.length > 0 && (
//         <section id="news" className="py-20 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-12">
//               <div>
//                 <GovernmentBadge color={govtColors.primary}>Latest Updates</GovernmentBadge>
//                 <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
//                   Official <span className="text-[#0D4B2D]">Bulletin</span>
//                 </h2>
//               </div>
//               <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
//                 <Clock size={16} />
//                 <span>Updated daily</span>
//               </div>
//             </div>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {news.slice(0, 6).map((item: any, i: number) => (
//                 <NewsCard key={i} item={item} panchayat={panchayat} />
//               ))}
//             </div>
            
//             <div className="text-center mt-12">
//               <button className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold border border-slate-300 hover:border-[#0D4B2D] hover:text-[#0D4B2D] transition-all">
//                 View All Updates
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* FOOTER */}
//       <Footer panchayat={panchayat} />

//       {/* CONTACT MODAL */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
//             >
//               <div className="p-8">
//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-900">Contact Us</h3>
//                     <p className="text-slate-600">Gram Panchayat Office</p>
//                   </div>
//                   <button 
//                     onClick={() => setIsModalOpen(false)}
//                     className="p-2 hover:bg-slate-100 rounded-lg"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
                
//                 <form className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-2">
//                       Full Name
//                     </label>
//                     <input 
//                       type="text" 
//                       className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0D4B2D]"
//                       placeholder="Enter your name"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-2">
//                       Mobile Number
//                     </label>
//                     <input 
//                       type="tel" 
//                       className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0D4B2D]"
//                       placeholder="Enter mobile number"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-2">
//                       Message
//                     </label>
//                     <textarea 
//                       className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0D4B2D] h-32"
//                       placeholder="Your message..."
//                     />
//                   </div>
                  
//                   <button 
//                     type="submit"
//                     className="w-full bg-[#0D4B2D] text-white py-3.5 rounded-lg font-bold hover:bg-[#0A3A23] transition-colors"
//                   >
//                     Submit Request
//                   </button>
//                 </form>
                
//                 <div className="mt-8 pt-8 border-t border-slate-200">
//                   <div className="flex items-center gap-3 text-slate-600">
//                     <Phone size={18} />
//                     <span>Helpline: 1800-XXX-XXXX</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-slate-600 mt-2">
//                     <Mail size={18} />
//                     <span>contact@grampanchayat.gov.in</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* LIGHTBOX */}
//       <AnimatePresence>
//         {lightboxImg && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
//             onClick={() => setLightboxImg(null)}
//           >
//             <div className="relative max-w-4xl w-full">
//               <img 
//                 src={lightboxImg} 
//                 className="w-full h-auto rounded-lg"
//                 alt="Full view"
//               />
//               <button 
//                 className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm"
//                 onClick={() => setLightboxImg(null)}
//               >
//                 <X size={24} className="text-white" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//               onClick={() => setIsMenuOpen(false)}
//             />
            
//             <motion.div 
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25 }}
//               className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-2xl"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-[#0D4B2D] to-[#1E40AF] rounded-lg flex items-center justify-center">
//                       <Landmark size={20} className="text-white" />
//                     </div>
//                     <span className="font-bold text-slate-800">Menu</span>
//                   </div>
//                   <button 
//                     onClick={() => setIsMenuOpen(false)}
//                     className="p-2 hover:bg-slate-100 rounded-lg"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
                
//                 <nav className="space-y-1">
//                   {[
//                     { icon: Home, label: 'Home', href: '#home' },
//                     { icon: BookOpen, label: 'About', href: '#history' },
//                     { icon: MapPin, label: 'Geography', href: '#geography' },
//                     { icon: DollarSign, label: 'Economy', href: '#economy' },
//                     { icon: Images, label: 'Gallery', href: '#gallery' },
//                     { icon: Newspaper, label: 'News', href: '#news' }
//                   ].map((item) => (
//                     <a
//                       key={item.label}
//                       href={item.href}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#0D4B2D] transition-colors"
//                     >
//                       <item.icon size={20} />
//                       <span className="font-medium">{item.label}</span>
//                     </a>
//                   ))}
//                 </nav>
                
//                 <div className="mt-8 pt-8 border-t border-slate-200">
//                   <button 
//                     onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
//                     className="w-full bg-[#0D4B2D] text-white py-3 rounded-lg font-semibold hover:bg-[#0A3A23] transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Phone size={20} />
//                     Contact Us
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* GLOBAL STYLES */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        
//         body {
//           font-family: 'Inter', sans-serif;
//         }
        
//         h1, h2, h3, h4, h5, h6 {
//           font-family: 'Inter', sans-serif;
//         }
        
//         .container {
//           max-width: 1200px;
//         }
        
//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 10px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: #0D4B2D;
//           border-radius: 5px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: #0A3A23;
//         }
//       `}</style>
//     </main>
//   );
// }






// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
// import { 
//   X, Menu, ShieldAlert, ArrowRight, Play, Globe, Camera, Calendar,
//   Landmark, Map, PieChart, Zap, School, HeartPulse, Wifi,
//   ChevronRight,
//   Users,
//   XCircle,
//   FileText,
//   Phone,
//   Mail,
//   Clock,
//   Shield,
//   Award,
//   Building,
//   CheckCircle,
//   Newspaper
// } from "lucide-react";

// // --- THREE.JS IMPORTS ---
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
// import Footer from "./footer";

// // 🔥 OPTIMIZATION COMPONENT
// const OptimizedCanvas = ({ children, camera }: { children?: any; camera?: any }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { amount: 0.1 });

//   return (
//     <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
//       {isInView && (
//         <Canvas 
//           dpr={[1, 1.2]}
//           gl={{ antialias: false, powerPreference: "high-performance", alpha: true }} 
//           camera={camera || undefined}
//         >
//           {children}
//         </Canvas>
//       )}
//     </div>
//   );
// };

// // --- 4. TILT EFFECT ---
// const TiltCard = ({ children }: { children?: any }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
//   const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

//   return (
//     <motion.div 
//       onMouseMove={(e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         x.set(e.clientX / rect.width - 0.5);
//         y.set(e.clientY / rect.height - 0.5);
//       }} 
//       onMouseLeave={() => { x.set(0); y.set(0); }}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       className="w-full h-full"
//     >
//       {children}
//     </motion.div>
//   );
// };

// // --- 6. ECONOMY COMPONENTS ---
// function ProsperityNodes() {
//   const groupRef = useRef<any>(null);
//   useFrame((state: any) => {
//     if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
//   });
//   return (
//     <group ref={groupRef}>
//       {[...Array(10)].map((_, i) => (
//         <Float key={i} speed={2}>
//           <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, -5]}>
//             <boxGeometry args={[0.3, 0.3, 0.3]} />
//             <meshStandardMaterial color="#0D4B2D" metalness={0.8} roughness={0.2} emissive="#0D4B2D" emissiveIntensity={0.2} />
//           </mesh>
//         </Float>
//       ))}
//     </group>
//   );
// }

// function GalleryAmbience() {
//   const groupRef = useRef<any>(null);
//   useFrame((state: any) => { 
//     if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05; 
//   });
//   return (
//     <group ref={groupRef}>
//       {[...Array(15)].map((_, i) => (
//         <Float key={i} speed={2}>
//           <mesh position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, -10]}>
//             <sphereGeometry args={[0.05, 12, 12]} />
//             <meshStandardMaterial color="#0D4B2D" opacity={0.2} transparent />
//           </mesh>
//         </Float>
//       ))}
//     </group>
//   );
// }

// function NewsDataStream() {
//   const groupRef = useRef<any>(null);
//   useFrame((state: any) => { 
//     if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08; 
//   });
//   return (
//     <group ref={groupRef}>
//       {[...Array(12)].map((_, i) => (
//         <Float key={i} speed={2}>
//           <mesh position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10, -6]}>
//             <sphereGeometry args={[0.04, 6, 6]} />
//             <meshStandardMaterial color="#0D4B2D" opacity={0.15} transparent />
//           </mesh>
//         </Float>
//       ))}
//     </group>
//   );
// }

// // --- DIVIDER ---
// const ScallopedDivider = ({ color, top = false }: { color?: any; top?: boolean }) => (
//   <div 
//     className={`w-full h-10 relative z-20 ${top ? '-mb-10' : '-mt-10'}`} 
//     style={{ 
//       backgroundColor: color,
//       maskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
//       maskSize: "30px 40px",
//       WebkitMaskImage: `radial-gradient(circle at 15px ${top ? '40px' : '0px'}, transparent 15px, black 16px)`,
//       WebkitMaskSize: "30px 40px",
//     }} 
//   />
// );

// const NewsCard = ({ item, panchayat }: { item: any; panchayat: any }) => (
//   <div className="group bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:border-slate-300">
//     <div className="relative overflow-hidden aspect-video">
//       <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="News" />
//       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
//          <p className="text-[10px] font-bold text-[#0D4B2D] uppercase">
//            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
//          </p>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
//         <span className="text-xs font-bold uppercase tracking-widest text-white">Official Update</span>
//       </div>
//     </div>

//     <div className="p-6 flex-1 flex flex-col">
//       <div className="flex items-center gap-3 mb-4">
//         <span className="h-px w-6 bg-red-700"></span>
//         <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Government Notification</span>
//       </div>

//       <h4 className="text-xl font-bold text-slate-800 leading-tight mb-4 line-clamp-2 group-hover:text-red-700 transition-colors">
//         {item.title}
//       </h4>

//       <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-8">
//         {item.data}
//       </p>

//       <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
//             {panchayat?.config?.avatar ? (
//               <img src={panchayat.config.avatar} className="w-full h-full object-cover" alt="Admin" />
//             ) : (
//               <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
//                 <Users size={14}/>
//               </div>
//             )}
//            </div>
//            <span className="text-xs font-bold text-slate-700">Official Source</span>
//         </div>
        
//         <a 
//           href={item.link} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="bg-[#0D4B2D] text-white p-3 rounded-xl hover:bg-red-700 transition-all group/btn flex items-center justify-center"
//         >
//           <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
//         </a>
//       </div>
//     </div>
//   </div>
// );

// export default function LeaderWebsiteClient({ panchayat, news }: { panchayat?: any; news?: any[] }) {
//   const themeColor = panchayat?.config?.themeColor || "#0D4B2D"; 
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isMounted, setIsMounted] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [lightboxImg, setLightboxImg] = useState<string | null>(null);

//   // 🏛️ GOVERNMENT COLORS (Original ke similar but more official)
//   const colors = { 
//     red: "#DC2626",      // Brighter red for alerts
//     green: "#0D4B2D",    // Official government green
//     yellow: "#F4EBD0", 
//     white: "#FAF9F6",
//     blue: "#1E40AF",     // Government blue
//     dark: "#1E293B"      // Dark for text
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (!isMounted) return null;

//   // 🔴 SUSPEND LOGIC START
//   if (panchayat?.status === "suspended") {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6 text-center relative z-9999">
//         <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-red-500 flex items-center justify-center">
//             <Shield size={40} className="text-red-500" />
//           </div>
//           <h1 className="text-3xl font-black text-white uppercase mb-4">Website Suspended</h1>
//           <p className="text-slate-300 font-medium text-sm mb-8 leading-relaxed">
//             This Gram Panchayat portal has been temporarily suspended due to administrative reasons.
//           </p>
//           <div className="bg-white/5 p-4 rounded-lg border border-white/10">
//             <p className="text-white text-sm">
//               For inquiries, contact the District Administration Office.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   // 🔴 SUSPEND LOGIC END

//   const name = panchayat?.name || "The Bharat Project";
//   const globalAlert = panchayat?.global_alert || "";

//   const getYT = (url?: any) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url?.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   return (
//     <main className="bg-[#FAF9F6] font-sans antialiased overflow-x-hidden relative text-left">
      
//       {/* 🔴 RUNNING GLOBAL ALERT - Government Style */}
//       {globalAlert && (
//         <div className="bg-red-600 text-white py-3 overflow-hidden sticky top-0 z-1001 shadow-lg border-b border-white/10">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-center gap-3">
//               <ShieldAlert size={18} className="flex-shrink-0" />
//               <div className="marquee-container overflow-hidden">
//                 <div className="animate-marquee flex whitespace-nowrap">
//                   {[...Array(10)].map((_, i) => (
//                     <span key={i} className="mx-10 flex items-center gap-3 font-bold uppercase text-sm tracking-wide">
//                       <div className="w-2 h-2 rounded-full bg-white"></div> 
//                       {globalAlert}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <Clock size={16} className="flex-shrink-0" />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🏛️ NAVBAR - Government Style */}
//       <nav className={`fixed ${scrolled ? 'top-4' : globalAlert ? 'top-12' : 'top-6'} left-1/2 -translate-x-1/2 w-[95%] z-1000 transition-all duration-500`}>
//         <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl px-4 md:px-6 py-3 flex justify-between items-center border border-slate-200">
          
//           {/* 🍔 MOBILE HAMBURGER */}
//           <div className="lg:hidden flex items-center">
//             <button 
//               onClick={() => setIsMenuOpen(true)} 
//               className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
//             >
//               <Menu size={24} />
//             </button>
//           </div>

//           {/* 🏛️ LOGO AREA - Government Style */}
//           <div className="flex items-center gap-3 flex-1 lg:flex-none justify-center lg:justify-start">
//             {panchayat?.config?.avatar && (
//               <div className="relative">
//                 <img src={panchayat.config.avatar} className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border-2 border-[#0D4B2D]" alt="Avatar" />
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0D4B2D] rounded-full flex items-center justify-center">
//                   <Shield size={8} className="text-white" />
//                 </div>
//               </div>
//             )}
//             <div className="leading-none text-left">
//               <h1 className="text-sm md:text-base font-bold text-slate-800 uppercase">{name}</h1>
//               <span className="text-[10px] font-semibold text-slate-500 uppercase">Official Portal</span>
//             </div>
//           </div>

//           {/* 🖥️ DESKTOP NAV LINKS - Government Style */}
//           <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wide text-slate-700">
//             {['Home', 'History', 'Geography', 'Economy', 'Gallery', 'News'].map(id => (
//               <a key={id} href={`#${id.toLowerCase()}`} className="hover:text-[#0D4B2D] transition-colors relative group">
//                 {id}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0D4B2D] transition-all group-hover:w-full"></span>
//               </a>
//             ))}
//           </div>

//           {/* 🔘 CONNECT BUTTON - Government Style */}
//           <button 
//             onClick={() => setIsModalOpen(true)} 
//             className="hidden lg:flex bg-[#0D4B2D] text-white px-6 py-2.5 rounded-lg text-xs font-semibold uppercase shadow-lg hover:bg-red-700 transition-all hover:scale-105 items-center gap-2"
//           >
//             <Phone size={14} />
//             Contact
//           </button>
          
//           <div className="w-10 lg:hidden"></div>
//         </div>

//         {/* 📱 MOBILE OVERLAY MENU - Government Style */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <>
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="fixed inset-0 bg-black/60 z-2000 lg:hidden"
//               />
              
//               <motion.div 
//                 initial={{ x: "-100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "-100%" }}
//                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                 className="fixed top-0 left-0 h-screen w-[80%] max-w-75 bg-white shadow-2xl z-2001 lg:hidden flex flex-col p-6 text-left"
//               >
//                 {/* 🔝 Government Seal in Mobile Menu */}
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-[#0D4B2D] to-[#1E40AF] rounded-lg flex items-center justify-center">
//                       <Landmark size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-bold text-slate-800">Menu</div>
//                       <div className="text-[10px] text-slate-500">Government Portal</div>
//                     </div>
//                   </div>
                  
//                   <button 
//                     onClick={() => setIsMenuOpen(false)} 
//                     className="p-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-700 hover:text-white transition-all"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 {/* Links */}
//                 <div className="flex flex-col gap-1 overflow-y-auto">
//                   {['Home', 'History', 'Geography', 'Economy', 'Gallery', 'News'].map((id, idx) => (
//                     <motion.a
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.05 * idx }}
//                       key={id}
//                       href={`#${id.toLowerCase()}`}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="py-4 px-4 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0D4B2D] transition-all flex items-center justify-between group"
//                     >
//                       {id}
//                       <ChevronRight size={14} className="text-slate-300 group-hover:text-[#0D4B2D]" />
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* Contact Button in Mobile Menu */}
//                 <div className="mt-auto pt-6 border-t border-slate-200">
//                   <button 
//                     onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
//                     className="w-full bg-[#0D4B2D] text-white py-3 rounded-lg font-semibold hover:bg-[#0A3A23] transition-all flex items-center justify-center gap-2"
//                   >
//                     <Phone size={16} />
//                     Contact Office
//                   </button>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* 1. HOME / HERO SECTION - Government Style */}
//       <section id="home" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
        
//         {/* Government Pattern Background */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230d4b2d' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//             backgroundSize: '300px'
//           }}></div>
//         </div>

//         <div className="relative z-10 w-full px-4 py-12 mb-14 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
//           <div className="text-center w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl">
            
//             {/* Government Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 mb-8">
//               <div className="w-2 h-2 rounded-full bg-[#0D4B2D]"></div>
//               <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Official Government Portal</span>
//             </div>
            
//             {/* Main Title */}
//             <div className="mb-1">
//               <h1 
//                 className="text-[48px] xs:text-[56px] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] leading-[0.85] text-[#0D4B2D] drop-shadow-sm uppercase font-black"
//                 style={{ fontFamily: "'Teko', sans-serif" }}
//               >
//                 {panchayat?.name || "UCCAIN"}
//               </h1>
//             </div>
            
//             {/* Tagline */}
//             <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 md:my-8">
//               <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#0D4B2D]/40"></div>
//               <p 
//                 className="text-[11px] xs:text-[13px] sm:text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 whitespace-nowrap px-2"
//                 style={{ fontFamily: "'Hind', sans-serif" }}
//               >
//                 <span className="text-[#0D4B2D]">●</span> बनो जागरूक… बदलो गांव <span className="text-[#0D4B2D]">●</span>
//               </p>
//               <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-[#0D4B2D]/40"></div>
//             </div>

//             {/* Bio Quote */}
//             <div className="max-w-[95%] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-10">
//               <p className="text-[10px] xs:text-[12px] sm:text-sm md:text-base lg:text-lg text-slate-600 font-medium italic leading-relaxed opacity-90 px-1">
//                 "{panchayat?.bio || "A manifesto is a public explanation of the views, motives, and intentions..."}"
//               </p>
//             </div>
            
//             {/* CTA Button */}
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className="px-8 py-3.5 sm:px-12 sm:py-4 bg-[#0D4B2D] text-white rounded-lg font-bold text-sm uppercase tracking-[2px] shadow-lg hover:bg-red-700 transition-all duration-300 active:scale-95 flex items-center gap-3 mx-auto"
//             >
//               <Users size={18} />
//               Citizen Services Portal
//             </button>

//           </div>
//         </div>
//       </section>

//       {/* ⚡ 2. BREAKING NEWS TICKER - Government Style */}
//       {news && news.length > 0 && (
//         <div className="w-full bg-red-600 border-y border-slate-200 overflow-hidden flex items-center shadow-lg relative z-20">
//           <div className="bg-[#0D4B2D] text-white px-4 py-3 sm:px-6 sm:py-3 rounded-r-lg text-sm font-bold uppercase flex items-center gap-2 shrink-0 z-10 shadow-md">
//             <Zap size={16} fill="white" className="animate-pulse shrink-0"/> 
//             <span className="whitespace-nowrap">Government Alert</span>
//           </div>
//           <div className="flex text-white whitespace-nowrap overflow-hidden w-full py-2 sm:py-3">
//             <motion.div 
//               animate={{ x: ["0%", "-50%"] }} 
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="flex items-center min-w-max"
//             >
//               {news.map((item: any, i: number) => (
//                 <span key={i} className="mx-6 sm:mx-12 text-sm sm:text-lg font-bold uppercase tracking-wider text-white flex items-center gap-3">
//                   <div className="w-2 h-2 rounded-full bg-white"></div> {item.title}
//                 </span>
//               ))}
//               {news.map((item: any, i: number) => (
//                 <span key={`dup-${i}`} className="mx-6 sm:mx-12 text-sm sm:text-lg font-bold uppercase tracking-wider text-white flex items-center gap-3">
//                   <div className="w-2 h-2 rounded-full bg-white"></div> {item.title}
//                 </span>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       )}

//       {/* 🖼️ 3. HERO BANNER - Government Style */}
//       <section className="relative w-full py-8 sm:py-16 px-4 md:px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.98 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             className="relative w-full xs:h-[280px] overflow-hidden shadow-xl rounded-xl border border-slate-200"
//           >
//             <img 
//               src={panchayat?.config?.banner || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"} 
//               className="w-full h-full object-cover" 
//               alt="Government Banner" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            
//             <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 text-left">
//               <p className="text-white text-xs sm:text-sm font-bold uppercase tracking-[4px] sm:tracking-[8px] mb-1 sm:mb-2 opacity-80">
//                 Gram Panchayat Office
//               </p>
//               <h2 className="text-white text-2xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none drop-shadow-xl">
//                 {name}
//               </h2>
//             </div>
            
//             {/* Government Seal Overlay */}
//             <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full">
//               <Building size={24} className="text-white" />
//             </div>
//           </motion.div>
//         </div>
//       </section>
      
//       {/* 🟢 HISTORY SECTION - Government Style */}
//       <section id="history" className="relative py-20 lg:py-32 bg-white px-6 overflow-hidden border-t border-slate-200">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10 text-left">
          
//           {/* LEFT SIDE: Heading + Text */}
//           <div className="space-y-10">
//             {/* Government Section Header */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 mb-4">
//                 <FileText size={32} className="text-[#0D4B2D]" />
//                 <div className="h-12 w-1 bg-[#0D4B2D]"></div>
//                 <h2 className="text-4xl md:text-[80px] font-black leading-[0.85] text-slate-800 uppercase tracking-tighter Teko">
//                   About <span className="text-[#0D4B2D]">{panchayat?.name || "UCCAIN"}</span>
//                 </h2>
//               </div>
//               <div className="h-1 w-20 bg-[#0D4B2D]"></div>
//             </div>

//             {/* History Content */}
//             <div className="text-lg md:text-xl text-slate-700 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
//               {panchayat.history || "Panchayat ka itihas yahan dikhega..."}
//             </div>
            
//             {/* Government Achievements */}
//             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
//               <div className="flex items-center gap-3 mb-4">
//                 <Award size={20} className="text-[#0D4B2D]" />
//                 <h4 className="font-bold text-slate-800">Key Achievements</h4>
//               </div>
//               <div className="space-y-2">
//                 {[
//                   "100% School Enrollment",
//                   "Digital Governance Implementation",
//                   "Clean Water Supply",
//                   "Road Connectivity"
//                 ].map((achievement, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <CheckCircle size={16} className="text-green-600" />
//                     <span className="text-sm text-slate-700">{achievement}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE: Government Photo */}
//           <div className="flex justify-center lg:justify-end lg:sticky lg:top-32">
//             <div className="relative">
//               <div className="w-full h-[60vh] overflow-hidden rounded-xl shadow-lg border border-slate-200">
//                 {panchayat?.config?.historyImg ? (
//                   <img src={panchayat.config.historyImg} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" alt="Government Office" />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                     <Building size={48} className="text-slate-300" />
//                   </div>
//                 )}
//               </div>
//               <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg border border-slate-200">
//                 <div className="text-center">
//                   <div className="text-xs text-slate-500">Established</div>
//                   <div className="text-xl font-bold text-[#0D4B2D]">1947</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🟢 GEOGRAPHY SECTION - Government Style */}
//       <div className="relative">
//         <ScallopedDivider color={colors.green} top={true} />
        
//         <section id="geography" className="bg-gradient-to-br from-[#0D4B2D] to-[#1a5337] text-white py-16 lg:py-24 px-6 relative overflow-hidden">
//           <OptimizedCanvas>
//             <ambientLight intensity={0.5} />
//             <pointLight position={[10, 10, 10]} color="#F4EBD0" />
//           </OptimizedCanvas>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
//             {/* LEFT: Text Content */}
//             <div className="space-y-8 text-left">
//               <div className="flex items-center gap-3">
//                 <Map size={40} className="text-[#F4EBD0]" />
//                 <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] Teko">
//                   <span className="text-[#F4EBD0]">Geographical</span> <br/> Profile
//                 </h2>
//               </div>
              
//               <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed opacity-90">
//                 <p>{panchayat.geography || "Located in the fertile plains with rich agricultural land, our panchayat covers an area of 25 square kilometers. The region is blessed with natural water resources and favorable climate for year-round cultivation."}</p>
                
//                 {/* Government Statistics */}
//                 <div className="grid grid-cols-2 gap-4 mt-8">
//                   <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
//                     <div className="text-2xl font-bold">25 sq km</div>
//                     <div className="text-sm opacity-80">Total Area</div>
//                   </div>
//                   <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
//                     <div className="text-2xl font-bold">15,000+</div>
//                     <div className="text-sm opacity-80">Population</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: Image */}
//             <div className="relative group">
//               <TiltCard>
//                 <div className="w-full h-[60vh] overflow-hidden rounded-xl shadow-2xl">
//                   {panchayat?.config?.geographyImg ? (
//                     <img src={panchayat.config.geographyImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Geographical View" />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                       <Map size={48} className="text-slate-300" />
//                     </div>
//                   )}
//                 </div>
//               </TiltCard>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* 🟢 ECONOMY SECTION - Government Style */}
//       <ScallopedDivider color={colors.green} top={true} />
//       <section id="economy" className="bg-gradient-to-br from-[#0D4B2D] to-[#1a5337] text-white py-16 lg:py-24 px-6 relative overflow-hidden">
        
//         {/* 🌌 THREE.JS BACKGROUND */}
//         <OptimizedCanvas>
//           <ambientLight intensity={0.8} />
//           <pointLight position={[10, 10, 10]} color="#F4EBD0" />
//           <ProsperityNodes />
//         </OptimizedCanvas>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
          
//           {/* 📜 TEXT CONTENT */}
//           <div className="space-y-8">
//             <div className="flex items-center gap-3">
//               <PieChart size={40} className="text-[#F4EBD0]" />
//               <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tighter">
//                 ECONOMIC <span className="text-[#F4EBD0] italic"><br/>DEVELOPMENT</span>
//               </h2>
//             </div>
            
//             <p className="space-y-6 text-lg md:text-xl font-medium leading-relaxed opacity-90">
//               {panchayat.economy || "Our economy thrives on agriculture, small-scale industries, and tourism. With strategic government initiatives and community participation, we have achieved sustainable economic growth and improved living standards."}
//             </p>
            
//             {/* Economic Indicators */}
//             <div className="space-y-4 mt-8">
//               {[
//                 "Agricultural Development Programs",
//                 "Small Business Support Schemes",
//                 "Skill Development Initiatives",
//                 "Tourism Promotion Plans"
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <CheckCircle size={20} className="text-green-300" />
//                   <span className="text-lg">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 🖼️ IMAGE CONTENT */}
//           <div className="flex justify-center">
//             <TiltCard>
//               <div className="w-full h-[60vh] overflow-hidden rounded-xl shadow-2xl border border-white/10">
//                 {panchayat?.config?.economyImg ? (
//                   <img src={panchayat.config.economyImg} className="w-full h-full object-cover contrast-125 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Economic Development" />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                     <PieChart size={48} className="text-slate-300" />
//                   </div>
//                 )}
//               </div>
//             </TiltCard>
//           </div>
//         </div>
//       </section>
//       <ScallopedDivider color={colors.green} />

//       {/* 🟢 GALLERY SECTION - Government Style */}
//       <section id="gallery" className="relative py-16 lg:py-28 bg-white px-0 md:px-6 overflow-hidden">
        
//         {/* 🌌 THREE.JS BACKGROUND */}
//         <OptimizedCanvas>
//           <GalleryAmbience />
//         </OptimizedCanvas>

//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           {/* 🏷️ Header */}
//           <div className="px-6 mb-12 lg:mb-20">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <Camera size={32} className="text-[#0D4B2D]" />
//               <h2 className="text-4xl lg:text-[60px] font-black uppercase text-slate-800 leading-none">
//                 OFFICIAL <span className="text-[#0D4B2D]">GALLERY</span>
//               </h2>
//             </div>
//             <div className="flex justify-center items-center gap-3 mt-4">
//               <span className="h-0.5 w-10 bg-[#0D4B2D] opacity-30"></span>
//               <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Documenting Development</p>
//               <span className="h-0.5 w-10 bg-[#0D4B2D] opacity-30"></span>
//             </div>
//           </div>

//           {/* --- 🖥️ DESKTOP VIEW --- */}
//           <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//             {panchayat?.config?.gallery?.map((img: string, i: number) => (
//               <motion.div 
//                 key={i} 
//                 whileHover={{ y: -8 }}
//                 onClick={() => setLightboxImg(img)} 
//                 className="cursor-pointer group relative"
//               >
//                 <TiltCard>
//                   <div className="relative aspect-square overflow-hidden bg-slate-100 rounded-xl shadow-lg border border-slate-200">
//                     <img 
//                       src={img} 
//                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
//                       loading="lazy" 
//                       alt="Government Gallery"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
//                       <p className="text-white text-sm font-bold uppercase">View Official Photo</p>
//                     </div>
//                   </div>
//                 </TiltCard>
//               </motion.div>
//             ))}
//           </div>

//           {/* --- 📱 MOBILE VIEW --- */}
//           <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-0 no-scrollbar">
//             {panchayat?.config?.gallery?.map((img: string, i: number) => (
//               <div
//                 key={i}
//                 onClick={() => setLightboxImg(img)}
//                 className="snap-center min-w-full px-6"
//               >
//                 <motion.div
//                   initial={{ scale: 0.9, opacity: 0.8 }}
//                   whileInView={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                   className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white"
//                 >
//                   <img 
//                     src={img} 
//                     className="absolute inset-0 w-full h-full object-cover" 
//                     alt="Gallery Mobile" 
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
//                     <p className="text-white text-sm font-bold">Official Photo {i + 1}</p>
//                   </div>
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 🎥 VIDEOS SECTION — Government Style */}
//       {panchayat?.config?.videos?.length > 0 && (
//         <section id="videos" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
//           <div className="max-w-7xl mx-auto">
//             {/* Government Video Header */}
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-4">
//                 <Play size={16} className="text-[#0D4B2D]" />
//                 <span className="text-sm font-bold uppercase tracking-wider text-slate-700">Official Videos</span>
//               </div>
//               <h2 className="text-4xl lg:text-6xl font-bold text-slate-800">
//                 Government <span className="text-[#0D4B2D]">Reports</span>
//               </h2>
//               <p className="mt-4 text-slate-600 max-w-xl mx-auto">
//                 Official videos documenting our development initiatives and community programs
//               </p>
//             </div>

//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-2 gap-8">
//               {panchayat.config.videos.map((url: string, i: number) => {
//                 const vidId = getYT(url)
//                 return vidId ? (
//                   <div key={i} className="rounded-xl overflow-hidden bg-white shadow-lg border border-slate-200">
//                     <div className="relative">
//                       <iframe
//                         className="w-full aspect-video"
//                         src={`https://www.youtube.com/embed/${vidId}`}
//                         loading="lazy"
//                         allowFullScreen
//                       />
//                       <div className="absolute top-4 left-4 bg-[#0D4B2D] text-white px-3 py-1 rounded text-xs font-bold uppercase">
//                         Official
//                       </div>
//                     </div>
//                   </div>
//                 ) : null
//               })}
//             </div>

//             {/* Mobile Carousel */}
//             <div className="md:hidden flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar">
//               {panchayat.config.videos.map((url: string, i: number) => {
//                 const vidId = getYT(url)
//                 return vidId ? (
//                   <div key={i} className="snap-center min-w-[90%]">
//                     <div className="rounded-xl overflow-hidden bg-white shadow-lg border border-slate-200">
//                       <iframe
//                         className="w-full aspect-video"
//                         src={`https://www.youtube.com/embed/${vidId}`}
//                         loading="lazy"
//                         allowFullScreen
//                       />
//                     </div>
//                   </div>
//                 ) : null
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 🟢 NEWS SECTION - Government Style */}
//       {news && news.length > 0 && (
//         <section id="news" className="relative lg:py-32 py-16 bg-gray-50 px-6 overflow-hidden border-t border-slate-200">
          
//           {/* Grid Dots Background */}
//           <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
//                style={{ backgroundImage: `radial-gradient(#0D4B2D 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
          
//           <OptimizedCanvas>
//             <ambientLight intensity={0.5} />
//             <NewsDataStream />
//           </OptimizedCanvas>

//           <div className="max-w-7xl mx-auto relative z-10 text-left">
            
//             {/* Government News Header */}
//             <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-20">
//               <div>
//                 <div className="flex items-center gap-3 mb-4">
//                   <Newspaper size={32} className="text-[#0D4B2D]" />
//                   <h2 className="text-4xl lg:text-7xl font-black text-slate-800 uppercase tracking-tighter">
//                     OFFICIAL <span className="text-slate-400">BULLETIN</span>
//                   </h2>
//                 </div>
//                 <p className="text-sm font-bold text-[#0D4B2D] uppercase tracking-wider">
//                   Latest Government Notifications
//                 </p>
//               </div>
//               <div className="block md:hidden mt-4 text-xs font-bold uppercase tracking-wider text-slate-500 animate-pulse">
//                 Swipe to explore →
//               </div>
//             </div>

//             {/* 🖥️ DESKTOP VIEW: MASONRY GRID */}
//             <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
//               {news.map((item: any, i: number) => (
//                 <div key={i} className={`${i % 2 === 1 ? 'lg:mt-16' : ''}`}>
//                   <TiltCard>
//                     <NewsCard item={item} panchayat={panchayat} />
//                   </TiltCard>
//                 </div>
//               ))}
//             </div>

//             {/* 📱 MOBILE VIEW: CAROUSEL */}
//             <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar px-2">
//               {news.map((item: any, i: number) => (
//                 <div key={i} className="snap-center min-w-[85vw] h-full">
//                   <NewsCard item={item} panchayat={panchayat} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer panchayat={panchayat} />

//       {/* 🏛️ GOVERNMENT CONTACT MODAL */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
//             <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0D4B2D]/95 backdrop-blur-md" />
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               className="relative w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl"
//             >
//               <div className="absolute top-6 right-6">
//                 <button className="p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsModalOpen(false)}>
//                   <X size={24} className="text-slate-600" />
//                 </button>
//               </div>
              
//               {/* Government Modal Header */}
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="w-12 h-12 bg-gradient-to-br from-[#0D4B2D] to-[#1E40AF] rounded-lg flex items-center justify-center">
//                   <Phone size={24} className="text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">Contact Gram Panchayat</h2>
//                   <p className="text-slate-600">Official Contact Form</p>
//                 </div>
//               </div>
              
//               <form className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Full Name
//                   </label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter your name" 
//                     className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-[#0D4B2D] focus:outline-none transition-colors"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Mobile Number
//                   </label>
//                   <input 
//                     type="tel" 
//                     placeholder="Enter mobile number" 
//                     className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-[#0D4B2D] focus:outline-none transition-colors"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Message
//                   </label>
//                   <textarea 
//                     placeholder="Type your message here..." 
//                     className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-[#0D4B2D] focus:outline-none h-32 transition-colors"
//                   />
//                 </div>
                
//                 <button className="w-full py-4 bg-[#0D4B2D] text-white font-bold uppercase rounded-lg shadow-lg hover:bg-red-700 transition-colors">
//                   Submit Request
//                 </button>
//               </form>
              
//               <div className="mt-8 pt-8 border-t border-slate-200">
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Phone size={16} />
//                     <span>Helpline: 1800-XXX-XXXX</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Mail size={16} />
//                     <span>contact@grampanchayat.gov.in</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
        
//         {lightboxImg && (
//           <motion.div 
//             initial={{opacity:0}} 
//             animate={{opacity:1}} 
//             exit={{opacity:0}} 
//             className="fixed inset-0 z-3000 flex items-center justify-center bg-black/90 p-4" 
//             onClick={()=>setLightboxImg(null)}
//           >
//             <div className="relative max-w-4xl w-full">
//               <img src={lightboxImg} className="w-full h-auto rounded-lg shadow-2xl" alt="Full view" />
//               <button 
//                 className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm"
//                 onClick={() => setLightboxImg(null)}
//               >
//                 <X size={24} className="text-white" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 🪄 GLOBAL STYLES */}
//       <style jsx global>{`
//         /* 1. FONT IMPORTS */
//         @import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&family=Playfair+Display:ital,wght@0,700;1,700&family=Hind:wght@600&family=Oswald:wght@400;700&display=swap');

//         /* 2. FONT UTILITIES */
//         .Teko { font-family: 'Teko', sans-serif !important; }
//         .Hind { font-family: 'Hind', sans-serif !important; }
//         .Playfair { font-family: 'Playfair Display', serif !important; }
//         .Oswald { font-family: 'Oswald', sans-serif !important; }

//         /* 3. 🏃 GOVERNMENT ALERT MARQUEE */
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-30%); }
//         }

//         .animate-marquee {
//           display: flex;
//           width: max-content;
//           animation: marquee 25s linear infinite;
//         }

//         .marquee-container {
//           width: 100%;
//           overflow: hidden;
//         }

//         /* 4. GOVERNMENT SCROLLBAR */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
//         ::-webkit-scrollbar-thumb {
//           background: #0D4B2D;
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: #0A3A23;
//         }

//         /* 5. GLOBAL SMOOTHNESS */
//         html {
//           scroll-behavior: smooth;
//         }

//         body {
//           overflow-x: hidden;
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//         }

//         /* 6. UTILITIES */
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         /* 7. GOVERNMENT CONTAINER */
//         .container {
//           max-width: 1200px;
//           margin-left: auto;
//           margin-right: auto;
//           padding-left: 1rem;
//           padding-right: 1rem;
//         }
//       `}</style>
//     </main>
//   );
// }