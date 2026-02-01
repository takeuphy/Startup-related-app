/**
 * ユーティリティ関数
 */

import crypto from 'crypto';

/**
 * ユニークIDを生成
 */
export function generateId(): string {
  return crypto.randomBytes(8).toString('hex');
}

/**
 * テキストを指定文字数で切り詰め
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * 日付をフォーマット
 */
export function formatDate(date: Date | null): string {
  if (!date) return '不明';
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * HTMLタグを除去
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * 遅延実行
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * レート制限付きで関数を実行
 */
export async function withRateLimit<T>(
  fn: () => Promise<T>,
  delayMs: number = 1000
): Promise<T> {
  const result = await fn();
  await delay(delayMs);
  return result;
}
