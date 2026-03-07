-- Exercise 4: Aggregation - Solutions

-- 1. Simple counts
SELECT COUNT(*) AS total_orders FROM orders;
SELECT COUNT(*) AS total_customers FROM customers;
SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;

-- 2. SUM calculations
SELECT SUM(total_amount) AS total_sales FROM orders;
SELECT SUM(quantity) AS total_quantity FROM order_items;

-- 3. AVG calculations
SELECT ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders;
SELECT category, ROUND(AVG(unit_price), 2) AS avg_price FROM products GROUP BY category;

-- 4. MIN and MAX
SELECT 
    MIN(unit_price) AS cheapest,
    MAX(unit_price) AS most_expensive
FROM products;

SELECT 
    MIN(order_date) AS earliest_order,
    MAX(order_date) AS latest_order
FROM orders;

-- 5. Multiple aggregates
SELECT 
    COUNT(*) AS product_count,
    ROUND(MIN(unit_price), 2) AS min_price,
    ROUND(MAX(unit_price), 2) AS max_price,
    ROUND(AVG(unit_price), 2) AS avg_price
FROM products;

-- 6. Group by single column
SELECT 
    c.company_name,
    COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.company_name;

-- 7. Group by with multiple aggregates
SELECT 
    s.first_name || ' ' || s.last_name AS salesperson_name,
    COUNT(o.order_id) AS order_count,
    ROUND(SUM(o.total_amount), 2) AS total_sales,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM salespeople s
LEFT JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY s.salesperson_id, s.first_name, s.last_name;

-- 8. Group by with calculated fields
SELECT 
    p.product_name,
    SUM(oi.quantity) AS total_units_sold,
    ROUND(SUM(oi.quantity * oi.unit_price * (1 - oi.discount)), 2) AS total_revenue,
    ROUND(AVG(oi.unit_price * (1 - oi.discount)), 2) AS avg_sale_price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name;

-- 9. Group by date parts
SELECT 
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS order_count,
    ROUND(SUM(total_amount), 2) AS total_sales
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month;

-- 10. Group by multiple columns
SELECT 
    r.region_name,
    strftime('%Y-%m', o.order_date) AS month,
    COUNT(o.order_id) AS order_count,
    ROUND(SUM(o.total_amount), 2) AS total_sales
FROM regions r
JOIN salespeople s ON r.region_id = s.region_id
JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY r.region_name, strftime('%Y-%m', o.order_date)
ORDER BY r.region_name, month;

-- 11. Filter aggregates
SELECT 
    c.company_name,
    COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.company_name
HAVING COUNT(o.order_id) > 2;

-- 12. Filter on calculated aggregates
SELECT 
    s.first_name || ' ' || s.last_name AS salesperson_name,
    ROUND(SUM(o.total_amount), 2) AS total_sales,
    COUNT(o.order_id) AS order_count
FROM salespeople s
JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY s.salesperson_id, s.first_name, s.last_name
HAVING SUM(o.total_amount) > 5000;

-- 13. Complex HAVING
SELECT 
    p.product_name,
    SUM(oi.quantity) AS units_sold,
    ROUND(AVG(oi.unit_price), 2) AS avg_price
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
HAVING SUM(oi.quantity) > 10 AND AVG(oi.unit_price) > 100;

-- 14. Multiple conditions in HAVING
SELECT 
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS order_count,
    ROUND(SUM(total_amount), 2) AS total_sales
FROM orders
GROUP BY strftime('%Y-%m', order_date)
HAVING COUNT(*) > 3 AND SUM(total_amount) > 4000;

-- 15. Pre-filter then aggregate
SELECT 
    c.company_name,
    COUNT(o.order_id) AS order_count,
    ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-03-31'
GROUP BY c.customer_id, c.company_name
HAVING SUM(o.total_amount) > 2000;

