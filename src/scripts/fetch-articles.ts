/**
 * 記事取得スクリプト
 * コマンドラインから記事を取得・要約するためのスクリプト
 *
 * 使用方法:
 *   npm run fetch              - すべてのソースから記事を取得
 *   npm run fetch -- --summarize  - 取得後に要約も実行
 */

import dotenv from 'dotenv';
import { fetchAllSources } from '../services/scraper';
import { summarizeArticles, isAPIKeyConfigured } from '../services/summarizer';
import {
  saveArticles,
  saveSummaries,
  getUnsummarizedArticles,
  getStorageStats,
} from '../services/storage';

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const shouldSummarize = args.includes('--summarize') || args.includes('-s');

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Startup Legal Summarizer - 記事取得スクリプト              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // 記事を取得
  console.log('📥 記事を取得中...\n');
  const results = await fetchAllSources();

  let totalFetched = 0;
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    const count = result.articles.length;
    totalFetched += count;
    console.log(`  ${status} ${result.sourceId}: ${count}件`);
    if (result.error) {
      console.log(`     └─ Error: ${result.error}`);
    }
  }

  // 記事を保存
  const allArticles = results.flatMap((r) => r.articles);
  await saveArticles(allArticles);

  console.log(`\n📊 合計 ${totalFetched} 件の記事を取得しました\n`);

  // 要約が要求された場合
  if (shouldSummarize) {
    if (!isAPIKeyConfigured()) {
      console.log('⚠️  OPENAI_API_KEY が設定されていません。');
      console.log('   .env ファイルに API キーを設定してください。\n');
      return;
    }

    console.log('📝 要約を実行中...\n');

    const unsummarized = await getUnsummarizedArticles();
    const toSummarize = unsummarized.slice(0, 5); // 最大5件

    if (toSummarize.length === 0) {
      console.log('   要約する記事がありません。\n');
    } else {
      console.log(`   ${toSummarize.length} 件の記事を要約します...\n`);

      const summaryResults = await summarizeArticles(toSummarize);
      const successfulSummaries = summaryResults
        .filter((r) => r.success && r.summary)
        .map((r) => r.summary!);

      await saveSummaries(successfulSummaries);

      for (const result of summaryResults) {
        const status = result.success ? '✅' : '❌';
        const article = toSummarize.find((a) => a.id === result.articleId);
        console.log(`   ${status} ${article?.title?.substring(0, 50)}...`);
        if (result.error) {
          console.log(`      └─ Error: ${result.error}`);
        }
      }

      console.log(
        `\n   ${successfulSummaries.length} 件の要約が完了しました\n`
      );
    }
  }

  // 統計情報
  const stats = await getStorageStats();
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 ストレージ統計:`);
  console.log(`   記事数: ${stats.articleCount}`);
  console.log(`   要約済み: ${stats.summaryCount}`);
  console.log(`   未処理: ${stats.unsummarizedCount}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);
