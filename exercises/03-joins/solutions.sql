-- Exercise 3: Joins - Solutions

-- 1. Two-table join
SELECT b.title, l.library_name
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id;

-- 2. Join with WHERE
SELECT b.title, b.genre, l.library_name
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE l.library_name = 'Central Library';

-- 3. Join with filtering
SELECT b.title, b.genre, l.library_name
FROM books b
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE b.genre = 'Science Fiction'
ORDER BY b.title;

-- 4. Three-table join
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    ln.loan_date,
    ln.return_date
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id;

-- 5. Active loans
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    ln.due_date,
    CAST((julianday('now') - julianday(ln.loan_date)) AS INTEGER) AS days_borrowed
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
WHERE ln.return_date IS NULL
ORDER BY ln.loan_date;

-- 6. Books with authors
SELECT 
    b.title,
    a.name AS author_name,
    b.publication_year
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
ORDER BY a.name;

-- 7. All libraries with book count
SELECT 
    l.library_name,
    l.city,
    COUNT(b.book_id) AS book_count
FROM libraries l
LEFT JOIN books b ON l.library_id = b.library_id
GROUP BY l.library_id, l.library_name, l.city;

-- 8. Members with loan history
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    m.membership_type,
    COUNT(ln.loan_id) AS total_loans
FROM members m
LEFT JOIN loans ln ON m.member_id = ln.member_id
GROUP BY m.member_id, m.first_name, m.last_name, m.membership_type;

-- 9. Books never loaned
SELECT 
    b.title,
    a.name AS author_name,
    l.library_name
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
INNER JOIN libraries l ON b.library_id = l.library_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
WHERE ln.loan_id IS NULL
ORDER BY b.title;

-- 10. Authors without books in system
SELECT a.name, a.country
FROM authors a
LEFT JOIN book_authors ba ON a.author_id = ba.author_id
WHERE ba.book_id IS NULL;

-- 11. Most active members
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    m.membership_type,
    COUNT(ln.loan_id) AS total_loans
FROM members m
INNER JOIN loans ln ON m.member_id = ln.member_id
GROUP BY m.member_id, m.first_name, m.last_name, m.membership_type
ORDER BY total_loans DESC;

-- 12. Most borrowed books
SELECT 
    b.title,
    a.name AS author_name,
    COUNT(ln.loan_id) AS times_borrowed
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
GROUP BY b.book_id, b.title, a.name
ORDER BY times_borrowed DESC;

-- 13. Library usage statistics
SELECT 
    l.library_name,
    l.city,
    COUNT(ln.loan_id) AS total_loans
FROM libraries l
LEFT JOIN books b ON l.library_id = b.library_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
GROUP BY l.library_id, l.library_name, l.city;

-- 14. Overdue books
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    m.email,
    b.title AS book_title,
    ln.due_date,
    CAST((julianday('now') - julianday(ln.due_date)) AS INTEGER) AS days_overdue
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
WHERE ln.return_date IS NULL 
  AND ln.due_date < DATE('now')
ORDER BY days_overdue DESC;

-- 15. Member borrowing patterns
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    COUNT(ln.loan_id) AS total_borrowed,
    COUNT(CASE WHEN ln.return_date IS NULL THEN 1 END) AS currently_borrowed,
    COUNT(CASE WHEN ln.return_date IS NOT NULL AND ln.return_date <= ln.due_date THEN 1 END) AS returned_on_time,
    COUNT(CASE WHEN ln.return_date IS NOT NULL AND ln.return_date > ln.due_date THEN 1 END) AS returned_late
FROM members m
INNER JOIN loans ln ON m.member_id = ln.member_id
GROUP BY m.member_id, m.first_name, m.last_name;

-- 16. Books by English authors
SELECT 
    b.title,
    a.name AS author_name,
    b.publication_year,
    l.library_name
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
INNER JOIN libraries l ON b.library_id = l.library_id
WHERE a.country = 'England'
ORDER BY b.publication_year;

-- 17. Books in same library
SELECT DISTINCT
    l.library_name,
    b1.title AS book1,
    b2.title AS book2
FROM books b1
INNER JOIN books b2 ON b1.library_id = b2.library_id AND b1.book_id < b2.book_id
INNER JOIN libraries l ON b1.library_id = l.library_id
WHERE b1.genre = 'Science Fiction' AND b2.genre = 'Science Fiction';

-- 18. Members who joined in same month
SELECT 
    m1.first_name || ' ' || m1.last_name AS member1,
    m2.first_name || ' ' || m2.last_name AS member2,
    strftime('%Y-%m', m1.join_date) AS join_month
FROM members m1
INNER JOIN members m2 
    ON strftime('%Y-%m', m1.join_date) = strftime('%Y-%m', m2.join_date)
    AND m1.member_id < m2.member_id;

