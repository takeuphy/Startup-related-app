/**
 * REST APIルート定義
 */

import { Router, Request, Response } from 'express';
import { sources, categories } from '../config/sources';
import { fetchAllSources, fetchFromSource } from '../services/scraper';
import { summarizeArticle, summarizeArticles, isAPIKeyConfigured } from '../services/summarizer';
import {
  loadArticles,
  loadSummaries,
  saveArticles,
  saveSummaries,
  getUnsummarizedArticles,
  getStorageStats,
} from '../services/storage';
import { ApiResponse, PaginatedResponse, SummarizedArticle, Article } from '../types';

const router = Router();

/**
 * ヘルスチェック
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      apiKeyConfigured: isAPIKeyConfigured(),
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * ストレージ統計
 */
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const stats = await getStorageStats();
    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * ソース一覧
 */
router.get('/sources', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      sources,
      categories,
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * 記事一覧（要約済み）
 */
router.get('/summaries', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const category = req.query.category as string;

    let summaries = await loadSummaries();

    // カテゴリフィルタ
    if (category) {
      summaries = summaries.filter((s) => s.category === category);
    }

    // ソート（最新順）
    summaries.sort((a, b) => {
      const dateA = a.summarizedAt?.getTime() || 0;
      const dateB = b.summarizedAt?.getTime() || 0;
      return dateB - dateA;
    });

    const total = summaries.length;
    const startIndex = (page - 1) * limit;
    const paginatedSummaries = summaries.slice(startIndex, startIndex + limit);

    const response: PaginatedResponse<SummarizedArticle> = {
      success: true,
      data: paginatedSummaries,
      page,
      limit,
      total,
      hasMore: startIndex + limit < total,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * 記事一覧（未加工）
 */
router.get('/articles', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

    const articles = await loadArticles();
    const total = articles.length;
    const startIndex = (page - 1) * limit;
    const paginatedArticles = articles.slice(startIndex, startIndex + limit);

    const response: PaginatedResponse<Article> = {
      success: true,
      data: paginatedArticles,
      page,
      limit,
      total,
      hasMore: startIndex + limit < total,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * 記事を取得（すべてのソースから）
 */
router.post('/fetch', async (_req: Request, res: Response) => {
  try {
    const results = await fetchAllSources();
    const allArticles = results.flatMap((r) => r.articles);

    await saveArticles(allArticles);

    res.json({
      success: true,
      data: {
        fetched: allArticles.length,
        sources: results.map((r) => ({
          sourceId: r.sourceId,
          success: r.success,
          count: r.articles.length,
          error: r.error,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * 特定のソースから記事を取得
 */
router.post('/fetch/:sourceId', async (req: Request, res: Response) => {
  try {
    const source = sources.find((s) => s.id === req.params.sourceId);
    if (!source) {
      return res.status(404).json({
        success: false,
        error: 'Source not found',
        timestamp: new Date().toISOString(),
      });
    }

    const result = await fetchFromSource(source);
    if (result.success) {
      await saveArticles(result.articles);
    }

    res.json({
      success: result.success,
      data: {
        fetched: result.articles.length,
        error: result.error,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * 未要約の記事を要約
 */
router.post('/summarize', async (req: Request, res: Response) => {
  try {
    if (!isAPIKeyConfigured()) {
      return res.status(400).json({
        success: false,
        error: 'OpenAI API key is not configured',
        timestamp: new Date().toISOString(),
      });
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 5, 10);
    const unsummarized = await getUnsummarizedArticles();
    const toSummarize = unsummarized.slice(0, limit);

    if (toSummarize.length === 0) {
      return res.json({
        success: true,
        data: {
          summarized: 0,
          message: 'No articles to summarize',
        },
        timestamp: new Date().toISOString(),
      });
    }

    const results = await summarizeArticles(toSummarize);
    const successfulSummaries = results
      .filter((r) => r.success && r.summary)
      .map((r) => r.summary!);

    await saveSummaries(successfulSummaries);

    res.json({
      success: true,
      data: {
        summarized: successfulSummaries.length,
        failed: results.filter((r) => !r.success).length,
        results: results.map((r) => ({
          articleId: r.articleId,
          success: r.success,
          error: r.error,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * 特定の記事を要約
 */
router.post('/summarize/:articleId', async (req: Request, res: Response) => {
  try {
    if (!isAPIKeyConfigured()) {
      return res.status(400).json({
        success: false,
        error: 'OpenAI API key is not configured',
        timestamp: new Date().toISOString(),
      });
    }

    const articles = await loadArticles();
    const article = articles.find((a) => a.id === req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
        timestamp: new Date().toISOString(),
      });
    }

    const result = await summarizeArticle(article);

    if (result.success && result.summary) {
      await saveSummaries([result.summary]);
    }

    res.json({
      success: result.success,
      data: result.summary,
      error: result.error,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
