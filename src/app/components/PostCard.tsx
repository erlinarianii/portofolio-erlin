"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { Post } from "@/lib/api";

const UNOPT = process.env.NODE_ENV === "development";

export default function PostCard({ post }: { post: Post }) {
  const date = post.published_at ? new Date(post.published_at) : null;

  return (
    <article className="rounded-2xl ring-2 ring-border overflow-hidden hover:shadow-md transition bg-white dark:bg-slate-700">
      <div className="relative aspect-[16/9] bg-muted/20">
        <Image
          src={post.cover ?? "/default-image.jpg"}
          alt={post.title}
          fill
          unoptimized={UNOPT}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </div>

      <div className="p-5">
        {post.category?.name && (
          <span className="inline-block text-xs font-medium px-2 py-1 rounded-full text-white bg-slate-700 dark:bg-slate-800 dark:text-white">
            {post.category.name}
          </span>
        )}

        <h3 className="mt-2 text-xl font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          {date && (
            <>
              <Calendar className="size-4" /> {date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
            </>
          )}
          {post.reading_minutes ? <span>• {post.reading_minutes} min read</span> : null}
        </div>
      </div>
    </article>
  );
}
