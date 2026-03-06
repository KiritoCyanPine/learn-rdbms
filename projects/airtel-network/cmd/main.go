package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	fmt.Println("🚀 Airtel Network Management System")
	fmt.Println("===================================")

	// TODO: Move database connection to internal/database package
	// For now, we'll connect directly here
	db, err := sql.Open("sqlite3", "./airtel.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Test connection
	if err := db.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	fmt.Println("✅ Database connection successful")

	// TODO: Implement main menu/CLI interface
	// For now, we'll just demonstrate basic operations

	// Example: List all customers
	fmt.Println("\n📋 Customers:")
	rows, err := db.Query(`
		SELECT customer_id, phone_number, name, status, current_balance 
		FROM customers 
		WHERE status = 'active'
		LIMIT 5
	`)
	if err != nil {
		log.Fatal("Query failed:", err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var phone, name, status string
		var balance float64
		if err := rows.Scan(&id, &phone, &name, &status, &balance); err != nil {
			log.Fatal("Scan failed:", err)
		}
		fmt.Printf("  [%d] %s - %s (Balance: ₹%.2f)\n", id, phone, name, balance)
	}

	if err := rows.Err(); err != nil {
		log.Fatal("Rows iteration error:", err)
	}

	// TODO: Implement the following modules:
	// 1. Customer Management (internal/customer/)
	//    - CreateCustomer()
	//    - GetCustomer()
	//    - UpdateCustomer()
	//    - ListCustomers()
	//    - SearchCustomers()
	//
	// 2. Service Plans Management (internal/plans/)
	//    - ListPlans()
	//    - GetPlan()
	//    - SubscribeToPlan()
	//    - UnsubscribeFromPlan()
	//    - GetCustomerPlans()
	//
	// 3. Call Detail Records (internal/cdr/)
	//    - RecordCall()
	//    - RecordSMS()
	//    - RecordDataUsage()
	//    - GetUsageForPeriod()
	//    - CalculateUsageCost()
	//
	// 4. Billing (internal/billing/)
	//    - GenerateBill()
	//    - RecordPayment()
	//    - GetUnpaidBills()
	//    - GetBillingHistory()
	//    - ApplyLateFees()
	//
	// 5. Reports & Analytics (internal/reports/)
	//    - TopCustomersByRevenue()
	//    - MonthlyRevenueTrend()
	//    - PlanPopularity()
	//    - UsagePatterns()
	//    - TowerStatistics()
	//    - ChurnAnalysis()

	fmt.Println("\n💡 Next Steps:")
	fmt.Println("  1. Implement customer CRUD operations in internal/customer/")
	fmt.Println("  2. Add tests for each module")
	fmt.Println("  3. Build a CLI or REST API interface")
	fmt.Println("  4. Optimize queries and add indexes")
	fmt.Println("  5. Migrate to PostgreSQL for production")
}
