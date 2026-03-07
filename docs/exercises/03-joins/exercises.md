# Exercise 3: Joining Tables

Master table relationships and different types of joins.

## Setup

```bash
sqlite3 library.db < schema.sql
```

## Understanding the Schema

**Relationships:**

- Libraries 1:N Books (one library has many books)
- Books M:N Authors (many-to-many via book_authors)
- Members 1:N Loans (one member has many loans)
- Books 1:N Loans (one book can be loaned many times)

## Exercises

### INNER JOIN Basics

1. **Two-table join**
   - List all books with their library names
   - Show: book title, library name

2. **Join with WHERE**
   - Find all books in 'Central Library'
   - Show: book title, genre, library name

3. **Join with filtering**
   - Find Science Fiction books and their library locations
   - Order by book title

### Multiple INNER JOINs

4. **Three-table join**
   - List all loans with book titles and member names
   - Show: member name, book title, loan date, return date

5. **Active loans**
   - Find currently borrowed books (return_date IS NULL)
   - Show: member name, book title, due date, days borrowed
   - Order by loan date

6. **Books with authors**
   - Join books, book_authors, and authors tables
   - Show: book title, author name, publication year
   - Order by author name

### LEFT JOIN

7. **All libraries with book count**
   - Show all libraries, even if they have no books
   - Include count of books at each library
   - Show: library name, city, book count

8. **Members with loan history**
   - List all members with count of their loans
   - Include members who never borrowed
   - Show: member name, membership type, total loans

9. **Books never loaned**
   - Find books that have never been borrowed
   - Show: book title, author name, library name
   - Order by book title

10. **Authors without books in system**
    - Find authors who have no books in any library
    - Show: author name, country

### Joining Statistics

11. **Most active members**
    - Count total loans per member (including returned)
    - Show: member name, membership type, total loans
    - Order by total loans descending

12. **Most borrowed books**
    - Count how many times each book was loaned
    - Show: book title, author name, times borrowed
    - Order by times borrowed descending

13. **Library usage statistics**
    - Count total loans per library
    - Show: library name, city, total loans
    - Include libraries with zero loans

### Complex Joins

14. **Overdue books**
    - Find loans where book hasn't been returned and is past due date
    - Show: member name, email, book title, due date, days overdue
    - Order by days overdue descending

15. **Member borrowing patterns**
    - For each member, show:
      - Total books borrowed
      - Books currently borrowed
      - Books returned on time
      - Books returned late
    - Show only members with at least one loan

16. **Books by English authors**
    - Find all books by authors from England
    - Show: book title, author name, publication year, library
    - Order by publication year

### SELF JOIN

17. **Books in same library**
    - Find pairs of Science Fiction books in the same library
    - Don't show duplicate pairs (e.g., Book A + Book B, not also Book B + Book A)
    - Show: library name, book1 title, book2 title

18. **Members who joined in same month**
    - Find pairs of members who joined in the same month/year
    - Show: member1 name, member2 name, join_date

### Advanced Queries

19. **Complete loan history**
    - Create a complete loan report with:
      - Member name and membership type
      - Book title and genre
      - Author name
      - Library name
      - Loan date, due date, return date
      - Status (Returned/Current/Overdue)
    - Order by loan date descending

20. **Library collection analysis**
    - For each library, show:
      - Library name and city
      - Total books
      - Total unique authors
      - Most common genre
      - Number of active loans
    - Order by total books descending

21. **Member engagement report**
    - For Premium members only:
      - Name and email
      - Join date
      - Total loans all-time
      - Currently borrowed books
      - Average loan duration (for returned books)
    - Order by total loans descending

22. **Author popularity**
    - For each author:
      - Author name
      - Number of books in system
      - Total times their books were borrowed
      - Number of libraries carrying their books
    - Only show authors with at least one book borrowed
    - Order by total borrows descending

## Challenge Exercises

23. **Books with multiple authors**
    - Find books that have more than one author
    - Show: book title, number of authors, comma-separated author names
    - Hint: Use GROUP BY and GROUP_CONCAT()

24. **Library network analysis**
    - Find which libraries have books by the same authors
    - Show: author name, library1, library2, shared book titles
    - Don't show duplicate pairs

25. **Member recommendation system**
    - For a specific member (e.g., Alice Johnson):
      - Find other members who borrowed the same books
      - Show books those members borrowed that Alice hasn't
      - This is a basic collaborative filtering approach
    - Show: recommended book title, borrowed by member name

26. **Timeline analysis**
    - Create a timeline showing:
      - All loan events (borrowed and returned) in February 2024
      - Member name, book title, event type, event date
    - Order chronologically

## Tips

- Draw the table relationships before writing complex joins
- Use table aliases (e.g., `members m`) to keep queries readable
- Start with simple joins, then add more tables
- Test ON conditions carefully
- Use LEFT JOIN when you want all records from the left table
- Use INNER JOIN when you only want matching records

## Verification

```sql
-- Check join correctness
SELECT COUNT(*) FROM books b
INNER JOIN book_authors ba ON b.book_id = ba.book_id;
-- Should equal number of rows in book_authors

-- Verify LEFT JOIN includes all
SELECT COUNT(*) FROM libraries;  -- All libraries
SELECT COUNT(DISTINCT library_id) FROM books;  -- Libraries with books
-- First number should be >= second
```

---

See [solutions.sql](solutions.sql) for complete answers.
