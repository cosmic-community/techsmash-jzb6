import Link from 'next/link';
import type { Category } from '@/types';
import { getCategoryColor } from '@/lib/utils';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  linked?: boolean;
}

export default function CategoryBadge({
  category,
  size = 'sm',
  linked = false,
}: CategoryBadgeProps) {
  const color = getCategoryColor(category.metadata?.color);
  const label = category.metadata?.name || category.title;

  const badgeClasses =
    size === 'sm'
      ? 'text-xs font-semibold px-2 py-0.5 rounded'
      : 'text-sm font-semibold px-3 py-1 rounded-md';

  const badge = (
    <span
      className={`${badgeClasses} inline-block uppercase tracking-wide`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {label}
    </span>
  );

  if (linked) {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="hover:opacity-80 transition-opacity"
      >
        {badge}
      </Link>
    );
  }

  return badge;
}