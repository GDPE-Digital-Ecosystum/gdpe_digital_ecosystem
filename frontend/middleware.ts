import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''
  const path = url.pathname

  // 1. In rasto ko middleware touch nahi karega
  if (
    path.startsWith('/api') || 
    path.startsWith('/boss') || 
    path.startsWith('/leader') || 
    path.startsWith('/_next') || 
    path.includes('.')
  ) {
    return NextResponse.next()
  }

  const currentHost = hostname.split(':')[0].split('.')[0]

  // 2. Localhost aur Main Domain logic
  if (currentHost === 'localhost' || currentHost === 'rajgram' || currentHost === 'www') {
    return NextResponse.next()
  }

  // 3. Subdomain rewrite (e.g. amer.localhost:3000 -> /site/amer)
  return NextResponse.rewrite(new URL(`/site/${currentHost}${path}`, req.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}