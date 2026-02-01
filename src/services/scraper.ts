/**
 * Webスクレイピングとデータ収集サービス
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import { Source, sources } from '../config/sources';
import { Article, FetchResult } from '../types';
import { generateId } from '../utils/helpers';

const rssParser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'StartupLegalSummarizer/1.0',
  },
});

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; StartupLegalSummarizer/1.0; +https://github.com/startup-legal-summarizer)',
  },
});

/**
 * RSSフィードから記事を取得
 */
async function fetchFromRSS(source: Source): Promise<Article[]> {
  const feed = await rssParser.parseURL(source.url);
  const articles: Article[] = [];

  for (const item of feed.items.slice(0, 10)) {
    // 最新10件のみ
    if (!item.title || !item.link) continue;

    articles.push({
      id: generateId(),
      sourceId: source.id,
      sourceName: source.name,
      title: item.title,
      originalContent: item.contentSnippet || item.content || item.summary || '',
      url: item.link,
      publishedAt: item.pubDate ? new Date(item.pubDate) : null,
      fetchedAt: new Date(),
      category: source.category,
    });
  }

  return articles;
}

/**
 * Webページから記事を取得
 */
async function fetchFromWeb(source: Source): Promise<Article[]> {
  if (!source.selectors) {
    throw new Error(`No selectors defined for source: ${source.id}`);
  }

  const response = await axiosInstance.get(source.url);
  const $ = cheerio.load(response.data);
  const articles: Article[] = [];

  $(source.selectors.article)
    .slice(0, 10)
    .each((_, element) => {
      const $el = $(element);
      const title = $el.find(source.selectors!.title).text().trim();
      const content = $el.find(source.selectors!.content).text().trim();
      const linkEl = source.selectors!.link
        ? $el.find(source.selectors!.link)
        : $el;
      let url = linkEl.attr('href') || '';

      // 相対URLを絶対URLに変換
      if (url && !url.startsWith('http')) {
        const baseUrl = new URL(source.url);
        url = new URL(url, baseUrl.origin).toString();
      }

      if (title && url) {
        articles.push({
          id: generateId(),
          sourceId: source.id,
          sourceName: source.name,
          title,
          originalContent: content,
          url,
          publishedAt: null,
          fetchedAt: new Date(),
          category: source.category,
        });
      }
    });

  return articles;
}

/**
 * 単一ソースから記事を取得
 */
export async function fetchFromSource(source: Source): Promise<FetchResult> {
  try {
    const articles =
      source.type === 'rss'
        ? await fetchFromRSS(source)
        : await fetchFromWeb(source);

    return {
      success: true,
      sourceId: source.id,
      articles,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching from ${source.id}:`, errorMessage);
    return {
      success: false,
      sourceId: source.id,
      articles: [],
      error: errorMessage,
    };
  }
}

/**
 * すべてのソースから記事を取得
 */
export async function fetchAllSources(): Promise<FetchResult[]> {
  const results = await Promise.allSettled(
    sources.map((source) => fetchFromSource(source))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return {
      success: false,
      sourceId: sources[index].id,
      articles: [],
      error: result.reason?.message || 'Unknown error',
    };
  });
}

/**
 * 記事の全文を取得
 */
export async function fetchArticleContent(url: string): Promise<string> {
  try {
    const response = await axiosInstance.get(url);
    const $ = cheerio.load(response.data);

    // 不要な要素を削除
    $('script, style, nav, header, footer, aside, .sidebar, .advertisement').remove();

    // メインコンテンツを抽出（一般的なセレクタを試行）
    const selectors = [
      'article',
      'main',
      '.post-content',
      '.article-content',
      '.entry-content',
      '.content',
      '#content',
    ];

    for (const selector of selectors) {
      const content = $(selector).text().trim();
      if (content && content.length > 200) {
        return content.substring(0, 5000); // 最大5000文字
      }
    }

    // フォールバック: bodyのテキスト
    return $('body').text().trim().substring(0, 5000);
  } catch (error) {
    console.error(`Error fetching article content from ${url}:`, error);
    return '';
  }
}
