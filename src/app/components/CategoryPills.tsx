"use client";
import Link from "next/link";

export default function CategoryPills({
  items,
}: {
  items: { name: string; slug?: string; count?: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((c, i) => {
        const Comp: any = c.slug ? Link : "span";
        const props = c.slug ? { href: `/blog?category=${c.slug}` } : {};
        return (
          <Comp
            key={i}
            {...props}
            className="px-3 py-1.5 rounded-full bg-gray-700 dark:bg-slate-700 text-white dark:hover:bg-gray-600 hover:bg-gray-600 transition"
          >
            {c.name}
            {typeof c.count === "number" && (
              <span className="ml-1 rounded-full bg-gray-700 dark:bg-slate-700 dark:hover:bg-gray-600f hover:bg-gray-600 px-2 py-0.5 text-xs ring-2 ring-border">
                {c.count}
              </span>
            )}
          </Comp>
        );
      })}
    </div>
  );
}
