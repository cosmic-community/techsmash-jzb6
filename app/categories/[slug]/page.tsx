// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getCategoryBySlug,
  getArticlesByCategory,
} from '@/lib/cosmic';
import { getCategoryColor } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found — TechSmash' };
  }

  return {
    title: `${category.metadata?.name || category.title} — TechSmash`,
    description:
      category.metadata?.description ||
      `Latest articles in ${category.metadata?.name || category.title}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(category.id);
  const color = getCategoryColor(category.metadata?.color);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Category
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-primary">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-text-secondary mt-3 max-w-2xl">
            {category.metadata.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-text-muted">
            {articles.length}{' '}
            {articles.length === 1 ? 'article' : 'articles'}
          </span>
          <div
            className="h-0.5 flex-1"
            style={{ backgroundColor: color }}
          />
        </div>
      </header>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-text-primary">
            No articles yet
          </h2>
          <p className="text-text-secondary mt-2">
            Articles in this category will appear here.
          </p>
        </div>
      )}
    </div>
  );
}