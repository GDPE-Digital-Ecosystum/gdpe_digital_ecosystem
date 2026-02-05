"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  PhoneCall,
  ChevronRight
} from "lucide-react";

export default function Footer({ panchayat }) {

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

<footer className="bg-gradient-to-b from-[#FAF9F6] to-[#F4EBD0] pt-12 pb-6 px-4">

<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

{/* BRAND */}
<div>
<div className="flex items-center gap-3 mb-3">
<div
className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-base"
style={{ backgroundColor: themeColor }}
>
{name[0]}
</div>

<div>
<h3 className="text-base font-black text-[#112F20]">{name}</h3>
<p className="text-[9px] uppercase tracking-widest text-slate-500">
Digital Panchayat
</p>
</div>
</div>

<p className="text-xs text-slate-600 leading-snug max-w-xs">
Digital Gram Panchayat Mission ke tahat hum apne gaon ko
technology ke saath aage badha rahe hain.
</p>

<div className="flex gap-3 mt-3">
<Link href="#" className="p-2 rounded-full bg-white shadow">
<Facebook size={14}/>
</Link>
<Link href="#" className="p-2 rounded-full bg-white shadow">
<Instagram size={14}/>
</Link>
<Link href="#" className="p-2 rounded-full bg-white shadow">
<Twitter size={14}/>
</Link>
</div>
</div>

{/* LINKS */}
<div>
<h4 className="font-black uppercase text-[11px] tracking-widest text-[#112F20] mb-3">
Sections
</h4>

<ul className="space-y-2 text-xs text-slate-600">
{navLinks.map(link => (
<li key={link.id}>
<Link href={`#${link.id}`} className="flex items-center gap-2">
<ChevronRight size={12} style={{ color: themeColor }} />
{link.name}
</Link>
</li>
))}
</ul>
</div>

{/* CONTACT */}
<div>
<h4 className="font-black uppercase text-[11px] tracking-widest text-[#112F20] mb-3">
Sampark
</h4>

<div className="space-y-3 text-xs text-slate-600">

<div className="flex gap-2">
<MapPin size={14} style={{ color: themeColor }} />
<span>
Gram Panchayat<br/>
{panchayat?.block}
</span>
</div>

<div className="flex gap-2">
<Mail size={14} style={{ color: themeColor }} />
<span>{slug}@rajgram.in</span>
</div>

<div className="flex gap-2">
<PhoneCall size={14} style={{ color: themeColor }} />
<span>+91-XXXXXXXXXX</span>
</div>

</div>
</div>

</div>

{/* COPYRIGHT */}
<div className="border-t border-black/10 mt-8 pt-3 text-center text-[10px] text-slate-400">
© {new Date().getFullYear()} {name}
</div>

</footer>
);
}