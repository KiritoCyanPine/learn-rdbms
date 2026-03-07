# Learn RDBMS

A comprehensive, hands-on guide to mastering relational databases, SQL, and practical database programming with Go.

## 🎯 Project Structure

```
learnrdbms/
├── docs/              # 📚 Learning materials and exercises
│   ├── README.md         # Complete learning roadmap
│   ├── SETUP.md          # Installation and setup guide
│   └── exercises/        # Hands-on SQL practice
├── platform/          # 🎨 UI templates and design system
│   ├── templates/        # HTML templates with SQL.js
│   └── references/       # Design documentation
├── projects/          # 🚀 Real-world applications
│   └── airtel-network/   # CDR billing system in Go
└── .github/skills/    # 🤖 GitHub Copilot customizations
```

## 🚀 Quick Start

### 1. Learn SQL Fundamentals

Start with the comprehensive roadmap:

```bash
open docs/README.md
```

### 2. Try Interactive Playground

Test SQL queries in your browser:

```bash
open platform/templates/template.html
```

### 3. Setup Your Environment

Install SQLite and tools:

```bash
# macOS
brew install sqlite3

# Or follow detailed instructions
open docs/SETUP.md
```

### 4. Work Through Exercises

```bash
cd docs/exercises/01-sql-basics/
# Follow exercises.md
```

## 📖 Learning Path

| Phase             | Duration  | Focus                               | Resources                                   |
| ----------------- | --------- | ----------------------------------- | ------------------------------------------- |
| **Foundations**   | Weeks 1-2 | SQL Basics, SELECT, WHERE, ORDER BY | [exercises/01-02](docs/exercises/)          |
| **Relationships** | Week 3    | JOINs, Foreign Keys                 | [exercises/03](docs/exercises/03-joins/)    |
| **Aggregation**   | Week 4    | GROUP BY, Subqueries                | [exercises/04-05](docs/exercises/)          |
| **Design**        | Week 5    | Database Design, Normalization      | [Airtel Project](projects/airtel-network/)  |
| **Advanced**      | Week 6    | Indexes, Transactions, Performance  | [exercises/06](docs/exercises/06-advanced/) |
| **Practice**      | Weeks 7-9 | Build CDR Billing System            | [Go Project](projects/airtel-network/)      |

## 🎮 Interactive Features

The platform includes an **in-browser SQL playground** powered by SQL.js:

- 🎯 Write and execute queries in real-time
- 📊 View results in formatted tables
- 🗄️ Pre-loaded sample database
- ⌨️ Keyboard shortcuts (Ctrl/Cmd + Enter)

[Try it now →](platform/templates/template.html)

## 🎨 Design Philosophy

The learning platform follows these principles:

- **Minimal Design**: 2-3 indigo colors, Ubuntu typography
- **Content First**: No visual clutter
- **Progressive Enhancement**: Works without JavaScript
- **Mobile Friendly**: Responsive on all devices

See [platform/README.md](platform/README.md) for design system details.

## 🏗️ Projects

### Airtel Network CDR Billing System

Real-world Go application using raw SQL (no ORMs):

- Customer management
- Call Detail Records (CDR) processing
- Usage-based billing
- Analytics and reporting

[View project →](projects/airtel-network/)

## 🤖 GitHub Copilot Integration

Custom skills for building learning platform UIs:

```bash
# In Copilot chat, type:
/learning-platform-ui
```

## 📝 License

This is a personal learning project.

## 🙏 Acknowledgments

Built with:

- [SQL.js](https://sql.js.org/) - SQLite in the browser
- [Ubuntu Font](https://design.ubuntu.com/font) - Clean typography
- Go + SQLite - Backend projects

---

**Ready to start?** Head to [docs/README.md](docs/README.md) for the complete learning roadmap!
