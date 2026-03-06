# Exercise 4: Aggregating Data

Master GROUP BY, aggregate functions, and HAVING for data analysis.

## Setup

```bash
sqlite3 sales.db < schema.sql
```

## Exercises

### Basic Aggregate Functions

1. **Simple counts**
   - How many total orders are in the database?
   - How many customers do we have?
   - How many products in each category?

2. **SUM calculations**
   - What is the total sales amount across all orders?
   - What is the total quantity of all products ordered?

3. **AVG calculations**
   - What is the average order value?
   - What is the average product price by category?

4. **MIN and MAX**
   - Find the cheapest and most expensive products
   - Find the earliest and latest order dates

5. **Multiple aggregates**
   - Show count, min, max, and average for product prices

### GROUP BY Basics

6. **Group by single column**
   - Count number of orders per customer
   - Show: customer company name, order count

7. **Group by with multiple aggregates**
   - For each salesperson, show:
     - Name
     - Number of orders
     - Total sales amount
     - Average order value

8. **Group by with calculated fields**
   - For each product, calculate:
     - Total units sold
     - Total revenue
     - Average sale price

9. **Group by date parts**
   - Count orders by month (format: 2024-01)
   - Show: month, order count, total sales

10. **Group by multiple columns**
    - Show sales by region and month
    - Display: region name, month, order count, total sales

### HAVING Clause

11. **Filter aggregates**
    - Find customers who placed more than 2 orders
    - Show: company name, order count

12. **Filter on calculated aggregates**
    - Find salespeople with total sales over $5000
    - Show: salesperson name, total sales, order count

13. **Complex HAVING**
    - Find products sold in quantities greater than 10 total
    - With average sale price above $100
    - Show: product name, units sold, avg price

14. **Multiple conditions in HAVING**
    - Find months with:
      - More than 3 orders
      - AND total sales > $4000
    - Show: month, order count, total sales

### Combining WHERE and HAVING

15. **Pre-filter then aggregate**
    - For orders in Q1 2024 (Jan-Mar):
      - Group by customer
      - Show only customers with total purchases > $2000
      - Display: customer name, order count, total spent

16. **Filter products then aggregate**
    - For Electronics and Software categories only:
      - Show revenue by category
      - Only categories with revenue > $5000

17. **Date range aggregation**
    - For orders shipped in March 2024:
      - Group by salesperson
      - Show: name, orders shipped, total sales
      - Only salespeople with >2 orders

### Advanced Aggregation

18. **Percentage calculations**
    - Show each region's sales as percentage of total sales
    - Display: region, total sales, percentage of total

19. **Running statistics**
    - For each category, show:
      - Product count
      - Total inventory value (unit_price × assumed stock of 10)
      - Average price
      - Price range (max - min)

20. **Multi-level grouping**
    - Show sales by region and salesperson
    - Display: region name, salesperson name, total sales
    - Order by region, then sales descending

21. **Profit analysis**
    - Calculate profit per product category
    - Profit = (unit_price - cost) × quantity sold
    - Show: category, total profit, profit margin %

22. **Customer lifetime value**
    - For each customer, calculate:
      - Total orders
      - Total spent
      - Average order value
      - First order date
      - Last order date
    - Order by total spent descending

### Complex Aggregations with Joins

23. **Sales performance by region**
    - Join orders, salespeople, and regions
    - Group by region
    - Show: region, total orders, total sales, number of salespeople
    - Order by total sales descending

24. **Product performance report**
    - For each product, show:
      - Product name and category
      - Times ordered
      - Total units sold
      - Total revenue
      - Average discount given
    - Only products ordered at least once
    - Order by total revenue descending

25. **Quarterly sales report**
    - Group sales by quarter (Q1, Q2, etc.)
    - Show: quarter, orders, total sales, avg order value
    - Include year-over-year comparison if data available

26. **Top customers by region**
    - For each region, show:
      - Region name
      - Top customer (by total sales)
      - Their total sales amount
      - Number of their orders

### Challenge Exercises

27. **Cohort analysis**
    - Group salespeople by hire year
    - Show: hire year, number of salespeople, total sales, avg sales per person
    - Order by hire year

28. **Product category mix**
    - For each customer, show:
      - Company name
      - Number of different categories purchased
      - Total spent
      - Most purchased category
    - Only customers who bought from 2+ categories

29. **Sales velocity analysis**
    - Calculate average days between order and shipment by salesperson
    - Show: salesperson name, avg shipping days, total orders
    - Only include shipped orders
    - Flag salespeople with avg shipping time > 2 days

30. **Discount impact analysis**
    - Group by discount percentage ranges (0%, 1-10%, 11-20%)
    - Show: discount range, order count, total revenue, avg order value
    - Calculate revenue loss from discounts

## Tips

- Every non-aggregate column in SELECT must be in GROUP BY
- WHERE filters before grouping, HAVING filters after
- Use column aliases to make HAVING clauses readable
- Test your GROUP BY without HAVING first, then add filters
- Use ROUND() for readable decimal numbers

## Verification

```sql
-- Verify aggregations
SELECT SUM(total_amount) FROM orders;
SELECT SUM(quantity * unit_price * (1 - discount)) FROM order_items;
-- These should be similar (may differ slightly due to rounding)

-- Check GROUP BY correctness
SELECT COUNT(*) FROM orders;
SELECT SUM(order_count) FROM (SELECT salesperson_id, COUNT(*) as order_count FROM orders GROUP BY salesperson_id);
-- These should match
```

---

See [solutions.sql](solutions.sql) for complete answers.
