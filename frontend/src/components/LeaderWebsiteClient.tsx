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

// 🔥 OPTIMIZATION COMPONENT: Isse sirf dikhne wala Canvas hi chalega
const OptimizedCanvas = ({ children, camera = { position: [0, 0, 5], fov: 75 } }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 }); // Jab 10% dikhe tabhi chalao

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none">
      {isInView && (
        <Canvas 
          dpr={[1, 1.2]} // Performance ke liye resolution limit
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }} 
          camera={camera}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};

// --- 1. THREE.JS: DIGITAL PARTICLES ---
function ConnectivityNetwork() {
  const pointsRef = useRef();
  const particleCount = 1000; // Count thoda kam kiya smoothness ke liye
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#A12A1E" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

// --- 2. THREE.JS: LIQUID ORB ---
// function EnergyOrb() {
//   return (
//     <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
//       <Sphere args={[1, 64, 64]} scale={2.2} position={[0, 1, -3]}>
//         <MeshDistortMaterial color="#F4EBD0" speed={2} distort={0.3} radius={1} transparent opacity={0.6} />
//       </Sphere>
//     </Float>
//   );
// }

// --- 3. THREE.JS: HISTORY FRAGMENTS ---
function HistoryFragments() {
  const groupRef = useRef();
  useFrame((state) => { groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1; });
  return (
    <group ref={groupRef}>
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, -5]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#A12A1E" wireframe opacity={0.2} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// --- 4. TILT EFFECT ---
const TiltCard = ({ children }) => {
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

// --- 5. GEOGRAPHY COMPONENTS ---
function TopoTerrain() {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.05;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1 - 1.5;
  });
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.5, -5]}>
      <planeGeometry args={[15, 15, 30, 30]} />
      <meshStandardMaterial color="#112F20" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function GeographyNodes() {
    return (
        <group>
            {[...Array(8)].map((_, i) => (
                <Float key={i} speed={2}>
                    <mesh position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -8]}>
                        <octahedronGeometry args={[0.1, 0]} />
                        <meshStandardMaterial color="#A12A1E" opacity={0.2} transparent />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

// --- 6. ECONOMY COMPONENTS ---
function ProsperityNodes() {
  const groupRef = useRef();
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
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
  const groupRef = useRef();
  useFrame((state) => { groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05; });
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

function CyberStream() {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.05;
    groupRef.current.rotation.y = t * 0.05;
  });
  return (
    <group ref={groupRef}>
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={3}>
          <mesh position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, -5]}>
            <cylinderGeometry args={[0.005, 0.005, 5, 6]} />
            <meshStandardMaterial color="#A12A1E" emissive="#A12A1E" emissiveIntensity={1} transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function NewsDataStream() {
  const groupRef = useRef();
  useFrame((state) => { groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08; });
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
const ScallopedDivider = ({ color, top = false }) => (
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
        <span className="h-[1px] w-6 bg-red-700"></span>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Panchayat Hub</span>
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

const SectionScallop = () => (
  <div className="w-full h-10 overflow-hidden leading-none rotate-180">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-[#A12A1E]">
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".25"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
      <path d="M0,0V5.63c149.93,59,314.09,71.32,475.83,42.57,43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4,58.93,25.75,117,43.77,182.2,38.53,86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
    </svg>
  </div>
);

// Yeh image ke zigzag border ke liye hai
const ImageZigZag = () => (
  <div 
    className="absolute top-0 -left-4 h-full w-6 z-10" 
    style={{
      backgroundColor: "#FBCFE8", // Light Pink from image
      clipPath: "polygon(100% 0%, 100% 100%, 0% 95%, 100% 90%, 0% 85%, 100% 80%, 0% 75%, 100% 70%, 0% 65%, 100% 60%, 0% 55%, 100% 50%, 0% 45%, 100% 40%, 0% 35%, 100% 30%, 0% 25%, 100% 20%, 0% 15%, 100% 10%, 0% 5%)"
    }}
  />
);

export default function LeaderWebsiteClient({ panchayat, news }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

    // 🔴 SUSPEND LOGIC START (Ise yahan paste karo)
  if (panchayat?.status === "suspended") {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center relative z-[9999]">
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

  const getYT = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <main className="bg-[#FAF9F6] font-sans antialiased overflow-x-hidden relative text-left">
      
       {/* 🔴 RUNNING GLOBAL ALERT */}
{globalAlert && (
  <div className="bg-[#A12A1E] text-white py-2 overflow-hidden sticky top-0 z-[1001] shadow-lg border-b border-white/10">
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
<nav className={`fixed ${scrolled ? 'top-4' : globalAlert ? 'top-10' : 'top-20'} left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[1000] transition-all duration-500`}>
  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl px-4 md:px-6 py-3 flex justify-between items-center border border-black/5">
    
    {/* 🍔 MOBILE HAMBURGER (Left) */}
    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsMenuOpen(true)} 
        className="p-2 text-[#112F20] hover:bg-slate-100 rounded-lg transition-all"
      >
        <Menu size={24} />
      </button>
    </div>

    {/* 🏛️ LOGO AREA */}
    <div className="flex items-center gap-3 flex-1 lg:flex-none justify-center lg:justify-start">
     {panchayat?.config?.avatar && (
  <img src={panchayat.config.avatar} className="h-8 w-8 md:h-10 md:w-10 object-cover rounded-full border-2 border-red-700/20" alt="Avatar" />
)}
      <div className="leading-none text-left">
        <h1 className="text-xs md:text-sm font-black uppercase tracking-tighter Oswald">{name}</h1>
        <span className="text-[7px] md:text-[8px] font-bold text-slate-400 tracking-[2px] uppercase">Official Portal</span>
      </div>
    </div>

    {/* 🖥️ DESKTOP NAV LINKS (Hidden on Mobile) */}
    <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#112F20]">
      {['Home', 'History', 'Development', 'Geography', 'Economy', 'Gallery', 'News'].map(id => (
        <a key={id} href={`#${id.toLowerCase()}`} className="hover:text-red-700 transition-colors relative group">
          {id}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-700 transition-all group-hover:w-full"></span>
        </a>
      ))}
    </div>

    {/* 🔘 CONNECT BUTTON - 🔥 Yahan fix kiya hai: hidden lg:block (Mobile par gayab) */}
    <button 
      onClick={() => setIsModalOpen(true)} 
      className="hidden lg:flex bg-[#112F20] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-lg hover:bg-red-700 transition-all hover:scale-105"
    >
      Connect
    </button>
    
    {/* Mobile placeholder for alignment when button is hidden */}
    <div className="w-10 lg:hidden"></div>
  </div>

  {/* 📱 MOBILE OVERLAY MENU (Fixed Fit & No Blur) */}
  <AnimatePresence>
    {isMenuOpen && (
      <>
        {/* Backdrop (No blur) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-[2000] lg:hidden"
        />
        
        {/* Sidebar (Top-Left Fitted) */}
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 h-screen w-[80%] max-w-[300px] bg-white shadow-2xl z-[2001] lg:hidden flex flex-col p-6 text-left"
        >
          {/* 🔝 Connect Button ONLY here on Mobile */}
          <div className="flex items-center justify-between mb-10 gap-3">
            <button 
              onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
              className="flex-1 bg-[#112F20] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-[2px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Connect <ArrowRight size={14} />
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2.5 bg-slate-100 text-[#112F20] rounded-xl hover:bg-red-700 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 overflow-y-auto">
            {['Home', 'History', 'Development', 'Geography', 'Economy', 'Gallery', 'News'].map((id, idx) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                key={id}
                href={`#${id.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="py-4 px-4 rounded-xl text-sm font-bold uppercase tracking-widest text-[#112F20] hover:bg-slate-50 transition-all flex items-center justify-between group Oswald"
              >
                {id}
                <ChevronRight size={14} className="text-slate-200 group-hover:text-red-700" />
              </motion.a>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
             <Landmark size={16} className="text-red-700" />
             <p className="text-[9px] font-black uppercase text-[#112F20] Oswald">{name}</p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
</nav>

      <section id="home" className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
  
  {/* 1. BACKGROUND SWITCHER */}
  <div 
    className="absolute inset-0 hidden md:block bg-cover bg-center"
    style={{ backgroundImage: "url('/images/sitebg.jpeg')" }}
  />
  <div 
    className="absolute inset-0 block md:hidden bg-cover bg-center"
    style={{ backgroundImage: "url('/images/mobilebg.jpeg')" }}
  />

  {/* Content Area - Mobile par mt-0 karke content ko bilkul upar shift kiya hai */}
  <div className="z-10 text-center px-4 max-w-4xl mt-0 md:mt-[8%]">
    
    {/* Village Name Section - Mobile margins reduced */}
    <div className="mb-0 md:mb-4">
       <p className="text-[8px] md:text-sm font-black text-[#112F20] tracking-[3px] md:tracking-[8px] uppercase opacity-70">The</p>
       <h1 
         className="text-5xl md:text-[130px] leading-[0.8] text-[#A12A1E] drop-shadow-sm uppercase tracking-tighter"
         style={{ fontFamily: "'Teko', sans-serif" }}
       >
         {panchayat?.name || "UCCAIN"}
       </h1>
    </div>

    {/* Tagline - Very compact on mobile */}
    <div className="flex items-center justify-center gap-2 md:gap-4 my-1 md:my-5">
      <div className="h-[1px] w-4 md:w-10 bg-[#A12A1E]/30"></div>
      <p 
        className="text-[11px] md:text-3xl font-bold text-[#112F20]"
        style={{ fontFamily: "'Hind', sans-serif" }}
      >
        <span className="text-orange-600">●</span> होकर निडर... शुरूकर <span className="text-orange-600">●</span>
      </p>
      <div className="h-[1px] w-4 md:w-10 bg-[#A12A1E]/30"></div>
    </div>

    {/* Manifesto Text - (VVIP FIX FOR MOBILE OVERLAP) */}
    <div className="max-w-[90%] md:max-w-2xl mx-auto mb-4 md:mb-10">
      {/* 
          - text-[9px] is the magic size for long text on mobile.
          - Leading-tight to reduce vertical space.
      */}
      <p className="text-[9px] md:text-lg text-slate-700 font-medium italic leading-[1.3] md:leading-normal opacity-90">
        "{panchayat?.bio || "A manifesto is more than a mere document; it is a declaration of intent..."}"
      </p>
    </div>

    {/* Action Button - Compact padding for mobile */}
    <div className="flex flex-col items-center">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2.5 md:px-12 md:py-4 bg-[#064235] text-white rounded-full font-bold text-[9px] md:text-xs uppercase tracking-[2px] hover:bg-[#A12A1E] shadow-xl transition-all active:scale-95"
      >
        Join The Movement
      </button>
    </div>

  </div>
</section>

      {/* 🟢 HISTORY SECTION - With Quatrefoil Image Frame */ }
<section id="history" className="relative py-20 lg:py-32 bg-[#FAF9F6] px-6 overflow-hidden border-t border-slate-200" 
  style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}>
  
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10 text-left">
      
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
        <div className="w-full max-w-[500px] aspect-square bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200">
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
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
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
              <ImageZigZag />
              
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
<ScallopedDivider color={colors.red} top={true} />
<section id="economy" className="bg-[#A12A1E] text-white py-16 lg:py-24 px-6 relative overflow-hidden">
  
  {/* 🌌 THREE.JS BACKGROUND */}
  <OptimizedCanvas>
    <ambientLight intensity={0.8} />
    <pointLight position={[10, 10, 10]} color="#F4EBD0" />
    <ProsperityNodes />
  </OptimizedCanvas>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
      
      {/* 📜 TEXT CONTENT (Matched with History style) */}
      <div className="space-y-8">
          <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tighter">
            LOCAL <span className="text-[#F4EBD0] italic">ECONOMY</span>
          </h2>
          
          <p className="text-l lg:text-l text-white/90 border-l-8 border-[#F4EBD0] pl-4 py-3 bg-white/10 backdrop-blur-sm rounded-r-2xl leading-relaxed">
            {panchayat.economy}
          </p>
      </div>

      {/* 🖼️ IMAGE CONTENT */}
      <div className="flex justify-center">
          <TiltCard>
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10">
               {panchayat?.config?.geographyImg ? (
  <img src={panchayat.config.geographyImg} className="w-full h-[350px] md:h-[450px] object-cover contrast-125 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Geography View" />
) : (
  <div className="w-full h-[350px] md:h-[450px] bg-slate-100 flex items-center justify-center text-slate-300 italic uppercase font-black text-xs">Geography Photo</div>
)}
            </div>
          </TiltCard>
      </div>
  </div>
</section>
<ScallopedDivider color={colors.red} />

      {/* 🟢 GALLERY SECTION - Full Image Cover & Smooth Mobile Flow */}
<section id="gallery" className="relative py-16 lg:py-28 bg-white px-0 md:px-6 overflow-hidden">
  
  {/* 🌌 THREE.JS BACKGROUND */}
  <OptimizedCanvas>
    {/* <ambientLight intensity={0.5} /> */}
    <GalleryAmbience />
  </OptimizedCanvas>

  <div className="max-w-7xl mx-auto text-center relative z-10">
    {/* 🏷️ Header */}
    <div className="px-6 mb-12 lg:mb-20">
      <h2 className="text-4xl lg:text-[60px] font-black uppercase text-[#112F20] leading-none Oswald">
        THE <span className="text-red-700 italic">GALLERY</span>
      </h2>
      <div className="flex justify-center items-center gap-3 mt-4">
        <span className="h-[2px] w-10 bg-red-700 opacity-30"></span>
        <p className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">Captured Moments</p>
        <span className="h-[2px] w-10 bg-red-700 opacity-30"></span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
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
            className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-white"
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
    <div className="md:hidden w-1/2 h-[2px] bg-slate-100 mx-auto mt-10 relative overflow-hidden">
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
  className="py-24 px-6 bg-gradient-to-b from-[#FAF9F6] via-[#F4EBD0] to-[#EBC3D4]"
>
  <div className="max-w-6xl mx-auto">

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
      {panchayat.config.videos.map((url, i) => {
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
      {panchayat.config.videos.map((url, i) => {
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

    <div className="max-w-7xl mx-auto relative z-10 text-left">
      
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
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#112F20]/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-xl bg-white rounded-[3rem] p-12 shadow-2xl"><button className="absolute top-8 right-8 text-slate-300" onClick={() => setIsModalOpen(false)}><X size={32}/></button><h2 className="text-4xl font-black mb-8 italic">Support Now</h2><form className="space-y-4"><input type="text" placeholder="Full Name" className="w-full p-5 rounded-2xl border-2 font-bold" /><input type="tel" placeholder="Mobile" className="w-full p-5 rounded-2xl border-2 font-bold" /><textarea placeholder="Message..." className="w-full p-5 rounded-2xl border-2 h-32 font-bold" /><button className="w-full py-6 bg-[#112F20] text-white font-black uppercase rounded-2xl shadow-xl">SUBMIT</button></form></motion.div>
          </div>
        )}
        {lightboxImg && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/90 p-4" onClick={()=>setLightboxImg(null)}><img src={lightboxImg} className="max-h-full rounded-2xl shadow-2xl" /></motion.div>
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