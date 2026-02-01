/**
 * 米国スタートアップ法務情報のソース定義
 */

export interface Source {
  id: string;
  name: string;
  type: 'rss' | 'web';
  url: string;
  category: string;
  selectors?: {
    article: string;
    title: string;
    content: string;
    date?: string;
    link?: string;
  };
}

export const sources: Source[] = [
  // RSS Feeds - 法律事務所ブログ
  {
    id: 'fenwick-startup',
    name: 'Fenwick & West - Startup Legal',
    type: 'rss',
    url: 'https://www.fenwick.com/feeds/insights.rss',
    category: 'law-firm',
  },
  {
    id: 'cooley-vc',
    name: 'Cooley GO - Venture Capital',
    type: 'rss',
    url: 'https://www.cooleygo.com/feed/',
    category: 'law-firm',
  },
  {
    id: 'wilson-sonsini',
    name: 'Wilson Sonsini - Startup Resources',
    type: 'rss',
    url: 'https://www.wsgr.com/en/insights.rss',
    category: 'law-firm',
  },
  // 法律ニュース
  {
    id: 'law360-vc',
    name: 'Law360 Venture Capital',
    type: 'rss',
    url: 'https://www.law360.com/rss/venture-capital',
    category: 'legal-news',
  },
  // スタートアップ法務関連ブログ
  {
    id: 'ycombinator-library',
    name: 'Y Combinator - Library',
    type: 'web',
    url: 'https://www.ycombinator.com/library',
    category: 'startup-resource',
    selectors: {
      article: '.library-item',
      title: 'h3',
      content: '.description',
      link: 'a',
    },
  },
  {
    id: 'clerky-blog',
    name: 'Clerky Blog',
    type: 'rss',
    url: 'https://blog.clerky.com/feed',
    category: 'startup-legal',
  },
  {
    id: 'stripe-atlas-guides',
    name: 'Stripe Atlas Guides',
    type: 'web',
    url: 'https://stripe.com/atlas/guides',
    category: 'startup-resource',
    selectors: {
      article: '.guide-card',
      title: 'h3',
      content: 'p',
      link: 'a',
    },
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
