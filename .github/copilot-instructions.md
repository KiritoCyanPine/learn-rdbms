# Learn RDBMS - Workspace Instructions

An interactive SQL learning platform with comprehensive exercises, real-world projects, and hands-on practice.

## 📋 Project Overview

This project provides a complete RDBMS learning path from SQL basics to advanced topics, with:

- **docs/**: Comprehensive learning materials and exercises (6 modules)
- **platform/**: Interactive web UI with SQL.js playground
- **projects/**: Real-world Go applications (Airtel CDR billing system)

## 🏗️ Architecture

### Learning Content (`docs/`)

- Markdown-based exercises organized by difficulty
- Each module includes: exercises.md, schema.sql, solutions.sql
- Modules: 01-sql-basics → 02-data-retrieval → 03-joins → 04-aggregation → 05-subqueries → 06-advanced

### Interactive Platform (`platform/`)

- Static web application built with webpack
- Client-side SQL execution using SQL.js
- Design system: Ubuntu typography, indigo palette (2-3 colors max)
- Components: Exercise cards, SQL playground, progress tracker, navigation sidebar

### Real-World Projects (`projects/`)

- **airtel-network/**: CDR billing system in Go (no ORMs)
- Production-grade architecture with modules: billing, cdr, customer, plans, reports
- SQLite database with schema and seed data

## 🎨 Design System

**Typography:** Ubuntu font family (18px base, Perfect Fourth scale 1.333)
**Colors:** Indigo primary (#4f46e5), minimal palette (max 2-3 colors)
**Components:** Exercise card, code block, progress tracker, sidebar nav, callout box
**Principles:** Typography-first, minimal colors, semantic HTML, accessibility, mobile-first

See [platform/references/](platform/references/) for detailed guidelines.

## 🛠️ Development Commands

### SQLite Practice

```bash
# Create database from schema
sqlite3 bookstore.db < docs/exercises/01-sql-basics/schema.sql

# Interactive mode
sqlite3 bookstore.db
.mode column
.headers on
```

### Interactive Platform

```bash
# Development server
cd platform/app
npm install
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Go Project (Airtel)

```bash
cd projects/airtel-network
make setup      # Initialize database
make run        # Run application
make test       # Run tests
```

## 📝 Code Conventions

### SQL

- Uppercase keywords: `SELECT`, `FROM`, `WHERE`
- Lowercase table/column names: `users`, `customer_id`
- Use explicit column names (avoid `SELECT *` in production)
- Always include WHERE clause for UPDATE/DELETE

### TypeScript/HTML (Platform)

- ES6+ modules, no jQuery or heavy frameworks
- Semantic HTML with accessibility attributes
- BEM-style CSS naming: `.exercise-card__title`
- Progressive enhancement (works without JS)

### Go (Projects)

- No ORMs - direct SQL with `database/sql`
- Package structure: cmd/, internal/, database/
- Error handling: wrap errors with context
- Use prepared statements for all queries

## 🎯 AI Agent Guidelines

### When editing exercises (docs/)

- Preserve schema.sql structure and relationships
- Keep solutions.sql aligned with exercises.md
- Maintain progressive difficulty (basics → advanced)
- Include expected results in exercise descriptions

### When working on platform UI

- Follow design system strictly (Ubuntu fonts, indigo palette)
- Keep components minimal (no decorative clutter)
- Test SQL.js integration with sample queries
- Ensure mobile responsiveness

### When modifying Go projects

- Use native SQL, no ORM abstractions
- Add database migrations for schema changes
- Update seed data when adding features
- Test with realistic data volumes

## ⚠️ Common Pitfalls

1. **SQL.js limitations**: No server-side persistence; databases are in-memory
2. **Ubuntu font**: Must be loaded from Google Fonts CDN
3. **Color discipline**: Easy to add colors; stick to 2-3 max
4. **Go database/sql**: Remember to close rows/statements
5. **Exercise ordering**: Changes must respect learning progression

## 🚀 Quick Start for New Features

### Adding a new exercise module

1. Create directory: `docs/exercises/07-new-topic/`
2. Add: exercises.md, schema.sql, solutions.sql
3. Update roadmap in docs/README.md
4. Add to platform navigation

### Adding a web component

1. Check platform/references/components.md for patterns
2. Use existing color/typography variables
3. Ensure keyboard accessibility
4. Test on mobile viewport

### Extending Airtel project

1. Create new package in internal/
2. Add schema changes to database/schema.sql
3. Update seed data if needed
4. Add integration tests

## 📚 Resources

- SQLite Docs: https://sqlite.org/docs.html
- SQL.js: https://sql.js.org/
- Design System: platform/references/
- Go database/sql: https://pkg.go.dev/database/sql

---

**Last Updated:** 2026-03-07
