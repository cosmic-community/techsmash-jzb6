import Link from 'next/link';
import type { Article } from '@/types';
import { timeAgo } from '@/lib/utils';
import CategoryBadge from '@/components/CategoryBadge';

interface HeroArticleProps {
  article: Article;
}

export default function HeroArticle({ article }: HeroArticleProps) {
  const imageUrl = article.metadata?.featured_image?.imgix_url;
  const category = article.metadata?.category;
  const author = article.metadata?.author;
  const publishedDate =
    article.metadata?.published_date || article.created_at;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-surface-dark"
    >
      {/* Image */}
      <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=1400&h=600&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || article.title}
            width={1400}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand to-brand-dark" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          {category && <CategoryBadge category={category} size="md" />}
          <span className="text-xs text-gray-300">
            {timeAgo(publishedDate)}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 group-hover:text-brand-light transition-colors">
          {article.metadata?.headline || article.title}
        </h1>
        {article.metadata?.excerpt && (
          <p className="text-sm md:text-base text-gray-300 max-w-2xl line-clamp-2">
            {article.metadata.excerpt}
          </p>
        )}
        {author && (
          <div className="flex items-center gap-3 mt-4">
            {author.metadata?.avatar?.imgix_url && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
            )}
            <span className="text-sm font-medium text-white">
              {author.metadata?.name || author.title}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}