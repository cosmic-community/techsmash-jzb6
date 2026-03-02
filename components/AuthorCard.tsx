import Link from 'next/link';
import type { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  articleCount?: number;
}

export default function AuthorCard({ author, articleCount }: AuthorCardProps) {
  const avatarUrl = author.metadata?.avatar?.imgix_url;

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
        {avatarUrl ? (
          <img
            src={`${avatarUrl}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-brand bg-brand/10">
            {(author.metadata?.name || author.title).charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-text-primary group-hover:text-brand transition-colors">
        {author.metadata?.name || author.title}
      </h3>
      {author.metadata?.bio && (
        <p className="text-sm text-text-secondary mt-2 line-clamp-2">
          {author.metadata.bio}
        </p>
      )}
      {author.metadata?.twitter_handle && (
        <p className="text-xs text-brand mt-2 font-medium">
          @{author.metadata.twitter_handle}
        </p>
      )}
      {typeof articleCount === 'number' && (
        <p className="text-xs text-text-muted mt-3">
          {articleCount} {articleCount === 1 ? 'article' : 'articles'}
        </p>
      )}
    </Link>
  );
}