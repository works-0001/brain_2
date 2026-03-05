import app from './app.ts';

describe('Hono app', () => {
  it('GET / は JSON で APP_NAME を含むメッセージを返す', async () => {
    const response = await app.request('/');
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Brain API' });
  });
});