-- 19. Complete loan history
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    m.membership_type,
    b.title AS book_title,
    b.genre,
    a.name AS author_name,
    l.library_name,
    ln.loan_date,
    ln.due_date,
    ln.return_date,
    CASE 
        WHEN ln.return_date IS NOT NULL THEN 'Returned'
        WHEN ln.due_date < DATE('now') THEN 'Overdue'
        ELSE 'Current'
    END AS status
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
INNER JOIN libraries l ON b.library_id = l.library_id
ORDER BY ln.loan_date DESC;

-- 20. Library collection analysis
SELECT 
    l.library_name,
    l.city,
    COUNT(DISTINCT b.book_id) AS total_books,
    COUNT(DISTINCT a.author_id) AS unique_authors,
    (SELECT genre 
     FROM books 
     WHERE library_id = l.library_id 
     GROUP BY genre 
     ORDER BY COUNT(*) DESC 
     LIMIT 1) AS most_common_genre,
    COUNT(CASE WHEN ln.return_date IS NULL THEN 1 END) AS active_loans
FROM libraries l
LEFT JOIN books b ON l.library_id = b.library_id
LEFT JOIN book_authors ba ON b.book_id = ba.book_id
LEFT JOIN authors a ON ba.author_id = a.author_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
GROUP BY l.library_id, l.library_name, l.city
ORDER BY total_books DESC;

-- 21. Member engagement report
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    m.email,
    m.join_date,
    COUNT(ln.loan_id) AS total_loans,
    COUNT(CASE WHEN ln.return_date IS NULL THEN 1 END) AS currently_borrowed,
    AVG(CASE 
        WHEN ln.return_date IS NOT NULL 
        THEN julianday(ln.return_date) - julianday(ln.loan_date)
    END) AS avg_loan_duration_days
FROM members m
LEFT JOIN loans ln ON m.member_id = ln.member_id
WHERE m.membership_type = 'Premium'
GROUP BY m.member_id, m.first_name, m.last_name, m.email, m.join_date
ORDER BY total_loans DESC;

-- 22. Author popularity
SELECT 
    a.name AS author_name,
    COUNT(DISTINCT b.book_id) AS books_in_system,
    COUNT(ln.loan_id) AS total_borrows,
    COUNT(DISTINCT b.library_id) AS libraries_carrying
FROM authors a
INNER JOIN book_authors ba ON a.author_id = ba.author_id
INNER JOIN books b ON ba.book_id = b.book_id
LEFT JOIN loans ln ON b.book_id = ln.book_id
GROUP BY a.author_id, a.name
HAVING COUNT(ln.loan_id) > 0
ORDER BY total_borrows DESC;

-- 23. Books with multiple authors
SELECT 
    b.title,
    COUNT(ba.author_id) AS author_count,
    GROUP_CONCAT(a.name, ', ') AS authors
FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.author_id
GROUP BY b.book_id, b.title
HAVING COUNT(ba.author_id) > 1;

-- 24. Library network analysis (simplified version)
SELECT 
    a.name AS author_name,
    l1.library_name AS library1,
    l2.library_name AS library2,
    b1.title AS shared_book_title
FROM books b1
INNER JOIN books b2 ON b1.book_id != b2.book_id
INNER JOIN book_authors ba1 ON b1.book_id = ba1.book_id
INNER JOIN book_authors ba2 ON b2.book_id = ba2.book_id AND ba1.author_id = ba2.author_id
INNER JOIN authors a ON ba1.author_id = a.author_id
INNER JOIN libraries l1 ON b1.library_id = l1.library_id
INNER JOIN libraries l2 ON b2.library_id = l2.library_id
WHERE l1.library_id < l2.library_id;

-- 25. Member recommendation system
-- Books borrowed by others who read same books as Alice, but Alice hasn't read
SELECT DISTINCT 
    b.title AS recommended_book,
    m2.first_name || ' ' || m2.last_name AS borrowed_by
FROM members m1
INNER JOIN loans ln1 ON m1.member_id = ln1.member_id
INNER JOIN loans ln2 ON ln1.book_id = ln2.book_id AND ln1.member_id != ln2.member_id
INNER JOIN members m2 ON ln2.member_id = m2.member_id
INNER JOIN loans ln3 ON m2.member_id = ln3.member_id
INNER JOIN books b ON ln3.book_id = b.book_id
WHERE m1.first_name = 'Alice' AND m1.last_name = 'Johnson'
  AND b.book_id NOT IN (
      SELECT book_id FROM loans WHERE member_id = m1.member_id
  );

-- 26. Timeline analysis
SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    'Borrowed' AS event_type,
    ln.loan_date AS event_date
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
WHERE strftime('%Y-%m', ln.loan_date) = '2024-02'

UNION ALL

SELECT 
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    'Returned' AS event_type,
    ln.return_date AS event_date
FROM loans ln
INNER JOIN members m ON ln.member_id = m.member_id
INNER JOIN books b ON ln.book_id = b.book_id
WHERE strftime('%Y-%m', ln.return_date) = '2024-02'

ORDER BY event_date;
