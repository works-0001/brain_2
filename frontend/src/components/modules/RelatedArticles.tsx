import Link from 'next/link';

import type { Article } from '@brain-1/shared';

interface Props {
  articles: Article[];
}

export function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <aside>
      <h2 className="mb-4 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        関連記事
      </h2>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/articles/${article.id}`}
              className="group flex gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                src={`${basePath}/${article.thumbnail}`}
                alt={article.title}
                className="h-14 w-20 shrink-0 rounded object-cover"
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {article.title}
                </p>
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {article.date}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
