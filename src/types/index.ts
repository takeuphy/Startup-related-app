/**
 * アプリケーション全体で使用する型定義
 */

export interface Article {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  originalContent: string;
  url: string;
  publishedAt: Date | null;
  fetchedAt: Date;
  category: string;
}

export interface SummarizedArticle extends Article {
  summary: string;           // 日本語要約
  japaneseSummary: string;   // 詳細な日本語要約
  keyPoints: string[];       // 重要ポイント（日本語）
  legalTopics: string[];     // 関連する法的トピック
  summarizedAt: Date;
}

export interface FetchResult {
  success: boolean;
  sourceId: string;
  articles: Article[];
  error?: string;
}

export interface SummaryResult {
  success: boolean;
  articleId: string;
  summary?: SummarizedArticle;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
