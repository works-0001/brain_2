import { describe, expect, it } from 'vitest';

import { ArticleSchema, MovieSchema } from './article.ts';

describe('MovieSchema', () => {
  it('有効な動画データをパースできる', () => {
    const result = MovieSchema.safeParse({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      title: '動画タイトル',
    });
    expect(result.success).toBe(true);
  });

  it('無効な URL を拒否する', () => {
    const result = MovieSchema.safeParse({
      url: 'not-a-url',
      thumbnail: 'https://img.youtube.com/vi/xxx/hqdefault.jpg',
      title: 'タイトル',
    });
    expect(result.success).toBe(false);
  });
});

describe('ArticleSchema', () => {
  const validArticle = {
    id: 'article_001',
    title: 'テスト記事',
    category: 'テック',
    date: '2026-03-13',
    author: '著者',
    thumbnail: 'assets/images/thumb.jpeg',
    summary: '要約テキスト',
    text: '本文テキスト',
  };

  it('必須フィールドのみの記事をパースできる', () => {
    const result = ArticleSchema.safeParse(validArticle);
    expect(result.success).toBe(true);
  });

  it('全フィールドを含む記事をパースできる', () => {
    const result = ArticleSchema.safeParse({
      ...validArticle,
      images: ['assets/images/img1.jpeg'],
      movies: [
        {
          url: 'https://www.youtube.com/watch?v=abc',
          thumbnail: 'https://img.youtube.com/vi/abc/hqdefault.jpg',
          title: '動画',
        },
      ],
      related: ['article_002'],
    });
    expect(result.success).toBe(true);
  });

  it('YYYY-MM-DD 以外の日付を拒否する', () => {
    const result = ArticleSchema.safeParse({
      ...validArticle,
      date: '2026/03/13',
    });
    expect(result.success).toBe(false);
  });

  it('assets/ で始まらない thumbnail を拒否する', () => {
    const result = ArticleSchema.safeParse({
      ...validArticle,
      thumbnail: '/images/thumb.jpeg',
    });
    expect(result.success).toBe(false);
  });
});
