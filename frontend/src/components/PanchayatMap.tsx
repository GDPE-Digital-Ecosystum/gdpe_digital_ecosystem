// "use client";
// import { useState, useEffect } from "react"; // ✅ Added useEffect & useState
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; // ✅ Added useMap
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { User, Mail, Phone, Info, MapPin, CheckCircle2, Navigation } from "lucide-react";
// import { motion } from "framer-motion";

// // ✅ Next.js Fix for Leaflet Icons
// const customIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // ✅ Component to handle map re-centering dynamically
// function RecenterMap({ position }: { position: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 13); // 13 is a good zoom level for village view
//     }
//   }, [position, map]);
//   return null;
// }

// export default function PanchayatMap({ panchayat }: any) {
//   // --- 🛰️ DYNAMIC LOCATION LOGIC ---
//   const [coords, setCoords] = useState<[number, number] | null>(null);
//   const [loadingMap, setLoadingMap] = useState(true);

//   const themeColor = panchayat?.config?.themeColor || "#112F20";
//   const { name, block, district } = panchayat;

//   useEffect(() => {
//     const getVillageCoords = async () => {
//       try {
//         // Rajasthan, India context mein search query
//         const query = `${name}, ${block}, ${district}, Rajasthan, India`;
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
//         );
//         const data = await res.json();

//         if (data && data.length > 0) {
//           setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//         } else {
//           // Fallback to District/Block if exact village not found
//           const fallbackRes = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(block + "," + district + ",Rajasthan")}&limit=1`
            
//           );
//           const fallbackData = await fallbackRes.json();
//           if (fallbackData && fallbackData.length > 0) {
//             setCoords([parseFloat(fallbackData[0].lat), parseFloat(fallbackData[0].lon)]);
//           }
//         }
//       } catch (err) {
//         console.error("Geocoding error:", err);
//       } finally {
//         setLoadingMap(false);
//       }
//     };

//     if (name) getVillageCoords();
//   }, [name, block, district]);

//   // ✅ DYNAMIC DATA: Database se aane wale assets
//   const assets = panchayat?.assets || [];
  
//   // Sidebar data from DB
//   const leader = {
//     name: panchayat?.leader_name || "Sarpanch Name",
//     img: panchayat?.config?.avatar || "https://via.placeholder.com/150",
//     phone: panchayat?.phone || "Not Available",
//     email: panchayat?.email || "Not Available"
//   };

//   const secretary = {
//     name: panchayat?.secretary_name || "GVA Adhikari",
//     phone: panchayat?.secretary_phone || "Not Available",
//     email: panchayat?.secretary_email || "Not Available"
//   };

//   return (
//     <section id="development" className="py-20 bg-white px-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-12 text-left border-l-8 pl-6" style={{ borderColor: themeColor }}>
//           <h2 className="text-sm font-black uppercase tracking-[10px] text-slate-400 mb-2 Oswald">Live Tracking</h2>
//           <h3 className="text-5xl lg:text-7xl font-black uppercase text-[#112F20] Teko leading-none uppercase">
//              {name} <span className="text-slate-400">Map</span>
//           </h3>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-[#FAF9F6]">
          
//           {/* --- LEFT SIDEBAR --- */}
//           <div className="lg:col-span-3 bg-[#112F20] text-white p-10 flex flex-col gap-12">
//             <div className="text-center">
//               <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-xl">
//                 <img src={leader.img} className="w-full h-full object-cover" alt="Sarpanch" />
//               </div>
//               <h4 className="text-xl font-black uppercase Oswald">{leader.name}</h4>
//               <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Sarpanch</p>
//               <div className="mt-4 text-left space-y-2 text-[11px] opacity-70 Oswald uppercase">
//                 <div className="flex items-center gap-2"><Phone size={12}/> {leader.phone}</div>
//                 <div className="flex items-center gap-2"><Mail size={12}/> {leader.email}</div>
//               </div>
//             </div>

//             <div className="text-center pt-8 border-t border-white/10">
//               <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white/10 mb-4 bg-slate-800 flex items-center justify-center">
//                  <User size={30} className="text-slate-500" />
//               </div>
//               <h4 className="text-md font-black uppercase Oswald">{secretary.name}</h4>
//               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Secretary (GVA)</p>
//               <div className="mt-4 text-left space-y-2 text-[10px] opacity-50 Oswald uppercase">
//                 <div className="flex items-center gap-2"><Phone size={10}/> {secretary.phone}</div>
//               </div>
//             </div>
//           </div>

