// "use client";
// import Link from "next/link";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   MapPin,
//   Mail,
//   PhoneCall,
//   ChevronRight,
//   TwitterIcon,
//   InstagramIcon,
//   FacebookIcon
// } from "lucide-react";

// export default function Footer({ panchayat }) {

// const themeColor = panchayat?.config?.themeColor || "#A12A1E";
// const name = panchayat?.name || "Gram Panchayat";
// const slug = panchayat?.slug;

// const navLinks = [
//   { id: "vision", name: "Vision" },
//   { id: "history", name: "History" },
//   { id: "geography", name: "Geography" },
//   { id: "economy", name: "Economy" },
//   { id: "news", name: "News" }
// ];

// return (

// <footer className="bg-gradient-to-b from-[#FAF9F6] to-[#F4EBD0] pt-12 pb-6 px-4">

// <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

// {/* BRAND */}
// <div>
// <div className="flex items-center gap-3 mb-3">
// <div
// className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-base"
// style={{ backgroundColor: themeColor }}
// >
// {name[0]}
// </div>

// <div>
// <h3 className="text-base font-black text-[#112F20]">{name}</h3>
// <p className="text-[9px] uppercase tracking-widest text-slate-500">
// Digital Panchayat
// </p>
// </div>
// </div>

// <p className="text-xs text-slate-600 leading-snug max-w-xs">
// Digital Gram Panchayat Mission ke tahat hum apne gaon ko
// technology ke saath aage badha rahe hain.
// </p>

// <div className="flex gap-3 mt-3">
// <Link href="#" className="p-2 rounded-full bg-white shadow">
// <FacebookIcon size={14}/>
// </Link>
// <Link href="#" className="p-2 rounded-full bg-white shadow">
// <InstagramIcon size={14}/>
// </Link>
// <Link href="#" className="p-2 rounded-full bg-white shadow">
// <TwitterIcon size={14}/>
// </Link>
// </div>
// </div>

// {/* LINKS */}
// <div>
// <h4 className="font-black uppercase text-[11px] tracking-widest text-[#112F20] mb-3">
// Sections
// </h4>

// <ul className="space-y-2 text-xs text-slate-600">
// {navLinks.map(link => (
// <li key={link.id}>
// <Link href={`#${link.id}`} className="flex items-center gap-2">
// <ChevronRight size={12} style={{ color: themeColor }} />
// {link.name}
// </Link>
// </li>
// ))}
// </ul>
// </div>

// {/* CONTACT */}
// <div>
// <h4 className="font-black uppercase text-[11px] tracking-widest text-[#112F20] mb-3">
// Sampark
// </h4>

// <div className="space-y-3 text-xs text-slate-600">

// <div className="flex gap-2">
// <MapPin size={14} style={{ color: themeColor }} />
// <span>
// Gram Panchayat<br/>
// {panchayat?.block}
// </span>
// </div>

// <div className="flex gap-2">
// <Mail size={14} style={{ color: themeColor }} />
// <span>{slug}@rajgram.in</span>
// </div>

// <div className="flex gap-2">
// <PhoneCall size={14} style={{ color: themeColor }} />
// <span>+91-XXXXXXXXXX</span>
// </div>

// </div>
// </div>

// </div>

// {/* COPYRIGHT */}
// <div className="border-t border-black/10 mt-8 pt-3 text-center text-[10px] text-slate-400">
// © {new Date().getFullYear()} {name}
// </div>

// </footer>
// );
// }

"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  PhoneCall,
  ChevronRight,
  Heart
} from "lucide-react";

// ✅ FIXED: Added ': { panchayat: any }' to solve TypeScript implicit any error
export default function Footer({ panchayat }: { panchayat: any }) {

  const themeColor = panchayat?.config?.themeColor || "#A12A1E";
  const name = panchayat?.name || "Gram Panchayat";
  const slug = panchayat?.slug;

  const navLinks = [
    { id: "vision", name: "Vision" },
    { id: "history", name: "History" },
    { id: "geography", name: "Geography" },
    { id: "economy", name: "Economy" },
    { id: "news", name: "News" }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#FAF9F6] to-[#F4EBD0] pt-16 pb-8 px-4 border-t border-black/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">

        {/* 🏛️ BRAND SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              {name[0]}
            </div>
            <div>
              <h3 className="text-lg font-black text-[#112F20] uppercase tracking-tighter">{name}</h3>
              <p className="text-[9px] uppercase tracking-[4px] text-slate-500 font-bold">Digital Portal</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed max-w-xs italic">
            "Digital Gram Panchayat Mission ke tahat hum apne gaon ko technology ke saath aage badha rahe hain."
          </p>

          {/* Fixed Social Icons */}
          <div className="flex gap-4 pt-2">
            <Link href="#" className="p-2.5 rounded-full bg-white shadow-sm border border-slate-100 hover:scale-110 transition-transform">
              <Facebook size={16} className="text-blue-600" />
            </Link>
            <Link href="#" className="p-2.5 rounded-full bg-white shadow-sm border border-slate-100 hover:scale-110 transition-transform">
              <Instagram size={16} className="text-pink-600" />
            </Link>
            <Link href="#" className="p-2.5 rounded-full bg-white shadow-sm border border-slate-100 hover:scale-110 transition-transform">
              <Twitter size={16} className="text-sky-500" />
            </Link>
          </div>
        </div>

        {/* 🔗 QUICK LINKS SECTION */}
        <div>
          <h4 className="font-black uppercase text-[11px] tracking-[5px] text-[#112F20] mb-6 border-b pb-2 inline-block">
            Explore
          </h4>
          <ul className="space-y-3">
            {navLinks.map(link => (
              <li key={link.id}>
                <Link href={`#${link.id}`} className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-2 hover:text-red-700 transition-colors group">
                  <ChevronRight size={14} style={{ color: themeColor }} className="group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 CONTACT SECTION */}
        <div>
          <h4 className="font-black uppercase text-[11px] tracking-[5px] text-[#112F20] mb-6 border-b pb-2 inline-block">
            Sampark
          </h4>
          <div className="space-y-5 text-xs font-bold uppercase tracking-widest text-slate-600">
            <div className="flex gap-3">
              <MapPin size={18} style={{ color: themeColor }} className="shrink-0" />
              <span className="leading-tight">
                Gram Panchayat Office<br/>
                {panchayat?.block || "Rajasthan"}
              </span>
            </div>

            <div className="flex gap-3">
              <Mail size={18} style={{ color: themeColor }} className="shrink-0" />
              <span className="lowercase">{slug || 'admin'}@rajgram.in</span>
            </div>

            <div className="flex gap-3">
              <PhoneCall size={18} style={{ color: themeColor }} className="shrink-0" />
              <span>+91-XXXXXXXXXX</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📜 COPYRIGHT SECTION */}
      <div className="border-t border-black/10 mt-16 pt-8 text-center">
        <Heart className="mx-auto mb-4 text-red-600 animate-pulse" fill="currentColor" size={20} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[8px]">
          © {new Date().getFullYear()} {name} | Digital India
        </p>
      </div>
    </footer>
  );
}