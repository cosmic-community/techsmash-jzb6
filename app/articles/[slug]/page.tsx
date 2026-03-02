// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getArticles } from '@/lib/cosmic';
import { formatDate } from '@/lib/utils';
import CategoryBadge from '@/components/CategoryBadge';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found — TechSmash' };
  }

  return {
    title: `${article.metadata?.headline || article.title} — TechSmash`,
    description: article.metadata?.excerpt || '',
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = article.metadata?.category;
  const author = article.metadata?.author;
  const publishedDate =
    article.metadata?.published_date || article.created_at;
  const imageUrl = article.metadata?.featured_image?.imgix_url;
  const content = article.metadata?.content || article.content || '';

  // Fetch related articles
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <div className="relative">
        {imageUrl ? (
          <div className="aspect-[21/9] max-h-[500px] overflow-hidden">
            <img
              src={`${imageUrl}?w=1600&h=700&fit=crop&auto=format,compress`}
              alt={article.metadata?.headline || article.title}
              width={1600}
              height={700}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-r from-surface-dark to-brand/20" />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className={imageUrl ? '-mt-24 relative z-10' : 'pt-8'}>
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <CategoryBadge category={category} size="md" linked />
              )}
              <span className="text-sm text-text-muted">
                {formatDate(publishedDate)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight">
              {article.metadata?.headline || article.title}
            </h1>

            {article.metadata?.excerpt && (
              <p className="text-lg text-text-secondary mt-4 leading-relaxed">
                {article.metadata.excerpt}
              </p>
            )}

            {/* Author info */}
            {author && (
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <Link
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-3 group"
                >
                  {author.metadata?.avatar?.imgix_url ? (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                      {(author.metadata?.name || author.title)
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors">
                      {author.metadata?.name || author.title}
                    </p>
                    {author.metadata?.twitter_handle && (
                      <p className="text-xs text-text-muted">
                        @{author.metadata.twitter_handle}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="mt-8 pb-16">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-200 pt-10 pb-16">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              More from TechSmash
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.slug}`}
                  className="group block"
                >
                  {related.metadata?.featured_image?.imgix_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={`${related.metadata.featured_image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
                        alt={
                          related.metadata?.headline || related.title
                        }
                        width={300}
                        height={170}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors line-clamp-2">
                    {related.metadata?.headline || related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}