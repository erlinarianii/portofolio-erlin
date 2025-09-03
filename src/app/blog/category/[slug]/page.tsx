import { getPosts, getCategories } from "@/lib/api";
import PostCard from "@/app/components/PostCard";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  // opsional: prebuild kategori
  const cats = await getCategories().catch(() => []);
  return cats.map(c => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Params) {
  const [cats, posts] = await Promise.all([getCategories(), getPosts(undefined, params.slug)]);
  const cat = cats.find(c => c.slug === params.slug);

  return (
    <main className="w-full bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">
          {cat ? cat.name : "Category"} <span className="text-slate-500 bg-gray-600 dark:text-slate-300">({posts.length})</span>
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
    </main>
  );
}
