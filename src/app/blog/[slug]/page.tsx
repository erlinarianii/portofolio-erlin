import { getPostBySlug } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Tipe baru: params adalah Promise dan harus di-await
type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: RouteParams
): Promise<Metadata> {
  const { slug } = await params;                      
  const post = await getPostBySlug(slug).catch(() => null);

  return {
    title: post ? `${post.title} — Blog` : "Blog",
    description: post?.excerpt ?? "Artikel",
  };
}

export default async function PostDetail({ params }: RouteParams) {
  const { slug } = await params;                       
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return notFound();

  const img = post.cover ?? "/blog-fallback.jpg";

  return (
    <main className="min-h-screen pt-32 pb-12 bg-white dark:bg-slate-800">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {post.title}
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {post.published_at
            ? new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(post.published_at))
            : ""}
        </p>

       <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-white/10">
  <Image
    src={img}
    alt={post.title}
    width={1600}
    height={900}
    className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] object-cover"
    priority
  />
</div>

        <article className="prose prose-slate dark:prose-invert max-w-none mt-8">
          <div dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
        </article>
      </div>
    </main>
  );
}
