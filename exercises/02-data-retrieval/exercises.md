# Exercise 2: Data Retrieval with SQL

Master the art of querying data with WHERE, ORDER BY, LIMIT, and more.

## Setup

```bash
sqlite3 ecommerce.db < schema.sql
```

## Exercises

### DISTINCT Practice

1. **Unique categories**
   - Find all unique category IDs from the products table

2. **Count unique values**
   - How many unique categories have products?
   - How many unique countries supply products?

### WHERE Clause - Comparison Operators

3. **Exact match**
   - Find all products in category 1 (Electronics)

4. **Comparison operators**
   - Find products priced over $100
   - Find products with stock quantity less than or equal to 20
   - Find products NOT in category 3 (Stationery)

5. **BETWEEN operator**
   - Find products priced between $50 and $150 (inclusive)
   - Find products with stock between 30 and 100 units

### WHERE Clause - Logical Operators

6. **AND operator**
   - Find Electronics (category 1) products priced under $50
   - Find products with price > $100 AND stock < 20

7. **OR operator**
   - Find products that are either discontinued OR have zero stock
   - Find products in categories 1, 2, or 4

8. **Complex conditions**
   - Find products that are:
     - Either (Electronics AND price < $100)
     - OR (Furniture AND price > $500)

### Pattern Matching with LIKE

9. **Starts with**
   - Find products whose names start with 'Desk'

10. **Contains**
    - Find products with 'Pro' anywhere in the name

11. **Ends with**
    - Find products whose names end with 'er'

12. **Multiple patterns**
    - Find products containing 'book' OR 'pen' (case-insensitive)

### NULL Handling

13. **Find NULLs**
    - Find products without a description

14. **Find NOT NULLs**
    - Find products that have a description

15. **NULL in calculations**
    - Show products where cost is NULL or not set

### IN Operator

16. **IN with values**
    - Find products in categories 1, 3, and 5 using IN

17. **NOT IN**
    - Find products NOT in categories 2 and 4

18. **IN with subquery**
    - Find products supplied by suppliers from USA
    - Hint: Use IN with a subquery on suppliers table

### ORDER BY

19. **Single column**
    - List all products ordered by price (cheapest first)
    - List all products by price (most expensive first)

20. **Multiple columns**
    - List products ordered by category_id ascending, then price descending

21. **Order by expression**
    - List products ordered by profit margin (price - cost) descending
    - Show only product name, price, cost, and margin

22. **Order with NULL handling**
    - List products ordered by description, with NULL descriptions last

### LIMIT and OFFSET

23. **Top N**
    - Find the 5 most expensive products

24. **Pagination**
    - Show products 11-20 when sorted by product_name
    - (This is page 2 if page size is 10)

25. **Bottom N**
    - Find the 3 products with the lowest stock quantity

### Complex Queries

26. **Multiple filters and sorting**
    - Find non-discontinued products
    - Priced between $20 and $200
    - With stock above their reorder level
    - Ordered by stock quantity (lowest first)
    - Show only top 10

27. **Search functionality**
    - Search for products where:
      - Name contains 'book' OR description contains 'book'
      - Price under $50
      - Not discontinued
    - Order by price

28. **Low stock alert**
    - Find products where stock_quantity <= reorder_level
    - Exclude discontinued products
    - Show: product name, current stock, reorder level, and difference
    - Order by the difference (most urgent first)

29. **Profit analysis**
    - Calculate profit margin percentage: ((price - cost) / price) \* 100
    - Show products with profit margin > 50%
    - Order by profit margin descending

30. **Supplier analysis**
    - Find all suppliers from North America (USA or Canada)
    - Who supply products with price > $100
    - Order by country, then supplier name

## Challenge Exercises

31. **Dynamic pricing**
    - Show products with three price tiers:
      - Original price
      - Sale price (20% off)
      - Clearance price (40% off)
    - Only for products with stock > 0
    - Order by category, then original price descending

32. **Inventory value**
    - Calculate total inventory value (price × stock_quantity) for each product
    - Show only products where inventory value > $5000
    - Order by inventory value descending

33. **Advanced search**
    - Create a product search with multiple criteria:
      - Text search in name OR description (parameter: "pro")
      - Optional price range ($0-$500)
      - Optional categories (1, 4)
      - Exclude out-of-stock items
    - Sort by relevance (products with search term in name first, then description)
    - Then by price ascending

## Tips

- Use `.mode column` and `.headers on` for readable output
- Test your WHERE conditions carefully
- Remember: `NULL = NULL` is always false; use `IS NULL`
- LIKE is case-insensitive in SQLite, case-sensitive in PostgreSQL
- Use parentheses to clarify complex AND/OR conditions

## Verification

After completing exercises, verify your understanding:

```sql
-- Should return only Electronics
SELECT DISTINCT category_id FROM products WHERE category_id = 1;

-- Should return products sorted by price DESC
SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5;

-- Should handle NULLs correctly
SELECT COUNT(*) FROM products WHERE description IS NULL;
```

---

See [solutions.sql](solutions.sql) for complete answers.
