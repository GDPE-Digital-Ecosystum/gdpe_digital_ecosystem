import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt" 

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';
  
  // 1. Terminal Log: Debugging ke liye
  console.log("-----------------------------------------");
  console.log("🚀 PATH:", path);

  const secret = process.env.NEXTAUTH_SECRET;
  const token: any = await getToken({ req, secret });

  // --- 🔒 1. SECURITY LOGIC ---
  if (path.startsWith('/leader/')) {
    if (!token) {
      console.log("🛑 REDIRECT: No Token -> /login");
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const urlSlug = decodeURIComponent(path.split("/")[2]); 
    if (token.role === "LEADER" && token.slug !== urlSlug) {
      console.log(`🚫 SECURITY BLOCK: ${token.slug} tried to access ${urlSlug}`);
      return NextResponse.redirect(new URL('/login?error=AccessDenied', req.url));
    }
  }

  if (path.startsWith('/boss')) {
    if (!token || token.role !== "BOSS") return NextResponse.redirect(new URL('/login', req.url));
  }

  // --- 🌐 2. ROUTING & IGNORE LOGIC ---
  
  // In rasto ko middleware touch nahi karega
  if (
    path.startsWith('/api') || 
    path.startsWith('/_next') || 
    path.startsWith('/login') ||
    path.startsWith('/test-session') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  // IP Address aur Localhost Check
  const hostOnly = hostname.split(':')[0];
  const currentHost = hostOnly.split('.')[0];
  const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostOnly);
  
  const mainHubs = ['localhost', 'gdpe-digital-ecosystem', 'rajgram', 'www'];
  const isMainHub = mainHubs.some(hub => hostOnly.includes(hub)) || isIP;

  if (isMainHub) {
    console.log("🏠 MAIN HUB/IP DETECTED");
    return NextResponse.next(); // Normal routing: rajgram.in/ajaysar
  }

  // --- 🚀 3. SUBDOMAIN REWRITE (For Production) ---
  // ✅ FIXED: '/site/' hata diya hai kyunki tune folder move kar diya hai
  console.log(`🔄 SUBDOMAIN REWRITE: [${currentHost}] -> [/${currentHost}${path}]`);
  return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}