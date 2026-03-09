import { Module } from './types';
import { roadmapData } from './roadmapData';

/**
 * ExerciseData - Contains all exercises from the docs/exercises folder
 * In production, this would be generated from markdown files
 */

export const exerciseModules: Module[] = [
  {
    id: 'ddl-database-design',
    title: '01. Database Design & DDL',
    description:
      'Master table creation, constraints, data types, and schema modifications with ALTER TABLE',
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
        title: 'Create a simple table',
        description:
          'Create a table called "publishers" with columns: publisher_id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), and country (TEXT)',
        difficulty: 'easy',
        hint: 'Use CREATE TABLE with column definitions',
        solution: `CREATE TABLE publishers (
    publisher_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT
);`,
        expectedOutput: 'Table created successfully',
      },
      {
        id: 2,
        title: 'Create table with constraints',
        description:
          'Create a "reviews" table with: review_id (auto-incrementing PRIMARY KEY), book_id (INTEGER NOT NULL), reviewer_email (TEXT UNIQUE NOT NULL), rating (INTEGER with CHECK between 1-5), and review_text (TEXT)',
        difficulty: 'medium',
        hint: 'Use AUTOINCREMENT, UNIQUE, NOT NULL, and CHECK constraints',
        solution: `CREATE TABLE reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    reviewer_email TEXT UNIQUE NOT NULL,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    review_text TEXT
);`,
        expectedOutput: 'Table with constraints created',
      },
      {
        id: 3,
        title: 'Create table with DEFAULT values',
        description:
          'Create an "orders" table with: order_id (PRIMARY KEY), customer_id (INTEGER NOT NULL), order_date (TEXT with DEFAULT CURRENT_DATE), status (TEXT with DEFAULT "Pending"), and total_amount (REAL with DEFAULT 0.00)',
        difficulty: 'medium',
        hint: 'Use DEFAULT keyword for default values',
        solution: `CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    order_date TEXT DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'Pending',
    total_amount REAL DEFAULT 0.00
);`,
        expectedOutput: 'Table with default values created',
      },
      {
        id: 4,
        title: 'Create table with FOREIGN KEY',
        description:
          'Create a "book_authors" junction table with: book_id (INTEGER), author_id (INTEGER), both forming a composite PRIMARY KEY, and both as FOREIGN KEYs referencing books(book_id) and authors(author_id)',
        difficulty: 'hard',
        hint: 'Use PRIMARY KEY(col1, col2) and FOREIGN KEY constraints',
        solution: `CREATE TABLE book_authors (
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);`,
        expectedOutput: 'Junction table with foreign keys created',
      },
      {
        id: 5,
        title: 'Drop a table',
        description:
          'Drop the "orders" table you created earlier (if it exists)',
        difficulty: 'easy',
        hint: 'Use DROP TABLE IF EXISTS',
        solution: 'DROP TABLE IF EXISTS orders;',
        expectedOutput: 'Table dropped successfully',
      },
      {
        id: 6,
        title: 'ALTER TABLE - Add column',
        description:
          'Add a new column "website" (TEXT) to the publishers table',
        difficulty: 'medium',
        hint: 'Use ALTER TABLE ADD COLUMN',
        solution: 'ALTER TABLE publishers ADD COLUMN website TEXT;',
        expectedOutput: 'Column added successfully',
      },
      {
        id: 7,
        title: 'ALTER TABLE - Rename table',
        description: 'Rename the publishers table to "publishing_houses"',
        difficulty: 'easy',
        hint: 'Use ALTER TABLE RENAME TO',
        solution: 'ALTER TABLE publishers RENAME TO publishing_houses;',
        expectedOutput: 'Table renamed successfully',
      },
    ],
    mcqs: [
      {
        id: 1,
        question: 'What does the PRIMARY KEY constraint ensure?',
        options: [
          'The column can contain NULL values',
          'Each row has a unique identifier',
          'The column must contain text data',
          'The column is sorted automatically',
        ],
        correctAnswer: 1,
        explanation:
          'A PRIMARY KEY uniquely identifies each row in a table and cannot contain NULL values.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'Which constraint prevents duplicate values in a column?',
        options: ['PRIMARY KEY', 'UNIQUE', 'NOT NULL', 'Both A and B'],
        correctAnswer: 3,
        explanation:
          'Both PRIMARY KEY and UNIQUE constraints prevent duplicate values. PRIMARY KEY also prevents NULL values.',
        difficulty: 'medium',
      },
      {
        id: 3,
        question: 'What is the purpose of a FOREIGN KEY constraint?',
        options: [
          'To make queries faster',
          'To enforce referential integrity between tables',
          'To prevent NULL values',
          'To automatically generate unique values',
        ],
        correctAnswer: 1,
        explanation:
          'FOREIGN KEY constraints enforce referential integrity by ensuring values in one table match values in another table.',
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'dml-basics',
    title: '02. Data Manipulation (DML)',
    description:
      'Master INSERT, UPDATE, DELETE with various conditions and patterns',
    studyContent: roadmapData.sections.find((s) => s.id === 'sql-basics')
      ?.content,
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
        title: 'Simple INSERT',
        description:
          'Add yourself as an author with your country and birth year',
        difficulty: 'easy',
        hint: 'Use INSERT INTO authors (columns) VALUES (values)',
        solution:
          "INSERT INTO authors (name, country, birth_year) VALUES ('Your Name', 'Your Country', 2000);",
        expectedOutput: '1 row inserted',
      },
      {
        id: 2,
        title: 'INSERT with default values',
        description:
          'Insert a new customer with name and email (let join_date use its default)',
        difficulty: 'easy',
        hint: 'Omit the join_date column to use DEFAULT',
        solution:
          "INSERT INTO customers (name, email) VALUES ('David Lee', 'david.l@email.com');",
        expectedOutput: '1 row inserted with default join_date',
      },
      {
        id: 3,
        title: 'Multiple INSERT',
        description: 'Insert 3 new books in a single statement',
        difficulty: 'medium',
        hint: 'Use INSERT with multiple value sets separated by commas',
        solution: `INSERT INTO books (title, author_id, genre, price, publication_year, stock_quantity) VALUES
('Book One', 1, 'Fiction', 19.99, 2020, 100),
('Book Two', 2, 'Romance', 14.99, 2021, 75),
('Book Three', 3, 'Adventure', 16.99, 2022, 50);`,
        expectedOutput: '3 rows inserted',
      },
      {
        id: 4,
        title: 'UPDATE all rows',
        description: 'Increase the price of all books by $2.00',
        difficulty: 'easy',
        hint: 'Use UPDATE without WHERE to affect all rows',
        solution: 'UPDATE books SET price = price + 2.00;',
        expectedOutput: 'All book prices updated',
      },
      {
        id: 5,
        title: 'UPDATE with WHERE',
        description:
          "Update George Orwell's country to 'India' (he was actually born in India)",
        difficulty: 'medium',
        hint: 'Use UPDATE with WHERE clause',
        solution:
          "UPDATE authors SET country = 'India' WHERE name = 'George Orwell';",
        expectedOutput: '1 row updated',
      },
      {
        id: 6,
        title: 'UPDATE multiple columns',
        description:
          'For "1984", update both price to $18.99 and stock_quantity to 100',
        difficulty: 'medium',
        hint: 'Use UPDATE with multiple SET assignments',
        solution:
          "UPDATE books SET price = 18.99, stock_quantity = 100 WHERE title = '1984';",
        expectedOutput: '1 row updated with multiple columns',
      },
      {
        id: 7,
        title: 'DELETE with condition',
        description: 'Delete the customer with email "michael.b@email.com"',
        difficulty: 'medium',
        hint: 'Use DELETE FROM with WHERE clause',
        solution: "DELETE FROM customers WHERE email = 'michael.b@email.com';",
        expectedOutput: '1 row deleted',
      },
      {
        id: 8,
        title: 'DELETE with complex condition',
        description: 'Delete all books with stock_quantity less than 30',
        difficulty: 'medium',
        hint: 'Use DELETE with comparison operator',
        solution: 'DELETE FROM books WHERE stock_quantity < 30;',
        expectedOutput: 'Multiple rows deleted',
      },
    ],
  },
  {
    id: 'data-retrieval',
    title: '03. Data Retrieval & Functions',
    description:
      'Master SELECT with DISTINCT, CASE expressions, string functions, and pattern matching',
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
        title: 'SELECT DISTINCT categories',
        description: 'List all unique product categories (no duplicates)',
        difficulty: 'easy',
        hint: 'Use SELECT DISTINCT',
        solution: 'SELECT DISTINCT category FROM products;',
        expectedOutput: 'Unique categories only',
      },
      {
        id: 2,
        title: 'Filter by category',
        description: 'Find all products in the Electronics category',
        difficulty: 'easy',
        hint: 'Use WHERE clause with equality condition',
        solution: "SELECT * FROM products WHERE category = 'Electronics';",
        expectedOutput: 'All electronics products',
      },
      {
        id: 3,
        title: 'Price range query',
        description: 'Find products priced between $10 and $100',
        difficulty: 'easy',
        hint: 'Use BETWEEN operator or compound comparison',
        solution: 'SELECT * FROM products WHERE price BETWEEN 10 AND 100;',
        expectedOutput: 'Products in specified price range',
      },
      {
        id: 4,
        title: 'Pattern matching with LIKE',
        description: 'Find all products whose name starts with "Office"',
        difficulty: 'medium',
        hint: 'Use LIKE operator with % wildcard',
        solution: "SELECT * FROM products WHERE product_name LIKE 'Office%';",
        expectedOutput: 'Products matching the pattern',
      },
      {
        id: 5,
        title: 'CASE expression - Price category',
        description:
          'Categorize products as "Budget" (< $50), "Mid-range" ($50-$200), or "Premium" (> $200)',
        difficulty: 'medium',
        hint: 'Use CASE WHEN with multiple conditions',
        solution: `SELECT product_name, price,
       CASE
           WHEN price < 50 THEN 'Budget'
           WHEN price BETWEEN 50 AND 200 THEN 'Mid-range'
           ELSE 'Premium'
       END AS price_category
FROM products;`,
        expectedOutput: 'Products with price categories',
      },
      {
        id: 6,
        title: 'String function - UPPER',
        description: 'Display product names in uppercase',
        difficulty: 'easy',
        hint: 'Use UPPER() function',
        solution:
          'SELECT product_name, UPPER(product_name) AS name_upper FROM products;',
        expectedOutput: 'Product names in uppercase',
      },
      {
        id: 7,
        title: 'String function - LENGTH',
        description: 'Find products with names longer than 10 characters',
        difficulty: 'medium',
        hint: 'Use LENGTH() function in WHERE clause',
        solution:
          'SELECT product_name, LENGTH(product_name) AS name_length FROM products WHERE LENGTH(product_name) > 10;',
        expectedOutput: 'Products with long names',
      },
      {
        id: 8,
        title: 'COALESCE for NULL handling',
        description:
          'Display products with rating, showing "No rating" for NULL ratings',
        difficulty: 'medium',
        hint: 'Use COALESCE() to handle NULL values',
        solution:
          'SELECT product_name, COALESCE(rating, 0) AS rating_display FROM products;',
        expectedOutput: 'Products with default for NULL ratings',
      },
      {
        id: 9,
        title: 'Multiple conditions with AND/OR',
        description:
          'Find Electronics products with rating above 4.3 OR price below $30',
        difficulty: 'medium',
        hint: 'Combine WHERE conditions with AND/OR',
        solution:
          "SELECT * FROM products WHERE category = 'Electronics' AND (rating > 4.3 OR price < 30);",
        expectedOutput: 'Filtered products',
      },
      {
        id: 10,
        title: 'IN operator',
        description:
          'Find products from either TechSupply Co or Paper Plus suppliers',
        difficulty: 'easy',
        hint: 'Use IN operator with list of values',
        solution:
          "SELECT * FROM products WHERE supplier IN ('TechSupply Co', 'Paper Plus');",
        expectedOutput: 'Products from specified suppliers',
      },
      {
        id: 11,
        title: 'ORDER BY with multiple columns',
        description:
          'List products sorted by category (ascending), then price (descending)',
        difficulty: 'medium',
        hint: 'Use ORDER BY with multiple columns and different directions',
        solution: 'SELECT * FROM products ORDER BY category ASC, price DESC;',
        expectedOutput: 'Products sorted by category then price',
      },
      {
        id: 12,
        title: 'LIMIT with OFFSET',
        description: 'Get products 4-6 when sorted by price (pagination)',
        difficulty: 'medium',
        hint: 'Use ORDER BY, LIMIT, and OFFSET',
        solution: 'SELECT * FROM products ORDER BY price LIMIT 3 OFFSET 3;',
        expectedOutput: 'Page 2 of products',
      },
    ],
  },
  {
    id: 'joins',
    title: '04. Joins & Set Operations',
    description:
      'Master table relationships with INNER JOIN, LEFT JOIN, and combining result sets with UNION',
    studyContent: roadmapData.sections.find((s) => s.id === 'joins')?.content,
    schema: `
-- Library Management System
CREATE TABLE libraries (
    library_id INTEGER PRIMARY KEY AUTOINCREMENT,
    library_name TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE members (
    member_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    membership_type TEXT CHECK(membership_type IN ('Basic', 'Premium', 'Student'))
);

CREATE TABLE authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT
);

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    publication_year INTEGER,
    genre TEXT,
    library_id INTEGER,
    FOREIGN KEY (library_id) REFERENCES libraries(library_id)
);

CREATE TABLE book_authors (
    book_id INTEGER,
    author_id INTEGER,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    loan_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    return_date TEXT,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);

-- Sample Data
INSERT INTO libraries (library_name, city) VALUES
('Central Library', 'Springfield'),
('West Branch', 'Springfield'),
('East Branch', 'Springfield'),
('North Library', 'Shelbyville');

INSERT INTO members (first_name, last_name, email, membership_type) VALUES
('Alice', 'Johnson', 'alice@email.com', 'Premium'),
('Bob', 'Smith', 'bob@email.com', 'Basic'),
('Carol', 'Williams', 'carol@email.com', 'Student'),
('David', 'Brown', 'david@email.com', 'Premium'),
('Eve', 'Davis', 'eve@email.com', 'Basic');

INSERT INTO authors (name, country) VALUES
('George Orwell', 'England'),
('Jane Austen', 'England'),
('Mark Twain', 'USA'),
('Isaac Asimov', 'USA'),
('Stephen King', 'USA');

INSERT INTO books (title, publication_year, genre, library_id) VALUES
('1984', 1949, 'Dystopian', 1),
('Animal Farm', 1945, 'Political Fiction', 1),
('Pride and Prejudice', 1813, 'Romance', 2),
('Adventures of Huckleberry Finn', 1884, 'Adventure', 2),
('Foundation', 1951, 'Science Fiction', 3),
('I, Robot', 1950, 'Science Fiction', 3),
('The Shining', 1977, 'Horror', 2);

INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1), (2, 1), (3, 2), (4, 3), (5, 4), (6, 4), (7, 5);

INSERT INTO loans (book_id, member_id, loan_date, due_date, return_date) VALUES
(1, 1, '2024-01-10', '2024-01-24', '2024-01-22'),
(3, 1, '2024-01-25', '2024-02-08', '2024-02-05'),
(5, 2, '2024-01-15', '2024-01-29', NULL),
(7, 3, '2024-02-01', '2024-02-15', NULL),
(2, 4, '2024-01-20', '2024-02-03', '2024-02-10');
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'Simple INNER JOIN',
        description: 'List all books with their library names',
        difficulty: 'easy',
        hint: 'Join books and libraries tables using library_id',
        solution: `SELECT b.title, l.library_name
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id;`,
        expectedOutput: 'Book titles with their library names',
      },
      {
        id: 2,
        title: 'JOIN with WHERE clause',
        description: 'Find all books in Central Library',
        difficulty: 'easy',
        hint: 'Add WHERE condition after the JOIN',
        solution: `SELECT b.title, b.genre, l.library_name
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE l.library_name = 'Central Library';`,
        expectedOutput: 'Books from Central Library',
      },
      {
        id: 3,
        title: 'Three-table JOIN',
        description: 'List all loans with book titles and member names',
        difficulty: 'medium',
        hint: 'Join loans, books, and members tables',
        solution: `SELECT m.first_name || ' ' || m.last_name AS member_name,
       b.title AS book_title,
       ln.loan_date,
       ln.return_date
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id;`,
        expectedOutput: 'Loan records with member and book details',
      },
      {
        id: 4,
        title: 'Many-to-many JOIN',
        description: 'Show all books with their author names',
        difficulty: 'medium',
        hint: 'Join through book_authors junction table',
        solution: `SELECT b.title, a.name AS author_name, b.publication_year
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
ORDER BY a.name;`,
        expectedOutput: 'Books with author information',
      },
      {
        id: 5,
        title: 'LEFT JOIN with NULL check',
        description: 'Find authors who have no books in the system',
        difficulty: 'medium',
        hint: 'LEFT JOIN authors to book_authors, check for NULL',
        solution: `SELECT a.name, a.country
FROM authors a
LEFT JOIN book_authors ba ON a.author_id = ba.author_id
WHERE ba.book_id IS NULL;`,
        expectedOutput: 'Authors without books',
      },
      {
        id: 6,
        title: 'LEFT JOIN with aggregation',
        description:
          'Show all libraries with their book count (include libraries with zero books)',
        difficulty: 'medium',
        hint: 'LEFT JOIN libraries to books, use COUNT with GROUP BY',
        solution: `SELECT l.library_name, l.city, COUNT(b.book_id) AS book_count
FROM libraries l
LEFT JOIN books b ON l.library_id = b.library_id
GROUP BY l.library_id, l.library_name, l.city;`,
        expectedOutput: 'All libraries with book counts',
      },
      {
        id: 7,
        title: 'Active loans (filtering NULLs)',
        description: 'Find currently borrowed books (return_date IS NULL)',
        difficulty: 'medium',
        hint: 'Join loans, members, and books; filter where return_date IS NULL',
        solution: `SELECT m.first_name || ' ' || m.last_name AS member_name,
       b.title AS book_title,
       ln.due_date
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
WHERE ln.return_date IS NULL
ORDER BY ln.loan_date;`,
        expectedOutput: 'Currently borrowed books',
      },
      {
        id: 8,
        title: 'Complex multi-table JOIN',
        description:
          'Find books never loaned - show title, author name, and library name',
        difficulty: 'hard',
        hint: 'Use LEFT JOIN on loans, filter where loan_id IS NULL',
        solution: `SELECT b.title, a.name AS author_name, l.library_name
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
INNER JOIN libraries l ON b.library_id = l.library_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
WHERE ln.loan_id IS NULL
ORDER BY b.title;`,
        expectedOutput: 'Books that have never been borrowed',
      },
      {
        id: 9,
        title: 'UNION - Combine member emails',
        description:
          'Get a list of all contact emails: members + a hardcoded admin email',
        difficulty: 'medium',
        hint: 'Use UNION to combine member emails with a SELECT of literal value',
        solution: `SELECT email, 'Member' AS contact_type FROM members
UNION
SELECT 'admin@library.com', 'Admin';`,
        expectedOutput: 'Combined list of all contact emails',
      },
      {
        id: 10,
        title: 'UNION ALL - Books from multiple libraries',
        description:
          'Combine books from Central Library and West Branch (keep duplicates if any)',
        difficulty: 'medium',
        hint: 'Use UNION ALL with two separate SELECT queries filtering by library_name',
        solution: `SELECT b.title, l.library_name, 'Central' AS source
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE l.library_name = 'Central Library'
UNION ALL
SELECT b.title, l.library_name, 'West' AS source
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE l.library_name = 'West Branch';`,
        expectedOutput: 'Books from both libraries with source tag',
      },
    ],
  },
  {
    id: 'aggregation',
    title: '05. Aggregation & Grouping',
    description:
      'Master aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT with GROUP BY and HAVING',
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
        title: 'AVG - Average order value',
        description: 'Calculate the average order amount per customer',
        difficulty: 'medium',
        hint: 'Use AVG aggregate function with GROUP BY',
        solution: `SELECT c.name, AVG(o.total_amount) AS avg_order_value
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;`,
        expectedOutput: 'Average order value per customer',
      },
      {
        id: 4,
        title: 'MIN and MAX - Order range',
        description: 'Find the smallest and largest order for each region',
        difficulty: 'medium',
        hint: 'Use MIN and MAX functions in same query',
        solution: `SELECT c.region, 
       MIN(o.total_amount) AS smallest_order,
       MAX(o.total_amount) AS largest_order
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.region;`,
        expectedOutput: 'Min and max order amounts per region',
      },
      {
        id: 5,
        title: 'GROUP_CONCAT - Combine values',
        description:
          'List all cities where customers are located in each region',
        difficulty: 'medium',
        hint: 'Use GROUP_CONCAT to combine city names per region',
        solution: `SELECT region, GROUP_CONCAT(DISTINCT city) AS cities
FROM customers
GROUP BY region;`,
        expectedOutput: 'Regions with comma-separated city lists',
      },
      {
        id: 6,
        title: 'COUNT(DISTINCT) - Unique counts',
        description:
          'Count the number of distinct customers who placed orders each month',
        difficulty: 'hard',
        hint: 'Use COUNT(DISTINCT) with strftime to extract month',
        solution: `SELECT strftime('%Y-%m', order_date) AS month,
       COUNT(DISTINCT customer_id) AS unique_customers
FROM orders
GROUP BY strftime('%Y-%m', order_date);`,
        expectedOutput: 'Unique customer count per month',
      },
      {
        id: 7,
        title: 'Multiple GROUP BY columns',
        description: 'Calculate total sales by region and order status',
        difficulty: 'hard',
        hint: 'GROUP BY both region and status columns',
        solution: `SELECT c.region, o.status, SUM(o.total_amount) AS total_sales
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.region, o.status
ORDER BY c.region, o.status;`,
        expectedOutput: 'Sales totals grouped by region and status',
      },
      {
        id: 8,
        title: 'HAVING with multiple conditions',
        description:
          'Find regions with more than 2 orders AND total sales above $4000',
        difficulty: 'hard',
        hint: 'Use HAVING clause with AND combining multiple aggregate conditions',
        solution: `SELECT c.region, 
       COUNT(o.order_id) AS order_count,
       SUM(o.total_amount) AS total_sales
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.region
HAVING COUNT(o.order_id) > 2 AND SUM(o.total_amount) > 4000;`,
        expectedOutput: 'Regions meeting both count and sales thresholds',
      },
      {
        id: 9,
        title: 'Aggregates with CASE',
        description: 'Count completed vs pending orders for each customer',
        difficulty: 'hard',
        hint: 'Use COUNT with CASE WHEN inside to conditionally count',
        solution: `SELECT c.name,
       COUNT(CASE WHEN o.status = 'Completed' THEN 1 END) AS completed_orders,
       COUNT(CASE WHEN o.status = 'Pending' THEN 1 END) AS pending_orders,
       COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;`,
        expectedOutput: 'Order counts by status for each customer',
      },
    ],
  },
  {
    id: 'subqueries',
    title: '06. Subqueries & CTEs',
    description:
      'Master subqueries in SELECT, WHERE, FROM clauses and Common Table Expressions (WITH clause) for readable complex queries',
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
    manager_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

-- Sample Data
INSERT INTO departments (dept_name, location) VALUES
('Engineering', 'San Francisco'),
('Sales', 'New York'),
('Marketing', 'Chicago'),
('HR', 'Boston');

INSERT INTO employees (name, dept_id, salary, hire_date, manager_id) VALUES
('John Smith', 1, 95000, '2022-01-15', NULL),
('Sarah Johnson', 1, 105000, '2021-06-01', 1),
('Mike Brown', 1, 85000, '2023-03-10', 1),
('Emily Davis', 2, 75000, '2022-08-20', NULL),
('David Wilson', 2, 82000, '2021-11-05', 4),
('Lisa Anderson', 3, 70000, '2023-01-15', NULL),
('James Taylor', 3, 68000, '2022-05-01', 6),
('Maria Garcia', 4, 65000, '2021-09-10', NULL);
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
      {
        id: 4,
        title: 'Simple CTE (WITH clause)',
        description: 'Use a CTE to find employees earning above average salary',
        difficulty: 'medium',
        hint: 'Define a CTE with WITH to calculate average, then reference it',
        solution: `WITH avg_salary_cte AS (
    SELECT AVG(salary) AS avg_sal FROM employees
)
SELECT e.name, e.salary, a.avg_sal
FROM employees e, avg_salary_cte a
WHERE e.salary > a.avg_sal;`,
        expectedOutput: 'Employees above average with average displayed',
      },
      {
        id: 5,
        title: 'Multiple CTEs',
        description:
          'Use two CTEs to find departments and their employee counts, then filter for large departments',
        difficulty: 'hard',
        hint: 'Define multiple CTEs separated by commas in WITH clause',
        solution: `WITH dept_counts AS (
    SELECT dept_id, COUNT(*) AS emp_count
    FROM employees
    GROUP BY dept_id
),
high_salary_depts AS (
    SELECT dept_id
    FROM employees
    WHERE salary > 80000
    GROUP BY dept_id
)
SELECT d.dept_name, dc.emp_count
FROM departments d
INNER JOIN dept_counts dc ON d.dept_id = dc.dept_id
INNER JOIN high_salary_depts hsd ON d.dept_id = hsd.dept_id;`,
        expectedOutput: 'Departments with high salaries and their counts',
      },
      {
        id: 6,
        title: 'CTE with aggregation',
        description:
          'Create a CTE that calculates department statistics, then query it',
        difficulty: 'hard',
        hint: 'Build a CTE with GROUP BY, then SELECT from it',
        solution: `WITH dept_stats AS (
    SELECT d.dept_name,
           COUNT(e.emp_id) AS emp_count,
           AVG(e.salary) AS avg_salary,
           MAX(e.salary) AS max_salary
    FROM departments d
    LEFT JOIN employees e ON d.dept_id = e.dept_id
    GROUP BY d.dept_id, d.dept_name
)
SELECT dept_name, emp_count, 
       ROUND(avg_salary, 2) AS avg_salary,
       max_salary
FROM dept_stats
WHERE emp_count > 0
ORDER BY avg_salary DESC;`,
        expectedOutput: 'Department statistics ordered by average salary',
      },
      {
        id: 7,
        title: 'Recursive CTE - Employee hierarchy',
        description:
          'Find all employees and their management chain using recursive CTE',
        difficulty: 'hard',
        hint: 'Use WITH RECURSIVE to traverse manager relationships',
        solution: `WITH RECURSIVE emp_hierarchy AS (
    -- Base case: top-level managers (no manager)
    SELECT emp_id, name, manager_id, 0 AS level,
           name AS path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT e.emp_id, e.name, e.manager_id, eh.level + 1,
           eh.path || ' -> ' || e.name
    FROM employees e
    INNER JOIN emp_hierarchy eh ON e.manager_id = eh.emp_id
)
SELECT level, name, path
FROM emp_hierarchy
ORDER BY level, name;`,
        expectedOutput: 'Employee hierarchy with reporting paths',
      },
    ],
  },
  {
    id: 'window-functions',
    title: '07. Window Functions',
    description:
      'Master analytical queries with ROW_NUMBER, RANK, LAG, LEAD, and aggregate window functions for advanced data analysis',
    studyContent: roadmapData.sections.find((s) => s.id === 'advanced-sql')
      ?.content,
    schema: `
-- Sales Analytics Database
CREATE TABLE sales_reps (
    rep_id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_name TEXT NOT NULL,
    region TEXT NOT NULL
);

CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_id INTEGER NOT NULL,
    sale_date TEXT NOT NULL,
    product TEXT NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (rep_id) REFERENCES sales_reps(rep_id)
);

