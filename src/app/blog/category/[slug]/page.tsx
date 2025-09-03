import type { Metadata } from "next";
import { getPosts, getCategories, type Post, type Category } from "@/lib/api";
import PostCard from "@/app/components/PostCard";
import CategoryPills from "@/app/components/CategoryPills";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; 
  return {
    title: `${slug} — Blog Category`,
    description: `Posts under the "${slug}" category.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params; 

  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    getPosts(undefined, slug), 
    getCategories(),
  ]);

  const catPills = [
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
          Category: {slug}
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Explore posts by category or browse all.
        </p>
        <div className="mt-4">
          <CategoryPills items={catPills} />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 my-10">
        {posts.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">no blog yet</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
