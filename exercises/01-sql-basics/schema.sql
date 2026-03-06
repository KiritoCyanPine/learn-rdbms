-- Database: Bookstore
-- This schema represents a simple bookstore with books, authors, and customers

CREATE TABLE IF NOT EXISTS authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    country TEXT,
    birth_year INTEGER
);

CREATE TABLE IF NOT EXISTS books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    isbn TEXT UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    publication_year INTEGER,
    genre TEXT,
    pages INTEGER,
    stock_quantity INTEGER DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Sample data
INSERT INTO authors (first_name, last_name, country, birth_year) VALUES
    ('George', 'Orwell', 'England', 1903),
    ('Jane', 'Austen', 'England', 1775),
    ('Gabriel', 'García Márquez', 'Colombia', 1927),
    ('Haruki', 'Murakami', 'Japan', 1949),
    ('Chimamanda', 'Adichie', 'Nigeria', 1977);

INSERT INTO books (title, author_id, isbn, price, publication_year, genre, pages, stock_quantity) VALUES
    ('1984', 1, '978-0451524935', 15.99, 1949, 'Dystopian', 328, 50),
    ('Animal Farm', 1, '978-0451526342', 12.99, 1945, 'Political Fiction', 112, 30),
    ('Pride and Prejudice', 2, '978-0141439518', 10.99, 1813, 'Romance', 432, 25),
    ('One Hundred Years of Solitude', 3, '978-0060883287', 18.99, 1967, 'Magical Realism', 417, 15),
    ('Norwegian Wood', 4, '978-0375704024', 16.99, 1987, 'Fiction', 296, 40),
    ('Kafka on the Shore', 4, '978-1400079278', 17.99, 2002, 'Magical Realism', 480, 20),
    ('Americanah', 5, '978-0307455925', 16.99, 2013, 'Fiction', 477, 35);

INSERT INTO customers (first_name, last_name, email, phone) VALUES
    ('John', 'Smith', 'john.smith@email.com', '555-0101'),
    ('Emma', 'Johnson', 'emma.j@email.com', '555-0102'),
    ('Michael', 'Brown', 'michael.b@email.com', NULL),
    ('Sarah', 'Davis', 'sarah.davis@email.com', '555-0104');
