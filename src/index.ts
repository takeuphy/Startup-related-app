/**
 * Startup Legal Summarizer - メインエントリーポイント
 * 米国スタートアップ法務情報を収集し、日本語で要約するアプリケーション
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

// 環境変数を読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// 静的ファイル（フロントエンド）
app.use(express.static(path.join(__dirname, '../public')));

// APIルート
app.use('/api', apiRoutes);

// フロントエンドのフォールバック
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         Startup Legal Summarizer                           ║
║         米国スタートアップ法務情報 要約アプリ                 ║
╠════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                  ║
║  API endpoint:      http://localhost:${PORT}/api              ║
╚════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  Warning: OPENAI_API_KEY is not set. Summarization will not work.');
    console.warn('   Create a .env file with your OpenAI API key.');
  }
});

export default app;
