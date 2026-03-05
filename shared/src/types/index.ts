/**
 * 共有型定義
 *
 * frontend・backend 間で共有する型定義・インターフェースを定義する。
 * プラットフォーム固有の API に依存しないこと。
 */

/**
 * アプリケーション共通の設定型
 *
 * frontend・backend の両方で参照される基本的な型定義。
 */
export interface AppConfig {
  readonly appName: string;
  readonly version: string;
}
