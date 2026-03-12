'use client';

import { useQueryState } from 'nuqs';

import type { Article } from '@brain-1/shared';

import { Pagination } from '@/components/elements/Pagination';

import { ArticleGrid } from './ArticleGrid';

interface Props {
  articles: Article[];
  perPage?: number;
}

export function ArticleListClient({ articles, perPage = 10 }: Props) {
  const [pageStr, setPage] = useQueryState('page', { defaultValue: '1' });
  const currentPage = Math.max(1, Number(pageStr));
  const totalPages = Math.ceil(articles.length / perPage);
  const paginated = articles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <>
      <ArticleGrid articles={paginated} />
      <Pagination current={currentPage} total={totalPages} onChange={setPage} />
    </>
  );
}
