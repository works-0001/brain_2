import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Article } from '@brain-1/shared';

import { ArticleCard } from './ArticleCard';

const mockArticle: Article = {
  id: 'article_001',
  title: 'テスト記事タイトル',
  category: 'テック',
  date: '2026-03-13',
  author: '著者名',
  thumbnail: 'assets/images/thumb.jpeg',
  summary: 'これはテスト要約文です。',
  text: '本文',
};

describe('ArticleCard', () => {
  it('タイトルを表示する', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('テスト記事タイトル')).toBeInTheDocument();
  });

  it('カテゴリを表示する', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('テック')).toBeInTheDocument();
  });

  it('要約を表示する', () => {
    render(<ArticleCard article={mockArticle} featured />);
    expect(screen.getByText('これはテスト要約文です。')).toBeInTheDocument();
  });

  it('記事詳細へのリンクを持つ', () => {
    render(<ArticleCard article={mockArticle} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/articles/article_001');
  });
});
