import { APP_NAME } from '@brain-1/shared';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: `${APP_NAME} API` });
});

export default app;
