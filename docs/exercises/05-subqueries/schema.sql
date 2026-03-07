-- Database: HR Management (for subqueries practice)
-- Reuse some tables from previous exercises with HR focus

CREATE TABLE IF NOT EXISTS departments (
    dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL UNIQUE,
    location TEXT,
    budget DECIMAL(12, 2)
);

CREATE TABLE IF NOT EXISTS employees (
    emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    hire_date DATE NOT NULL,
    dept_id INTEGER,
    manager_id INTEGER,
    salary DECIMAL(10, 2) NOT NULL,
    commission_pct DECIMAL(3, 2),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

CREATE TABLE IF NOT EXISTS projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL,
    dept_id INTEGER,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12, 2),
    status TEXT CHECK(status IN ('Planning', 'Active', 'Completed', 'On Hold')),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE IF NOT EXISTS project_assignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    emp_id INTEGER NOT NULL,
    role TEXT,
    hours_allocated INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

CREATE TABLE IF NOT EXISTS salary_history (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id INTEGER NOT NULL,
    effective_date DATE NOT NULL,
    old_salary DECIMAL(10, 2),
    new_salary DECIMAL(10, 2),
    reason TEXT,
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

-- Sample data
INSERT INTO departments (dept_name, location, budget) VALUES
    ('Engineering', 'San Francisco', 2000000),
    ('Sales', 'New York', 1500000),
    ('Marketing', 'Los Angeles', 800000),
    ('HR', 'Chicago', 500000),
    ('Finance', 'New York', 600000),
    ('Operations', 'Seattle', 900000);

INSERT INTO employees (first_name, last_name, email, hire_date, dept_id, manager_id, salary, commission_pct) VALUES
    -- Engineering
    ('John', 'Smith', 'john.smith@company.com', '2018-01-15', 1, NULL, 150000, NULL),
    ('Alice', 'Johnson', 'alice.j@company.com', '2019-03-20', 1, 1, 120000, NULL),
    ('Bob', 'Williams', 'bob.w@company.com', '2020-06-10', 1, 1, 110000, NULL),
    ('Carol', 'Brown', 'carol.b@company.com', '2021-02-15', 1, 1, 95000, NULL),
    -- Sales
    ('David', 'Jones', 'david.j@company.com', '2017-05-01', 2, NULL, 130000, 0.10),
    ('Emma', 'Garcia', 'emma.g@company.com', '2019-08-15', 2, 5, 90000, 0.10),
    ('Frank', 'Martinez', 'frank.m@company.com', '2020-01-10', 2, 5, 85000, 0.10),
    ('Grace', 'Davis', 'grace.d@company.com', '2021-11-01', 2, 5, 75000, 0.10),
    -- Marketing
    ('Henry', 'Rodriguez', 'henry.r@company.com', '2018-09-20', 3, NULL, 115000, NULL),
    ('Ivy', 'Wilson', 'ivy.w@company.com', '2020-04-15', 3, 9, 88000, NULL),
    ('Jack', 'Anderson', 'jack.a@company.com', '2021-07-01', 3, 9, 75000, NULL),
    -- HR
    ('Kelly', 'Thomas', 'kelly.t@company.com', '2017-03-10', 4, NULL, 105000, NULL),
    ('Leo', 'Taylor', 'leo.t@company.com', '2019-12-01', 4, 12, 78000, NULL),
    -- Finance  
    ('Maria', 'Moore', 'maria.m@company.com', '2016-11-15', 5, NULL, 140000, NULL),
    ('Nathan', 'Jackson', 'nathan.j@company.com', '2020-02-20', 5, 14, 92000, NULL),
    ('Olivia', 'White', 'olivia.w@company.com', '2021-09-10', 5, 14, 82000, NULL),
    -- Operations
    ('Paul', 'Harris', 'paul.h@company.com', '2018-07-15', 6, NULL, 110000, NULL),
    ('Quinn', 'Martin', 'quinn.m@company.com', '2020-05-20', 6, 17, 85000, NULL);

INSERT INTO projects (project_name, dept_id, start_date, end_date, budget, status) VALUES
    ('Mobile App Redesign', 1, '2023-01-15', '2024-06-30', 500000, 'Active'),
    ('Cloud Migration', 1, '2023-06-01', '2024-12-31', 800000, 'Active'),
    ('Q1 Sales Campaign', 2, '2024-01-01', '2024-03-31', 200000, 'Completed'),
    ('Brand Refresh', 3, '2023-09-01', '2024-08-31', 300000, 'Active'),
    ('HR Portal', 4, '2024-02-01', '2024-09-30', 150000, 'Active'),
    ('ERP Implementation', 5, '2023-03-01', NULL, 600000, 'On Hold'),
    ('Supply Chain Optimization', 6, '2023-11-01', '2024-10-31', 400000, 'Active');

INSERT INTO project_assignments (project_id, emp_id, role, hours_allocated) VALUES
    (1, 2, 'Lead Developer', 800),
    (1, 3, 'Developer', 600),
    (1, 4, 'Developer', 500),
    (2, 1, 'Project Manager', 400),
    (2, 2, 'Tech Lead', 600),
    (2, 3, 'Developer', 800),
    (3, 6, 'Lead', 300),
    (3, 7, 'Sales Rep', 200),
    (3, 8, 'Sales Rep', 200),
    (4, 9, 'Creative Director', 600),
    (4, 10, 'Designer', 400),
    (4, 11, 'Content Writer', 300),
    (5, 12, 'Project Manager', 300),
    (5, 13, 'Analyst', 400),
    (6, 14, 'Project Manager', 500),
    (6, 15, 'Analyst', 600),
    (7, 17, 'Operations Lead', 700),
    (7, 18, 'Coordinator', 500);

INSERT INTO salary_history (emp_id, effective_date, old_salary, new_salary, reason) VALUES
    (2, '2023-01-01', 105000, 120000, 'Annual Review'),
    (3, '2023-06-15', 95000, 110000, 'Promotion'),
    (6, '2023-01-01', 82000, 90000, 'Annual Review'),
    (10, '2023-07-01', 78000, 88000, 'Performance Bonus'),
    (15, '2023-01-01', 75000, 92000, 'Promotion');