//           {/* --- CENTER: DYNAMIC MAP --- */}
//           <div className="lg:col-span-9 h-[500px] md:h-[650px] relative z-10 border-l-8 border-white flex items-center justify-center bg-slate-100">
//             {loadingMap ? (
//                 <div className="text-center">
//                     <Navigation className="animate-bounce text-red-600 mx-auto mb-2" />
//                     <p className="text-xs font-black uppercase tracking-widest text-slate-400">Dhundh rahe hain...</p>
//                 </div>
//             ) : (
//                 <MapContainer 
//                   center={coords || [26.4499, 74.6399]} 
//                   zoom={13} 
//                   style={{ height: "100%", width: "100%" }}
//                   scrollWheelZoom={false}
//                 >
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  
//                   {/* ✅ Re-center map to village coordinates */}
//                   {coords && <RecenterMap position={coords} />}

//                   {/* Village HQ Marker */}
//                   {coords && (
//                       <Marker position={coords} icon={customIcon}>
//                           <Popup className="Oswald uppercase font-bold">
//                               {name} Panchayat HQ
//                           </Popup>
//                       </Marker>
//                   )}

//                   {/* Asset Markers */}
//                   {assets.map((asset: any) => (
//                     <Marker key={asset.id} position={[asset.lat, asset.lng]} icon={customIcon}>
//                       <Popup>
//                         <div className="w-48 font-sans p-0 overflow-hidden">
//                           {asset.img && <img src={asset.img} className="w-full h-24 object-cover mb-2 rounded-lg" />}
//                           <h5 className="font-black text-sm uppercase text-[#112F20] Oswald">{asset.name}</h5>
//                           <p className="text-[10px] font-bold text-red-700">{asset.cost}</p>
//                           <p className="text-[9px] text-slate-500 uppercase mt-1">{asset.cat}</p>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ))}
//                 </MapContainer>
//             )}
//           </div>
//         </div>

//         {/* --- BOTTOM: ASSET TABLE --- */}
//         <div className="mt-12 overflow-x-auto bg-white rounded-[2rem] border shadow-xl">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-slate-900 text-white">
//               <tr className="text-[10px] font-black uppercase tracking-[3px]">
//                 <th className="p-6">Asset Detail</th>
//                 <th className="p-6">Category</th>
//                 <th className="p-6">Funds Utilized</th>
//                 <th className="p-6 text-right">Progress</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {assets.length > 0 ? assets.map((asset: any) => (
//                 <tr key={asset.id} className="hover:bg-slate-50 transition-all group">
//                   <td className="p-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-red-700"><MapPin size={18}/></div>
//                       <span className="font-bold text-[#112F20] uppercase Oswald">{asset.name}</span>
//                     </div>
//                   </td>
//                   <td className="p-6 text-xs font-bold text-slate-400 uppercase Oswald">{asset.cat}</td>
//                   <td className="p-6 font-black text-blue-600 text-lg Oswald">{asset.cost}</td>
//                   <td className="p-6 text-right">
//                     <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-200">
//                       <CheckCircle2 size={10}/> Completed
//                     </span>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan={4} className="p-20 text-center text-slate-400 Oswald uppercase font-bold">No assets found for this Panchayat</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; 
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { User, Mail, Phone, Info, MapPin, CheckCircle2, Navigation } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Next.js Fix: Leaflet icons standard CDN links (Warna marker gayab ho jata hai)
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ✅ Component: Map ko naye coordinates par move karne ke liye
function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13); 
    }
  }, [position, map]);
  return null;
}

