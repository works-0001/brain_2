import { Suspense } from 'react';

import { ArticleListClient } from '@/components/modules/ArticleListClient';
import { CategoryNav } from '@/components/modules/CategoryNav';
import { getAllArticles, getCategories } from '@/lib/articles';

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <CategoryNav categories={categories} />
      </div>
      <Suspense>
        <ArticleListClient articles={articles} perPage={10} />
      </Suspense>
    </div>
  );
}
