"use client";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/api";

const UNOPT = process.env.NODE_ENV === "development"; // tampilkan gambar tanpa optimizer saat dev

export default function FeaturedPost({ post }: { post: Post }) {
  const img = post.cover ?? "/blog-fallback.jpg";

  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-slate-700 dark:bg-white/5 dark:ring-white/10">
      <div className="relative">
        {/* gambar lebar 21:9 */}
        <div className="relative w-full aspect-[21/9] bg-slate-800/20">
          <Image
            src={img}
            alt={post.title}
            fill
            unoptimized={UNOPT}
            className="object-cover"
            sizes="100vw"
            priority
          />
          {post.category?.name && (
            <span className="absolute left-4 top-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-white ring-1 ring-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:ring-white/10">
              {post.category.name}
            </span>
          )}
        </div>

        {/* kartu judul yang nempel di bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="rounded-2xl bg-slate-800 shadow-md p-5 max-w-3xl text-white dark:bg-slate-600">
            <h2 className="text-2xl font-bold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="mt-2 text-white dark:text-slate-300 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
