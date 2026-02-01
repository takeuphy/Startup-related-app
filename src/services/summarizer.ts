/**
 * AI要約・翻訳サービス
 * OpenAI または Google Gemini を使用して記事を日本語で要約
 *
 * 環境変数でプロバイダーを選択:
 * - AI_PROVIDER=gemini (デフォルト、コスト効率が良い)
 * - AI_PROVIDER=openai
 */

import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Article, SummarizedArticle, SummaryResult } from '../types';
import { fetchArticleContent } from './scraper';

// AI プロバイダーの種類
type AIProvider = 'openai' | 'gemini';

// クライアントのキャッシュ
let openaiClient: OpenAI | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

/**
 * 使用するAIプロバイダーを取得
 */
function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  if (provider === 'openai') return 'openai';
  // デフォルトはGemini（コスト効率が良いため）
  return 'gemini';
}

/**
 * OpenAIクライアントを取得
 */
function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

/**
 * Geminiクライアントを取得
 */
function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    geminiClient = new GoogleGenerativeAI(apiKey);
  }
  return geminiClient;
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
}

必ずJSON形式で出力してください。`;

/**
 * OpenAIで要約を実行
 */
async function summarizeWithOpenAI(
  title: string,
  sourceName: string,
  url: string,
  content: string
): Promise<{
  summary: string;
  japaneseSummary: string;
  keyPoints: string[];
  legalTopics: string[];
}> {
  const client = getOpenAIClient();

  const userPrompt = `以下の記事を日本語で要約してください。

タイトル: ${title}
ソース: ${sourceName}
URL: ${url}

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

  return JSON.parse(resultText);
}

/**
 * Geminiで要約を実行
 */
async function summarizeWithGemini(
  title: string,
  sourceName: string,
  url: string,
  content: string
): Promise<{
  summary: string;
  japaneseSummary: string;
  keyPoints: string[];
  legalTopics: string[];
}> {
  const client = getGeminiClient();
  // gemini-1.5-flash は高速かつ安価
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `${SYSTEM_PROMPT}

以下の記事を日本語で要約してください。

タイトル: ${title}
ソース: ${sourceName}
URL: ${url}

本文:
${content.substring(0, 4000)}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  // JSONを抽出（Geminiはマークダウンで囲むことがある）
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON from Gemini response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * 記事を要約
 */
export async function summarizeArticle(
  article: Article
): Promise<SummaryResult> {
  try {
    const provider = getAIProvider();

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

    let result: {
      summary: string;
      japaneseSummary: string;
      keyPoints: string[];
      legalTopics: string[];
    };

    if (provider === 'openai') {
      result = await summarizeWithOpenAI(
        article.title,
        article.sourceName,
        article.url,
        content
      );
    } else {
      result = await summarizeWithGemini(
        article.title,
        article.sourceName,
        article.url,
        content
      );
    }

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
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
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
  const provider = getAIProvider();

  console.log(`Using AI provider: ${provider}`);

  for (const article of articles) {
    const result = await summarizeArticle(article);
    results.push(result);
    // レート制限対策（Geminiは緩いが念のため）
    const delay = provider === 'gemini' ? 500 : 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return results;
}

/**
 * APIキーが設定されているか確認
 */
export function isAPIKeyConfigured(): boolean {
  const provider = getAIProvider();
  if (provider === 'gemini') {
    return !!process.env.GEMINI_API_KEY;
  }
  return !!process.env.OPENAI_API_KEY;
}

/**
 * 現在のAIプロバイダー情報を取得
 */
export function getProviderInfo(): {
  provider: AIProvider;
  isConfigured: boolean;
} {
  const provider = getAIProvider();
  return {
    provider,
    isConfigured: isAPIKeyConfigured(),
  };
}
