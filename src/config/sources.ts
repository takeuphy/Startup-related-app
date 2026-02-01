/**
 * 米国スタートアップ法務情報のソース定義
 */

export interface Source {
  id: string;
  name: string;
  type: 'rss' | 'web';
  url: string;
  category: string;
  description?: string;
  selectors?: {
    article: string;
    title: string;
    content: string;
    date?: string;
    link?: string;
  };
}

export const sources: Source[] = [
  // ============================================================
  // 法律事務所ブログ・インサイト (law-firm)
  // ============================================================

  // --- スタートアップ・VC特化 ---
  {
    id: 'cooley-go',
    name: 'Cooley GO',
    type: 'rss',
    url: 'https://www.cooleygo.com/feed/',
    category: 'law-firm',
    description: 'スタートアップ向け無料リソース。会社設立、資金調達、株式関連',
  },
  {
    id: 'fenwick',
    name: 'Fenwick & West',
    type: 'rss',
    url: 'https://www.fenwick.com/feeds/insights.rss',
    category: 'law-firm',
    description: 'シリコンバレーのテック・スタートアップ専門',
  },
  {
    id: 'gunderson-dettmer',
    name: 'Gunderson Dettmer',
    type: 'web',
    url: 'https://www.gunder.com/news/',
    category: 'law-firm',
    description: 'VC・スタートアップ専門法律事務所',
    selectors: {
      article: '.news-item',
      title: 'h3',
      content: '.excerpt',
      link: 'a',
    },
  },
  {
    id: 'wilson-sonsini',
    name: 'Wilson Sonsini Goodrich & Rosati',
    type: 'rss',
    url: 'https://www.wsgr.com/en/insights.rss',
    category: 'law-firm',
    description: 'シリコンバレー最大のテック法律事務所',
  },

  // --- 大手総合法律事務所 ---
  {
    id: 'choate',
    name: 'Choate, Hall & Stewart',
    type: 'rss',
    url: 'https://www.choate.com/rss/news.xml',
    category: 'law-firm',
    description: 'ボストン拠点、IP・ライフサイエンス強み',
  },
  {
    id: 'dentons',
    name: 'Dentons',
    type: 'rss',
    url: 'https://www.dentons.com/en/insights.rss',
    category: 'law-firm',
    description: '世界最大の法律事務所、グローバル展開',
  },
  {
    id: 'dla-piper',
    name: 'DLA Piper',
    type: 'rss',
    url: 'https://www.dlapiper.com/en/us/rss/insights/',
    category: 'law-firm',
    description: 'グローバル大手、テック・M&A',
  },
  {
    id: 'goodwin',
    name: 'Goodwin Procter',
    type: 'rss',
    url: 'https://www.goodwinlaw.com/rss/insights',
    category: 'law-firm',
    description: 'プライベートエクイティ、テック、ライフサイエンス',
  },
  {
    id: 'greenberg-traurig',
    name: 'Greenberg Traurig',
    type: 'rss',
    url: 'https://www.gtlaw.com/en/rss/insights',
    category: 'law-firm',
    description: '全米大手、テック・不動産',
  },
  {
    id: 'hogan-lovells',
    name: 'Hogan Lovells',
    type: 'rss',
    url: 'https://www.hoganlovells.com/en/rss/insights',
    category: 'law-firm',
    description: 'グローバル大手、規制・政府関連',
  },
  {
    id: 'latham-watkins',
    name: 'Latham & Watkins',
    type: 'rss',
    url: 'https://www.lw.com/rss/insights',
    category: 'law-firm',
    description: '売上世界最大級、M&A・ファイナンス',
  },
  {
    id: 'mintz',
    name: 'Mintz, Levin, Cohn, Ferris, Glovsky and Popeo',
    type: 'rss',
    url: 'https://www.mintz.com/rss/insights',
    category: 'law-firm',
    description: 'VC、ライフサイエンス、エネルギー',
  },
  {
    id: 'morgan-lewis',
    name: 'Morgan, Lewis & Bockius',
    type: 'rss',
    url: 'https://www.morganlewis.com/rss/insights',
    category: 'law-firm',
    description: '全米大手、労働・雇用、税務',
  },
  {
    id: 'morrison-foerster',
    name: 'Morrison & Foerster',
    type: 'rss',
    url: 'https://www.mofo.com/rss/insights',
    category: 'law-firm',
    description: 'テック・IP訴訟、金融規制',
  },
  {
    id: 'orrick',
    name: 'Orrick, Herrington & Sutcliffe',
    type: 'rss',
    url: 'https://www.orrick.com/en/rss/Insights',
    category: 'law-firm',
    description: 'テック・エネルギー・インフラ',
  },
  {
    id: 'perkins-coie',
    name: 'Perkins Coie',
    type: 'rss',
    url: 'https://www.perkinscoie.com/rss/insights.xml',
    category: 'law-firm',
    description: 'テック・スタートアップ、プライバシー',
  },
  {
    id: 'pillsbury',
    name: 'Pillsbury Winthrop Shaw Pittman',
    type: 'rss',
    url: 'https://www.pillsburylaw.com/rss/insights',
    category: 'law-firm',
    description: 'テック・エネルギー・不動産',
  },
  {
    id: 'ropes-gray',
    name: 'Ropes & Gray',
    type: 'rss',
    url: 'https://www.ropesgray.com/en/rss/insights',
    category: 'law-firm',
    description: 'プライベートエクイティ、ヘルスケア',
  },
  {
    id: 'sidley-austin',
    name: 'Sidley Austin',
    type: 'rss',
    url: 'https://www.sidley.com/rss/insights',
    category: 'law-firm',
    description: '全米大手、M&A、訴訟、規制',
  },
  {
    id: 'wilmerhale',
    name: 'WilmerHale',
    type: 'rss',
    url: 'https://www.wilmerhale.com/rss/insights',
    category: 'law-firm',
    description: 'IP訴訟、規制、政府調査',
  },

  // ============================================================
  // 法律ニュース (legal-news)
  // ============================================================
  {
    id: 'law360-vc',
    name: 'Law360 Venture Capital',
    type: 'rss',
    url: 'https://www.law360.com/rss/venture-capital',
    category: 'legal-news',
    description: 'VC・スタートアップセクション',
  },

  // ============================================================
  // スタートアップリソース (startup-resource)
  // ============================================================
  {
    id: 'ycombinator-library',
    name: 'Y Combinator - Library',
    type: 'web',
    url: 'https://www.ycombinator.com/library',
    category: 'startup-resource',
    description: 'YCのナレッジライブラリ',
    selectors: {
      article: '.library-item',
      title: 'h3',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'stripe-atlas-guides',
    name: 'Stripe Atlas Guides',
    type: 'web',
    url: 'https://stripe.com/atlas/guides',
    category: 'startup-resource',
    description: '起業ガイド、デラウェア法人設立等',
    selectors: {
      article: '.guide-card',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },

  // ============================================================
  // スタートアップ法務 (startup-legal)
  // ============================================================
  {
    id: 'clerky-blog',
    name: 'Clerky Blog',
    type: 'rss',
    url: 'https://blog.clerky.com/feed',
    category: 'startup-legal',
    description: 'SAFE、株式発行等の実務',
  },
];

export const categories = {
  'law-firm': '法律事務所',
  'legal-news': '法律ニュース',
  'startup-resource': 'スタートアップリソース',
  'startup-legal': 'スタートアップ法務',
};

export function getSourcesByCategory(category: string): Source[] {
  return sources.filter((source) => source.category === category);
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((source) => source.id === id);
}
