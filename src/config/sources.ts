/**
 * 米国スタートアップ法務情報のソース定義
 *
 * カテゴリ:
 * - law-firm: 法律事務所ブログ
 * - legal-news: 法律ニュース
 * - government-legislation: 法令・規則・パブリックコメント
 * - securities-finance: 会社・資金調達・証券規制
 * - tax-accounting: 税務・会計
 * - ip-standards: 知的財産・標準
 * - labor-employment: 労務・雇用
 * - privacy-cyber: プライバシー・サイバーセキュリティ
 * - immigration: 移民・グローバル人材
 * - sanctions-export: 制裁・輸出管理
 * - corporate-litigation: 会社法・判例
 * - vc-startup-docs: VC・スタートアップ標準ドキュメント
 * - startup-resource: スタートアップリソース
 * - startup-legal: スタートアップ法務
 * - research-data: データベース・調査
 * - fintech-regulation: FinTech規制
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
  // 1) 法令・規則・パブリックコメント (government-legislation)
  // ============================================================
  {
    id: 'congress-gov',
    name: 'Congress.gov',
    type: 'rss',
    url: 'https://www.congress.gov/rss/bill-status-all.xml',
    category: 'government-legislation',
    description: '連邦議会の法案・立法活動',
  },
  {
    id: 'federal-register',
    name: 'Federal Register',
    type: 'rss',
    url: 'https://www.federalregister.gov/api/v1/documents.rss',
    category: 'government-legislation',
    description: '連邦規則・規制の公示',
  },
  {
    id: 'regulations-gov',
    name: 'Regulations.gov',
    type: 'web',
    url: 'https://www.regulations.gov/',
    category: 'government-legislation',
    description: '連邦規制のパブリックコメント',
    selectors: {
      article: '.document-card',
      title: 'h3',
      content: '.summary',
      link: 'a',
    },
  },
  {
    id: 'govinfo',
    name: 'GovInfo',
    type: 'rss',
    url: 'https://www.govinfo.gov/rss/bills.xml',
    category: 'government-legislation',
    description: '政府刊行物・法的文書',
  },
  {
    id: 'cornell-lii',
    name: 'Legal Information Institute (Cornell)',
    type: 'rss',
    url: 'https://www.law.cornell.edu/feed/recent',
    category: 'government-legislation',
    description: '法律情報研究所、法令解説',
  },
  {
    id: 'uscode-house',
    name: 'Office of the Law Revision Counsel',
    type: 'web',
    url: 'https://uscode.house.gov/',
    category: 'government-legislation',
    description: '米国法典の公式ソース',
    selectors: {
      article: '.update-item',
      title: 'h4',
      content: 'p',
      link: 'a',
    },
  },

  // ============================================================
  // 2) 会社・資金調達・証券規制 (securities-finance)
  // ============================================================
  {
    id: 'sec-news',
    name: 'U.S. Securities and Exchange Commission',
    type: 'rss',
    url: 'https://www.sec.gov/news/pressreleases.rss',
    category: 'securities-finance',
    description: 'SEC プレスリリース、規制発表',
  },
  {
    id: 'sec-rules',
    name: 'SEC - Rules and Regulations',
    type: 'rss',
    url: 'https://www.sec.gov/rss/rules/final.xml',
    category: 'securities-finance',
    description: 'SEC 最終規則',
  },
  {
    id: 'sec-edgar',
    name: 'SEC EDGAR - Recent Filings',
    type: 'rss',
    url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=&company=&dateb=&owner=include&count=40&output=atom',
    category: 'securities-finance',
    description: 'EDGAR 最新提出書類',
  },
  {
    id: 'finra',
    name: 'FINRA',
    type: 'rss',
    url: 'https://www.finra.org/rss/news',
    category: 'securities-finance',
    description: '金融業規制機構、ブローカー・ディーラー規制',
  },
  {
    id: 'cftc',
    name: 'U.S. Commodity Futures Trading Commission',
    type: 'rss',
    url: 'https://www.cftc.gov/rss/pressreleases.xml',
    category: 'securities-finance',
    description: '商品先物取引委員会、デリバティブ規制',
  },
  {
    id: 'ftc',
    name: 'U.S. Federal Trade Commission',
    type: 'rss',
    url: 'https://www.ftc.gov/feeds/press-releases.xml',
    category: 'securities-finance',
    description: '連邦取引委員会、消費者保護・独禁法',
  },
  {
    id: 'doj-antitrust',
    name: 'DOJ Antitrust Division',
    type: 'rss',
    url: 'https://www.justice.gov/atr/atr.xml',
    category: 'securities-finance',
    description: '司法省反トラスト局',
  },
  {
    id: 'cfpb',
    name: 'Consumer Financial Protection Bureau',
    type: 'rss',
    url: 'https://www.consumerfinance.gov/about-us/newsroom/feed/',
    category: 'securities-finance',
    description: '消費者金融保護局',
  },
  {
    id: 'federal-reserve',
    name: 'Federal Reserve',
    type: 'rss',
    url: 'https://www.federalreserve.gov/feeds/press_all.xml',
    category: 'securities-finance',
    description: '連邦準備制度理事会',
  },
  {
    id: 'occ',
    name: 'Office of the Comptroller of the Currency',
    type: 'rss',
    url: 'https://www.occ.treas.gov/rss/news-issuances.xml',
    category: 'securities-finance',
    description: '通貨監督庁、国法銀行規制',
  },
  {
    id: 'fdic',
    name: 'Federal Deposit Insurance Corporation',
    type: 'rss',
    url: 'https://www.fdic.gov/news/news/press/rss.xml',
    category: 'securities-finance',
    description: '連邦預金保険公社',
  },
  {
    id: 'fincen',
    name: 'Financial Crimes Enforcement Network',
    type: 'rss',
    url: 'https://www.fincen.gov/rss/news',
    category: 'securities-finance',
    description: '金融犯罪取締ネットワーク、AML規制',
  },

  // ============================================================
  // 3) 税務・ストックオプション・会計 (tax-accounting)
  // ============================================================
  {
    id: 'irs-news',
    name: 'Internal Revenue Service',
    type: 'rss',
    url: 'https://www.irs.gov/newsroom/rss.xml',
    category: 'tax-accounting',
    description: '内国歳入庁、税務ニュース',
  },
  {
    id: 'treasury',
    name: 'U.S. Department of the Treasury',
    type: 'rss',
    url: 'https://home.treasury.gov/rss/news',
    category: 'tax-accounting',
    description: '財務省',
  },
  {
    id: 'fasb',
    name: 'Financial Accounting Standards Board',
    type: 'rss',
    url: 'https://www.fasb.org/rss/news',
    category: 'tax-accounting',
    description: '財務会計基準審議会、GAAP',
  },
  {
    id: 'pcaob',
    name: 'Public Company Accounting Oversight Board',
    type: 'rss',
    url: 'https://pcaobus.org/rss/news',
    category: 'tax-accounting',
    description: '公開会社会計監視委員会',
  },
  // Big 4 会計事務所
  {
    id: 'deloitte-insights',
    name: 'Deloitte Insights',
    type: 'rss',
    url: 'https://www2.deloitte.com/us/en/insights/rss-feeds.html',
    category: 'tax-accounting',
    description: 'デロイト、会計・税務・コンサルティング',
  },
  {
    id: 'pwc-insights',
    name: 'PwC Insights',
    type: 'web',
    url: 'https://www.pwc.com/us/en/services/tax/library.html',
    category: 'tax-accounting',
    description: 'PwC、税務・会計インサイト',
    selectors: {
      article: '.content-card',
      title: 'h3',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'ey-insights',
    name: 'EY Insights',
    type: 'web',
    url: 'https://www.ey.com/en_us/insights',
    category: 'tax-accounting',
    description: 'EY、税務・会計インサイト',
    selectors: {
      article: '.insight-card',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },
  {
    id: 'kpmg-insights',
    name: 'KPMG Insights',
    type: 'web',
    url: 'https://kpmg.com/us/en/articles.html',
    category: 'tax-accounting',
    description: 'KPMG、税務・会計インサイト',
    selectors: {
      article: '.article-card',
      title: 'h3',
      content: '.summary',
      link: 'a',
    },
  },

  // ============================================================
  // 4) IP（特許・商標・著作権）と標準 (ip-standards)
  // ============================================================
  {
    id: 'uspto',
    name: 'United States Patent and Trademark Office',
    type: 'rss',
    url: 'https://www.uspto.gov/rss/news.xml',
    category: 'ip-standards',
    description: '米国特許商標庁',
  },
  {
    id: 'copyright-office',
    name: 'United States Copyright Office',
    type: 'rss',
    url: 'https://www.copyright.gov/rss/news.xml',
    category: 'ip-standards',
    description: '米国著作権局',
  },
  {
    id: 'nist',
    name: 'National Institute of Standards and Technology',
    type: 'rss',
    url: 'https://www.nist.gov/news-events/news/rss.xml',
    category: 'ip-standards',
    description: '国立標準技術研究所、セキュリティ標準',
  },
  {
    id: 'opensource-org',
    name: 'Open Source Initiative',
    type: 'rss',
    url: 'https://opensource.org/feed',
    category: 'ip-standards',
    description: 'オープンソースライセンス標準',
  },
  {
    id: 'spdx',
    name: 'SPDX',
    type: 'web',
    url: 'https://spdx.dev/news/',
    category: 'ip-standards',
    description: 'ソフトウェアパッケージデータ交換',
    selectors: {
      article: '.news-item',
      title: 'h3',
      content: '.excerpt',
      link: 'a',
    },
  },
  {
    id: 'creative-commons',
    name: 'Creative Commons',
    type: 'rss',
    url: 'https://creativecommons.org/feed/',
    category: 'ip-standards',
    description: 'クリエイティブ・コモンズ・ライセンス',
  },

  // ============================================================
  // 5) 労務・雇用 (labor-employment)
  // ============================================================
  {
    id: 'dol',
    name: 'U.S. Department of Labor',
    type: 'rss',
    url: 'https://www.dol.gov/rss/releases.xml',
    category: 'labor-employment',
    description: '労働省',
  },
  {
    id: 'nlrb',
    name: 'National Labor Relations Board',
    type: 'rss',
    url: 'https://www.nlrb.gov/rss/news',
    category: 'labor-employment',
    description: '全国労働関係委員会',
  },
  {
    id: 'eeoc',
    name: 'U.S. Equal Employment Opportunity Commission',
    type: 'rss',
    url: 'https://www.eeoc.gov/rss/news.xml',
    category: 'labor-employment',
    description: '雇用機会均等委員会',
  },
  {
    id: 'osha',
    name: 'Occupational Safety and Health Administration',
    type: 'rss',
    url: 'https://www.osha.gov/rss/whatsnew.xml',
    category: 'labor-employment',
    description: '労働安全衛生局',
  },
  {
    id: 'shrm',
    name: 'SHRM',
    type: 'rss',
    url: 'https://www.shrm.org/rss/pages/default.aspx',
    category: 'labor-employment',
    description: '人事管理協会',
  },
  {
    id: 'hr-dive',
    name: 'HR Dive',
    type: 'rss',
    url: 'https://www.hrdive.com/feeds/news/',
    category: 'labor-employment',
    description: 'HR業界ニュース',
  },

  // ============================================================
  // 6) プライバシー・サイバー・広告/消費者 (privacy-cyber)
  // ============================================================
  {
    id: 'cppa',
    name: 'California Privacy Protection Agency',
    type: 'web',
    url: 'https://cppa.ca.gov/announcements/',
    category: 'privacy-cyber',
    description: 'カリフォルニア州プライバシー保護局、CCPA/CPRA',
    selectors: {
      article: '.announcement',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },
  {
    id: 'hhs-ocr',
    name: 'HHS Office for Civil Rights',
    type: 'rss',
    url: 'https://www.hhs.gov/hipaa/rss.xml',
    category: 'privacy-cyber',
    description: '保健福祉省公民権局、HIPAA',
  },
  {
    id: 'fcc',
    name: 'Federal Communications Commission',
    type: 'rss',
    url: 'https://www.fcc.gov/rss/news.xml',
    category: 'privacy-cyber',
    description: '連邦通信委員会',
  },
  {
    id: 'iapp',
    name: 'International Association of Privacy Professionals',
    type: 'rss',
    url: 'https://iapp.org/rss/news/',
    category: 'privacy-cyber',
    description: '国際プライバシー専門家協会',
  },
  {
    id: 'fpf',
    name: 'Future of Privacy Forum',
    type: 'rss',
    url: 'https://fpf.org/feed/',
    category: 'privacy-cyber',
    description: 'プライバシーの未来フォーラム',
  },
  {
    id: 'eff',
    name: 'Electronic Frontier Foundation',
    type: 'rss',
    url: 'https://www.eff.org/rss/updates.xml',
    category: 'privacy-cyber',
    description: '電子フロンティア財団、デジタル権利',
  },
  {
    id: 'cdt',
    name: 'Center for Democracy & Technology',
    type: 'rss',
    url: 'https://cdt.org/feed/',
    category: 'privacy-cyber',
    description: '民主主義と技術センター',
  },

  // ============================================================
  // 7) 移民・グローバル人材 (immigration)
  // ============================================================
  {
    id: 'uscis',
    name: 'U.S. Citizenship and Immigration Services',
    type: 'rss',
    url: 'https://www.uscis.gov/rss/news',
    category: 'immigration',
    description: '市民権・移民サービス局、ビザ・グリーンカード',
  },
  {
    id: 'state-dept',
    name: 'U.S. Department of State',
    type: 'rss',
    url: 'https://www.state.gov/rss/press-releases/',
    category: 'immigration',
    description: '国務省、ビザポリシー',
  },
  {
    id: 'cbp',
    name: 'U.S. Customs and Border Protection',
    type: 'rss',
    url: 'https://www.cbp.gov/rss/news',
    category: 'immigration',
    description: '税関・国境警備局',
  },

  // ============================================================
  // 8) 制裁・輸出管理 (sanctions-export)
  // ============================================================
  {
    id: 'ofac',
    name: 'Office of Foreign Assets Control',
    type: 'rss',
    url: 'https://ofac.treasury.gov/rss/news',
    category: 'sanctions-export',
    description: '外国資産管理局、経済制裁',
  },
  {
    id: 'bis',
    name: 'Bureau of Industry and Security',
    type: 'rss',
    url: 'https://www.bis.doc.gov/rss/news',
    category: 'sanctions-export',
    description: '産業安全保障局、輸出管理',
  },

  // ============================================================
  // 9) 会社法（特にデラウェア）・判例ウォッチ (corporate-litigation)
  // ============================================================
  {
    id: 'delaware-corps',
    name: 'Delaware Division of Corporations',
    type: 'web',
    url: 'https://corp.delaware.gov/news/',
    category: 'corporate-litigation',
    description: 'デラウェア州会社局',
    selectors: {
      article: '.news-item',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },
  {
    id: 'delaware-chancery',
    name: 'Delaware Court of Chancery',
    type: 'web',
    url: 'https://courts.delaware.gov/opinions/index.aspx?ag=court+of+chancery',
    category: 'corporate-litigation',
    description: 'デラウェア州衡平法裁判所、会社法判例',
    selectors: {
      article: '.opinion-item',
      title: 'a',
      content: '.summary',
      link: 'a',
    },
  },
  {
    id: 'scotus',
    name: 'Supreme Court of the United States',
    type: 'web',
    url: 'https://www.supremecourt.gov/opinions/opinions.aspx',
    category: 'corporate-litigation',
    description: '連邦最高裁判所',
    selectors: {
      article: '.opinion-row',
      title: '.case-name',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'us-courts',
    name: 'United States Courts',
    type: 'rss',
    url: 'https://www.uscourts.gov/rss/news.xml',
    category: 'corporate-litigation',
    description: '連邦裁判所システム',
  },
  {
    id: 'courtlistener',
    name: 'CourtListener',
    type: 'rss',
    url: 'https://www.courtlistener.com/feed/court/all/',
    category: 'corporate-litigation',
    description: '判例データベース（Free Law Project）',
  },
  {
    id: 'oyez',
    name: 'Oyez',
    type: 'web',
    url: 'https://www.oyez.org/cases',
    category: 'corporate-litigation',
    description: '最高裁判例解説（口頭弁論音声付き）',
    selectors: {
      article: '.case-item',
      title: 'h3',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'harvard-corpgov',
    name: 'Harvard Law School Forum on Corporate Governance',
    type: 'rss',
    url: 'https://corpgov.law.harvard.edu/feed/',
    category: 'corporate-litigation',
    description: 'ハーバード・ロースクール会社法ガバナンスフォーラム',
  },

  // ============================================================
  // 10) VC・スタートアップの「標準ドキュメント」「市場慣行」 (vc-startup-docs)
  // ============================================================
  {
    id: 'nvca',
    name: 'National Venture Capital Association',
    type: 'web',
    url: 'https://nvca.org/model-legal-documents/',
    category: 'vc-startup-docs',
    description: 'NVCA標準投資契約書',
    selectors: {
      article: '.document-item',
      title: 'h3',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'ycombinator-docs',
    name: 'Y Combinator - Standard Documents',
    type: 'web',
    url: 'https://www.ycombinator.com/documents/',
    category: 'vc-startup-docs',
    description: 'YC SAFE等の標準書類',
    selectors: {
      article: '.document',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },
  {
    id: 'series-seed',
    name: 'Series Seed',
    type: 'web',
    url: 'https://www.seriesseed.com/',
    category: 'vc-startup-docs',
    description: 'シリーズシード標準書類',
    selectors: {
      article: '.document-section',
      title: 'h2',
      content: 'p',
      link: 'a',
    },
  },

  // ============================================================
  // 11) 実務解説・調査（リーガルニュース／規制ニュース）(legal-news)
  // ============================================================
  {
    id: 'reuters-legal',
    name: 'Reuters Legal',
    type: 'rss',
    url: 'https://www.reuters.com/legal/rss',
    category: 'legal-news',
    description: 'ロイター法律ニュース',
  },
  {
    id: 'bloomberg-law',
    name: 'Bloomberg Law',
    type: 'rss',
    url: 'https://news.bloomberglaw.com/rss',
    category: 'legal-news',
    description: 'ブルームバーグ・ロー',
  },
  {
    id: 'law360-vc',
    name: 'Law360 Venture Capital',
    type: 'rss',
    url: 'https://www.law360.com/rss/venture-capital',
    category: 'legal-news',
    description: 'Law360 VC・スタートアップセクション',
  },
  {
    id: 'law-com',
    name: 'Law.com',
    type: 'rss',
    url: 'https://www.law.com/rss/',
    category: 'legal-news',
    description: '法律業界総合ニュース',
  },
  {
    id: 'aba-journal',
    name: 'ABA Journal',
    type: 'rss',
    url: 'https://www.abajournal.com/feed/',
    category: 'legal-news',
    description: 'アメリカ法曹協会ジャーナル',
  },
  // テック・スタートアップニュース
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    type: 'rss',
    url: 'https://techcrunch.com/feed/',
    category: 'legal-news',
    description: 'テック・スタートアップニュース',
  },
  {
    id: 'fortune-termsheet',
    name: 'Fortune Term Sheet',
    type: 'web',
    url: 'https://fortune.com/tag/term-sheet/',
    category: 'legal-news',
    description: 'VC・PE取引ニュース',
    selectors: {
      article: '.article-card',
      title: 'h3',
      content: '.excerpt',
      link: 'a',
    },
  },
  {
    id: 'axios',
    name: 'Axios',
    type: 'rss',
    url: 'https://www.axios.com/feeds/feed.rss',
    category: 'legal-news',
    description: 'Axiosニュース',
  },

  // ============================================================
  // 12) データベース／調査会社 (research-data)
  // ============================================================
  {
    id: 'pitchbook-news',
    name: 'PitchBook News',
    type: 'rss',
    url: 'https://pitchbook.com/rss/news',
    category: 'research-data',
    description: 'VC・PE市場データ・ニュース',
  },
  {
    id: 'crunchbase-news',
    name: 'Crunchbase News',
    type: 'rss',
    url: 'https://news.crunchbase.com/feed/',
    category: 'research-data',
    description: 'スタートアップ・資金調達ニュース',
  },
  {
    id: 'cbinsights',
    name: 'CB Insights',
    type: 'rss',
    url: 'https://www.cbinsights.com/rss.xml',
    category: 'research-data',
    description: 'VC・スタートアップ分析レポート',
  },

  // ============================================================
  // 14) 会社・株主管理・ストックオプション運用 (startup-legal)
  // ============================================================
  {
    id: 'carta-blog',
    name: 'Carta Blog',
    type: 'rss',
    url: 'https://carta.com/blog/feed/',
    category: 'startup-legal',
    description: 'キャップテーブル管理、エクイティ実務',
  },
  {
    id: 'pulley-blog',
    name: 'Pulley Blog',
    type: 'rss',
    url: 'https://pulley.com/blog/rss.xml',
    category: 'startup-legal',
    description: 'エクイティ管理、409A',
  },
  {
    id: 'mystockoptions',
    name: 'myStockOptions.com',
    type: 'rss',
    url: 'https://www.mystockoptions.com/rss/articles',
    category: 'startup-legal',
    description: 'ストックオプション実務解説',
  },
  {
    id: 'clerky-blog',
    name: 'Clerky Blog',
    type: 'rss',
    url: 'https://blog.clerky.com/feed',
    category: 'startup-legal',
    description: 'SAFE、株式発行等の実務',
  },

  // ============================================================
  // 15) FinTech（州規制・ライセンスの入口）(fintech-regulation)
  // ============================================================
  {
    id: 'ny-dfs',
    name: 'New York State Department of Financial Services',
    type: 'rss',
    url: 'https://www.dfs.ny.gov/rss/news',
    category: 'fintech-regulation',
    description: 'NY州金融サービス局、BitLicense等',
  },
  {
    id: 'ca-dfpi',
    name: 'California DFPI',
    type: 'web',
    url: 'https://dfpi.ca.gov/news/',
    category: 'fintech-regulation',
    description: 'CA州金融保護イノベーション局',
    selectors: {
      article: '.news-item',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
  },
  {
    id: 'csbs',
    name: 'Conference of State Bank Supervisors',
    type: 'rss',
    url: 'https://www.csbs.org/rss/news',
    category: 'fintech-regulation',
    description: '州銀行監督者会議',
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
];

export const categories: Record<string, string> = {
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

export function getSourcesByCategory(category: string): Source[] {
  return sources.filter((source) => source.category === category);
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((source) => source.id === id);
}

export function getAllCategories(): { id: string; name: string; count: number }[] {
  return Object.entries(categories).map(([id, name]) => ({
    id,
    name,
    count: sources.filter((s) => s.category === id).length,
  }));
}
