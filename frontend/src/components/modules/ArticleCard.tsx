import Link from 'next/link';

import type { Article } from '@brain-1/shared';

interface Props {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const thumbnailSrc = `${basePath}/${article.thumbnail}`;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {/* サムネイル */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={thumbnailSrc}
          alt={article.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `${basePath}/assets/images/placeholder.jpeg`;
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="rounded bg-blue-100 px-2 py-0.5 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {article.category}
          </span>
          <time dateTime={article.date}>{article.date}</time>
        </div>
        <h3
          className={`leading-snug font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${featured ? 'text-xl' : 'text-base'}`}
        >
          {article.title}
        </h3>
        {featured && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {article.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
