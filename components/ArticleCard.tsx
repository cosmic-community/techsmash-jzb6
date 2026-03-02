import Link from 'next/link';
import type { Article } from '@/types';
import { timeAgo, getCategoryColor, truncateText } from '@/lib/utils';
import CategoryBadge from '@/components/CategoryBadge';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
}

export default function ArticleCard({
  article,
  variant = 'default',
}: ArticleCardProps) {
  const imageUrl = article.metadata?.featured_image?.imgix_url;
  const category = article.metadata?.category;
  const author = article.metadata?.author;
  const publishedDate =
    article.metadata?.published_date || article.created_at;

  if (variant === 'compact') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group flex gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-surface-secondary transition-colors -mx-2 px-2 rounded-lg"
      >
        {imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
            <img
              src={`${imageUrl}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={article.metadata?.headline || article.title}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <CategoryBadge category={category} size="sm" />
          )}
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors line-clamp-2 mt-1">
            {article.metadata?.headline || article.title}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            {author && (
              <span>{author.metadata?.name || author.title} · </span>
            )}
            {timeAgo(publishedDate)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || article.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {category && <CategoryBadge category={category} size="sm" />}
          <span className="text-xs text-text-muted">
            {timeAgo(publishedDate)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-text-primary group-hover:text-brand transition-colors line-clamp-2 leading-snug">
          {article.metadata?.headline || article.title}
        </h3>
        {article.metadata?.excerpt && (
          <p className="text-sm text-text-secondary mt-2 line-clamp-2">
            {truncateText(article.metadata.excerpt, 150)}
          </p>
        )}
        {author && (
          <div className="flex items-center gap-2 mt-4">
            {author.metadata?.avatar?.imgix_url && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-text-secondary">
              {author.metadata?.name || author.title}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}