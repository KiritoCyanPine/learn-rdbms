# Exercise 6: Advanced SQL Concepts

Practice indexes, transactions, views, and performance optimization.

## Setup

```bash
# You can use any of the previous exercise databases
# Or create a new one for these exercises
sqlite3 advanced.db
```

## Part 1: Indexing

### Understanding Indexes

1. **Create indexes**
   - Create an index on employees(last_name)
   - Create a composite index on employees(dept_id, salary)
   - Create a unique index on employees(email)

2. **Analyze query plans**

   ```sql
   EXPLAIN QUERY PLAN
   SELECT * FROM employees WHERE last_name = 'Smith';
   ```

   - Run this before and after creating an index
   - Compare the execution plans
   - Document the differences

3. **Index effectiveness**
   - Create queries that benefit from indexes
   - Create queries where indexes aren't helpful (e.g., SELECT \*)
   - Test with EXPLAIN QUERY PLAN

4. **When NOT to index**
   - Test query performance on a small table (<100 rows) with and without index
   - Test with columns that have low cardinality (few unique values)
   - Document when indexes slow down INSERT/UPDATE operations

### Index Exercises

5. **Optimize a slow query**

   ```sql
   -- This query is slow:
   SELECT * FROM orders o
   JOIN order_items oi ON o.order_id = oi.order_id
   JOIN products p ON oi.product_id = p.product_id
   WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
   AND p.category = 'Electronics';
   ```

   - Identify which indexes would help
   - Create those indexes
   - Measure improvement

6. **Composite index vs multiple single indexes**
   - Compare performance of:
     - Single index on (dept_id)
     - Single index on (salary)
     - Composite index on (dept_id, salary)
   - For query: WHERE dept_id = 1 AND salary > 100000

## Part 2: Transactions

### Basic Transactions

7. **Simple transaction**
   - Begin a transaction
   - Insert a new employee
   - Insert their project assignment
   - Commit
   - Verify data is saved

8. **Rollback practice**
   - Begin transaction
   - Delete all employees in a department
   - Check the count (should be 0)
   - Rollback
   - Verify employees are back

9. **Bank transfer simulation**
   ```sql
   -- Transfer $500 from account 1 to account 2
   -- Must be atomic: either both updates succeed or neither
   ```

### Transaction Isolation

10. **Dirty read demonstration** (if supported)
    - In one session: BEGIN, UPDATE salary, don't COMMIT
    - In another session: Try to read the updated salary
    - Document what you see

11. **Transaction conflicts**
    - Start two transactions
    - Both try to update the same employee's salary
    - Document what happens (one waits, one fails, etc.)

### Savepoints

12. **Using savepoints**
    ```sql
    BEGIN;
    INSERT INTO employees (...);
    SAVEPOINT after_insert;
    UPDATE employees SET salary = salary * 1.1;
    -- Oops, mistake!
    ROLLBACK TO SAVEPOINT after_insert;
    COMMIT;
    ```

## Part 3: Views

### Creating Views

13. **Simple view**
    - Create a view showing employee names and department names
    - Query the view
    - Try to UPDATE through the view (may not work)

14. **Aggregated view**
    - Create a view showing department statistics:
      - Dept name
      - Employee count
      - Average salary
      - Total salary cost
    - Use this view in queries

15. **Complex view**
    - Create a view combining multiple tables:
      - Employee details
      - Their current projects
      - Total hours allocated
      - Manager name

SQLite has limited view support. For more advanced view features, these exercises work better in PostgreSQL:

16. **Updatable view** (PostgreSQL)
    - Create a simple view on one table
    - Insert/update through the view
    - Verify changes in base table

17. **Materialized view** (PostgreSQL)
    - Create a materialized view with expensive aggregations
    - Query it multiple times (should be fast)
    - Refresh the materialized view
    - Compare performance vs regular view

## Part 4: Performance Optimization

### Query Optimization

18. **Avoid SELECT \***
    - Compare performance:
      - SELECT \* FROM large_table
      - SELECT id, name FROM large_table
    - Document the difference

19. **Limit early**
    - Compare:
      - Large JOIN then LIMIT 10
      - LIMIT on subquery before JOIN
    - Which is faster?

20. **EXISTS vs IN**
    - Write the same query using EXISTS and IN
    - Compare execution plans
    - Which is more efficient for your data?

