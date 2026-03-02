import { getArticles, getCategories } from '@/lib/cosmic';
import HeroArticle from '@/components/HeroArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryBadge from '@/components/CategoryBadge';
import Link from 'next/link';

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  const heroArticle = articles[0];
  const latestArticles = articles.slice(1, 7);
  const sidebarArticles = articles.slice(7, 12);

  return (
    <div>
      {/* Hero Section */}
      {heroArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <HeroArticle article={heroArticle} />
        </section>
      )}

      {/* Category Bar */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted whitespace-nowrap">
              Topics:
            </span>
            {categories.map((category) => (
              <CategoryBadge
                key={category.id}
                category={category}
                size="md"
                linked
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-text-primary">
                Latest
              </h2>
              <div className="h-0.5 flex-1 bg-brand ml-4" />
            </div>

            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-text-muted">
                <p className="text-lg">No articles yet.</p>
                <p className="text-sm mt-2">
                  Add articles in your Cosmic dashboard to see them here.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-text-primary">
                  More Stories
                </h2>
                <div className="h-0.5 flex-1 bg-gray-200 ml-4" />
              </div>

              {sidebarArticles.length > 0 ? (
                <div>
                  {sidebarArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="compact"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  More stories coming soon.
                </p>
              )}

              {/* Categories sidebar */}
              {categories.length > 0 && (
                <div className="mt-8 bg-surface-secondary rounded-xl p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white transition-colors group"
                      >
                        <span className="text-sm font-medium text-text-primary group-hover:text-brand transition-colors">
                          {category.metadata?.name || category.title}
                        </span>
                        <svg
                          className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}