package customer

import (
	"database/sql"
	"fmt"
	"time"
)

// Customer represents a customer entity
type Customer struct {
	CustomerID     int
	PhoneNumber    string
	Name           string
	Email          string
	Address        string
	Status         string // 'active', 'suspended', 'inactive'
	CurrentBalance float64
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

// Service handles customer-related database operations
type Service struct {
	db *sql.DB
}

// NewService creates a new customer service
func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

// CreateCustomer creates a new customer record
// TODO: Implement this function
func (s *Service) CreateCustomer(phoneNumber, name, email, address string) (*Customer, error) {
	// TODO: Validate input parameters
	// TODO: Insert customer record using parameterized query
	// INSERT INTO customers (phone_number, name, email, address, status, current_balance)
	// VALUES (?, ?, ?, ?, 'active', 0.0)
	// TODO: Get the last inserted ID
	// TODO: Return the created customer
	return nil, fmt.Errorf("not implemented")
}

// GetCustomerByID retrieves a customer by their ID
// TODO: Implement this function
func (s *Service) GetCustomerByID(customerID int) (*Customer, error) {
	// TODO: Execute SELECT query with WHERE customer_id = ?
	// TODO: Scan results into Customer struct
	// TODO: Handle sql.ErrNoRows appropriately
	return nil, fmt.Errorf("not implemented")
}

// GetCustomerByPhone retrieves a customer by phone number
// TODO: Implement this function
func (s *Service) GetCustomerByPhone(phoneNumber string) (*Customer, error) {
	// TODO: Execute SELECT query with WHERE phone_number = ?
	// TODO: Scan results into Customer struct
	// TODO: Handle sql.ErrNoRows appropriately
	return nil, fmt.Errorf("not implemented")
}

// UpdateCustomer updates customer information
// TODO: Implement this function
func (s *Service) UpdateCustomer(customerID int, name, email, address string) error {
	// TODO: Build UPDATE query with parameterized values
	// UPDATE customers SET name = ?, email = ?, address = ?, updated_at = CURRENT_TIMESTAMP
	// WHERE customer_id = ?
	// TODO: Execute the query
	// TODO: Check rows affected (should be 1)
	return fmt.Errorf("not implemented")
}

// UpdateBalance updates customer's current balance
// TODO: Implement this function
func (s *Service) UpdateBalance(customerID int, amount float64) error {
	// TODO: Update current_balance using parameterized query
	// UPDATE customers SET current_balance = current_balance + ?, updated_at = CURRENT_TIMESTAMP
	// WHERE customer_id = ?
	// TODO: Consider using a transaction for critical balance updates
	return fmt.Errorf("not implemented")
}

// DeactivateCustomer sets customer status to 'inactive'
// TODO: Implement this function
func (s *Service) DeactivateCustomer(customerID int) error {
	// TODO: Update status to 'inactive'
	// TODO: Consider business logic: cancel active plans, settle pending bills, etc.
	return fmt.Errorf("not implemented")
}

// SuspendCustomer sets customer status to 'suspended'
// TODO: Implement this function
func (s *Service) SuspendCustomer(customerID int, reason string) error {
	// TODO: Update status to 'suspended'
	// TODO: Log suspension reason (may need separate audit table)
	return fmt.Errorf("not implemented")
}

// ReactivateCustomer sets customer status back to 'active'
// TODO: Implement this function
func (s *Service) ReactivateCustomer(customerID int) error {
	// TODO: Update status to 'active'
	// TODO: Check if there are any prerequisites (paid overdue bills, etc.)
	return fmt.Errorf("not implemented")
}

// ListCustomers retrieves customers with pagination
// TODO: Implement this function
func (s *Service) ListCustomers(offset, limit int) ([]*Customer, error) {
	// TODO: Execute SELECT with LIMIT and OFFSET
	// SELECT * FROM customers ORDER BY created_at DESC LIMIT ? OFFSET ?
	// TODO: Iterate rows and build customer slice
	return nil, fmt.Errorf("not implemented")
}

// ListActiveCustomers retrieves only active customers
// TODO: Implement this function
func (s *Service) ListActiveCustomers(offset, limit int) ([]*Customer, error) {
	// TODO: Execute SELECT with WHERE status = 'active' and pagination
	return nil, fmt.Errorf("not implemented")
}

// SearchCustomersByName searches customers by name using LIKE
// TODO: Implement this function
func (s *Service) SearchCustomersByName(query string) ([]*Customer, error) {
	// TODO: Execute SELECT with WHERE name LIKE ?
	// Use pattern matching: query = "%" + query + "%"
	// TODO: Iterate rows and build customer slice
	return nil, fmt.Errorf("not implemented")
}

// GetCustomerCount returns total number of customers
// TODO: Implement this function
func (s *Service) GetCustomerCount() (int, error) {
	// TODO: Execute COUNT(*) query
	return 0, fmt.Errorf("not implemented")
}

// GetCustomerCountByStatus returns count of customers grouped by status
// TODO: Implement this function
func (s *Service) GetCustomerCountByStatus() (map[string]int, error) {
	// TODO: Execute SELECT status, COUNT(*) FROM customers GROUP BY status
	// TODO: Build map[status]count
	return nil, fmt.Errorf("not implemented")
}

// GetCustomersWithNegativeBalance retrieves customers with balance < 0
// TODO: Implement this function
func (s *Service) GetCustomersWithNegativeBalance() ([]*Customer, error) {
	// TODO: SELECT * FROM customers WHERE current_balance < 0 ORDER BY current_balance ASC
	return nil, fmt.Errorf("not implemented")
}

// GetTopCustomersByBalance retrieves top N customers by balance
// TODO: Implement this function
func (s *Service) GetTopCustomersByBalance(limit int) ([]*Customer, error) {
	// TODO: SELECT with ORDER BY current_balance DESC LIMIT ?
	return nil, fmt.Errorf("not implemented")
}
