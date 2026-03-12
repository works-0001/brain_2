'use client';

interface Props {
  current: number;
  total: number;
  // nuqs v2 の useQueryState setter は Promise を返すため unknown で受け取る
  onChange: (page: string) => unknown;
}

export function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;

  return (
    <nav
      aria-label="ページネーション"
      className="mt-8 flex justify-center gap-2"
    >
      <button
        onClick={() => onChange(String(current - 1))}
        disabled={current <= 1}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm enabled:hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:enabled:hover:bg-gray-800"
      >
        前へ
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(String(page))}
          aria-current={page === current ? 'page' : undefined}
          className={`rounded-md border px-4 py-2 text-sm ${
            page === current
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(String(current + 1))}
        disabled={current >= total}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm enabled:hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:enabled:hover:bg-gray-800"
      >
        次へ
      </button>
    </nav>
  );
}
