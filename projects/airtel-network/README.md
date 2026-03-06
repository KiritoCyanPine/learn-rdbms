# Airtel Network Management System

A practical relational database project simulating a telecommunications network like Airtel, built with Go and raw SQL (no ORM).

## Project Overview

This project implements a database-driven system to manage:

- **Customers**: Subscriber information and account details
- **Service Plans**: Voice, data, and SMS packages
- **Billing**: Monthly billing records and payment tracking
- **Call Records**: CDR (Call Detail Records) for usage tracking
- **Network Towers**: Cell tower locations and coverage
- **Analytics**: Business intelligence queries and reports

## Learning Objectives

By completing this project, you will:

1. Design a normalized database schema for a real-world system
2. Implement CRUD operations using raw SQL in Go
3. Handle complex business logic with transactions
4. Write analytical queries for reporting
5. Optimize queries with indexes
6. Practice database/sql package without ORM abstractions

## Database Schema

### Core Entities

**customers**

- customer_id (PK)
- phone_number (unique)
- name, email, address
- registration_date
- status (active/suspended/terminated)
- current_balance

**service_plans**

- plan_id (PK)
- plan_name
- plan_type (prepaid/postpaid)
- monthly_fee
- voice_minutes
- data_gb
- sms_count
- validity_days

**customer_plans** (junction table)

- subscription_id (PK)
- customer_id (FK)
- plan_id (FK)
- start_date, end_date
- status (active/expired/cancelled)

**billing_records**

- bill_id (PK)
- customer_id (FK)
- billing_period (YYYY-MM)
- plan_charges, usage_charges, taxes
- total_amount
- due_date, payment_date
- status (unpaid/paid/overdue)

**call_records** (CDR)

- call_id (PK)
- customer_id (FK)
- call_type (voice/sms/data)
- destination_number
- tower_id (FK)
- start_time, duration_seconds
- data_mb (for data calls)
- cost

**network_towers**

- tower_id (PK)
- tower_code (unique)
- location_name
- latitude, longitude
- coverage_radius_km
- status (active/maintenance/offline)

## Project Structure

```
projects/airtel-network/
├── README.md                    # This file
├── database/
│   ├── schema.sql              # Table definitions
│   └── seed-data.sql           # Sample data
├── go.mod                      # Go module file
├── Makefile                    # Helper commands
├── cmd/
│   └── main.go                 # Entry point
├── internal/
│   ├── database/
│   │   └── db.go              # Database connection
│   ├── customer/
│   │   ├── customer.go        # Customer CRUD operations
│   │   └── customer_test.go   # Unit tests
│   ├── billing/
│   │   ├── billing.go         # Billing logic
│   │   └── billing_test.go
│   ├── plans/
│   │   ├── plans.go           # Service plan management
│   │   └── plans_test.go
│   ├── cdr/
│   │   ├── cdr.go             # Call detail records
│   │   └── cdr_test.go
│   └── reports/
│       ├── reports.go         # Analytics queries
│       └── reports_test.go
└── docs/
    └── requirements.md         # Detailed requirements

```

## Implementation Tasks

Work through these tasks in order. Each has TODO markers in the code.

### Phase 1: Database Setup (Week 5)

- [ ] Review and understand the schema
- [ ] Run `make setup-db` to create tables
- [ ] Run `make seed-db` to populate sample data
- [ ] Write queries to explore the data
- [ ] Add indexes for common queries

### Phase 2: Customer Module (Week 6-7)

- [ ] Implement customer registration (INSERT)
- [ ] Implement get customer by ID (SELECT)
- [ ] Implement get customer by phone number (SELECT with WHERE)
- [ ] Update customer information (UPDATE)
- [ ] Deactivate customer (soft delete via status)
- [ ] List customers with pagination (LIMIT/OFFSET)
- [ ] Search customers by name (LIKE query)

### Phase 3: Service Plans Module (Week 7)

- [ ] Create new service plan (INSERT)
- [ ] List all available plans (SELECT)
- [ ] Get plan details by ID (SELECT)
- [ ] Subscribe customer to plan (INSERT into customer_plans)
- [ ] Unsubscribe customer from plan (UPDATE status)
- [ ] Get customer's active plans (JOIN query)

### Phase 4: CDR & Usage Tracking (Week 7)

- [ ] Record call/SMS (INSERT into call_records)
- [ ] Record data usage (INSERT into call_records)
- [ ] Get customer usage for billing period (SELECT with date range)
- [ ] Calculate usage costs (aggregate queries)
- [ ] Find tower with most traffic (GROUP BY with aggregation)

### Phase 5: Billing Module (Week 8)

- [ ] Generate monthly bill for customer (complex calculation)
- [ ] Record payment (INSERT + UPDATE in transaction)
- [ ] Get unpaid bills (SELECT with WHERE)
- [ ] Get billing history for customer (SELECT with ORDER BY)
- [ ] Apply late fees to overdue bills (UPDATE with date logic)
- [ ] Generate invoice report (complex SELECT with joins)

### Phase 6: Analytics & Reports (Week 8)