-- Sample Data
INSERT INTO sales_reps (rep_name, region) VALUES
('Alice Johnson', 'East'),
('Bob Smith', 'East'),
('Carol Williams', 'West'),
('David Brown', 'West'),
('Eve Davis', 'Central');

INSERT INTO sales (rep_id, sale_date, product, amount) VALUES
(1, '2024-01-05', 'Laptop', 1200.00),
(1, '2024-01-12', 'Monitor', 300.00),
(1, '2024-01-20', 'Keyboard', 75.00),
(2, '2024-01-08', 'Laptop', 1200.00),
(2, '2024-01-15', 'Mouse', 25.00),
(3, '2024-01-10', 'Monitor', 350.00),
(3, '2024-01-18', 'Laptop', 1400.00),
(4, '2024-01-12', 'Keyboard', 80.00),
(4, '2024-01-22', 'Monitor', 320.00),
(5, '2024-01-15', 'Laptop', 1300.00),
(5, '2024-01-25', 'Monitor', 300.00);
    `.trim(),
    exercises: [
      {
        id: 1,
        title: 'ROW_NUMBER() - Sequential numbering',
        description:
          'Assign a sequential number to each sale ordered by sale_date',
        difficulty: 'medium',
        hint: 'Use ROW_NUMBER() OVER (ORDER BY sale_date)',
        solution: `SELECT sale_id, 
       product, 
       sale_date, 
       amount,
       ROW_NUMBER() OVER (ORDER BY sale_date) AS row_num
