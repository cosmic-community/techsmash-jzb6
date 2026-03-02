import type { Metadata } from 'next';
import { getAuthors } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Authors — TechSmash',
  description: 'Meet the writers behind TechSmash.',
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-text-primary">
          Our Writers
        </h1>
        <p className="text-lg text-text-secondary mt-3 max-w-2xl">
          Meet the talented journalists and analysts behind TechSmash&apos;s
          coverage.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-text-muted">
            {authors.length}{' '}
            {authors.length === 1 ? 'author' : 'authors'}
          </span>
          <div className="h-0.5 flex-1 bg-brand" />
        </div>
      </header>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✍️</div>
          <h2 className="text-xl font-bold text-text-primary">
            No authors yet
          </h2>
          <p className="text-text-secondary mt-2">
            Add authors in your Cosmic dashboard.
          </p>
        </div>
      )}
    </div>
  );
}