# Exercise 1: SQL Basics

Practice the fundamental SQL commands: CREATE, INSERT, SELECT, UPDATE, DELETE.

## Setup

Run the schema file to create the database:

```bash
sqlite3 bookstore.db < schema.sql
```

## Exercises

### SELECT Basics

1. **Select all books**
   - Display all columns from the books table

2. **Select specific columns**
   - Display only the title and price of all books

3. **Select with aliases**
   - Display book titles as "Book Title" and prices as "Cost"

4. **Select with calculations**
   - Display book titles with their prices including 10% tax (alias as "price_with_tax")
   - Calculate the total value of each book in stock (price × stock_quantity)

### INSERT Practice

5. **Insert a new author**
   - Add yourself as an author with your country and birth year

6. **Insert a new book**
   - Add a fictional book by the author you just created
   - Include all relevant fields

7. **Insert multiple customers**
   - Add at least 3 new customers in a single INSERT statement

### UPDATE Practice

8. **Update a single record**
   - George Orwell was actually born in India. Update his country to 'India'.

9. **Update multiple records**
   - Increase the price of all books by $2.00

10. **Update with WHERE clause**
    - Decrease the stock quantity by 5 for all books in the 'Fiction' genre

11. **Update with calculation**
    - Apply a 15% discount to all books published before 1950

### DELETE Practice

12. **Delete with condition**
    - Delete all books with 0 stock quantity (first set some to 0 with UPDATE)

13. **Delete customer**
    - Delete the customer with email 'michael.b@email.com'

### Complex Queries

14. **Count records**
    - How many books are in the database?
    - How many authors are from England?

15. **Find unique values**
    - List all unique genres in the books table

## Challenge Exercises

16. **Multi-step operation**
    - Insert a new genre "Classic" into the database
    - Update all books published before 1900 to have genre "Classic"
    - Calculate the total inventory value of Classic books

17. **Safe delete practice**
    - Write a SELECT query to find all books where stock_quantity is less than 10
    - Convert that SELECT into a DELETE statement
    - Before running DELETE, verify what you'll delete with SELECT

18. **Data validation**
    - Try to insert a book without a title (should fail)
    - Try to insert a customer with a duplicate email (should fail)
    - Try to insert a book with a negative price (should succeed but is logically wrong - we'll fix this with constraints later)

## Tips

- Always test UPDATE and DELETE with a SELECT first
- Use transactions for multi-step operations
- Check the number of affected rows after UPDATE/DELETE
- Use `.mode column` and `.headers on` in SQLite for better readability

## Verification Queries

After completing exercises, run these to verify:

```sql
-- Should show your new author
SELECT * FROM authors ORDER BY author_id DESC LIMIT 1;

-- Should show price increases
SELECT title, price FROM books ORDER BY price DESC;

-- Should show updated stock quantities
SELECT title, genre, stock_quantity FROM books WHERE genre = 'Fiction';
```

---

See [solutions.sql](solutions.sql) for complete answers.
