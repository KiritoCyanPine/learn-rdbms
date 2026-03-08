import { Roadmap } from './types';

/**
 * Complete learning roadmap with theory sections from docs/README.md
 * Each section maps to specific weeks and exercise modules
 */
export const roadmapData: Roadmap = {
  learningPathIntro: `# Relational Database & SQL Learning Roadmap

A comprehensive, hands-on guide to mastering relational databases, SQL, and practical database programming with Go (no ORMs).

## 📚 Learning Path

Follow this progression for optimal learning:

1. **Weeks 1-2**: Sections 1-3 (Introduction → Data Retrieval) + exercises/01-sql-basics/ + exercises/02-data-retrieval/
2. **Week 3**: Section 4 (Joins) + exercises/03-joins/
3. **Week 4**: Sections 5-6 (Aggregation & Subqueries) + exercises/04-aggregation/ + exercises/05-subqueries/
4. **Week 5**: Section 7 (Database Design) + Start Airtel project schema design
5. **Week 6**: Section 8 (Advanced SQL) + exercises/06-advanced/
6. **Week 7**: Section 9 (Practical Applications) + Implement Airtel project customer module
7. **Week 8**: Complete Airtel project (billing, reports, analytics modules)
8. **Week 9**: Section 10 (Migrate to PostgreSQL) + Refactor Airtel project

**Checkpoint**: Before moving to Advanced SQL, ensure you can:

- Write complex multi-table JOINs
- Use aggregate functions with GROUP BY effectively
- Understand when to use subqueries vs JOINs
- Have completed exercises 1-5
`,

  sections: [
    {
      id: 'intro-rdbms',
      title: '1. Introduction to Relational Databases',
      weekRange: '1-2',
      relatedModuleId: 'sql-basics',
      content: `## 1. Introduction to Relational Databases

### What is a Relational Database?

A **relational database** is a structured collection of data organized into **tables** (also called relations) that can be linked based on common data fields. The relational model was introduced by Edgar F. Codd in 1970 and remains the dominant database paradigm.

**Key Characteristics:**

- Data organized in tables with rows and columns
- Relationships between tables defined through keys
- Data integrity enforced through constraints
- Queried using SQL (Structured Query Language)

### Key Concepts

#### Tables (Relations)

A table is a collection of related data organized in rows and columns.

\`\`\`sql
-- Example: A simple users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### Rows (Records/Tuples)

Each row represents a single record or entity instance.

\`\`\`sql
-- A single row in the users table
INSERT INTO users (id, username, email)
VALUES (1, 'john_doe', 'john@example.com');
\`\`\`

#### Columns (Attributes/Fields)

Each column represents a specific attribute with a defined data type.

Common data types:

- \`INTEGER\`, \`BIGINT\`: Whole numbers
- \`REAL\`, \`NUMERIC\`, \`DECIMAL\`: Decimal numbers
- \`TEXT\`, \`VARCHAR(n)\`: Strings
- \`DATE\`, \`DATETIME\`, \`TIMESTAMP\`: Date/time values
- \`BOOLEAN\`: True/false values
- \`BLOB\`: Binary data

#### Primary Keys

A **primary key** uniquely identifies each row in a table. It must be:

- **Unique**: No two rows can have the same primary key
- **Not NULL**: Primary key cannot be empty
- **Immutable**: Should not change over time

\`\`\`sql
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT
);
\`\`\`

#### Foreign Keys

A **foreign key** is a column (or set of columns) that references the primary key of another table, establishing relationships between tables.

\`\`\`sql
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
\`\`\`

This creates a **one-to-many** relationship: one customer can have many orders.

### Benefits of Using Relational Databases

1. **Data Integrity**: Constraints and relationships ensure data accuracy
2. **Reduced Redundancy**: Normalization eliminates duplicate data
3. **ACID Compliance**: Transactions guarantee consistency
4. **Flexibility**: Complex queries can combine data in various ways
5. **Scalability**: Proven technology for handling large datasets
6. **Security**: Fine-grained access control and permissions
7. **Standardization**: SQL is a universal standard across vendors
8. **Data Independence**: Physical storage separated from logical structure
`,
    },
    {
      id: 'sql-basics',
      title: '2. SQL Basics',
      weekRange: '1-2',
      relatedModuleId: 'sql-basics',
      content: `## 2. SQL Basics

### What is SQL?

**SQL (Structured Query Language)** is a standardized programming language for managing and manipulating relational databases. It's declarative—you describe _what_ you want, not _how_ to get it.

**SQL Categories:**

- **DDL (Data Definition Language)**: CREATE, ALTER, DROP - define database structure
- **DML (Data Manipulation Language)**: SELECT, INSERT, UPDATE, DELETE - manipulate data
- **DCL (Data Control Language)**: GRANT, REVOKE - manage permissions
- **TCL (Transaction Control Language)**: COMMIT, ROLLBACK, SAVEPOINT - manage transactions

### SQL Syntax and Structure

SQL is case-insensitive (keywords can be uppercase or lowercase), but convention uses UPPERCASE for keywords and lowercase for identifiers.

**Basic Syntax Rules:**

- Statements end with a semicolon (\`;\`)
- Whitespace is generally ignored (use for readability)
- Comments: \`-- single line\` or \`/* multi-line */\`
- String literals use single quotes: \`'text'\`
- Identifiers (table/column names) can be quoted with double quotes or backticks

### Basic SQL Commands

#### CREATE - Define Database Structure

\`\`\`sql
-- Create a table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK(price >= 0),
    stock_quantity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster queries
CREATE INDEX idx_products_category ON products(category);
\`\`\`

#### INSERT - Add Data

\`\`\`sql
-- Insert a single row
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES ('Laptop', 'Electronics', 899.99, 50);

-- Insert multiple rows
INSERT INTO products (product_name, category, price, stock_quantity) VALUES
    ('Mouse', 'Electronics', 29.99, 200),
    ('Desk Chair', 'Furniture', 199.99, 30),
    ('Notebook', 'Stationery', 4.99, 500);
\`\`\`

#### SELECT - Retrieve Data

\`\`\`sql
-- Select all columns
SELECT * FROM products;

-- Select specific columns
SELECT product_name, price FROM products;

-- Select with aliases
SELECT
    product_name AS name,
    price AS cost,
    stock_quantity AS "units in stock"
FROM products;
\`\`\`

#### UPDATE - Modify Data

\`\`\`sql
-- Update specific rows
UPDATE products
SET price = 849.99, stock_quantity = 45
WHERE product_name = 'Laptop';

-- Update with expressions
UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE product_id = 1;
\`\`\`

#### DELETE - Remove Data

\`\`\`sql
-- Delete specific rows
DELETE FROM products WHERE stock_quantity = 0;

-- Delete with complex conditions
DELETE FROM products
WHERE category = 'Seasonal' AND created_at < DATE('now', '-1 year');
\`\`\`

**⚠️ Safety Tip**: Always test UPDATE and DELETE with SELECT first:

\`\`\`sql
-- Test before updating
SELECT * FROM products WHERE stock_quantity = 0;
-- Then delete
DELETE FROM products WHERE stock_quantity = 0;
\`\`\`
`,
    },
    {
      id: 'data-retrieval',
      title: '3. Data Retrieval with SQL',
      weekRange: '1-2',
      relatedModuleId: 'data-retrieval',
      content: `## 3. Data Retrieval with SQL

### Using SELECT Statements to Query Data

The SELECT statement is your primary tool for retrieving data. Master it thoroughly—it's the foundation of SQL.

#### Basic SELECT Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name;
\`\`\`

#### SELECT DISTINCT - Remove Duplicates

\`\`\`sql
-- Get unique categories
SELECT DISTINCT category FROM products;

-- Count unique values
SELECT COUNT(DISTINCT category) AS unique_categories FROM products;
\`\`\`

### Filtering Data with WHERE Clause

#### Comparison Operators

\`\`\`sql
-- Equal to
SELECT * FROM products WHERE category = 'Electronics';

-- Greater than, less than
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE stock_quantity <= 10;

-- Between (inclusive)
SELECT * FROM products WHERE price BETWEEN 50 AND 200;
\`\`\`

#### Logical Operators

\`\`\`sql
-- AND - all conditions must be true
SELECT * FROM products
WHERE category = 'Electronics' AND price < 500;

-- OR - at least one condition must be true
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Furniture';

-- Complex combinations
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Furniture')
  AND price > 100
  AND stock_quantity > 0;
\`\`\`

#### Pattern Matching with LIKE

\`\`\`sql
-- Wildcards: % (any characters), _ (single character)

-- Starts with 'Lap'
SELECT * FROM products WHERE product_name LIKE 'Lap%';

-- Contains 'book'
SELECT * FROM products WHERE product_name LIKE '%book%';

-- Ends with 'chair'
SELECT * FROM products WHERE product_name LIKE '%chair';
\`\`\`

#### NULL Handling

\`\`\`sql
-- Find rows where column is NULL
SELECT * FROM products WHERE description IS NULL;

-- Find rows where column is NOT NULL
SELECT * FROM products WHERE description IS NOT NULL;

-- Never use = NULL or != NULL (always false!)
\`\`\`

#### IN Operator

\`\`\`sql
-- Check if value is in a list
SELECT * FROM products
WHERE category IN ('Electronics', 'Furniture', 'Appliances');

-- NOT IN
SELECT * FROM products
WHERE category NOT IN ('Clearance', 'Discontinued');
\`\`\`

### Sorting Data with ORDER BY

\`\`\`sql
-- Ascending order (default)
SELECT * FROM products ORDER BY price;

-- Descending order
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products
ORDER BY category ASC, price DESC;
\`\`\`

### Limiting Results with LIMIT

\`\`\`sql
-- Get first 10 rows
SELECT * FROM products ORDER BY price DESC LIMIT 10;

-- Pagination: LIMIT with OFFSET
SELECT * FROM products ORDER BY product_id LIMIT 10 OFFSET 0;  -- Page 1
SELECT * FROM products ORDER BY product_id LIMIT 10 OFFSET 10; -- Page 2

-- Top 5 most expensive products
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 5;
\`\`\`
`,
    },
    {
      id: 'joins',
      title: '4. Joining Tables',
      weekRange: '3',
      relatedModuleId: 'joins',
      content: `## 4. Joining Tables

### Understanding Table Relationships

Relational databases derive their power from **relationships** between tables.

#### One-to-Many (1:N)

Most common relationship. One record in Table A relates to many records in Table B.

**Example**: One customer → many orders

\`\`\`sql
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
\`\`\`

### Types of Joins

#### INNER JOIN

Returns only rows where there's a match in both tables. Most common join type.

\`\`\`sql
-- List employees with their department names
SELECT
    e.emp_name,
    e.salary,
    d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
\`\`\`

#### LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table, and matching rows from the right table.

\`\`\`sql
-- List all employees, including those without a department
SELECT
    e.emp_name,
    e.salary,
    d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;
\`\`\`

**Use case**: Find employees without a department:

\`\`\`sql
SELECT e.emp_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
\`\`\`

#### SELF JOIN

A table joined with itself. Useful for hierarchical data.

\`\`\`sql
-- List employees with their manager's name
SELECT
    e.emp_name AS employee,
    m.emp_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
\`\`\`

### Using JOINs to Combine Data from Multiple Tables

#### Three-Table Join

\`\`\`sql
-- Find all order details for each customer
SELECT
    c.customer_name,
    o.order_id,
    o.order_date,
    oi.product_name,
    oi.quantity,
    oi.price
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
ORDER BY c.customer_name, o.order_date;
\`\`\`

#### Join with Aggregation

\`\`\`sql
-- Total order value per customer
SELECT
    c.customer_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COALESCE(SUM(oi.quantity * oi.price), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC;
\`\`\`
`,
    },
    {
      id: 'aggregation',
      title: '5. Aggregating Data',
      weekRange: '4',
      relatedModuleId: 'aggregation',
      content: `## 5. Aggregating Data

### Aggregate Functions

Aggregate functions perform calculations on multiple rows and return a single value.

#### COUNT - Count Rows

\`\`\`sql
-- Count all rows
SELECT COUNT(*) FROM products;

-- Count non-NULL values in a column
SELECT COUNT(description) FROM products;

-- Count distinct values
SELECT COUNT(DISTINCT category) FROM products;
\`\`\`

#### SUM - Add Up Values

\`\`\`sql
-- Total inventory value
SELECT SUM(price * stock_quantity) AS total_inventory_value
FROM products;

-- Sum with filter
SELECT SUM(price) FROM products WHERE category = 'Electronics';
\`\`\`

#### AVG - Calculate Average

\`\`\`sql
-- Average product price
SELECT AVG(price) AS average_price FROM products;

-- Average by category
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category;
\`\`\`

#### MIN and MAX - Find Extremes

\`\`\`sql
-- Cheapest and most expensive products
SELECT
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive
FROM products;
\`\`\`

### Grouping Data with GROUP BY

GROUP BY divides rows into groups based on column values, then applies aggregate functions to each group.

#### Basic GROUP BY

\`\`\`sql
-- Count products per category
SELECT
    category,
    COUNT(*) AS product_count
FROM products
GROUP BY category;

-- Multiple aggregates per group
SELECT
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock_quantity) AS total_stock
FROM products
GROUP BY category
ORDER BY product_count DESC;
\`\`\`

#### Important Grouping Rules

**Rule**: Every column in SELECT (except aggregate functions) must appear in GROUP BY.

\`\`\`sql
-- CORRECT: Only aggregates and grouped columns
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;
\`\`\`

### Filtering Groups with HAVING

HAVING filters groups **after** aggregation.

\`\`\`sql
-- Categories with more than 10 products
SELECT
    category,
    COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 10;

-- Categories with average price above $100
SELECT
    category,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100
ORDER BY avg_price DESC;
\`\`\`

#### HAVING vs WHERE

\`\`\`sql
-- WHERE: filters individual rows before grouping
-- HAVING: filters groups after aggregation

-- Find categories with > 5 expensive products (price > 100)
SELECT
    category,
    COUNT(*) AS expensive_product_count
FROM products
WHERE price > 100              -- Filter rows first
GROUP BY category
HAVING COUNT(*) > 5;            -- Then filter groups
\`\`\`
`,
    },
    {
      id: 'subqueries',
      title: '6. Subqueries and Nested Queries',
      weekRange: '4',
      relatedModuleId: 'subqueries',
      content: `## 6. Subqueries and Nested Queries

### What are Subqueries?

A **subquery** (or nested query) is a query embedded within another query. The subquery executes first, and its result is used by the outer query.

**Benefits:**

- Break complex problems into smaller steps
- Improve readability
- Perform calculations not possible with simple queries

#### Subqueries in WHERE Clause

Most common usage.

\`\`\`sql
-- Find products more expensive than average
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Find customers who placed orders
SELECT customer_name
FROM customers
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);

-- Customers who never ordered
SELECT customer_name
FROM customers
WHERE customer_id NOT IN (
    SELECT customer_id FROM orders WHERE customer_id IS NOT NULL
);
\`\`\`

#### Subqueries in SELECT Clause

Returns a single value for each row in the outer query.

\`\`\`sql
-- Show each product with category average
SELECT
    product_name,
    category,
    price,
    (SELECT AVG(price) 
     FROM products p2 
     WHERE p2.category = p1.category) AS category_avg
FROM products p1;
\`\`\`

#### EXISTS and NOT EXISTS

Test whether a subquery returns any rows.

\`\`\`sql
-- Customers who have placed at least one order
SELECT customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- Customers who never ordered
SELECT customer_name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
\`\`\`

### Correlated vs. Non-Correlated Subqueries

#### Non-Correlated Subqueries

Independent of outer query. Executes once.

\`\`\`sql
-- Find products priced above average (non-correlated)
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

#### Correlated Subqueries

References columns from outer query. Executes once per outer row.

\`\`\`sql
-- Products priced above their category average (correlated)
SELECT product_name, category, price
FROM products p1
WHERE price > (
    SELECT AVG(price)
    FROM products p2
    WHERE p2.category = p1.category  -- References outer query!
);
\`\`\`
`,
    },
    {
      id: 'database-design',
      title: '7. Database Design and Normalization',
      weekRange: '5',
      content: `## 7. Database Design and Normalization

### Principles of Database Design

Good database design ensures:

- **Data integrity**: Accuracy and consistency
- **Efficiency**: Fast queries and minimal storage
- **Maintainability**: Easy to update and extend
- **Scalability**: Handles growth gracefully

#### Key Design Principles

1. **Identify entities**: Things you need to store (customers, products, orders)
2. **Define relationships**: How entities relate (customer _places_ order)
3. **Choose primary keys**: Unique identifier for each entity
4. **Normalize**: Eliminate redundancy
5. **Add constraints**: Enforce business rules

### Normalization: 1NF, 2NF, 3NF

**Normalization** is the process of organizing data to reduce redundancy and improve integrity.

#### First Normal Form (1NF)

Rules:
1. Each column contains atomic (indivisible) values
2. No repeating groups
3. Each row is unique (has a primary key)

#### Second Normal Form (2NF)

Rules:
1. Must be in 1NF
2. No partial dependencies (all non-key columns depend on the entire primary key)

#### Third Normal Form (3NF)

Rules:
1. Must be in 2NF
2. No transitive dependencies (non-key columns don't depend on other non-key columns)

Proper normalization reduces data redundancy and improves data integrity.
`,
    },
    {
      id: 'advanced-sql',
      title: '8. Advanced SQL Concepts',
      weekRange: '6',
      relatedModuleId: 'advanced',
      content: `## 8. Advanced SQL Concepts

### Indexing for Performance Optimization

**Index**: A data structure that improves query speed by allowing fast lookups.

#### Creating Indexes

\`\`\`sql
-- Single-column index
CREATE INDEX idx_products_category ON products(category);

-- Multi-column index (order matters!)
CREATE INDEX idx_employees_dept_salary ON employees(dept_id, salary);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);
\`\`\`

#### When to Index

**Good candidates:**

- Columns in WHERE clauses
- Columns in JOIN conditions
- Columns in ORDER BY / GROUP BY
- Foreign keys

**Avoid indexing:**

- Small tables
- Columns rarely queried
- Tables with heavy write workload

### Transactions and ACID Properties

**Transaction**: A sequence of operations treated as a single unit.

#### ACID Properties

1. **Atomicity**: All-or-nothing. No partial execution.
2. **Consistency**: Database moves from one valid state to another.
3. **Isolation**: Concurrent transactions don't interfere.
4. **Durability**: Committed data survives crashes.

#### Using Transactions

\`\`\`sql
-- Start transaction
BEGIN TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Commit (make permanent)
COMMIT;

-- Or rollback (undo)
ROLLBACK;
\`\`\`

#### Example: Bank Transfer

\`\`\`sql
-- With transaction (SAFE)
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Check balances haven't gone negative
SELECT balance FROM accounts WHERE account_id = 1 AND balance < 0;

COMMIT;
\`\`\`

### Views

Virtual tables based on queries.

\`\`\`sql
-- Create view
CREATE VIEW high_value_customers AS
SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING total_spent > 1000;

-- Use like a table
SELECT * FROM high_value_customers ORDER BY total_spent DESC;
\`\`\`
`,
    },
    {
      id: 'practical-apps',
      title: '9. Practical Applications',
      weekRange: '7-8',
      content: `## 9. Practical Applications

### Setting up SQLite

#### Installation

**macOS**: Pre-installed. Verify:

\`\`\`bash
sqlite3 --version
\`\`\`

#### Basic Usage

\`\`\`bash
# Create/open database
sqlite3 mydata.db

# In SQLite shell:
.help                    # Show commands
.tables                  # List tables
.schema table_name       # Show table structure
.mode column             # Pretty output
.headers on              # Show column names
.quit                    # Exit
\`\`\`

### SQLite in Go

Use the \`database/sql\` package with SQLite driver to build production applications. Practice implementing real-world features like the Airtel CDR billing system.

**Best Practices:**

- Use prepared statements
- Handle errors properly
- Close resources (connections, rows, statements)
- Use transactions for multi-step operations
- Never use string concatenation for SQL queries
`,
    },
    {
      id: 'postgres-migration',
      title: '10. SQLite → PostgreSQL Migration Guide',
      weekRange: '9',
      content: `## 10. SQLite → PostgreSQL Migration Guide

### Key Differences

| Feature             | SQLite             | PostgreSQL                    |
| ------------------- | ------------------ | ----------------------------- |
| **Data types**      | Flexible, dynamic  | Strict, static                |
| **Auto-increment**  | \`AUTOINCREMENT\`    | \`SERIAL\` or \`IDENTITY\`        |
| **Booleans**        | 0/1 integers       | TRUE/FALSE                    |
| **Placeholders**    | \`?\`                | \`$1, $2, $3\`                  |

### Schema Migration Example

**SQLite:**

\`\`\`sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**PostgreSQL:**

\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Query Adaptations

\`\`\`sql
-- Date functions
-- SQLite:
SELECT date('now')

-- PostgreSQL:
SELECT CURRENT_DATE
\`\`\`

PostgreSQL offers more advanced features like window functions, full-text search, JSON support, and better query optimization.
`,
    },
  ],
};
