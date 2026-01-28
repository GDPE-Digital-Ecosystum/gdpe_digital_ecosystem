// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from "next-auth/jwt" 

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
  
//   // 1. Terminal Log: Middleware Start
//   console.log("-----------------------------------------");
//   console.log("🚀 MIDDLEWARE TRIGGERED FOR PATH:", path);

//   // 2. Secret Key Check
//   const secret = process.env.NEXTAUTH_SECRET;
//   console.log("🔑 SECRET STATUS:", secret ? "SECRET LOADED ✅" : "SECRET MISSING ❌");

//   // 3. Token Fetch
//   const token: any = await getToken({ 
//     req, 
//     secret: secret 
//   });

//   console.log("🎟️ TOKEN DATA:", token ? `ROLE: ${token.role}, SLUG: ${token.slug}` : "TOKEN IS NULL (Login nahi hai ya Secret galt hai)");

//   // --- 🔒 SECURITY LOGIC ---

//   if (path.startsWith('/leader/')) {
//     // ✅ FIX: decodeURIComponent use kiya hai taaki Hindi slugs match ho sakein
//     const rawUrlSlug = path.split("/")[2];
//     const urlSlug = decodeURIComponent(rawUrlSlug); 
    
//     console.log("📂 TARGET SLUG FROM URL (DECODED):", urlSlug);

//     // Agar token nahi mila
//     if (!token) {
//       console.log("🛑 REDIRECT: No Token Found -> /login");
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     // ROLE-BASED MATCHING
//     if (token.role === "LEADER") {
//       // ✅ Ab ye comparison Hindi to Hindi ekdum perfect hoga
//       if (token.slug !== urlSlug) {
//         console.log(`🚫 SECURITY BLOCK: Leader [${token.slug}] tried to hack [${urlSlug}]`);
//         return NextResponse.redirect(new URL('/login?error=AccessDenied', req.url));
//       } else {
//         console.log("✅ ACCESS GRANTED: Slug matches token.");
//       }
//     } else if (token.role === "BOSS") {
//       console.log("👑 BOSS ACCESS: Allowing any leader dashboard.");
//     }
//   }

//   if (path.startsWith('/boss')) {
//     if (!token || token.role !== "BOSS") {
//         console.log("🛑 REDIRECT: Not a Boss -> /login");
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   // --- 🌐 ROUTING & IGNORE LOGIC ---
//   if (
//     path.startsWith('/api/auth') || 
//     path.startsWith('/_next') || 
//     path.startsWith('/site') || 
//     path.startsWith('/login') ||
//     path.startsWith('/test-session') ||
//     path.includes('.')
//   ) {
//     return NextResponse.next();
//   }

//   const hostname = req.headers.get('host') || '';
//   const currentHost = hostname.split(':')[0].split('.')[0];

//   if (currentHost === 'localhost' || currentHost === 'gdpe-digital-ecosystem' || currentHost === 'www') {
//     return NextResponse.next()
//   }

//   return NextResponse.rewrite(new URL(`/site/${currentHost}${path}`, req.url))
// }

// export const config = {
//   matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
// }

//vercel code
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt" 

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // 1. Terminal Log: Middleware Start
  console.log("-----------------------------------------");
  console.log("🚀 MIDDLEWARE TRIGGERED FOR PATH:", path);

  // 2. Secret Key Check
  const secret = process.env.NEXTAUTH_SECRET;
  console.log("🔑 SECRET STATUS:", secret ? "SECRET LOADED ✅" : "SECRET MISSING ❌");

  // 3. Token Fetch
  const token: any = await getToken({ 
    req, 
    secret: secret 
  });

  console.log("🎟️ TOKEN DATA:", token ? `ROLE: ${token.role}, SLUG: ${token.slug}` : "TOKEN IS NULL (Login nahi hai ya Secret galt hai)");

  // --- 🔒 SECURITY LOGIC (SABSE PEHLE) ---

  if (path.startsWith('/leader/')) {
    // ✅ decodeURIComponent use kiya hai taaki Hindi slugs match ho sakein
    const rawUrlSlug = path.split("/")[2];
    const urlSlug = decodeURIComponent(rawUrlSlug); 
    
    console.log("📂 TARGET SLUG FROM URL (DECODED):", urlSlug);

    // Agar token nahi mila
    if (!token) {
      console.log("🛑 REDIRECT: No Token Found -> /login");
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // ROLE-BASED MATCHING
    if (token.role === "LEADER") {
      if (token.slug !== urlSlug) {
        console.log(`🚫 SECURITY BLOCK: Leader [${token.slug}] tried to hack [${urlSlug}]`);
        return NextResponse.redirect(new URL('/login?error=AccessDenied', req.url));
      } else {
        console.log("✅ ACCESS GRANTED: Slug matches token.");
      }
    } else if (token.role === "BOSS") {
      console.log("👑 BOSS ACCESS: Allowing any leader dashboard.");
    }
  }

  if (path.startsWith('/boss')) {
    if (!token || token.role !== "BOSS") {
        console.log("🛑 REDIRECT: Not a Boss -> /login");
        return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // --- 🌐 ROUTING & IGNORE LOGIC ---
  
  // ✅ In rasto ko middleware touch nahi karega
  if (
    path.startsWith('/api') || 
    path.startsWith('/_next') || 
    path.startsWith('/site') || 
    path.startsWith('/login') ||
    path.startsWith('/test-session') ||
    path.includes('.')
  ) {
    console.log("⏩ BYPASSING MIDDLEWARE FOR RESERVED ROUTE");
    return NextResponse.next();
  }

  const hostname = req.headers.get('host') || '';
  const currentHost = hostname.split(':')[0].split('.')[0];

  console.log("🌍 HOSTNAME DETECTED:", hostname);
  console.log("🏷️ CURRENT SUBDOMAIN/HOST:", currentHost);

  // ✅ Main Domain aur Localhost Logic
  const mainHubs = ['localhost', 'gdpe-digital-ecosystem', 'rajgram', 'www'];
  const isMainHub = mainHubs.some(hub => currentHost.includes(hub));

  if (isMainHub) {
    console.log("🏠 MAIN HUB DETECTED - PROCEEDING NORMALLY");
    return NextResponse.next()
  }

  // --- 🚀 SUBDOMAIN REWRITE ---
  console.log(`🔄 REWRITING SUBDOMAIN [${currentHost}] TO [/site/${currentHost}]`);
  return NextResponse.rewrite(new URL(`/site/${currentHost}${path}`, req.url))
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}