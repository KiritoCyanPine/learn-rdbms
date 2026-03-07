# SQL Learning Platform - Interactive Web App

An interactive, browser-based SQL learning platform with real-time query execution powered by SQL.js.

## ✨ Features

- **Client-Side SQL Execution** - Run SQL queries directly in your browser using SQL.js
- **Progressive Learning Path** - Structured exercises from basics to advanced topics
- **Interactive Playground** - Try, test, and experiment with SQL in real-time
- **Visual Feedback** - See query results instantly with formatted tables
- **Progress Tracking** - Monitor your completion across modules
- **Elegant Design** - Ubuntu typography with minimal indigo color palette
- **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Zero Backend** - Fully static site, deployable anywhere

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
platform/app/
├── src/
│   ├── index.js           # Main application entry
│   ├── index.html         # HTML template
│   ├── styles.css         # Global styles (design system)
│   ├── sqlManager.js      # SQL.js database wrapper
│   ├── uiController.js    # UI rendering and interactions
│   └── exerciseData.js    # Exercise content and schemas
├── dist/                  # Production build output
├── webpack.config.js      # Webpack configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

**Typography**

- Font: Ubuntu (Google Fonts)
- Base Size: 18px (16px on mobile)
- Scale: Perfect Fourth (1.333)

**Colors**

- Primary: Indigo #4f46e5
- Dark: Indigo #3730a3
- Maximum 2-3 colors throughout

**Components**

- Exercise cards with collapsible solutions
- SQL query modal with live execution
- Progress tracker
- Responsive navigation sidebar

## 🛠️ Technology Stack

- **SQL.js** - SQLite compiled to WebAssembly
- **Webpack 5** - Module bundler
- **Babel** - JavaScript transpiler
- **Vanilla JS** - No framework dependencies (ES6+ modules)
- **CSS3** - Custom properties for theming

## 📚 Module Structure

Each learning module includes:

- **Schema** - SQL database initialization
- **Exercises** - Progressive difficulty levels
- **Solutions** - Reference answers
- **Hints** - Learning aids

## 🎯 Usage

1. **Select a Module** - Choose from sidebar navigation
2. **Read Exercise** - Understand the task and requirements
3. **Try It** - Click to open interactive SQL playground
4. **Write Query** - Type your SQL solution
5. **Run Query** - Execute and see results (Ctrl/Cmd + Enter)
6. **View Solution** - Compare with reference answer

## 🔧 Development

### Adding New Exercises

Edit [src/exerciseData.js](src/exerciseData.js):

```javascript
{
  id: 'module-name',
  title: 'Module Title',
  description: 'Module description',
  schema: `CREATE TABLE ...`, // SQL schema
  exercises: [
    {
      id: 1,
      title: 'Exercise Title',
      description: 'What to do',
      difficulty: 'easy', // easy|medium|hard
      hint: 'Optional hint',
      solution: 'SELECT ...',
      expectedOutput: 'What to expect'
    }
  ]
}
```

### Customizing Styles

All CSS variables are defined in [src/styles.css](src/styles.css):

```css
:root {
  --color-primary: #4f46e5;
  --font-size-base: 1rem;
  --space-md: 1.5rem;
  /* ... */
}
```

### SQL.js Configuration

The SQL.js WebAssembly file is copied to the build output via webpack:

```javascript
// webpack.config.js
new CopyWebpackPlugin({
  patterns: [
    { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'sql-wasm.wasm' },
  ],
});
```

## 📦 Deployment

The built application is fully static and can be deployed to:

- **GitHub Pages** - Push `dist/` folder to gh-pages branch
- **Netlify** - Connect repository and set build command to `npm run build`
- **Vercel** - Import project and deploy
- **Any Static Host** - Upload `dist/` folder contents

### Example: Deploy to GitHub Pages

```bash
# Build production version
npm run build

# Deploy dist folder
cd dist
git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:username/repo.git main:gh-pages
```

## 🐛 Troubleshooting

**SQL.js Not Loading**

- Ensure `sql-wasm.wasm` is in the same directory as your HTML
- Check browser console for WebAssembly errors
- Verify CORS settings if serving from a different domain

**Exercises Not Showing**

- Check browser console for JavaScript errors
- Verify exerciseData.js is properly imported
- Ensure schema SQL syntax is valid

**Modal Not Opening**

- Check for JavaScript errors in console
- Verify event listeners are attached
- Test on different browsers

## 📝 License

MIT

## 🤝 Contributing

This is a learning project. Feel free to use and modify for educational purposes.

---

Built with ❤️ for SQL learners everywhere
