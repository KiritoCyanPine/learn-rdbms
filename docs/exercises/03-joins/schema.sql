-- Database: Library Management System
-- Practice different types of joins

CREATE TABLE IF NOT EXISTS libraries (
    library_id INTEGER PRIMARY KEY AUTOINCREMENT,
    library_name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS members (
    member_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    join_date DATE DEFAULT CURRENT_DATE,
    membership_type TEXT CHECK(membership_type IN ('Basic', 'Premium', 'Student'))
);

CREATE TABLE IF NOT EXISTS authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    birth_year INTEGER
);

CREATE TABLE IF NOT EXISTS books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    isbn TEXT UNIQUE,
    publication_year INTEGER,
    genre TEXT,
    library_id INTEGER,
    FOREIGN KEY (library_id) REFERENCES libraries(library_id)
);

-- Many-to-many: books can have multiple authors
CREATE TABLE IF NOT EXISTS book_authors (
    book_id INTEGER,
    author_id INTEGER,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE IF NOT EXISTS loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);

-- Sample data
INSERT INTO libraries (library_name, address, city, phone) VALUES
    ('Central Library', '123 Main St', 'Springfield', '555-1000'),
    ('West Branch', '456 West Ave', 'Springfield', '555-2000'),
    ('East Branch', '789 East Blvd', 'Springfield', '555-3000'),
    ('North Library', '321 North Rd', 'Shelbyville', NULL);

INSERT INTO members (first_name, last_name, email, phone, membership_type, join_date) VALUES
    ('Alice', 'Johnson', 'alice@email.com', '555-0001', 'Premium', '2023-01-15'),
    ('Bob', 'Smith', 'bob@email.com', '555-0002', 'Basic', '2023-03-20'),
    ('Carol', 'Williams', 'carol@email.com', '555-0003', 'Student', '2023-05-10'),
    ('David', 'Brown', 'david@email.com', '555-0004', 'Premium', '2023-06-01'),
    ('Eve', 'Davis', 'eve@email.com', NULL, 'Basic', '2023-08-15'),
    ('Frank', 'Miller', 'frank@email.com', '555-0006', 'Student', '2024-01-10');

INSERT INTO authors (name, country, birth_year) VALUES
    ('George Orwell', 'England', 1903),
    ('Jane Austen', 'England', 1775),
    ('Mark Twain', 'USA', 1835),
    ('Agatha Christie', 'England', 1890),
    ('Isaac Asimov', 'USA', 1920),
    ('J.K. Rowling', 'England', 1965),
    ('Stephen King', 'USA', 1947');

INSERT INTO books (title, isbn, publication_year, genre, library_id) VALUES
    ('1984', '978-0451524935', 1949, 'Dystopian', 1),
    ('Animal Farm', '978-0451526342', 1945, 'Political Fiction', 1),
    ('Pride and Prejudice', '978-0141439518', 1813, 'Romance', 2),
    ('Adventures of Huckleberry Finn', '978-0486280615', 1884, 'Adventure', 2),
    ('Murder on the Orient Express', '978-0062693662', 1934, 'Mystery', 1),
    ('Foundation', '978-0553293357', 1951, 'Science Fiction', 3),
    ('I, Robot', '978-0553382563', 1950, 'Science Fiction', 3),
    ('Harry Potter - Philosophers Stone', '978-0439708180', 1997, 'Fantasy', 1),
    ('The Shining', '978-0307743657', 1977, 'Horror', 2);

INSERT INTO book_authors (book_id, author_id) VALUES
    (1, 1),  -- 1984 by Orwell
    (2, 1),  -- Animal Farm by Orwell
    (3, 2),  -- Pride & Prejudice by Austen
    (4, 3),  -- Huckleberry Finn by Twain
    (5, 4),  -- Orient Express by Christie
    (6, 5),  -- Foundation by Asimov
    (7, 5),  -- I, Robot by Asimov
    (8, 6),  -- Harry Potter by Rowling
    (9, 7);  -- The Shining by King

INSERT INTO loans (book_id, member_id, loan_date, due_date, return_date) VALUES
    (1, 1, '2024-01-10', '2024-01-24', '2024-01-22'),  -- Returned on time
    (3, 1, '2024-01-25', '2024-02-08', '2024-02-05'),  -- Returned on time
    (8, 2, '2024-01-15', '2024-01-29', NULL),          -- Not returned yet (overdue)
    (5, 3, '2024-02-01', '2024-02-15', '2024-02-14'),  -- Returned on time
    (6, 3, '2024-02-16', '2024-03-01', NULL),          -- Currently borrowed
    (9, 4, '2024-01-20', '2024-02-03', '2024-02-10'),  -- Returned late
    (2, 5, '2024-02-05', '2024-02-19', NULL),          -- Currently borrowed
    (7, 1, '2024-02-20', '2024-03-05', NULL);          -- Currently borrowed

CREATE INDEX idx_loans_member ON loans(member_id);
CREATE INDEX idx_loans_book ON loans(book_id);
CREATE INDEX idx_books_library ON books(library_id);
