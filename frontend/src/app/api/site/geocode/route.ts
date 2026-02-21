import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const village = searchParams.get("village");
    const block = searchParams.get("block");
    const district = searchParams.get("district");

    if (!village) return NextResponse.json({ error: "Missing parameters" });

    try {
        // 1. Rajasthan ke context mein address taiyar karo
        const query = `${village}, ${block}, ${district}, Rajasthan, India`;
        
        // 2. Nominatim (Free) API se coordinates mangao
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
            { headers: { 'User-Agent': 'RajGram-Vikas-Portal' } }
        );
        const data = await res.json();

        if (data && data.length > 0) {
            return NextResponse.json({
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            });
        }
        return NextResponse.json({ error: "Location not found" }, { status: 404 });
    } catch (e) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}