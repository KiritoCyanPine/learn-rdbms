-- Exercise 6: Advanced SQL - Solutions and Examples

-- =====================================
-- Part 1: Indexing
-- =====================================

-- 1. Create indexes
CREATE INDEX idx_employees_last_name ON employees(last_name);
CREATE INDEX idx_employees_dept_salary ON employees(dept_id, salary);
CREATE UNIQUE INDEX idx_employees_email ON employees(email);

-- 2. Analyze query plans
-- Before index:
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE last_name = 'Smith';
-- Result: SCAN TABLE employees

-- After creating index:
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE last_name = 'Smith';
-- Result: SEARCH TABLE employees USING INDEX idx_employees_last_name

-- 3. Index effectiveness
-- Good use of index:
EXPLAIN QUERY PLAN
SELECT emp_id, first_name FROM employees WHERE last_name = 'Johnson';
-- Uses index: SEARCH using INDEX

-- Poor use (SELECT *):
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE last_name =  'Johnson';
-- May still scan table to get all columns

-- 5. Optimize a slow query
-- Create beneficial indexes:
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_products_category ON products(category);

-- Now the query should be much faster
EXPLAIN QUERY PLAN
SELECT * FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
AND p.category = 'Electronics';

-- 6. Composite index vs multiple single indexes
-- Test query:
EXPLAIN QUERY PLAN
SELECT * FROM employees 
WHERE dept_id = 1 AND salary > 100000;

-- With composite index (dept_id, salary):
-- Can use index for both conditions efficiently

-- With separate indexes:
-- Database might only use one index

-- =====================================
-- Part 2: Transactions
-- =====================================

-- 7. Simple transaction
BEGIN TRANSACTION;

INSERT INTO employees (first_name, last_name, email, hire_date, dept_id, salary)
VALUES ('New', 'Employee', 'new.emp@company.com', DATE('now'), 1, 75000);

INSERT INTO project_assignments (project_id, emp_id, role, hours_allocated)
VALUES (1, last_insert_rowid(), 'Developer', 500);

COMMIT;

-- Verify
SELECT * FROM employees WHERE email = 'new.emp@company.com';

-- 8. Rollback practice
BEGIN TRANSACTION;

-- Save original count
SELECT COUNT(*) FROM employees WHERE dept_id = 3;

-- Delete
DELETE FROM employees WHERE dept_id = 3;

-- Check (should be 0)
SELECT COUNT(*) FROM employees WHERE dept_id = 3;

-- Undo!
ROLLBACK;

-- Verify employees are back
SELECT COUNT(*) FROM employees WHERE dept_id = 3;

-- 9. Bank transfer simulation
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY,
    customer_name TEXT,
    balance DECIMAL(10, 2)
);

INSERT INTO accounts VALUES 
    (1, 'Alice', 1000.00),
    (2, 'Bob', 500.00);

-- Transfer $500 from Alice to Bob
BEGIN TRANSACTION;

-- Debit account 1
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 1 AND balance >= 500;

-- Check if debit succeeded
-- In real code, check affected rows
SELECT balance FROM accounts WHERE account_id = 1;

-- Credit account 2
UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 2;

-- Verify totals match
SELECT SUM(balance) FROM accounts;

COMMIT;

-- Verify final balances
SELECT * FROM accounts;

-- 12. Using savepoints
BEGIN TRANSACTION;

-- Insert new employee
INSERT INTO employees (first_name, last_name, email, hire_date, dept_id, salary)
VALUES ('Test', 'User', 'test.user@company.com', DATE('now'), 1, 80000);

SAVEPOINT after_employee_insert;

-- Give everyone a 10% raise (oops, mistake!)
UPDATE employees SET salary = salary * 1.10;

-- Check the damage
SELECT first_name, salary FROM employees ORDER BY emp_id DESC LIMIT 5;

-- Undo the raises but keep the new employee
ROLLBACK TO SAVEPOINT after_employee_insert;

-- Verify: new employee exists, but no raises
SELECT * FROM employees WHERE email = 'test.user@company.com';

COMMIT;

-- =====================================
-- Part 3: Views
-- =====================================

-- 13. Simple view
CREATE VIEW employee_departments AS
SELECT 
    e.emp_id,
    e.first_name || ' ' || e.last_name AS employee_name,
    e.email,
    d.dept_name,
    d.location
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- Query the view
SELECT * FROM employee_departments WHERE dept_name = 'Engineering';

-- Try to update (may not work in SQLite for complex views)
-- UPDATE employee_departments SET email = 'new@email.com' WHERE emp_id = 1;

-- 14. Aggregated view
CREATE VIEW department_statistics AS
SELECT 
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    ROUND(SUM(e.salary), 2) AS total_salary_cost,
    d.budget,
    ROUND((SUM(e.salary) / d.budget) * 100, 2) AS budget_utilization_pct
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name, d.budget;

-- Use the view
SELECT * FROM department_statistics ORDER BY total_salary_cost DESC;

SELECT * FROM department_statistics WHERE budget_utilization_pct > 100;

-- 15. Complex view
CREATE VIEW employee_project_summary AS
SELECT 
    e.emp_id,
    e.first_name || ' ' || e.last_name AS employee_name,
    e.email,
    d.dept_name,
    m.first_name || ' ' || m.last_name AS manager_name,
    COUNT(pa.project_id) AS project_count,
    SUM(pa.hours_allocated) AS total_hours_allocated,
    GROUP_CONCAT(p.project_name, ', ') AS projects
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
LEFT JOIN employees m ON e.manager_id = m.emp_id
LEFT JOIN project_assignments pa ON e.emp_id = pa.emp_id
LEFT JOIN projects p ON pa.project_id = p.project_id
GROUP BY e.emp_id, e.first_name, e.last_name, e.email, d.dept_name, m.first_name, m.last_name;

