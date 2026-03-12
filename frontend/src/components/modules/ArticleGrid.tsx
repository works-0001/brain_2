import type { Article } from '@brain-1/shared';

import { ArticleCard } from './ArticleCard';

interface Props {
  articles: Article[];
}

export function ArticleGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <p className="py-16 text-center text-gray-500 dark:text-gray-400">
        記事がありません。
      </p>
    );
  }

  const [hero, ...rest] = articles;

  return (
    <div className="space-y-6">
      {/* ヒーロー記事（最新1件を大きく表示） */}
      {hero && (
        <div className="w-full">
          <ArticleCard article={hero} featured />
        </div>
      )}

      {/* サブ記事グリッド */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
