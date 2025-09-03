import { getPosts, getCategories, type Post, type Category } from "@/lib/api";
import FeaturedPost from "@/app/components/FeaturedPost";
import PostCard from "@/app/components/PostCard";
import CategoryPills from "@/app/components/CategoryPills";

export const metadata = {
  title: "My Blog — Portofolio Erlin",
  description:
    "Discover insights, tutorials, and thoughts on web development, programming, and the latest in technology.",
};

type SearchParamsPromise = Promise<{ category?: string | string[] }>;
type PillItem = { name: string; slug?: string; count?: number; href?: string };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const sp = await searchParams;
  const selectedParam = Array.isArray(sp?.category)
    ? sp.category[0]
    : sp?.category;
  const selected = (selectedParam ?? "all").toLowerCase();

  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  const filtered: Post[] =
    selected === "all"
      ? posts
      : posts.filter(
          (p) => (p.category?.slug ?? "").toLowerCase() === selected
        );

  const [featured, ...rest] = filtered;

  const catPills: PillItem[] = [
    { name: "All", slug: "all", count: posts.length, href: "/blog" },
    ...categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      count: c.count,
      href: `/blog?category=${encodeURIComponent(c.slug)}`,
    })),
  ];

  return (
    <main className="min-h-screen pt-28 bg-white dark:bg-slate-800">
      <header className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Blog
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Explore posts by category or browse all.
        </p>
        <div className="mt-4">
          <CategoryPills items={catPills} />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6">
        <div className="relative mb-6 flex items-center gap-3">
          <div className="h-px bg-slate-200 dark:bg-white/15 flex-1" />
          <span className="text-sm text-slate-500 dark:text-slate-300">
            Featured Post
          </span>
          <div className="h-px bg-slate-200 dark:bg-white/15 flex-1" />
        </div>
        {featured ? <FeaturedPost post={featured} /> : null}
      </section>

      <section className="max-w-6xl mx-auto px-6 my-10">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold">All Posts</h2>
          {selected !== "all" ? (
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Filtered by “{selected}”
            </span>
          ) : null}
        </div>

        {rest.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">no blog yet</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
