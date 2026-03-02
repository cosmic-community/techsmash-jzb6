import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="bg-surface-dark sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-brand text-2xl font-black tracking-tight group-hover:text-brand-light transition-colors">
              Tech
            </span>
            <span className="text-white text-2xl font-black tracking-tight">
              Smash
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-300 hover:text-brand text-sm font-medium px-3 py-2 rounded-md transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
            <Link
              href="/authors"
              className="text-gray-300 hover:text-brand text-sm font-medium px-3 py-2 rounded-md transition-colors"
            >
              Authors
            </Link>
          </nav>

          {/* Mobile menu button */}
          <MobileMenuButton categories={categories} />
        </div>
      </div>

      {/* Green accent line */}
      <div className="h-0.5 bg-brand" />
    </header>
  );
}

function MobileMenuButton({
  categories,
}: {
  categories: { id: string; slug: string; title: string; metadata: { name?: string } }[];
}) {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="text-gray-300 hover:text-white cursor-pointer list-none p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-56 bg-surface-darker rounded-lg shadow-xl border border-gray-700 py-2 z-50">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:text-brand hover:bg-surface-dark transition-colors"
            >
              {category.metadata?.name || category.title}
            </Link>
          ))}
          <div className="border-t border-gray-700 my-1" />
          <Link
            href="/authors"
            className="block px-4 py-2 text-sm text-gray-300 hover:text-brand hover:bg-surface-dark transition-colors"
          >
            Authors
          </Link>
        </div>
      </details>
    </div>
  );
}