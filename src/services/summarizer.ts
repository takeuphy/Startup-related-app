/**
 * AI要約・翻訳サービス
 * OpenAI APIを使用して記事を日本語で要約
 */

import OpenAI from 'openai';
import { Article, SummarizedArticle, SummaryResult } from '../types';
import { fetchArticleContent } from './scraper';

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

const SYSTEM_PROMPT = `あなたは米国スタートアップ法務の専門家です。
英語の法律記事を日本語で分かりやすく要約してください。

要約時の注意点:
- スタートアップ創業者や経営者向けに分かりやすく説明
- 法的な専門用語は適切に日本語に翻訳し、必要に応じて簡単な説明を追加
- 実務的な観点から重要なポイントを強調
- 日本のスタートアップにも関連する情報があれば言及

出力形式（JSON）:
{
  "summary": "100-200文字の簡潔な要約",
  "japaneseSummary": "300-500文字の詳細な要約",
  "keyPoints": ["重要ポイント1", "重要ポイント2", "重要ポイント3"],
  "legalTopics": ["関連トピック1", "関連トピック2"]
}`;

/**
 * 記事を要約
 */
export async function summarizeArticle(
  article: Article
): Promise<SummaryResult> {
  try {
    const client = getOpenAIClient();

    // 記事の全文を取得（必要に応じて）
    let content = article.originalContent;
    if (!content || content.length < 100) {
      content = await fetchArticleContent(article.url);
    }

    if (!content || content.length < 50) {
      return {
        success: false,
        articleId: article.id,
        error: 'Article content is too short or empty',
      };
    }

    const userPrompt = `以下の記事を日本語で要約してください。

タイトル: ${article.title}
ソース: ${article.sourceName}
URL: ${article.url}

本文:
${content.substring(0, 4000)}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const resultText = response.choices[0]?.message?.content;
    if (!resultText) {
      throw new Error('Empty response from OpenAI');
    }

    const result = JSON.parse(resultText);

    const summarizedArticle: SummarizedArticle = {
      ...article,
      summary: result.summary || '',
      japaneseSummary: result.japaneseSummary || result.summary || '',
      keyPoints: result.keyPoints || [],
      legalTopics: result.legalTopics || [],
      summarizedAt: new Date(),
    };

    return {
      success: true,
      articleId: article.id,
      summary: summarizedArticle,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error summarizing article ${article.id}:`, errorMessage);
    return {
      success: false,
      articleId: article.id,
      error: errorMessage,
    };
  }
}

/**
 * 複数の記事を要約
 */
export async function summarizeArticles(
  articles: Article[]
): Promise<SummaryResult[]> {
  const results: SummaryResult[] = [];

  for (const article of articles) {
    const result = await summarizeArticle(article);
    results.push(result);
    // レート制限対策
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return results;
}

/**
 * APIキーが設定されているか確認
 */
export function isAPIKeyConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}