-- 16. Filter products then aggregate
SELECT 
    p.category,
    ROUND(SUM(oi.quantity * oi.unit_price * (1 - oi.discount)), 2) AS revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
WHERE p.category IN ('Electronics', 'Software')
GROUP BY p.category
HAVING SUM(oi.quantity * oi.unit_price * (1 - oi.discount)) > 5000;

-- 17. Date range aggregation
SELECT 
    s.first_name || ' ' || s.last_name AS salesperson_name,
    COUNT(o.order_id) AS orders_shipped,
    ROUND(SUM(o.total_amount), 2) AS total_sales
FROM salespeople s
JOIN orders o ON s.salesperson_id = o.salesperson_id
WHERE o.shipped_date BETWEEN '2024-03-01' AND '2024-03-31'
GROUP BY s.salesperson_id, s.first_name, s.last_name
HAVING COUNT(o.order_id) > 2;

-- 18. Percentage calculations
SELECT 
    r.region_name,
    ROUND(SUM(o.total_amount), 2) AS total_sales,
    ROUND(SUM(o.total_amount) * 100.0 / (SELECT SUM(total_amount) FROM orders), 2) AS percentage_of_total
FROM regions r
JOIN salespeople s ON r.region_id = s.region_id
JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY r.region_id, r.region_name;

-- 19. Running statistics
SELECT 
    category,
    COUNT(*) AS product_count,
    ROUND(SUM(unit_price * 10), 2) AS estimated_inventory_value,
    ROUND(AVG(unit_price), 2) AS avg_price,
    ROUND(MAX(unit_price) - MIN(unit_price), 2) AS price_range
FROM products
GROUP BY category;

-- 20. Multi-level grouping
SELECT 
    r.region_name,
    s.first_name || ' ' || s.last_name AS salesperson_name,
    ROUND(SUM(o.total_amount), 2) AS total_sales
FROM regions r
JOIN salespeople s ON r.region_id = s.region_id
LEFT JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY r.region_id, r.region_name, s.salesperson_id, s.first_name, s.last_name
ORDER BY r.region_name, total_sales DESC;

-- 21. Profit analysis
SELECT 
    p.category,
    ROUND(SUM((oi.unit_price - p.cost) * oi.quantity * (1 - oi.discount)), 2) AS total_profit,
    ROUND(SUM((oi.unit_price - p.cost) * oi.quantity * (1 - oi.discount)) * 100.0 / 
          SUM(oi.unit_price * oi.quantity * (1 - oi.discount)), 2) AS profit_margin_pct
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.category;

-- 22. Customer lifetime value
SELECT 
    c.company_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value,
    MIN(o.order_date) AS first_order_date,
    MAX(o.order_date) AS last_order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.company_name
ORDER BY total_spent DESC;

-- 23. Sales performance by region
SELECT 
    r.region_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_sales,
    COUNT(DISTINCT s.salesperson_id) AS num_salespeople
FROM regions r
JOIN salespeople s ON r.region_id = s.region_id
LEFT JOIN orders o ON s.salesperson_id = o.salesperson_id
GROUP BY r.region_id, r.region_name
ORDER BY total_sales DESC;

-- 24. Product performance report
SELECT 
    p.product_name,
    p.category,
    COUNT(DISTINCT oi.order_id) AS times_ordered,
    SUM(oi.quantity) AS total_units_sold,
    ROUND(SUM(oi.quantity * oi.unit_price * (1 - oi.discount)), 2) AS total_revenue,
    ROUND(AVG(oi.discount) * 100, 2) AS avg_discount_pct
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC;

-- 25. Quarterly sales report
SELECT 
    'Q' || ((CAST(strftime('%m', order_date) AS INTEGER) - 1) / 3 + 1) || ' ' || strftime('%Y', order_date) AS quarter,
    COUNT(*) AS orders,
    ROUND(SUM(total_amount), 2) AS total_sales,
    ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
