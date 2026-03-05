import { Hono } from 'hono';

import { APP_NAME } from '@brain-1/shared';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: `${APP_NAME} API` });
});

export default app;
