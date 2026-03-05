import type { AppConfig } from '@brain-1/shared';
import { APP_NAME } from '@brain-1/shared';

/** アプリケーション設定（shared 型の使用検証） */
const config: AppConfig = {
  appName: APP_NAME,
  version: '0.0.0',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">{config.appName}</h1>
    </main>
  );
}
