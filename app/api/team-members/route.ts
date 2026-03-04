import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET() {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(`${STRAPI_URL}/api/team-members?populate=*`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[team-members] Strapi error:', res.status, text);
      let detail: string;
      try {
        const json = JSON.parse(text);
        detail = json.error?.message || json.message || text;
      } catch {
        detail = text || `HTTP ${res.status}`;
      }
      return NextResponse.json(
        { error: 'Failed to fetch team members', detail, status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[team-members] Fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch team members', detail: message, status: 500 },
      { status: 500 }
    );
  }
}
