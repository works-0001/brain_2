// @vitest-environment node
// fs モジュールを使用するため Node.js 環境を明示指定する
import { describe, expect, it } from 'vitest';

import {
  getAllArticles,
  getArticleById,
  getArticlesByCategory,
  getCategories,
  getRelatedArticles,
} from './articles';

describe('getAllArticles', () => {
  it('記事を日付降順で返す', async () => {
    const articles = await getAllArticles();
    expect(articles.length).toBeGreaterThanOrEqual(2);
    // 日付降順の検証
    for (let i = 0; i < articles.length - 1; i++) {
      expect(articles[i]!.date >= articles[i + 1]!.date).toBe(true);
    }
  });

  it('各記事が Article 型を満たす', async () => {
    const articles = await getAllArticles();
    expect(articles[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      category: expect.any(String),
      date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    });
  });
});

describe('getArticleById', () => {
  it('存在する ID の記事を返す', async () => {
    const article = await getArticleById('article_001');
    expect(article).not.toBeNull();
    expect(article?.id).toBe('article_001');
  });

  it('存在しない ID は null を返す', async () => {
    const article = await getArticleById('not_exist');
    expect(article).toBeNull();
  });
});

describe('getCategories', () => {
  it('重複なしのカテゴリ一覧を返す', async () => {
    const categories = await getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(1);
    // 重複なしの検証
    expect(new Set(categories).size).toBe(categories.length);
  });
});

describe('getArticlesByCategory', () => {
  it('指定カテゴリの記事のみを返す', async () => {
    const articles = await getArticlesByCategory('テック');
    expect(articles.every((a) => a.category === 'テック')).toBe(true);
  });

  it('存在しないカテゴリは空配列を返す', async () => {
    const articles = await getArticlesByCategory('存在しない');
    expect(articles).toEqual([]);
  });
});

describe('getRelatedArticles', () => {
  it('存在する ID の記事を返す', async () => {
    const articles = await getRelatedArticles(['article_001']);
    expect(articles).toHaveLength(1);
    expect(articles[0]?.id).toBe('article_001');
  });

  it('存在しない ID はスキップする', async () => {
    const articles = await getRelatedArticles(['article_001', 'not_exist']);
    expect(articles).toHaveLength(1);
  });

  it('空配列を渡すと空配列を返す', async () => {
    const articles = await getRelatedArticles([]);
    expect(articles).toEqual([]);
  });
});
