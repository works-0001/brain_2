import Link from 'next/link';

import { ThemeToggle } from '@/components/elements/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          SUMMARIZE
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
