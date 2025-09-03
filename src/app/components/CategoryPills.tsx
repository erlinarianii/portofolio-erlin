"use client";

import Link from "next/link";

type CategoryItem = {
  name: string;
  slug?: string;
  count?: number;
  href?: string;
};

type Props = {
  items: CategoryItem[];
};

export default function CategoryPills({ items }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((c, i) => {
        const href =
          c.href ??
          (c.slug ? `/blog?category=${encodeURIComponent(c.slug)}` : undefined);

        const pillClasses =
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full " +
          "bg-gray-700 text-white hover:bg-gray-600 transition " +
          "dark:bg-slate-700 dark:hover:bg-gray-600";

        const countBadge =
          typeof c.count === "number" ? (
            <span className="ml-1 rounded-full px-2 py-0.5 text-xs bg-gray-800/70 dark:bg-slate-800/70">
              {c.count}
            </span>
          ) : null;

        return href ? (
          <Link key={i} href={href} className={pillClasses}>
            {c.name}
            {countBadge}
          </Link>
        ) : (
          <span key={i} className={pillClasses}>
            {c.name}
            {countBadge}
          </span>
        );
      })}
    </div>
  );
}
