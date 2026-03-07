-- Exercise 2: Data Retrieval - Solutions

-- 1. Unique categories
SELECT DISTINCT category_id FROM products;

-- 2. Count unique values
SELECT COUNT(DISTINCT category_id) AS unique_categories FROM products;
SELECT COUNT(DISTINCT country) AS unique_countries FROM suppliers;

-- 3. Exact match
SELECT * FROM products WHERE category_id = 1;

-- 4. Comparison operators
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE stock_quantity <= 20;
SELECT * FROM products WHERE category_id != 3;

-- 5. BETWEEN operator
SELECT * FROM products WHERE price BETWEEN 50 AND 150;
SELECT * FROM products WHERE stock_quantity BETWEEN 30 AND 100;

-- 6. AND operator
SELECT * FROM products WHERE category_id = 1 AND price < 50;
SELECT * FROM products WHERE price > 100 AND stock_quantity < 20;

-- 7. OR operator
SELECT * FROM products WHERE discontinued = 1 OR stock_quantity = 0;
SELECT * FROM products WHERE category_id IN (1, 2, 4);

-- 8. Complex conditions
SELECT * FROM products 
WHERE (category_id = 1 AND price < 100) 
   OR (category_id = 2 AND price > 500);

-- 9. Starts with
SELECT * FROM products WHERE product_name LIKE 'Desk%';

-- 10. Contains
SELECT * FROM products WHERE product_name LIKE '%Pro%';

-- 11. Ends with
SELECT * FROM products WHERE product_name LIKE '%er';

-- 12. Multiple patterns
SELECT * FROM products 
WHERE LOWER(product_name) LIKE '%book%' 
   OR LOWER(product_name) LIKE '%pen%';

-- 13. Find NULLs
SELECT * FROM products WHERE description IS NULL;

-- 14. Find NOT NULLs
SELECT * FROM products WHERE description IS NOT NULL;

-- 15. NULL in calculations
SELECT product_name, cost 
FROM products 
WHERE cost IS NULL;

-- 16. IN with values
SELECT * FROM products WHERE category_id IN (1, 3, 5);

-- 17. NOT IN
SELECT * FROM products WHERE category_id NOT IN (2, 4);

-- 18. IN with subquery
SELECT * FROM products 
WHERE product_id IN (
    SELECT ps.product_id 
    FROM product_suppliers ps
    JOIN suppliers s ON ps.supplier_id = s.supplier_id
    WHERE s.country = 'USA'
);

-- 19. Single column
SELECT * FROM products ORDER BY price ASC;
SELECT * FROM products ORDER BY price DESC;

-- 20. Multiple columns
SELECT * FROM products ORDER BY category_id ASC, price DESC;

-- 21. Order by expression
SELECT 
    product_name,
    price,
    cost,
    ROUND(price - cost, 2) AS margin
FROM products
WHERE cost IS NOT NULL
ORDER BY margin DESC;

-- 22. Order with NULL handling (simulated in SQLite)
SELECT * FROM products 
ORDER BY description IS NULL, description;

-- 23. Top N
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- 24. Pagination
SELECT * FROM products 
ORDER BY product_name 
LIMIT 10 OFFSET 10;

-- 25. Bottom N
SELECT * FROM products ORDER BY stock_quantity ASC LIMIT 3;

-- 26. Multiple filters and sorting
SELECT * FROM products
WHERE discontinued = 0
  AND price BETWEEN 20 AND 200
  AND stock_quantity > reorder_level
ORDER BY stock_quantity ASC
LIMIT 10;

-- 27. Search functionality
SELECT * FROM products
WHERE (product_name LIKE '%book%' OR description LIKE '%book%')
  AND price < 50
  AND discontinued = 0
ORDER BY price;

-- 28. Low stock alert
SELECT 
    product_name,
    stock_quantity AS current_stock,
    reorder_level,
    (reorder_level - stock_quantity) AS shortage
FROM products
WHERE stock_quantity <= reorder_level
  AND discontinued = 0
ORDER BY shortage DESC;

-- 29. Profit analysis
SELECT 
    product_name,
    price,
    cost,
    ROUND(((price - cost) / price) * 100, 2) AS profit_margin_pct
FROM products
WHERE cost IS NOT NULL
  AND ((price - cost) / price) * 100 > 50
ORDER BY profit_margin_pct DESC;

-- 30. Supplier analysis
SELECT DISTINCT s.*
FROM suppliers s
JOIN product_suppliers ps ON s.supplier_id = ps.supplier_id
JOIN products p ON ps.product_id = p.product_id
WHERE s.country IN ('USA', 'Canada')
  AND p.price > 100
ORDER BY s.country, s.supplier_name;

-- 31. Dynamic pricing
SELECT 
    product_name,
    price AS original_price,
    ROUND(price * 0.80, 2) AS sale_price,
    ROUND(price * 0.60, 2) AS clearance_price,
    stock_quantity
FROM products
WHERE stock_quantity > 0
ORDER BY category_id, price DESC;

-- 32. Inventory value
SELECT 
    product_name,
    price,
    stock_quantity,
    ROUND(price * stock_quantity, 2) AS inventory_value
FROM products
WHERE price * stock_quantity > 5000
ORDER BY inventory_value DESC;

-- 33. Advanced search
SELECT 
    product_name,
    description,
    price,
    category_id,
    CASE 
        WHEN product_name LIKE '%pro%' THEN 1
        WHEN description LIKE '%pro%' THEN 2
        ELSE 3
    END AS relevance
FROM products
WHERE (product_name LIKE '%pro%' OR description LIKE '%pro%')
  AND price BETWEEN 0 AND 500
  AND category_id IN (1, 4)
  AND stock_quantity > 0
ORDER BY relevance, price ASC;

-- Verification queries
SELECT '=== Products by Category ===' AS section;
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count,
    MIN(p.price) AS min_price,
    MAX(p.price) AS max_price,
    AVG(p.price) AS avg_price
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY product_count DESC;

SELECT '=== Most Expensive Products ===' AS section;
SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5;

SELECT '=== Low Stock Products ===' AS section;
SELECT product_name, stock_quantity, reorder_level 
FROM products 
WHERE stock_quantity <= reorder_level AND discontinued = 0;

SELECT '=== Products by Supplier Country ===' AS section;
SELECT 
    s.country,
    COUNT(DISTINCT ps.product_id) AS products_supplied
FROM suppliers s
JOIN product_suppliers ps ON s.supplier_id = ps.supplier_id
GROUP BY s.country
ORDER BY products_supplied DESC;
