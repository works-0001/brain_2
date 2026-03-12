import type { Movie } from '@brain-1/shared';

interface Props {
  movie: Movie;
}

export function YoutubeCard({ movie }: Props) {
  return (
    <a
      href={movie.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-red-300 hover:bg-red-50 dark:border-gray-700 dark:hover:border-red-800 dark:hover:bg-red-950/20"
    >
      {/* サムネイル */}
      <div className="relative shrink-0 overflow-hidden rounded">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="h-16 w-28 object-cover"
        />
        {/* 再生ボタンオーバーレイ */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
            ▶
          </div>
        </div>
      </div>
      <span className="flex-1 text-sm font-medium text-gray-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
        {movie.title}
      </span>
    </a>
  );
}
