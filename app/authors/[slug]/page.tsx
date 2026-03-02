// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAuthorBySlug, getArticlesByAuthor } from '@/lib/cosmic';
import ArticleCard from '@/components/ArticleCard';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: 'Author Not Found — TechSmash' };
  }

  return {
    title: `${author.metadata?.name || author.title} — TechSmash`,
    description: author.metadata?.bio || `Articles by ${author.metadata?.name || author.title}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = await getArticlesByAuthor(author.id);
  const avatarUrl = author.metadata?.avatar?.imgix_url;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Author Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {avatarUrl ? (
              <img
                src={`${avatarUrl}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-brand bg-brand/10">
                {(author.metadata?.name || author.title)
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary">
              {author.metadata?.name || author.title}
            </h1>
            {author.metadata?.bio && (
              <p className="text-lg text-text-secondary mt-2 max-w-2xl">
                {author.metadata.bio}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3">
              {author.metadata?.twitter_handle && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-dark transition-colors font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @{author.metadata.twitter_handle}
                </a>
              )}
              <span className="text-sm text-text-muted">
                {articles.length}{' '}
                {articles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 h-0.5 bg-brand" />
      </header>

      {/* Articles */}
      <section>
        <h2 className="text-2xl font-black text-text-primary mb-6">
          Articles by {author.metadata?.name || author.title}
        </h2>

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
              This author hasn&apos;t published any articles yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}