21. **JOIN order matters**
    - Compare different JOIN orders for a 3-table query
    - Document if the database optimizer reorders them

### Avoiding Common Pitfalls

22. **Don't use functions in WHERE**

    ```sql
    -- Slow (can't use index):
    WHERE UPPER(last_name) = 'SMITH'

    -- Fast (can use index):
    WHERE last_name = 'Smith'
    ```

    - Test both approaches
    - Measure the difference

23. **OR conditions**

    ```sql
    -- May not use indexes well:
    WHERE dept_id = 1 OR dept_id = 2

    -- Better:
    WHERE dept_id IN (1, 2)

    -- Or even:
    UNION of two queries
    ```

    - Compare all three approaches

24. **Implicit type conversion**
    ```sql
    -- If phone is TEXT:
    WHERE phone = 1234567890  -- BAD: forces conversion, no index
    WHERE phone = '1234567890'  -- GOOD: can use index
    ```

## Part 5: Advanced Features (PostgreSQL)

### Window Functions

25. **ROW_NUMBER**

    ```sql
    SELECT
        emp_id,
        salary,
        ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
    FROM employees;
    ```

26. **PARTITION BY**

    ```sql
    SELECT
        dept_id,
        emp_id,
        salary,
        ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) as dept_rank
    FROM employees;
    ```

27. **Running totals**
    ```sql
    SELECT
        order_date,
        total_amount,
        SUM(total_amount) OVER (ORDER BY order_date) as running_total
    FROM orders;
    ```

### Common Table Expressions (CTEs)

28. **Basic CTE**

    ```sql
    WITH high_earners AS (
        SELECT * FROM employees WHERE salary > 100000
    )
    SELECT * FROM high_earners WHERE dept_id = 1;
    ```

29. **Multiple CTEs**

    ```sql
    WITH
    dept_avg AS (
        SELECT dept_id, AVG(salary) as avg_sal FROM employees GROUP BY dept_id
    ),
    high_performers AS (
        SELECT * FROM employees WHERE performance_rating > 4
    )
    SELECT * FROM high_performers h
    JOIN dept_avg d ON h.dept_id = d.dept_id
    WHERE h.salary > d.avg_sal;
    ```

30. **Recursive CTE**
    ```sql
    -- Find all employees in reporting chain
    WITH RECURSIVE emp_hierarchy AS (
        SELECT emp_id, manager_id, first_name, 1 as level
        FROM employees
        WHERE manager_id IS NULL

        UNION ALL

        SELECT e.emp_id, e.manager_id, e.first_name, eh.level + 1
        FROM employees e
        JOIN emp_hierarchy eh ON e.manager_id = eh.emp_id
    )
    SELECT * FROM emp_hierarchy;
    ```

## Challenge Exercises

31. **Performance audit**
    - Take one of your previous complex queries
    - Use EXPLAIN ANALYZE (PostgreSQL) or EXPLAIN QUERY PLAN (SQLite)
    - Identify bottlenecks
    - Add appropriate indexes
    - Rewrite query if needed
    - Document before/after performance

32. **Transaction safety**
    - Write a procedure that:
      - Transfers an employee to a new department
      - Updates their salary
      - Creates a salary history record
      - Assigns them to a project in that department
    - All must succeed or all must fail
    - Handle potential errors

33. **View for reporting**
    - Create a comprehensive view for executive dashboard:
      - Department name
      - Employee count
      - Average salary
      - Total project budget
      - Active project count
      - Budget utilization %
    - Make it performant for frequent queries

## Tips

- **Indexes**: Help reads, hurt writes. Balance carefully.
- **Transactions**: Keep them short. Lock as little as possible.
- **Views**: Great for abstraction, but check the execution plan.
- **Optimization**: Measure first, optimize second.
- **EXPLAIN**: Your best friend for understanding queries.

## Verification

```sql
-- Check indexes exist
-- SQLite:
SELECT name, tbl_name FROM sqlite_master WHERE type = 'index';

-- Check if view exists
SELECT name FROM sqlite_master WHERE type = 'view';

-- Verify transaction isolation
BEGIN;
SELECT * FROM test_table;
-- In another session, modify the data
SELECT * FROM test_table;  -- Should see same data
COMMIT;
```

---

See [solutions.sql](solutions.sql) for guidance and examples.
