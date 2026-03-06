-- Exercise 1: SQL Basics - Solutions

-- 1. Select all books
SELECT * FROM books;

-- 2. Select specific columns
SELECT title, price FROM books;

-- 3. Select with aliases
SELECT 
    title AS "Book Title",
    price AS "Cost"
FROM books;

-- 4. Select with calculations
-- Price with 10% tax
SELECT 
    title,
    price,
    ROUND(price * 1.10, 2) AS price_with_tax
FROM books;

-- Total inventory value
SELECT 
    title,
    price,
    stock_quantity,
    ROUND(price * stock_quantity, 2) AS inventory_value
FROM books;

-- 5. Insert a new author
INSERT INTO authors (first_name, last_name, country, birth_year)
VALUES ('John', 'Developer', 'USA', 1990);

-- 6. Insert a new book
INSERT INTO books (title, author_id, isbn, price, publication_year, genre, pages, stock_quantity)
VALUES ('Learning SQL', 6, '978-1234567890', 29.99, 2024, 'Technical', 350, 100);

-- 7. Insert multiple customers
INSERT INTO customers (first_name, last_name, email, phone) VALUES
    ('Alice', 'Williams', 'alice.w@email.com', '555-0201'),
    ('Bob', 'Martinez', 'bob.m@email.com', '555-0202'),
    ('Carol', 'Garcia', 'carol.g@email.com', NULL);

-- 8. Update a single record
UPDATE authors 
SET country = 'India' 
WHERE first_name = 'George' AND last_name = 'Orwell';

-- 9. Update multiple records
UPDATE books 
SET price = price + 2.00;

-- 10. Update with WHERE clause
UPDATE books 
SET stock_quantity = stock_quantity - 5 
WHERE genre = 'Fiction';

-- 11. Update with calculation
UPDATE books 
SET price = ROUND(price * 0.85, 2) 
WHERE publication_year < 1950;

-- 12. Delete with condition
-- First, set some books to 0 stock
UPDATE books SET stock_quantity = 0 WHERE title = 'Animal Farm';

-- Then delete
DELETE FROM books WHERE stock_quantity = 0;

-- 13. Delete customer
DELETE FROM customers WHERE email = 'michael.b@email.com';

-- 14. Count records
-- Total books
SELECT COUNT(*) AS total_books FROM books;

-- Authors from England
SELECT COUNT(*) AS english_authors FROM authors WHERE country = 'England';

-- 15. Find unique values
SELECT DISTINCT genre FROM books ORDER BY genre;

-- 16. Multi-step operation
-- Note: There's no separate "genres" table in our schema, genre is just a column
-- So we'll work with the data we have

-- Update old books to Classic
UPDATE books 
SET genre = 'Classic' 
WHERE publication_year < 1900;

-- Calculate total inventory value of Classic books
SELECT 
    genre,
    COUNT(*) AS book_count,
    SUM(stock_quantity) AS total_units,
    ROUND(SUM(price * stock_quantity), 2) AS total_inventory_value
FROM books 
WHERE genre = 'Classic'
GROUP BY genre;

-- 17. Safe delete practice
-- First, SELECT to see what will be deleted
SELECT title, stock_quantity 
FROM books 
WHERE stock_quantity < 10;

-- Then DELETE (commented out for safety)
-- DELETE FROM books WHERE stock_quantity < 10;

-- 18. Data validation
-- Try to insert a book without a title (will fail due to NOT NULL constraint)
-- INSERT INTO books (author_id, isbn, price) VALUES (1, '978-1111111111', 19.99);

-- Try to insert a customer with duplicate email (will fail due to UNIQUE constraint)
-- INSERT INTO customers (first_name, last_name, email) 
-- VALUES ('Jane', 'Duplicate', 'john.smith@email.com');

-- Try to insert a book with negative price (will succeed - no CHECK constraint)
-- This demonstrates why we need constraints!
-- INSERT INTO books (title, author_id, isbn, price, stock_quantity)
-- VALUES ('Bad Price Book', 1, '978-9999999999', -10.00, 5);

-- Verification queries
SELECT '=== All Authors ===' AS section;
SELECT * FROM authors;

SELECT '=== All Books ===' AS section;
SELECT title, price, stock_quantity, genre FROM books;

SELECT '=== All Customers ===' AS section;
SELECT * FROM customers;

SELECT '=== Summary Statistics ===' AS section;
SELECT 
    COUNT(*) AS total_books,
    COUNT(DISTINCT author_id) AS unique_authors,
    COUNT(DISTINCT genre) AS unique_genres,
    ROUND(AVG(price), 2) AS average_price,
    SUM(stock_quantity) AS total_stock
FROM books;
