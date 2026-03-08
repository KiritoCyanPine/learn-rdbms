import { Module } from './types';
import { roadmapData } from './roadmapData';

/**
 * ExerciseData - Contains all exercises from the docs/exercises folder
 * In production, this would be generated from markdown files
 */

export const exerciseModules: Module[] = [
  {
    id: 'sql-basics',
    title: '01. SQL Basics',
    description:
      'Learn fundamental SQL commands: CREATE, INSERT, SELECT, UPDATE, DELETE',
    // Combine sections 1 and 2 for Module 01
    studyContent: `${roadmapData.sections.find((s) => s.id === 'intro-rdbms')?.content}\n\n---\n\n${roadmapData.sections.find((s) => s.id === 'sql-basics')?.content}`,
    schema: `
-- Bookstore Database Schema
CREATE TABLE authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    birth_year INTEGER
);

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_id INTEGER,
    genre TEXT,
    price REAL CHECK(price >= 0),
    publication_year INTEGER,
    stock_quantity INTEGER DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    join_date TEXT DEFAULT CURRENT_DATE
);

-- Sample Data
INSERT INTO authors (name, country, birth_year) VALUES
('George Orwell', 'England', 1903),
('Jane Austen', 'England', 1775),
('Mark Twain', 'USA', 1835),
('Harper Lee', 'USA', 1926);

INSERT INTO books (title, author_id, genre, price, publication_year, stock_quantity) VALUES
('1984', 1, 'Fiction', 15.99, 1949, 50),
('Animal Farm', 1, 'Fiction', 12.99, 1945, 45),
('Pride and Prejudice', 2, 'Romance', 14.99, 1813, 30),
('Emma', 2, 'Romance', 13.99, 1815, 25),
('The Adventures of Tom Sawyer', 3, 'Adventure', 11.99, 1876, 35),
('To Kill a Mockingbird', 4, 'Fiction', 16.99, 1960, 60);

INSERT INTO customers (name, email) VALUES
('Alice Johnson', 'alice.j@email.com'),
('Bob Smith', 'bob.smith@email.com'),
('Carol White', 'carol.w@email.com'),
('Michael Brown', 'michael.b@email.com');
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Select all books',
        description: 'Display all columns from the books table',
        difficulty: 'easy',
        hint: 'Use SELECT * to get all columns',
        solution: 'SELECT * FROM books;',
        expectedOutput: 'All book records with all columns',
      },
      {
        id: 2,
        title: 'Select specific columns',
        description: 'Display only the title and price of all books',
        difficulty: 'easy',
        hint: 'List the column names after SELECT',
        solution: 'SELECT title, price FROM books;',
        expectedOutput: 'Two columns: title and price',
      },
      {
        id: 3,
        title: 'Select with aliases',
        description: 'Display book titles as "Book Title" and prices as "Cost"',
        difficulty: 'easy',
        hint: 'Use AS keyword to create column aliases',
        solution: 'SELECT title AS "Book Title", price AS "Cost" FROM books;',
        expectedOutput: 'Two columns with custom names',
      },
      {
        id: 4,
        title: 'Select with calculations',
        description:
          'Display book titles with their prices including 10% tax (alias as "price_with_tax")',
        difficulty: 'medium',
        hint: 'Multiply price by 1.10 to add 10% tax',
        solution: 'SELECT title, price * 1.10 AS price_with_tax FROM books;',
        expectedOutput: 'Book titles with calculated prices',
      },
      {
        id: 5,
        title: 'Calculate total inventory value',
        description:
          'Calculate the total value of each book in stock (price × stock_quantity)',
        difficulty: 'medium',
        hint: 'Multiply price by stock_quantity',
        solution:
          'SELECT title, price * stock_quantity AS total_value FROM books;',
        expectedOutput: 'Book titles with total inventory values',
      },
      {
        id: 6,
        title: 'Insert a new author',
        description:
          'Add yourself as an author with your country and birth year',
        difficulty: 'easy',
        hint: 'Use INSERT INTO authors VALUES',
        solution:
          "INSERT INTO authors (name, country, birth_year) VALUES ('Your Name', 'Your Country', 2000);",
        expectedOutput: '1 row inserted',
      },
      {
        id: 7,
        title: 'Update book prices',
        description: 'Increase the price of all books by $2.00',
        difficulty: 'medium',
        hint: 'Use UPDATE with SET and add 2 to price',
        solution: 'UPDATE books SET price = price + 2.00;',
        expectedOutput: 'All book prices updated',
      },
      {
        id: 8,
        title: 'Update with condition',
        description:
          "Update George Orwell's country to 'India' (he was actually born in India)",
        difficulty: 'medium',
        hint: 'Use UPDATE with WHERE clause',
        solution:
          "UPDATE authors SET country = 'India' WHERE name = 'George Orwell';",
        expectedOutput: '1 row updated',
      },
      {
        id: 9,
        title: 'Delete with condition',
        description: 'Delete the customer with email "michael.b@email.com"',
        difficulty: 'medium',
        hint: 'Use DELETE FROM with WHERE clause',
        solution: "DELETE FROM customers WHERE email = 'michael.b@email.com';",
        expectedOutput: '1 row deleted',
      },
      {
        id: 10,
        title: 'Count records',
        description: 'How many books are in the database?',
        difficulty: 'easy',
        hint: 'Use COUNT(*) aggregate function',
        solution: 'SELECT COUNT(*) AS total_books FROM books;',
        expectedOutput: 'Single value showing count',
      },
    ],
  },
  {
    id: 'data-retrieval',
    title: '02. Data Retrieval',
    description:
      'Master WHERE clauses, sorting, filtering, and pattern matching',
    studyContent: roadmapData.sections.find((s) => s.id === 'data-retrieval')
      ?.content,
    schema: `
-- E-commerce Database
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    stock_quantity INTEGER NOT NULL,
    supplier TEXT,
    rating REAL
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample Data
INSERT INTO products (product_name, category, price, stock_quantity, supplier, rating) VALUES
('Laptop', 'Electronics', 899.99, 15, 'TechSupply Co', 4.5),
('Mouse', 'Electronics', 25.99, 100, 'TechSupply Co', 4.2),
('Keyboard', 'Electronics', 75.50, 50, 'TechSupply Co', 4.7),
('Office Chair', 'Furniture', 199.99, 20, 'Comfort Furniture', 4.3),
('Desk', 'Furniture', 299.99, 10, 'Comfort Furniture', 4.6),
('Monitor', 'Electronics', 249.99, 30, 'TechSupply Co', 4.4),
('Notebook', 'Stationery', 5.99, 200, 'Paper Plus', 4.0),
('Pen Set', 'Stationery', 12.99, 150, 'Paper Plus', 4.1);

INSERT INTO orders (customer_name, product_id, quantity, order_date, status) VALUES
('Alice Johnson', 1, 1, '2024-01-15', 'Delivered'),
('Bob Smith', 2, 2, '2024-01-16', 'Delivered'),
('Carol White', 4, 1, '2024-01-17', 'Pending'),
('David Brown', 1, 1, '2024-01-18', 'Shipped'),
('Alice Johnson', 7, 5, '2024-01-19', 'Delivered');
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Filter by category',
        description: 'Find all products in the Electronics category',
        difficulty: 'easy',
        hint: 'Use WHERE clause with equality condition',
        solution: "SELECT * FROM products WHERE category = 'Electronics';",
        expectedOutput: 'All electronics products',
      },
      {
        id: 2,
        title: 'Price range query',
        description: 'Find products priced between $10 and $100',
        difficulty: 'easy',
        hint: 'Use BETWEEN operator or compound comparison',
        solution: 'SELECT * FROM products WHERE price BETWEEN 10 AND 100;',
        expectedOutput: 'Products in specified price range',
      },
      {
        id: 3,
        title: 'Sort by price',
        description: 'List all products ordered by price (highest to lowest)',
        difficulty: 'easy',
        hint: 'Use ORDER BY with DESC',
        solution: 'SELECT * FROM products ORDER BY price DESC;',
        expectedOutput: 'Products sorted by price descending',
      },
      {
        id: 4,
        title: 'Pattern matching',
        description: 'Find all products whose name starts with "Office"',
        difficulty: 'medium',
        hint: 'Use LIKE operator with % wildcard',
        solution: "SELECT * FROM products WHERE product_name LIKE 'Office%';",
        expectedOutput: 'Products matching the pattern',
      },
      {
        id: 5,
        title: 'Multiple conditions',
        description: 'Find Electronics products with rating above 4.3',
        difficulty: 'medium',
        hint: 'Combine WHERE conditions with AND',
        solution:
          "SELECT * FROM products WHERE category = 'Electronics' AND rating > 4.3;",
        expectedOutput: 'Filtered electronics with high ratings',
      },
      {
        id: 6,
        title: 'IN operator',
        description:
          'Find products from either TechSupply Co or Paper Plus suppliers',
        difficulty: 'medium',
        hint: 'Use IN operator with list of values',
        solution:
          "SELECT * FROM products WHERE supplier IN ('TechSupply Co', 'Paper Plus');",
        expectedOutput: 'Products from specified suppliers',
      },
      {
        id: 7,
        title: 'NULL handling',
        description: 'Find products with no rating (NULL rating)',
        difficulty: 'medium',
        hint: 'Use IS NULL operator',
        solution: 'SELECT * FROM products WHERE rating IS NULL;',
        expectedOutput: 'Products without ratings',
      },
      {
        id: 8,
        title: 'Limit results',
        description: 'Get the top 3 most expensive products',
        difficulty: 'easy',
        hint: 'Use ORDER BY with LIMIT',
        solution: 'SELECT * FROM products ORDER BY price DESC LIMIT 3;',
        expectedOutput: 'Top 3 expensive products',
      },
    ],
  },
  {
    id: 'joins',
    title: '03. Joins',
    description:
      'Learn to combine data from multiple tables using INNER JOIN, LEFT JOIN, and more',
    studyContent: roadmapData.sections.find((s) => s.id === 'joins')?.content,
    schema: `
-- Library Database
CREATE TABLE members (
    member_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    join_date TEXT DEFAULT CURRENT_DATE
);

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE
);

CREATE TABLE loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    loan_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    return_date TEXT,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Sample Data
INSERT INTO members (name, email) VALUES
('Alice Johnson', 'alice@library.com'),
('Bob Smith', 'bob@library.com'),
('Carol White', 'carol@library.com'),
('David Brown', 'david@library.com');

INSERT INTO books (title, author, isbn) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0743273565'),
('To Kill a Mockingbird', 'Harper Lee', '978-0061120084'),
('1984', 'George Orwell', '978-0451524935'),
('Pride and Prejudice', 'Jane Austen', '978-0141439518'),
('The Catcher in the Rye', 'J.D. Salinger', '978-0316769174');

INSERT INTO loans (member_id, book_id, loan_date, due_date, return_date) VALUES
(1, 1, '2024-01-10', '2024-01-24', '2024-01-22'),
(2, 2, '2024-01-15', '2024-01-29', NULL),
(1, 3, '2024-01-20', '2024-02-03', NULL),
(3, 1, '2024-01-25', '2024-02-08', '2024-02-05'),
(2, 4, '2024-02-01', '2024-02-15', NULL);
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Basic INNER JOIN',
        description: 'List all loans with member names and book titles',
        difficulty: 'easy',
        hint: 'Join loans with members and books tables',
        solution: `SELECT m.name, b.title, l.loan_date, l.due_date
FROM loans l
INNER JOIN members m ON l.member_id = m.member_id
INNER JOIN books b ON l.book_id = b.book_id;`,
        expectedOutput: 'All loans with member and book details',
      },
      {
        id: 2,
        title: 'LEFT JOIN - All members',
        description:
          'Show all members with their loan information (include members with no loans)',
        difficulty: 'medium',
        hint: 'Use LEFT JOIN to include all members even if they have no loans',
        solution: `SELECT m.name, m.email, b.title, l.loan_date
FROM members m
LEFT JOIN loans l ON m.member_id = l.member_id
LEFT JOIN books b ON l.book_id = b.book_id;`,
        expectedOutput: 'All members including those with no loans',
      },
      {
        id: 3,
        title: 'LEFT JOIN with COUNT',
        description:
          'Show all members and how many books they have currently borrowed (not returned)',
        difficulty: 'medium',
        hint: 'Use LEFT JOIN and COUNT with GROUP BY, filter for NULL return_date',
        solution: `SELECT m.name, COUNT(l.loan_id) AS books_borrowed
FROM members m
LEFT JOIN loans l ON m.member_id = l.member_id AND l.return_date IS NULL
GROUP BY m.member_id, m.name;`,
        expectedOutput: 'All members with count of unreturned books',
      },
      {
        id: 4,
        title: 'Find unreturned books',
        description:
          'List all books currently on loan (not returned) with borrower names',
        difficulty: 'medium',
        hint: 'Join tables and filter for NULL return_date',
        solution: `SELECT b.title, b.author, m.name AS borrower, l.due_date
FROM loans l
INNER JOIN books b ON l.book_id = b.book_id
INNER JOIN members m ON l.member_id = m.member_id
WHERE l.return_date IS NULL;`,
        expectedOutput: 'Currently borrowed books with borrower info',
      },
      {
        id: 5,
        title: 'Books never borrowed',
        description: 'Find all books that have never been loaned out',
        difficulty: 'medium',
        hint: 'Use LEFT JOIN and check for NULL loan_id',
        solution: `SELECT b.title, b.author, b.isbn
FROM books b
LEFT JOIN loans l ON b.book_id = l.book_id
WHERE l.loan_id IS NULL;`,
        expectedOutput: 'Books with no loan history',
      },
      {
        id: 6,
        title: 'CROSS JOIN - All possible combinations',
        description:
          'Generate all possible member-book combinations (Cartesian product)',
        difficulty: 'medium',
        hint: 'Use CROSS JOIN to get all combinations',
        solution: `SELECT m.name AS member_name, b.title AS book_title
FROM members m
CROSS JOIN books b
ORDER BY m.name, b.title
LIMIT 10;`,
        expectedOutput: 'All possible member-book pairs',
      },
      {
        id: 7,
        title: 'Multiple JOINs with filtering',
        description:
          'Find all members who borrowed books written by Jane Austen',
        difficulty: 'hard',
        hint: 'Join all three tables and filter by author name',
        solution: `SELECT DISTINCT m.name, m.email
FROM members m
INNER JOIN loans l ON m.member_id = l.member_id
INNER JOIN books b ON l.book_id = b.book_id
WHERE b.author = 'Jane Austen';`,
        expectedOutput: 'Members who borrowed Jane Austen books',
      },
      {
        id: 8,
        title: 'JOIN with aggregation',
        description:
          'Count total loans per book (including books with 0 loans)',
        difficulty: 'hard',
        hint: 'Use LEFT JOIN with COUNT and GROUP BY book',
        solution: `SELECT b.title, b.author, COUNT(l.loan_id) AS times_borrowed
FROM books b
LEFT JOIN loans l ON b.book_id = l.book_id
GROUP BY b.book_id, b.title, b.author
ORDER BY times_borrowed DESC;`,
        expectedOutput: 'Books with their loan counts',
      },
      {
        id: 9,
        title: 'Overdue books',
        description:
          'Find all unreturned books where the due date has passed (use "2024-02-10" as current date)',
        difficulty: 'hard',
        hint: 'Join tables, filter for NULL return_date and due_date < current date',
        solution: `SELECT b.title, m.name AS borrower, l.loan_date, l.due_date,
       julianday('2024-02-10') - julianday(l.due_date) AS days_overdue
FROM loans l
INNER JOIN books b ON l.book_id = b.book_id
INNER JOIN members m ON l.member_id = m.member_id
WHERE l.return_date IS NULL AND l.due_date < '2024-02-10';`,
        expectedOutput: 'Overdue books with days overdue',
      },
      {
        id: 10,
        title: 'Member lending history summary',
        description:
          'For each member, show total books borrowed, books returned, and books still out',
        difficulty: 'hard',
        hint: 'Use LEFT JOIN with CASE statements for conditional counting',
        solution: `SELECT m.name,
       COUNT(l.loan_id) AS total_borrowed,
       SUM(CASE WHEN l.return_date IS NOT NULL THEN 1 ELSE 0 END) AS returned,
       SUM(CASE WHEN l.return_date IS NULL THEN 1 ELSE 0 END) AS still_out
FROM members m
LEFT JOIN loans l ON m.member_id = l.member_id
GROUP BY m.member_id, m.name;`,
        expectedOutput: 'Complete lending summary per member',
      },
    ],
  },
  {
    id: 'aggregation',
    title: '04. Aggregation',
    description:
      'Master aggregate functions: COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING',
    studyContent: roadmapData.sections.find((s) => s.id === 'aggregation')
      ?.content,
    schema: `
-- Sales Database
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'Completed',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Sample Data
INSERT INTO customers (name, city, region) VALUES
('TechCorp', 'San Francisco', 'West'),
('BuildRight', 'New York', 'East'),
('MarketPro', 'Chicago', 'Central'),
('DesignHub', 'Los Angeles', 'West'),
('DataSystems', 'Boston', 'East');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 1500.00, 'Completed'),
(1, '2024-02-01', 2300.00, 'Completed'),
(2, '2024-01-20', 800.00, 'Completed'),
(2, '2024-02-10', 1200.00, 'Completed'),
(3, '2024-01-25', 3500.00, 'Completed'),
(4, '2024-02-05', 950.00, 'Completed'),
(1, '2024-02-15', 1800.00, 'Pending'),
(5, '2024-02-20', 2100.00, 'Completed');
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'COUNT with GROUP BY',
        description: 'Count the number of orders for each customer',
        difficulty: 'medium',
        hint: 'Use COUNT and GROUP BY customer_id',
        solution: `SELECT c.name, COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;`,
        expectedOutput: 'Each customer with their order count',
      },
      {
        id: 2,
        title: 'SUM by region',
        description: 'Calculate total sales amount for each region',
        difficulty: 'medium',
        hint: 'Join tables, use SUM and GROUP BY region',
        solution: `SELECT c.region, SUM(o.total_amount) AS total_sales
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'Completed'
GROUP BY c.region;`,
        expectedOutput: 'Total sales per region',
      },
      {
        id: 3,
        title: 'HAVING clause',
        description:
          'Find customers who have placed orders totaling more than $3000',
        difficulty: 'hard',
        hint: 'Use SUM with GROUP BY and HAVING clause',
        solution: `SELECT c.name, SUM(o.total_amount) AS total_spent
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING SUM(o.total_amount) > 3000;`,
        expectedOutput: 'Customers with total orders > $3000',
      },
    ],
  },
  {
    id: 'subqueries',
    title: '05. Subqueries',
    description:
      'Learn to use subqueries in SELECT, WHERE, and FROM clauses for complex queries',
    studyContent: roadmapData.sections.find((s) => s.id === 'subqueries')
      ?.content,
    schema: `
-- HR Database
CREATE TABLE departments (
    dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL UNIQUE,
    location TEXT NOT NULL
);

CREATE TABLE employees (
    emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dept_id INTEGER NOT NULL,
    salary REAL NOT NULL,
    hire_date TEXT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Sample Data
INSERT INTO departments (dept_name, location) VALUES
('Engineering', 'San Francisco'),
('Sales', 'New York'),
('Marketing', 'Chicago'),
('HR', 'Boston');

INSERT INTO employees (name, dept_id, salary, hire_date) VALUES
('John Smith', 1, 95000, '2022-01-15'),
('Sarah Johnson', 1, 105000, '2021-06-01'),
('Mike Brown', 1, 85000, '2023-03-10'),
('Emily Davis', 2, 75000, '2022-08-20'),
('David Wilson', 2, 82000, '2021-11-05'),
('Lisa Anderson', 3, 70000, '2023-01-15'),
('James Taylor', 3, 68000, '2022-05-01'),
('Maria Garcia', 4, 65000, '2021-09-10');
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Subquery in WHERE',
        description: 'Find all employees who earn more than the average salary',
        difficulty: 'medium',
        hint: 'Use a subquery with AVG() in the WHERE clause',
        solution: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
        expectedOutput: 'Employees earning above average',
      },
      {
        id: 2,
        title: 'Subquery with EXISTS',
        description:
          'Find departments that have at least one employee earning over $90,000',
        difficulty: 'hard',
        hint: 'Use EXISTS with a correlated subquery',
        solution: `SELECT d.dept_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.dept_id = d.dept_id AND e.salary > 90000
);`,
        expectedOutput: 'Departments with high earners',
      },
      {
        id: 3,
        title: 'Correlated subquery',
        description:
          'List each employee with their salary and the average salary in their department',
        difficulty: 'hard',
        hint: 'Use a correlated subquery in SELECT clause',
        solution: `SELECT e.name, e.salary, d.dept_name,
       (SELECT AVG(salary) 
        FROM employees e2 
        WHERE e2.dept_id = e.dept_id) AS dept_avg_salary
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;`,
        expectedOutput: 'Employees with department average comparison',
      },
    ],
  },
  {
    id: 'advanced',
    title: '06. Advanced SQL',
    description:
      'Master advanced concepts: views, indexes, transactions, and database design',
    studyContent: `${roadmapData.sections.find((s) => s.id === 'database-design')?.content}\n\n---\n\n${roadmapData.sections.find((s) => s.id === 'advanced-sql')?.content}`,
    schema: `
