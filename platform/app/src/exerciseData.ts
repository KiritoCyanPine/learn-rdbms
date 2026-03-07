import { Module } from './types';

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
];

export default exerciseModules;
