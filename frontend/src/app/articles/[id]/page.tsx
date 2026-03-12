import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleDetail } from '@/components/modules/ArticleDetail';
import { RelatedArticles } from '@/components/modules/RelatedArticles';
import {
  getAllArticles,
  getArticleById,
  getRelatedArticles,
} from '@/lib/articles';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [`${siteUrl}${basePath}/${article.thumbnail}`],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const related = await getRelatedArticles(article.related ?? []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        {/* 記事本文（左・2/3幅） */}
        <div className="min-w-0 flex-1 lg:w-2/3">
          <ArticleDetail article={article} />
        </div>

        {/* サイドバー（右・1/3幅） */}
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-24">
            <RelatedArticles articles={related} />
          </div>
        </div>
      </div>
    </div>
  );
}