GROUP BY strftime('%Y', order_date), ((CAST(strftime('%m', order_date) AS INTEGER) - 1) / 3 + 1)
ORDER BY strftime('%Y', order_date), ((CAST(strftime('%m', order_date) AS INTEGER) - 1) / 3 + 1);

-- 26. Top customers by region
SELECT 
    r.region_name,
    c.company_name AS top_customer,
    ROUND(SUM(o.total_amount), 2) AS total_sales,
    COUNT(o.order_id) AS order_count
FROM regions r
JOIN customers c ON r.region_id = c.region_id
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY r.region_id, r.region_name, c.customer_id, c.company_name
HAVING SUM(o.total_amount) = (
    SELECT MAX(customer_sales)
    FROM (
        SELECT SUM(o2.total_amount) AS customer_sales
        FROM customers c2
        JOIN orders o2 ON c2.customer_id = o2.customer_id
        WHERE c2.region_id = r.region_id
        GROUP BY c2.customer_id
    )
);

-- 27. Cohort analysis
SELECT 
    strftime('%Y', hire_date) AS hire_year,
    COUNT(*) AS num_salespeople,
    ROUND(SUM(total_sales), 2) AS total_sales,
    ROUND(AVG(total_sales), 2) AS avg_sales_per_person
FROM (
    SELECT 
        s.salesperson_id,
        s.hire_date,
        SUM(o.total_amount) AS total_sales
    FROM salespeople s
    LEFT JOIN orders o ON s.salesperson_id = o.salesperson_id
    GROUP BY s.salesperson_id, s.hire_date
)
GROUP BY strftime('%Y', hire_date)
ORDER BY hire_year;

-- 28. Product category mix
SELECT 
    c.company_name,
    COUNT(DISTINCT p.category) AS categories_purchased,
    ROUND(SUM(oi.quantity * oi.unit_price * (1 - oi.discount)), 2) AS total_spent,
    (
        SELECT category 
        FROM products p2
        JOIN order_items oi2 ON p2.product_id = oi2.product_id
        JOIN orders o2 ON oi2.order_id = o2.order_id
        WHERE o2.customer_id = c.customer_id
        GROUP BY category
        ORDER BY SUM(oi2.quantity) DESC
        LIMIT 1
    ) AS top_category
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
GROUP BY c.customer_id, c.company_name
HAVING COUNT(DISTINCT p.category) >= 2;

-- 29. Sales velocity analysis
SELECT 
    s.first_name || ' ' || s.last_name AS salesperson_name,
    ROUND(AVG(julianday(o.shipped_date) - julianday(o.order_date)), 2) AS avg_shipping_days,
    COUNT(o.order_id) AS total_orders,
    CASE 
        WHEN AVG(julianday(o.shipped_date) - julianday(o.order_date)) > 2 THEN 'SLOW'
        ELSE 'OK'
    END AS shipping_speed
FROM salespeople s
JOIN orders o ON s.salesperson_id = o.salesperson_id
WHERE o.shipped_date IS NOT NULL
GROUP BY s.salesperson_id, s.first_name, s.last_name;

-- 30. Discount impact analysis
SELECT 
    CASE 
        WHEN discount = 0 THEN '0%'
        WHEN discount > 0 AND discount <= 0.10 THEN '1-10%'
        ELSE '11-20%'
    END AS discount_range,
    COUNT(*) AS order_count,
    ROUND(SUM(quantity * unit_price * (1 - discount)), 2) AS total_revenue,
    ROUND(AVG(quantity * unit_price * (1 - discount)), 2) AS avg_order_value,
    ROUND(SUM(quantity * unit_price * discount), 2) AS revenue_loss_from_discounts
FROM order_items
GROUP BY 
    CASE 
        WHEN discount = 0 THEN '0%'
        WHEN discount > 0 AND discount <= 0.10 THEN '1-10%'
        ELSE '11-20%'
    END;