-- Query the view
SELECT * FROM employee_project_summary WHERE project_count > 1;

-- Drop views when done
-- DROP VIEW employee_departments;
-- DROP VIEW department_statistics;
-- DROP VIEW employee_project_summary;

-- =====================================
-- Part 4: Performance Optimization
-- =====================================

-- 18. Avoid SELECT *
-- Instead of:
-- SELECT * FROM employees WHERE dept_id = 1;

-- Use:
SELECT emp_id, first_name, last_name, salary FROM employees WHERE dept_id = 1;

-- 19. Limit early (with subquery)
-- Less efficient (joins everything first):
SELECT * FROM (
    SELECT e.*, d.dept_name, p.project_name
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id
    JOIN project_assignments pa ON e.emp_id = pa.emp_id
    JOIN projects p ON pa.project_id = p.project_id
) LIMIT 10;

-- More efficient (limits early):
SELECT e.*, d.dept_name, p.project_name
FROM (SELECT * FROM employees LIMIT 10) e
JOIN departments d ON e.dept_id = d.dept_id
LEFT JOIN project_assignments pa ON e.emp_id = pa.emp_id
LEFT JOIN projects p ON pa.project_id = p.project_id;

-- 20. EXISTS vs IN
-- Using IN:
EXPLAIN QUERY PLAN
SELECT * FROM employees 
WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'New York');

-- Using EXISTS:
EXPLAIN QUERY PLAN
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM departments d 
    WHERE d.dept_id = e.dept_id AND d.location = 'New York'
);

-- EXISTS is often faster for large datasets

-- 22. Don't use functions in WHERE
-- Slow (can't use index on last_name):
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE UPPER(last_name) = 'SMITH';

-- Fast (can use index):
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE last_name = 'Smith';

-- If you must use UPPER, create a functional index:
-- CREATE INDEX idx_employees_upper_last ON employees(UPPER(last_name));

-- 23. OR conditions
-- May not use indexes well:
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE dept_id = 1 OR dept_id = 2;

-- Better (can use index):
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE dept_id IN (1, 2);

-- Or use UNION (sometimes faster):
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE dept_id = 1
UNION
SELECT * FROM employees WHERE dept_id = 2;

-- =====================================
-- Part 5: Advanced Features (works better in PostgreSQL)
-- =====================================

-- 25. ROW_NUMBER (PostgreSQL/SQLite 3.25+)
SELECT 
    emp_id,
    first_name || ' ' || last_name AS name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as company_rank
FROM employees;

-- 26. PARTITION BY (PostgreSQL/SQLite 3.25+)
SELECT 
    d.dept_name,
    e.first_name || ' ' || e.last_name AS name,
    e.salary,
    ROW_NUMBER() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) as dept_rank
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- 27. Running totals (PostgreSQL/SQLite 3.25+)
SELECT 
    hire_date,
    first_name || ' ' || last_name AS name,
    salary,
    SUM(salary) OVER (ORDER BY hire_date) as cumulative_salary_cost
FROM employees
ORDER BY hire_date;

-- 28. Basic CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT 
    he.first_name || ' ' || he.last_name AS name,
    he.salary,
    d.dept_name
FROM high_earners he
JOIN departments d ON he.dept_id = d.dept_id;

-- 29. Multiple CTEs
WITH 
dept_avg AS (
    SELECT 
        dept_id, 
        AVG(salary) as avg_salary 
    FROM employees 
    GROUP BY dept_id
),
recent_hires AS (
    SELECT * 
    FROM employees 
    WHERE hire_date >= DATE('now', '-1 year')
)
SELECT 
    rh.first_name || ' ' || rh.last_name AS name,
    rh.salary,
    da.avg_salary,
    ROUND(rh.salary - da.avg_salary, 2) AS diff_from_avg
FROM recent_hires rh
JOIN dept_avg da ON rh.dept_id = da.dept_id
WHERE rh.salary > da.avg_salary;

-- 30. Recursive CTE (employee hierarchy)
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT 
        emp_id,
        first_name || ' ' || last_name AS name,
        manager_id,
        1 AS level,
        first_name || ' ' || last_name AS reporting_chain
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees reporting to previous level
    SELECT 
        e.emp_id,
        e.first_name || ' ' || e.last_name,
        e.manager_id,
        eh.level + 1,
        eh.reporting_chain || ' → ' || e.first_name || ' ' || e.last_name
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.emp_id
)
SELECT 
    level,
    name,
    reporting_chain
FROM employee_hierarchy
ORDER BY level, name;

-- =====================================
-- Utility Queries
-- =====================================

-- List all indexes
SELECT name, tbl_name, sql 
FROM sqlite_master 
WHERE type = 'index' AND name NOT LIKE 'sqlite_%'
ORDER BY tbl_name, name;

-- List all views
SELECT name, sql 
FROM sqlite_master 
WHERE type = 'view'
ORDER BY name;

-- Drop all indexes on a table (be careful!)
-- SELECT 'DROP INDEX ' || name || ';' 
-- FROM sqlite_master 
-- WHERE type = 'index' AND tbl_name = 'employees' AND name NOT LIKE 'sqlite_%';

-- Analyze database (updates statistics for query optimizer)
ANALYZE;

-- Check database integrity
PRAGMA integrity_check;

-- Vacuum database (reclaim space)
-- VACUUM;
