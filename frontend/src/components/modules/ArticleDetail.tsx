import type { Article } from '@brain-1/shared';

import { YoutubeCard } from '@/components/elements/YoutubeCard';

interface Props {
  article: Article;
}

export function ArticleDetail({ article }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <article>
      {/* サムネイル */}
      <div className="mb-6 overflow-hidden rounded-xl">
        <img
          src={`${basePath}/${article.thumbnail}`}
          alt={article.title}
          className="h-64 w-full object-cover md:h-80"
        />
      </div>

      {/* メタ情報 */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="rounded bg-blue-100 px-2 py-0.5 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {article.category}
        </span>
        <time dateTime={article.date}>{article.date}</time>
        <span>{article.author}</span>
      </div>

      {/* タイトル */}
      <h1 className="mb-6 text-2xl leading-snug font-bold text-gray-900 md:text-3xl dark:text-white">
        {article.title}
      </h1>

      {/* 本文 */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {article.text
          .split('\n')
          .map((line, i) =>
            line === '' ? <br key={i} /> : <p key={i}>{line}</p>,
          )}
      </div>

      {/* 画像ギャラリー */}
      {article.images && article.images.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {article.images.map((img, i) => (
            <img
              key={i}
              src={`${basePath}/${img}`}
              alt={`画像 ${i + 1}`}
              className="w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {/* 動画 */}
      {article.movies && article.movies.length > 0 && (
        <div className="mt-8 space-y-3">
          <h2 className="text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            関連動画
          </h2>
          {article.movies.map((movie, i) => (
            <YoutubeCard key={i} movie={movie} />
          ))}
        </div>
      )}
    </article>
  );
}
