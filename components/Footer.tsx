import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-brand text-xl font-black tracking-tight">
                Tech
              </span>
              <span className="text-white text-xl font-black tracking-tight">
                Smash
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Breaking tech news, startup coverage, and industry analysis.
              Powered by Cosmic CMS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-brand transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-sm hover:text-brand transition-colors"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered by */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Powered By
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-brand transition-colors"
                >
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-brand transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-brand transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} TechSmash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}