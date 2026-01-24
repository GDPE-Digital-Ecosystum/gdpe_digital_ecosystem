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
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "RajGram Digital",
  description: "Leader Branding Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}