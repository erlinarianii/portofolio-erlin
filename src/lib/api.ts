// src/lib/api.ts
export type Category = { id: number | string; name: string; slug: string; count?: number };
export type Post = {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  cover?: string | null;
  category?: Category | null;
  published?: boolean;
  published_at?: string | null;
  reading_minutes?: number | null;
    body?: string | null; 
};

// ---- BASE: utamakan URL dari env
const BASE = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000").replace(/\/$/, "");

// ---- Normalisasi URL gambar (kalau backend kirim path relatif)
function imgUrl(path?: string | null) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;       // sudah absolut
  if (path.startsWith("/")) return `${BASE}${path}`;  // path root
  return `${BASE}/${path}`;                           // path relatif
}

// ---- Helpers untuk “mengupas” response Laravel/Filament beragam bentuk
function unwrapList(resp: any): any[] {
  if (!resp) return [];
  if (Array.isArray(resp)) return resp;
  if (Array.isArray(resp.data)) return resp.data; // { data: [] }
  if (resp?.data && Array.isArray(resp.data.data)) return resp.data.data; // { data: { data: [] } }
  if (Array.isArray(resp.posts)) return resp.posts;
  if (Array.isArray(resp.items)) return resp.items;
  if (Array.isArray(resp.results)) return resp.results;
  return [];
}

function unwrapItem(resp: any): any {
  if (!resp) return null;
  if (resp.data && !Array.isArray(resp.data)) return resp.data; // { data: {...} }
  return resp;
}

// ---- Fetch JSON dengan penggabung path aman
async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    // Untuk dev, hindari cache agar cepat terlihat hasilnya
    next: { revalidate: 0 },
    ...init,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`API ${url} ${res.status} ${msg}`);
  }
  return res.json() as Promise<T>;
}

// ---- Mapping utama (prioritas sesuai permintaanmu)
function mapPost(p: any): Post {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? null,
    content: p.body ?? p.content ?? null,
    // pakai imgUrl agar cover selalu absolut meski backend kirim path relatif
    cover: imgUrl(p.cover_url ?? p.cover ?? null), // ← penting
    category: p.category
      ? { id: p.category.id, name: p.category.name, slug: p.category.slug }
      : null,
    published: p.is_published ?? p.published ?? true,
    published_at: p.published_at ?? null,
    reading_minutes: p.reading_minutes ?? null,
     body: p.body_html ?? p.body ?? p.content ?? null,
  };
}

// ---- Public API
export async function getPosts(limit?: number, categorySlug?: string): Promise<Post[]> {
  const params = new URLSearchParams();
  params.set("published", "1");
  if (limit) params.set("limit", String(limit));

  const path = categorySlug
    ? `/api/categories/${encodeURIComponent(tryDecode(categorySlug))}/posts`
    : `/api/posts`;

  const q = params.toString() ? `?${params.toString()}` : "";
  const raw = await fetchJSON<any>(`${path}${q}`);
  const list = unwrapList(raw);
  return list.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const s = tryDecode(slug);
  const raw = await fetchJSON<any>(`/api/posts/${encodeURIComponent(s)}`);
  const item = unwrapItem(raw);
  return mapPost(item);
}

export async function getCategories(): Promise<Category[]> {
  const raw = await fetchJSON<any>(`/api/categories`);
  const list = unwrapList(raw);
  return list.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: c.count,
  }));
}

// ---- Util kecil: aman-decode tanpa throw
function tryDecode(v: string): string {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}