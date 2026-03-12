import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { ArticleSchema, type Article } from '@brain-1/shared';

// Use import.meta.url to get a cwd-independent path.
// articles.ts is at frontend/src/lib/ → go up 3 levels to reach monorepo root,
// then descend into data/articles.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTICLES_DIR = path.join(__dirname, '../../../data/articles');

function readArticle(filename: string): Article | null {
  const filepath = path.join(ARTICLES_DIR, filename);
  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const json: unknown = JSON.parse(raw);
    const result = ArticleSchema.safeParse(json);
    if (!result.success) {
      console.error(`Invalid article: ${filename}`, result.error.issues);
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.json'));
  const articles = files
    .map((f) => readArticle(f))
    .filter((a): a is Article => a !== null);
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleById(id: string): Promise<Article | null> {
  return readArticle(`${id}.json`);
}

export async function getCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  return [...new Set(articles.map((a) => a.category))];
}

export async function getArticlesByCategory(
  category: string,
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.category === category);
}

export async function getRelatedArticles(ids: string[]): Promise<Article[]> {
  const results = await Promise.all(ids.map((id) => getArticleById(id)));
  return results.filter((a): a is Article => a !== null).slice(0, 5);
}
