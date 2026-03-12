import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ArticleListClient } from '@/components/modules/ArticleListClient';
import { CategoryNav } from '@/components/modules/CategoryNav';
import { getArticlesByCategory, getCategories } from '@/lib/articles';

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((name) => ({ name: encodeURIComponent(name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  return {
    title: name,
    description: `${name} カテゴリの記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const [articles, categories] = await Promise.all([
    getArticlesByCategory(name),
    getCategories(),
  ]);

  if (articles.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <CategoryNav categories={categories} current={name} />
      </div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {name}
      </h1>
      <Suspense>
        <ArticleListClient articles={articles} perPage={10} />
      </Suspense>
    </div>
  );
}
