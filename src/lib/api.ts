// src/lib/api.ts

// ---------- Types ----------
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
};

export type Post = {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null; // plain text (opsional)
  cover?: string | null;
  category?: Category | null;
  published?: boolean;
  published_at?: string | null;
  reading_minutes?: number | null;
  body?: string | null; // HTML string (dipakai di detail)
};

// ---------- Base URL ----------
const BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000"
).replace(/\/$/, "");

// ---------- Small type guards / coercers ----------
function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function asString(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return undefined;
}
function asNumber(v: unknown): number | undefined {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
}
function asBoolean(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (v === "1" || v === 1 || v === "true") return true;
  if (v === "0" || v === 0 || v === "false") return false;
  return undefined;
}
function asArray(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

// ---------- Utilities ----------
function tryDecode(v: string): string {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

// Normalisasi URL gambar (kalau backend kirim path relatif)
function imgUrl(path?: string | null): string | null {
  const p = path ?? "";
  if (!p) return null;
  if (/^https?:\/\//i.test(p)) return p; // sudah absolut
  if (p.startsWith("/")) return `${BASE}${p}`; // root
  return `${BASE}/${p}`; // relatif
}

// “Kupas” response menjadi list item
function unwrapList(resp: unknown): unknown[] {
  if (Array.isArray(resp)) return resp;
  if (isRecord(resp)) {
    if (Array.isArray(resp.data)) return resp.data; // { data: [] }
    const data = resp.data;
    if (isRecord(data) && Array.isArray(data.data)) return data.data; // { data: { data: [] } }
    if (Array.isArray(resp.posts)) return resp.posts as unknown[];
    if (Array.isArray(resp.items)) return resp.items as unknown[];
    if (Array.isArray(resp.results)) return resp.results as unknown[];
  }
  return [];
}

// “Kupas” response menjadi single item record
function unwrapItem(resp: unknown): Record<string, unknown> {
  if (isRecord(resp)) {
    if (isRecord(resp.data)) return resp.data;
    return resp;
  }
  return {};
}

// ---------- Fetch JSON ----------
async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 }, // dev: jangan cache
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`API ${url} ${res.status} ${msg}`);
  }
  return res.json() as Promise<T>;
}

// ---------- Mappers ----------
function mapCategory(v: unknown): Category | null {
  const o = isRecord(v) ? v : undefined;
  if (!o) return null;

  const id = (asNumber(o.id) ?? asString(o.id) ?? asString(o.slug) ?? asString(o.name) ?? "0");
  const name = asString(o.name) ?? "";
  const slug = asString(o.slug) ?? "";
  const count = typeof o.count === "number" ? o.count : undefined;

  return { id, name, slug, count };
}

function mapPost(v: unknown): Post {
  const o = isRecord(v) ? v : {};
  const category = mapCategory(o.category ?? null);

  return {
    id: asNumber(o.id) ?? asString(o.id) ?? "",
    title: asString(o.title) ?? "",
    slug: asString(o.slug) ?? "",
    excerpt: asString(o.excerpt) ?? null,
    content: asString(o.body) ?? asString(o.content) ?? null,
    cover: imgUrl(
      asString(o.cover_url) ?? asString(o.cover) ?? null
    ),
    category,
    published: asBoolean(o.is_published) ?? asBoolean(o.published) ?? true,
    published_at:
      asString(o.published_at) ?? asString(o.created_at) ?? null,
    reading_minutes:
      typeof o.reading_minutes === "number" ? o.reading_minutes : null,
    body:
      asString(o.body_html) ??
      asString(o.body) ??
      asString(o.content) ??
      null,
  };
}

// ---------- Public API ----------
export async function getPosts(
  limit?: number,
  categorySlug?: string
): Promise<Post[]> {
  const params = new URLSearchParams();
  params.set("published", "1");
  if (typeof limit === "number") params.set("limit", String(limit));

  const path = categorySlug
    ? `/api/categories/${encodeURIComponent(tryDecode(categorySlug))}/posts`
    : `/api/posts`;

  const q = params.toString() ? `?${params.toString()}` : "";
  const raw = await fetchJSON<unknown>(`${path}${q}`);
  const list = unwrapList(raw);
  return list.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const s = tryDecode(slug);
  const raw = await fetchJSON<unknown>(`/api/posts/${encodeURIComponent(s)}`);
  const item = unwrapItem(raw);
  return mapPost(item);
}

export async function getCategories(): Promise<Category[]> {
  const raw = await fetchJSON<unknown>(`/api/categories`);
  const list = unwrapList(raw);
  return list
    .map(mapCategory)
    .filter((c): c is Category => c !== null);
}
