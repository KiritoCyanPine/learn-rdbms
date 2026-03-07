# 🎓 SQL Learning Platform - Getting Started

Welcome to your interactive SQL learning platform! This guide will help you start learning SQL through hands-on exercises.

## 🚀 Running the Platform

### Option 1: Development Mode (Recommended for learning)

```bash
cd platform/app
npm install       # First time only
npm run dev       # Start dev server
```

Then open http://localhost:3000 in your browser.

### Option 2: Production Build

```bash
cd platform/app
npm run build     # Build static files
npm run preview   # Preview on http://localhost:8080
```

Or use any static file server:

```bash
cd platform/app/dist
python3 -m http.server 8080
```

## 📚 How to Use

### 1. Choose a Module

Click any module in the left sidebar to load its exercises:

- **SQL Basics** - Learn CREATE, INSERT, SELECT, UPDATE, DELETE
- **Data Retrieval** - Master WHERE, ORDER BY, LIMIT, filtering
- More modules coming...

### 2. Read the Exercise

Each exercise card shows:

- **Title & Description** - What you need to do
- **Difficulty Badge** - Easy, Medium, or Hard
- **Hint** - Click to reveal helpful tips

### 3. Try It

Click the **"Try It"** button to open the SQL playground:

- Type your SQL query in the editor
- Press **Run Query** or use `Ctrl/Cmd + Enter`
- See results instantly in the table below

### 4. Experiment Freely

- **Clear** - Reset the query editor
- **Reset Database** - Restore initial data
- **View Solution** - See the reference answer

## 💡 Tips for Learning

### Writing Good SQL

- Use UPPERCASE for SQL keywords: `SELECT`, `FROM`, `WHERE`
- Use lowercase for table and column names
- End statements with semicolon `;`
- Test queries before committing to memory

### Using the Playground

- Start simple: `SELECT * FROM books;`
- Add complexity gradually
- Check table structures: `PRAGMA table_info(table_name);`
- List all tables: `SELECT name FROM sqlite_master WHERE type='table';`

### Common Patterns

```sql
-- See all data
SELECT * FROM table_name;

-- Filter rows
SELECT * FROM table_name WHERE condition;

-- Sort results
SELECT * FROM table_name ORDER BY column DESC;

-- Count records
SELECT COUNT(*) FROM table_name;

-- Update data
UPDATE table_name SET column = value WHERE condition;

-- Add data
INSERT INTO table_name (col1, col2) VALUES (val1, val2);
```

## 🎯 Learning Path

1. **Start with SQL Basics** - Foundation of all SQL
2. **Master Data Retrieval** - Query like a pro
3. **Learn Joins** - Combine multiple tables
4. **Use Aggregations** - Summarize data effectively
5. **Write Subqueries** - Complex nested queries
6. **Advanced Topics** - Transactions, indexes, views

## 🐛 Troubleshooting

### Query Not Running?

- Check for syntax errors (missing quotes, semicolons)
- Verify table and column names
- Look at the error message in red

### Reset Not Working?

- Refresh the page to fully reset
- Clear browser cache if needed

### Database Looks Wrong?

- Click **Reset Database** to restore initial state
- Switch to another module and back

## 📖 Example Exercise Walkthrough

**Exercise: "Find all books priced under $15"**

1. Read the task - we need books with price < 15
2. Think about the structure:
   - `SELECT` - what to show
   - `FROM books` - which table
   - `WHERE price < 15` - condition
3. Write the query:
   ```sql
   SELECT * FROM books WHERE price < 15;
   ```
4. Run and verify results
5. Compare with solution if needed

## 🎨 Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Run query
- `Escape` - Close modal
- `Tab` - Navigate between buttons

## 📱 Mobile Usage

The platform works on mobile devices:

- Tap the menu icon to open navigation
- Swipe to close the sidebar
- Use landscape mode for better typing

## 🌟 Best Practices

1. **Read First** - Understand the problem before coding
2. **Try Without Solutions** - Learn by doing
3. **Experiment** - Change queries and see what happens
4. **Use Hints** - When stuck, hints guide without spoiling
5. **Check Solutions** - Learn from reference answers
6. **Practice Regularly** - 20 minutes daily beats 2 hours weekly

## 🔗 Additional Resources

- [SQLite Documentation](https://sqlite.org/docs.html)
- [SQL.js GitHub](https://github.com/sql-js/sql.js)
- [Learn SQL on W3Schools](https://www.w3schools.com/sql/)

## 🎓 Ready to Learn?

Start your SQL journey now:

```bash
cd platform/app
npm run dev
```

Happy learning! 🚀

---

**Questions or Issues?** Check the README.md in the platform/app directory for technical details.
