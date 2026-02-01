# CLAUDE.md - AI Assistant Guide

> このドキュメントは、AIアシスタントがこのコードベースで作業する際のガイドラインを提供します。

## Project Overview

**Startup Legal Summarizer** は、米国スタートアップ法務に関する情報を自動収集し、日本語で要約するWebアプリケーションです。

主な機能:
- 米国法律事務所ブログ、法律ニュースサイトからの情報収集（RSSフィード / Webスクレイピング）
- OpenAI APIを使用した記事の要約・日本語翻訳
- 日本のスタートアップ創業者向けに分かりやすく情報を提供

## Repository Structure

```
/
├── CLAUDE.md               # AI assistant guidelines (this file)
├── package.json            # Node.js dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore patterns
├── src/
│   ├── index.ts            # Express server entry point
│   ├── config/
│   │   └── sources.ts      # Data source definitions (RSS feeds, websites)
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── services/
│   │   ├── scraper.ts      # Web scraping and RSS parsing
│   │   ├── summarizer.ts   # AI summarization with OpenAI
│   │   └── storage.ts      # JSON file-based data storage
│   ├── routes/
│   │   └── api.ts          # REST API endpoints
│   ├── utils/
│   │   └── helpers.ts      # Utility functions
│   └── scripts/
│       └── fetch-articles.ts  # CLI script for fetching articles
├── public/
│   ├── index.html          # Frontend HTML
│   ├── styles.css          # CSS styles
│   └── app.js              # Frontend JavaScript
└── data/                   # Generated data storage (gitignored)
    ├── articles.json       # Raw collected articles
    └── summaries.json      # Summarized articles
```

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Web Framework**: Express.js
- **Data Collection**: Axios (HTTP), Cheerio (HTML parsing), rss-parser
- **AI/ML**: OpenAI API (GPT-4o-mini for summarization)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Data Storage**: JSON files (simple file-based storage)

## Development Workflows

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

```bash
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

### Development Commands

```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm start          # Run compiled production build
npm run fetch      # Fetch articles from all sources (CLI)
npm run fetch -- --summarize  # Fetch and summarize articles
npm run lint       # Run ESLint
npm run test       # Run tests with Vitest
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for summarization |
| `PORT` | No | Server port (default: 3000) |
| `ANTHROPIC_API_KEY` | No | Alternative: Anthropic API key |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/stats` | Storage statistics |
| GET | `/api/sources` | List configured data sources |
| GET | `/api/summaries` | Get summarized articles (paginated) |
| GET | `/api/articles` | Get raw articles (paginated) |
| POST | `/api/fetch` | Fetch articles from all sources |
| POST | `/api/fetch/:sourceId` | Fetch from specific source |
| POST | `/api/summarize` | Summarize unsummarized articles |
| POST | `/api/summarize/:articleId` | Summarize specific article |

### Branch Naming Convention

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- AI-assisted branches: `claude/<session-id>`

### Commit Message Guidelines

Follow conventional commits format:
```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Code Conventions

### TypeScript Guidelines

- Use strict TypeScript settings
- Define interfaces for all data structures
- Prefer `const` over `let`, avoid `var`
- Use async/await over raw Promises

### File Organization

- Keep services in `src/services/` - one concern per file
- API routes in `src/routes/`
- Shared types in `src/types/`
- Configuration in `src/config/`

### Error Handling

- Wrap async operations in try/catch
- Return structured error responses from API
- Log errors with context for debugging

### Naming Conventions

- **Variables/Functions**: camelCase (`fetchArticles`, `summarizedAt`)
- **Interfaces/Types**: PascalCase (`Article`, `SummarizedArticle`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE`, `MAX_RETRIES`)
- **Files**: kebab-case (`fetch-articles.ts`) or camelCase for modules

## Data Sources

Current configured sources (in `src/config/sources.ts`):

| Source | Type | Category |
|--------|------|----------|
| Fenwick & West | RSS | law-firm |
| Cooley GO | RSS | law-firm |
| Wilson Sonsini | RSS | law-firm |
| Law360 VC | RSS | legal-news |
| Y Combinator Library | Web | startup-resource |
| Clerky Blog | RSS | startup-legal |
| Stripe Atlas Guides | Web | startup-resource |

To add new sources, edit `src/config/sources.ts`.

## AI Assistant Guidelines

### When Working on This Codebase

1. **Read before writing**: Always read existing code before making modifications
2. **Respect existing patterns**: Follow established conventions
3. **Minimal changes**: Make only necessary changes to complete the task
4. **Japanese context**: Remember the app targets Japanese startup founders
5. **Test API calls**: Be mindful of API rate limits when testing

### Key Files to Understand

- `src/services/summarizer.ts:23-40` - AI prompt for Japanese summarization
- `src/config/sources.ts` - Data source definitions
- `src/routes/api.ts` - All API endpoints
- `src/types/index.ts` - Core type definitions

### What to Avoid

- Don't commit `.env` files or API keys
- Don't add unnecessary dependencies
- Don't modify the AI prompt without understanding its impact on Japanese output quality
- Don't bypass rate limiting in API calls

### Adding New Features

When adding new features:
1. Define types first in `src/types/index.ts`
2. Implement service logic in `src/services/`
3. Add API endpoints in `src/routes/api.ts`
4. Update frontend in `public/`
5. Update this CLAUDE.md if significant changes

## Security Considerations

- Never commit secrets, API keys, or credentials
- Use environment variables for all configuration
- Validate and sanitize user inputs
- Be careful with web scraping - respect robots.txt and rate limits

## Testing

Testing framework: Vitest

```bash
npm run test       # Run all tests
npm run test:watch # Watch mode
```

Focus testing on:
- Service layer logic (scraper, summarizer, storage)
- API endpoint responses
- Data transformation functions

## Useful Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Cheerio Documentation](https://cheerio.js.org/)
- [rss-parser](https://www.npmjs.com/package/rss-parser)

---

*Last updated: 2026-02-01*