- [ ] Top 10 customers by revenue
- [ ] Monthly revenue trends
- [ ] plan popularity (subscription counts)
- [ ] Usage patterns by time of day
- [ ] Average revenue per user (ARPU)
- [ ] Churn analysis (customers who left)
- [ ] Tower performance metrics

### Phase 7: Advanced Features (Week 9)

- [ ] Migrate to PostgreSQL
- [ ] Add full-text search on customer names
- [ ] Implement database connection pooling
- [ ] Add query retry logic with exponential backoff
- [ ] Optimize slow queries with EXPLAIN
- [ ] Add database migrations
- [ ] Implement data export to CSV

## Running the Project

### Prerequisites

- Go 1.21 or higher
- SQLite3 (for development)
- PostgreSQL (for production migration)

### Setup

```bash
# Install dependencies
make deps

# Create database and tables
make setup-db

# Load sample data
make seed-db

# Run the application
make run

# Run tests
make test

# Clean database
make clean-db
```

## Database Operations Guidelines

### Use Parameterized Queries

```go
// ✅ GOOD: Safe from SQL injection
db.Query("SELECT * FROM customers WHERE phone = ?", phoneNumber)

// ❌ BAD: Vulnerable to SQL injection
db.Query(fmt.Sprintf("SELECT * FROM customers WHERE phone = '%s'", phoneNumber))
```

### Handle Errors Properly

```go
row := db.QueryRow("SELECT name FROM customers WHERE customer_id = ?", id)
var name string
if err := row.Scan(&name); err != nil {
    if err == sql.ErrNoRows {
        return "", fmt.Errorf("customer not found")
    }
    return "", fmt.Errorf("query failed: %w", err)
}
```

### Use Transactions for Related Operations

```go
tx, err := db.Begin()
if err != nil {
    return err
}
defer tx.Rollback() // rollback if not committed

// Multiple related operations
_, err = tx.Exec(...)
if err != nil {
    return err // automatic rollback
}

return tx.Commit()
```

### Close Resources

```go
rows, err := db.Query("SELECT...")
if err != nil {
    return err
}
defer rows.Close() // Always close rows

for rows.Next() {
    // Process rows
}
if err = rows.Err(); err != nil {
    return err
}
```

## Sample Queries

### Customer Usage Summary

```sql
SELECT
    c.name,
    c.phone_number,
    COUNT(cr.call_id) AS total_calls,
    SUM(cr.duration_seconds) / 60 AS total_minutes,
    SUM(cr.cost) AS total_cost
FROM customers c
LEFT JOIN call_records cr ON c.customer_id = cr.customer_id
WHERE cr.start_time >= DATE('now', 'start of month')
GROUP BY c.customer_id, c.name, c.phone_number
ORDER BY total_cost DESC
LIMIT 10;
```

### Revenue by Plan Type

```sql
SELECT
    sp.plan_name,
    sp.plan_type,
    COUNT(DISTINCT cp.customer_id) AS subscriber_count,
    SUM(br.total_amount) AS total_revenue
FROM service_plans sp
JOIN customer_plans cp ON sp.plan_id = cp.plan_id
JOIN billing_records br ON cp.customer_id = br.customer_id
WHERE br.billing_period = strftime('%Y-%m', 'now')
  AND br.status = 'paid'
GROUP BY sp.plan_id, sp.plan_name, sp.plan_type
ORDER BY total_revenue DESC;
```

## Testing

Each module should have comprehensive tests:

- Unit tests for business logic
- Integration tests with test database
- Mock database for testing error scenarios

```go
func TestCustomerCRUD(t *testing.T) {
    db := setupTestDB(t)
    defer db.Close()

    // Test create
    customerID, err := CreateCustomer(db, ...)
    require.NoError(t, err)

    // Test read
    customer, err := GetCustomer(db, customerID)
    require.NoError(t, err)
    assert.Equal(t, expectedName, customer.Name)

    // Test update
    // Test delete
}
```

## Performance Tips

1. **Index frequently queried columns**

   ```sql
   CREATE INDEX idx_customers_phone ON customers(phone_number);
   CREATE INDEX idx_call_records_customer_time ON call_records(customer_id, start_time);
   ```

2. **Use EXPLAIN to analyze queries**

   ```sql
   EXPLAIN QUERY PLAN
   SELECT * FROM customers WHERE phone_number = '+1234567890';
   ```

3. **Batch inserts when possible**

   ```go
   stmt, _ := tx.Prepare("INSERT INTO call_records (...) VALUES (?, ?, ?)")
   for _, record := range records {
       stmt.Exec(record.CustomerID, record.StartTime, record.Cost)
   }
   stmt.Close()
   ```

4. **Use appropriate connection pool settings**
   ```go
   db.SetMaxOpenConns(25)
   db.SetMaxIdleConns(5)
   db.SetConnMaxLifetime(5 * time.Minute)
   ```

## Resources

- [Go database/sql Tutorial](https://go.dev/doc/database/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Performance Tips](https://use-the-index-luke.com/)

## Next Steps

1. Complete Phase 1 to understand the schema
2. Implement one module at a time
3. Write tests as you go
4. Benchmark and optimize slow queries
5. Migrate to PostgreSQL and compare
6. Add more features (fraud detection, usage alerts, etc.)

---

**Good luck building your telecom database system!** 📱💾🚀
