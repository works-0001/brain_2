import { serve } from '@hono/node-server';

import app from './app.js';

const PORT = 3001;

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
