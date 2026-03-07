# 📝 Adding More Exercises

This guide explains how to add exercises from the existing markdown files in `docs/exercises/` to the interactive platform.

## Current Status

**Already Implemented:**

- ✅ Module 01: SQL Basics (10 exercises)
- ✅ Module 02: Data Retrieval (8 exercises)

**To Be Added:**

- ⏳ Module 03: Joins
- ⏳ Module 04: Aggregation
- ⏳ Module 05: Subqueries
- ⏳ Module 06: Advanced

## How to Add a New Module

### Step 1: Review the Source Files

Each module in `docs/exercises/` contains:

- `exercises.md` - Exercise descriptions
- `schema.sql` - Database setup
- `solutions.sql` - Reference solutions

Example structure:

```
docs/exercises/03-joins/
├── exercises.md
├── schema.sql
└── solutions.sql
```

### Step 2: Extract Schema

Copy the SQL schema from `schema.sql`:

```sql
-- Example from docs/exercises/03-joins/schema.sql
CREATE TABLE departments (
    dept_id INTEGER PRIMARY KEY,
    dept_name TEXT NOT NULL
);

CREATE TABLE employees (
    emp_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Include INSERT statements for sample data
INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Sales');
INSERT INTO employees VALUES (1, 'Alice', 1), (2, 'Bob', 2);
```

### Step 3: Parse Exercises

Read through `exercises.md` and extract:

- Exercise number and title
- Description of what to do
- Difficulty level (easy/medium/hard)
- Any hints provided

### Step 4: Add to exerciseData.js

Edit `platform/app/src/exerciseData.js` and add a new module object:

```javascript
{
  id: 'joins',  // URL-friendly ID
  title: '03. Joins',
  description: 'Master INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN',
  schema: `
    -- Paste schema.sql content here (trimmed)
    CREATE TABLE departments (...);
    -- Include all CREATE and INSERT statements
  `.trim(),
  exercises: [
    {
      id: 1,
      title: 'Simple Inner Join',
      description: 'Join employees with their departments',
      difficulty: 'easy',
      hint: 'Use INNER JOIN with ON clause',
      solution: 'SELECT * FROM employees INNER JOIN departments ON employees.dept_id = departments.dept_id;',
      expectedOutput: 'All employees with their department names'
    },
    {
      id: 2,
      title: 'Left Outer Join',
      description: 'Show all employees, including those without departments',
      difficulty: 'medium',
      hint: 'LEFT JOIN includes all rows from the left table',
      solution: 'SELECT * FROM employees LEFT JOIN departments ON employees.dept_id = departments.dept_id;',
      expectedOutput: 'All employees, with NULL for missing departments'
    },
    // Add more exercises...
  ]
}
```

### Step 5: Test the Module

1. Save the file
2. Run: `npm run dev`
3. Check that:
   - Module appears in sidebar
   - Schema creates tables correctly
   - Exercises load and display
   - Solutions work as expected

## Exercise Object Schema

Each exercise must have these properties:

```javascript
{
  id: 1,                    // Unique number within module
  title: 'Exercise Name',   // Short, descriptive title
  description: 'Full description of what to do',
  difficulty: 'easy',       // 'easy' | 'medium' | 'hard'
  hint: 'Optional hint',    // Can be null or omitted
  solution: 'SQL query',    // Reference answer
  expectedOutput: 'What the result should show'
}
```

## Tips for Creating Exercises

### Good Exercise Descriptions

- ✅ "Find all customers who placed orders in January"
- ✅ "Calculate the average salary per department"
- ❌ "Write a query" (too vague)
- ❌ "Use GROUP BY" (gives away the solution)

### Good Solutions

- ✅ Use clear formatting
- ✅ Follow SQL style conventions
- ✅ Test before adding
- ✅ Use semicolons at the end

### Good Expected Outputs

- ✅ "5 rows with customer names and order dates"
- ✅ "Single value: total revenue"
- ❌ "Some results" (too vague)
- ❌ "Check the table" (not descriptive)

## Schema Guidelines

### Required Elements

```sql
-- 1. Table definitions
CREATE TABLE table_name (
    id INTEGER PRIMARY KEY,
    -- columns...
);

-- 2. Sample data (essential for exercises)
INSERT INTO table_name VALUES (...);
```

### Best Practices

- Include enough sample data to make exercises interesting
- Add constraints (NOT NULL, UNIQUE, CHECK) to teach data integrity
- Use realistic data (names, prices, dates)
- Keep data volume reasonable (10-50 rows per table)

### What to Avoid

- Don't use complex external dependencies
- Avoid SQLite-specific features when possible (for portability)
- Skip overly large datasets (client-side limitations)

## Example: Complete Module Addition

Here's a full example for a hypothetical "Window Functions" module:

```javascript
{
  id: 'window-functions',
  title: '07. Window Functions',
  description: 'Learn ROW_NUMBER, RANK, LAG, LEAD, and other window functions',
  schema: `
CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY,
    product TEXT NOT NULL,
    amount REAL NOT NULL,
    sale_date TEXT NOT NULL
);

INSERT INTO sales VALUES
    (1, 'Laptop', 1200, '2024-01-01'),
    (2, 'Mouse', 25, '2024-01-02'),
    (3, 'Laptop', 1150, '2024-01-03'),
    (4, 'Keyboard', 75, '2024-01-04');
  `.trim(),
  exercises: [
    {
      id: 1,
      title: 'Row Numbers',
      description: 'Add row numbers to all sales ordered by sale_date',
      difficulty: 'easy',
      hint: 'Use ROW_NUMBER() OVER (ORDER BY ...)',
      solution: 'SELECT *, ROW_NUMBER() OVER (ORDER BY sale_date) AS row_num FROM sales;',
      expectedOutput: 'All sales with sequential row numbers'
    },
    {
      id: 2,
      title: 'Running Total',
      description: 'Calculate cumulative sum of sales amounts',
      difficulty: 'medium',
      hint: 'Use SUM() OVER with frame specification',
      solution: 'SELECT *, SUM(amount) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM sales;',
      expectedOutput: 'Sales with cumulative totals'
    }
  ]
}
```

## Automation Ideas (Future)

Consider creating a script to automate conversion:

```javascript
// conceptual pseudocode
function convertMarkdownToExercises(markdownPath) {
  const md = readFile(markdownPath);
  const exercises = parseExercises(md);
  return exercises.map((ex) => ({
    id: ex.number,
    title: ex.title,
    description: ex.description,
    difficulty: inferDifficulty(ex),
    solution: findInSolutionsFile(ex.number),
  }));
}
```

## Quick Checklist

When adding a module, verify:

- [ ] Schema SQL is valid and tested
- [ ] Sample data includes enough variety
- [ ] Exercise descriptions are clear
- [ ] Solutions are tested and correct
- [ ] Difficulty levels are appropriate
- [ ] Expected outputs are descriptive
- [ ] Module appears in navigation
- [ ] All exercises load correctly
- [ ] Interactive playground works
- [ ] No console errors

## Need Help?

Check these files for reference:

- [platform/app/src/exerciseData.js](platform/app/src/exerciseData.js) - Current implementation
- [docs/exercises/\*/exercises.md](docs/exercises/) - Source content
- [docs/exercises/\*/schema.sql](docs/exercises/) - Database schemas

---

**Ready to add more exercises?** Start with Module 03 (Joins) - it's a natural progression from what's already implemented!
