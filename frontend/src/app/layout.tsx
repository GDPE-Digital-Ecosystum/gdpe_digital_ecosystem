// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// // Components Import
// import Navbar from "@/components/navbar"; 
// import Footer from "@/components/footer";
// import MasterTemplate from "./site/[slug]/page";

// // JSON Data Import
// import pageData from "./data.json";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // 1. Dynamic Metadata (Browser Tab Title & Description)
// export const metadata: Metadata = {
//   title: pageData.site.title,
//   description: pageData.site.description,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // 2. Theme Configuration extract karna
//   const { primaryColor, secondaryColor, accentColor } = pageData.config;

//   return (
//     <html lang="en">
//       <body
//         // 3. UI Customization: Yahan se colors inject ho rahe hain
//         style={{ 
//           "--primary": primaryColor, 
//           "--secondary": secondaryColor,
//           "--accent": accentColor 
//         } as React.CSSProperties}
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* Global Components */}
//         {/* <Navbar /> */}
        
//         {/* Saara Page Content yahan load hoga */}
//         <main>
//           {children}
//         </main>
//         <MasterTemplate/>
//         {/* <Footer /> */}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RajGram Digital - Rajasthan Gram Panchayat Hub",
  description: "Digital Branding Platform for Gram Panchayat Leaders",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Children mein hi hamara MasterTemplate load hoga */}
        {children}
      </body>
    </html>
  );
}