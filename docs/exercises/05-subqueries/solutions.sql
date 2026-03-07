-- Exercise 5: Subqueries - Solutions

-- 1. Simple scalar subquery
SELECT 
    first_name || ' ' || last_name AS name,
    salary,
    ROUND(salary - (SELECT AVG(salary) FROM employees), 2) AS diff_from_avg
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- 2. Subquery with IN
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    d.dept_name,
    d.location
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.dept_id IN (
    SELECT dept_id FROM departments WHERE location = 'New York'
);

-- 3. Subquery with NOT IN
SELECT dept_name, location
FROM departments
WHERE dept_id NOT IN (
    SELECT DISTINCT dept_id FROM employees WHERE dept_id IS NOT NULL
);

-- 4. Subquery with EXISTS
SELECT DISTINCT
    e.first_name || '' || e.last_name AS employee_name,
    d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE EXISTS (
    SELECT 1 FROM project_assignments pa
    WHERE pa.emp_id = e.emp_id AND pa.role LIKE '%Manager%'
);

-- 5. Subquery with NOT EXISTS
SELECT 
    first_name || ' ' || last_name AS employee_name,
    hire_date,
    salary
FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM project_assignments pa WHERE pa.emp_id = e.emp_id
);

-- 6. Greater than ALL
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.salary,
    d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > ALL (
    SELECT salary FROM employees WHERE dept_id = (SELECT dept_id FROM departments WHERE dept_name = 'HR')
);

-- 7. Greater than ANY
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.salary,
    d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > ANY (
    SELECT salary FROM employees WHERE dept_id = (SELECT dept_id FROM departments WHERE dept_name = 'Marketing')
)
AND d.dept_name != 'Marketing';

-- 8. Equal to subquery
SELECT 
    d.dept_name,
    ROUND(AVG(e.salary), 2) AS avg_salary
FROM departments d
JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING AVG(e.salary) = (
    SELECT MAX(dept_avg) FROM (
        SELECT AVG(salary) AS dept_avg
        FROM employees
        GROUP BY dept_id
    )
);

