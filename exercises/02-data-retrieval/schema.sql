-- Database: E-Commerce Store
-- Practice filtering, sorting, and limiting data

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category_id INTEGER,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 10,
    discontinued BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    country TEXT
);

CREATE TABLE IF NOT EXISTS product_suppliers (
    product_id INTEGER,
    supplier_id INTEGER,
    supply_price DECIMAL(10, 2),
    PRIMARY KEY (product_id, supplier_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- Sample data
INSERT INTO categories (category_name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Furniture', 'Office and home furniture'),
    ('Stationery', 'Office supplies and paper products'),
    ('Appliances', 'Home and kitchen appliances'),
    ('Books', 'Physical and digital books'),
    ('Clothing', 'Apparel and accessories');

INSERT INTO products (product_name, category_id, description, price, cost, stock_quantity, reorder_level, discontinued) VALUES
    ('Laptop Pro 15', 1, '15-inch professional laptop', 1299.99, 950.00, 25, 5, 0),
    ('Wireless Mouse', 1, 'Ergonomic wireless mouse', 29.99, 15.00, 150, 20, 0),
    ('USB-C Hub', 1, '7-in-1 USB-C adapter', 49.99, 25.00, 80, 15, 0),
    ('Desk Chair Executive', 2, 'Leather executive chair', 399.99, 200.00, 15, 5, 0),
    ('Standing Desk', 2, 'Electric height-adjustable desk', 599.99, 350.00, 8, 3, 0),
    ('Desk Lamp LED', 2, 'Adjustable LED desk lamp', 45.99, 20.00, 50, 10, 0),
    ('Notebook A4', 3, 'Ruled notebook 200 pages', 4.99, 2.00, 500, 100, 0),
    ('Ballpoint Pens 10pk', 3, 'Pack of 10 black pens', 7.99, 3.50, 200, 50, 0),
    ('Printer Paper A4', 3, '500 sheets premium paper', 12.99, 6.00, 100, 25, 0),
    ('Coffee Maker', 4, '12-cup programmable coffee maker', 79.99, 45.00, 30, 8, 0),
    ('Blender Pro', 4, 'High-speed professional blender', 149.99, 80.00, 20, 5, 0),
    ('Air Fryer', 4, '5-quart digital air fryer', 89.99, 50.00, 35, 10, 0),
    ('SQL Mastery Book', 5, 'Complete guide to SQL', 39.99, 15.00, 45, 10, 0),
    ('Python Programming', 5, 'Learn Python from scratch', 44.99, 18.00, 60, 12, 0),
    ('T-Shirt Cotton', 6, 'Comfortable cotton t-shirt', 19.99, 8.00, 200, 30, 0),
    ('Jeans Classic', 6, 'Classic fit denim jeans', 59.99, 25.00, 75, 15, 0),
    ('Vintage Typewriter', 1, 'Collectible vintage typewriter', 299.99, 150.00, 2, 1, 1),
    ('Cassette Player', 1, 'Retro cassette player', 79.99, 40.00, 0, 2, 1);

INSERT INTO suppliers (supplier_name, contact_name, email, phone, country) VALUES
    ('TechGlobal Inc', 'John Smith', 'john@techglobal.com', '+1-555-0100', 'USA'),
    ('FurnitureDirect', 'Sarah Johnson', 'sarah@furnidirect.com', '+1-555-0200', 'USA'),
    ('Office Supplies Co', 'Mike Brown', 'mike@officesup.com', '+44-20-5550300', 'UK'),
    ('HomeGoods Ltd', 'Emma Wilson', 'emma@homegoods.com', '+1-555-0400', 'Canada'),
    ('BookWorld', 'David Lee', 'david@bookworld.com', '+1-555-0500', 'USA'),
    ('Fashion Hub', 'Lisa Chen', 'lisa@fashionhub.com', '+86-10-55506000', 'China');

INSERT INTO product_suppliers (product_id, supplier_id, supply_price) VALUES
    (1, 1, 950.00),
    (2, 1, 15.00),
    (3, 1, 25.00),
    (4, 2, 200.00),
    (5, 2, 350.00),
    (6, 2, 20.00),
    (7, 3, 2.00),
    (8, 3, 3.50),
    (9, 3, 6.00),
    (10, 4, 45.00),
    (11, 4, 80.00),
    (12, 4, 50.00),
    (13, 5, 15.00),
    (14, 5, 18.00),
    (15, 6, 8.00),
    (16, 6, 25.00);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
