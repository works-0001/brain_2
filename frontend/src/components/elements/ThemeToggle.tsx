'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ハイドレーション後にのみ表示（サーバー・クライアント不一致防止）
  // eslint-disable-next-line react-hooks/set-state-in-effect -- マウント検出は useEffect 内 setState の正当なユースケース
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={
        resolvedTheme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'
      }
      className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