-- Banking Database
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    balance REAL NOT NULL CHECK(balance >= 0),
    account_type TEXT NOT NULL,
    created_date TEXT DEFAULT CURRENT_DATE
);

CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL,
    amount REAL NOT NULL,
    transaction_date TEXT DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Sample Data
INSERT INTO accounts (account_number, customer_name, balance, account_type) VALUES
('ACC001', 'Alice Johnson', 5000.00, 'Savings'),
('ACC002', 'Bob Smith', 3500.00, 'Checking'),
('ACC003', 'Carol White', 12000.00, 'Savings'),
('ACC004', 'David Brown', 2500.00, 'Checking');

INSERT INTO transactions (account_id, transaction_type, amount, description) VALUES
(1, 'Deposit', 1000.00, 'Salary'),
(1, 'Withdrawal', 200.00, 'ATM'),
(2, 'Deposit', 500.00, 'Transfer'),
(2, 'Withdrawal', 150.00, 'Purchase'),
(3, 'Deposit', 2000.00, 'Bonus'),
(4, 'Withdrawal', 100.00, 'ATM');

-- Create a view for account summary
CREATE VIEW account_summary AS
SELECT a.account_number, a.customer_name, a.balance,
       COUNT(t.transaction_id) AS transaction_count,
       SUM(CASE WHEN t.transaction_type = 'Deposit' THEN t.amount ELSE 0 END) AS total_deposits,
       SUM(CASE WHEN t.transaction_type = 'Withdrawal' THEN t.amount ELSE 0 END) AS total_withdrawals
