# Exercise 5: Subqueries and Nested Queries

Master the art of subqueries for complex data retrieval.

## Setup

```bash
sqlite3 hr.db < schema.sql
```

## Exercises

### Subqueries in WHERE Clause

1. **Simple scalar subquery**
   - Find employees earning more than the average salary
   - Show: name, salary, difference from average

2. **Subquery with IN**
   - Find employees working in departments located in 'New York'
   - Show: employee name, department name, location

3. **Subquery with NOT IN**
   - Find departments with no employees assigned
   - Show: department name, location

4. **Subquery with EXISTS**
   - Find employees who are project managers (have 'Manager' in project role)
   - Show: employee name, department

5. **Subquery with NOT EXISTS**
   - Find employees not assigned to any project
   - Show: employee name, hire date, salary

### Subqueries with Comparison Operators

6. **Greater than ALL**
   - Find employees earning more than all employees in the HR department
   - Show: name, salary, department

7. **Greater than ANY**
   - Find employees earning more than any employee in Marketing
   - But exclude Marketing employees themselves
   - Show: name, salary, department

8. **Equal to subquery**
   - Find the department with the highest average salary
   - Show: department name, average salary

### Subqueries in SELECT Clause

9. **Correlated subquery in SELECT**
   - For each employee, show their salary and their department's average salary
   - Calculate difference from department average
   - Show: name, salary, dept avg, difference

10. **Count in SELECT**
    - List all departments with count of employees in each
    - Show: department name, employee count, total salary budget used

11. **Complex calculation in SELECT**
    - For each project, show:
      - Project name
      - Number of assigned employees
      - Total hours allocated
      - Average salary of assigned employees

### Subqueries in FROM Clause (Derived Tables)

12. **Simple derived table**
    - Calculate average salary by department, then find departments above company average
    - Show: department, avg salary, difference from company avg

13. **Multiple derived tables**
    - Compare departments by:
      - Average salary
      - Average employee tenure (years since hire)
    - Show only departments where both metrics are above overall average

14. **Derived table with aggregation**
    - Find employees who earn more than their manager
    - Show: employee name, employee salary, manager name, manager salary

### Correlated Subqueries

15. **Department salary rank**
    - Rank employees within their department by salary
    - Show: employee name, department, salary, rank in dept

16. **Above department median**
    - Find employees earning more than the median in their department
    - Show: name, department, salary, department median

17. **Project involvement comparison**
    - Find employees assigned to more projects than average
    - Show: employee name, project count, average project count

18. **Historical salary tracking**
    - For employees with salary history, show their raise percentage
    - Show: name, old salary, new salary, raise %

### Complex Nested Subqueries

19. **Three-level nesting**
    - Find employees in departments where:
      - The department has active projects
      - The department's average salary > company average
      - The employee is assigned to at least one project
    - Show: employee name, department, salary, project count

20. **Subquery with aggregation and filtering**
    - Find departments where:
      - Total employee salaries exceed department budget by 50%+
      - Has more than 2 employees
    - Show: department, employee count, total salaries, budget, overspend %

21. **Finding outliers**
    - Find employees whose salary is more than 1.5x their department's average
    - Show: name, salary, dept avg, how many times above average

### Subqueries vs JOINs

22. **Rewrite using JOIN**
    - Take this subquery approach:

    ```sql
    SELECT emp_id, first_name, last_name
    FROM employees
    WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'New York');
    ```

    - Rewrite using JOIN. Compare performance and readability.

23. **Rewrite using subquery**
    - Take this JOIN approach:
    ```sql
    SELECT e.first_name, e.last_name, d.dept_name
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id
    WHERE d.location = 'San Francisco';
    ```

    - Rewrite using subquery. Which is more readable?

### Advanced EXISTS/NOT EXISTS

24. **Complex EXISTS**
    - Find departments that have:
      - At least one project in 'Active' status
      - AND at least one employee earning > $100k
    - Show: department name, active project count, high earner count

25. **NOT EXISTS pattern**
    - Find employees who have never received a salary increase
    - (not in salary_history table)
    - Show: name, hire date, current salary, years without raise

### Subqueries with Aggregation

26. **Top N per group**
    - Find the top 2 highest paid employees in each department
    - Show: department, employee name, salary, rank

27. **Running totals**
    - For each employee, calculate:
      - Their salary
      - Total salary of all employees hired before them
      - Their percentage of total company salary
    - Order by hire date

28. **Comparative analysis**
    - For each project, show:
      - Project name
      - Total hours allocated
      - Whether hours allocated is above or below average for all projects
      - Percentage difference from average

## Challenge Exercises

29. **Hierarchical query**
    - Show each manager with:
      - Manager name and salary
      - Number of direct reports
      - Total salary of direct reports
      - Average salary of direct reports
      - Highest paid direct report name and salary
    - Only managers with 2+ direct reports

30. **Gap analysis**
    - Find salary gaps in each department:
      - Department name
      - Min, max, and average salary
      - Largest gap between consecutive salaries (when ordered)
      - Identify which two employees have the largest gap

31. **Project resource analysis**
    - Find projects that have:
      - More than average number of employees assigned
      - Total allocated hours > 1000
      - At least one employee earning > $100k
      - Budget per allocated hour < $100
    - Show: project name, employee count, total hours, budget per hour

32. **Department comparison matrix**
    - Create a report showing for each department:
      - Department name
      - Employee count
      - How it compares to average dept size (above/below/equal)
      - Average salary
      - How it compares to company average (above/below/equal)
      - Total project budget
      - Budget per employee

## Tips

- Correlated subqueries run once per outer row (can be slow)
- Non-correlated subqueries run once (usually faster)
- Use EXISTS for checking existence, not counting
- IN works well for small result sets
- Consider whether a JOIN might be clearer
- Test subqueries independently before nesting

## Verification

```sql
-- Test subquery returns  what you expect
SELECT AVG(salary) FROM employees;  -- Test first
SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);  -- Then use

-- Verify EXISTS vs JOIN give same results
SELECT COUNT(*) FROM employees WHERE EXISTS (SELECT 1 FROM projects...);
SELECT COUNT(DISTINCT emp_id) FROM employees JOIN projects...;
```

---

See [solutions.sql](solutions.sql) for complete answers.
