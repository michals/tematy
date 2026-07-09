# Developer Guidelines for Agents (AGENTS.md)

This document provides guidelines, constraints, and architecture references for AI agents contributing to the **Tematy Liturgii Słowa** project.

---

## 1. Project Overview & Tech Stack

This is a Vue 3 application built to assist in preparing the Liturgy of the Word for Neocatechumenal Way communities.

- **Frontend Framework**: Vue 3 (Options API for view/main components, Composition API `setup` in newer components like [MarkdownViewer.vue](file:///Users/michal/code/tematy/src/components/MarkdownViewer.vue)).
- **Routing**: `vue-router` (v4) with hash history (`createWebHashHistory`).
- **Styling**: Bootstrap 5 (loaded via CDN/local CSS in `public/`) and custom CSS.
- **Icons**: Bootstrap Icons.
- **Markdown Rendering**: `markdown-it`.
- **PWA Capabilities**: Registered service worker (`registerServiceWorker.js`) and PWA config in [vue.config.js](file:///Users/michal/code/tematy/vue.config.js).

---

## 2. Key Architecture & Features

### 2.1 Router Configuration
Configured in [main.js](file:///Users/michal/code/tematy/src/main.js):
- `/`: [HomePage.vue](file:///Users/michal/code/tematy/src/views/HomePage.vue) (shows list of subjects and all dictionary entries).
- `/tekst/:slug`: [TextPage.vue](file:///Users/michal/code/tematy/src/views/TextPage.vue) (displays raw text content of a biblical dictionary entry).
- `/haslo/:slug/:people?/:person?`: [EntryPage.vue](file:///Users/michal/code/tematy/src/views/EntryPage.vue) (verse selector for a specific entry).
- `/temat/:slug/:people?/:person?`: [SubjectPage.vue](file:///Users/michal/code/tematy/src/views/SubjectPage.vue) (verse selector for a liturgical theme/subject).

### 2.2 Compressed Databases
The application loads JSON data dynamically based on the URL query parameter `?use=...` (default: `hlgd`).
- Supported configs are mapped in [NavBar.vue](file:///Users/michal/code/tematy/src/components/NavBar.vue#L42-L61).
- Databases are fetched from `public/subjects-${db}.json.gz` (fallback to `.json`) and decompressed on-the-fly using browser `DecompressionStream` in [App.vue](file:///Users/michal/code/tematy/src/App.vue#L50-L69).

### 2.3 Article Encryption
Liturgical dictionary text is encrypted to prevent web scraping:
- Located under `public/x/${slug}.dat`.
- Processed in [MarkdownViewer.vue](file:///Users/michal/code/tematy/src/components/MarkdownViewer.vue#L38-L67).
- First decrypted using a XOR cipher with the UTF-8 key: `"wylacznie do celow kultu religijnego"`.
- Then decompressed using browser `DecompressionStream` (gzip).
- Loaded on component mount and watched dynamically via `watch(() => props.slug, loadMarkdown)` to ensure text reloads when the route parameter changes without component remounting.

### 2.4 Verse Allocation Algorithm
Verses are distributed round-robin among participants:
- Implemented in `hideVerse(index)` within [VerseList.vue](file:///Users/michal/code/tematy/src/components/VerseList.vue#L46-L50).
- Formulas: `person > 0 && ((index - person + 1) % persons) !== 0` hides/shows verses for the chosen person index.

### 2.5 Markdown Link Translation
Local relative links ending in `.md` (e.g., `[wojna](wojna.md)`) are converted to hash router links (e.g., `#/tekst/wojna`):
- Handled in [MarkdownComponent.vue](file:///Users/michal/code/tematy/src/components/MarkdownComponent.vue#L32-L40) using regex replace.
- Ensures clicking on cross-references navigates correctly within the single-page application context without reloading.

---

## 3. Coding Guidelines & Linting

We enforce strict coding conventions via ESLint in [.eslintrc.js](file:///Users/michal/code/tematy/.eslintrc.js).

1. **Linting Configuration**:
   - Extends `'plugin:vue/vue3-essential'` and `'@vue/airbnb'`.
   - Rules override:
     - `'max-len'`: Line length is capped at `120` characters.
     - `'linebreak-style'`: Turned off (`0`).
     - `'operator-linebreak'`: Turned off (`0`).
     - `'no-console'` / `'no-debugger'`: Warning in production, off in development.

2. **JavaScript Formatting**:
   - Single quotes for string literals.
   - Semicolons are required.
   - Prefer clean ES6+ features (e.g., arrow functions, destructuring).

3. **Vue Style**:
   - Use multi-word component names when creating new files (e.g., `VerseList.vue`).
   - Clean up components with `scoped` style blocks where applicable.

---

## 4. Operational Commands

- Run development server (with hot reload):
  ```bash
  npm run serve
  ```
  *(Note: uses `NODE_OPTIONS=--openssl-legacy-provider` under the hood to ensure compatibility with Node 17+).*
- Build production bundle:
  ```bash
  npm run build
  ```
  *(Note: uses `NODE_OPTIONS=--openssl-legacy-provider` to prevent Webpack/Terser digital envelope compilation failures).*
- Lint codebase and apply automatic fixes:
  ```bash
  npm run lint
  ```