export default function PanchayatMap({ panchayat }: any) {
  // --- 🛰️ STATES ---
  const [isMounted, setIsMounted] = useState(false); // Hydration fix
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loadingMap, setLoadingMap] = useState(true);

  const themeColor = panchayat?.config?.themeColor || "#112F20";
  const { name, block, district } = panchayat;

  // Ensure component only renders on Client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const getVillageCoords = async () => {
      try {
        const query = `${name}, ${block}, ${district}, Rajasthan, India`;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        const data = await res.json();

        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          // Fallback to District/Block
          const fallbackRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(block + "," + district + ",Rajasthan")}&limit=1`
          );
          const fallbackData = await fallbackRes.json();
          if (fallbackData && fallbackData.length > 0) {
            setCoords([parseFloat(fallbackData[0].lat), parseFloat(fallbackData[0].lon)]);
          }
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    if (name) getVillageCoords();
  }, [name, block, district, isMounted]);

  // ✅ DYNAMIC DATA
  const assets = panchayat?.assets || [];
  
  const leader = {
    name: panchayat?.leader_name || "Sarpanch Name",
    img: panchayat?.config?.avatar || "https://via.placeholder.com/150",
    phone: panchayat?.phone || "Not Available",
    email: panchayat?.email || "Not Available"
  };

  const secretary = {
    name: panchayat?.secretary_name || "GVA Adhikari",
    phone: panchayat?.secretary_phone || "Not Available",
    email: panchayat?.secretary_email || "Not Available"
  };

  // Hydration safety check
  if (!isMounted) return <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-[3rem]" />;

  return (
    <section id="development" className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-left border-l-8 pl-6" style={{ borderColor: themeColor }}>
          <h2 className="text-sm font-black uppercase tracking-[10px] text-slate-400 mb-2 Oswald">Live Tracking</h2>
          <h3 className="text-5xl lg:text-7xl font-black uppercase text-[#112F20] Teko leading-none uppercase">
             {name} <span className="text-slate-400">Map</span>
          </h3>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-[#FAF9F6]">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-3 bg-[#112F20] text-white p-10 flex flex-col gap-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-xl">
                <img src={leader.img} className="w-full h-full object-cover" alt="Sarpanch" />
              </div>
              <h4 className="text-xl font-black uppercase Oswald leading-tight">{leader.name}</h4>
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Sarpanch</p>
              <div className="mt-4 text-left space-y-2 text-[11px] opacity-70 Oswald uppercase">
                <div className="flex items-center gap-2"><Phone size={12}/> {leader.phone}</div>
                <div className="flex items-center gap-2"><Mail size={12}/> {leader.email}</div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/10">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white/10 mb-4 bg-slate-800 flex items-center justify-center">
                 <User size={30} className="text-slate-500" />
              </div>
              <h4 className="text-md font-black uppercase Oswald">{secretary.name}</h4>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Secretary (GVA)</p>
              <div className="mt-4 text-left space-y-2 text-[10px] opacity-50 Oswald uppercase">
                <div className="flex items-center gap-2"><Phone size={10}/> {secretary.phone}</div>
              </div>
            </div>
          </div>

          {/* --- CENTER: MAP --- */}
          <div className="lg:col-span-9 h-[500px] md:h-[650px] relative z-10 border-l-8 border-white flex items-center justify-center bg-slate-100">
            {loadingMap ? (
                <div className="text-center">
                    <Navigation className="animate-bounce text-red-600 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Finding Location...</p>
                </div>
            ) : (
                <MapContainer 
                  center={coords || [26.4499, 74.6399]} 
                  zoom={13} 
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  
                  {coords && <RecenterMap position={coords} />}

                  {coords && (
                      <Marker position={coords} icon={customIcon}>
                          <Popup className="Oswald uppercase font-bold text-center">
                              {name} <br/> Panchayat Bhawan
                          </Popup>
                      </Marker>
                  )}

                  {assets.map((asset: any) => (
                    <Marker key={asset.id} position={[asset.lat, asset.lng]} icon={customIcon}>
                      <Popup>
                        <div className="w-48 font-sans p-0 overflow-hidden">
                          {asset.img && <img src={asset.img} className="w-full h-24 object-cover mb-2 rounded-lg" alt={asset.name} />}
                          <h5 className="font-black text-sm uppercase text-[#112F20] Oswald leading-tight">{asset.name}</h5>
                          <p className="text-[10px] font-bold text-red-700 mt-1">{asset.cost}</p>
                          <p className="text-[9px] text-slate-500 uppercase font-bold">{asset.cat}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
            )}
          </div>
        </div>

        {/* --- BOTTOM: ASSET TABLE --- */}
        <div className="mt-12 overflow-x-auto bg-white rounded-[2rem] border shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr className="text-[10px] font-black uppercase tracking-[3px]">
                <th className="p-6">Asset Detail</th>
                <th className="p-6">Category</th>
                <th className="p-6">Funds Utilized</th>
                <th className="p-6 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.length > 0 ? assets.map((asset: any) => (
                <tr key={asset.id} className="hover:bg-slate-50 transition-all group">
                  <td className="p-6">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-all"><MapPin size={18}/></div>
                      <span className="font-bold text-[#112F20] uppercase Oswald">{asset.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold text-slate-400 uppercase Oswald tracking-widest">{asset.cat}</td>
                  <td className="p-6 font-black text-blue-600 text-lg Oswald">{asset.cost}</td>
                  <td className="p-6 text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-200">
                      <CheckCircle2 size={10}/> Completed
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-20 text-center text-slate-400 Oswald uppercase font-bold tracking-widest italic">No assets mapped for this Panchayat</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}