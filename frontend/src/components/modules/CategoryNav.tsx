import Link from 'next/link';

interface Props {
  categories: string[];
  current?: string;
}

export function CategoryNav({ categories, current }: Props) {
  return (
    <nav aria-label="カテゴリナビゲーション" className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
          !current
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        すべて
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/category/${encodeURIComponent(cat)}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            current === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}