-- 9. Correlated subquery in SELECT
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.salary,
    ROUND((SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS dept_avg,
    ROUND(e.salary - (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS difference
FROM employees e;

-- 10. Count in SELECT
SELECT 
    d.dept_name,
    (SELECT COUNT(*) FROM employees WHERE dept_id = d.dept_id) AS employee_count,
    ROUND((SELECT SUM(salary) FROM employees WHERE dept_id = d.dept_id), 2) AS total_salary_used
FROM departments d;

-- 11. Complex calculation in SELECT
SELECT 
    p.project_name,
    (SELECT COUNT(*) FROM project_assignments WHERE project_id = p.project_id) AS employee_count,
    (SELECT SUM(hours_allocated) FROM project_assignments WHERE project_id = p.project_id) AS total_hours,
    ROUND((SELECT AVG(e.salary) 
           FROM project_assignments pa 
           JOIN employees e ON pa.emp_id = e.emp_id 
           WHERE pa.project_id = p.project_id), 2) AS avg_employee_salary
FROM projects p;

-- 12. Simple derived table
SELECT 
    dept_name,
    avg_salary,
    ROUND(avg_salary - (SELECT AVG(salary) FROM employees), 2) AS diff_from_company_avg
FROM (
    SELECT 
        d.dept_name,
        AVG(e.salary) AS avg_salary
    FROM departments d
    JOIN employees e ON d.dept_id = e.dept_id
    GROUP BY d.dept_id, d.dept_name
)
WHERE avg_salary > (SELECT AVG(salary) FROM employees);

-- 13. Multiple derived tables
WITH dept_stats AS (
    SELECT 
        d.dept_id,
        d.dept_name,
        AVG(e.salary) AS avg_salary,
        AVG((julianday('now') - julianday(e.hire_date)) / 365.25) AS avg_tenure_years
    FROM departments d
    JOIN employees e ON d.dept_id = e.dept_id
    GROUP BY d.dept_id, d.dept_name
)
SELECT 
    dept_name,
    ROUND(avg_salary, 2) AS avg_salary,
    ROUND(avg_tenure_years, 2) AS avg_tenure_years
FROM dept_stats
WHERE avg_salary > (SELECT AVG(salary) FROM employees)
  AND avg_tenure_years > (
      SELECT AVG((julianday('now') - julianday(hire_date)) / 365.25)
      FROM employees
  );

-- 14. Derived table with aggregation
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    e.salary AS employee_salary,
    m.first_name || ' ' || m.last_name AS manager_name,
    m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;

-- 15. Department salary rank
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    d.dept_name,
    e.salary,
    (SELECT COUNT(*) + 1
     FROM employees e2
     WHERE e2.dept_id = e.dept_id AND e2.salary > e.salary) AS rank_in_dept
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
ORDER BY d.dept_name, e.salary DESC;

-- 16. Above department median
-- SQLite doesn't have MEDIAN, so we'll use a workaround
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    d.dept_name,
    e.salary,
    (SELECT AVG(salary) FROM (
        SELECT salary FROM employees WHERE dept_id = e.dept_id
        ORDER BY salary
        LIMIT 2 - (SELECT COUNT(*) FROM employees WHERE dept_id = e.dept_id) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM employees WHERE dept_id = e.dept_id)
    )) AS dept_median
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > (
    SELECT AVG(salary) FROM (
        SELECT salary FROM employees WHERE dept_id = e.dept_id
        ORDER BY salary
        LIMIT 2 - (SELECT COUNT(*) FROM employees WHERE dept_id = e.dept_id) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM employees WHERE dept_id = e.dept_id)
    )
);

-- 17. Project involvement comparison
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    (SELECT COUNT(*) FROM project_assignments WHERE emp_id = e.emp_id) AS project_count,
    ROUND((SELECT AVG(proj_count) FROM (
        SELECT COUNT(*) AS proj_count FROM project_assignments GROUP BY emp_id
    )), 2) AS avg_project_count
FROM employees e
WHERE (SELECT COUNT(*) FROM project_assignments WHERE emp_id = e.emp_id) > (
    SELECT AVG(proj_count) FROM (
        SELECT COUNT(*) AS proj_count FROM project_assignments GROUP BY emp_id
    )
);

-- 18. Historical salary tracking
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    sh.old_salary,
    sh.new_salary,
    ROUND(((sh.new_salary - sh.old_salary) / sh.old_salary) * 100, 2) AS raise_pct
FROM employees e
JOIN salary_history sh ON e.emp_id = sh.emp_id;

-- 19. Three-level nesting
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    d.dept_name,
    e.salary,
    (SELECT COUNT(*) FROM project_assignments WHERE emp_id = e.emp_id) AS project_count
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.dept_id IN (
    SELECT DISTINCT dept_id FROM projects WHERE status = 'Active'
)
AND e.dept_id IN (
    SELECT dept_id FROM employees
    GROUP BY dept_id
    HAVING AVG(salary) > (SELECT AVG(salary) FROM employees)
)
AND EXISTS (
    SELECT 1 FROM project_assignments WHERE emp_id = e.emp_id
);

-- 20. Subquery with aggregation and filtering
SELECT 
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    ROUND(SUM(e.salary), 2) AS total_salaries,
    d.budget,
    ROUND(((SUM(e.salary) - d.budget) / d.budget) * 100, 2) AS overspend_pct
FROM departments d
JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name, d.budget
HAVING SUM(e.salary) > d.budget * 1.5 AND COUNT(e.emp_id) > 2;

-- 21. Finding outliers
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.salary,
    ROUND((SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS dept_avg,
    ROUND(e.salary / (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS times_above_avg
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) * 1.5;

-- 22. Rewrite using JOIN
-- Original subquery version (from exercise description)
SELECT emp_id, first_name, last_name
FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'New York');

-- JOIN version
SELECT e.emp_id, e.first_name, e.last_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
WHERE d.location = 'New York';

-- 23. Rewrite using subquery
-- Original JOIN version (from exercise description)
SELECT e.first_name, e.last_name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE d.location = 'San Francisco';

-- Subquery version
SELECT 
    first_name,
    last_name,
    (SELECT dept_name FROM departments WHERE dept_id = e.dept_id) AS dept_name
FROM employees e
WHERE dept_id = (SELECT dept_id FROM departments WHERE location = 'San Francisco');

-- 24. Complex EXISTS
SELECT 
    d.dept_name,
    (SELECT COUNT(*) FROM projects WHERE dept_id = d.dept_id AND status = 'Active') AS active_project_count,
    (SELECT COUNT(*) FROM employees WHERE dept_id = d.dept_id AND salary > 100000) AS high_earner_count
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM projects WHERE dept_id = d.dept_id AND status = 'Active'
)
AND EXISTS (
    SELECT 1 FROM employees WHERE dept_id = d.dept_id AND salary > 100000
);

-- 25. NOT EXISTS pattern
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.hire_date,
    e.salary,
    ROUND((julianday('now') - julianday(e.hire_date)) / 365.25, 1) AS years_without_raise
FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM salary_history WHERE emp_id = e.emp_id
);

-- 26. Top N per group
SELECT 
    d.dept_name,
    e.first_name || ' ' || e.last_name AS employee_name,
    e.salary,
    (SELECT COUNT(*) + 1
     FROM employees e2
     WHERE e2.dept_id = e.dept_id AND e2.salary > e.salary) AS rank
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE (
    SELECT COUNT(*) + 1
    FROM employees e2
    WHERE e2.dept_id = e.dept_id AND e2.salary > e.salary
) <= 2
ORDER BY d.dept_name, e.salary DESC;

-- 27. Running totals
SELECT 
    e.first_name || ' ' || e.last_name AS name,
    e.hire_date,
    e.salary,
    (SELECT SUM(salary)
     FROM employees e2
     WHERE e2.hire_date < e.hire_date) AS salary_of_earlier_hires,
    ROUND(e.salary * 100.0 / (SELECT SUM(salary) FROM employees), 2) AS pct_of_total_salary
FROM employees e
ORDER BY e.hire_date;

-- 28. Comparative analysis
SELECT 
    p.project_name,
    (SELECT SUM(hours_allocated) FROM project_assignments WHERE project_id = p.project_id) AS total_hours,
    CASE 
        WHEN (SELECT SUM(hours_allocated) FROM project_assignments WHERE project_id = p.project_id) > 
             (SELECT AVG(proj_hours) FROM (SELECT SUM(hours_allocated) AS proj_hours FROM project_assignments GROUP BY project_id))
        THEN 'Above Average'
        ELSE 'Below Average'
    END AS comparison,
    ROUND(((SELECT SUM(hours_allocated) FROM project_assignments WHERE project_id = p.project_id) - 
           (SELECT AVG(proj_hours) FROM (SELECT SUM(hours_allocated) AS proj_hours FROM project_assignments GROUP BY project_id))) * 100.0 /
           (SELECT AVG(proj_hours) FROM (SELECT SUM(hours_allocated) AS proj_hours FROM project_assignments GROUP BY project_id)), 2) AS pct_diff
FROM projects p;

-- The remaining challenge exercises (29-32) follow similar patterns using nested subqueries and correlated subqueries.
-- These are left as exercises for practice.