FROM sales;`,
        expectedOutput: 'Sales with sequential row numbers',
      },
      {
        id: 2,
        title: 'RANK() vs DENSE_RANK()',
        description:
          'Rank sales by amount (show difference between RANK and DENSE_RANK)',
        difficulty: 'medium',
        hint: 'RANK leaves gaps after ties, DENSE_RANK does not',
        solution: `SELECT product,
       amount,
       RANK() OVER (ORDER BY amount DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY amount DESC) AS dense_rank
FROM sales;`,
        expectedOutput: 'Sales ranked by amount with both ranking methods',
      },
      {
        id: 3,
        title: 'PARTITION BY - Ranking within groups',
        description: 'Rank sales within each region by amount',
        difficulty: 'medium',
        hint: 'Use PARTITION BY region with RANK()',
        solution: `SELECT sr.region,
       sr.rep_name,
       s.product,
       s.amount,
       RANK() OVER (PARTITION BY sr.region ORDER BY s.amount DESC) AS region_rank
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Sales ranked within each region',
      },
      {
        id: 4,
        title: 'LAG() - Access previous row',
        description:
          'Show each sale with the previous sale amount for the same rep',
        difficulty: 'hard',
        hint: 'Use LAG(amount) OVER (PARTITION BY rep_id ORDER BY sale_date)',
        solution: `SELECT sr.rep_name,
       s.sale_date,
       s.product,
       s.amount,
       LAG(s.amount) OVER (PARTITION BY s.rep_id ORDER BY s.sale_date) AS previous_sale_amount
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Sales with previous sale amount per rep',
      },
      {
        id: 5,
        title: 'LEAD() - Access next row',
        description: 'Show each sale with the next sale date for the same rep',
        difficulty: 'hard',
        hint: 'Use LEAD(sale_date) OVER (PARTITION BY rep_id ORDER BY sale_date)',
        solution: `SELECT sr.rep_name,
       s.sale_date,
       s.product,
       LEAD(s.sale_date) OVER (PARTITION BY s.rep_id ORDER BY s.sale_date) AS next_sale_date
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Sales with next sale date per rep',
      },
      {
        id: 6,
        title: 'Running total with SUM() OVER()',
        description: 'Calculate running total of sales amount ordered by date',
        difficulty: 'hard',
        hint: 'Use SUM(amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING)',
        solution: `SELECT sale_date,
       product,
       amount,
       SUM(amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM sales;`,
        expectedOutput: 'Sales with cumulative running total',
      },
      {
        id: 7,
        title: 'Running total per rep',
        description: 'Calculate running total of sales amount per sales rep',
        difficulty: 'hard',
        hint: 'Use PARTITION BY rep_id with SUM() OVER()',
        solution: `SELECT sr.rep_name,
       s.sale_date,
       s.product,
       s.amount,
       SUM(s.amount) OVER (
           PARTITION BY s.rep_id 
           ORDER BY s.sale_date 
           ROWS UNBOUNDED PRECEDING
       ) AS rep_running_total
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Running total per sales rep',
      },
      {
        id: 8,
        title: 'Moving average with window frame',
        description: 'Calculate 3-sale moving average of amounts per rep',
        difficulty: 'hard',
        hint: 'Use ROWS BETWEEN 2 PRECEDING AND CURRENT ROW for 3-row window',
        solution: `SELECT sr.rep_name,
       s.sale_date,
       s.amount,
       AVG(s.amount) OVER (
           PARTITION BY s.rep_id 
           ORDER BY s.sale_date 
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_avg_3
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Sales with 3-sale moving average per rep',
      },
      {
        id: 9,
        title: 'Percentage of total with window functions',
        description: 'Calculate each sale as percentage of total region sales',
        difficulty: 'hard',
        hint: 'Divide amount by SUM() OVER (PARTITION BY region)',
        solution: `SELECT sr.region,
       sr.rep_name,
       s.amount,
       ROUND(
           100.0 * s.amount / SUM(s.amount) OVER (PARTITION BY sr.region),
           2
       ) AS pct_of_region_sales
FROM sales s
INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id;`,
        expectedOutput: 'Sales as percentage of region total',
      },
      {
        id: 10,
        title: 'Top N per group',
        description:
          'Find top 2 sales by amount in each region using window functions',
        difficulty: 'hard',
        hint: 'Use ROW_NUMBER() PARTITION BY region, then filter in outer query or CTE',
        solution: `WITH ranked_sales AS (
    SELECT sr.region,
           sr.rep_name,
           s.product,
           s.amount,
           ROW_NUMBER() OVER (
               PARTITION BY sr.region 
               ORDER BY s.amount DESC
           ) AS rank
    FROM sales s
    INNER JOIN sales_reps sr ON s.rep_id = sr.rep_id
)
SELECT region, rep_name, product, amount
FROM ranked_sales
WHERE rank <= 2;`,
        expectedOutput: 'Top 2 sales per region',
      },
    ],
  },
  {
    id: 'advanced',
    title: '08. Advanced SQL',
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
        title: 'Complex aggregation with view',
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
        title: 'Transaction analysis by type',
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
      {
        id: 4,
        title: 'BEGIN and COMMIT transaction',
        description: 'Transfer $500 from ACC001 to ACC002 using a transaction',
        difficulty: 'hard',
        hint: 'Use BEGIN, UPDATE both accounts, then COMMIT',
        solution: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE account_number = 'ACC001';
UPDATE accounts SET balance = balance + 500 WHERE account_number = 'ACC002';
COMMIT;`,
        expectedOutput: 'Both accounts updated atomically',
      },
      {
        id: 5,
        title: 'ROLLBACK transaction',
        description:
          'Attempt to withdraw $10000 from ACC001, but rollback if balance would go negative',
        difficulty: 'hard',
        hint: 'Use BEGIN, check balance, ROLLBACK if insufficient funds',
        solution: `BEGIN TRANSACTION;
-- Attempt withdrawal
UPDATE accounts SET balance = balance - 10000 WHERE account_number = 'ACC001';
-- Check would violate CHECK constraint, so ROLLBACK
ROLLBACK;
-- Alternative: Check first
SELECT CASE 
    WHEN balance >= 10000 THEN 'Proceed' 
    ELSE 'Insufficient funds - ROLLBACK' 
END AS status 
FROM accounts WHERE account_number = 'ACC001';`,
        expectedOutput: 'Transaction rolled back, balance unchanged',
      },
      {
        id: 6,
        title: 'SAVEPOINT - Partial rollback',
        description:
          'Make two deposits, but rollback only the second one using SAVEPOINT',
        difficulty: 'hard',
        hint: 'Use BEGIN, UPDATE, SAVEPOINT, UPDATE, ROLLBACK TO savepoint, COMMIT',
        solution: `BEGIN TRANSACTION;
-- First deposit
UPDATE accounts SET balance = balance + 100 WHERE account_number = 'ACC001';
SAVEPOINT after_first_deposit;
-- Second deposit (we'll undo this)
UPDATE accounts SET balance = balance + 200 WHERE account_number = 'ACC001';
-- Rollback only second deposit
ROLLBACK TO SAVEPOINT after_first_deposit;
-- Commit first deposit
COMMIT;`,
        expectedOutput: 'First deposit committed, second one rolled back',
      },
      {
        id: 7,
        title: 'EXPLAIN QUERY PLAN - Index usage',
        description: 'Check if query uses index when filtering by account_id',
        difficulty: 'medium',
        hint: 'Use EXPLAIN QUERY PLAN before your SELECT statement',
        solution: `EXPLAIN QUERY PLAN
SELECT * FROM transactions WHERE account_id = 1;`,
        expectedOutput: 'Shows index scan using idx_transactions_account',
      },
      {
        id: 8,
        title: 'EXPLAIN QUERY PLAN - Join optimization',
        description: 'Analyze query plan for accounts-transactions join',
        difficulty: 'medium',
        hint: 'Check if indexes are used in JOIN operations',
        solution: `EXPLAIN QUERY PLAN
SELECT a.account_number, COUNT(t.transaction_id) AS txn_count
FROM accounts a
LEFT JOIN transactions t ON a.account_id = t.account_id
GROUP BY a.account_id, a.account_number;`,
        expectedOutput: 'Query plan showing join strategy and index usage',
      },
    ],
  },
];

export default exerciseModules;
