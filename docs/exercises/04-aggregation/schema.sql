-- Database: Sales Analytics
-- Practice GROUP BY, aggregate functions, and HAVING

CREATE TABLE IF NOT EXISTS regions (
    region_id INTEGER PRIMARY KEY AUTOINCREMENT,
    region_name TEXT NOT NULL UNIQUE,
    country TEXT
);

CREATE TABLE IF NOT EXISTS salespeople (
    salesperson_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    region_id INTEGER,
    hire_date DATE,
    FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_name TEXT,
    city TEXT,
    country TEXT,
    region_id INTEGER,
    FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT,
    unit_price DECIMAL(10, 2),
    cost DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    salesperson_id INTEGER,
    order_date DATE NOT NULL,
    shipped_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (salesperson_id) REFERENCES salespeople(salesperson_id)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample data
INSERT INTO regions (region_name, country) VALUES
    ('Northeast', 'USA'),
    ('Southeast', 'USA'),
    ('Midwest', 'USA'),
    ('West', 'USA'),
    ('Canada', 'Canada'),
    ('Europe', 'Multi');

INSERT INTO salespeople (first_name, last_name, email, region_id, hire_date) VALUES
    ('John', 'Smith', 'john.smith@company.com', 1, '2020-01-15'),
    ('Sarah', 'Johnson', 'sarah.j@company.com', 1, '2021-03-20'),
    ('Mike', 'Williams', 'mike.w@company.com', 2, '2019-06-10'),
    ('Emily', 'Brown', 'emily.b@company.com', 3, '2022-01-05'),
    ('David', 'Jones', 'david.j@company.com', 4, '2020-08-15'),
    ('Lisa', 'Garcia', 'lisa.g@company.com', 4, '2021-11-01');

INSERT INTO customers (company_name, contact_name, city, country, region_id) VALUES
    ('Acme Corp', 'Bob Anderson', 'New York', 'USA', 1),
    ('TechStart Inc', 'Alice Wilson', 'Boston', 'USA', 1),
    ('Global Solutions', 'Charlie Davis', 'Miami', 'USA', 2),
    ('Innovation Labs', 'Diana Martinez', 'Atlanta', 'USA', 2),
    ('Midwest Manufacturing', 'Eve Taylor', 'Chicago', 'USA', 3),
    ('Prairie Tech', 'Frank Thomas', 'Minneapolis', 'USA', 3),
    ('Pacific Traders', 'Grace Lee', 'Los Angeles', 'USA', 4),
    ('Bay Area Ventures', 'Henry Kim', 'San Francisco', 'USA', 4),
    ('Mountain Enterprises', 'Ivy Chen', 'Denver', 'USA', 4),
    ('Maple Leaf Co', 'Jack Brown', 'Toronto', 'Canada', 5);

INSERT INTO products (product_name, category, unit_price, cost) VALUES
    ('Laptop Pro', 'Electronics', 1299.99, 800.00),
    ('Desktop Workstation', 'Electronics', 1899.99, 1200.00),
    ('Wireless Mouse', 'Accessories', 29.99, 12.00),
    ('Keyboard Mechanical', 'Accessories', 89.99, 45.00),
    ('Monitor 27in', 'Electronics', 349.99, 200.00),
    ('Desk Chair Pro', 'Furniture', 399.99, 180.00),
    ('Standing Desk', 'Furniture', 599.99, 300.00),
    ('Office Suite License', 'Software', 249.99, 50.00),
    ('Antivirus Pro', 'Software', 79.99, 20.00),
    ('Cloud Storage 1TB', 'Software', 99.99, 30.00);

INSERT INTO orders (customer_id, salesperson_id, order_date, shipped_date, total_amount) VALUES
    -- Q1 2024
    (1, 1, '2024-01-15', '2024-01-17', 2649.97),
    (2, 1, '2024-01-20', '2024-01-22', 1899.99),
    (3, 3, '2024-02-01', '2024-02-03', 949.98),
    (4, 3, '2024-02-15', '2024-02-17', 1749.98),
    (5, 4, '2024-03-01', '2024-03-03', 599.99),
    (6, 4, '2024-03-10', '2024-03-12', 2099.97),
    (7, 5, '2024-03-15', '2024-03-17', 1679.96),
    (8, 5, '2024-03-20', NULL, 1299.99),
    -- Q2 2024
    (1, 1, '2024-04-05', '2024-04-07', 799.98),
    (3, 3, '2024-04-20', '2024-04-22', 349.99),
    (5, 4, '2024-05-01', '2024-05-03', 1549.97),
    (7, 5, '2024-05-15', '2024-05-17', 999.97),
    (9, 6, '2024-06-01', '2024-06-03', 2499.96),
    (10, 1, '2024-06-15', '2024-06-17', 1899.99);

INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount) VALUES
    -- Order 1
    (1, 1, 2, 1299.99, 0.05),
    (1, 3, 2, 29.99, 0),
    -- Order 2
    (2, 2, 1, 1899.99, 0),
    -- Order 3
    (3, 5, 2, 349.99, 0.10),
    (3, 3, 5, 29.99, 0),
    -- Order 4
    (4, 6, 2, 399.99, 0),
    (4, 7, 1, 599.99, 0.15),
    -- Order 5
    (5, 7, 1, 599.99, 0),
    -- Order 6
    (6, 1, 1, 1299.99, 0),
    (6, 5, 2, 349.99, 0.05),
    (6, 3, 3, 29.99, 0),
    -- Order 7
    (7, 8, 3, 249.99, 0.10),
    (7, 9, 5, 79.99, 0),
    (7, 10, 5, 99.99, 0),
    -- Order 8
    (8, 1, 1, 1299.99, 0),
    -- Order 9
    (9, 5, 2, 349.99, 0.05),
    (9, 4, 1, 89.99, 0),
    -- Order 10
    (10, 5, 1, 349.99, 0),
    -- Order 11
    (11, 1, 1, 1299.99, 0),
    (11, 3, 5, 29.99, 0.10),
    (11, 4, 2, 89.99, 0),
    -- Order 12
    (12, 8, 4, 249.99, 0),
    -- Order 13  
    (13, 2, 1, 1899.99, 0.05),
    (13, 5, 1, 349.99, 0),
    (13, 3, 5, 29.99, 0.10),
    -- Order 14
    (14, 2, 1, 1899.99, 0);
