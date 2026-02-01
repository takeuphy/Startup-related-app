/**
 * Startup Legal Summarizer - フロントエンドアプリケーション
 */

const API_BASE = '/api';

// 状態管理
const state = {
  currentPage: 1,
  limit: 10,
  category: '',
  isLoading: false,
};

// DOM要素
const elements = {
  stats: {
    articleCount: document.getElementById('articleCount'),
    summaryCount: document.getElementById('summaryCount'),
    unsummarizedCount: document.getElementById('unsummarizedCount'),
  },
  buttons: {
    fetch: document.getElementById('fetchBtn'),
    summarize: document.getElementById('summarizeBtn'),
    refresh: document.getElementById('refreshBtn'),
  },
  status: document.getElementById('status'),
  categoryFilter: document.getElementById('categoryFilter'),
  articles: document.getElementById('articles'),
  pagination: document.getElementById('pagination'),
};

// カテゴリ名のマッピング
const categoryNames = {
  'government-legislation': '法令・規則・パブリックコメント',
  'securities-finance': '会社・資金調達・証券規制',
  'tax-accounting': '税務・会計',
  'ip-standards': '知的財産・標準',
  'labor-employment': '労務・雇用',
  'privacy-cyber': 'プライバシー・サイバー',
  'immigration': '移民・グローバル人材',
  'sanctions-export': '制裁・輸出管理',
  'corporate-litigation': '会社法・判例',
  'vc-startup-docs': 'VC・スタートアップ標準ドキュメント',
  'legal-news': '法律ニュース',
  'research-data': 'データベース・調査',
  'startup-legal': 'スタートアップ法務',
  'startup-resource': 'スタートアップリソース',
  'fintech-regulation': 'FinTech規制',
  'law-firm': '法律事務所',
};

// ユーティリティ関数
function formatDate(dateString) {
  if (!dateString) return '不明';
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function showStatus(message, type = 'loading') {
  elements.status.textContent = message;
  elements.status.className = `status ${type}`;
  elements.status.classList.remove('hidden');
}

function hideStatus() {
  elements.status.classList.add('hidden');
}

function setButtonsDisabled(disabled) {
  Object.values(elements.buttons).forEach((btn) => {
    btn.disabled = disabled;
  });
}

// API呼び出し
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
}

// 統計情報を取得
async function loadStats() {
  try {
    const data = await fetchAPI('/stats');
    if (data.success) {
      elements.stats.articleCount.textContent = data.data.articleCount;
      elements.stats.summaryCount.textContent = data.data.summaryCount;
      elements.stats.unsummarizedCount.textContent = data.data.unsummarizedCount;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// 要約記事を取得
async function loadSummaries() {
  try {
    state.isLoading = true;
    elements.articles.innerHTML = '<p class="loading">読み込み中...</p>';

    const params = new URLSearchParams({
      page: state.currentPage,
      limit: state.limit,
    });
    if (state.category) {
      params.append('category', state.category);
    }

    const data = await fetchAPI(`/summaries?${params}`);

    if (data.success) {
      renderArticles(data.data);
      renderPagination(data);
    } else {
      elements.articles.innerHTML = `<p class="empty-state">エラー: ${data.error}</p>`;
    }
  } catch (error) {
    console.error('Failed to load summaries:', error);
    elements.articles.innerHTML = '<p class="empty-state">読み込みに失敗しました</p>';
  } finally {
    state.isLoading = false;
  }
}

// 記事をレンダリング
function renderArticles(articles) {
  if (!articles || articles.length === 0) {
    elements.articles.innerHTML = `
      <div class="empty-state">
        <p>要約済みの記事がありません</p>
        <p>「記事を収集」ボタンをクリックして記事を取得し、「要約を実行」で要約してください。</p>
      </div>
    `;
    return;
  }

  elements.articles.innerHTML = articles
    .map(
      (article) => `
    <article class="article-card">
      <div class="article-header">
        <h3 class="article-title">
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(article.title)}
          </a>
        </h3>
        <span class="article-category">${categoryNames[article.category] || article.category}</span>
      </div>

      <div class="article-meta">
        <span>ソース: ${escapeHtml(article.sourceName)}</span>
        <span>要約日: ${formatDate(article.summarizedAt)}</span>
      </div>

      <div class="article-summary">
        ${escapeHtml(article.japaneseSummary || article.summary)}
      </div>

      ${
        article.keyPoints && article.keyPoints.length > 0
          ? `
        <div class="article-keypoints">
          <h4>重要ポイント</h4>
          <ul>
            ${article.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
          </ul>
        </div>
      `
          : ''
      }

      ${
        article.legalTopics && article.legalTopics.length > 0
          ? `
        <div class="article-topics">
          ${article.legalTopics.map((topic) => `<span class="topic-tag">${escapeHtml(topic)}</span>`).join('')}
        </div>
      `
          : ''
      }
    </article>
  `
    )
    .join('');
}

// ページネーションをレンダリング
function renderPagination(data) {
  const totalPages = Math.ceil(data.total / data.limit);

  if (totalPages <= 1) {
    elements.pagination.innerHTML = '';
    return;
  }

  let html = '';

  if (state.currentPage > 1) {
    html += `<button onclick="goToPage(${state.currentPage - 1})">前へ</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === state.currentPage) {
      html += `<button class="active">${i}</button>`;
    } else {
      html += `<button onclick="goToPage(${i})">${i}</button>`;
    }
  }

  if (state.currentPage < totalPages) {
    html += `<button onclick="goToPage(${state.currentPage + 1})">次へ</button>`;
  }

  elements.pagination.innerHTML = html;
}

function goToPage(page) {
  state.currentPage = page;
  loadSummaries();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 記事を収集
async function fetchArticles() {
  try {
    setButtonsDisabled(true);
    showStatus('記事を収集中...', 'loading');

    const data = await fetchAPI('/fetch', { method: 'POST' });

    if (data.success) {
      showStatus(`${data.data.fetched}件の記事を収集しました`, 'success');
      await loadStats();
    } else {
      showStatus(`エラー: ${data.error}`, 'error');
    }
  } catch (error) {
    showStatus(`エラー: ${error.message}`, 'error');
  } finally {
    setButtonsDisabled(false);
    setTimeout(hideStatus, 3000);
  }
}

// 要約を実行
async function summarizeArticles() {
  try {
    setButtonsDisabled(true);
    showStatus('要約を実行中...（しばらくお待ちください）', 'loading');

    const data = await fetchAPI('/summarize?limit=5', { method: 'POST' });

    if (data.success) {
      showStatus(
        `${data.data.summarized}件の記事を要約しました（失敗: ${data.data.failed}件）`,
        'success'
      );
      await Promise.all([loadStats(), loadSummaries()]);
    } else {
      showStatus(`エラー: ${data.error}`, 'error');
    }
  } catch (error) {
    showStatus(`エラー: ${error.message}`, 'error');
  } finally {
    setButtonsDisabled(false);
    setTimeout(hideStatus, 3000);
  }
}

// 更新
async function refresh() {
  await Promise.all([loadStats(), loadSummaries()]);
}

// HTMLエスケープ
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// イベントリスナー
elements.buttons.fetch.addEventListener('click', fetchArticles);
elements.buttons.summarize.addEventListener('click', summarizeArticles);
elements.buttons.refresh.addEventListener('click', refresh);

elements.categoryFilter.addEventListener('change', (e) => {
  state.category = e.target.value;
  state.currentPage = 1;
  loadSummaries();
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadSummaries();
});
