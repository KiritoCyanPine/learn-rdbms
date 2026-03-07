# 🎓 SQL Learning Platform

Interactive web application for learning SQL with real-time query execution, built on SQL.js for client-side database operations.

## 🚀 Quick Start

### Start Learning Now

```bash
cd app
npm install
npm run dev
```

Open http://localhost:3000 to begin!

📖 **New to the platform?** Read [GETTING_STARTED.md](GETTING_STARTED.md)

### Deploy Static Build

```bash
cd app
npm run build    # Creates dist/ folder
npm run preview  # Test at http://localhost:8080
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.)

## 📂 Project Structure

```
platform/
├── app/                    # 🎯 Interactive web application
│   ├── src/
│   │   ├── index.js           # Main app entry point
│   │   ├── index.html         # HTML template
│   │   ├── styles.css         # Design system & components
│   │   ├── sqlManager.js      # SQL.js database wrapper
│   │   ├── uiController.js    # UI rendering & interactions
│   │   └── exerciseData.js    # Exercise content & schemas
│   ├── dist/                  # Production build output
│   ├── webpack.config.js      # Build configuration
│   ├── package.json           # Dependencies
│   └── README.md              # Technical documentation
├── templates/              # 📄 HTML template prototypes
│   └── template.html          # Original design reference
├── references/             # 🎨 Design system documentation
│   ├── colors.md              # Color palette guidelines
│   ├── typography.md          # Typography scale & fonts
│   └── components.md          # UI component patterns
├── assets/                 # 🖼️ Static assets
├── GETTING_STARTED.md      # 👋 User guide for learners
└── ADDING_EXERCISES.md     # 📝 Developer guide for content
```

## ✨ Features

### For Learners

- **Interactive SQL Playground** - Write, run, and test queries instantly
- **Progressive Exercise Path** - From SQL basics to advanced topics
- **In-Browser Database** - No server setup required, runs entirely client-side
- **Real-Time Feedback** - See results immediately with formatted tables
- **Progress Tracking** - Monitor completion across modules
- **Mobile Responsive** - Learn on any device

### For Developers

- **Pure Vanilla JS** - No framework overhead, ES6+ modules
- **SQL.js Integration** - SQLite compiled to WebAssembly
- **Webpack Build** - Optimized production bundles
- **Design System** - Ubuntu typography + indigo color palette
- **Modular Architecture** - Easy to extend and customize

## 🎨 Design System

**Typography:** Ubuntu font family, 18px base, Perfect Fourth scale (1.333)  
**Colors:** Indigo primary (#4f46e5), maximum 2-3 colors  
**Components:** Exercise cards, SQL playground modal, progress tracker, navigation sidebar  
**Principles:** Typography-first, minimal colors, semantic HTML, accessibility, mobile-first

See [references/](references/) for detailed design guidelines.

## 📚 Content Modules

**Currently Implemented:**

- ✅ **Module 01: SQL Basics** (10 exercises) - CREATE, INSERT, SELECT, UPDATE, DELETE
- ✅ **Module 02: Data Retrieval** (8 exercises) - WHERE, ORDER BY, LIMIT, patterns

**Available to Add:**

- ⏳ **Module 03: Joins** - Combine multiple tables
- ⏳ **Module 04: Aggregation** - GROUP BY, aggregate functions
- ⏳ **Module 05: Subqueries** - Nested queries
- ⏳ **Module 06: Advanced** - Transactions, views, indexes

See [ADDING_EXERCISES.md](ADDING_EXERCISES.md) for how to add more content.

## 🛠️ Development

### Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build optimized bundle
npm run preview      # Preview production build (port 8080)
```

### Technology Stack

- **SQL.js** - SQLite compiled to WebAssembly
- **Webpack 5** - Module bundler with HMR
- **Babel** - ES6+ transpilation
- **Vanilla JS** - No framework dependencies
- **CSS3** - Custom properties for theming

### Adding New Exercises

1. Edit `app/src/exerciseData.js`
2. Add module with schema and exercises
3. Test in dev mode
4. Build for production

Example:

```javascript
{
  id: 'module-name',
  title: 'Module Title',
  schema: `CREATE TABLE ...`,
  exercises: [{ id: 1, title: '...', ... }]
}
```

## 📖 Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - User guide for learners
- **[ADDING_EXERCISES.md](ADDING_EXERCISES.md)** - Developer guide for content
- **[app/README.md](app/README.md)** - Technical implementation details
- **[references/](references/)** - Design system documentation

## 🎯 Design Principles

1. **Typography First** - Ubuntu fonts, clear hierarchy
2. **Minimal Colors** - Maximum 2-3 indigo shades
3. **Strategic Components** - No decorative clutter
4. **Content Preservation** - Build on existing learning material
5. **Progressive Enhancement** - Works without JavaScript (base layout)
6. **Accessibility** - WCAG AA compliant, keyboard navigation
7. **Performance** - Optimized builds, lazy loading where beneficial

## 🚀 Deployment

The app is fully static and can be deployed anywhere:

**Netlify:**

```bash
# Build command: npm run build
# Publish directory: dist
```

**GitHub Pages:**

```bash
npm run build
cd dist
git init && git add -A && git commit -m 'Deploy'
git push -f git@github.com:user/repo.git main:gh-pages
```

**Vercel:** Import repository, build automatically

**Any Static Host:** Upload `dist/` folder contents

## 🐛 Troubleshooting

**SQL.js not loading?**

- Verify `sql-wasm.wasm` is in dist/
- Check browser console for errors
- Ensure proper CORS headers if serving remotely

**Exercises not showing?**

- Check exerciseData.js syntax
- Verify schema SQL is valid
- Look for JavaScript errors in console

**Build failures?**

- Delete node_modules and reinstall
- Check Node.js version (v14+)
- Clear webpack cache

## 📝 License

MIT - Free for educational use

---

**Learn SQL interactively at [your-deployment-url]**

Copy and customize for your learning content!

## Related

- **Skill Definition**: `.github/skills/learning-platform-ui/SKILL.md`
- **Learning Content**: `docs/` folder
- **Projects**: `projects/` folder