FROM accounts a
LEFT JOIN transactions t ON a.account_id = t.account_id
GROUP BY a.account_id, a.account_number, a.customer_name, a.balance;

-- Create an index for faster transaction lookups
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Query a view',
        description: 'Select all data from the account_summary view',
        difficulty: 'easy',
        hint: 'Views work just like tables in SELECT statements',
        solution: 'SELECT * FROM account_summary;',
        expectedOutput: 'Account summaries with transaction totals',
      },
      {
        id: 2,
        title: 'Complex aggregation',
        description:
          'Find accounts where total deposits exceed total withdrawals by more than $1000',
        difficulty: 'hard',
        hint: 'Use the account_summary view with WHERE clause',
        solution: `SELECT account_number, customer_name, 
       total_deposits, total_withdrawals,
       (total_deposits - total_withdrawals) AS net_deposits
FROM account_summary
WHERE (total_deposits - total_withdrawals) > 1000;`,
        expectedOutput: 'Accounts with high net deposits',
      },
      {
        id: 3,
        title: 'Transaction analysis',
        description:
          'For each account type, calculate the average balance and total number of transactions',
        difficulty: 'hard',
        hint: 'Join accounts and transactions, use GROUP BY account_type',
        solution: `SELECT a.account_type, 
       AVG(a.balance) AS avg_balance,
       COUNT(t.transaction_id) AS total_transactions
FROM accounts a
LEFT JOIN transactions t ON a.account_id = t.account_id
GROUP BY a.account_type;`,
        expectedOutput: 'Statistics by account type',
      },
    ],
  },
];

export default exerciseModules;
