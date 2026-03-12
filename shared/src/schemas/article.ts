import { z } from 'zod';

export const MovieSchema = z.object({
  url: z.string().url(),
  thumbnail: z.string().url(),
  title: z.string(),
});

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.iso.date(),
  author: z.string(),
  thumbnail: z.string().startsWith('assets/'),
  summary: z.string(),
  text: z.string(),
  images: z.array(z.string().startsWith('assets/')).optional(),
  movies: z.array(MovieSchema).optional(),
  related: z.array(z.string()).optional(),
});

export type Article = z.infer<typeof ArticleSchema>;
export type Movie = z.infer<typeof MovieSchema>;
