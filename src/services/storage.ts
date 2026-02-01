/**
 * データストレージサービス
 * シンプルなJSONファイルベースのストレージ
 */

import fs from 'fs/promises';
import path from 'path';
import { Article, SummarizedArticle } from '../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const SUMMARIES_FILE = path.join(DATA_DIR, 'summaries.json');

interface StorageData {
  articles: Article[];
  lastUpdated: string;
}

interface SummaryStorageData {
  summaries: SummarizedArticle[];
  lastUpdated: string;
}

/**
 * データディレクトリを初期化
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // ディレクトリが既に存在する場合は無視
  }
}

/**
 * 記事を保存
 */
export async function saveArticles(articles: Article[]): Promise<void> {
  await ensureDataDir();

  const existingData = await loadArticles();
  const existingUrls = new Set(existingData.map((a) => a.url));

  // 重複を除いて新しい記事を追加
  const newArticles = articles.filter((a) => !existingUrls.has(a.url));
  const allArticles = [...newArticles, ...existingData];

  // 最新100件のみ保持
  const trimmedArticles = allArticles.slice(0, 100);

  const data: StorageData = {
    articles: trimmedArticles,
    lastUpdated: new Date().toISOString(),
  };

  await fs.writeFile(ARTICLES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * 記事を読み込み
 */
export async function loadArticles(): Promise<Article[]> {
  try {
    const content = await fs.readFile(ARTICLES_FILE, 'utf-8');
    const data: StorageData = JSON.parse(content);
    return data.articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
      fetchedAt: new Date(a.fetchedAt),
    }));
  } catch {
    return [];
  }
}

/**
 * 要約を保存
 */
export async function saveSummaries(
  summaries: SummarizedArticle[]
): Promise<void> {
  await ensureDataDir();

  const existingData = await loadSummaries();
  const existingIds = new Set(existingData.map((s) => s.id));

  // 重複を除いて新しい要約を追加
  const newSummaries = summaries.filter((s) => !existingIds.has(s.id));
  const allSummaries = [...newSummaries, ...existingData];

  // 最新100件のみ保持
  const trimmedSummaries = allSummaries.slice(0, 100);

  const data: SummaryStorageData = {
    summaries: trimmedSummaries,
    lastUpdated: new Date().toISOString(),
  };

  await fs.writeFile(SUMMARIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * 要約を読み込み
 */
export async function loadSummaries(): Promise<SummarizedArticle[]> {
  try {
    const content = await fs.readFile(SUMMARIES_FILE, 'utf-8');
    const data: SummaryStorageData = JSON.parse(content);
    return data.summaries.map((s) => ({
      ...s,
      publishedAt: s.publishedAt ? new Date(s.publishedAt) : null,
      fetchedAt: new Date(s.fetchedAt),
      summarizedAt: new Date(s.summarizedAt),
    }));
  } catch {
    return [];
  }
}

/**
 * 要約済みでない記事を取得
 */
export async function getUnsummarizedArticles(): Promise<Article[]> {
  const articles = await loadArticles();
  const summaries = await loadSummaries();
  const summarizedIds = new Set(summaries.map((s) => s.id));

  return articles.filter((a) => !summarizedIds.has(a.id));
}

/**
 * ストレージの統計情報を取得
 */
export async function getStorageStats(): Promise<{
  articleCount: number;
  summaryCount: number;
  unsummarizedCount: number;
}> {
  const articles = await loadArticles();
  const summaries = await loadSummaries();
  const unsummarized = await getUnsummarizedArticles();

  return {
    articleCount: articles.length,
    summaryCount: summaries.length,
    unsummarizedCount: unsummarized.length,
  };
}
