import { getPosts } from "@/lib/api";
import PostCard from "@/app/components/PostCard";
import Link from "next/link";

export default async function BlogPreview() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts(3);            // minta 3 dari API
  } catch {
    posts = [];
  }
  const latest = (posts ?? []).slice(0, 3); // pastikan cuma 3 ditampilkan

  return (
    <section id="blog" className="w-full bg-white dark:bg-slate-800 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Blog
          </h2>

          {/* See All: dibikin lebih besar & terlihat seperti tombol */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2
                       text-sm sm:text-base font-medium
                       border border-slate-300/70 bg-white/70 dark:border-white/20
                       dark:bg-white/10 hover:bg-white hover:dark:bg-white/15
                       backdrop-blur-md transition"
          >
            See All <span aria-hidden>→</span>
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            No blog posts yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
